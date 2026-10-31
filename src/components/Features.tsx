import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Scissors, Building2, IndianRupee, Map, Video, ListChecks, Check, ArrowRight, ChevronRight } from 'lucide-react';
import { FEATURES } from '../lib/data';

const ICONS = [Bell, Scissors, Building2, IndianRupee, Map, Video, ListChecks];

export default function Features() {
  const [active, setActive] = useState(1); // open on Round-wise Cutoffs
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive(i => (i + 1) % FEATURES.length), 6000);
    return () => clearInterval(id);
  }, [paused]);

  const current = FEATURES[active];
  const Icon = ICONS[active];

  return (
    <section id="features" className="relative bg-[#F4F6F8] text-slate-900 py-16 sm:py-20 md:py-24 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[520px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.10), transparent 70%)' }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-12 sm:mb-14">
          <p className="eyebrow justify-center mb-4" style={{ color: '#c2410c' }}>Everything in one place</p>
          <h2 className="section-title text-3xl sm:text-5xl lg:text-6xl mb-4" style={{ color: '#0b0d12' }}>
            Tools that <span className="zn-highlight">decide seats</span>
          </h2>
          <p className="text-slate-600 font-bold max-w-xl mx-auto text-[15px] sm:text-lg leading-relaxed">
            From notifications to choice lists — the full toolkit families use during NEET counselling.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-5 lg:gap-6" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          {/* Tab list */}
          <div className="lg:col-span-5 flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 snap-x snap-mandatory -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
            {FEATURES.map((f, i) => {
              const FIcon = ICONS[i];
              const isActive = i === active;
              return (
                <button
                  key={f.title}
                  onClick={() => setActive(i)}
                  className={`snap-start shrink-0 lg:shrink w-[230px] lg:w-full text-left flex items-center gap-3 rounded-2xl border px-3.5 py-3 lg:py-3.5 transition-all duration-300 ${
                    isActive
                      ? 'bg-white border-[#F97316]/50 shadow-[0_14px_40px_rgba(249,115,22,0.16)] lg:translate-x-2'
                      : 'bg-white/70 border-slate-200 hover:border-[#F97316]/40 hover:bg-white'
                  }`}
                >
                  <span className={`w-10 h-10 lg:w-11 lg:h-11 rounded-xl grid place-items-center shrink-0 transition-colors ${isActive ? 'bg-gradient-to-br from-[#F97316] to-[#EA580C] text-white' : 'bg-orange-50 text-[#EA580C]'}`}>
                    <FIcon className="w-5 h-5" strokeWidth={2} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[9px] uppercase tracking-[0.14em] font-bold text-slate-400">{f.short}</span>
                    <span className="block font-bold text-[13px] lg:text-[15px] text-slate-900 leading-snug">{f.title}</span>
                  </span>
                  <ChevronRight className={`w-4 h-4 ml-auto shrink-0 transition-all ${isActive ? 'text-[#F97316] opacity-100' : 'opacity-0'}`} />
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-full min-h-[430px] sm:min-h-[470px] rounded-[1.75rem] overflow-hidden border border-slate-200 shadow-[0_24px_60px_rgba(15,23,42,0.14)] bg-[#0E1117]"
              >
                <img src={current.img} alt={current.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-[#0B0D12]/72 to-[#0B0D12]/10" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                  <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#F97316]/20 border border-[#F97316]/40 text-[#FDBA74] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.16em] mb-3 backdrop-blur-sm">
                    <Icon className="w-3.5 h-3.5" /> {current.short}
                  </div>
                  <h3 className="font-display text-2xl sm:text-4xl text-white tracking-tight mb-2">{current.title}</h3>
                  <p className="text-white/75 text-[13px] sm:text-[15px] leading-relaxed mb-4 max-w-lg">{current.desc}</p>
                  <ul className="space-y-1.5 mb-5">
                    {current.points.map(p => (
                      <li key={p} className="flex items-center gap-2 text-white/85 text-[12px] sm:text-[13px] font-bold">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" strokeWidth={3} /> {p}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="btn-orange self-start px-6 py-3 text-[13px] sm:text-sm">
                    {current.cta} <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
