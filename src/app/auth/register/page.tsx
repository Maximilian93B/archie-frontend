'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Mail, Lock, User, Building, Globe, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { RegistrationTypeSelector } from '@/components/auth/registration-type-selector'
import { RegistrationSuccess } from '@/components/auth/registration-success'

// Schema for organization registration
const organizationSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  company: z.string().min(1, 'Company name is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

// Schema for individual registration
const individualSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

type OrganizationFormData = z.infer<typeof organizationSchema>
type IndividualFormData = z.infer<typeof individualSchema>

export default function RegisterPage() {
  const [registrationType, setRegistrationType] = useState<'individual' | 'organization' | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [generatedSubdomain, setGeneratedSubdomain] = useState('')
  const [registrationSuccess, setRegistrationSuccess] = useState<{subdomain: string, email: string} | null>(null)
  const router = useRouter()
  const { register: registerUser } = useAuth()

  // Organization form
  const organizationForm = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
  })

  // Individual form
  const individualForm = useForm<IndividualFormData>({
    resolver: zodResolver(individualSchema),
  })

  const companyName = organizationForm.watch('company')

  // Generate subdomain from company name or user name
  useEffect(() => {
    if (registrationType === 'organization' && companyName) {
      const subdomain = companyName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
        .substring(0, 63)
      setGeneratedSubdomain(subdomain)
    } else if (registrationType === 'individual') {
      const firstName = individualForm.watch('first_name')
      const lastName = individualForm.watch('last_name')
      if (firstName || lastName) {
        const name = `${firstName || ''}-${lastName || ''}`.toLowerCase()
        const randomSuffix = Math.random().toString(36).substring(2, 7)
        const subdomain = `${name}-${randomSuffix}`
          .replace(/[^a-z0-9-]+/g, '-')
          .replace(/^-|-$/g, '')
          .substring(0, 63)
        setGeneratedSubdomain(subdomain)
      }
    }
  }, [companyName, registrationType, individualForm.watch('first_name'), individualForm.watch('last_name')])

  const onSubmitOrganization = async (data: OrganizationFormData) => {
    try {
      setIsLoading(true)
      const { confirmPassword, ...registerData } = data
      
      // Add registration type to indicate organization
      const registrationPayload = {
        ...registerData,
        registration_type: 'organization'
      }
      
      const user = await registerUser(registrationPayload)
      
      // Use the subdomain from the backend response
      const subdomain = user.tenant_subdomain || generatedSubdomain
      
      setRegistrationSuccess({
        subdomain: subdomain,
        email: data.email
      })
    } catch (error) {
      // Error handled by auth context
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmitIndividual = async (data: IndividualFormData) => {
    try {
      setIsLoading(true)
      const { confirmPassword, ...registerData } = data
      
      // Add registration type and auto-generated company name
      const registrationPayload = {
        ...registerData,
        company: `${data.first_name} ${data.last_name}'s Workspace`,
        registration_type: 'individual'
      }
      
      const user = await registerUser(registrationPayload)
      
      // Use the subdomain from the backend response
      const subdomain = user.tenant_subdomain || generatedSubdomain
      
      setRegistrationSuccess({
        subdomain: subdomain,
        email: data.email
      })
    } catch (error) {
      // Error handled by auth context
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthSignup = (provider: 'google' | 'github') => {
    // Store registration type and company name for OAuth callback
    sessionStorage.setItem('oauth_registration_type', registrationType)
    if (registrationType === 'organization' && formData.company) {
      sessionStorage.setItem('oauth_company_name', formData.company)
    }
    
    // Redirect to backend OAuth endpoint with registration type
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
    const params = new URLSearchParams({
      type: registrationType,
      ...(registrationType === 'organization' && formData.company ? { company: formData.company } : {})
    })
    
    window.location.href = `${apiUrl}/api/v1/auth/oauth/${provider}?${params}`
  }

  // Show success screen if registration complete
  if (registrationSuccess) {
    return (
      <RegistrationSuccess
        subdomain={registrationSuccess.subdomain}
        email={registrationSuccess.email}
        onContinue={() => {
          // Option 1: Redirect to pricing (current flow)
          router.push('/pricing')
          
          // Option 2: Redirect to subdomain (uncomment to enable)
          // const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'archivus.app'
          // const protocol = appDomain.includes('localhost') ? 'http' : 'https'
          // window.location.href = `${protocol}://${registrationSuccess.subdomain}.${appDomain}/dashboard`
        }}
      />
    )
  }

  // Show type selector if no type selected
  if (!registrationType) {
    return <RegistrationTypeSelector onSelect={setRegistrationType} />
  }

  // Show appropriate registration form
  const isOrganization = registrationType === 'organization'
  const form = isOrganization ? organizationForm : individualForm
  const onSubmit = isOrganization ? onSubmitOrganization : onSubmitIndividual

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRegistrationType(null)}
              className="text-gray-600"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </Button>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Create {isOrganization ? 'organization' : 'personal'} account
          </CardTitle>
          <CardDescription className="text-center">
            {isOrganization 
              ? 'Set up your team workspace'
              : 'Start managing your documents with AI'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="first_name"
                    placeholder="John"
                    className="pl-10"
                    disabled={isLoading}
                    {...form.register('first_name')}
                  />
                </div>
                {form.formState.errors.first_name && (
                  <p className="text-sm text-red-600">{form.formState.errors.first_name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="last_name"
                    placeholder="Doe"
                    className="pl-10"
                    disabled={isLoading}
                    {...form.register('last_name')}
                  />
                </div>
                {form.formState.errors.last_name && (
                  <p className="text-sm text-red-600">{form.formState.errors.last_name.message}</p>
                )}
              </div>
            </div>
            
            {/* Only show company field for organizations */}
            {isOrganization && (
              <div className="space-y-2">
                <Label htmlFor="company">Company name</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="company"
                    placeholder="Acme Corp"
                    className="pl-10"
                    disabled={isLoading}
                    {...organizationForm.register('company')}
                  />
                </div>
                {organizationForm.formState.errors.company && (
                  <p className="text-sm text-red-600">{organizationForm.formState.errors.company.message}</p>
                )}
              </div>
            )}

            {/* Show subdomain preview */}
            {generatedSubdomain && (
              <div className="mt-2 p-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">Your Archivus URL will be:</span>
                </div>
                <p className="font-mono text-sm mt-1">
                  {generatedSubdomain}.archivus.app
                </p>
                {!isOrganization && (
                  <p className="text-xs text-gray-500 mt-1">
                    You can change this later in settings
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10"
                  disabled={isLoading}
                  {...form.register('email')}
                />
              </div>
              {form.formState.errors.email && (
                <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  className="pl-10"
                  disabled={isLoading}
                  {...form.register('password')}
                />
              </div>
              {form.formState.errors.password && (
                <p className="text-sm text-red-600">{form.formState.errors.password.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="pl-10"
                  disabled={isLoading}
                  {...form.register('confirmPassword')}
                />
              </div>
              {form.formState.errors.confirmPassword && (
                <p className="text-sm text-red-600">{form.formState.errors.confirmPassword.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create account'
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or sign up with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => handleOAuthSignup('google')}
              disabled={isLoading}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
            <Button
              variant="outline"
              onClick={() => handleOAuthSignup('github')}
              disabled={isLoading}
            >
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </Button>
          </div>
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-600 hover:underline ml-1">
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}