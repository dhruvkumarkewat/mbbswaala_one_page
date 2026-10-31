import { useEffect, useState } from 'react';
import { Menu, X, Phone, LogOut, UserRound, Lock } from 'lucide-react';
import { NAV_LINKS, PHONE, PHONE_TEL } from '../lib/data';
import { useAuth } from '../lib/AuthContext';

export default function Navbar({ onOpenAuth }: { onOpenAuth: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, name, email, goSubscribe, signOut } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener('click', close);
    return () => window.removeEventListener('click', close);
  }, [menuOpen]);

  const handleGetPlan = () => {
    setOpen(false);
    goSubscribe('basic');
  };

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${scrolled || open ? 'py-2' : 'py-3 sm:py-4'}`}>
      <div className="max-w-[1040px] mx-auto px-3 xs:px-4">
        <div className="pointer-events-auto relative rounded-full bg-[#141820]/92 backdrop-blur-xl border border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.45)] flex items-center justify-between gap-2 pl-4 pr-2 sm:pl-5 h-14 sm:h-16">
          <a href="#top" className="flex items-center shrink-0 group" aria-label="MBBS WAALA home">
            <img src="/images/mbbswala/navbar-logo.png" alt="MBBS WAALA — NEET Counselling Partner" className="h-9 sm:h-11 w-auto object-contain select-none transition-transform duration-300 group-hover:scale-[1.04]" />
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="px-3 py-2 text-[13px] xl:text-[14px] font-extrabold text-white/75 hover:text-white rounded-full hover:bg-white/[0.07] transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <a href={PHONE_TEL} className="hidden md:inline-flex items-center gap-2 text-[13px] font-bold text-white/85 hover:text-[#FDBA74] transition-colors px-2">
              <Phone className="w-4 h-4 text-[#F97316]" /> {PHONE}
            </a>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setMenuOpen(v => !v); }}
                  aria-label="Account menu"
                  className="flex items-center gap-1.5 rounded-full bg-white/[0.06] border border-white/12 pl-1.5 pr-3 py-1.5 hover:bg-white/10 transition-colors"
                >
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#F97316] to-[#EA580C] grid place-items-center text-[11px] font-black text-white shrink-0">{(name || 'S').charAt(0).toUpperCase()}</span>
                  <span className="hidden xs:inline text-[12px] font-bold text-white max-w-[110px] truncate">{name || 'Account'}</span>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#1A1F2B] border border-white/12 shadow-[0_24px_60px_rgba(0,0,0,0.55)] overflow-hidden z-50" onClick={e => e.stopPropagation()}>
                    <div className="px-4 py-3 border-b border-white/8">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 font-bold">Signed in</p>
                      <p className="text-[13px] font-bold text-white truncate">{email}</p>
                    </div>
                    <button onClick={() => goSubscribe('basic')} className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] font-bold text-[#FDBA74] hover:bg-white/6 transition-colors text-left">
                      <Lock className="w-4 h-4" /> Manage / pay — ₹99 plan
                    </button>
                    <button onClick={() => { signOut(); setMenuOpen(false); }} className="w-full flex items-center gap-2.5 px-4 py-3 text-[13px] font-bold text-white/75 hover:bg-white/6 transition-colors text-left">
                      <LogOut className="w-4 h-4" /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={onOpenAuth} className="hidden sm:inline-flex items-center gap-2 text-[12px] font-bold text-white/75 hover:text-white px-2 py-2 transition-colors">
                <UserRound className="w-4 h-4 text-[#F97316]" /> Sign in
              </button>
            )}

            <button onClick={handleGetPlan} className="btn-orange text-[12px] sm:text-[13px] px-4 sm:px-5 py-2 sm:py-2.5 whitespace-nowrap">
              Get ₹99 Plan
            </button>
            <button onClick={() => setOpen(v => !v)} aria-label={open ? 'Close menu' : 'Open menu'}
              className="lg:hidden w-10 h-10 grid place-items-center rounded-full border border-white/12 bg-white/5 text-white touch-manipulation">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden mt-2 rounded-3xl bg-[#141820]/97 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/8">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/45 font-bold mb-1">MBBS WAALA · Bhopal</p>
              <a href={PHONE_TEL} className="text-lg font-extrabold text-white flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#F97316]" /> {PHONE}
              </a>
            </div>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                className="block px-5 py-3.5 font-extrabold border-b border-white/8 hover:bg-white/5 text-white/90">
                {l.label}
              </a>
            ))}
            {isAuthenticated ? (
              <div className="p-4 space-y-2">
                <p className="text-[12px] text-white/55 font-semibold px-1">Signed in as <span className="text-white">{email}</span></p>
                <button onClick={() => { setOpen(false); goSubscribe(); }} className="btn-orange w-full py-3.5 text-[15px]">Manage plan — ₹99</button>
                <button onClick={() => { signOut(); setOpen(false); }} className="w-full py-3 rounded-full border border-white/12 text-white/80 font-bold hover:bg-white/5 transition-colors">Sign out</button>
              </div>
            ) : (
              <div className="p-4">
                <button onClick={() => { setOpen(false); goSubscribe('basic'); }} className="btn-orange w-full py-3.5 text-[15px]">Get ₹99 Plan — Unlock Now</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
