# 🚀 Frontend Subscription Integration Guide - Next.js

## 📋 **API Integration Only - No Styling**

### **1. Environment Setup**
```env
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
```

### **2. API Client Setup**
```typescript
// lib/subscription-api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export const subscriptionApi = {
  // Get available subscription plans
  getPlans: async () => {
    const response = await fetch(`${API_BASE}/subscription/plans`);
    if (!response.ok) throw new Error('Failed to fetch plans');
    return response.json();
  },
  
  // Get current subscription status
  getStatus: async () => {
    const response = await fetch(`${API_BASE}/subscription/status`);
    if (!response.ok) throw new Error('Failed to fetch status');
    return response.json();
  },
  
  // Get usage statistics
  getUsage: async () => {
    const response = await fetch(`${API_BASE}/subscription/usage`);
    if (!response.ok) throw new Error('Failed to fetch usage');
    return response.json();
  },
  
  // Get combined status + usage (recommended for efficiency)
  getSummary: async () => {
    const response = await fetch(`${API_BASE}/subscription/summary`);
    if (!response.ok) throw new Error('Failed to fetch summary');
    return response.json();
  },
  
  // Create Stripe checkout session
  createCheckout: async (data: {
    price_id: string;
    success_url: string;
    cancel_url: string;
  }) => {
    const response = await fetch(`${API_BASE}/subscription/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create checkout');
    return response.json();
  },
  
  // Create customer portal session
  createPortal: async (data: { return_url: string }) => {
    const response = await fetch(`${API_BASE}/subscription/portal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create portal');
    return response.json();
  }
};
```

---

## 📊 **API Response Data Structures**

### **1. Plans Response**
```typescript
// GET /api/v1/subscription/plans
interface PlansResponse {
  plans: Array<{
    id: string;                    // "individual", "starter", "professional", "enterprise"
    name: string;                  // "Individual", "Starter", "Professional", "Enterprise"
    price: number;                 // 1900 (cents)
    currency: string;              // "cad"
    interval: string;              // "month"
    stripe_price_id: string;       // "price_xxx"
    documents: number;             // 100, 1000, 10000, -1 (unlimited)
    storage: number;               // 1073741824 (bytes), -1 (unlimited)
    ai_credits: number;            // 50, 100, 1000, -1 (unlimited)
    users: number;                 // 1, 5, 25, -1 (unlimited)
    features: Record<string, any>; // Feature flags
    description: string;           // "Perfect for personal use and freelancers"
    popular?: boolean;             // true for "professional" plan
  }>;
}
```

### **2. Status Response**
```typescript
// GET /api/v1/subscription/status
interface StatusResponse {
  tenant_id: string;
  status: string;                  // "active", "trialing", "canceled", "past_due"
  tier: string;                    // "individual", "starter", "professional", "enterprise"
  plan_name: string;               // "Individual", "Starter", etc.
  current_period_start: string;    // ISO date string
  current_period_end: string;      // ISO date string
  cancel_at_period_end: boolean;
  documents_used: number;
  documents_included: number;
  storage_used: number;            // bytes
  storage_included: number;        // bytes
  ai_credits_used: number;
  ai_credits_included: number;
  users_included: number;
  features: Record<string, any>;
}
```

### **3. Usage Response**
```typescript
// GET /api/v1/subscription/usage
interface UsageResponse {
  tenant_id: string;
  usage: {
    documents: { used: number; limit: number };
    storage: { used: number; limit: number };
    ai_credits: { used: number; limit: number };
    users: { used: number; limit: number };
  };
}
```

### **4. Summary Response (Combined Status + Usage)**
```typescript
// GET /api/v1/subscription/summary
interface SummaryResponse {
  tenant_id: string;
  status: {
    status: string;
    tier: string;
    plan_name: string;
    current_period_start: string;
    current_period_end: string;
    cancel_at_period_end: boolean;
    documents_included: number;
    storage_included: number;
    ai_credits_included: number;
    users_included: number;
    features: Record<string, any>;
  };
  usage: {
    documents: { used: number; limit: number };
    storage: { used: number; limit: number };
    ai_credits: { used: number; limit: number };
    users: { used: number; limit: number };
  };
}
```

### **5. Checkout Request/Response**
```typescript
// POST /api/v1/subscription/checkout
interface CheckoutRequest {
  price_id: string;        // From plans response
  success_url: string;     // Where to redirect after success
  cancel_url: string;      // Where to redirect if cancelled
}

interface CheckoutResponse {
  tenant_id: string;
  checkout_url: string;    // Stripe checkout URL
  price_id: string;
}
```

### **6. Portal Request/Response**
```typescript
// POST /api/v1/subscription/portal
interface PortalRequest {
  return_url: string;      // Where to redirect after portal session
}

interface PortalResponse {
  tenant_id: string;
  portal_url: string;      // Stripe customer portal URL
}
```

---

## 🎯 **Core Integration Logic**

### **1. Fetch Available Plans**
```typescript
// Get all available subscription plans
const fetchPlans = async () => {
  try {
    const data = await subscriptionApi.getPlans();
    return data.plans;
  } catch (error) {
    console.error('Failed to fetch plans:', error);
    throw error;
  }
};
```

### **2. Get Current Subscription**
```typescript
// Get current subscription status and usage
const fetchSubscription = async () => {
  try {
    // Use summary endpoint for efficiency (combines status + usage)
    const data = await subscriptionApi.getSummary();
    return data;
  } catch (error) {
    console.error('Failed to fetch subscription:', error);
    throw error;
  }
};
```

### **3. Start Subscription Checkout**
```typescript
// Initiate subscription checkout
const startCheckout = async (priceId: string) => {
  try {
    const data = await subscriptionApi.createCheckout({
      price_id: priceId,
      success_url: `${window.location.origin}/success`,
      cancel_url: `${window.location.origin}/pricing`
    });
    
    // Redirect to Stripe checkout
    window.location.href = data.checkout_url;
  } catch (error) {
    console.error('Checkout failed:', error);
    throw error;
  }
};
```

### **4. Open Customer Portal**
```typescript
// Open Stripe customer portal for subscription management
const openPortal = async () => {
  try {
    const data = await subscriptionApi.createPortal({
      return_url: `${window.location.origin}/account`
    });
    
    // Redirect to Stripe portal
    window.location.href = data.portal_url;
  } catch (error) {
    console.error('Portal failed:', error);
    throw error;
  }
};
```

---

## 🔧 **Utility Functions**

### **1. Check Subscription Status**
```typescript
const isSubscriptionActive = (status: string) => {
  return status === 'active' || status === 'trialing';
};

const isTrialing = (status: string) => {
  return status === 'trialing';
};

const isCanceled = (cancelAtPeriodEnd: boolean) => {
  return cancelAtPeriodEnd;
};
```

### **2. Check Usage Limits**
```typescript
const isUsageExceeded = (used: number, limit: number) => {
  if (limit === -1) return false; // Unlimited
  return used >= limit;
};

const getUsagePercentage = (used: number, limit: number) => {
  if (limit === -1) return 0; // Unlimited
  return Math.min((used / limit) * 100, 100);
};
```

### **3. Format Data**
```typescript
const formatPrice = (price: number, currency: string) => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: currency.toUpperCase()
  }).format(price / 100);
};

const formatStorage = (bytes: number) => {
  if (bytes === -1) return 'Unlimited';
  const gb = bytes / 1024 / 1024 / 1024;
  return `${gb.toFixed(1)} GB`;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString();
};
```

---

## 🚨 **Error Handling**

### **1. API Error Types**
```typescript
interface ApiError {
  error: string;
  status?: number;
}

const handleApiError = (error: any) => {
  if (error.message.includes('Failed to fetch')) {
    return 'Network error - please check your connection';
  }
  
  if (error.message.includes('401')) {
    return 'Authentication required - please log in';
  }
  
  if (error.message.includes('403')) {
    return 'Access denied - insufficient permissions';
  }
  
  return 'An unexpected error occurred';
};
```

### **2. Retry Logic**
```typescript
const retryApiCall = async <T>(
  apiCall: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
  throw new Error('Max retries exceeded');
};
```

---

## 📋 **Integration Checklist**

### **Required API Calls:**
- [ ] `GET /api/v1/subscription/plans` - Display available plans
- [ ] `GET /api/v1/subscription/summary` - Show current subscription + usage
- [ ] `POST /api/v1/subscription/checkout` - Start subscription process
- [ ] `POST /api/v1/subscription/portal` - Manage existing subscription

### **Data Validation:**
- [ ] Check for `-1` values (unlimited) in limits
- [ ] Validate price formatting (cents to dollars)
- [ ] Handle missing subscription data (trial mode)
- [ ] Verify API response structure

### **Error Scenarios:**
- [ ] Network failures
- [ ] Authentication errors (401)
- [ ] Permission errors (403)
- [ ] Stripe service unavailable
- [ ] Invalid price IDs

### **User Flows:**
- [ ] New user selecting plan
- [ ] Existing user viewing usage
- [ ] User managing subscription
- [ ] User upgrading/downgrading
- [ ] User canceling subscription

---

## 🔍 **Testing API Integration**

### **1. Test API Endpoints**
```typescript
// Test all endpoints are working
const testApiIntegration = async () => {
  try {
    // Test plans endpoint
    const plans = await subscriptionApi.getPlans();
    console.log('Plans loaded:', plans.plans.length);
    
    // Test summary endpoint
    const summary = await subscriptionApi.getSummary();
    console.log('Subscription status:', summary.status.status);
    
    return true;
  } catch (error) {
    console.error('API test failed:', error);
    return false;
  }
};
```

### **2. Validate Response Data**
```typescript
const validatePlanData = (plan: any) => {
  const required = ['id', 'name', 'price', 'currency', 'stripe_price_id'];
  const missing = required.filter(field => !plan[field]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
  
  if (typeof plan.price !== 'number' || plan.price <= 0) {
    throw new Error('Invalid price value');
  }
  
  return true;
};
```

---

## 📞 **Troubleshooting**

### **Common Issues:**
1. **CORS Errors**: Ensure backend allows your frontend domain
2. **401 Errors**: Check authentication headers are being sent
3. **Invalid Price ID**: Verify price IDs match Stripe dashboard
4. **Network Errors**: Check API base URL is correct

### **Debug Steps:**
1. Check browser network tab for failed requests
2. Verify environment variables are loaded
3. Test API endpoints directly with curl/Postman
4. Check backend logs for errors

This guide focuses purely on the API integration logic and data handling - no styling or UI components included. 