# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with Turbopack on http://localhost:3000
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### Testing
No test commands are currently configured. When implementing tests, update this section with:
- Unit test commands
- Integration test commands
- E2E test commands

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15.3.4 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand (global) + React Query (server state)
- **Authentication**: Supabase client with JWT tokens, OAuth (Google/GitHub only)
- **API Client**: Axios with interceptors for auth and error handling
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts/Nivo for analytics visualizations
- **Icons**: Tabler Icons
- **Animations**: Framer Motion

### Project Structure
```
src/
├── app/              # Next.js App Router pages
│   ├── auth/         # Authentication flow
│   ├── dashboard/    # Main application dashboard
│   ├── landing/      # Public landing page
│   └── frontend-context/ # CRITICAL: Backend API documentation (85+ endpoints)
├── components/       # Feature-based component organization
├── contexts/         # React contexts (AuthContext)
├── hooks/           # Custom hooks and React Query queries
├── lib/             # API client and utilities
├── store/           # Zustand store definitions
└── types/           # TypeScript type definitions
```

### Critical Context Files
The `src/app/frontend-context/` directory contains extensive documentation about the backend:
- **API_ENDPOINTS_CONTEXT.md**: Complete reference for 85+ API endpoints
- **TYPESCRIPT_DEFINITIONS.ts**: Type definitions for all API interactions
- **API_CLIENT_PATTERNS.md**: API integration patterns and error handling

### State Management Architecture
1. **Authentication State**: `AuthContext` manages JWT tokens with automatic refresh
2. **Global UI State**: Zustand store for UI preferences, document selection, chat sessions
3. **Server State**: React Query for API data caching and synchronization
4. **Persistence**: Zustand middleware for localStorage persistence of UI preferences

### API Integration Pattern
The API client (`src/lib/api/client.ts`) implements:
- Automatic bearer token injection
- Token refresh on 401 responses
- Rate limit handling (429 responses)
- Toast notifications for errors
- Request/response interceptors

### Environment Variables
Create `.env.local` with:
```
NEXT_PUBLIC_API_URL=your-archivus-api-url
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000  # For OAuth callbacks
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... # Only if using Stripe Elements
```

### Key Backend Capabilities
The backend supports far more than typical document management:
- **AI Chat System**: Session-based conversations with Claude
- **Document Analysis**: Multi-document comparison and insights
- **Hybrid Search**: Multiple search strategies (semantic, full-text, metadata)
- **Business Intelligence**: Analytics dashboard with 9+ endpoints
- **Workflow Automation**: 12+ endpoints for automated workflows
- **Multi-tenant**: Tenant isolation via headers

### Development Patterns
1. **Component Pattern**: Feature-based organization with clear separation of concerns
2. **API Calls**: Always use the centralized API client, never direct fetch/axios
3. **Error Handling**: Use toast notifications and error boundaries
4. **Loading States**: Consistent loading UI with skeletons
5. **Type Safety**: Leverage TypeScript definitions from `frontend-context/`

### Common Pitfalls
1. The backend has 85+ endpoints, not just the basic CRUD operations
2. Authentication uses JWT with refresh tokens, not session cookies
3. All API requests need tenant headers for multi-tenant isolation
4. The chat system is session-based, not single-request
5. Search supports multiple strategies, not just keyword search
6. OAuth only supports Google and GitHub - no Apple/Microsoft
7. Stripe integration is backend-driven - no client-side Stripe.js needed
8. Always check feature access based on subscription tier

### Performance Considerations
- Use React Query for aggressive caching
- Implement virtual scrolling for large document lists
- Lazy load heavy components
- Optimize bundle size with dynamic imports
- Use Tailwind CSS purge for minimal CSS
- Implement data virtualization for analytics dashboards
- Cache folder structures and tag queries
- Use skeleton screens and shimmer effects for loading states
- Debounce search requests
- Background processing for workflows

### Before Making Changes
1. Check `frontend-context/` for API documentation
2. Review existing patterns in similar components
3. Ensure TypeScript types are properly defined
4. Consider multi-tenant implications
5. Test with various error scenarios (401, 429, network errors)
6. Follow the inbox-style UI patterns (see Component Patterns)
7. Adhere to the design system color palette and spacing
8. Check subscription tier requirements for features
9. Implement proper loading and error states
10. Ensure keyboard navigation and accessibility

## Implementation Phases

### Phase 1: Foundation & Core Features (2-3 weeks)
- **Authentication System**: JWT-based auth with Supabase, OAuth (Google/GitHub)
- **Document Management**: Upload, list, view, CRUD operations
- **Core UI/UX**: Layout, navigation, responsive design
- **API Infrastructure**: Robust client with error handling
- **State Management**: Zustand + React Query setup

Key deliverables:
- Working login/register/logout flows
- Document upload with progress tracking
- Paginated document list with grid/list views
- Professional UI with consistent design system
- Error handling and rate limit management

### Phase 2: AI-Powered Features (3-4 weeks)
- **Session-Based Chat System**: Full chat interface with Claude
- **Enhanced Document Features**: AI insights, summaries, workspace context
- **Intelligent Search**: AI-powered search with suggestions
- **Multi-Document Analysis**: Compare and analyze multiple documents
- **Real-time Updates**: WebSocket integration

Key deliverables:
- Fully functional chat system with session management
- AI insights integration in document views
- Powerful search with hybrid strategies
- Document comparison and cross-document Q&A

### Phase 3: Analytics & Advanced Features (3-4 weeks)
- **Analytics Dashboard**: Comprehensive business intelligence
- **Workflow Automation**: Visual workflow builder, task management
- **Advanced Organization**: Folders, tags, categories
- **User Management**: Admin features and permissions
- **Export & Reporting**: Data export in multiple formats

Key deliverables:
- Interactive analytics dashboard with charts
- Drag-and-drop workflow builder
- Hierarchical folder system with tags
- Complete admin panel for user management

### Stripe Integration (1-2 weeks)
- Backend-driven checkout flow
- Subscription management portal
- Usage tracking and feature gating
- Billing settings integration

## Design System

### Color Palette
```css
/* Primary */
--color-primary: #000000;        /* Pure black for primary actions */
--color-background: #ffffff;     /* Pure white background */
--color-surface: #f8f9fa;        /* Light gray surface (sidebar) */

/* Grays */
--color-gray-50: #f8f9fa;        /* Lightest gray - backgrounds */
--color-gray-200: #e9ecef;       /* Borders, dividers */
--color-gray-600: #6c757d;       /* Secondary text */
--color-gray-900: #212529;       /* Darkest text */

/* Status Colors */
--color-success: #10b981;        /* Green */
--color-warning: #f59e0b;        /* Amber */
--color-error: #ef4444;          /* Red */
--color-ai: #8b5cf6;             /* Purple for AI features */
--color-processing: #06b6d4;     /* Cyan for processing */
```

### Typography
- **Font Stack**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto
- **Sizes**: 12px (metadata), 14px (body), 16px (emphasized), 20px (headers)
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Line Height**: 1.5 for body text, 1.25 for headings

### Component Patterns

#### Inbox-Style Layout
```
Desktop (3-column):
┌─────────────┬───────────────────────┬─────────────────┐
│   Sidebar   │    Document List      │  Detail Panel   │
│   (240px)   │     (flexible)        │    (400px)      │
└─────────────┴───────────────────────┴─────────────────┘

Tablet (2-column):
┌─────────────┬─────────────────────────┐
│   Sidebar   │    Document List        │
└─────────────┴─────────────────────────┘

Mobile (1-column):
┌─────────────────────────┐
│    Document List        │
└─────────────────────────┘
```

#### Key Components
- **Document List**: Email-like with 64px item height, hover states
- **Sidebar**: 240px fixed width, collapsible on mobile
- **Buttons**: Primary (black), Secondary (white/border), Ghost, Danger
- **Cards**: 8px border radius, subtle shadows, 20px padding
- **Empty States**: Helpful illustrations with clear CTAs
- **Status Badges**: AI (purple), Success (green), Warning (amber)

### Interaction Patterns
- **Selection**: Single click to select, Cmd/Ctrl for multi-select
- **Drag & Drop**: For uploads and document organization
- **Keyboard Navigation**: ↑/↓ for lists, Enter to open, Cmd+K for search
- **Feedback**: Toast notifications, loading skeletons, progress bars
- **Mobile**: Bottom tab navigation, swipe gestures, touch-friendly targets

## OAuth Implementation

### Supported Providers
- ✅ **Google OAuth** - For general users and enterprise
- ✅ **GitHub OAuth** - For developer teams
- ❌ **Apple Sign In** - Not supported
- ❌ **Microsoft/Azure AD** - Not supported

### OAuth Flow
1. User clicks "Sign in with Google/GitHub"
2. Frontend redirects to backend OAuth endpoint
3. Backend handles OAuth through Supabase
4. Backend returns JWT tokens
5. Frontend stores tokens and redirects to dashboard

### Implementation Notes
- No client-side OAuth libraries needed
- Backend handles all OAuth complexity
- Tokens stored in Zustand with persistence
- Auto-refresh handled by API client

## Subscription Tiers

| Tier | Price (CAD) | Documents | Storage | AI Credits | Users |
|------|-------------|-----------|---------|------------|-------|
| **Starter** | $39/month | 1,000 | 5 GB | 100 | 5 |
| **Professional** | $109/month | 10,000 | 50 GB | 1,000 | 25 |
| **Enterprise** | $279/month | Unlimited | Unlimited | Unlimited | Unlimited |

### Feature Gating
```typescript
// Check tier access
const hasAccess = checkFeatureAccess(subscription, feature, requiredTier)

// Usage limits
const { used, limit } = usage.documents
if (limit !== -1 && used >= limit) {
  toast.error("You've reached your document limit")
}

// Upgrade prompts
<FeatureGate feature="workflows" tier="professional">
  <WorkflowBuilder />
</FeatureGate>
```

### Stripe Integration
- Backend-driven (no client-side Stripe.js)
- Redirect to Stripe Checkout
- Customer Portal for subscription management
- Webhook handling on backend
- Usage tracking and enforcement

## Best Practices

### Security
- No sensitive keys in frontend code
- All Stripe operations through backend
- CSRF protection on state-changing requests
- Validate redirects and callbacks
- Regular session validation

### Accessibility
- Minimum 4.5:1 color contrast ratios
- 44px minimum touch targets
- Keyboard navigation support
- Screen reader friendly
- Focus indicators on all interactive elements

### Performance
- Code splitting by route
- Lazy load heavy components
- Image optimization with Next.js Image
- Aggressive caching with React Query
- Virtual scrolling for long lists

## Recently Monitored Files
- @ARCHIVUS_DESIGN_SYSTEM.md
- @ARCHIVUS_LAYOUT_GUIDELINES.md
- @ARCHIVUS_AUTH_OAUTH_GUIDE.md
- @tsconfig.json

# Important Instruction Reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.