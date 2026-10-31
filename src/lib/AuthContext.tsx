import { useEffect, useMemo, useState, createContext, useContext, type ReactNode, useCallback } from 'react';
import {
  getStoredSession, getValidSession, signIn, signUp, clearSession, bootstrapProfile,
  type Session,
} from '../lib/auth';
import { SUBSCRIPTION_URL } from '../lib/data';

export interface AuthContextValue {
  session: Session | null;
  loading: boolean;
  name: string;
  email: string;
  isAuthenticated: boolean;
  signInNow: (email: string, password: string) => Promise<string | null>;
  signUpNow: (name: string, phone: string, email: string, password: string) => Promise<string | null>;
  signOut: () => void;
  /** Captures the current auth state, then full-page redirects to the
   *  subscription/checkout page on mbbswaala.io — always lands there,
   *  regardless of whether the account is old or brand-new. */
  goSubscribe: (planId?: string) => void;
}

const AuthCtx = createContext<AuthContextValue | null>(null);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[6-9]\d{9}$/;
export const isEmailValid = (v: string) => EMAIL_RE.test(v.trim());
export const isPhoneValid = (v: string) => PHONE_RE.test(v.trim().replace(/\s|-/g, ''));
export const isPasswordValid = (v: string) => v.length >= 6;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(() => getStoredSession());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      const s = await getValidSession();
      if (alive) {
        setSession(s);
        setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const name = useMemo(() => {
    const raw = session?.user?.email ? session.user.email.split('@')[0].replace(/[._-]+/g, ' ') : '';
    return raw ? raw.charAt(0).toUpperCase() + raw.slice(1) : '';
  }, [session]);

  const signInNow = useCallback(async (email: string, password: string) => {
    const { session: s, error } = await signIn(email, password);
    if (error) return error;
    if (s) setSession(s);
    return null;
  }, []);

  const signUpNow = useCallback(async (n: string, phone: string, email: string, password: string) => {
    const { session: s, error } = await signUp(n, phone, email, password);
    if (error) return error;
    if (s) {
      setSession(s);
      // Best-effort: pre-create the profile server-side so onboarding already
      // has what it needs — the subscription page then opens seamlessly.
      bootstrapProfile(n, phone, email.trim().toLowerCase()).catch(() => {});
    }
    return null;
  }, []);

  const signOut = useCallback(() => {
    clearSession();
    setSession(null);
  }, []);

  const goSubscribe = useCallback((planId?: string) => {
    // Map plan id to target query param
    let query = '';
    if (planId === 'neet-ug' || planId === 'basic') query = '?plan=basic';
    else if (planId === 'neet-pg') query = '?plan=neet-ug-pro';
    else if (planId === 'premium') query = '?plan=ultimate';
    else if (planId && planId !== 'free') query = `?plan=${encodeURIComponent(planId)}`;

    const target = `${SUBSCRIPTION_URL}${query}`;
    window.location.assign(target);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    session,
    loading,
    name,
    email: session?.user?.email ?? '',
    isAuthenticated: !!session,
    signInNow, signUpNow, signOut, goSubscribe,
  }), [session, loading, name, signInNow, signUpNow, signOut, goSubscribe]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
