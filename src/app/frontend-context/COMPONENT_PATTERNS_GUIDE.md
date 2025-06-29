# 🎨 Archivus Frontend Component Patterns Guide

## 🏗️ **Component Architecture Overview**

### **File Structure Convention**
```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   ├── documents/             # Document-specific components
│   ├── chat/                  # Chat system components
│   ├── search/                # Search interface components
│   ├── analytics/             # Analytics dashboard components
│   ├── auth/                  # Authentication components
│   └── layout/                # Layout and navigation
├── hooks/                     # Custom React hooks
├── services/                  # API service layers
├── types/                     # TypeScript definitions
├── utils/                     # Utility functions
└── store/                     # State management
```

---

## 📄 **Document Management Components**

### **DocumentList Component**
```typescript
interface DocumentListProps {
  documents: Document[];
  loading?: boolean;
  onDocumentSelect?: (document: Document) => void;
  onDocumentAction?: (action: DocumentAction, document: Document) => void;
  selectable?: boolean;
  showAIStatus?: boolean;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  loading = false,
  onDocumentSelect,
  onDocumentAction,
  selectable = false,
  showAIStatus = true
}) => {
  return (
    <div className="document-list">
      {documents.map(document => (
        <DocumentItem 
          key={document.id}
          document={document}
          onSelect={onDocumentSelect}
          onAction={onDocumentAction}
          selectable={selectable}
          showAIStatus={showAIStatus}
        />
      ))}
    </div>
  );
};
```

### **DocumentUpload Component**
```typescript
interface DocumentUploadProps {
  onUploadComplete?: (document: Document) => void;
  onUploadError?: (error: string) => void;
  acceptedTypes?: string[];
  maxSize?: number; // MB
  enableAI?: boolean;
  enableOCR?: boolean;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  onUploadComplete,
  onUploadError,
  acceptedTypes = ['.pdf', '.doc', '.docx', '.txt'],
  maxSize = 50,
  enableAI = true,
  enableOCR = false
}) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleUpload = async (files: FileList) => {
    // Upload implementation with progress tracking
  };

  return (
    <DropZone
      onDrop={handleUpload}
      acceptedTypes={acceptedTypes}
      maxSize={maxSize}
      disabled={isUploading}
    >
      {isUploading && <ProgressBar progress={uploadProgress} />}
    </DropZone>
  );
};
```

### **DocumentViewer Component**
```typescript
interface DocumentViewerProps {
  document: Document;
  onChatOpen?: () => void;
  onAnalysisOpen?: () => void;
  showAIInsights?: boolean;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document,
  onChatOpen,
  onAnalysisOpen,
  showAIInsights = true
}) => {
  const [viewMode, setViewMode] = useState<'preview' | 'text' | 'ai'>('preview');
  
  return (
    <div className="document-viewer">
      <DocumentViewerHeader 
        document={document}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onChatOpen={onChatOpen}
        onAnalysisOpen={onAnalysisOpen}
      />
      
      <DocumentViewerContent 
        document={document}
        viewMode={viewMode}
        showAIInsights={showAIInsights}
      />
    </div>
  );
};
```

---

## 💬 **Chat System Components**

### **ChatInterface Component**
```typescript
interface ChatInterfaceProps {
  document: Document;
  sessionId?: string;
  onSessionChange?: (sessionId: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  document,
  sessionId,
  onSessionChange
}) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="chat-interface">
      <ChatSessionManager 
        document={document}
        sessions={sessions}
        currentSession={currentSession}
        onSessionSelect={setCurrentSession}
        onSessionCreate={handleSessionCreate}
      />
      
      <ChatMessageList 
        messages={messages}
        isLoading={isLoading}
      />
      
      <ChatInputArea 
        onSendMessage={handleSendMessage}
        disabled={isLoading}
        suggestions={chatSuggestions}
      />
    </div>
  );
};
```

### **ChatSessionManager Component**
```typescript
interface ChatSessionManagerProps {
  document: Document;
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  onSessionSelect: (session: ChatSession) => void;
  onSessionCreate: (name?: string) => void;
}

const ChatSessionManager: React.FC<ChatSessionManagerProps> = ({
  document,
  sessions,
  currentSession,
  onSessionSelect,
  onSessionCreate
}) => {
  return (
    <div className="chat-session-manager">
      <div className="session-header">
        <h3>Chat Sessions for {document.title}</h3>
        <Button onClick={() => onSessionCreate()}>
          New Session
        </Button>
      </div>
      
      <div className="session-list">
        {sessions.map(session => (
          <ChatSessionItem 
            key={session.id}
            session={session}
            isActive={currentSession?.id === session.id}
            onSelect={onSessionSelect}
          />
        ))}
      </div>
    </div>
  );
};
```

---

## 🔍 **Search Interface Components**

### **EnhancedSearch Component**
```typescript
interface EnhancedSearchProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  onResultSelect: (document: Document) => void;
  initialQuery?: string;
  enableHybridSearch?: boolean;
  enableSemanticSearch?: boolean;
}

const EnhancedSearch: React.FC<EnhancedSearchProps> = ({
  onSearch,
  onResultSelect,
  initialQuery = '',
  enableHybridSearch = true,
  enableSemanticSearch = false
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [searchMode, setSearchMode] = useState<'intelligent' | 'hybrid'>('intelligent');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div className="enhanced-search">
      <SearchInput 
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
        isSearching={isSearching}
        suggestions={searchSuggestions}
      />
      
      <SearchFilters 
        filters={filters}
        onFiltersChange={setFilters}
        searchMode={searchMode}
        onSearchModeChange={setSearchMode}
        enableHybridSearch={enableHybridSearch}
        enableSemanticSearch={enableSemanticSearch}
      />
      
      <SearchResults 
        results={results}
        onResultSelect={onResultSelect}
        isLoading={isSearching}
      />
    </div>
  );
};
```

### **SearchFilters Component**
```typescript
interface SearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  searchMode: 'intelligent' | 'hybrid';
  onSearchModeChange: (mode: 'intelligent' | 'hybrid') => void;
  enableHybridSearch?: boolean;
  enableSemanticSearch?: boolean;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  searchMode,
  onSearchModeChange,
  enableHybridSearch = true,
  enableSemanticSearch = false
}) => {
  return (
    <div className="search-filters">
      <div className="search-mode-selector">
        <ToggleGroup value={searchMode} onValueChange={onSearchModeChange}>
          <ToggleItem value="intelligent">Intelligent Search</ToggleItem>
          {enableHybridSearch && (
            <ToggleItem value="hybrid">Hybrid Search</ToggleItem>
          )}
        </ToggleGroup>
      </div>
      
      <div className="filter-options">
        <DocumentTypeFilter 
          selectedTypes={filters.documentTypes}
          onTypesChange={(types) => 
            onFiltersChange({ ...filters, documentTypes: types })
          }
        />
        
        <DateRangeFilter 
          dateRange={filters.dateRange}
          onDateRangeChange={(range) => 
            onFiltersChange({ ...filters, dateRange: range })
          }
        />
        
        {searchMode === 'hybrid' && (
          <HybridSearchOptions 
            options={filters.hybridOptions}
            onOptionsChange={(options) =>
              onFiltersChange({ ...filters, hybridOptions: options })
            }
            enableSemanticSearch={enableSemanticSearch}
          />
        )}
      </div>
    </div>
  );
};
```

---

## 📊 **Analytics Dashboard Components**

### **AnalyticsDashboard Component**
```typescript
interface AnalyticsDashboardProps {
  period: AnalyticsPeriod;
  onPeriodChange: (period: AnalyticsPeriod) => void;
  onExport?: (format: 'csv' | 'xlsx' | 'pdf') => void;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  period,
  onPeriodChange,
  onExport
}) => {
  const { data: analytics, isLoading } = useAnalytics(period);

  return (
    <div className="analytics-dashboard">
      <DashboardHeader 
        period={period}
        onPeriodChange={onPeriodChange}
        onExport={onExport}
      />
      
      <div className="dashboard-grid">
        <MetricsOverview metrics={analytics?.overview} />
        <DocumentAnalytics data={analytics?.documents} />
        <AIProcessingMetrics data={analytics?.aiProcessing} />
        <StorageAnalytics data={analytics?.storage} />
        <UserActivityMetrics data={analytics?.users} />
        <ComplianceMetrics data={analytics?.compliance} />
      </div>
    </div>
  );
};
```

### **MetricsCard Component**
```typescript
interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    period: string;
    type: 'increase' | 'decrease' | 'neutral';
  };
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  change,
  icon,
  action
}) => {
  return (
    <Card className="metrics-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className={`text-xs ${getChangeColor(change.type)}`}>
            {change.type === 'increase' ? '+' : change.type === 'decrease' ? '-' : ''}
            {Math.abs(change.value)}% from {change.period}
          </div>
        )}
        {action && (
          <Button variant="ghost" size="sm" onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
```

---

## 🔐 **Authentication Components**

### **AuthProvider Component**
```typescript
interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Initialize auth state from localStorage/cookies
    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    // Implement login logic
  };

  const logout = async () => {
    // Implement logout logic
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    refreshToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

### **LoginForm Component**
```typescript
interface LoginFormProps {
  onSuccess?: (user: User) => void;
  onError?: (error: string) => void;
  enableSocialLogin?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onError,
  enableSocialLogin = true
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  
  const handleSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const user = await login(data.email, data.password);
      onSuccess?.(user);
    } catch (error) {
      onError?.(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      <Form onSubmit={handleSubmit}>
        <FormField name="email" type="email" required />
        <FormField name="password" type="password" required />
        
        <Button type="submit" loading={isLoading}>
          Sign In
        </Button>
      </Form>
      
      {enableSocialLogin && (
        <SocialLoginButtons 
          providers={['google', 'apple', 'github']}
          onSuccess={onSuccess}
          onError={onError}
        />
      )}
    </div>
  );
};
```

---

## 🎯 **Multi-Document Analysis Components**

### **MultiDocumentAnalysis Component**
```typescript
interface MultiDocumentAnalysisProps {
  selectedDocuments: Document[];
  onDocumentAdd: () => void;
  onDocumentRemove: (documentId: string) => void;
  onAnalysisComplete?: (result: MultiDocumentAnalysis) => void;
}

const MultiDocumentAnalysis: React.FC<MultiDocumentAnalysisProps> = ({
  selectedDocuments,
  onDocumentAdd,
  onDocumentRemove,
  onAnalysisComplete
}) => {
  const [analysisType, setAnalysisType] = useState<'comparison' | 'qa'>('comparison');
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<MultiDocumentAnalysis | null>(null);

  return (
    <div className="multi-document-analysis">
      <DocumentSelectionArea 
        selectedDocuments={selectedDocuments}
        onDocumentAdd={onDocumentAdd}
        onDocumentRemove={onDocumentRemove}
        minDocuments={2}
        maxDocuments={10}
      />
      
      <AnalysisTypeSelector 
        type={analysisType}
        onTypeChange={setAnalysisType}
      />
      
      {analysisType === 'qa' && (
        <QueryInput 
          query={query}
          onQueryChange={setQuery}
          placeholder="Ask a question about these documents..."
        />
      )}
      
      <AnalysisActions 
        onStartAnalysis={handleStartAnalysis}
        disabled={selectedDocuments.length < 2 || isAnalyzing}
        isAnalyzing={isAnalyzing}
      />
      
      {result && (
        <AnalysisResults 
          result={result}
          onSaveAnalysis={handleSaveAnalysis}
          onShareAnalysis={handleShareAnalysis}
        />
      )}
    </div>
  );
};
```

---

## 🎨 **UI Component Patterns**

### **Loading States**
```typescript
// Document loading skeleton
const DocumentSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
  </div>
);

// Chat message loading
const ChatLoadingIndicator = () => (
  <div className="flex items-center space-x-2">
    <div className="flex space-x-1">
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
    <span className="text-sm text-gray-500">Claude is thinking...</span>
  </div>
);

// Progress indicator for AI processing
const AIProcessingIndicator = ({ status, progress }: { status: string; progress?: number }) => (
  <div className="ai-processing-indicator">
    <div className="flex items-center space-x-2">
      <Spinner size="sm" />
      <span className="text-sm">{status}</span>
    </div>
    {progress !== undefined && (
      <ProgressBar value={progress} className="mt-2" />
    )}
  </div>
);
```

### **Error Boundaries**
```typescript
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ 
  children, 
  fallback: Fallback = DefaultErrorFallback 
}) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const retry = () => {
    setHasError(false);
    setError(null);
  };

  if (hasError && error) {
    return <Fallback error={error} retry={retry} />;
  }

  return <>{children}</>;
};

const DefaultErrorFallback = ({ error, retry }: { error: Error; retry: () => void }) => (
  <div className="error-boundary">
    <h2>Something went wrong</h2>
    <details>
      <summary>Error details</summary>
      <pre>{error.message}</pre>
    </details>
    <Button onClick={retry}>Try again</Button>
  </div>
);
```

---

## 🔄 **State Management Patterns**

### **Custom Hooks**
```typescript
// Document management hook
const useDocuments = (filters?: DocumentFilters) => {
  return useQuery({
    queryKey: ['documents', filters],
    queryFn: () => documentsService.getDocuments(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Chat session hook
const useChatSession = (sessionId: string) => {
  return useQuery({
    queryKey: ['chat', 'sessions', sessionId],
    queryFn: () => chatService.getSession(sessionId),
    enabled: !!sessionId,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

// Upload mutation hook
const useDocumentUpload = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: documentsService.uploadDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
};

// Analytics hook with caching
const useAnalytics = (period: AnalyticsPeriod) => {
  return useQuery({
    queryKey: ['analytics', period],
    queryFn: () => analyticsService.getDashboard(period),
    staleTime: 10 * 60 * 1000, // 10 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });
};
```

---

## 📱 **Responsive Design Patterns**

### **Layout Components**
```typescript
const ResponsiveLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
      <aside className="lg:col-span-3 xl:col-span-2">
        <Sidebar />
      </aside>
      <main className="lg:col-span-9 xl:col-span-10">
        {children}
      </main>
    </div>
  </div>
);

const MobileDrawer = ({ isOpen, onClose, children }: MobileDrawerProps) => (
  <Transition show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-40 lg:hidden" onClose={onClose}>
      <TransitionChild
        as={Fragment}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </TransitionChild>
      
      <div className="fixed inset-0 z-40 flex">
        <TransitionChild
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <DialogPanel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
            {children}
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </Transition>
);
```

---

## 🧪 **Testing Patterns**

### **Component Testing**
```typescript
// Document component test
describe('DocumentViewer', () => {
  const mockDocument = {
    id: '123',
    title: 'Test Document',
    content_type: 'application/pdf',
    ai_processed: true
  };

  it('should render document information', () => {
    render(<DocumentViewer document={mockDocument} />);
    expect(screen.getByText('Test Document')).toBeInTheDocument();
  });

  it('should handle chat opening', () => {
    const onChatOpen = jest.fn();
    render(<DocumentViewer document={mockDocument} onChatOpen={onChatOpen} />);
    
    fireEvent.click(screen.getByText('Start Chat'));
    expect(onChatOpen).toHaveBeenCalled();
  });
});

// API hook testing
describe('useDocuments', () => {
  it('should fetch documents', async () => {
    const { result } = renderHook(() => useDocuments());
    
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    
    expect(result.current.data).toBeDefined();
  });
});
```

---

**🎯 This guide provides consistent patterns for building the Archivus frontend aligned with your powerful backend capabilities!** 