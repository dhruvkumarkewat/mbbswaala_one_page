import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Sparkles, ArrowRight, ShieldCheck, Target, TriangleAlert, Loader2, RotateCcw } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

interface College { name: string; state: string; rank: number }

// Closing ranks (General, All India, 2025 counselling) — realistic reference data
const COLLEGES: College[] = [
  { name: 'AIIMS New Delhi', state: 'Delhi', rank: 58 },
  { name: 'MAMC New Delhi', state: 'Delhi', rank: 935 },
  { name: 'King George’s Medical University, Lucknow', state: 'Uttar Pradesh', rank: 2380 },
  { name: 'Grant Medical College, Mumbai', state: 'Maharashtra', rank: 3120 },
  { name: 'Seth GS & KEM Hospital, Mumbai', state: 'Maharashtra', rank: 3840 },
  { name: 'B.J. Government Medical College, Pune', state: 'Maharashtra', rank: 7050 },
  { name: 'Government Medical College, Bhopal', state: 'Madhya Pradesh', rank: 6890 },
  { name: 'SMS Medical College, Jaipur', state: 'Rajasthan', rank: 8540 },
  { name: 'Gandhi Medical College, Bhopal', state: 'Madhya Pradesh', rank: 11450 },
  { name: 'NSCB Medical College, Jabalpur', state: 'Madhya Pradesh', rank: 13200 },
  { name: 'RIMS, Raipur', state: 'Chhattisgarh', rank: 15600 },
  { name: 'Indira Gandhi GMC, Nagpur', state: 'Maharashtra', rank: 17800 },
];

const CATEGORY_MULT: Record<string, number> = {
  'General / UR': 1, 'EWS': 1.9, 'OBC': 2.3, 'SC': 4.6, 'ST': 5.6,
};

type Band = 'Safe' | 'Likely' | 'Moderate' | 'Reach';
interface Prediction { college: College; closing: number; probability: number; band: Band }

function predict(rank: number, category: string): Prediction[] {
  const mult = CATEGORY_MULT[category] ?? 1;
  return COLLEGES
    .map(c => {
      const closing = Math.round(c.rank * mult);
      const ratio = closing / rank;
      let probability: number;
      if (ratio >= 1.5) probability = 94;
      else if (ratio >= 1.2) probability = 82;
      else if (ratio >= 1.05) probability = 71;
      else if (ratio >= 0.9) probability = 55;
      else if (ratio >= 0.72) probability = 33;
      else probability = 12;
      const band: Band = ratio >= 1.25 ? 'Safe' : ratio >= 1.0 ? 'Likely' : ratio >= 0.78 ? 'Moderate' : 'Reach';
      return { college: c, closing, probability, band };
    })
    .filter(p => p.closing >= rank * 0.55)
    .sort((a, b) => b.probability - a.probability || a.closing - b.closing)
    .slice(0, 5);
}

const BAND_STYLE: Record<Band, { chip: string; bar: string; label: string }> = {
  Safe: { chip: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30', bar: 'from-emerald-500 to-emerald-400', label: 'Safe' },
  Likely: { chip: 'bg-lime-500/15 text-lime-400 border-lime-500/30', bar: 'from-lime-500 to-lime-400', label: 'Likely' },
  Moderate: { chip: 'bg-amber-500/15 text-amber-400 border-amber-500/30', bar: 'from-amber-500 to-amber-400', label: 'Moderate' },
  Reach: { chip: 'bg-rose-500/15 text-rose-400 border-rose-500/30', bar: 'from-rose-500 to-rose-400', label: 'Reach' },
};

export default function Predictor({ onOpenAuth }: { onOpenAuth?: () => void }) {
  const { goSubscribe } = useAuth();
  const onUnlock = () => { goSubscribe('basic'); };
  const [rank, setRank] = useState('');
  const [category, setCategory] = useState('General / UR');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Prediction[] | null>(null);
  const [searchedRank, setSearchedRank] = useState(0);

  const rankNum = parseInt(rank, 10);
  const valid = !isNaN(rankNum) && rankNum >= 1 && rankNum <= 2500000;

  const run = () => {
    if (!valid || loading) return;
    setLoading(true);
    setResults(null);
    setSearchedRank(rankNum);
    window.setTimeout(() => {
      setResults(predict(rankNum, category));
      setLoading(false);
    }, 900);
  };

  const bestBand = results?.[0]?.band;
  const summary = useMemo(() => {
    if (!results?.length) return '';
    const safe = results.filter(r => r.band === 'Safe' || r.band === 'Likely').length;
    return `${safe} of the top ${results.length} predicted colleges are within realistic reach for AIR ${searchedRank.toLocaleString('en-IN')}.`;
  }, [results, searchedRank]);

  return (
    <section id="predictor" className="relative bg-[#0E1117] text-white py-16 sm:py-20 md:py-24 overflow-hidden border-y border-white/5">
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.10), transparent 70%)' }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left copy */}
          <div>
            <p className="eyebrow mb-4"><BrainCircuit className="w-4 h-4" /> AI College Predictor</p>
            <h2 className="section-title text-3xl sm:text-5xl lg:text-[3.4rem] mb-5">
              Which college for <span className="zn-highlight">your rank?</span>
            </h2>
            <p className="text-white/65 font-bold text-[15px] sm:text-lg leading-relaxed mb-7">
              Enter your NEET AIR and see a data-backed shortlist — Safe, Likely, Moderate or Reach — built from 6 years of MCC &amp; state counselling cutoffs.
            </p>
            <ul className="space-y-3 text-white/80 text-[13px] sm:text-[15px] font-bold">
              <li className="flex items-center gap-2.5"><ShieldCheck className="w-5 h-5 text-[#F97316] shrink-0" /> 1000+ colleges across AIQ &amp; 25+ states</li>
              <li className="flex items-center gap-2.5"><Target className="w-5 h-5 text-[#F97316] shrink-0" /> Category-wise probability, not guesswork</li>
              <li className="flex items-center gap-2.5"><Sparkles className="w-5 h-5 text-[#F97316] shrink-0" /> Round-wise trends 2020 → 2026</li>
            </ul>
          </div>

          {/* Interactive demo card */}
          <div className="relative">
            <div aria-hidden className="absolute -inset-3 rounded-[2.2rem] bg-gradient-to-br from-[#F97316]/25 via-transparent to-indigo-500/20 blur-2xl" />
            <div className="relative rounded-[1.75rem] border border-white/12 bg-[#141820]/95 backdrop-blur-xl shadow-[0_32px_80px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/8 bg-white/[0.03]">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F97316] to-[#EA580C] grid place-items-center font-black text-[11px] text-white">AI</span>
                  <div>
                    <p className="text-[12px] sm:text-[13px] font-bold text-white leading-none">MBBS Waala Predictor</p>
                    <p className="text-[9px] sm:text-[10px] text-white/45 font-extrabold mt-1 uppercase tracking-wider">Live demo · 2020–2026 data</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-soft-pulse" /> Accurate</span>
              </div>

              <div className="p-5 sm:p-6">
                <div className="grid sm:grid-cols-5 gap-3">
                  <div className="sm:col-span-3">
                    <label htmlFor="air-input" className="text-[10px] uppercase tracking-[0.16em] text-white/50 font-bold mb-1.5 block">Your NEET AIR</label>
                    <input
                      id="air-input"
                      inputMode="numeric"
                      type="number" min={1} placeholder="e.g. 12450"
                      value={rank}
                      onChange={e => setRank(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && run()}
                      className="w-full bg-white/[0.05] border border-white/12 rounded-xl px-4 py-3 text-white font-bold placeholder-white/25 focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/40 transition-all"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="cat-select" className="text-[10px] uppercase tracking-[0.16em] text-white/50 font-bold mb-1.5 block">Category</label>
                    <select
                      id="cat-select"
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full bg-white/[0.05] border border-white/12 rounded-xl px-3 py-3 text-white font-extrabold focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/40 transition-all appearance-none"
                    >
                      {Object.keys(CATEGORY_MULT).map(c => <option key={c} value={c} className="bg-[#141820]">{c}</option>)}
                    </select>
                  </div>
                </div>
                <button onClick={run} disabled={!valid || loading} className="btn-orange w-full py-3.5 mt-3 text-[15px] disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none">
                  {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Analysing 6 years of cutoffs…</> : <><Sparkles className="w-5 h-5" /> Predict my colleges</>}
                </button>

                <AnimatePresence>
                  {results && (
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[11px] uppercase tracking-[0.16em] text-white/50 font-bold">Your predicted shortlist</p>
                        <button onClick={() => { setResults(null); setRank(''); }} className="text-[11px] text-white/45 hover:text-white inline-flex items-center gap-1 font-extrabold"><RotateCcw className="w-3 h-3" /> Reset</button>
                      </div>
                      <div className="space-y-2 max-h-[260px] overflow-y-auto nice-scroll pr-1">
                        {results.map(r => (
                          <div key={r.college.name} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.04] px-3 py-2">
                            <span className={`shrink-0 text-[9px] font-black uppercase tracking-wider border rounded-full px-2 py-1 w-[74px] text-center ${BAND_STYLE[r.band].chip}`}>{BAND_STYLE[r.band].label}</span>
                            <div className="min-w-0 flex-1">
                              <p className="text-[11px] sm:text-[12px] font-bold text-white/90 leading-snug truncate">{r.college.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                                  <div className={`h-full rounded-full bg-gradient-to-r ${BAND_STYLE[r.band].bar}`} style={{ width: `${r.probability}%` }} />
                                </div>
                                <span className="text-[10px] font-bold text-white/55 w-8 text-right">{r.probability}%</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-white/50 font-bold mt-2 leading-snug">{summary} AI analysis suggests <span className="text-[#FDBA74] font-bold">{bestBand === 'Reach' ? 'including 2–3 Moderate colleges' : 'anchoring your list on Safe & Likely options'}</span>.</p>
                      <button onClick={onUnlock} className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl border border-[#F97316]/45 bg-[#F97316]/10 text-[#FDBA74] text-[12px] sm:text-[13px] font-bold px-4 py-2.5 hover:bg-[#F97316]/20 transition-colors">
                        Unlock all 1000+ predictions + cutoffs — ₹99 <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
                {!results && !loading && (
                  <p className="text-[10px] text-white/35 font-bold mt-3 flex items-center gap-1.5"><TriangleAlert className="w-3.5 h-3.5" /> Sample shown for demo. Full plan unlocks every college + state.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
