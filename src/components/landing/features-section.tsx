"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import createGlobe from "cobe"
import { useEffect, useRef } from "react"
import { motion } from "motion/react"
import { IconApi, IconSparkles, IconRocket, IconShield, IconBrain, IconSearch } from "@tabler/icons-react"

export default function FeaturesSection() {
  const features = [
    {
      title: "Intelligent Document Processing",
      description:
        "AI automatically analyzes, categorizes, and extracts key insights from your documents the moment they're uploaded.",
      skeleton: <SkeletonOne />,
      icon: <IconBrain className="h-5 w-5 text-neutral-700" />,
      className: "col-span-1 lg:col-span-4",
    },
    {
      title: "Smart Search & Discovery",
      description:
        "Find any document instantly with AI-powered search that understands context, not just keywords.",
      skeleton: <SkeletonTwo />,
      icon: <IconSearch className="h-5 w-5 text-neutral-700" />,
      className: "col-span-1 lg:col-span-2",
    },
    {
      title: "Developer-First APIs",
      description:
        "Built for seamless integration with comprehensive REST APIs that scale with your business needs.",
      skeleton: <SkeletonThree />,
      icon: <IconApi className="h-5 w-5 text-neutral-700" />,
      className: "col-span-1 lg:col-span-3",
    },
    {
      title: "Enterprise Performance",
      description:
        "Built with Go for unmatched speed and reliability. Handle millions of documents with sub-second response times.",
      skeleton: <SkeletonFour />,
      icon: <IconRocket className="h-5 w-5 text-neutral-700" />,
      className: "col-span-1 lg:col-span-3",
    },
  ]

  return (
    <div className="relative py-24 lg:py-32 bg-neutral-50">
      {/* Minimal Background Pattern */}
      <div className="absolute inset-0 opacity-[0.01]">
        <div className="absolute top-40 left-20 w-72 h-72 border border-neutral-300 rotate-12 rounded-[2rem]"></div>
        <div className="absolute bottom-32 right-24 w-96 h-96 border border-neutral-300 -rotate-6 rounded-[2.5rem]"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 border border-neutral-300 rotate-45 rounded-[1.5rem]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-8">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 mb-8">
            <IconSparkles className="h-4 w-4" />
            Powered by AI
          </div>

          <h2 className="mx-auto max-w-4xl text-3xl font-light tracking-tight text-neutral-900 md:text-4xl lg:text-5xl mb-6 leading-[1.2]">
            Everything you need to{" "}
            <span className="font-medium text-neutral-900">
              transform documents
            </span>
            {" "}into intelligence.
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-neutral-600 font-light leading-relaxed">
            From automatic document processing to intelligent search and analytics, 
            Archivus provides the complete toolkit for modern document management.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={cn(feature.className)}
            >
              <FeatureCard>
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-white shadow-sm border border-neutral-200/60">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <FeatureTitle>{feature.title}</FeatureTitle>
                    <FeatureDescription>{feature.description}</FeatureDescription>
                  </div>
                </div>
                <div className="h-full w-full">{feature.skeleton}</div>
              </FeatureCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

const FeatureCard = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl bg-white border border-neutral-200/60 p-8 shadow-sm transition-all duration-700 hover:shadow-lg hover:shadow-neutral-900/10 hover:border-neutral-300/80 hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return <h3 className="text-lg font-medium tracking-tight text-neutral-900 mb-3">{children}</h3>
}

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return <p className="text-sm text-neutral-600 font-light leading-relaxed">{children}</p>
}

export const SkeletonOne = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-neutral-50 to-white border border-neutral-200/40">
      <div className="p-6 space-y-4">
        {/* Document Icons */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-10 bg-gradient-to-br from-red-100 to-red-200 rounded border border-red-300/60 flex items-center justify-center">
            <span className="text-xs font-medium text-red-600">PDF</span>
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-2 bg-neutral-200 rounded-full w-3/4"></div>
            <div className="h-1.5 bg-neutral-100 rounded-full w-1/2"></div>
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded border border-blue-300/60 flex items-center justify-center">
            <span className="text-xs font-medium text-blue-600">DOC</span>
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-2 bg-neutral-200 rounded-full w-2/3"></div>
            <div className="h-1.5 bg-neutral-100 rounded-full w-3/4"></div>
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded border border-emerald-300/60 flex items-center justify-center">
            <span className="text-xs font-medium text-emerald-600">XLS</span>
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-2 bg-neutral-200 rounded-full w-5/6"></div>
            <div className="h-1.5 bg-neutral-100 rounded-full w-2/3"></div>
          </div>
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export const SkeletonTwo = () => {
  return (
    <div className="relative h-full p-6 bg-gradient-to-br from-neutral-50 to-white border border-neutral-200/40 rounded-xl">
      {/* Search Bar */}
      <div className="relative mb-6">
        <div className="w-full h-10 bg-white border border-neutral-200 rounded-lg flex items-center px-3 shadow-sm">
          <svg className="w-4 h-4 text-neutral-400 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <div className="h-3 bg-neutral-200 rounded w-32 animate-pulse"></div>
        </div>
      </div>

      {/* Search Results */}
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-3 bg-white rounded-lg border border-neutral-100 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-neutral-100 rounded border"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-neutral-200 rounded w-3/4"></div>
                <div className="h-2 bg-neutral-100 rounded w-1/2"></div>
              </div>
              <div className="text-xs text-neutral-400">99%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export const SkeletonThree = () => {
  return (
    <div className="relative h-full">
      <div className="rounded-xl bg-neutral-900 p-6 h-full overflow-hidden shadow-lg border border-neutral-800">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-4 text-sm font-medium text-neutral-400">Terminal</span>
        </div>
        <div className="font-mono text-sm text-neutral-300 space-y-2">
          <div className="text-green-400">$ curl -X POST https://api.archivus.com/v1/documents</div>
          <div className="text-neutral-500 ml-2">-H "Authorization: Bearer token"</div>
          <div className="text-neutral-500 ml-2">-H "Content-Type: multipart/form-data"</div>
          <div className="text-neutral-500 ml-2">-F "file=@contract.pdf"</div>
          <div className="text-neutral-500 ml-2">-F "auto_process=true"</div>
          <div className="text-green-400 mt-4">✓ 201 Created</div>
          <div className="text-neutral-400">Response: Document processed successfully</div>
          <div className="text-neutral-500">Processing time: 0.8s</div>
        </div>
      </div>
    </div>
  )
}

export const SkeletonFour = () => {
  return (
    <div className="h-60 md:h-60 flex flex-col items-center relative bg-transparent mt-10">
      <Globe className="absolute -right-10 md:-right-10 -bottom-80 md:-bottom-72" />
    </div>
  )
}

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let phi = 0
    if (!canvasRef.current) return

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 1.8,
      baseColor: [0.9, 0.9, 0.9],
      markerColor: [0.2, 0.2, 0.2],
      glowColor: [0.95, 0.95, 0.95],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
        { location: [51.5074, -0.1278], size: 0.05 },
        { location: [35.6762, 139.6503], size: 0.05 },
        { location: [52.52, 13.405], size: 0.03 },
      ],
      onRender: (state) => {
        state.phi = phi
        phi += 0.008
      },
    })

    return () => {
      globe.destroy()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={cn("drop-shadow-lg", className)}
    />
  )
}
