"use client"

import { ThreeDMarquee } from "@/components/ui/3d-marquee"
import { TypewriterEffect } from "@/components/ui/typewriter-effect"

export default function HeroMarquee() {
  const images = [
    "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1665686377065-08ba896d16fd?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1664906225771-ad3c3c585c4a?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=970&h=700&fit=crop",
    "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=970&h=700&fit=crop",
  ]

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-white">
      {/* Optimized Background Elements - Single smooth animation */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute top-32 left-32 w-80 h-80 border border-neutral-200 rotate-12 rounded-[2rem] transform-gpu"
          style={{
            animation: 'float 8s ease-in-out infinite',
            willChange: 'transform',
          }}
        ></div>
        <div 
          className="absolute bottom-40 right-32 w-96 h-96 border border-neutral-200 -rotate-12 rounded-[2.5rem] transform-gpu"
          style={{
            animation: 'float 10s ease-in-out infinite 2s',
            willChange: 'transform',
          }}
        ></div>
        <div 
          className="absolute top-1/3 right-1/3 w-64 h-64 border border-neutral-200 rotate-45 rounded-[1.5rem] transform-gpu"
          style={{
            animation: 'float 12s ease-in-out infinite 4s',
            willChange: 'transform',
          }}
        ></div>
      </div>
      
      {/* Optimized AI Neural Network Effect - Smoother pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="neural-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="#8b5cf6" style={{ animation: 'pulse 4s ease-in-out infinite' }} />
              <circle cx="90" cy="90" r="1" fill="#8b5cf6" style={{ animation: 'pulse 4s ease-in-out infinite 1s' }} />
              <circle cx="90" cy="10" r="1" fill="#8b5cf6" style={{ animation: 'pulse 4s ease-in-out infinite 2s' }} />
              <circle cx="10" cy="90" r="1" fill="#8b5cf6" style={{ animation: 'pulse 4s ease-in-out infinite 3s' }} />
              <line x1="10" y1="10" x2="90" y2="90" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.2" />
              <line x1="90" y1="10" x2="10" y2="90" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-pattern)" />
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-20 mx-auto max-w-5xl px-12 text-center">
        {/* Headline */}
        <h1 className="mx-auto max-w-4xl text-5xl font-light tracking-tight text-neutral-900 md:text-6xl lg:text-7xl leading-[1.15] mb-6">
          Where documents
          <br />
          <span className="inline-flex items-baseline mt-2">
            <span className="font-medium">become&nbsp;</span>
            <TypewriterEffect 
              words={[
                {
                  text: "intelligence.",
                  className: "bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent font-medium"
                }
              ]}
              className="inline-block"
              cursorClassName="bg-gradient-to-b from-orange-500 to-orange-600"
            />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-2xl text-xl text-neutral-600 font-light leading-[1.6] tracking-wide">
          Stop drowning in documents. Let AI understand, organize, and surface what matters—turning chaos into clarity with a single conversation.
        </p>

        {/* CTA Buttons */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5">
          <button className="group relative overflow-hidden px-6 py-2 bg-orange-600 text-white rounded-lg font-bold transition duration-400">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
            <span className="relative flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
              Start Free Trial
            </span>
          </button>

          <button className="group relative overflow-hidden px-6 py-2 bg-black text-white rounded-lg font-bold transition duration-400">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
            <span className="relative flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-6.219-8.56" />
              </svg>
              Watch Demo
            </span>
          </button>
       
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 flex flex-col items-center gap-8">
          <p className="text-sm text-neutral-500 font-light tracking-wide uppercase">
            Transforming knowledge work for innovative teams
          </p>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-500 to-cyan-500"></div>
              <span className="text-sm text-neutral-600 font-medium">TechCorp</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-gradient-to-br from-orange-500 to-red-500"></div>
              <span className="text-sm text-neutral-600 font-medium">FinanceHub</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-gradient-to-br from-green-500 to-emerald-500"></div>
              <span className="text-sm text-neutral-600 font-medium">LegalTech</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-gradient-to-br from-orange-500 to-red-500"></div>
              <span className="text-sm text-neutral-600 font-medium">ConsultPro</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Marquee Background */}
      <ThreeDMarquee className="pointer-events-none absolute inset-0 h-full w-full opacity-25" images={images} />

      {/* Optimized Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/40 pointer-events-none"></div>
      
      {/* Radial Gradient for Focus */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at center, transparent 0%, transparent 50%, rgba(255, 255, 255, 0.5) 100%)'
      }}></div>

    </div>
  )
}
