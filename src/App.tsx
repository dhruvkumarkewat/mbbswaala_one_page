import { useState } from 'react';
import { AuthProvider } from './lib/AuthContext';
import Navbar from './components/Navbar';
import StickyCallBar from './components/StickyCallBar';
import Hero from './components/Hero';
import Predictor from './components/Predictor';
import Features from './components/Features';
import { StatsStrip, PainMarquee, VideoSection, ToolsGrid, TrustSplit, Counsellors, BrandFooterBadge } from './components/Sections';
import Pricing from './components/Pricing';
import OfferPopup from './components/OfferPopup';
import { Testimonials, Faq, FinalCta } from './components/Social';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

export default function App() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <AuthProvider>
      <div className="min-h-[100dvh] bg-[#07080C] font-sans text-[#E8EAED] antialiased">
        <Navbar onOpenAuth={() => setAuthOpen(true)} />
        <main>
          <Hero onOpenAuth={() => setAuthOpen(true)} />
          <StatsStrip />
          <PainMarquee />
          <Predictor onOpenAuth={() => setAuthOpen(true)} />
          <Features />
          <TrustSplit />
          <Pricing onOpenAuth={() => setAuthOpen(true)} />
          <VideoSection />
          <ToolsGrid />
          <Counsellors />
          <Testimonials />
          <Faq />
          <FinalCta />
          <BrandFooterBadge />
        </main>
        <Footer />

        {/* Interactive layers */}
        <OfferPopup onOpenAuth={() => setAuthOpen(true)} />
        <StickyCallBar />
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      </div>
    </AuthProvider>
  );
}
