import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';
import { toast } from 'react-hot-toast';
import type {
  ChatSession,
  CreateChatSessionRequest,
  AskQuestionRequest,
  ChatMessage,
} from '@/types';

// Query Keys
export const chatKeys = {
  all: ['chat'] as const,
  sessions: () => [...chatKeys.all, 'sessions'] as const,
  session: (id: string) => [...chatKeys.sessions(), id] as const,
  documentSessions: (documentId: string) => [...chatKeys.sessions(), 'document', documentId] as const,
};

// ================================
// 💬 Chat Session Queries
// ================================

export function useChatSessions() {
  return useQuery({
    queryKey: chatKeys.sessions(),
    queryFn: () => apiClient.getChatSessions(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useChatSession(sessionId: string) {
  return useQuery({
    queryKey: chatKeys.session(sessionId),
    queryFn: () => apiClient.getChatSession(sessionId),
    enabled: !!sessionId,
    staleTime: 30 * 1000, // 30 seconds - chat sessions update frequently
    refetchInterval: 5000, // Refetch every 5 seconds to get new messages
  });
}

// ================================
// 💬 Chat Session Mutations
// ================================

export function useCreateChatSession() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateChatSessionRequest) => apiClient.createChatSession(data),
    onSuccess: (newSession, variables) => {
      toast.success('Chat session created!');
      
      // Add to sessions list
      queryClient.setQueryData<ChatSession[]>(
        chatKeys.sessions(),
        (old) => old ? [newSession, ...old] : [newSession]
      );
      
      // Cache the new session
      queryClient.setQueryData(chatKeys.session(newSession.id), newSession);
      
      // Invalidate document sessions if needed
      if (variables.document_id) {
        queryClient.invalidateQueries({
          queryKey: chatKeys.documentSessions(variables.document_id)
        });
      }
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to create chat session';
      toast.error(message);
    },
  });
}

export function useAskQuestion() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ sessionId, question }: { sessionId: string; question: string }) =>
      apiClient.askQuestion(sessionId, { question }),
    onSuccess: (response, { sessionId }) => {
      // Update the session with new message
      queryClient.setQueryData<ChatSession>(
        chatKeys.session(sessionId),
        (old) => {
          if (!old) return old;
          
          // Add user message and AI response
          const userMessage: ChatMessage = {
            id: `temp-user-${Date.now()}`,
            role: 'user',
            content: response.question || '',
            claude_model: '',
            token_count: 0,
            created_at: new Date().toISOString(),
          };
          
          const aiMessage: ChatMessage = response.message || {
            id: `temp-ai-${Date.now()}`,
            role: 'assistant',
            content: response.content || '',
            claude_model: response.claude_model_used || 'claude-sonnet-4',
            token_count: response.token_usage?.output_tokens || 0,
            created_at: new Date().toISOString(),
          };
          
          return {
            ...old,
            messages: [...old.messages, userMessage, aiMessage],
            updated_at: new Date().toISOString(),
          };
        }
      );
      
      // Invalidate to ensure fresh data
      queryClient.invalidateQueries({ queryKey: chatKeys.session(sessionId) });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to send message';
      toast.error(message);
    },
  });
}

export function useUpdateSessionName() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ sessionId, name }: { sessionId: string; name: string }) =>
      apiClient.updateSessionName(sessionId, name),
    onSuccess: (updatedSession, { sessionId }) => {
      toast.success('Session name updated!');
      
      // Update session in cache
      queryClient.setQueryData(chatKeys.session(sessionId), updatedSession);
      
      // Update sessions list
      queryClient.setQueryData<ChatSession[]>(
        chatKeys.sessions(),
        (old) => old?.map(session => 
          session.id === sessionId ? updatedSession : session
        )
      );
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to update session name';
      toast.error(message);
    },
  });
}

export function useDeleteChatSession() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (sessionId: string) => apiClient.deleteSession(sessionId),
    onSuccess: (_, sessionId) => {
      toast.success('Chat session deleted!');
      
      // Remove from sessions list
      queryClient.setQueryData<ChatSession[]>(
        chatKeys.sessions(),
        (old) => old?.filter(session => session.id !== sessionId)
      );
      
      // Remove session cache
      queryClient.removeQueries({ queryKey: chatKeys.session(sessionId) });
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Failed to delete session';
      toast.error(message);
    },
  });
}

// ================================
// 💬 Optimistic Updates
// ================================

export function useOptimisticMessage() {
  const queryClient = useQueryClient();
  
  return {
    addMessage: (sessionId: string, message: string) => {
      const tempMessage: ChatMessage = {
        id: `temp-${Date.now()}`,
        role: 'user',
        content: message,
        claude_model: '',
        token_count: 0,
        created_at: new Date().toISOString(),
      };
      
      queryClient.setQueryData<ChatSession>(
        chatKeys.session(sessionId),
        (old) => {
          if (!old) return old;
          return {
            ...old,
            messages: [...old.messages, tempMessage],
          };
        }
      );
      
      return tempMessage.id;
    },
    
    removeMessage: (sessionId: string, messageId: string) => {
      queryClient.setQueryData<ChatSession>(
        chatKeys.session(sessionId),
        (old) => {
          if (!old) return old;
          return {
            ...old,
            messages: old.messages.filter(msg => msg.id !== messageId),
          };
        }
      );
    },
  };
}

// ================================
// 💬 Prefetch Utilities
// ================================

export function usePrefetchChatSession() {
  const queryClient = useQueryClient();
  
  return (sessionId: string) => {
    queryClient.prefetchQuery({
      queryKey: chatKeys.session(sessionId),
      queryFn: () => apiClient.getChatSession(sessionId),
      staleTime: 30 * 1000, // 30 seconds
    });
  };
} 