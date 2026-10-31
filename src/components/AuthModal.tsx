import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Lock, UserRound, Mail, Phone, ArrowRight, Loader2, Sparkles, ShieldCheck, BadgePercent } from 'lucide-react';
import { useAuth, isEmailValid, isPhoneValid, isPasswordValid } from '../lib/AuthContext';

type Mode = 'login' | 'signup';

export default function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { signInNow, signUpNow, goSubscribe, isAuthenticated, name } = useAuth();
  const [mode, setMode] = useState<Mode>('signup');
  const [nameInput, setNameInput] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (open) {
      setError(null);
      setDone(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // If already authenticated when the modal opens, skip straight to checkout
  useEffect(() => {
    if (open && isAuthenticated) {
      const t = window.setTimeout(goSubscribe, 600);
      return () => window.clearTimeout(t);
    }
  }, [open, isAuthenticated, goSubscribe]);

  const valid = useMemo(() => {
    const emailOk = isEmailValid(email);
    const passOk = isPasswordValid(password);
    if (mode === 'login') return emailOk && passOk;
    return nameInput.trim().length >= 2 && isPhoneValid(phone) && emailOk && passOk;
  }, [mode, nameInput, phone, email, password]);

  const submit = async () => {
    if (!valid || busy) return;
    setBusy(true);
    setError(null);
    const err = mode === 'signup'
      ? await signUpNow(nameInput.trim(), phone, email.trim(), password)
      : await signInNow(email.trim(), password);
    setBusy(false);
    if (err) {
      setError(err);
      return;
    }
    setDone(true);
    // Redirect to the subscription/payment page so the ₹99 plan activates
    window.setTimeout(goSubscribe, 1400);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center">
          <button aria-label="Close sign in" onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer" />

          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            role="dialog" aria-modal="true" aria-label="Sign up or log in to unlock the ₹99 NEET UG plan"
            className="relative w-full sm:max-w-md bg-[#141820] text-white sm:rounded-[1.75rem] rounded-t-[1.75rem] border border-[#F97316]/35 shadow-[0_40px_110px_rgba(0,0,0,0.65)] overflow-hidden max-h-[96vh] overflow-y-auto nice-scroll"
          >
            <button onClick={onClose} aria-label="Close" className="absolute top-3.5 right-3.5 z-10 w-9 h-9 grid place-items-center rounded-full bg-white/8 hover:bg-white/15 text-white/70 hover:text-white transition-all">
              <X className="w-5 h-5" />
            </button>

            {done ? (
              <div className="p-8 sm:p-10 text-center">
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 18 }} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA580C] grid place-items-center mx-auto mb-5 shadow-[0_16px_45px_rgba(249,115,22,0.4)]">
                  <Check className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={3} />
                </motion.div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">Welcome{name ? `, ${name.split(' ')[0]}` : ''}!</h3>
                <p className="text-white/65 font-bold text-[13px] sm:text-[15px] leading-relaxed">You are signed in securely. Taking you to the ₹99 NEET UG plan checkout…</p>
                <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold text-[#FDBA74] uppercase tracking-[0.18em]">
                  <Loader2 className="w-4 h-4 animate-spin" /> Redirecting to payment page…
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="relative px-6 sm:px-7 pt-6 sm:pt-7 pb-5 border-b border-white/8 bg-gradient-to-b from-[#F97316]/15 via-[#F97316]/5 to-transparent">
                  <p className="eyebrow mb-2"><Sparkles className="w-3.5 h-3.5" /> 90% OFF · only ₹99</p>
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white leading-[1.1]">
                    {mode === 'signup' ? 'Create your account' : 'Welcome back'}
                  </h3>
                  <p className="text-white/55 text-[11px] sm:text-[13px] font-bold mt-1.5 leading-snug">
                    {mode === 'signup'
                      ? 'Sign up to unlock NEET UG Counselling (MBBS/BDS/AYUSH) — predictions, cutoffs & 24/7 AI counselling.'
                      : 'Log in with your existing MBBS Waala account to continue to the ₹99 checkout.'}
                  </p>
                </div>

                {/* Mode toggle */}
                <div className="px-6 sm:px-7 pt-5">
                  <div className="relative grid grid-cols-2 rounded-2xl bg-white/[0.05] border border-white/10 p-1">
                    {(['signup', 'login'] as Mode[]).map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => { setMode(m); setError(null); }}
                        className={`relative py-2.5 rounded-xl text-[12px] sm:text-[13px] font-extrabold transition-all touch-manipulation ${mode === m ? 'bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white shadow-[0_10px_28px_rgba(249,115,22,0.4)]' : 'text-white/60 hover:text-white'}`}
                      >
                        {m === 'signup' ? 'New Sign Up' : 'Student Login'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={e => { e.preventDefault(); submit(); }} className="px-6 sm:px-7 py-5 grid gap-2.5">
                  {mode === 'signup' && (
                    <div className="relative">
                      <UserRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none" />
                      <input value={nameInput} onChange={e => setNameInput(e.target.value)} placeholder="Full name" aria-label="Full name" autoComplete="name" className="w-full bg-white/[0.05] border border-white/12 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/30 font-bold focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/40 text-[13px] sm:text-sm transition-all" />
                    </div>
                  )}
                  {mode === 'signup' && (
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none" />
                      <input value={phone} onChange={e => setPhone(e.target.value.replace(/[^\d+]/g, ''))} inputMode="numeric" placeholder="Mobile number (WhatsApp)" aria-label="Mobile number" autoComplete="tel" className="w-full bg-white/[0.05] border border-white/12 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/30 font-bold focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/40 text-[13px] sm:text-sm transition-all" />
                    </div>
                  )}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none" />
                    <input value={email} onChange={e => setEmail(e.target.value)} inputMode="email" type="email" placeholder="Email address" aria-label="Email" autoComplete="email" className="w-full bg-white/[0.05] border border-white/12 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/30 font-bold focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/40 text-[13px] sm:text-sm transition-all" />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none" />
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder={mode === 'signup' ? 'Create password (min 6 chars)' : 'Password'} aria-label="Password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} className="w-full bg-white/[0.05] border border-white/12 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-white/30 font-bold focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/40 text-[13px] sm:text-sm transition-all" />
                  </div>

                  {error && <p role="alert" className="text-[11px] sm:text-[12px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/25 rounded-xl px-3.5 py-2.5 leading-snug">{error}</p>}

                  <button type="submit" disabled={!valid || busy} className="btn-orange w-full py-4 text-[15px] sm:text-base mt-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none">
                    {busy ? <><Loader2 className="w-5 h-5 animate-spin" /> {mode === 'signup' ? 'Creating account…' : 'Signing you in…'}</> : (mode === 'signup' ? <><Sparkles className="w-5 h-5" /> Create account &amp; unlock — ₹99</> : <><ArrowRight className="w-5 h-5" /> Continue to ₹99 Checkout</>)}
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[9px] sm:text-[10px] text-white/40 font-bold">
                    <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> SSL secure</span>
                    <span className="inline-flex items-center gap-1.5"><BadgePercent className="w-4 h-4 text-amber-400" /> ₹999 → ₹99</span>
                    <span>Razorpay gateway</span>
                  </div>
                  <p className="text-center text-[10px] text-white/35 font-semibold">By continuing you agree to MBBS Waala&apos;s Terms &amp; Privacy Policy.</p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
