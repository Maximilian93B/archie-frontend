"use client"

import { ThreeDMarquee } from "@/components/ui/3d-marquee"

export default function HeroMarquee() {
  const images = [
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
    "/placeholder.svg?height=700&width=970",
  ]

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-white">
      {/* Minimal Background Elements */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute top-32 left-32 w-80 h-80 border border-neutral-200 rotate-12 rounded-[2rem]"></div>
        <div className="absolute bottom-40 right-32 w-96 h-96 border border-neutral-200 -rotate-12 rounded-[2.5rem]"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 border border-neutral-200 rotate-45 rounded-[1.5rem]"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-20 mx-auto max-w-4xl px-8 text-center">
        {/* Headline */}
        <h1 className="mx-auto max-w-5xl text-4xl font-light tracking-tight text-neutral-900 md:text-6xl lg:text-7xl leading-[1.1] mb-8">
          Document management
          <br />
          <span className="relative inline-block mt-2">
            <span className="bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent font-medium">
              reimagined.
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-8 max-w-xl text-lg text-neutral-600 font-light leading-relaxed">
          AI-powered intelligence meets intuitive design. 
          Transform your business documents into organized, searchable knowledge.
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group relative w-full sm:w-auto overflow-hidden rounded-2xl bg-neutral-900 px-8 py-4 text-white font-medium shadow-lg shadow-neutral-900/25 transition-all duration-500 hover:shadow-xl hover:shadow-neutral-900/40 hover:scale-[1.02] active:scale-[0.98]">
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 to-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative flex items-center justify-center gap-2">
              Start Free Trial
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </button>

          <button className="group relative w-full sm:w-auto overflow-hidden rounded-2xl bg-neutral-50 border border-neutral-200 px-8 py-4 text-neutral-700 font-medium shadow-sm transition-all duration-500 hover:bg-neutral-100 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]">
            <span className="relative flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-6.219-8.56" />
              </svg>
              Watch Demo
            </span>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-col items-center gap-6 opacity-60">
          <p className="text-sm text-neutral-500 font-light tracking-wide uppercase">
            Trusted by forward-thinking teams
          </p>
          <div className="flex items-center gap-8 text-neutral-400">
            <div className="w-24 h-6 bg-neutral-200 rounded opacity-60"></div>
            <div className="w-20 h-6 bg-neutral-200 rounded opacity-60"></div>
            <div className="w-28 h-6 bg-neutral-200 rounded opacity-60"></div>
            <div className="w-22 h-6 bg-neutral-200 rounded opacity-60"></div>
          </div>
        </div>
      </div>

      {/* 3D Marquee Background */}
      <ThreeDMarquee className="pointer-events-none absolute inset-0 h-full w-full opacity-20" images={images} />

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/20 pointer-events-none"></div>
    </div>
  )
}
