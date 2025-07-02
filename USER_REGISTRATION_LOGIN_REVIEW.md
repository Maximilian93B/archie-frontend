# 🔐 User Registration & Login Flow Review

## 📋 User Story: New User Registration Journey

### 1. **Landing Page Arrival**
**As a** new visitor  
**I want to** understand what Archivus offers  
**So that** I can decide if it meets my document management needs

**Current Implementation:**
- Landing page at `/` shows features, pricing tiers
- Clear CTA buttons for "Get Started" and "View Pricing"
- Navigation includes "Sign In" for existing users

### 2. **Registration Process**
**As a** new user  
**I want to** create an account quickly  
**So that** I can start managing my documents

**Current Flow:**
```
1. Click "Get Started" → Redirects to `/auth/register`
2. Fill in registration form:
   - Company Name (used to generate subdomain)
   - Full Name
   - Email
   - Password
3. Submit → Creates account with subdomain
4. Redirect to subscription selection
```

**⚠️ Issues Found:**
- Subdomain is automatically generated from company name
- No subdomain validation or uniqueness check in frontend
- No clear indication to user about their subdomain

### 3. **Subscription Selection**
**As a** new user  
**I want to** choose the right plan  
**So that** I get the features I need

**Current Implementation:**
```typescript
// After registration, user should see:
1. Pricing page with 3 tiers:
   - Starter: $39/month
   - Professional: $109/month  
   - Enterprise: $279/month
2. Click "Get Started" on chosen plan
3. Redirect to Stripe Checkout (backend-driven)
```

### 4. **Login Process**
**As an** existing user  
**I want to** access my account securely  
**So that** I can manage my documents

**Current Flow:**
```
1. Click "Sign In" → `/auth/login`
2. Enter credentials:
   - Email
   - Password
   - (Subdomain - currently missing from UI)
3. Submit → Authenticate and redirect to dashboard
```

## 🐛 Subdomain Error Analysis

### Root Cause
The backend expects an `X-Tenant-Subdomain` header with every request, but:
1. The frontend was sending `X-Tenant-ID` instead
2. No mechanism to capture/store subdomain during login
3. Registration doesn't clearly communicate the assigned subdomain

### Fix Applied
```typescript
// API Client (client.ts)
- 'X-Tenant-ID': tenantId
+ 'X-Tenant-Subdomain': tenantSubdomain

// Auth Context
- localStorage.getItem('tenant_id')
+ localStorage.getItem('tenant_subdomain')
```

## 🔧 Recommended Improvements

### 1. **Enhanced Registration Form**
```typescript
// Add subdomain preview during registration
<div className="mt-2">
  <Label>Your Archivus URL</Label>
  <div className="flex items-center gap-2">
    <Input 
      value={generateSubdomain(formData.companyName)}
      disabled
    />
    <span className="text-sm text-gray-500">.archivus.app</span>
  </div>
  <p className="text-xs text-gray-500 mt-1">
    This will be your unique Archivus URL
  </p>
</div>
```

### 2. **Improved Login Form**
```typescript
// Option A: Add subdomain field
<div>
  <Label htmlFor="subdomain">Organization</Label>
  <Input
    id="subdomain"
    placeholder="your-company"
    value={subdomain}
    onChange={(e) => setSubdomain(e.target.value)}
    required
  />
  <p className="text-xs text-gray-500 mt-1">
    Enter your organization's subdomain
  </p>
</div>

// Option B: Separate subdomain step
// First ask for subdomain, then show login form
// Like Slack's login flow
```

### 3. **Post-Registration Email**
Send welcome email with:
- Subdomain/URL information
- Quick start guide
- Link to complete subscription setup

### 4. **Stripe Integration Flow**
```typescript
// Ideal flow after registration:
1. Registration complete → Store user info
2. Show subscription required message
3. Redirect to pricing page
4. Select plan → Create Stripe checkout session
5. Complete payment → Activate subscription
6. Redirect to onboarding/dashboard
```

## 📝 Implementation Checklist

### Immediate Fixes Needed:
- [x] Fix subdomain header in API client
- [x] Update auth context to use subdomain
- [ ] Add subdomain field to login form
- [ ] Show subdomain during registration
- [ ] Store subdomain after successful registration

### UI/UX Improvements:
- [ ] Add "Forgot subdomain?" help link
- [ ] Show subdomain in user profile/settings
- [ ] Add subdomain validation during registration
- [ ] Improve error messages for auth failures

### Stripe Integration:
- [ ] Add subscription status check after login
- [ ] Redirect to pricing if no active subscription
- [ ] Show current plan in dashboard
- [ ] Add upgrade/downgrade flows

## 🧪 Test Scenarios

### Registration Test:
```bash
1. Register with company "Acme Corp"
2. Verify subdomain generated as "acme-corp"
3. Check welcome email received
4. Verify can't register with same email
5. Ensure subdomain is unique
```

### Login Test:
```bash
1. Login with email/password/subdomain
2. Verify subdomain header in API calls
3. Test "Remember me" functionality
4. Test invalid subdomain error
5. Test expired session handling
```

### Subscription Test:
```bash
1. Complete registration
2. Select subscription plan
3. Complete Stripe checkout
4. Verify subscription activated
5. Access features based on plan
```

## 🚀 Quick Fix for Development

For immediate testing, you can hardcode the subdomain:

```typescript
// In auth-context.tsx login function
const subdomain = credentials.subdomain || 'testdebug123'; // Your test subdomain
```

Or add to .env.local:
```bash
NEXT_PUBLIC_DEFAULT_SUBDOMAIN=testdebug123
```

## 📊 Current State Summary

### ✅ Working:
- Basic registration form
- API client with subdomain header
- Auth context storing subdomain
- Stripe subscription endpoints exist

### ❌ Missing:
- Subdomain input in login form
- Subdomain display during registration
- Clear subdomain communication to user
- Post-registration subscription flow
- Proper error handling for subdomain issues

### 🎯 Priority Actions:
1. Add subdomain field to login form
2. Display assigned subdomain after registration
3. Implement subscription check after login
4. Add proper error messages for auth failures

This review provides a complete picture of the current authentication flow and the improvements needed for a smooth user experience.