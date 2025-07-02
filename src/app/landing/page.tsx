'use client';

import { useEffect } from 'react';
import { Navbar } from '@/components/landing/header';
import HeroMarquee from '@/components/landing/hero-section';
import FeaturesSection from '@/components/landing/features-section';
import { CTASection } from '@/components/landing/cta-section';
import { Footer } from '@/components/landing/footer';

export default function LandingPage() {
  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Preload critical fonts
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = '/fonts/inter-var.woff2';
    document.head.appendChild(link);
    
    // Clean up
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white antialiased">
      {/* Fixed navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-200/50">
        <Navbar />
      </div>
      
      {/* Main content with proper spacing */}
      <main className="relative">
        {/* Hero section */}
        <section className="relative">
          <HeroMarquee />
        </section>
        
        {/* Features section with scroll margin */}
        <section id="features" className="scroll-mt-20">
          <FeaturesSection />
        </section>
        
        {/* CTA section */}
        <section className="relative">
          <CTASection />
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Subtle page transitions */}
      <style jsx global>{`
        @media (prefers-reduced-motion: no-preference) {
          * {
            scroll-behavior: smooth;
          }
          
          ::selection {
            background-color: rgba(139, 92, 246, 0.2);
            color: #1a1a1a;
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 12px;
          }
          
          ::-webkit-scrollbar-track {
            background: #f8f9fa;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #e5e7eb;
            border-radius: 6px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #d1d5db;
          }
        }
        
        /* Smooth section transitions */
        section {
          will-change: transform;
        }
        
        /* Optimize animations */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
} 