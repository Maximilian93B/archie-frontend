'use client';

import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTASection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Minimal Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-16 w-64 h-64 border border-neutral-300 rotate-12 rounded-[2rem]"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 border border-neutral-300 -rotate-6 rounded-[2.5rem]"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 border border-neutral-300 rotate-45 rounded-[1.5rem]"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-8 py-24 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="mb-8">
            <span className="inline-flex items-center rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700">
              <Sparkles className="mr-2 h-4 w-4" />
              Start your AI-powered journey today
            </span>
          </div>

          {/* Heading */}
          <h2 className="mx-auto max-w-4xl text-3xl font-light tracking-tight text-neutral-900 md:text-4xl lg:text-5xl mb-6 leading-[1.2]">
            Ready to{" "}
            <span className="font-medium text-neutral-900">
              transform your
            </span>
            {" "}document management?
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 font-light leading-relaxed">
            Join thousands of teams already using Archivus to unlock the power of AI-driven 
            document intelligence. Get started in minutes, not hours.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex items-center justify-center gap-4">
            {isAuthenticated ? (
              <>
                <Button 
                  size="lg" 
                  className="px-8 py-4 text-base bg-neutral-900 text-white hover:bg-neutral-800 font-medium rounded-xl border-0 shadow-sm transition-all duration-200 hover:shadow-md"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  Open Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-4 text-base border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-medium rounded-xl transition-all duration-200"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  Upload Documents
                </Button>
              </>
            ) : (
              <>
                <Button 
                  size="lg" 
                  className="px-8 py-4 text-base bg-neutral-900 text-white hover:bg-neutral-800 font-medium rounded-xl border-0 shadow-sm transition-all duration-200 hover:shadow-md"
                  onClick={() => window.location.href = '/auth'}
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-4 text-base border-neutral-300 text-neutral-700 hover:bg-neutral-50 font-medium rounded-xl transition-all duration-200"
                  onClick={() => window.location.href = '/auth'}
                >
                  View Demo
                </Button>
              </>
            )}
          </div>

          {/* Features List */}
          <div className="mt-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-2xl font-light text-neutral-900 mb-1">85+</div>
                <div className="text-sm text-neutral-600 font-light">API Endpoints</div>
              </div>
              <div>
                <div className="text-2xl font-light text-neutral-900 mb-1">99.9%</div>
                <div className="text-sm text-neutral-600 font-light">Uptime SLA</div>
              </div>
              <div>
                <div className="text-2xl font-light text-neutral-900 mb-1">24/7</div>
                <div className="text-sm text-neutral-600 font-light">AI Processing</div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-neutral-200/60">
            <p className="text-sm text-neutral-500 font-light">
              No credit card required • Free 14-day trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 