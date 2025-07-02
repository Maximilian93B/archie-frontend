# 🚀 Phase 2: AI Chat Implementation Plan
## Performance & Cost-Optimized Strategy

## 📋 Overview

This plan outlines a performance-first approach to implementing Archivus's AI chat features while minimizing costs and ensuring an excellent user experience.

## 🎯 Core Principles

### 1. **Performance First**
- Minimize API calls through intelligent caching
- Implement virtual scrolling for long conversations
- Use optimistic UI updates for instant feedback
- Lazy load sessions and messages

### 2. **Cost Optimization**
- Cache AI responses to avoid duplicate processing
- Implement client-side rate limiting
- Batch operations where possible
- Use local storage for draft messages

### 3. **User Experience**
- Instant UI feedback with optimistic updates
- Smooth animations and transitions
- Offline support with message queuing
- Progressive enhancement

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend Architecture                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐    ┌──────────────┐    ┌────────────┐│
│  │   Zustand   │    │ React Query  │    │   Local    ││
│  │    Store    │◄───┤   Cache      │◄───┤  Storage   ││
│  └──────┬──────┘    └──────┬───────┘    └────────────┘│
│         │                   │                           │
│  ┌──────▼──────────────────▼───────────────────────┐  │
│  │           Chat State Manager                     │  │
│  │  - Active sessions cache                        │  │
│  │  - Message history (paginated)                  │  │
│  │  - Optimistic updates queue                     │  │
│  │  - Rate limit tracking                          │  │
│  └─────────────────────┬───────────────────────────┘  │
│                        │                               │
│  ┌─────────────────────▼───────────────────────────┐  │
│  │              UI Components                       │  │
│  │  - VirtualizedMessageList                       │  │
│  │  - OptimisticChatInput                         │  │
│  │  - SessionManager                              │  │
│  └─────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## 📊 Performance Strategies

### 1. **Message Virtualization**
```typescript
// Only render visible messages + buffer
interface VirtualizedMessageListProps {
  messages: ChatMessage[];
  height: number;
  itemHeight: number;
  overscan?: number; // Number of items to render outside viewport
}

// Implementation approach:
- Use react-window or @tanstack/react-virtual
- Render only visible messages + 5 above/below
- Lazy load message batches as user scrolls
- Maintain scroll position on new messages
```

### 2. **Smart Caching Strategy**
```typescript
// Multi-layer caching approach
interface CacheStrategy {
  // Layer 1: In-memory cache (Zustand)
  activeSession: ChatSession | null;
  recentSessions: Map<string, ChatSession>; // LRU cache
  
  // Layer 2: React Query cache
  queryCache: {
    staleTime: 5 * 60 * 1000; // 5 minutes
    cacheTime: 30 * 60 * 1000; // 30 minutes
  };
  
  // Layer 3: Local Storage
  localStorage: {
    draftMessages: Map<string, string>;
    sessionMetadata: SessionMetadata[];
  };
}
```

### 3. **Optimistic Updates**
```typescript
// Immediate UI feedback
const sendMessage = async (message: string) => {
  // 1. Add message to UI immediately
  const optimisticMessage = {
    id: `temp-${Date.now()}`,
    role: 'user',
    content: message,
    timestamp: new Date().toISOString(),
    status: 'pending'
  };
  
  addMessageOptimistically(optimisticMessage);
  
  // 2. Send to backend
  try {
    const response = await chatAPI.askQuestion(sessionId, message);
    // Replace temp message with real one
    replaceOptimisticMessage(optimisticMessage.id, response);
  } catch (error) {
    // Mark message as failed, show retry
    markMessageFailed(optimisticMessage.id);
  }
};
```

### 4. **Intelligent Prefetching**
```typescript
// Prefetch likely next actions
interface PrefetchStrategy {
  // Prefetch recent sessions on app load
  prefetchRecentSessions: () => void;
  
  // Prefetch document sessions when hovering
  prefetchDocumentSessions: (documentId: string) => void;
  
  // Prefetch next page of messages before scroll
  prefetchNextMessagePage: (sessionId: string, currentPage: number) => void;
}
```

## 💰 Cost Optimization Strategies

### 1. **Response Caching**
```typescript
// Cache AI responses by question similarity
interface ResponseCache {
  // Hash question + document context
  getCacheKey: (question: string, documentId: string) => string;
  
  // Check cache before API call
  getCachedResponse: (cacheKey: string) => CachedResponse | null;
  
  // Cache new responses
  cacheResponse: (cacheKey: string, response: AIResponse) => void;
  
  // TTL: 24 hours for identical questions
  ttl: 24 * 60 * 60 * 1000;
}
```

### 2. **Client-Side Rate Limiting**
```typescript
// Prevent excessive API calls
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  canMakeRequest(endpoint: string, limit: number, window: number): boolean {
    const now = Date.now();
    const requests = this.requests.get(endpoint) || [];
    
    // Remove old requests outside window
    const validRequests = requests.filter(time => now - time < window);
    
    if (validRequests.length >= limit) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(endpoint, validRequests);
    return true;
  }
  
  getTimeUntilNextRequest(endpoint: string, limit: number, window: number): number {
    // Calculate wait time
  }
}
```

### 3. **Message Batching**
```typescript
// Batch multiple operations
interface BatchOperations {
  // Batch session updates
  batchUpdateSessions: (updates: SessionUpdate[]) => Promise<void>;
  
  // Batch message marking as read
  batchMarkAsRead: (messageIds: string[]) => Promise<void>;
  
  // Debounce search queries
  debouncedSearch: debounce((query: string) => search(query), 300);
}
```

## 🔧 Implementation Phases

### Phase 2.1: Core Chat UI (Week 1)

#### **Day 1-2: Basic Chat Components**
```typescript
// 1. Message Component
- MessageBubble (user/assistant styling)
- MessageTimestamp (relative time)
- MessageActions (copy, retry, delete)
- MessageStatus (pending, sent, failed)

// 2. Chat Input
- MultilineInput with Shift+Enter
- CharacterCounter
- SendButton with loading state
- DraftSaving indicator
```

#### **Day 3-4: Session Management**
```typescript
// 1. Session List
- SessionListItem (name, last message, time)
- SessionSearch with debouncing
- CreateSessionButton
- SessionActions (rename, delete, pin)

// 2. Session State
- Zustand store for active session
- Session switching logic
- Unsaved draft handling
```

#### **Day 5: Virtual Scrolling**
```typescript
// 1. VirtualizedMessageList
- Implement with @tanstack/react-virtual
- Handle dynamic message heights
- Maintain scroll position
- Auto-scroll to bottom on new messages
```

### Phase 2.2: API Integration & Caching (Week 2)

#### **Day 1-2: React Query Setup**
```typescript
// 1. Query Hooks
- useSession(sessionId)
- useSessions(page, pageSize)
- useDocumentSessions(documentId)
- useSearchSessions(query)

// 2. Mutation Hooks
- useCreateSession()
- useAskQuestion()
- useUpdateSessionName()
- useDeleteSession()
```

#### **Day 3-4: Caching Layer**
```typescript
// 1. Response Cache
- Implement similarity matching
- Local storage persistence
- Cache invalidation strategy
- Usage analytics

// 2. Optimistic Updates
- Message queue implementation
- Retry logic for failures
- Conflict resolution
```

#### **Day 5: Performance Optimization**
```typescript
// 1. Profiling & Optimization
- React DevTools profiling
- Bundle size analysis
- Lazy loading implementation
- Memory leak detection
```

### Phase 2.3: Advanced Features (Week 3)

#### **Day 1-2: Offline Support**
```typescript
// 1. Message Queue
- IndexedDB for offline storage
- Queue failed messages
- Sync on reconnection
- Conflict resolution

// 2. PWA Features
- Service worker for caching
- Background sync
- Push notifications (future)
```

#### **Day 3-4: Search & Analytics**
```typescript
// 1. Search Implementation
- Full-text search UI
- Search highlighting
- Search history
- Saved searches

// 2. Session Analytics
- Message count tracking
- Response time metrics
- Usage patterns
- Cost tracking
```

#### **Day 5: Polish & Testing**
```typescript
// 1. UI Polish
- Loading skeletons
- Smooth transitions
- Error boundaries
- Accessibility

// 2. Testing
- Unit tests for hooks
- Integration tests
- E2E chat flow tests
- Performance benchmarks
```

## 📱 Mobile Optimization

### 1. **Responsive Design**
```typescript
// Mobile-first approach
- Bottom-anchored input
- Swipe to delete sessions
- Touch-friendly message actions
- Keyboard-aware scrolling
```

### 2. **Performance**
```typescript
// Mobile-specific optimizations
- Reduced message batch size
- More aggressive virtualization
- Lower resolution avatars
- Simplified animations
```

## 📊 Monitoring & Analytics

### 1. **Performance Metrics**
```typescript
interface PerformanceMetrics {
  // Message rendering
  messageRenderTime: number;
  scrollPerformance: number;
  
  // API performance
  apiResponseTime: number;
  cacheHitRate: number;
  
  // User experience
  timeToFirstMessage: number;
  messageDeliveryTime: number;
}
```

### 2. **Cost Metrics**
```typescript
interface CostMetrics {
  // AI usage
  totalQuestions: number;
  cachedResponses: number;
  apiCalls: number;
  
  // Savings
  costSaved: number;
  cacheEfficiency: number;
}
```

## 🚀 Success Metrics

### Performance Targets
- Initial chat load: < 500ms
- Message send feedback: < 100ms (optimistic)
- Scroll performance: 60fps
- Cache hit rate: > 30%

### Cost Targets
- Reduce AI API calls by 40% through caching
- Reduce duplicate questions by 60%
- Minimize failed requests through rate limiting

### User Experience Targets
- Zero perceived latency for sending messages
- Smooth scrolling for 10,000+ messages
- Offline support for reading sessions
- < 2% error rate

## 🛠️ Technical Stack

### Core Dependencies
```json
{
  "@tanstack/react-virtual": "^3.0.0",     // Virtualization
  "@tanstack/react-query": "^5.0.0",       // Server state
  "idb": "^8.0.0",                         // IndexedDB wrapper
  "react-markdown": "^9.0.0",              // Markdown rendering
  "react-syntax-highlighter": "^15.0.0",   // Code highlighting
  "fuse.js": "^7.0.0",                     // Fuzzy search
  "date-fns": "^3.0.0",                    // Date formatting
  "lodash.debounce": "^4.0.0"             // Debouncing
}
```

## 📝 Code Standards

### 1. **TypeScript First**
- Strict type checking
- No any types
- Proper error types
- Exhaustive switches

### 2. **Performance First**
- Memo components appropriately
- Use callbacks for event handlers
- Virtualize long lists
- Profile before optimizing

### 3. **Accessibility**
- ARIA labels for chat
- Keyboard navigation
- Screen reader support
- Focus management

---

This implementation plan ensures we deliver a high-performance, cost-effective chat system that provides an excellent user experience while managing resources efficiently.