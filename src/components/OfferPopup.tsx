import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Flame, ShieldCheck, Sparkles, ArrowRight, Clock } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

const BENEFITS = [
  'Unlimited AI college predictions + probability scores',
  'Round 1, 2, 3 & Mop-up cutoffs (2020–2026)',
  'MCC & AACCC official seat matrix access',
  '24/7 AI counselling assistant + choice filling strategy',
];

export default function OfferPopup({ onOpenAuth }: { onOpenAuth: () => void }) {
  const { isAuthenticated, goSubscribe } = useAuth();
  const [open, setOpen] = useState(false);
  const [seconds, setSeconds] = useState(14 * 60 + 59);

  useEffect(() => {
    const t = window.setTimeout(() => setOpen(true), 3000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const id = window.setInterval(() => setSeconds(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => { document.body.style.overflow = ''; window.clearInterval(id); };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  const unlock = () => {
    setOpen(false);
    goSubscribe('basic');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-3 sm:p-6"
          role="dialog" aria-modal="true" aria-label="Special offer — NEET UG plan at ₹99"
        >
          {/* Backdrop */}
          <button aria-label="Close offer" onClick={() => setOpen(false)} className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-pointer" />

          <motion.div
            initial={{ opacity: 0, y: 90, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            className="relative w-full max-w-md bg-[#141820] text-white rounded-[1.75rem] overflow-hidden border border-[#F97316]/40 shadow-[0_40px_120px_rgba(249,115,22,0.28)]"
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-3 right-3 z-20 w-9 h-9 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 hover:text-white transition-all hover:rotate-90 duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header band */}
            <div className="relative px-6 pt-6 pb-5 text-center bg-gradient-to-b from-[#F97316]/25 via-[#F97316]/8 to-transparent">
              <div className="shimmer relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-[#F97316] text-[#221103] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.18em] pl-3 pr-4 py-1.5 mb-3 border border-amber-300/60 shadow-lg">
                <Flame className="w-3.5 h-3.5" /> Limited-time offer
              </div>
              <h3 className="font-display text-[1.75rem] leading-[1.1] sm:text-4xl text-white tracking-tight">
                NEET UG Counselling<br />
                <span className="text-[#FDBA74]">just ₹99</span>
              </h3>
              <div className="flex items-center justify-center gap-3 mt-3">
                <span className="text-white/40 text-lg sm:text-xl font-bold line-through decoration-rose-400 decoration-2">₹999</span>
                <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">₹99</span>
                <span className="rounded-lg bg-emerald-500 text-[#04140b] text-[11px] sm:text-xs font-black px-2 py-1 leading-tight text-left">90%<br />OFF</span>
              </div>
              <p className="mt-2.5 inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-amber-300/90 uppercase tracking-[0.16em]">
                <Clock className="w-3.5 h-3.5" /> Offer ends in {mm}:{ss}
              </p>
            </div>

            {/* Benefits */}
            <div className="px-6 pb-5">
              <ul className="space-y-2.5 mb-4">
                {BENEFITS.map(b => (
                  <li key={b} className="flex items-start gap-2.5 text-[12px] sm:text-[13px] font-bold text-white/85 leading-snug">
                    <span className="mt-0.5 w-[18px] h-[18px] rounded-full bg-[#F97316] grid place-items-center shrink-0">
                      <Check className="w-3 h-3 text-white" strokeWidth={4.5} />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <button onClick={unlock} className="btn-orange w-full py-4 text-[15px] sm:text-base">
                Unlock NEET UG — ₹99 Only <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-between mt-3 px-1">
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/50 font-extrabold"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Secure UPI payment</span>
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/50 font-extrabold"><Sparkles className="w-4 h-4 text-amber-400" /> 8,000+ students joined</span>
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] text-white/50 font-extrabold">7-day support</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
