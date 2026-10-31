import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronDown, Plus, CheckCircle2, Send, PhoneCall, Sparkles } from 'lucide-react';
import { TESTIMONIALS, FAQS, AVATARS, PHONE_TEL, WA_LINK, EMAIL } from '../lib/data';

/* ---------------- Testimonials ---------------- */
function initials(name: string) {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

export function Testimonials() {
  return (
    <section className="relative bg-white text-slate-900 py-16 sm:py-20 md:py-24 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute top-16 right-8 w-72 h-72 rounded-full bg-orange-100 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute bottom-8 left-8 w-72 h-72 rounded-full bg-amber-100 blur-3xl" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-11 sm:mb-14">
          <p className="eyebrow justify-center mb-4" style={{ color: '#c2410c' }}>Happy families</p>
          <h2 className="section-title text-3xl sm:text-5xl lg:text-6xl mb-4" style={{ color: '#0b0d12' }}>Don&apos;t take <span className="zn-highlight">our word for it</span></h2>
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 py-2 shadow-sm">
            <span className="flex">{[0, 1, 2, 3, 4].map(i => <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />)}</span>
            <span className="text-[12px] sm:text-sm font-bold text-slate-700">4.9/5 · 2,400+ reviews</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {TESTIMONIALS.map((t, i) => (
            <figure key={t.name} className="zn-card-light group rounded-[1.5rem] border border-slate-200 bg-white p-5 sm:p-6 flex flex-col shadow-[0_10px_34px_rgba(15,23,42,0.07)] hover:-translate-y-1.5 hover:shadow-[0_22px_55px_rgba(15,23,42,0.13)] transition-all duration-400">
              <Quote className="w-6 h-6 sm:w-7 sm:h-7 text-[#F97316]/70 mb-3" fill="currentColor" strokeWidth={0} />
              <div className="flex gap-0.5 mb-3">{[0, 1, 2, 3, 4].map(s => <Star key={s} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />)}</div>
              <blockquote className="text-[12px] sm:text-[13.5px] text-slate-700 font-bold leading-relaxed flex-1">“{t.text}”</blockquote>
              <figcaption className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100">
                <span className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0 border-2 border-orange-100">
                  <img src={AVATARS[i % AVATARS.length]} alt={t.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  <span className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[#F97316] to-[#EA580C] text-white text-[11px] font-black">{initials(t.name)}</span>
                </span>
                <span className="min-w-0">
                  <span className="block font-bold text-[12px] sm:text-[13px] text-slate-900 leading-tight">{t.name}</span>
                  <span className="block text-[10px] sm:text-[11px] text-slate-500 font-bold leading-snug mt-0.5">{t.detail}</span>
                </span>
                <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-auto shrink-0" aria-label="Verified admission" />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQs ---------------- */
export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="bg-[#F4F6F8] text-slate-900 py-16 sm:py-20 md:py-24 px-4 sm:px-6 border-t border-slate-200">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <p className="eyebrow justify-center mb-4" style={{ color: '#c2410c' }}>FAQs</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-3">Simple answers, <span className="zn-highlight">clear steps</span></h2>
          <p className="text-slate-600 font-bold text-[14px] sm:text-base">Everything families ask before they book their counselling slot.</p>
        </div>
        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`rounded-2xl border bg-white overflow-hidden transition-all duration-300 ${isOpen ? 'border-[#F97316]/50 shadow-[0_12px_36px_rgba(249,115,22,0.12)]' : 'border-slate-200'}`}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5 touch-manipulation">
                  <span className="font-bold text-[13px] sm:text-[15px] text-slate-900 leading-snug">{item.q}</span>
                  <span className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full grid place-items-center transition-all duration-300 ${isOpen ? 'bg-[#F97316] text-white rotate-45' : 'bg-slate-100 text-slate-600'}`}>
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <p className="px-5 sm:px-6 pb-5 text-[12px] sm:text-[14px] text-slate-600 font-bold leading-relaxed border-t border-slate-100 pt-3.5">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA + lead form ---------------- */
export function FinalCta() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [rank, setRank] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');

  const valid = name.trim().length >= 2 && /^[6-9]\d{9}$/.test(phone.replace(/\s|-/g, ''));

  const submit = () => {
    if (!valid || status !== 'idle') return;
    setStatus('sending');
    window.setTimeout(() => setStatus('done'), 1100);
  };

  return (
    <section className="relative night-band grain overflow-hidden py-16 sm:py-20 md:py-24">
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[520px] rounded-full" style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.22), transparent 65%)' }} />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <p className="eyebrow-night justify-center mb-4"><Sparkles className="w-4 h-4" /> NEET 2026 counselling is live</p>
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#FEF3E7] leading-[1.05] mb-5">
          One right <span className="zn-highlight">choice</span><br />changes everything.
        </h2>
        <p className="text-[#FEF3E7]/60 font-bold text-[14px] sm:text-lg max-w-xl mx-auto leading-relaxed mb-8">
          Join 8,000+ students who trusted MBBS Waala — from rank prediction to the final admission letter.
        </p>

        <div className="max-w-2xl mx-auto rounded-2xl sm:rounded-3xl border border-white/12 bg-white/[0.05] backdrop-blur-xl p-4 sm:p-6 shadow-2xl">
          {status === 'done' ? (
            <div className="py-6 sm:py-8">
              <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto mb-4" />
              <h3 className="font-display text-2xl sm:text-3xl text-white mb-2">Request received!</h3>
              <p className="text-white/65 font-bold text-[13px] sm:text-[15px]">Our counsellor will call you within counselling hours (7 AM – 11 PM).<br />For anything urgent: <a className="text-[#FDBA74] font-bold" href={PHONE_TEL}>+91 78801 19983</a></p>
            </div>
          ) : (
            <>
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.18em] font-bold text-[#FDBA74] mb-3 sm:mb-4 inline-flex items-center gap-2"><PhoneCall className="w-4 h-4" /> Get a free counselling callback</p>
              <div className="grid sm:grid-cols-3 gap-2.5">
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Student name" aria-label="Student name" className="bg-white/[0.06] border border-white/12 rounded-xl px-4 py-3.5 text-white placeholder-white/35 font-extrabold focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/40 text-[13px] sm:text-sm" />
                <input value={phone} onChange={e => setPhone(e.target.value)} inputMode="numeric" placeholder="Mobile number" aria-label="Mobile number" className="bg-white/[0.06] border border-white/12 rounded-xl px-4 py-3.5 text-white placeholder-white/35 font-extrabold focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/40 text-[13px] sm:text-sm" />
                <input value={rank} onChange={e => setRank(e.target.value)} inputMode="numeric" placeholder="NEET AIR (optional)" aria-label="NEET AIR" className="bg-white/[0.06] border border-white/12 rounded-xl px-4 py-3.5 text-white placeholder-white/35 font-extrabold focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/40 text-[13px] sm:text-sm" />
              </div>
              <button onClick={submit} disabled={!valid || status === 'sending'} className="btn-orange w-full mt-3 py-4 text-[15px] sm:text-base disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none">
                {status === 'sending' ? 'Sending…' : <>Request free callback <Send className="w-5 h-5" /></>}
              </button>
              <p className="text-[9px] sm:text-[10px] text-white/35 font-bold mt-2.5">By submitting you agree to be contacted on call/WhatsApp about NEET counselling. {EMAIL}</p>
            </>
          )}
        </div>
        <a href={WA_LINK} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-[#25D366] font-bold text-[13px] sm:text-sm hover:brightness-110">
          Prefer WhatsApp? Chat with us directly <ChevronDown className="w-4 h-4 -rotate-90" />
        </a>
      </div>
    </section>
  );
}
