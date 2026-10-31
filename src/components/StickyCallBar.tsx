import { useEffect, useState } from 'react';
import { Phone, X } from 'lucide-react';
import { PHONE, PHONE_TEL, WA_LINK } from '../lib/data';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-0.297-0.149-1.758-0.867-2.03-0.967-0.273-0.099-0.471-0.148-0.67 0.15-0.197 0.297-0.767 0.966-0.94 1.164-0.173 0.199-0.347 0.223-0.644 0.075-0.297-0.15-1.255-0.463-2.39-1.475-0.883-0.788-1.48-1.761-1.653-2.059-0.173-0.297-0.018-0.458 0.13-0.606 0.134-0.133 0.297-0.347 0.446-0.52 0.149-0.174 0.198-0.298 0.297-0.497 0.1-0.198 0.05-0.371-0.025-0.52-0.074-0.149-0.669-1.612-0.916-2.207-0.242-0.579-0.487-0.5-0.669-0.51-0.173-0.008-0.371-0.01-0.57-0.01-0.198 0-0.52 0.074-0.792 0.371-0.272 0.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074 0.149 0.198 2.096 3.2 5.077 4.487 0.709 0.306 1.262 0.49 1.694 0.627 0.712 0.227 1.36 0.195 1.871 0.118 0.571-0.085 1.758-0.718 2.006-1.41 0.247-0.694 0.247-1.289 0.173-1.413-0.074-0.124-0.272-0.198-0.57-0.347m-5.421 5.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a8.19 8.19 0 01-1.26-4.827 8.203 8.203 0 018.224-8.207c2.196 0 4.246.858 5.815 2.434a8.187 8.187 0 012.031 5.85c-.001 4.527-3.683 8.234-8.226 8.234m7.067-18.29A10.13 10.13 0 0012.093 0C5.49 0 .202 5.29.194 11.93a11.8 11.8 0 001.58 5.905L.057 24l6.312-1.657a12.03 12.03 0 005.72 1.453h.005c6.608 0 11.899-5.287 11.907-11.92a11.82 11.82 0 00-3.395-8.437"/>
    </svg>
  );
}

export default function StickyCallBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-3 inset-x-0 z-30 flex justify-center px-3 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-[#141820]/95 backdrop-blur-xl border border-white/12 shadow-[0_16px_48px_rgba(0,0,0,.55)] pl-4 pr-1.5 py-1.5 max-w-full">
        <div className="hidden xs:block">
          <p className="text-[9px] uppercase tracking-[0.18em] text-[#FDBA74] font-bold leading-none">7 days a week</p>
          <p className="text-[12px] font-extrabold text-white leading-tight mt-0.5">Talk to a counsellor</p>
        </div>
        <a href={PHONE_TEL} className="inline-flex items-center gap-1.5 rounded-full bg-[#F97316] text-white text-[12px] sm:text-[13px] font-bold px-3.5 sm:px-4 py-2.5 hover:bg-[#EA580C] transition-colors whitespace-nowrap">
          <Phone className="w-4 h-4" /> Call now
        </a>
        <a href={WA_LINK} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="w-10 h-10 grid place-items-center rounded-full bg-[#25D366] text-white hover:brightness-110 transition-all shrink-0">
          <WhatsAppIcon className="w-5 h-5" />
        </a>
        <button onClick={() => setDismissed(true)} aria-label="Dismiss" className="w-8 h-8 grid place-items-center rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
