import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Play, X, ArrowRight, Check, Phone, Mail, MessageCircle, BrainCircuit, GitCompareArrows,
  LayoutGrid, Scissors, Building2, BadgeCheck, Users, GraduationCap, Stethoscope, IndianRupee,
} from 'lucide-react';
import { STATS, PAIN_POINTS, TOOLS, COUNSELLORS, PHONE, PHONE_TEL, WA_LINK, EMAIL, SUBSCRIPTION_URL } from '../lib/data';

/* ---------------- Animated counter ---------------- */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return <span ref={ref}>{value.toLocaleString('en-IN')}{suffix}</span>;
}

export function StatsStrip() {
  const parsed = [
    { target: 10, suffix: '+', label: 'Years Consultancy' },
    { target: 8000, suffix: '+', label: 'Successful Admissions' },
    { target: 200, suffix: '+', label: 'College Tie-ups' },
    { target: 25, suffix: '+', label: 'Indian States Covered' },
  ];
  return (
    <section className="relative z-10 bg-[#0B0D12] border-y border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-7 sm:py-9 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
        {parsed.map(s => (
          <div key={s.label} className="text-center">
            <p className="font-sans text-2xl sm:text-4xl font-black text-[#FDBA74] tracking-tight leading-none">
              <Counter target={s.target} suffix={s.suffix} />
            </p>
            <p className="text-[10px] sm:text-[12px] font-extrabold text-white/50 leading-snug mt-1.5 sm:mt-2">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Pain marquee ---------------- */
export function PainMarquee() {
  const items = [...PAIN_POINTS, ...PAIN_POINTS];
  return (
    <div className="relative bg-[#F4F6F8] border-b border-slate-200 py-3 overflow-hidden" aria-hidden>
      <div className="animate-marquee flex gap-3">
        {items.map((p, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-extrabold text-[12px] sm:text-[13px] border border-slate-300 bg-white text-slate-600 shadow-sm whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" /> {p}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Video section ---------------- */
export function VideoSection() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <section className="relative bg-[#0B0D12] py-14 sm:py-18 sm:py-20 md:py-24 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-[#F97316]/10 blur-[110px]" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-9 sm:gap-11 relative z-10">
        <div className="text-center max-w-2xl">
          <p className="eyebrow justify-center mb-4"><Play className="w-3.5 h-3.5" /> Watch &amp; understand</p>
          <h2 className="section-title text-3xl sm:text-5xl lg:text-6xl mb-4">Give us <span className="zn-highlight">two minutes</span></h2>
          <p className="text-white/60 font-bold text-[15px] sm:text-lg leading-relaxed">See how MBBSWala helps you go from NEET rank to a clear list of Indian medical colleges.</p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="relative w-full max-w-[920px] aspect-video rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,0.55)] border border-white/10 text-left touch-manipulation"
          aria-label="Play MBBS Waala explainer video"
        >
          <img src="/images/india/students.jpg" alt="MBBSWala counselling explainer" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
          <span className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-[#0B0D12]/35 to-[#0B0D12]/10" />
          <span className="absolute inset-0 grid place-items-center">
            <span className="relative">
              <span className="absolute inset-0 rounded-full bg-white/30 animate-ping opacity-40" />
              <span className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-white grid place-items-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                <Play className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 fill-[#EA580C] text-[#EA580C] ml-1" />
              </span>
            </span>
          </span>
          <span className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 md:p-8">
            <span className="font-display block text-xl sm:text-2xl md:text-3xl tracking-tight text-white mb-1">How our counselling works</span>
            <span className="text-white/65 text-[12px] sm:text-sm font-bold">Rank → college list → choice filling → seat</span>
          </span>
        </button>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[90] bg-black/85 backdrop-blur-md grid place-items-center p-4" onClick={() => setOpen(false)}>
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
              <button onClick={() => setOpen(false)} aria-label="Close video" className="absolute top-3 right-3 z-10 bg-white rounded-full p-2.5 shadow-lg hover:scale-105 transition-transform">
                <X className="w-5 h-5 text-slate-900" />
              </button>
              <iframe title="MBBSWala Explainer" className="w-full h-full" src="https://www.youtube.com/embed/listType=user_uploads&list=@mbbswala23&autoplay=1" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------- Tools grid ---------------- */
const TOOL_ICONS = [BrainCircuit, GitCompareArrows, LayoutGrid, Scissors];

export function ToolsGrid() {
  return (
    <section id="tools" className="bg-[#F4F6F8] text-slate-900 py-14 sm:py-20 md:py-24 px-4 sm:px-6 border-y border-slate-200/80">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 max-w-lg mx-auto">
          <p className="eyebrow justify-center mb-3" style={{ color: '#c2410c' }}>Tools that decide seats</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">Meaningful outcomes,<br />not empty tables</h2>
          <p className="text-slate-600 font-bold text-[14px] sm:text-base">Predict, match, compare — then talk to a counsellor when you are ready.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {TOOLS.map((t, i) => {
            const Icon = TOOL_ICONS[i];
            return (
              <a key={t.title} href="#pricing" className="group relative flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-white transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_24px_55px_rgba(15,23,42,0.14)] hover:border-[#F97316]/45">
                <div className="relative h-28 sm:h-36 overflow-hidden">
                  <img src={t.img} alt={t.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                  <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur-sm border border-white/20 text-[9px] sm:text-[10px] font-bold text-[#FDBA74] uppercase tracking-wider px-2.5 py-1"><Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {t.tag}</span>
                </div>
                <div className="p-3 sm:p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-[13px] sm:text-lg text-slate-900 leading-snug mb-1 sm:mb-1.5">{t.title}</h3>
                  <p className="text-[10px] sm:text-[13px] text-slate-500 font-bold leading-snug">{t.desc}</p>
                  <span className="mt-auto pt-2.5 sm:pt-3 inline-flex items-center gap-1.5 text-[10px] sm:text-[12px] font-bold text-[#EA580C] group-hover:gap-2.5 transition-all">Explore <ArrowRight className="w-3.5 h-3.5" /></span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- MBBS in India / trust split ---------------- */
export function TrustSplit() {
  const points = [
    'Government and private medical colleges across India',
    'All India seats, state quota, deemed and central colleges',
    'Full help: shortlist → papers → final admission',
  ];
  return (
    <section className="relative bg-white text-slate-900 py-14 sm:py-20 md:py-24 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute top-1/2 right-[-160px] -translate-y-1/2 w-[460px] h-[460px] rounded-full bg-orange-100 blur-3xl" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-12 sm:mb-16">
          <div className="relative order-2 lg:order-1">
            <div aria-hidden className="absolute -inset-4 bg-gradient-to-br from-[#F97316]/15 to-amber-200/40 rounded-[2rem] blur-2xl opacity-80" />
            <div className="relative rounded-[1.5rem] sm:rounded-[1.75rem] overflow-hidden shadow-2xl border border-black/5 aspect-[16/11]">
              <img src="/images/india/college-1.jpg" alt="Indian medical college campus" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-5 -right-2 sm:right-6 rounded-2xl bg-white border border-slate-200 shadow-xl px-4 py-3 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA580C] grid place-items-center shrink-0"><Check className="w-5 h-5 text-white" strokeWidth={3.5} /></span>
              <span>
                <span className="block text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wide">Seat options</span>
                <span className="block font-bold text-slate-900 text-[11px] sm:text-sm">All India + State + Deemed</span>
              </span>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow mb-4" style={{ color: '#c2410c' }}>MBBS in India</p>
            <h2 className="section-title text-3xl sm:text-5xl lg:text-6xl mb-4" style={{ color: '#0b0d12' }}>Help you can trust <span className="zn-highlight">for Indian MBBS seats</span></h2>
            <p className="text-slate-600 font-bold max-w-md text-[14px] sm:text-lg leading-relaxed mb-6">From All India counselling to your state list — one team stays with you until the seat is confirmed.</p>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-[10px] sm:text-xs font-bold shadow-lg"><GraduationCap className="w-4 h-4" /> Govt MBBS</span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F97316] text-white text-[10px] sm:text-xs font-bold shadow-lg shadow-orange-500/30"><BadgeCheck className="w-4 h-4" /> Private &amp; Deemed</span>
            </div>
            <ul className="space-y-3.5 mb-7">
              {points.map(p => (
                <li key={p} className="flex items-start gap-3 font-extrabold text-slate-800 text-[13px] sm:text-[15px]">
                  <Check className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" strokeWidth={3} /> {p}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <a href={SUBSCRIPTION_URL} className="zn-cta zn-cta-primary gap-2 !py-3.5">Buy ₹99 plan <ArrowRight className="w-4 h-4" /></a>
              <a href="#contact" className="zn-cta gap-2 !py-3.5">Talk to counsellor</a>
            </div>
          </div>
        </div>

        {/* Night band — join families */}
        <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] night-band p-6 sm:p-10 md:p-12 grain">
          <div aria-hidden className="pointer-events-none absolute top-0 right-0 w-72 h-72 bg-[#FDBA74]/10 blur-[80px] rounded-full" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-7 md:gap-10">
            <div className="text-center md:text-left max-w-md">
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl mb-2.5 tracking-tight text-[#FEF3E7]">Join families who chose MBBSWala</h3>
              <p className="text-[#FEF3E7]/60 font-bold leading-relaxed text-[13px] sm:text-[15px]">Talk to mentors and a counselling team that has helped thousands of students get medical seats.</p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {[{ n: '10+', l: 'Years' }, { n: '8k+', l: 'Admissions' }, { n: '200+', l: 'Tie-ups' }].map(s => (
                <div key={s.l} className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl px-5 sm:px-7 py-4 sm:py-5 text-center min-w-[96px] sm:min-w-[110px] hover:bg-white/[0.1] transition-colors">
                  <p className="font-sans text-2xl sm:text-4xl font-black text-[#FDBA74] tracking-tight">{s.n}</p>
                  <p className="text-[9px] sm:text-[11px] uppercase tracking-[0.16em] text-[#FDBA74]/70 font-bold mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Counsellors / human support ---------------- */
export function Counsellors() {
  return (
    <section id="contact" className="premium-section-light relative overflow-hidden bg-[#F4F6F8] text-slate-900 py-16 sm:py-20 md:py-24">
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-orange-200/40 blur-[110px]" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-11 sm:mb-14">
          <p className="eyebrow justify-center mb-4" style={{ color: '#c2410c' }}>Human support</p>
          <h2 className="section-title text-3xl sm:text-5xl lg:text-6xl mb-4" style={{ color: '#0b0d12' }}>Counsellors <span className="zn-highlight">one call away</span></h2>
          <p className="text-slate-600 font-bold text-[14px] sm:text-lg leading-relaxed mb-7">Call the MBBSWala team for simple, honest help with NEET counselling — any day of the week.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={PHONE_TEL} className="btn-orange gap-2 px-6 py-4 text-[15px]"><Phone className="w-5 h-5" /> {PHONE}</a>
            <a href={WA_LINK} target="_blank" rel="noreferrer" className="btn-wa gap-2 px-6 py-4 text-[15px]"><MessageCircle className="w-5 h-5" /> WhatsApp us</a>
            <a href={`mailto:${EMAIL}`} className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 font-extrabold bg-white text-slate-900 border border-slate-300 hover:bg-slate-50 transition-all shadow-sm"><Mail className="w-5 h-5" /> {EMAIL}</a>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
          {COUNSELLORS.map(c => (
            <div key={c.title} className="group overflow-hidden rounded-[1.5rem] sm:rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.08)] hover:-translate-y-1.5 hover:shadow-[0_26px_60px_rgba(15,23,42,0.14)] transition-all duration-500">
              <div className="h-40 sm:h-48 overflow-hidden">
                <img src={c.img} alt={c.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-1.5 sm:mb-2">{c.title}</h3>
                <p className="text-[12px] sm:text-[14px] text-slate-600 font-bold leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center mt-8 text-[11px] sm:text-xs font-extrabold text-slate-500 inline-flex items-center justify-center gap-2 w-full"><Users className="w-4 h-4" /> Bhopal office · Available 7 days a week during counselling season</p>
      </div>
    </section>
  );
}

export function BrandFooterBadge() {
  return (
    <div className="hidden" aria-hidden>
      <Stethoscope /> <IndianRupee /> <Building2 />
    </div>
  );
}
