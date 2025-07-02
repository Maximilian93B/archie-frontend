# 🚀 Archivus Frontend Development Roadmap

## 📋 Overview

This document tracks all development phases and tasks for the Archivus frontend. It serves as the central reference for what's been completed and what remains to be built.

## ✅ Completed Work

### Phase 0: Project Setup & Stripe Integration (Completed)
- [x] Next.js 15 with TypeScript and Tailwind CSS v4
- [x] Authentication system with JWT tokens
- [x] API client with interceptors and error handling
- [x] Zustand + React Query setup
- [x] **Stripe subscription integration**
  - Subscription types aligned with backend
  - API client for all subscription endpoints
  - Middleware enforcement (no access without subscription)
  - Pricing page with 3 tiers
  - Checkout success/cancel flows
  - 7-day free trial implementation
  - Environment variables configured
- [x] **Stripe V2 Native Integration (Completed - July 2, 2025)** ✨ NEW
  - Migrated to Stripe Entitlements API for feature access
  - Implemented Stripe Billing Meters for usage tracking
  - Refactored API client to use simplified backend endpoints
  - Created new subscription store with intelligent caching
  - Updated all components to use V2 hooks and stores
  - Implemented quota checking before operations
  - Added user-friendly toast notifications for limits
  - Direct Stripe Checkout integration with lookup keys
  - Customer Portal integration for self-service

### Phase 1: Core Document Management (Completed - July 1, 2025)
- [x] **Document Upload Component** (drag-and-drop, progress tracking, AI toggle)
- [x] **Inbox-Style Document List** (multi-select, sorting, hover states)
- [x] **Document Detail Panel** (tabbed interface, metadata, responsive)
- [x] **Three-Column Layout** (sidebar, list, detail panel)
- [x] **Global Search (Cmd+K)** (command palette, history, suggestions)
- [x] **Advanced Search Page** (multiple search types, filters, save searches)
- [x] **Search API Integration** (fulltext, semantic, exact match)
- [x] **Testing & Validation** (API tests passing, manual checklist created)

## 🎯 Current Phase: Core Document Management

### Phase 1: Foundation & Core Features (2-3 weeks) ✅ COMPLETED (July 1, 2025)

#### Week 1: Document Upload & Management ✅
- [x] **Document Upload Component** 
  ```typescript
  // src/components/documents/upload/document-uploader.tsx
  ✅ Drag-and-drop interface
  ✅ Multiple file selection
  ✅ Progress tracking with cancel
  ✅ File type validation (PDF, DOC, DOCX, TXT, etc.)
  ✅ Size limit enforcement (based on subscription)
  ✅ AI processing toggle
  ✅ Upload queue management
  ⏳ Folder selection dropdown (pending folder system)
  ```

- [x] **Document List View (Inbox Style)**
  ```typescript
  // src/components/documents/list/document-list-inbox.tsx
  ✅ Email-like list interface (64px item height)
  ✅ Sorting capabilities
  ✅ Multi-select with Cmd/Ctrl+Click
  ✅ Hover states and selection indicators
  ✅ Empty state with helpful messaging
  ✅ Actions: Star, Download, Delete
  ✅ Loading states with skeletons
  ⏳ Grid/List view toggle (next iteration)
  ⏳ Bulk actions toolbar (next iteration)
  ```

- [x] **Document Detail Panel**
  ```typescript
  // src/components/documents/detail/document-detail-panel.tsx
  ✅ 400px fixed width (desktop)
  ✅ Tabbed interface (Details, Preview, AI Analysis)
  ✅ Metadata display (size, type, created, modified)
  ✅ AI processing status indicator
  ✅ Quick actions (download, delete)
  ✅ Responsive overlay on mobile
  ⏳ Document preview (pending backend)
  ⏳ Tags management (pending tags system)
  ⏳ Share functionality (future phase)
  ```

#### Week 2: Search & Organization ✅
- [x] **Search Implementation**
  ```typescript
  // src/components/search/global-search.tsx
  ✅ Global search bar (Cmd+K)
  ✅ Command palette interface
  ✅ Search history tracking
  ✅ Quick suggestions
  ✅ Debounced input
  
  // src/app/dashboard/search/page.tsx
  ✅ Advanced search page
  ✅ Multiple search types (fulltext, semantic, exact)
  ✅ Search filters (file type, date range, size)
  ✅ Save searches functionality
  ✅ Natural language search (AI-powered)
  ✅ Results with pagination
  ```

- [x] **Folder System** ✅ COMPLETED (July 1, 2025)
  ```typescript
  // src/components/folders/
  ✅ Hierarchical folder tree with expand/collapse
  ✅ Create/rename/delete folders with dialogs
  ✅ Move documents between folders
  ✅ Folder icons and colors
  ✅ Path-based navigation
  ✅ Document count display
  ✅ Context menu operations
  ✅ Persisted expansion state
  ```

- [x] **Tags System** ✅ COMPLETED (July 1, 2025)
  ```typescript
  // src/components/tags/
  ✅ AI-powered auto-tagging with confidence scores
  ✅ Manual tag management
  ✅ Tag categories (document_type, department, etc.)
  ✅ Auto-complete tag input with debouncing
  ✅ Tag visualization with confidence indicators
  ✅ Tag-based filtering in document list
  ✅ Tag display in document details
  ```

#### Implementation Status Summary
✅ **Completed Components:**
- Document uploader with drag-and-drop
- Inbox-style document list
- Document detail panel with tabs
- Three-column responsive layout
- Global search with Cmd+K
- Advanced search page with filters
- Search API integration
- Authentication flow with subdomain support
- Dashboard layout
- **Folder system with hierarchical navigation**
- **Tag system with AI auto-tagging**
- **Individual user registration support** ✅ NEW

✅ **Testing Status:**
- Backend API tests passing
- Frontend pages loading correctly
- Authentication working with subdomain header
- Document list retrieving documents with folders/tags
- Search endpoint integrated
- Folder tests passing (8/8)
- Tag component tests passing
- Individual registration flow tested and working

✅ **Phase 1 Completion Summary:**
- All core document management features implemented
- Folder and tag systems fully integrated
- Fixed subdomain authentication issue
- **Added support for individual user registration (July 1, 2025)**
  - Registration type selector (Personal/Team)
  - Auto-generated subdomains for individuals
  - Subdomain lookup for forgotten workspaces
  - Updated login flow with subdomain support
- Created comprehensive test coverage

#### API Integration Required
```typescript
// Document endpoints
POST   /api/v1/documents/upload
GET    /api/v1/documents
GET    /api/v1/documents/:id
PUT    /api/v1/documents/:id
DELETE /api/v1/documents/:id
GET    /api/v1/documents/:id/download
GET    /api/v1/documents/:id/preview

// Folder endpoints
POST   /api/v1/folders
GET    /api/v1/folders
PUT    /api/v1/folders/:id
DELETE /api/v1/folders/:id

// Tag endpoints
POST   /api/v1/tags
GET    /api/v1/tags
DELETE /api/v1/tags/:id
```

## 🤖 Phase 2: AI-Powered Features (3-4 weeks) - IN PROGRESS

### Week 1-2: Chat System ✅ CORE IMPLEMENTATION COMPLETE (July 1, 2025)
- [x] **Chat Interface** ✅
  ```typescript
  // src/components/chat/
  ✅ Session-based chat UI
  ✅ Message list with markdown support
  ✅ Code syntax highlighting
  ✅ Multi-line input with Shift+Enter
  ✅ Loading animations (thinking indicator)
  ✅ Copy/retry message actions
  ✅ Message timestamps
  ✅ Error handling for failed messages
  ✅ Virtual scrolling for performance
  ✅ Optimistic updates
  ✅ Draft persistence
  ```

- [x] **Core Chat Features** ✅
  ```typescript
  // src/store/chat-store.ts
  ✅ Zustand store with persistence
  ✅ Client-side rate limiting (10 msg/min)
  ✅ LRU cache (10 sessions max)
  ✅ Draft auto-save with debouncing
  ✅ Message status tracking
  ✅ Session management
  ```

- [ ] **Chat Session Management UI** 🔄
  ```typescript
  // src/components/chat/sessions/
  - Session list sidebar
  - Create/rename/delete sessions (API ready)
  - Session search
  - Pin important sessions
  - Session context (selected documents)
  - Export chat history
  ```

- [ ] **Document Context** 🔄
  ```typescript
  // src/components/chat/context/
  - Document picker for chat
  - Visual indicators of included docs
  - Workspace-wide context toggle
  - Context preview panel
  - Remove documents from context
  ```

### Week 3-4: AI Document Features
- [ ] **AI Insights Panel**
  ```typescript
  // src/components/documents/ai-insights/
  - Auto-generated summaries
  - Key points extraction
  - Entity recognition (people, places, dates)
  - Sentiment analysis
  - Document categorization
  - Related documents suggestions
  ```

- [ ] **Document Comparison**
  ```typescript
  // src/components/documents/compare/
  - Side-by-side document viewer
  - Difference highlighting
  - Cross-document Q&A
  - Similarity scoring
  - Export comparison report
  ```

#### API Integration Required
```typescript
// Chat endpoints
POST   /api/v1/chat/sessions
GET    /api/v1/chat/sessions
DELETE /api/v1/chat/sessions/:id
POST   /api/v1/chat/sessions/:id/messages
GET    /api/v1/chat/sessions/:id/messages

// AI endpoints
POST   /api/v1/ai/extract/:document_id
POST   /api/v1/ai/summarize/:document_id
POST   /api/v1/ai/compare
GET    /api/v1/search/documents
POST   /api/v1/search/semantic
```

## 📊 Phase 3: Analytics & Advanced Features (3-4 weeks)

### Week 1-2: Analytics Dashboard
- [ ] **Dashboard Components**
  ```typescript
  // src/components/analytics/
  - KPI metric cards
  - Document upload trends chart
  - Storage usage visualization
  - AI credit usage tracking
  - User activity heatmap
  - File type distribution
  - Popular tags cloud
  - Date range picker
  - Export functionality (CSV, PDF)
  ```

- [ ] **Business Intelligence**
  ```typescript
  - Real-time updates
  - Drill-down capabilities
  - Comparative analysis
  - Custom metrics
  - Scheduled reports
  ```

### Week 3-4: Workflow Automation
- [ ] **Workflow Builder**
  ```typescript
  // src/components/workflows/
  - Visual drag-and-drop editor
  - Trigger configuration
  - Action nodes library
  - Conditional logic
  - Testing interface
  - Version control
  - Template library
  ```

- [ ] **Task Management**
  ```typescript
  // src/components/tasks/
  - Task list with filters
  - Task assignment
  - Due date tracking
  - Priority levels
  - Task notifications
  - Calendar view
  ```

#### API Integration Required
```typescript
// Analytics endpoints
GET    /api/v1/analytics/dashboard
GET    /api/v1/analytics/documents
GET    /api/v1/analytics/storage
GET    /api/v1/analytics/ai-processing
POST   /api/v1/analytics/export

// Workflow endpoints
POST   /api/v1/workflows
GET    /api/v1/workflows
PUT    /api/v1/workflows/:id
DELETE /api/v1/workflows/:id
POST   /api/v1/workflows/:id/execute

// Task endpoints
GET    /api/v1/tasks
POST   /api/v1/tasks/:id/complete
POST   /api/v1/tasks/:id/assign
```

## 💳 Stripe V2 Implementation Details (Completed - July 2, 2025)

### Technical Architecture
- **API Client Refactoring**
  ```typescript
  // src/lib/api/subscription.ts
  ✅ Simplified endpoints matching backend
  ✅ Direct pass-through to Stripe APIs
  ✅ No complex transformations needed
  ```

- **New Type System**
  ```typescript
  // src/types/subscription-v2.ts
  ✅ Simplified types matching Stripe responses
  ✅ Hardcoded plan definitions from Stripe config
  ✅ Type-safe quota checking
  ```

- **Intelligent Store Design**
  ```typescript
  // src/store/subscription-store-v2.ts
  ✅ 5-minute cache for subscription status
  ✅ 1-minute cache for quota checks
  ✅ Automatic cache invalidation
  ✅ Persistence with Zustand middleware
  ```

- **Developer-Friendly Hooks**
  ```typescript
  // src/hooks/use-subscription-v2.ts
  ✅ withQuotaCheck wrapper for operations
  ✅ Automatic toast notifications
  ✅ Usage reporting helpers
  ✅ Feature access checking
  ```

### Key Components Updated
- ✅ Authentication Context (subscription state management)
- ✅ Pricing Page (new 4-column gradient design)
- ✅ Billing Page (real-time quota display)
- ✅ Document Uploader (quota enforcement)
- ✅ Dashboard Layout (usage warnings)
- ✅ Feature Gates (Stripe Entitlements)
- ✅ Pricing Cards (lookup key integration)

### Migration Strategy
- Kept original files intact
- Created V2 versions alongside
- Gradual component migration
- Re-exported V2 as default where ready

## 🔧 Phase 4: Settings & Administration (2 weeks)

### User Settings
- [ ] **Profile Management**
  ```typescript
  // src/components/settings/profile/
  - Update name/email
  - Change password
  - Profile picture upload
  - Notification preferences
  - Language/timezone
  ```

- [ ] **Subscription Management**
  ```typescript
  // src/components/settings/subscription/
  - Current plan details
  - Usage meters (animated)
  - Upgrade/downgrade flows
  - Billing history table
  - Payment method management
  - Invoice downloads
  - Cancel subscription flow
  ```

### Team Management (Enterprise)
- [ ] **User Administration**
  ```typescript
  // src/components/admin/users/
  - User list with search
  - Invite team members
  - Role assignment (admin, user, viewer)
  - Bulk user operations
  - Activity monitoring
  - User suspension
  ```

- [ ] **Permissions System**
  ```typescript
  // src/components/admin/permissions/
  - Folder-level permissions
  - Document sharing controls
  - Feature access matrix
  - API key management
  ```

## 🎨 Phase 5: UI/UX Polish & Performance (2 weeks)

### Component Polish
- [ ] **Loading States**
  - Skeleton screens for all views
  - Shimmer effects
  - Progress indicators
  - Smooth transitions

- [ ] **Empty States**
  - Illustrated empty states
  - Contextual help text
  - Clear CTAs
  - Onboarding hints

- [ ] **Error Handling**
  - Error boundaries
  - Graceful degradation
  - Retry mechanisms
  - Offline support

### Performance Optimization
- [ ] **Frontend Optimization**
  - Code splitting by route
  - Lazy loading components
  - Image optimization
  - Bundle size reduction
  - Virtual scrolling for lists
  - Debounced searches
  - Optimistic updates

- [ ] **Caching Strategy**
  - React Query caching
  - Static asset caching
  - API response caching
  - Offline data sync

### Accessibility
- [ ] **A11y Implementation**
  - Keyboard navigation
  - Screen reader support
  - ARIA labels
  - Focus management
  - High contrast mode
  - Reduced motion support

## 🧪 Phase 6: Testing & Documentation (Ongoing)

### Testing
- [ ] **Unit Tests**
  - Component tests (Vitest + Testing Library)
  - Hook tests
  - Utility function tests
  - Store tests

- [ ] **Integration Tests**
  - API integration tests
  - Auth flow tests
  - Upload flow tests
  - Search functionality

- [ ] **E2E Tests**
  - Critical user journeys
  - Cross-browser testing
  - Mobile responsiveness

### Documentation
- [ ] **Developer Docs**
  - Component storybook
  - API integration guide
  - State management patterns
  - Deployment guide

- [ ] **User Docs**
  - Getting started guide
  - Feature tutorials
  - Video walkthroughs
  - FAQ updates

## 🚀 Phase 7: Production Deployment (1 week)

### Deployment Preparation
- [ ] **Production Build**
  - Environment configuration
  - Build optimization
  - Security headers
  - CDN setup
  - Error tracking (Sentry)

- [ ] **Monitoring**
  - Performance monitoring
  - Error tracking
  - Usage analytics
  - Uptime monitoring
  - User feedback system

### Launch Checklist
- [ ] Security audit
- [ ] Performance testing
- [ ] Cross-browser verification
- [ ] Mobile testing
- [ ] Load testing
- [ ] Backup procedures
- [ ] Rollback plan

## 📝 Implementation Guidelines

### Design System
- Follow Apple-inspired minimalist design
- Maintain inbox-style patterns
- Use consistent 4px spacing grid
- Implement smooth animations
- Ensure touch-friendly interfaces

### Code Standards
- TypeScript strict mode
- Component composition patterns
- Custom hooks for logic reuse
- Proper error boundaries
- Comprehensive prop types

### API Integration
- Use centralized API client
- Handle all error states
- Implement retry logic
- Show loading states
- Cache appropriately

### State Management
- Zustand for global UI state
- React Query for server state
- Local state for components
- Persist user preferences

### Performance Targets
- Initial load < 3s
- Time to interactive < 5s
- Lighthouse score > 90
- No memory leaks
- Smooth 60fps scrolling

## 🎯 Priority Matrix

### High Priority (Do First)
1. Document upload/management
2. Search functionality
3. AI chat interface
4. Basic analytics

### Medium Priority (Do Next)
1. Workflow automation
2. Advanced organization
3. Team management
4. Performance optimization

### Low Priority (Nice to Have)
1. Advanced analytics
2. Custom workflows
3. API access
4. White labeling

## 📅 Timeline Overview

- **Phase 1**: 2-3 weeks (Core Document Management)
- **Phase 2**: 3-4 weeks (AI Features)
- **Phase 3**: 3-4 weeks (Analytics & Workflows)
- **Phase 4**: 2 weeks (Settings & Admin)
- **Phase 5**: 2 weeks (Polish & Performance)
- **Phase 6**: Ongoing (Testing & Docs)
- **Phase 7**: 1 week (Production Deploy)

**Total Timeline**: 14-18 weeks for complete platform

## 🔄 Next Steps

1. Start with Phase 1 document upload component
2. Implement list view with proper pagination
3. Add search functionality
4. Test with real backend APIs
5. Iterate based on user feedback

---

**Last Updated**: July 2, 2025  
**Current Status**: Phase 2 AI Features 🚧 IN PROGRESS (Core Chat Implementation Complete)  
**Next Focus**: Chat Session Management UI & Document Context  
**Completed Phases**: 
- Phase 0: Stripe Integration ✅
- Phase 0.5: Stripe V2 Native Integration ✅ NEW (July 2, 2025)
- Phase 1: Core Document Management ✅ (including Folders/Tags/Individual Registration)
- Phase 2: AI Chat Core Implementation ✅ (UI remaining)

## 📝 Recent Updates

### July 2, 2025 - Stripe V2 Native Integration ✨
Major refactoring to leverage Stripe's native features:
- **Backend Alignment**: Frontend now uses simplified API that delegates to Stripe
- **Stripe Entitlements**: Feature access controlled by Stripe's native system
- **Stripe Billing Meters**: Usage tracking delegated to Stripe
- **Improved UX**: Automatic quota checking with user-friendly notifications
- **Better Performance**: Intelligent caching reduces API calls
- **Self-Service**: Direct integration with Stripe Customer Portal
- **Flexible Pricing**: Using lookup keys instead of hardcoded price IDs

This update significantly simplifies the subscription management code and provides a more robust, scalable solution that leverages Stripe's battle-tested infrastructure.

## 🎯 Recommended Next Tasks

Based on the completion of core chat implementation, here are the remaining Phase 2 priorities:

### 1. **Chat Session Management UI** (High Priority - Immediate)
The backend APIs are ready, now implement the UI:
- Session list sidebar with search
- Visual session cards with message preview
- Rename/delete with confirmation dialogs
- Pin/unpin functionality
- Session metadata (created date, message count)

### 2. **React Query Integration** (High Priority - Week 1)
Improve server state management for chat:
- Custom hooks for chat operations
- Optimistic updates with rollback
- Background refetching
- Query invalidation strategies
- Error recovery

### 3. **Document Context Selector** (High Priority - Week 1)
Enable document-specific conversations:
- Document picker modal/dropdown
- Selected documents indicator
- Multi-document selection
- Context preview panel
- Remove documents from chat context

### 4. **Response Caching Strategy** (Medium Priority - Week 2)
Optimize performance and reduce API calls:
- IndexedDB for message persistence
- Service worker for offline support
- Smart cache invalidation
- Bandwidth optimization
- Export chat history feature