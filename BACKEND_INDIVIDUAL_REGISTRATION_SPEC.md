# Backend Implementation Spec: Individual User Registration

## Overview

This document provides implementation specifications for the Archivus Go backend to support individual user registration alongside organization registration.

## Current State

The backend currently assumes all users belong to an organization with a company-based tenant. This spec outlines minimal changes needed to support individual users.

## API Changes Required

### 1. Update Registration Endpoint

**Endpoint:** `POST /api/v1/auth/register`

**Current Payload:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe",
  "company": "Acme Corp"
}
```

**New Payload (with registration_type):**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe",
  "company": "Acme Corp",  // Optional for individuals
  "registration_type": "individual" | "organization"  // New field
}
```

### 2. Registration Handler Logic (Go)

```go
// In your registration handler
func (h *AuthHandler) Register(c *gin.Context) {
    var req RegisterRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(400, gin.H{"error": "Invalid request"})
        return
    }

    // Determine registration type
    registrationType := req.RegistrationType
    if registrationType == "" {
        // Default to organization for backward compatibility
        registrationType = "organization"
    }

    var tenant *models.Tenant
    var err error

    switch registrationType {
    case "individual":
        // Create personal tenant
        tenant, err = h.createPersonalTenant(req)
    case "organization":
        // Create organization tenant (existing logic)
        tenant, err = h.createOrganizationTenant(req)
    default:
        c.JSON(400, gin.H{"error": "Invalid registration type"})
        return
    }

    if err != nil {
        c.JSON(500, gin.H{"error": "Failed to create tenant"})
        return
    }

    // Create user with admin role for their tenant
    user, err := h.createUser(req, tenant.ID, "admin")
    if err != nil {
        c.JSON(500, gin.H{"error": "Failed to create user"})
        return
    }

    // Generate tokens and return response
    token, refreshToken, err := h.generateTokens(user)
    // ... rest of existing logic
}
```

### 3. Personal Tenant Creation

```go
func (h *AuthHandler) createPersonalTenant(req RegisterRequest) (*models.Tenant, error) {
    // Generate unique subdomain
    subdomain := h.generatePersonalSubdomain(req.FirstName, req.LastName)
    
    // Create tenant name
    tenantName := fmt.Sprintf("%s %s's Workspace", req.FirstName, req.LastName)
    if req.Company != "" {
        tenantName = req.Company // Use provided company name if any
    }

    tenant := &models.Tenant{
        ID:               uuid.New(),
        Name:             tenantName,
        Subdomain:        subdomain,
        SubscriptionTier: "starter", // or "free" if you have a free tier
        StorageQuota:     1073741824, // 1GB for individuals
        APIQuota:         100,        // Lower API quota for individuals
        Settings: map[string]interface{}{
            "account_type": "individual",
            "max_users":    1,
        },
        IsActive:      true,
        TrialEndsAt:   time.Now().AddDate(0, 0, 14), // 14-day trial
        BusinessType:  "personal",
        CompanySize:   "individual",
        CreatedAt:     time.Now(),
        UpdatedAt:     time.Now(),
    }

    if err := h.db.Create(tenant).Error; err != nil {
        return nil, err
    }

    return tenant, nil
}
```

### 4. Subdomain Generation

```go
func (h *AuthHandler) generatePersonalSubdomain(firstName, lastName string) string {
    // Clean and combine names
    name := strings.ToLower(firstName + "-" + lastName)
    name = regexp.MustCompile(`[^a-z0-9-]`).ReplaceAllString(name, "-")
    name = regexp.MustCompile(`-+`).ReplaceAllString(name, "-")
    name = strings.Trim(name, "-")
    
    // Add random suffix to ensure uniqueness
    suffix := generateRandomString(5) // Implement this to return 5 random alphanumeric chars
    subdomain := fmt.Sprintf("%s-%s", name, suffix)
    
    // Ensure it's not too long
    if len(subdomain) > 63 {
        subdomain = subdomain[:63]
    }
    
    // Check uniqueness and regenerate if necessary
    for {
        exists, _ := h.subdomainExists(subdomain)
        if !exists {
            break
        }
        suffix = generateRandomString(5)
        subdomain = fmt.Sprintf("%s-%s", name, suffix)
    }
    
    return subdomain
}
```

### 5. New Endpoint: Subdomain Lookup

Add this endpoint to help users who forget their subdomain:

```go
// POST /api/v1/auth/lookup-subdomain
func (h *AuthHandler) LookupSubdomain(c *gin.Context) {
    var req struct {
        Email string `json:"email" binding:"required,email"`
    }
    
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(400, gin.H{"error": "Invalid email"})
        return
    }
    
    // Find all tenants where this email has a user account
    var results []struct {
        Subdomain string
        TenantName string
    }
    
    err := h.db.Table("users").
        Select("tenants.subdomain, tenants.name as tenant_name").
        Joins("JOIN tenants ON users.tenant_id = tenants.id").
        Where("users.email = ?", req.Email).
        Where("users.is_active = ?", true).
        Scan(&results).Error
        
    if err != nil || len(results) == 0 {
        // Don't reveal if email exists or not
        c.JSON(200, gin.H{"message": "If this email is registered, we've sent subdomain information to it"})
        // In production, send email here
        return
    }
    
    // In production, send email with subdomain(s)
    // For now, return them (remove in production)
    c.JSON(200, gin.H{
        "subdomains": results,
        "message": "Subdomain information sent to your email",
    })
}
```

### 6. Update Subscription Creation

When creating subscriptions, check if it's an individual account:

```go
func (h *SubscriptionHandler) CreateSubscription(tenant *models.Tenant) error {
    settings := tenant.Settings.(map[string]interface{})
    accountType := settings["account_type"]
    
    var priceID string
    var limits SubscriptionLimits
    
    if accountType == "individual" {
        // Individual pricing
        priceID = os.Getenv("STRIPE_INDIVIDUAL_PRICE_ID")
        limits = SubscriptionLimits{
            Documents: 100,
            Storage:   1073741824, // 1GB
            AICredits: 50,
            Users:     1,
        }
    } else {
        // Organization pricing (existing logic)
        priceID = h.getOrganizationPriceID(tenant.SubscriptionTier)
        limits = h.getOrganizationLimits(tenant.SubscriptionTier)
    }
    
    // Create Stripe subscription with appropriate price
    // ... rest of subscription logic
}
```

## Database Considerations

No schema changes needed! The existing schema supports this approach:

1. **tenants** table already has all needed fields
2. **users** table already links to tenants
3. Use `tenants.business_type = 'personal'` to identify individual accounts
4. Use `tenants.settings` JSONB field to store `account_type: 'individual'`

## Testing the Implementation

```go
// Test individual registration
func TestIndividualRegistration(t *testing.T) {
    payload := map[string]interface{}{
        "email":             "john@example.com",
        "password":          "SecurePass123!",
        "first_name":        "John",
        "last_name":         "Doe",
        "registration_type": "individual",
    }
    
    resp := performRequest("POST", "/api/v1/auth/register", payload)
    
    assert.Equal(t, 201, resp.Code)
    assert.Contains(t, resp.Body.String(), "john-doe-")
    assert.Contains(t, resp.Body.String(), "John Doe's Workspace")
}
```

## Frontend Integration

The frontend will send the `registration_type` field and expects:
- Subdomain to be returned in the registration response
- User object to include `tenant_subdomain` field
- Support for the subdomain lookup endpoint

## Rollout Plan

1. **Phase 1**: Deploy backend changes with feature flag
2. **Phase 2**: Test with internal users
3. **Phase 3**: Enable for beta users
4. **Phase 4**: General availability

## Security Considerations

1. **Rate Limiting**: Limit subdomain generation attempts
2. **Email Verification**: Require email verification for individuals
3. **Subdomain Squatting**: Implement reserved subdomain list
4. **Privacy**: Don't reveal email existence in subdomain lookup

## Monitoring

Add metrics for:
- Individual vs organization registration ratio
- Individual account conversion to team
- Subdomain collision attempts
- Individual account usage patterns

## Summary

This implementation allows individual users to register while maintaining the multi-tenant architecture. Each individual gets their own tenant with a personal subdomain, ensuring data isolation and easy upgrade paths.