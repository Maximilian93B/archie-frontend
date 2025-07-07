# 🗨️ Archivus Chat Feature - Frontend Implementation Guide

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [CSRF Token Management](#csrf-token-management)
4. [API Endpoints Reference](#api-endpoints-reference)
5. [Implementation Examples](#implementation-examples)
6. [Error Handling](#error-handling)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Overview

The Archivus Chat feature enables users to have AI-powered Q&A conversations with their documents. Each document can have multiple chat sessions, and users can maintain conversation history, ask follow-up questions, and get AI-generated summaries.

### Key Features
- 🤖 AI-powered document Q&A using Claude AI
- 💬 Multiple chat sessions per document
- 📝 Conversation history persistence
- 🔍 Searchable chat sessions
- 📊 Chat analytics and statistics
- 🎯 Smart question suggestions

---

## Prerequisites

### 1. Authentication
All chat endpoints require authentication. Ensure the user is logged in and you have a valid JWT token.

### 2. CSRF Protection
⚠️ **IMPORTANT**: All POST, PUT, and DELETE requests require a CSRF token. GET requests do not require CSRF tokens.

### 3. Base URL
All endpoints are prefixed with: `/api/v1/`

---

## CSRF Token Management

### Why CSRF Tokens?
CSRF (Cross-Site Request Forgery) tokens protect against malicious requests. Archivus requires CSRF tokens for all state-changing operations.

### Obtaining a CSRF Token

```typescript
// Function to get CSRF token
async function getCSRFToken(): Promise<string> {
  const response = await fetch('/api/v1/auth/csrf-token', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to get CSRF token');
  }
  
  const data = await response.json();
  return data.csrf_token;
}

// Store the token for reuse
let csrfToken: string | null = null;

// Helper to ensure we have a valid token
async function ensureCSRFToken(): Promise<string> {
  if (!csrfToken) {
    csrfToken = await getCSRFToken();
  }
  return csrfToken;
}
```

### Using CSRF Tokens in Requests

```typescript
// Example: Making a POST request with CSRF token
async function makeAuthenticatedRequest(url: string, options: RequestInit = {}) {
  const token = await ensureCSRFToken();
  
  return fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`,
      'X-CSRF-Token': token,
      ...options.headers,
    },
  });
}
```

---

## API Endpoints Reference

### 1. Create Chat Session
**POST** `/api/v1/chat/sessions`

Creates a new chat session for a document.

```typescript
interface CreateSessionRequest {
  document_id: string;
  session_name?: string; // Optional custom name
}

interface ChatSession {
  id: string;
  document_id: string;
  user_id: string;
  session_name: string;
  messages: ChatMessage[];
  context: Record<string, any>;
  is_active: boolean;
  total_messages: number;
  last_message_at: string | null;
  created_at: string;
  updated_at: string;
}

// Example
const createChatSession = async (documentId: string, sessionName?: string) => {
  const response = await makeAuthenticatedRequest('/api/v1/chat/sessions', {
    method: 'POST',
    body: JSON.stringify({
      document_id: documentId,
      session_name: sessionName || 'New Chat',
    }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create chat session');
  }
  
  return response.json();
};
```

### 2. Ask a Question
**POST** `/api/v1/chat/sessions/:session_id/ask`

Send a question to the AI about the document.

```typescript
interface AskQuestionRequest {
  question: string;
  include_context?: boolean; // Include previous messages
  max_context_messages?: number; // Limit context size
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface AskQuestionResponse {
  message: ChatMessage;
  session_id: string;
  total_messages: number;
}

// Example
const askQuestion = async (sessionId: string, question: string) => {
  const response = await makeAuthenticatedRequest(
    `/api/v1/chat/sessions/${sessionId}/ask`,
    {
      method: 'POST',
      body: JSON.stringify({
        question,
        include_context: true,
        max_context_messages: 10,
      }),
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to ask question');
  }
  
  return response.json();
};
```

### 3. Get Chat Session
**GET** `/api/v1/chat/sessions/:session_id`

Retrieve a specific chat session with all messages.

```typescript
// Example
const getChatSession = async (sessionId: string) => {
  const response = await fetch(`/api/v1/chat/sessions/${sessionId}`, {
    credentials: 'include',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to get chat session');
  }
  
  return response.json();
};
```

### 4. Get User's Chat Sessions
**GET** `/api/v1/chat/sessions`

Get all chat sessions for the current user.

```typescript
interface GetSessionsParams {
  page?: number;
  limit?: number;
  is_active?: boolean;
  sort_by?: 'created_at' | 'last_message_at';
  order?: 'asc' | 'desc';
}

// Example
const getUserSessions = async (params: GetSessionsParams = {}) => {
  const queryParams = new URLSearchParams();
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  if (params.is_active !== undefined) queryParams.append('is_active', params.is_active.toString());
  if (params.sort_by) queryParams.append('sort_by', params.sort_by);
  if (params.order) queryParams.append('order', params.order);
  
  const response = await fetch(`/api/v1/chat/sessions?${queryParams}`, {
    credentials: 'include',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
    },
  });
  
  return response.json();
};
```

### 5. Get Document's Chat Sessions
**GET** `/api/v1/chat/documents/:document_id/sessions`

Get all chat sessions for a specific document.

```typescript
// Example
const getDocumentSessions = async (documentId: string) => {
  const response = await fetch(
    `/api/v1/chat/documents/${documentId}/sessions`,
    {
      credentials: 'include',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    }
  );
  
  return response.json();
};
```

### 6. Update Session Name
**PUT** `/api/v1/chat/sessions/:session_id/name`

Update the name of a chat session.

```typescript
interface UpdateSessionNameRequest {
  name: string;
}

// Example
const updateSessionName = async (sessionId: string, name: string) => {
  const response = await makeAuthenticatedRequest(
    `/api/v1/chat/sessions/${sessionId}/name`,
    {
      method: 'PUT',
      body: JSON.stringify({ name }),
    }
  );
  
  return response.json();
};
```

### 7. Deactivate Session
**PUT** `/api/v1/chat/sessions/:session_id/deactivate`

Deactivate a chat session (soft delete).

```typescript
// Example
const deactivateSession = async (sessionId: string) => {
  const response = await makeAuthenticatedRequest(
    `/api/v1/chat/sessions/${sessionId}/deactivate`,
    {
      method: 'PUT',
    }
  );
  
  return response.json();
};
```

### 8. Delete Session
**DELETE** `/api/v1/chat/sessions/:session_id`

Permanently delete a chat session.

```typescript
// Example
const deleteSession = async (sessionId: string) => {
  const response = await makeAuthenticatedRequest(
    `/api/v1/chat/sessions/${sessionId}`,
    {
      method: 'DELETE',
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to delete session');
  }
};
```

### 9. Search Chat Sessions
**GET** `/api/v1/chat/search`

Search through chat sessions by content.

```typescript
interface SearchParams {
  query: string;
  document_id?: string;
  limit?: number;
}

// Example
const searchSessions = async (params: SearchParams) => {
  const queryParams = new URLSearchParams();
  queryParams.append('query', params.query);
  if (params.document_id) queryParams.append('document_id', params.document_id);
  if (params.limit) queryParams.append('limit', params.limit.toString());
  
  const response = await fetch(`/api/v1/chat/search?${queryParams}`, {
    credentials: 'include',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
    },
  });
  
  return response.json();
};
```

### 10. Summarize Session
**POST** `/api/v1/chat/sessions/:session_id/summarize`

Get an AI-generated summary of the chat session.

```typescript
// Example
const summarizeSession = async (sessionId: string) => {
  const response = await makeAuthenticatedRequest(
    `/api/v1/chat/sessions/${sessionId}/summarize`,
    {
      method: 'POST',
    }
  );
  
  return response.json();
};
```

### 11. Generate Search Suggestions
**POST** `/api/v1/chat/suggestions`

Get AI-powered question suggestions for a document.

```typescript
interface SuggestionsRequest {
  document_id: string;
  context?: string;
}

// Example
const getQuestionSuggestions = async (documentId: string) => {
  const response = await makeAuthenticatedRequest('/api/v1/chat/suggestions', {
    method: 'POST',
    body: JSON.stringify({ document_id: documentId }),
  });
  
  return response.json();
};
```

### 12. Get Chat Statistics
**GET** `/api/v1/chat/stats`

Get chat usage statistics for the current user.

```typescript
// Example
const getChatStats = async () => {
  const response = await fetch('/api/v1/chat/stats', {
    credentials: 'include',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
    },
  });
  
  return response.json();
};
```

---

## Implementation Examples

### Complete Chat Component Example

```tsx
import React, { useState, useEffect, useRef } from 'react';

interface ChatProps {
  documentId: string;
}

export const DocumentChat: React.FC<ChatProps> = ({ documentId }) => {
  const [session, setSession] = useState<ChatSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize or load existing session
  useEffect(() => {
    loadOrCreateSession();
  }, [documentId]);

  const loadOrCreateSession = async () => {
    try {
      // First, try to get existing sessions
      const sessions = await getDocumentSessions(documentId);
      
      if (sessions.data && sessions.data.length > 0) {
        // Use the most recent active session
        const activeSession = sessions.data.find((s: ChatSession) => s.is_active);
        if (activeSession) {
          setSession(activeSession);
          setMessages(activeSession.messages || []);
          return;
        }
      }
      
      // No active session, create new one
      const newSession = await createChatSession(documentId, 'Document Q&A');
      setSession(newSession.data);
      setMessages([]);
    } catch (error) {
      console.error('Failed to load chat session:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!session || !input.trim() || loading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await askQuestion(session.id, input);
      setMessages(prev => [...prev, response.data.message]);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Show error to user
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Document Q&A</h3>
        {session && (
          <p className="text-sm text-gray-500">
            Session: {session.session_name}
          </p>
        )}
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask a question about this document..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading || !session}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !input.trim() || !session}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
```

### Chat Sessions List Component

```tsx
interface ChatSessionsListProps {
  documentId?: string;
  onSelectSession: (session: ChatSession) => void;
}

export const ChatSessionsList: React.FC<ChatSessionsListProps> = ({
  documentId,
  onSelectSession,
}) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, [documentId]);

  const loadSessions = async () => {
    try {
      const response = documentId
        ? await getDocumentSessions(documentId)
        : await getUserSessions({ is_active: true, sort_by: 'last_message_at', order: 'desc' });
      
      setSessions(response.data || []);
    } catch (error) {
      console.error('Failed to load sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading sessions...</div>;
  }

  return (
    <div className="space-y-2">
      {sessions.map((session) => (
        <div
          key={session.id}
          onClick={() => onSelectSession(session)}
          className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
        >
          <h4 className="font-medium">{session.session_name}</h4>
          <p className="text-sm text-gray-500">
            {session.total_messages} messages
          </p>
          {session.last_message_at && (
            <p className="text-xs text-gray-400">
              Last message: {new Date(session.last_message_at).toLocaleDateString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
```

---

## Error Handling

### Common Error Codes

```typescript
enum ChatErrorCode {
  DOCUMENT_NOT_FOUND = 'DOCUMENT_NOT_FOUND',
  SESSION_NOT_FOUND = 'SESSION_NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  RATE_LIMITED = 'RATE_LIMITED',
  AI_SERVICE_ERROR = 'AI_SERVICE_ERROR',
  INVALID_REQUEST = 'INVALID_REQUEST',
  CSRF_TOKEN_REQUIRED = 'CSRF_TOKEN_REQUIRED',
}

interface ErrorResponse {
  error: string;
  message: string;
  code: ChatErrorCode;
  details?: any;
}
```

### Error Handling Example

```typescript
const handleChatError = (error: ErrorResponse) => {
  switch (error.code) {
    case ChatErrorCode.DOCUMENT_NOT_FOUND:
      showNotification('Document not found', 'error');
      break;
    
    case ChatErrorCode.SESSION_NOT_FOUND:
      showNotification('Chat session not found', 'error');
      break;
    
    case ChatErrorCode.RATE_LIMITED:
      showNotification('Too many requests. Please wait a moment.', 'warning');
      break;
    
    case ChatErrorCode.AI_SERVICE_ERROR:
      showNotification('AI service is temporarily unavailable', 'error');
      break;
    
    case ChatErrorCode.CSRF_TOKEN_REQUIRED:
      // Refresh CSRF token and retry
      csrfToken = null;
      break;
    
    default:
      showNotification(error.message || 'An error occurred', 'error');
  }
};
```

---

## Best Practices

### 1. Session Management
- Reuse existing sessions when possible
- Implement session cleanup for old/inactive sessions
- Allow users to name and organize their sessions

### 2. Performance Optimization
- Implement message pagination for long conversations
- Cache CSRF tokens (refresh on 403 errors)
- Debounce typing indicators
- Use optimistic UI updates

### 3. User Experience
- Show loading states during AI processing
- Implement retry logic for failed requests
- Provide question suggestions
- Allow message editing/regeneration

### 4. Security
- Always include CSRF tokens for state-changing operations
- Validate input on the client side
- Handle expired tokens gracefully
- Never expose sensitive data in error messages

### 5. Accessibility
- Use semantic HTML for chat interface
- Implement keyboard navigation
- Provide screen reader support
- Include ARIA labels

---

## Troubleshooting

### Common Issues

#### 1. 404 Error on Chat Endpoints
**Cause**: The database table might not exist.
**Solution**: Run the SQL script provided to create the `document_chat_sessions` table.

#### 2. 403 Forbidden - CSRF Token Required
**Cause**: Missing or invalid CSRF token.
**Solution**: 
```typescript
// Force refresh CSRF token
csrfToken = null;
const newToken = await getCSRFToken();
// Retry the request
```

#### 3. 401 Unauthorized
**Cause**: Invalid or expired JWT token.
**Solution**: Redirect to login or refresh the authentication token.

#### 4. 429 Too Many Requests
**Cause**: Rate limiting triggered.
**Solution**: Implement exponential backoff:
```typescript
const retryWithBackoff = async (fn: () => Promise<any>, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
};
```

#### 5. Empty AI Responses
**Cause**: Document might not have extracted text or AI processing might have failed.
**Solution**: Check if the document has been processed and has extracted text content.

### Debug Checklist
- [ ] Verify authentication token is valid
- [ ] Check CSRF token is included in requests
- [ ] Ensure document exists and user has access
- [ ] Verify database table exists and has proper permissions
- [ ] Check browser console for CORS issues
- [ ] Monitor network tab for request/response details

---

## Additional Resources

- [Archivus API Documentation](https://docs.archivus.com/api)
- [Claude AI Integration Guide](https://docs.archivus.com/ai)
- [Security Best Practices](https://docs.archivus.com/security)

For further assistance, contact the backend team or refer to the internal documentation.