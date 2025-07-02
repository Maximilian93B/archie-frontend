'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, FileText, Sparkles, Zap, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useSubscription } from '@/hooks/use-subscription'
import { Skeleton } from '@/components/ui/skeleton'

export default function CheckoutSuccessPage() {
  const router = useRouter()
  const { status, currentPlan, refreshStatus } = useSubscription()
  const [countdown, setCountdown] = useState(10)
  
  useEffect(() => {
    // Refresh subscription status
    refreshStatus()
  }, [refreshStatus])
  
  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          router.push('/dashboard')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [router])
  
  const nextSteps = [
    {
      icon: FileText,
      title: 'Upload your first document',
      description: 'Drag and drop or browse to upload PDFs, Word docs, and more'
    },
    {
      icon: Sparkles,
      title: 'Experience AI insights',
      description: 'Get intelligent summaries and analysis of your documents'
    },
    {
      icon: Zap,
      title: 'Set up your workspace',
      description: 'Organize documents with folders and tags for easy access'
    }
  ]
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="border-0 shadow-xl">
          <CardContent className="pt-12 pb-8">
            {/* Success Icon */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              
              <h1 className="text-3xl font-bold mb-2">
                Welcome to Archivus!
              </h1>
              
              {currentPlan ? (
                <p className="text-lg text-gray-600">
                  You're now on the <span className="font-semibold text-gray-900">{currentPlan.name}</span> plan
                </p>
              ) : (
                <Skeleton className="h-6 w-48 mx-auto" />
              )}
            </div>
            
            {/* Plan Summary */}
            {currentPlan && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="font-semibold mb-3">Your plan includes:</h2>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>{currentPlan.limits.documents === -1 ? 'Unlimited' : currentPlan.limits.documents.toLocaleString()} documents</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>{currentPlan.limits.storage === -1 ? 'Unlimited' : `${currentPlan.limits.storage} GB`} storage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>{currentPlan.limits.aiCredits === -1 ? 'Unlimited' : currentPlan.limits.aiCredits.toLocaleString()} AI credits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>{currentPlan.limits.users === -1 ? 'Unlimited' : currentPlan.limits.users} team members</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Next Steps */}
            <div className="mb-8">
              <h2 className="font-semibold mb-4">Get started in 3 easy steps:</h2>
              <div className="space-y-3">
                {nextSteps.map((step, index) => (
                  <div key={index} className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{step.title}</h3>
                      <p className="text-xs text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Actions */}
            <div className="space-y-3 mb-6">
              <Button 
                onClick={() => router.push('/dashboard')} 
                className="w-full"
                size="lg"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => router.push('/dashboard/billing')}
                className="w-full"
              >
                View Billing Details
              </Button>
            </div>
            
            {/* Auto-redirect notice */}
            <p className="text-xs text-gray-500 text-center">
              Redirecting to dashboard in {countdown} seconds...
            </p>
          </CardContent>
        </Card>
        
        {/* Email confirmation note */}
        <p className="text-sm text-gray-600 text-center mt-6">
          We've sent a confirmation email to your registered address
        </p>
      </div>
    </div>
  )
}