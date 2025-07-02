'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Mail, ArrowLeft, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { apiClient } from '@/lib/api/client'
import { toast } from '@/hooks/use-toast'

const schema = z.object({
  email: z.string().email('Invalid email address'),
})

type FormData = z.infer<typeof schema>

export default function ForgotSubdomainPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [subdomains, setSubdomains] = useState<Array<{ subdomain: string; tenant_name: string }> | null>(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true)
      const response = await apiClient.lookupSubdomain(data.email)
      
      if (response.subdomains && response.subdomains.length > 0) {
        setSubdomains(response.subdomains)
        toast({
          title: 'Success',
          description: 'We found your workspaces!',
        })
      } else {
        toast({
          title: 'Check your email',
          description: 'If this email is registered, we\'ve sent subdomain information to it.',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to lookup subdomain. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <Link
            href="/auth/login"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
          <CardTitle className="text-2xl font-bold">Find your workspace</CardTitle>
          <CardDescription>
            Enter your email and we'll help you find your Archivus workspace
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!subdomains ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10"
                    disabled={isLoading}
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
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
                    Looking up...
                  </>
                ) : (
                  'Find my workspace'
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                We found {subdomains.length} workspace{subdomains.length > 1 ? 's' : ''} associated with your email:
              </p>
              
              <div className="space-y-3">
                {subdomains.map((workspace) => (
                  <Link
                    key={workspace.subdomain}
                    href={`/auth/login?subdomain=${workspace.subdomain}`}
                    className="block"
                  >
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Building2 className="h-5 w-5 text-gray-400" />
                          <div>
                            <p className="font-medium">{workspace.tenant_name}</p>
                            <p className="text-sm text-gray-600">
                              {workspace.subdomain}.archivus.app
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setSubdomains(null)}
              >
                Try another email
              </Button>
            </div>
          )}
        </CardContent>
        
        {!subdomains && (
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-gray-600 text-center">
              Remember your workspace?{' '}
              <Link href="/auth/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </div>
            <div className="text-sm text-gray-600 text-center">
              Don't have an account?{' '}
              <Link href="/auth/register" className="text-blue-600 hover:underline">
                Create one
              </Link>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}