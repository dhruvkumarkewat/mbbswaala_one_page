import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Phone } from 'lucide-react';
import { HERO_WORDS, PHONE_TEL } from '../lib/data';
import { useAuth } from '../lib/AuthContext';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero({ onOpenAuth }: { onOpenAuth?: () => void }) {
  const { goSubscribe } = useAuth();
  const handleUnlock = () => { goSubscribe('basic'); };
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % HERO_WORDS.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="top" className="relative min-h-[min(92svh,880px)] flex flex-col items-center justify-center overflow-hidden bg-[#0B0D12] text-white">
      <img
        src="/images/mbbswala/hero-warm.jpg"
        alt="Medical students on an Indian campus"
        className="absolute inset-0 w-full h-full object-cover object-[62%_20%] sm:object-center scale-105"
        loading="eager"
        decoding="async"
      />
      <div className="absolute inset-0 bg-[#0B0D12]/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-[#0B0D12]" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(249,115,22,0.22) 0%, transparent 55%)' }} />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 xs:px-5 sm:px-8 pt-28 sm:pt-32 pb-16 sm:pb-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: EASE }}
          className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.07] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-white/85 mb-6 sm:mb-7 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FDBA74]" />
          Stress-free medical admissions
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.65, ease: EASE }}
          className="font-sans font-black text-[2.35rem] leading-[1.06] xs:text-[2.6rem] sm:text-6xl md:text-[4.35rem] tracking-[-0.03em] mb-5 sm:mb-6"
        >
          <span className="block text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)]">Your clear path through</span>
          <span className="block mt-1 sm:mt-2 min-h-[1.15em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIdx}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="inline-block text-[#FDBA74]"
              >
                {HERO_WORDS[wordIdx]}
              </motion.span>
            </AnimatePresence>
            <span className="text-white"> counselling</span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.55, ease: EASE }}
          className="text-[15px] sm:text-lg text-white/75 font-bold max-w-xl mx-auto leading-relaxed mb-8 sm:mb-9"
        >
          Cut-offs, seat lists and real counsellors — so your family chooses with confidence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.5, ease: EASE }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-md sm:max-w-none mx-auto"
        >
          <button onClick={handleUnlock} className="btn-orange px-8 sm:px-9 py-4 text-[15px] sm:text-base w-full sm:w-auto touch-manipulation">
            Get ₹99 Plan — Unlock Now <ArrowRight className="w-4 h-4" />
          </button>
          <a href="#pricing" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/25 bg-white/[0.06] backdrop-blur-md text-white font-extrabold hover:bg-white/12 transition-colors w-full sm:w-auto touch-manipulation">
            See ₹99 plan details <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.42, duration: 0.7 }}
          className="mt-9 sm:mt-11 flex flex-wrap justify-center items-center gap-x-5 sm:gap-x-7 gap-y-2 text-[11px] sm:text-sm font-extrabold text-white/55"
        >
          <span><span className="text-[#FDBA74] font-extrabold">10+</span> years</span>
          <span className="opacity-30 hidden sm:inline">•</span>
          <span><span className="text-[#FDBA74] font-extrabold">8,000+</span> admissions</span>
          <span className="opacity-30 hidden sm:inline">•</span>
          <span><span className="text-[#FDBA74] font-extrabold">200+</span> colleges</span>
          <span className="opacity-30 hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-soft-pulse" /> Counsellors online now</span>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-[#0B0D12] via-[#0B0D12]/70 to-transparent" />
    </section>
  );
}
