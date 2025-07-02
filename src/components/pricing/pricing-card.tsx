import { Check, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useSubscriptionStore } from '@/store/subscription-store'
import { toast } from 'react-hot-toast'

interface PricingCardProps {
  plan: {
    id: string
    name: string
    displayName: string
    price: number
    currency: string
    interval: string
    features: string[]
    limits: {
      documents: number
      storage: number
      aiCredits: number
      users: number
    }
    lookup_key: string
  }
  highlighted?: boolean
  currentPlan?: boolean
}

export function PricingCard({ plan, highlighted, currentPlan }: PricingCardProps) {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const { createCheckoutSession } = useSubscriptionStore()
  const [isLoading, setIsLoading] = useState(false)

  const formatLimit = (value: number, type: string) => {
    if (value === -1) return 'Unlimited'
    if (type === 'storage') return `${value / (1024 ** 3)} GB`
    return value.toLocaleString()
  }

  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      router.push('/auth/register')
      return
    }

    setIsLoading(true)
    try {
      const sessionUrl = await createCheckoutSession(plan.lookup_key)
      if (sessionUrl) {
        window.location.href = sessionUrl
      }
    } catch (error) {
      toast.error('Failed to start checkout. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <Card 
      className={cn(
        'relative transition-all',
        highlighted && 'border-black shadow-lg scale-105',
        'hover:shadow-md'
      )}
    >
      {highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge className="bg-black text-white">
            <Star className="w-3 h-3 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-8 pt-6">
        <h3 className="text-xl font-semibold">{plan.displayName}</h3>
        <div className="mt-4">
          <span className="text-4xl font-bold">${plan.price / 100}</span>
          <span className="text-gray-600">/{plan.interval}</span>
        </div>
        {plan.currency !== 'usd' && (
          <p className="text-sm text-gray-500 mt-1">{plan.currency.toUpperCase()}</p>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Limits */}
        <div className="space-y-3 pb-6 border-b">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Documents</span>
            <span className="font-medium">{formatLimit(plan.limits.documents, 'documents')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Storage</span>
            <span className="font-medium">{formatLimit(plan.limits.storage, 'storage')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">AI Credits</span>
            <span className="font-medium">{formatLimit(plan.limits.aiCredits, 'credits')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Team Members</span>
            <span className="font-medium">{formatLimit(plan.limits.users, 'users')}</span>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="pt-6">
          {currentPlan ? (
            <Button variant="secondary" className="w-full" disabled>
              Current Plan
            </Button>
          ) : (
            <Button 
              variant={highlighted ? 'default' : 'outline'} 
              className="w-full"
              onClick={handleSubscribe}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Get Started'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}