# 🧪 Archivus Frontend Testing Guide

## Overview

This guide explains how to test the Archivus frontend against the real backend services.

## Prerequisites

1. **Backend Services Running**
   ```bash
   # In the backend directory
   docker-compose up
   ```

2. **Frontend Development Server**
   ```bash
   # In the frontend directory
   npm run dev
   ```

## Test Scripts

### 1. Authentication Flow Test
Tests the complete authentication flow including registration, login, token refresh, and logout.

```bash
npm run test:auth
```

This script tests:
- Health check endpoint
- User registration
- User login
- Token validation
- User profile retrieval
- Token refresh
- Logout
- Token invalidation

### 2. Document Management Test
Tests document upload, listing, searching, updating, and deletion.

```bash
npm run test:docs
```

This script tests:
- Document upload with AI processing
- Document listing with pagination
- Document details retrieval
- Document search
- Document metadata update
- Folder management
- Document download
- Document deletion

### 3. Full Integration Test Suite
Runs all tests including component tests with Vitest.

```bash
npm run test:integration
```

This runs:
1. Backend health check
2. Frontend availability check
3. Authentication flow tests
4. Document management tests
5. Vitest component tests

## Manual Testing Checklist

### Phase 1 Features to Test

#### Authentication
- [ ] Register new user with email/password
- [ ] Login with correct credentials
- [ ] Login fails with incorrect credentials
- [ ] Password reset flow works
- [ ] JWT tokens auto-refresh
- [ ] Protected routes redirect to login
- [ ] Logout clears session

#### OAuth (if configured)
- [ ] Google OAuth login
- [ ] GitHub OAuth login
- [ ] OAuth callback handling
- [ ] OAuth error handling

#### Document Management
- [ ] Upload single file
- [ ] Upload multiple files
- [ ] Drag-and-drop upload
- [ ] Upload progress indicator
- [ ] File type validation
- [ ] File size limits
- [ ] Enable/disable AI processing toggle
- [ ] Document list pagination
- [ ] Document grid/list view toggle
- [ ] Document sorting (date, name, size)
- [ ] Document filtering
- [ ] Document preview
- [ ] Document download
- [ ] Document deletion with confirmation
- [ ] Empty states display correctly

#### UI/UX
- [ ] Responsive on mobile devices
- [ ] Responsive on tablets
- [ ] Loading states for all operations
- [ ] Error messages are user-friendly
- [ ] Toast notifications work
- [ ] Navigation is consistent
- [ ] Forms validate properly
- [ ] Keyboard navigation works

#### Performance
- [ ] Initial page load < 3 seconds
- [ ] Document list loads quickly
- [ ] No memory leaks during navigation
- [ ] API rate limiting handled gracefully

## Testing with Docker

If you need to test with a fresh backend:

```bash
# Start backend services
docker-compose up -d

# Wait for services to be ready
sleep 30

# Run integration tests
npm run test:integration
```

## Troubleshooting

### Backend Not Running
```bash
# Check if backend is healthy
curl http://localhost:8080/api/v1/health

# If using Docker Desktop on Windows with WSL2:
# 1. Test from Windows browser: http://localhost:8080/health
# 2. Find Windows host IP: cat /etc/resolv.conf | grep nameserver
# 3. Update .env.local with the working URL
```

### WSL2 + Docker Desktop Issues
If you're using WSL2 with Docker Desktop on Windows and the backend uses host networking:
1. The backend may only be accessible from Windows, not WSL2
2. Try accessing http://localhost:8080/health from a Windows browser
3. Consider changing Docker compose to use bridge networking with port mapping
4. Or run the frontend from Windows instead of WSL2

### Frontend Build Issues
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Test Failures
1. Check backend logs: `docker-compose logs -f archivus`
2. Check browser console for errors
3. Verify environment variables in `.env.local`
4. Ensure database migrations are up to date

## Environment Variables

Ensure these are set in `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Next Steps

After Phase 1 testing is complete:
1. Document any bugs found
2. Fix critical issues
3. Proceed to Phase 2 (AI Features) implementation