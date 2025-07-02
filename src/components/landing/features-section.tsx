"use client"

import React from "react"
import { cn } from "@/lib/utils"
import createGlobe from "cobe"
import { useEffect, useRef } from "react"
import { motion } from "motion/react"
import { IconApi, IconSparkles, IconRocket, IconShield, IconBrain, IconSearch } from "@tabler/icons-react"

export default function FeaturesSection() {
  const features = [
    {
      title: "AI-Powered Document Intelligence",
      description:
        "Upload any document and watch as AI instantly extracts insights, generates summaries, and surfaces key information—turning static files into dynamic knowledge.",
      skeleton: <SkeletonOne />,
      icon: <IconBrain className="h-5 w-5 text-neutral-700" />,
      className: "col-span-1 lg:col-span-4",
    },
    {
      title: "Conversational Search",
      description:
        "Ask questions in plain English. Our AI understands context and intent, finding exactly what you need across thousands of documents in seconds.",
      skeleton: <SkeletonTwo />,
      icon: <IconSearch className="h-5 w-5 text-neutral-700" />,
      className: "col-span-1 lg:col-span-2",
    },
    {
      title: "Enterprise-Ready API",
      description:
        "85+ REST endpoints, webhook support, and comprehensive SDKs. Built for developers who demand reliability, speed, and flexibility.",
      skeleton: <SkeletonThree />,
      icon: <IconApi className="h-5 w-5 text-neutral-700" />,
      className: "col-span-1 lg:col-span-3",
    },
    {
      title: "Lightning-Fast Performance",
      description:
        "Built with Go and optimized for speed. Process millions of documents with sub-second response times and 99.9% uptime guarantee.",
      skeleton: <SkeletonFour />,
      icon: <IconRocket className="h-5 w-5 text-neutral-700" />,
      className: "col-span-1 lg:col-span-3",
    },
  ]

  return (
    <div className="relative py-32 lg:py-40 bg-gradient-to-b from-white via-neutral-50/30 to-white">
      {/* Minimal Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-40 left-20 w-72 h-72 border border-neutral-200 rotate-12 rounded-[2rem] animate-pulse transform-gpu" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 right-24 w-96 h-96 border border-neutral-200 -rotate-6 rounded-[2.5rem] animate-pulse transform-gpu" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 border border-neutral-200 rotate-45 rounded-[1.5rem] animate-pulse transform-gpu" style={{ animationDelay: '2.5s' }}></div>
      </div>
      
      {/* Subtle gradient orbs for depth */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-8">
        {/* Header Section */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1]
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-50 to-orange-100 px-5 py-2.5 text-sm font-medium text-orange-700 mb-8 border border-orange-200/50"
            style={{ willChange: "transform, opacity, filter" }}
          >
            <IconSparkles className="h-4 w-4" />
            AI-Powered Features
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ 
              duration: 0.8, 
              delay: 0.1, 
              ease: [0.16, 1, 0.3, 1]
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="mx-auto max-w-4xl text-4xl font-light tracking-tight text-neutral-900 md:text-5xl lg:text-6xl mb-6 leading-[1.15]"
            style={{ willChange: "transform, opacity, filter" }}
          >
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent font-medium">
              transform documents
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2, 
              ease: [0.16, 1, 0.3, 1]
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="mx-auto max-w-2xl text-xl text-neutral-600 font-light leading-[1.6] tracking-wide"
            style={{ willChange: "transform, opacity" }}
          >
            From automatic processing to intelligent search and analytics, 
            Archivus provides the complete toolkit for modern document intelligence.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1]
              }}
              viewport={{ once: true, margin: "-50px" }}
              style={{ willChange: "transform, opacity" }}
              className={cn(feature.className)}
            >
              <FeatureCard>
                <div className="mb-8">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100/50 inline-flex mb-6 border border-orange-200/20">
                    {React.cloneElement(feature.icon, { className: "h-6 w-6 text-orange-600" })}
                  </div>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </div>
                <div className="h-full w-full">{feature.skeleton}</div>
              </FeatureCard>
            </motion.div>
          ))}
        </div>

        {/* Key Differentiators */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1,
            delay: 0.6,
            ease: [0.16, 1, 0.3, 1]
          }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32 text-center"
          style={{ willChange: "transform, opacity" }}
        >
          <h3 className="text-2xl font-light text-neutral-900 mb-8">Why teams choose Archivus</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-semibold text-orange-600 mb-2">10x</div>
              <p className="text-sm text-neutral-600">Faster document retrieval</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-semibold text-orange-600 mb-2">85%</div>
              <p className="text-sm text-neutral-600">Less time organizing files</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-semibold text-orange-600 mb-2">99.9%</div>
              <p className="text-sm text-neutral-600">Uptime guarantee</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

const FeatureCard = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="group relative h-full overflow-hidden rounded-3xl p-8 transition-transform duration-700 ease-out hover:scale-[1.01] transform-gpu" style={{ willChange: "transform" }}>
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-xl border border-white/20 rounded-3xl"></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/30 to-transparent opacity-60"></div>
      
      {/* Subtle inner shadow for depth */}
      <div className="absolute inset-0 rounded-3xl shadow-inner"></div>
      
      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"></div>
      
      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-3xl border border-orange-200/0 group-hover:border-orange-200/40 transition-colors duration-700 ease-out"></div>
      
      <div className="relative z-10">{children}</div>
    </div>
  )
}

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return <h3 className="text-xl font-semibold tracking-tight text-neutral-900 mb-3">{children}</h3>
}

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return <p className="text-base text-neutral-600 font-light leading-[1.6]">{children}</p>
}

export const SkeletonOne = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-50 to-white border border-neutral-200/40">
      <div className="p-6 space-y-4">
        {/* Document Icons */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.6,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1]
          }}
          viewport={{ once: true }}
          className="flex items-center gap-4"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="w-10 h-12 bg-gradient-to-br from-red-50 to-red-100 rounded-lg border border-red-200/60 flex items-center justify-center shadow-sm">
            <span className="text-xs font-semibold text-red-600">PDF</span>
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-2.5 bg-neutral-200/80 rounded-full w-3/4"></div>
            <div className="h-2 bg-neutral-100 rounded-full w-1/2"></div>
          </div>
          <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse"></div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.6,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1]
          }}
          viewport={{ once: true }}
          className="flex items-center gap-4"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="w-10 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200/60 flex items-center justify-center shadow-sm">
            <span className="text-xs font-semibold text-blue-600">DOC</span>
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-2.5 bg-neutral-200/80 rounded-full w-2/3"></div>
            <div className="h-2 bg-neutral-100 rounded-full w-3/4"></div>
          </div>
          <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.6,
            delay: 0.4,
            ease: [0.16, 1, 0.3, 1]
          }}
          viewport={{ once: true }}
          className="flex items-center gap-4"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="w-10 h-12 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg border border-emerald-200/60 flex items-center justify-center shadow-sm">
            <span className="text-xs font-semibold text-emerald-600">XLS</span>
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-2.5 bg-neutral-200/80 rounded-full w-5/6"></div>
            <div className="h-2 bg-neutral-100 rounded-full w-2/3"></div>
          </div>
          <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse"></div>
        </motion.div>
      </div>
    </div>
  )
}

export const SkeletonTwo = () => {
  return (
    <div className="relative h-full p-6 bg-gradient-to-br from-neutral-50 to-white border border-neutral-200/40 rounded-2xl">
      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1]
        }}
        viewport={{ once: true }}
        className="relative mb-6"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="w-full h-12 bg-white border border-neutral-200 rounded-xl flex items-center px-4 shadow-sm">
          <svg className="w-4 h-4 text-neutral-400 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <div className="h-3 bg-neutral-200 rounded w-32 animate-pulse"></div>
        </div>
      </motion.div>

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
      <div className="rounded-2xl bg-neutral-900 p-6 h-full overflow-hidden shadow-xl border border-neutral-800">
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
    <div className="h-64 md:h-64 flex flex-col items-center relative bg-transparent mt-10">
      <Globe className="absolute -right-10 md:-right-10 -bottom-80 md:-bottom-72 opacity-90" />
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
      baseColor: [0.95, 0.95, 0.98],
      markerColor: [0.55, 0.35, 0.96],
      glowColor: [0.55, 0.35, 0.96],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
        { location: [51.5074, -0.1278], size: 0.05 },
        { location: [35.6762, 139.6503], size: 0.05 },
        { location: [52.52, 13.405], size: 0.03 },
      ],
      onRender: (state) => {
        state.phi = phi
        phi += 0.005
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
