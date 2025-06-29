# 📖 Archivus Frontend Development Quick Reference

## 🚀 **Getting Started Checklist**

### **Environment Setup**
```bash
# Required environment variables
NEXT_PUBLIC_ARCHIVUS_API=https://your-api.fly.dev
NEXT_PUBLIC_SUPABASE_URL=https://project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### **Essential Dependencies**
```json
{
  "@tanstack/react-query": "^5.0.0",
  "axios": "^1.6.0",
  "zustand": "^4.4.0",
  "react-hook-form": "^7.45.0",
  "@hookform/resolvers": "^3.3.0",
  "zod": "^3.22.0"
}
```

---

## 🔗 **API Endpoints Quick Reference**

### **Authentication**
```typescript
POST /api/v1/auth/login           // Login user
POST /api/v1/auth/logout          // Logout user
POST /api/v1/auth/refresh         // Refresh token
POST /api/v1/auth/register        // Register new user
GET  /api/v1/auth/validate        // Validate token
```

### **Documents**
```typescript
GET    /api/v1/documents              // List documents
POST   /api/v1/documents/upload       // Upload document
GET    /api/v1/documents/:id          // Get document
PUT    /api/v1/documents/:id          // Update document
DELETE /api/v1/documents/:id          // Delete document
GET    /api/v1/documents/:id/ai-results // Get AI analysis
GET    /api/v1/documents/enhanced     // Enhanced documents list
GET    /api/v1/documents/workspace-context // Workspace context
```

### **Chat System (Session-Based)**
```typescript
POST   /api/v1/chat/sessions              // Create chat session
GET    /api/v1/chat/sessions              // List sessions
GET    /api/v1/chat/sessions/:id          // Get session
POST   /api/v1/chat/sessions/:id/ask      // Ask question
PUT    /api/v1/chat/sessions/:id/name     // Update session name
DELETE /api/v1/chat/sessions/:id          // Delete session
```

### **Search**
```typescript
GET  /api/v1/search/intelligent     // Intelligent search
POST /api/v1/search/hybrid          // Hybrid search (advanced)
GET  /api/v1/search/suggestions     // Search suggestions
```

### **Analytics**
```typescript
GET /api/v1/analytics/dashboard     // Dashboard metrics
GET /api/v1/analytics/documents     // Document analytics
GET /api/v1/analytics/users         // User analytics
GET /api/v1/analytics/storage       // Storage analytics
```

### **Multi-Document Analysis**
```typescript
POST /api/v1/multi-document/compare  // Compare documents
POST /api/v1/multi-document/ask      // Ask across documents
GET  /api/v1/multi-document/analyses // List analyses
```

---

## 🛡️ **Authentication Patterns**

### **Setup Auth Provider**
```typescript
// app/providers.tsx
import { AuthProvider } from '@/contexts/auth-context';

export function Providers({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
```

### **Use Auth Hook**
```typescript
// components/Header.tsx
import { useAuth } from '@/hooks/use-auth';

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) return <LoginPrompt />;
  
  return (
    <header>
      <span>Welcome, {user?.first_name}</span>
      <button onClick={logout}>Logout</button>
    </header>
  );
}
```

### **Protected Route**
```typescript
// components/ProtectedRoute.tsx
import { useAuth } from '@/hooks/use-auth';
import { redirect } from 'next/navigation';

export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) redirect('/auth/login');
  
  return children;
}
```

---

## 📄 **Document Management Patterns**

### **Document Upload**
```typescript
// hooks/use-document-upload.ts
import { useDocumentUpload } from '@/hooks/queries/documents.queries';

export function UploadButton() {
  const uploadMutation = useDocumentUpload();
  
  const handleUpload = async (file: File) => {
    try {
      await uploadMutation.mutateAsync({
        file,
        options: { enable_ai: true },
        onProgress: (progress) => setProgress(progress)
      });
      toast.success('Document uploaded successfully');
    } catch (error) {
      toast.error('Upload failed');
    }
  };

  return <FileUpload onUpload={handleUpload} />;
}
```

### **Document List with Pagination**
```typescript
// components/DocumentList.tsx
import { useDocuments } from '@/hooks/queries/documents.queries';

export function DocumentList() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<DocumentFilters>({});
  
  const { data, isLoading, error } = useDocuments({
    page,
    page_size: 20,
    ...filters
  });

  if (isLoading) return <DocumentListSkeleton />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div>
      <DocumentFilters onChange={setFilters} />
      <DocumentGrid documents={data?.data || []} />
      <Pagination 
        current={page}
        total={data?.total_pages || 0}
        onChange={setPage}
      />
    </div>
  );
}
```

---

## 💬 **Chat System Patterns**

### **Chat Interface Setup**
```typescript
// components/ChatInterface.tsx
import { useChatSession, useAskQuestion } from '@/hooks/queries/chat.queries';

export function ChatInterface({ documentId }: { documentId: string }) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { data: session } = useChatSession(sessionId!);
  const askMutation = useAskQuestion();

  const handleAskQuestion = async (question: string) => {
    if (!sessionId) return;
    
    await askMutation.mutateAsync({
      sessionId,
      question
    });
  };

  return (
    <div className="chat-interface">
      <ChatSessionManager 
        documentId={documentId}
        onSessionSelect={setSessionId}
      />
      <ChatMessages messages={session?.messages || []} />
      <ChatInput 
        onSend={handleAskQuestion}
        disabled={askMutation.isPending}
      />
    </div>
  );
}
```

### **Session Management**
```typescript
// hooks/use-chat-sessions.ts
export function useChatSessions(documentId: string) {
  const queryClient = useQueryClient();
  
  const createSession = useMutation({
    mutationFn: (name?: string) => 
      chatService.createSession({ document_id: documentId, session_name: name }),
    onSuccess: () => {
      queryClient.invalidateQueries(['chat', 'sessions']);
    }
  });

  const deleteSession = useMutation({
    mutationFn: (sessionId: string) => chatService.deleteSession(sessionId),
    onSuccess: () => {
      queryClient.invalidateQueries(['chat', 'sessions']);
    }
  });

  return { createSession, deleteSession };
}
```

---

## 🔍 **Search Implementation**

### **Enhanced Search Hook**
```typescript
// hooks/use-enhanced-search.ts
export function useEnhancedSearch() {
  const [searchType, setSearchType] = useState<'intelligent' | 'hybrid'>('intelligent');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});

  const searchQuery = useQuery({
    queryKey: ['search', searchType, query, filters],
    queryFn: () => {
      if (searchType === 'intelligent') {
        return searchService.intelligentSearch({ q: query, ...filters });
      } else {
        return searchService.hybridSearch({ 
          query, 
          ...filters.hybridOptions,
          filters 
        });
      }
    },
    enabled: !!query.trim(),
    staleTime: 30000 // 30 seconds
  });

  return {
    searchType,
    setSearchType,
    query,
    setQuery,
    filters,
    setFilters,
    results: searchQuery.data,
    isSearching: searchQuery.isFetching,
    error: searchQuery.error
  };
}
```

### **Search Component**
```typescript
// components/SearchInterface.tsx
export function SearchInterface() {
  const {
    query,
    setQuery,
    searchType,
    setSearchType,
    results,
    isSearching
  } = useEnhancedSearch();

  return (
    <div className="search-interface">
      <SearchModeToggle value={searchType} onChange={setSearchType} />
      <SearchInput 
        value={query}
        onChange={setQuery}
        placeholder="Search documents..."
        isLoading={isSearching}
      />
      <SearchResults 
        results={results}
        isLoading={isSearching}
      />
    </div>
  );
}
```

---

## 📊 **Analytics Dashboard**

### **Dashboard Hook**
```typescript
// hooks/use-analytics.ts
export function useAnalytics(period: AnalyticsPeriod = 'month') {
  return useQuery({
    queryKey: ['analytics', 'dashboard', period],
    queryFn: () => analyticsService.getDashboard(period),
    staleTime: 10 * 60 * 1000, // 10 minutes
    select: (data) => ({
      ...data,
      // Transform data for charts
      documentChartData: transformForChart(data.documents.uploads_by_period),
      storageChartData: transformForChart(data.storage.storage_growth_trend)
    })
  });
}
```

### **Metrics Card**
```typescript
// components/MetricsCard.tsx
export function MetricsCard({ 
  title, 
  value, 
  change, 
  icon 
}: MetricsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={`text-xs ${change.type === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
            {change.type === 'increase' ? '+' : '-'}{Math.abs(change.value)}% from last {change.period}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
```

---

## 🔄 **State Management Patterns**

### **Zustand Store Setup**
```typescript
// store/app-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  selectedDocuments: string[];
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
}

interface AppActions {
  selectDocument: (id: string) => void;
  deselectDocument: (id: string) => void;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set, get) => ({
      selectedDocuments: [],
      sidebarOpen: true,
      theme: 'light',
      
      selectDocument: (id) =>
        set((state) => ({
          selectedDocuments: [...state.selectedDocuments, id]
        })),
      
      deselectDocument: (id) =>
        set((state) => ({
          selectedDocuments: state.selectedDocuments.filter(doc => doc !== id)
        })),
        
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
        
      setTheme: (theme) => set({ theme })
    }),
    {
      name: 'archivus-app-store',
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen
      })
    }
  )
);
```

### **React Query Setup**
```typescript
// app/providers.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1,
    },
  },
});

export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

---

## 🎨 **UI Component Examples**

### **Loading States**
```typescript
// components/ui/LoadingStates.tsx
export const DocumentSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
  </div>
);

export const ChatLoadingDots = () => (
  <div className="flex space-x-1">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
        style={{ animationDelay: `${i * 0.1}s` }}
      />
    ))}
  </div>
);
```

### **Error Handling**
```typescript
// components/ui/ErrorBoundary.tsx
export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundaryComponent
      fallback={({ error, retry }) => (
        <div className="text-center p-6">
          <h2 className="text-lg font-semibold text-red-600">
            Something went wrong
          </h2>
          <p className="text-gray-600 mt-2">{error.message}</p>
          <button 
            onClick={retry}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try again
          </button>
        </div>
      )}
    >
      {children}
    </ErrorBoundaryComponent>
  );
}
```

---

## ⚡ **Performance Optimization**

### **Lazy Loading Components**
```typescript
// components/LazyComponents.tsx
import { lazy, Suspense } from 'react';

const AnalyticsDashboard = lazy(() => import('./AnalyticsDashboard'));
const ChatInterface = lazy(() => import('./ChatInterface'));

export function App() {
  return (
    <div>
      <Suspense fallback={<DashboardSkeleton />}>
        <AnalyticsDashboard />
      </Suspense>
      
      <Suspense fallback={<ChatSkeleton />}>
        <ChatInterface />
      </Suspense>
    </div>
  );
}
```

### **Virtualized Lists**
```typescript
// components/VirtualizedDocumentList.tsx
import { FixedSizeList as List } from 'react-window';

export function VirtualizedDocumentList({ documents }: { documents: Document[] }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      <DocumentItem document={documents[index]} />
    </div>
  );

  return (
    <List
      height={600}
      itemCount={documents.length}
      itemSize={120}
      width="100%"
    >
      {Row}
    </List>
  );
}
```

---

## 🧪 **Testing Patterns**

### **Component Testing**
```typescript
// __tests__/DocumentViewer.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DocumentViewer } from '@/components/DocumentViewer';

const createTestQueryClient = () => new QueryClient({
  defaultOptions: { queries: { retry: false } }
});

test('renders document information', () => {
  const queryClient = createTestQueryClient();
  const mockDocument = {
    id: '123',
    title: 'Test Document',
    ai_processed: true
  };

  render(
    <QueryClientProvider client={queryClient}>
      <DocumentViewer document={mockDocument} />
    </QueryClientProvider>
  );

  expect(screen.getByText('Test Document')).toBeInTheDocument();
});
```

### **API Mocking**
```typescript
// __tests__/mocks/api.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/v1/documents', (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          { id: '1', title: 'Document 1' },
          { id: '2', title: 'Document 2' }
        ],
        total: 2,
        page: 1,
        page_size: 20,
        total_pages: 1
      })
    );
  }),
];
```

---

## 🚨 **Common Gotchas & Solutions**

### **File Upload Progress**
```typescript
// Common issue: Progress not updating
// Solution: Use callback ref for progress updates
const [uploadProgress, setUploadProgress] = useState(0);

const handleUpload = useCallback(async (file: File) => {
  await uploadDocument(file, {
    onProgress: (progress) => {
      setUploadProgress(progress); // This will trigger re-render
    }
  });
}, []);
```

### **Chat Message Scrolling**
```typescript
// Common issue: Chat doesn't scroll to bottom on new messages
// Solution: Use useEffect with ref
const messagesEndRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);

return (
  <div className="messages-container">
    {messages.map(message => <ChatMessage key={message.id} {...message} />)}
    <div ref={messagesEndRef} />
  </div>
);
```

### **Search Debouncing**
```typescript
// Common issue: Too many API calls on search input
// Solution: Use debounced search
import { useDebouncedValue } from '@/hooks/use-debounced-value';

const [searchQuery, setSearchQuery] = useState('');
const debouncedQuery = useDebouncedValue(searchQuery, 300);

const { data: results } = useQuery({
  queryKey: ['search', debouncedQuery],
  queryFn: () => searchService.intelligentSearch({ q: debouncedQuery }),
  enabled: !!debouncedQuery.trim()
});
```

---

## 📦 **Deployment Checklist**

### **Environment Variables**
```bash
# Production
NEXT_PUBLIC_ARCHIVUS_API=https://production-api.fly.dev
NEXT_PUBLIC_SUPABASE_URL=https://production.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=production-key

# Development
NEXT_PUBLIC_ARCHIVUS_API=http://localhost:8080
NEXT_PUBLIC_SUPABASE_URL=https://staging.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=staging-key
```

### **Build Optimization**
```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  compress: true,
  images: {
    domains: ['supabase.co'],
    formats: ['image/webp', 'image/avif'],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;
```

---

**🎯 This quick reference provides everything you need to build the Archivus frontend efficiently and correctly!** 