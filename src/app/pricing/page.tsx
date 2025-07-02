'use client'

import { useEffect, useState } from 'react'
import { Check, Star, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useSubscription } from '@/hooks/use-subscription'
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { formatPrice, formatNumber, PricingPlan } from '@/types/subscription'

export default function PricingPage() {
  const searchParams = useSearchParams()
  const { status, plans, startCheckout, isLoading } = useSubscription()
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly')
  
  // Show message from URL params
  useEffect(() => {
    const message = searchParams.get('message')
    if (message === 'subscription_required') {
      toast.info('Please choose a plan to continue using Archivus')
    } else if (searchParams.get('canceled') === 'true') {
      toast.info('Checkout was canceled. Feel free to try again when you\'re ready.')
    }
  }, [searchParams])

  // Get current plan tier
  const currentPlanTier = status?.plan?.tier

  // All plans support both monthly and yearly, so show all plans
  const displayPlans = plans

  const handleStartCheckout = (plan: PricingPlan) => {
    const lookupKey = billingInterval === 'monthly' ? plan.monthlyLookupKey : plan.yearlyLookupKey
    startCheckout(lookupKey)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Zap className="w-4 h-4" />
          Powered by Stripe
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Simple, transparent pricing
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Choose the perfect plan for your document management needs. 
          All plans include AI-powered features and can be changed anytime.
        </p>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Label htmlFor="billing-toggle" className={cn(
            "text-base transition-colors",
            billingInterval === 'monthly' ? 'text-gray-900' : 'text-gray-500'
          )}>
            Monthly billing
          </Label>
          <Switch
            id="billing-toggle"
            checked={billingInterval === 'yearly'}
            onCheckedChange={(checked) => setBillingInterval(checked ? 'yearly' : 'monthly')}
          />
          <Label htmlFor="billing-toggle" className={cn(
            "text-base transition-colors",
            billingInterval === 'yearly' ? 'text-gray-900' : 'text-gray-500'
          )}>
            Yearly billing
            <Badge variant="success" className="ml-2">Save 20%</Badge>
          </Label>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[600px] rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayPlans.map((plan) => {
              const isCurrentPlan = currentPlanTier === plan.tier
              const price = billingInterval === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice
              
              return (
                <Card 
                  key={plan.id}
                  className={cn(
                    'relative transition-all hover:shadow-lg',
                    plan.isPopular && 'border-purple-600 shadow-lg scale-105 lg:scale-110',
                    isCurrentPlan && 'border-green-600'
                  )}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
                        <Star className="w-3 h-3 mr-1" />
                        {plan.badge || 'Most Popular'}
                      </Badge>
                    </div>
                  )}
                  
                  {isCurrentPlan && (
                    <div className="absolute -top-4 right-4">
                      <Badge variant="success">Current Plan</Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8 pt-6">
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                    <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">
                        {formatPrice(price, plan.currency)}
                      </span>
                      <span className="text-gray-600">/{billingInterval === 'monthly' ? 'month' : 'year'}</span>
                    </div>
                    {billingInterval === 'yearly' && (
                      <p className="text-sm text-green-600 mt-1">
                        Save {formatPrice(plan.monthlyPrice * 12 - plan.yearlyPrice, plan.currency)} per year
                      </p>
                    )}
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Limits */}
                    <div className="space-y-3 pb-6 border-b">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Documents</span>
                        <span className="font-medium">
                          {formatNumber(plan.limits.documents)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Storage</span>
                        <span className="font-medium">
                          {plan.limits.storage === -1 ? 'Unlimited' : `${plan.limits.storage} GB`}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">AI Credits</span>
                        <span className="font-medium">
                          {formatNumber(plan.limits.aiCredits)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Team Members</span>
                        <span className="font-medium">
                          {formatNumber(plan.limits.users)}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      {plan.features.core.map((feature, index) => (
                        <FeatureItem key={index} text={feature} included />
                      ))}
                      {plan.features.premium?.map((feature, index) => (
                        <FeatureItem key={`premium-${index}`} text={feature} included premium />
                      ))}
                    </div>

                    {/* CTA Button */}
                    <div className="pt-6">
                      {isCurrentPlan ? (
                        <Button 
                          variant="secondary" 
                          className="w-full" 
                          disabled
                        >
                          Current Plan
                        </Button>
                      ) : (
                        <Button 
                          variant={plan.isPopular ? 'default' : 'outline'}
                          className={cn(
                            'w-full',
                            plan.isPopular && 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                          )}
                          onClick={() => handleStartCheckout(plan)}
                        >
                          Get Started
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16 border-t">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Frequently asked questions
          </h2>
          <div className="space-y-6">
            <FAQItem 
              question="Can I change plans anytime?"
              answer="Yes! You can upgrade or downgrade your plan anytime from your billing settings. Changes take effect immediately and we'll prorate any differences."
            />
            <FAQItem 
              question="What happens if I exceed my limits?"
              answer="We'll notify you when you're approaching your limits. Once reached, you'll need to upgrade to continue using that feature. Your existing data is always safe."
            />
            <FAQItem 
              question="Do you offer a free trial?"
              answer="New accounts automatically start with a 7-day free trial of the Professional plan. No credit card required to start."
            />
            <FAQItem 
              question="What payment methods do you accept?"
              answer="We accept all major credit cards, debit cards, and bank transfers through Stripe. All payments are processed securely."
            />
            <FAQItem 
              question="Can I cancel anytime?"
              answer="Absolutely. You can cancel your subscription anytime from the billing portal. You'll continue to have access until the end of your billing period."
            />
            <FAQItem 
              question="Is there a discount for yearly billing?"
              answer="Yes! Save 20% when you choose yearly billing. That's 2 months free compared to monthly billing."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureItem({ text, included, premium = false }: { text: string; included: boolean; premium?: boolean }) {
  return (
    <div className="flex items-start gap-3">
      {included ? (
        <Check className={cn(
          "w-5 h-5 flex-shrink-0 mt-0.5",
          premium ? "text-purple-600" : "text-green-600"
        )} />
      ) : (
        <div className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      )}
      <span className={cn(
        'text-sm',
        included ? 'text-gray-700' : 'text-gray-400',
        premium && included && 'font-medium'
      )}>
        {text}
      </span>
    </div>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-gray-900">{question}</h3>
      <p className="text-gray-600">{answer}</p>
    </div>
  )
}