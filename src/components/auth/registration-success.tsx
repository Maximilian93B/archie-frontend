import { CheckCircle, Copy, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from '@/hooks/use-toast'

interface RegistrationSuccessProps {
  subdomain: string
  email: string
  onContinue: () => void
}

export function RegistrationSuccess({ subdomain, email, onContinue }: RegistrationSuccessProps) {
  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'archivus.app'
  const archivusUrl = appDomain.includes('localhost') 
    ? `http://${subdomain}.${appDomain}`
    : `https://${subdomain}.${appDomain}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(archivusUrl)
    toast({
      title: 'Copied!',
      description: 'Your Archivus URL has been copied to clipboard.',
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-12 pb-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-semibold mb-2">
            Welcome to Archivus! 🎉
          </h1>
          
          <p className="text-gray-600 mb-8">
            Your account has been created successfully.
          </p>

          {/* Subdomain Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Your Archivus URL:</p>
            <div className="flex items-center justify-center gap-2">
              <code className="text-sm font-mono bg-white px-3 py-1 rounded border">
                {archivusUrl}
              </code>
              <Button
                size="sm"
                variant="ghost"
                onClick={copyToClipboard}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Important Info */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-medium text-blue-900 mb-1">Important:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Save your subdomain: <strong>{subdomain}</strong></li>
              <li>• You'll need it to log in</li>
              <li>• We've sent this info to {email}</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button onClick={onContinue} className="w-full">
              Choose Your Plan
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              asChild
            >
              <a href="/docs/getting-started" target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Getting Started Guide
              </a>
            </Button>
          </div>

          {/* Help Text */}
          <p className="text-xs text-gray-500 mt-6">
            Need help? Contact support@archivus.app
          </p>
        </CardContent>
      </Card>
    </div>
  )
}