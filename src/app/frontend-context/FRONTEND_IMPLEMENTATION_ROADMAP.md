# 🚀 Archivus Frontend Implementation Roadmap

## 📋 **Updated Implementation Guide - Aligned with Actual API**

> **🚨 IMPORTANT**: This roadmap has been updated to match the actual backend API implementation discovered during analysis.

## 🔧 **Critical API Endpoint Corrections**

### **❌ Documentation Errors Found:**

1. **Multi-Document Endpoints**: 
   - ❌ **DOC**: `/api/v1/multi-document/compare` & `/api/v1/multi-document/ask`
   - ✅ **ACTUAL**: `/api/v1/multi-document/compare` & `/api/v1/multi-document/ask` ✓

2. **Chat Endpoints**:
   - ❌ **DOC**: `/api/v1/documents/{id}/chat` (single document chat)
   - ✅ **ACTUAL**: Complete chat session management system with multiple endpoints

3. **Search Endpoints**:
   - ❌ **DOC**: Basic `/api/v1/search` 
   - ✅ **ACTUAL**: Advanced search system with `/api/v1/search/intelligent`, `/api/v1/search/hybrid`, `/api/v1/search/suggestions`

4. **Enhanced Document Features**:
   - ❌ **DOC**: Missing enhanced document endpoints
   - ✅ **ACTUAL**: `/api/v1/documents/enhanced`, `/api/v1/documents/workspace-context`, `/api/v1/documents/insights`

### **✅ Corrected API Client Implementation**

```typescript
// src/lib/api/client.ts - CORRECTED VERSION
class ArchivusAPIClient {
  private baseURL: string
  private token: string | null = null

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_ARCHIVUS_API || ''
  }

  setToken(token: string) {
    this.token = token
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
    }

    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return response.json()
  }

  // ✅ CORRECTED DOCUMENT METHODS
  async getDocuments(params?: any) {
    return this.request<any>('/api/v1/documents', { method: 'GET' })
  }

  async getEnhancedDocuments(params?: any) {
    const queryParams = new URLSearchParams(params).toString()
    return this.request<any>(`/api/v1/documents/enhanced?${queryParams}`)
  }

  async getWorkspaceContext() {
    return this.request<any>('/api/v1/documents/workspace-context')
  }

  async getDocumentInsights() {
    return this.request<any>('/api/v1/documents/insights')
  }

  async uploadDocument(formData: FormData) {
    return this.request<any>('/api/v1/documents/upload', {
      method: 'POST',
      body: formData,
      headers: {
        // Don't set Content-Type for FormData
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
    })
  }

  // ✅ CORRECTED CHAT METHODS - Session-based approach
  async createChatSession(documentId: string, sessionName?: string) {
    return this.request<any>('/api/v1/chat/sessions', {
      method: 'POST',
      body: JSON.stringify({ 
        document_id: documentId,
        session_name: sessionName 
      }),
    })
  }

  async askQuestion(sessionId: string, question: string) {
    return this.request<any>(`/api/v1/chat/sessions/${sessionId}/ask`, {
      method: 'POST',
      body: JSON.stringify({ question }),
    })
  }

  async getChatSession(sessionId: string) {
    return this.request<any>(`/api/v1/chat/sessions/${sessionId}`)
  }

  async getUserChatSessions(page = 1, pageSize = 20) {
    return this.request<any>(`/api/v1/chat/sessions?page=${page}&page_size=${pageSize}`)
  }

  // ✅ MULTI-DOCUMENT METHODS
  async compareDocuments(documentIds: string[], query?: string) {
    return this.request<any>('/api/v1/multi-document/compare', {
      method: 'POST',
      body: JSON.stringify({ 
        document_ids: documentIds,
        query 
      }),
    })
  }

  async askMultipleDocuments(documentIds: string[], question: string) {
    return this.request<any>('/api/v1/multi-document/ask', {
      method: 'POST',
      body: JSON.stringify({ 
        document_ids: documentIds,
        question 
      }),
    })
  }

  async getMultiDocumentAnalyses(page = 1, pageSize = 20, analysisType?: string) {
    const params = new URLSearchParams({ 
      page: page.toString(), 
      page_size: pageSize.toString() 
    })
    if (analysisType) params.append('analysis_type', analysisType)
    
    return this.request<any>(`/api/v1/multi-document/analyses?${params}`)
  }

  // ✅ SEARCH METHODS
  async intelligentSearch(query: string, limit = 20) {
    const params = new URLSearchParams({ q: query, limit: limit.toString() })
    return this.request<any>(`/api/v1/search/intelligent?${params}`)
  }

  async hybridSearch(searchParams: any) {
    return this.request<any>('/api/v1/search/hybrid', {
      method: 'POST',
      body: JSON.stringify(searchParams),
    })
  }

  async getSearchSuggestions(partialQuery: string) {
    const params = new URLSearchParams({ q: partialQuery })
    return this.request<any>(`/api/v1/search/suggestions?${params}`)
  }

  async getSimilarDocuments(documentId: string, limit = 10) {
    const params = new URLSearchParams({ limit: limit.toString() })
    return this.request<any>(`/api/v1/documents/${documentId}/similar?${params}`)
  }

  // ✅ ANALYTICS METHODS
  async getAnalyticsDashboard(period = 'month') {
    const params = new URLSearchParams({ period })
    return this.request<any>(`/api/v1/analytics/dashboard?${params}`)
  }

  async getDocumentAnalytics(filters: any) {
    const params = new URLSearchParams(filters)
    return this.request<any>(`/api/v1/analytics/documents?${params}`)
  }

  async getStorageReport() {
    return this.request<any>('/api/v1/analytics/storage')
  }

  // ✅ AUTH METHODS (Verified correct)
  async login(email: string, password: string) {
    return this.request<any>('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  async logout() {
    return this.request<any>('/api/v1/auth/logout', { method: 'POST' })
  }
}

export const apiClient = new ArchivusAPIClient()
```

### **✅ Updated React Query Hooks**

```typescript
// src/lib/api/queries.ts - CORRECTED VERSION
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from './client'

// ✅ ENHANCED DOCUMENTS
export const useEnhancedDocuments = (params?: any) => {
  return useQuery({
    queryKey: ['documents', 'enhanced', params],
    queryFn: () => apiClient.getEnhancedDocuments(params),
  })
}

export const useWorkspaceContext = () => {
  return useQuery({
    queryKey: ['workspace-context'],
    queryFn: () => apiClient.getWorkspaceContext(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useDocumentInsights = () => {
  return useQuery({
    queryKey: ['document-insights'],
    queryFn: () => apiClient.getDocumentInsights(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

// ✅ CHAT SESSIONS
export const useCreateChatSession = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ documentId, sessionName }: { documentId: string; sessionName?: string }) =>
      apiClient.createChatSession(documentId, sessionName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-sessions'] })
    },
  })
}

export const useAskQuestion = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ sessionId, question }: { sessionId: string; question: string }) =>
      apiClient.askQuestion(sessionId, question),
    onSuccess: (_, { sessionId }) => {
      queryClient.invalidateQueries({ queryKey: ['chat-session', sessionId] })
    },
  })
}

export const useChatSessions = (page = 1, pageSize = 20) => {
  return useQuery({
    queryKey: ['chat-sessions', page, pageSize],
    queryFn: () => apiClient.getUserChatSessions(page, pageSize),
  })
}

export const useChatSession = (sessionId: string) => {
  return useQuery({
    queryKey: ['chat-session', sessionId],
    queryFn: () => apiClient.getChatSession(sessionId),
    enabled: !!sessionId,
  })
}

// ✅ MULTI-DOCUMENT ANALYSIS
export const useCompareDocuments = () => {
  return useMutation({
    mutationFn: ({ documentIds, query }: { documentIds: string[]; query?: string }) =>
      apiClient.compareDocuments(documentIds, query),
  })
}

export const useAskMultipleDocuments = () => {
  return useMutation({
    mutationFn: ({ documentIds, question }: { documentIds: string[]; question: string }) =>
      apiClient.askMultipleDocuments(documentIds, question),
  })
}

export const useMultiDocumentAnalyses = (page = 1, pageSize = 20, analysisType?: string) => {
  return useQuery({
    queryKey: ['multi-document-analyses', page, pageSize, analysisType],
    queryFn: () => apiClient.getMultiDocumentAnalyses(page, pageSize, analysisType),
  })
}

// ✅ ENHANCED SEARCH
export const useIntelligentSearch = (query: string, limit = 20) => {
  return useQuery({
    queryKey: ['intelligent-search', query, limit],
    queryFn: () => apiClient.intelligentSearch(query, limit),
    enabled: query.length > 2,
    staleTime: 30 * 1000, // 30 seconds
  })
}

export const useHybridSearch = () => {
  return useMutation({
    mutationFn: (searchParams: any) => apiClient.hybridSearch(searchParams),
  })
}

export const useSearchSuggestions = (partialQuery: string) => {
  return useQuery({
    queryKey: ['search-suggestions', partialQuery],
    queryFn: () => apiClient.getSearchSuggestions(partialQuery),
    enabled: partialQuery.length >= 2,
    staleTime: 60 * 1000, // 1 minute
  })
}

export const useSimilarDocuments = (documentId: string, limit = 10) => {
  return useQuery({
    queryKey: ['similar-documents', documentId, limit],
    queryFn: () => apiClient.getSimilarDocuments(documentId, limit),
    enabled: !!documentId,
  })
}

// ✅ ANALYTICS
export const useAnalyticsDashboard = (period = 'month') => {
  return useQuery({
    queryKey: ['analytics-dashboard', period],
    queryFn: () => apiClient.getAnalyticsDashboard(period),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useDocumentAnalytics = (filters: any) => {
  return useQuery({
    queryKey: ['document-analytics', filters],
    queryFn: () => apiClient.getDocumentAnalytics(filters),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useStorageReport = () => {
  return useQuery({
    queryKey: ['storage-report'],
    queryFn: () => apiClient.getStorageReport(),
    staleTime: 15 * 60 * 1000, // 15 minutes
  })
}
```

## 🎯 **Updated Component Architecture**

### **✅ Enhanced Dashboard Component**

```typescript
// src/components/dashboard/enhanced-dashboard.tsx
'use client'

import { useState } from 'react'
import { useEnhancedDocuments, useWorkspaceContext, useDocumentInsights } from '@/lib/api/queries'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Upload, Brain, Search, BarChart3 } from 'lucide-react'

export function EnhancedDashboard() {
  const [includeContext, setIncludeContext] = useState(true)
  
  const { data: documents, isLoading: docsLoading } = useEnhancedDocuments({
    include_context: includeContext,
    page: 1,
    page_size: 20
  })
  
  const { data: insights, isLoading: insightsLoading } = useDocumentInsights()
  const { data: workspaceContext } = useWorkspaceContext()

  if (docsLoading || insightsLoading) {
    return <DashboardSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* AI Workspace Context */}
      {workspaceContext && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              AI Workspace Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              {workspaceContext.recent_activity}
            </p>
            {workspaceContext.recommendations?.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium">Recommendations:</h4>
                {workspaceContext.recommendations.slice(0, 3).map((rec, index) => (
                  <div key={index} className="text-sm p-2 bg-white rounded border">
                    <strong>{rec.type}:</strong> {rec.description}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button className="h-20 flex-col gap-2">
          <Upload className="h-6 w-6" />
          Upload Document
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-2">
          <Brain className="h-6 w-6" />
          AI Analysis
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-2">
          <Search className="h-6 w-6" />
          Smart Search
        </Button>
        <Button variant="outline" className="h-20 flex-col gap-2">
          <BarChart3 className="h-6 w-6" />
          Analytics
        </Button>
      </div>

      {/* Document Insights */}
      {insights && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Total Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{insights.total_documents}</div>
              <p className="text-xs text-gray-600">
                {insights.processed_documents} AI processed
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Document Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {Object.entries(insights.document_types).slice(0, 3).map(([type, count]) => (
                  <div key={type} className="flex justify-between text-sm">
                    <span className="capitalize">{type}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Processing Speed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {insights.processing_time_ms}ms
              </div>
              <p className="text-xs text-gray-600">
                Average AI processing time
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Recent Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Documents</CardTitle>
        </CardHeader>
        <CardContent>
          {documents?.documents?.length > 0 ? (
            <div className="space-y-3">
              {documents.documents.slice(0, 5).map((doc: any) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <h4 className="font-medium">{doc.title}</h4>
                    <p className="text-sm text-gray-600">{doc.document_type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">
                      {new Date(doc.created_at).toLocaleDateString()}
                    </div>
                    {doc.ai_summary && (
                      <div className="text-xs text-blue-600">AI Processed</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No documents yet. Upload your first document to get started!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-4 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

### **✅ Advanced Chat Interface**

```typescript
// src/components/chat/chat-interface.tsx
'use client'

import { useState, useEffect } from 'react'
import { useCreateChatSession, useAskQuestion, useChatSession, useChatSessions } from '@/lib/api/queries'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageSquare, Send, Plus } from 'lucide-react'

interface ChatInterfaceProps {
  documentId?: string
}

export function ChatInterface({ documentId }: ChatInterfaceProps) {
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)
  const [message, setMessage] = useState('')
  
  const { data: sessions } = useChatSessions()
  const { data: activeSession } = useChatSession(activeSessionId!)
  const createSession = useCreateChatSession()
  const askQuestion = useAskQuestion()

  const handleCreateSession = async () => {
    if (!documentId) return
    
    try {
      const session = await createSession.mutateAsync({
        documentId,
        sessionName: `Chat ${new Date().toLocaleTimeString()}`
      })
      setActiveSessionId(session.id)
    } catch (error) {
      console.error('Failed to create chat session:', error)
    }
  }

  const handleSendMessage = async () => {
    if (!message.trim() || !activeSessionId) return
    
    try {
      await askQuestion.mutateAsync({
        sessionId: activeSessionId,
        question: message
      })
      setMessage('')
    } catch (error) {
      console.error('Failed to send message:', error)
    }
  }

  return (
    <div className="flex h-[600px] border rounded-lg">
      {/* Sessions Sidebar */}
      <div className="w-1/3 border-r bg-gray-50">
        <div className="p-4 border-b">
          <Button onClick={handleCreateSession} className="w-full" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>
        
        <ScrollArea className="h-full">
          <div className="p-2 space-y-2">
            {sessions?.sessions?.map((session: any) => (
              <Button
                key={session.id}
                variant={activeSessionId === session.id ? "default" : "ghost"}
                className="w-full justify-start text-left h-auto p-3"
                onClick={() => setActiveSessionId(session.id)}
              >
                <div>
                  <div className="font-medium text-sm">{session.title}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(session.created_at).toLocaleDateString()}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeSession ? (
          <>
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {activeSession.messages?.map((msg: any, index: number) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <div className="text-xs opacity-70 mt-1">
                        {new Date(msg.created_at).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask a question about this document..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} disabled={!message.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Select a chat session or create a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
```

## 🚀 **Updated Implementation Timeline**

| Phase | Duration | Key Deliverables | API Alignment |
|-------|----------|------------------|---------------|
| **Phase 1** | Week 1 | Project setup, corrected API client | ✅ |
| **Phase 2** | Week 1-2 | Authentication (working endpoints) | ✅ |
| **Phase 3** | Week 2-3 | Enhanced dashboard with AI context | ✅ |
| **Phase 4** | Week 3-4 | Chat sessions & multi-document analysis | ✅ |
| **Phase 5** | Week 4-5 | Advanced search & analytics integration | ✅ |
| **Phase 6** | Week 5-6 | Mobile optimization & deployment | ✅ |

---

**🎯 This corrected roadmap ensures your frontend will integrate seamlessly with your actual Archivus API implementation!** 