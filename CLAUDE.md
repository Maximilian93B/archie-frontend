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
- **Authentication**: Supabase client with JWT tokens
- **API Client**: Axios with interceptors for auth and error handling
- **Forms**: React Hook Form + Zod validation

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

### Performance Considerations
- Use React Query for aggressive caching
- Implement virtual scrolling for large document lists
- Lazy load heavy components
- Optimize bundle size with dynamic imports
- Use Tailwind CSS purge for minimal CSS

### Before Making Changes
1. Check `frontend-context/` for API documentation
2. Review existing patterns in similar components
3. Ensure TypeScript types are properly defined
4. Consider multi-tenant implications
5. Test with various error scenarios (401, 429, network errors)