import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of protected routes (require authentication + subscription)
const protectedRoutes = ['/dashboard']

// List of auth routes (no subscription required)
const authRoutes = ['/auth/login', '/auth/register', '/auth/forgot-password']

// List of public routes (no auth or subscription required)
const publicRoutes = ['/', '/pricing', '/subscription/success', '/subscription/cancel']

// Routes that require auth but not subscription
const authOnlyRoutes = ['/subscription/checkout']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check route types
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route))
  const isAuthOnlyRoute = authOnlyRoutes.some(route => pathname.startsWith(route))
  
  // Get token from cookie or Authorization header
  const token = request.cookies.get('access_token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '')

  // Get subscription status from cookie (set by auth context)
  const hasSubscription = request.cookies.get('has_subscription')?.value === 'true'
  const isTrialing = request.cookies.get('is_trialing')?.value === 'true'

  // Public routes - always accessible
  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Auth routes - redirect if already authenticated
  if (isAuthRoute && token) {
    const url = request.nextUrl.clone()
    // Check if user has subscription or trial
    if (hasSubscription || isTrialing) {
      url.pathname = '/dashboard'
    } else {
      url.pathname = '/pricing'
    }
    return NextResponse.redirect(url)
  }

  // Check authentication for all non-public routes
  if (!token && (isProtectedRoute || isAuthOnlyRoute)) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  // Protected routes require both auth and subscription
  if (isProtectedRoute && token && !hasSubscription && !isTrialing) {
    const url = request.nextUrl.clone()
    url.pathname = '/pricing'
    url.searchParams.set('message', 'subscription_required')
    return NextResponse.redirect(url)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}