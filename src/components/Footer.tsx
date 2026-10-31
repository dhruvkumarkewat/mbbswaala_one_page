import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Linkedin, HeartPulse } from 'lucide-react';
import { PHONE_TEL, PHONE, WA_LINK, EMAIL } from '../lib/data';

const SOCIALS = [
  { icon: Instagram, href: 'https://www.instagram.com/mbbswalaofficial', label: 'Instagram' },
  { icon: Facebook, href: 'https://www.facebook.com/mbbswala/', label: 'Facebook' },
  { icon: Youtube, href: 'https://www.youtube.com/@mbbswala23', label: 'YouTube' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/mbbswalaedu', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="bg-[#07080C] border-t border-white/8 text-white/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <a href="#top" className="inline-flex items-center mb-4" aria-label="MBBS WAALA home">
              <img src="/images/mbbswala/navbar-logo.png" alt="MBBS WAALA — NEET Counselling Partner" className="h-10 sm:h-12 w-auto object-contain select-none" />
            </a>
            <p className="text-[12px] sm:text-[13px] font-bold leading-relaxed text-white/55 max-w-xs">Stress-free NEET counselling for India — seat matrix, cut-offs and human experts from Bhopal. Predict, match, compare — then lock your choice with confidence.</p>
            <div className="flex gap-2.5 mt-5">
              {SOCIALS.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="w-10 h-10 grid place-items-center rounded-full bg-white/6 border border-white/10 text-white/70 hover:bg-[#F97316] hover:border-[#F97316] hover:text-white transition-all">
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 mb-3">Product</p>
            <ul className="space-y-2 text-[12px] sm:text-[13px] font-extrabold">
              <li><a href="#predictor" className="hover:text-[#FDBA74] transition-colors">AI Predictor</a></li>
              <li><a href="#tools" className="hover:text-[#FDBA74] transition-colors">Cutoffs</a></li>
              <li><a href="#tools" className="hover:text-[#FDBA74] transition-colors">Seat Matrix</a></li>
              <li><a href="#tools" className="hover:text-[#FDBA74] transition-colors">Compare</a></li>
              <li><a href="#pricing" className="hover:text-[#FDBA74] transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 mb-3">Support</p>
            <ul className="space-y-2 text-[12px] sm:text-[13px] font-extrabold">
              <li><a href="#faq" className="hover:text-[#FDBA74] transition-colors">FAQs</a></li>
              <li><a href="#contact" className="hover:text-[#FDBA74] transition-colors">Counselling</a></li>
              <li><a href="#contact" className="hover:text-[#FDBA74] transition-colors">Contact</a></li>
              <li><a href={WA_LINK} target="_blank" rel="noreferrer" className="hover:text-[#FDBA74] transition-colors">WhatsApp</a></li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 mb-3">Reach us</p>
            <ul className="space-y-2.5 text-[12px] sm:text-[13px] font-extrabold">
              <li><a href={PHONE_TEL} className="flex items-start gap-2 hover:text-[#FDBA74] transition-colors"><Phone className="w-4 h-4 mt-0.5 text-[#F97316] shrink-0" /> {PHONE}<span className="text-white/35 font-bold"> (7 days)</span></a></li>
              <li><a href={`mailto:${EMAIL}`} className="flex items-start gap-2 hover:text-[#FDBA74] transition-colors"><Mail className="w-4 h-4 mt-0.5 text-[#F97316] shrink-0" /> {EMAIL}</a></li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-[#F97316] shrink-0" /> MBBS Waala, Bhopal,<br />Madhya Pradesh — 462001</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/8 mt-10 pt-7 text-[10px] sm:text-[11px] font-bold text-white/40">
          <p>© 2026 MBBS Waala · All rights reserved. NEET is a trademark of NTA.</p>
          <p className="inline-flex items-center gap-1.5"><HeartPulse className="w-4 h-4 text-[#F97316]" /> 10+ years · 8,000+ medical admissions guided</p>
        </div>
      </div>
    </footer>
  );
}
