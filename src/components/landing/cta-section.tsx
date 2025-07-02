'use client';

import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import FeaturesGrid from './features-grid';

export function CTASection() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* Features Grid Section */}
      <FeaturesGrid />
      
      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/10 to-white">
      {/* Minimal Background Pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute top-20 left-16 w-64 h-64 border border-orange-200 rotate-12 rounded-[2rem] animate-pulse transform-gpu" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 border border-orange-200 -rotate-6 rounded-[2.5rem] animate-pulse transform-gpu" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 border border-orange-200 rotate-45 rounded-[1.5rem] animate-pulse transform-gpu" style={{ animationDelay: '2s' }}></div>
      </div>
      
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-8 py-32 lg:py-40">
        <div className="text-center">
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ 
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1]
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-8"
            style={{ willChange: "transform, opacity, filter" }}
          >
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-orange-50 to-orange-100 px-5 py-2.5 text-sm font-medium text-orange-700 border border-orange-200/50">
              <Sparkles className="mr-2 h-4 w-4" />
              Start your AI-powered journey today
            </span>
          </motion.div>

          {/* Heading */}
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
            Ready to{" "}
            <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent font-medium">
              transform your documents
            </span>
            ?
          </motion.h2>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="mx-auto mt-6 max-w-2xl text-xl text-neutral-600 font-light leading-[1.6] tracking-wide"
            style={{ willChange: "transform, opacity" }}
          >
            Join thousands of teams already using Archivus to unlock the power of AI-driven 
            document intelligence. Get started in minutes, not hours.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1]
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
            style={{ willChange: "transform, opacity" }}
          >
            {isAuthenticated ? (
              <>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Button 
                    size="lg" 
                    className="px-10 py-4 text-base bg-neutral-900 text-white hover:bg-neutral-800 font-medium rounded-full border-0 shadow-md transition-all duration-300 hover:shadow-lg transform-gpu"
                    onClick={() => window.location.href = '/dashboard'}
                  >
                    Open Dashboard
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="px-10 py-4 text-base border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 font-medium rounded-full transition-all duration-300 hover:shadow-md transform-gpu"
                    onClick={() => window.location.href = '/dashboard'}
                  >
                    Upload Documents
                  </Button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Button 
                    size="lg" 
                    className="px-10 py-4 text-base bg-neutral-900 text-white hover:bg-neutral-800 font-medium rounded-full border-0 shadow-md transition-all duration-300 hover:shadow-lg transform-gpu"
                    onClick={() => window.location.href = '/auth'}
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="px-10 py-4 text-base border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 font-medium rounded-full transition-all duration-300 hover:shadow-md transform-gpu"
                    onClick={() => window.location.href = '/auth'}
                  >
                    View Demo
                  </Button>
                </motion.div>
              </>
            )}
          </motion.div>

          {/* Features List */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1]
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-20"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-semibold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-2">85+</div>
                <div className="text-sm text-neutral-600 font-light">API Endpoints</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-semibold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-2">99.9%</div>
                <div className="text-sm text-neutral-600 font-light">Uptime SLA</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-semibold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-2">24/7</div>
                <div className="text-sm text-neutral-600 font-light">AI Processing</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ 
              duration: 1,
              delay: 0.9,
              ease: [0.16, 1, 0.3, 1]
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-16 pt-8 border-t border-neutral-200/40"
            style={{ willChange: "opacity" }}
          >
            <p className="text-sm text-neutral-500 font-light tracking-wide">
              No credit card required • 7-day free trial • Cancel anytime
            </p>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
} 