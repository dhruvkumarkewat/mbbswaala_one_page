import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, API_URL } from './data';

/* ------------------------------------------------------------------
   Frontend-only auth helper for the MBBS Waala landing page.
   Uses the SAME public Supabase project + publishable key and the
   SAME public /api/auth-otp endpoint that mbbswaala.io uses,
   so signup/login works identically on the real app.
-------------------------------------------------------------------- */

const SB_STORAGE_KEY = 'supabase.auth.token';
const REST = `${SUPABASE_URL}/auth/v1`;
const HEADERS = {
  apikey: SUPABASE_PUBLISHABLE_KEY,
  'Content-Type': 'application/json',
};

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_at: number; // seconds
  user: { id: string; email: string };
}

export interface Profile {
  full_name?: string;
  name?: string;
  phone?: string;
  category?: string;
  domicile_state?: string;
  neet_score?: number | null;
  neet_rank?: number | null;
  exam?: string;
  preferred_course?: string;
  profile_completed?: boolean;
  onboarding_done?: boolean;
}

/* ---------- local session storage (same shape as supabase-js) ---------- */

function readStoredSession(): Session | null {
  try {
    const raw = localStorage.getItem(SB_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const s = parsed?.access_token ? parsed : (parsed?.currentSession ?? parsed);
    if (s?.access_token && s?.refresh_token) return s as Session;
    return null;
  } catch {
    return null;
  }
}

function writeStoredSession(s: Session) {
  try {
    localStorage.setItem(SB_STORAGE_KEY, JSON.stringify({
      access_token: s.access_token,
      refresh_token: s.refresh_token,
      expires_at: s.expires_at,
      token_type: 'bearer',
      user: s.user,
      currentSession: {
        access_token: s.access_token,
        refresh_token: s.refresh_token,
        expires_at: s.expires_at,
        token_type: 'bearer',
        user: s.user,
      },
    }));
  } catch { /* ignore */ }
}

export function clearSession() {
  try { localStorage.removeItem(SB_STORAGE_KEY); } catch { /* ignore */ }
}

export function getStoredSession(): Session | null { return readStoredSession(); }

export function isSessionValid(): boolean {
  const s = readStoredSession();
  if (!s) return false;
  // refresh a minute before expiry
  return s.expires_at * 1000 > Date.now() + 60_000;
}

/* ---------- Supabase REST auth ---------- */

async function refreshSession(s: Session): Promise<Session | null> {
  try {
    const res = await fetch(`${REST}/token?grant_type=refresh_token`, {
      method: 'POST', headers: HEADERS,
      body: JSON.stringify({ refresh_token: s.refresh_token }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok || !body?.access_token) return null;
    const next: Session = {
      access_token: body.access_token,
      refresh_token: body.refresh_token ?? s.refresh_token,
      expires_at: body.expires_at ?? Math.floor(Date.now() / 1000) + (body.expires_in ?? 3600),
      user: { id: body.user?.id ?? s.user.id, email: body.user?.email ?? s.user.email },
    };
    writeStoredSession(next);
    return next;
  } catch {
    return null;
  }
}

export async function getValidSession(): Promise<Session | null> {
  const s = readStoredSession();
  if (!s) return null;
  if (isSessionValid()) return s;
  const refreshed = await refreshSession(s);
  if (refreshed) return refreshed;
  clearSession();
  return null;
}

export async function signIn(email: string, password: string): Promise<{ session?: Session; error?: string }> {
  try {
    const res = await fetch(`${REST}/token?grant_type=password`, {
      method: 'POST', headers: HEADERS,
      body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok || !body?.access_token) {
      const msg = body?.msg || body?.error_description || body?.error || 'Invalid email or password. Please try again.';
      return { error: String(msg) };
    }
    const s: Session = {
      access_token: body.access_token,
      refresh_token: body.refresh_token,
      expires_at: body.expires_at ?? Math.floor(Date.now() / 1000) + (body.expires_in ?? 3600),
      user: { id: body.user?.id, email: body.user?.email ?? email.trim().toLowerCase() },
    };
    writeStoredSession(s);
    return { session: s };
  } catch {
    return { error: 'Network error. Please check your connection and try again.' };
  }
}

/* Create a brand-new account through the same API the app uses. */
export async function signUp(name: string, phone: string, email: string, password: string): Promise<{ session?: Session; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPhone = phone.trim().replace(/\s|-/g, '');
  // 1) Attempt Supabase signup first
  try {
    const res = await fetch(`${REST}/signup`, {
      method: 'POST', headers: HEADERS,
      body: JSON.stringify({ email: cleanEmail, password, data: { full_name: name, name, phone: cleanPhone } }),
    });
    const body = await res.json().catch(() => ({}));
    if (res.ok && body?.access_token) {
      const s: Session = {
        access_token: body.access_token,
        refresh_token: body.refresh_token,
        expires_at: body.expires_at ?? Math.floor(Date.now() / 1000) + (body.expires_in ?? 3600),
        user: { id: body.user?.id, email: cleanEmail },
      };
      writeStoredSession(s);
      return { session: s };
    }
  } catch { /* fall through to API path */ }

  // 2) Fallback: create the profile through the app's own backend, then sign in
  try {
    const signupRes = await fetch(API_URL('/api/auth-otp'), {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'complete_signup', email: cleanEmail, password, name, phone: cleanPhone }),
    });
    const signupBody = await signupRes.json().catch(() => ({}));
    if (!signupRes.ok) {
      const msg = signupBody?.error || 'Signup failed. If you already have an account, please log in instead.';
      return { error: String(msg) };
    }
    return signIn(cleanEmail, password);
  } catch {
    return { error: 'Network error. Please check your connection and try again.' };
  }
}

/* ---------- Authenticated app API calls ---------- */

export async function apiGet<T = unknown>(path: string): Promise<T> {
  const s = await getValidSession();
  const res = await fetch(API_URL(path), {
    headers: s ? { Authorization: `Bearer ${s.access_token}` } : {},
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((body as { error?: string })?.error || `Request failed (${res.status})`);
  return body as T;
}

export async function apiPost<T = unknown>(path: string, payload: unknown): Promise<T> {
  const s = await getValidSession();
  const res = await fetch(API_URL(path), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(s ? { Authorization: `Bearer ${s.access_token}` } : {}),
    },
    body: JSON.stringify(payload),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((body as { error?: string })?.error || `Request failed (${res.status})`);
  return body as T;
}

/* ---------- Profile bootstrap ---------- */

export async function getProfile(): Promise<Profile | null> {
  try {
    const p = await apiGet<Profile>('/api/profile');
    return p;
  } catch {
    return null;
  }
}

export async function bootstrapProfile(name: string, phone: string, email: string): Promise<Profile | null> {
  const s = await getValidSession();
  if (!s) return null;
  const cleanPhone = phone.trim().replace(/\s|-/g, '');
  try {
    const res = await fetch(API_URL('/api/profile'), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${s.access_token}` },
      body: JSON.stringify({
        full_name: name.trim(),
        name: name.trim(),
        email,
        phone: cleanPhone,
        category: 'General',
        domicile: 'Madhya Pradesh',
        domicile_state: 'Madhya Pradesh',
        exam: 'NEET UG',
        preferred_course: 'MBBS',
        neet_score: null,
        neet_rank: null,
        profile_completed: true,
        onboarding_done: true,
      }),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) return null;
    return body as Profile;
  } catch {
    return null;
  }
}
