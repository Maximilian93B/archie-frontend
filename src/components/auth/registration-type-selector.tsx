'use client'

import { useState } from 'react'
import { User, Building2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface RegistrationTypeSelectorProps {
  onSelect: (type: 'individual' | 'organization') => void
}

export function RegistrationTypeSelector({ onSelect }: RegistrationTypeSelectorProps) {
  const [selected, setSelected] = useState<'individual' | 'organization' | null>(null)

  const handleContinue = () => {
    if (selected) {
      onSelect(selected)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Archivus
          </h1>
          <p className="text-lg text-gray-600">
            Choose how you'd like to use Archivus
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Individual Option */}
          <Card 
            className={cn(
              "cursor-pointer transition-all hover:shadow-lg",
              selected === 'individual' && "ring-2 ring-black"
            )}
            onClick={() => setSelected('individual')}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Personal Use</CardTitle>
              <CardDescription>
                For individuals managing personal documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Your own private workspace</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Personal document management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>AI-powered organization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Start with free tier</span>
                </li>
              </ul>
              
              <div className="mt-6 p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-gray-600">
                  Perfect for: Students, researchers, freelancers, and anyone organizing personal documents
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Organization Option */}
          <Card 
            className={cn(
              "cursor-pointer transition-all hover:shadow-lg",
              selected === 'organization' && "ring-2 ring-black"
            )}
            onClick={() => setSelected('organization')}
          >
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Team or Business</CardTitle>
              <CardDescription>
                For companies and teams collaborating
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Shared team workspace</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Multi-user collaboration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Advanced permissions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Custom subdomain</span>
                </li>
              </ul>
              
              <div className="mt-6 p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-gray-600">
                  Perfect for: Businesses, law firms, accounting firms, and teams of any size
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            onClick={handleContinue}
            disabled={!selected}
            className="min-w-[200px]"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <p className="text-sm text-gray-500 mt-4">
            You can always upgrade or change your plan later
          </p>
        </div>
      </div>
    </div>
  )
}