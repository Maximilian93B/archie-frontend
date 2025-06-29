'use client';


import { Navbar } from '@/components/landing/header';
import HeroMarquee from '@/components/landing/hero-section';
import FeaturesSection from '@/components/landing/features-section';
import { CTASection } from '@/components/landing/cta-section';
import { Footer } from '@/components/landing/footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroMarquee />
        <div id="features">
          <FeaturesSection />
        </div>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
} 