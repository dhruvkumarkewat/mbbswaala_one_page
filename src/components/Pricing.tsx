import { motion } from 'framer-motion';
import { Check, Sparkles, Flame, GraduationCap, Building2, Crown, ArrowRight } from 'lucide-react';
import { PLANS, type Plan } from '../lib/data';
import { useAuth } from '../lib/AuthContext';

const PLAN_ICONS: Record<string, typeof GraduationCap> = {
  free: GraduationCap,
  'neet-ug': Flame,
  'neet-pg': Building2,
  premium: Crown,
};

function PlanCard({ plan }: { plan: Plan; onOpenAuth?: () => void }) {
  const Icon = PLAN_ICONS[plan.id] ?? GraduationCap;
  const featured = !!plan.featured;
  const { goSubscribe } = useAuth();
  const buy = () => { goSubscribe(plan.id); };
  return (
    <motion.div
      onClick={buy}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); buy(); } }}
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      className={`relative flex flex-col rounded-[1.6rem] border p-6 sm:p-7 h-full cursor-pointer no-underline text-inherit ${
        featured
          ? 'plan-featured z-10 lg:scale-[1.05]'
          : 'border-white/10 bg-[#171B24] shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:border-[#F97316]/40'
      }`}
    >
      {/* Offer badge */}
      {featured && plan.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <div className="shimmer relative overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-[#F97316] to-amber-500 text-[#1a0e02] text-[10px] sm:text-[11px] font-black tracking-[0.12em] px-4 sm:px-5 py-1.5 shadow-[0_8px_28px_rgba(249,115,22,0.5)] border border-amber-300/70">
            {plan.badge}
          </div>
        </div>
      )}
      {!featured && plan.ribbon && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <div className="rounded-full bg-white/10 border border-white/20 backdrop-blur text-white/80 text-[10px] font-bold tracking-[0.14em] uppercase px-4 py-1">{plan.ribbon}</div>
        </div>
      )}

      <div className="flex items-center gap-3 mb-4 pt-1">
        <span className={`w-11 h-11 rounded-xl grid place-items-center shrink-0 ${featured ? 'bg-gradient-to-br from-[#F97316] to-[#EA580C] text-white shadow-lg shadow-orange-600/40' : 'bg-white/6 text-[#FDBA74] border border-white/10'}`}>
          <Icon className="w-6 h-6" strokeWidth={1.8} />
        </span>
        <div>
          <h3 className="font-extrabold text-lg sm:text-xl text-white tracking-tight leading-none">{plan.name}</h3>
          <p className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] mt-1.5 ${featured ? 'text-[#FDBA74]' : 'text-white/45'}`}>{plan.exam}</p>
        </div>
      </div>

      <div className="flex items-end gap-2.5 mb-1">
        <p className={`font-sans font-black tracking-tight leading-none ${featured ? 'text-5xl sm:text-6xl text-white' : 'text-4xl sm:text-5xl text-white'}`}>{plan.price}</p>
        <div className="pb-1.5">
          {plan.originalPrice && (
            <p className="text-white/40 text-sm sm:text-base font-bold line-through decoration-rose-400/80 decoration-2 leading-none">{plan.originalPrice}</p>
          )}
          <p className="text-[10px] sm:text-[10.5px] text-white/40 font-extrabold mt-1">one-time · this counselling season</p>
        </div>
      </div>
      <p className="text-[12px] sm:text-[13px] text-white/55 font-bold mb-5">{plan.tagline}</p>

      <ul className="space-y-2.5 mb-6 flex-1">
        {plan.features.map(f => (
          <li key={f} className="flex items-start gap-2.5 text-[12px] sm:text-[13px] font-bold text-white/80 leading-snug">
            <span className={`mt-0.5 w-[17px] h-[17px] rounded-full grid place-items-center shrink-0 ${featured ? 'bg-[#F97316]' : 'bg-emerald-500/90'}`}>
              <Check className="w-2.5 h-2.5 text-white" strokeWidth={4} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={buy}
        className={`w-full inline-flex items-center justify-center gap-2 rounded-2xl py-3.5 text-[13px] sm:text-sm font-extrabold transition-all duration-300 ${
          featured
            ? 'btn-orange !rounded-2xl text-[#fff]'
            : plan.id === 'free'
              ? 'bg-white/8 border border-white/15 text-white hover:bg-white/14 hover:border-white/30'
              : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-[0_14px_38px_rgba(249,115,22,0.35)] hover:shadow-[0_18px_48px_rgba(249,115,22,0.45)] hover:scale-[1.02]'
        }`}
      >
        {plan.cta} <ArrowRight className="w-4 h-4" />
      </button>
      {featured && <p className="text-center text-[10px] text-amber-400/80 font-bold uppercase tracking-[0.18em] mt-2.5 inline-flex items-center justify-center gap-1.5"><Sparkles className="w-3 h-3" /> 8,000+ students already unlocked</p>}
    </motion.div>
  );
}

export default function Pricing({ onOpenAuth }: { onOpenAuth: () => void }) {
  return (
    <section id="pricing" className="relative bg-[#12151C] text-white py-16 sm:py-20 md:py-24 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute top-1/4 -left-40 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.13), transparent 70%)' }} />
      <div aria-hidden className="pointer-events-none absolute bottom-1/4 -right-40 w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.10), transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          <p className="eyebrow justify-center mb-4">Packages</p>
          <h2 className="section-title text-3xl sm:text-5xl lg:text-6xl mb-4">
            Big on data.<br />
            <span className="text-white/85">Light on your pocket.</span>
          </h2>
          <p className="text-white/55 font-bold text-[15px] sm:text-lg">Clear counselling plans for every exam — no hidden charges.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 xl:gap-5 items-stretch pt-4">
          {PLANS.map(plan => <PlanCard key={plan.id} plan={plan} onOpenAuth={onOpenAuth} />)}
        </div>

        {/* Trust strip */}
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] sm:text-[12px] font-extrabold text-white/45">
          <span className="inline-flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" strokeWidth={3} /> One-time payment · No subscription</span>
          <span className="inline-flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" strokeWidth={3} /> Secure UPI / cards / netbanking</span>
          <span className="inline-flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" strokeWidth={3} /> 7-day counsellor support during counselling</span>
          <span className="inline-flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" strokeWidth={3} /> Instant activation after payment</span>
        </div>
      </div>
    </section>
  );
}
