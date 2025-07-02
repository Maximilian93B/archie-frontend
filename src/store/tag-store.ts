// 🏷️ Tag Store
// Zustand store for tag management state

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Tag, DocumentTagsResponse } from '@/types';
import { tagsAPI } from '@/lib/api/tags';
import { toast } from 'react-hot-toast';

interface TagState {
  // State
  availableTags: Tag[];
  documentTags: Record<string, DocumentTagsResponse>; // Cache by document ID
  selectedTags: string[]; // For filtering
  tagSuggestions: string[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadTags: () => Promise<void>;
  loadDocumentTags: (documentId: string) => Promise<DocumentTagsResponse>;
  createTag: (name: string, color?: string) => Promise<Tag>;
  deleteTag: (tagId: string) => Promise<void>;
  addDocumentTags: (documentId: string, tags: string[]) => Promise<void>;
  removeDocumentTag: (documentId: string, tagName: string) => Promise<void>;
  setSelectedTags: (tags: string[]) => void;
  toggleSelectedTag: (tag: string) => void;
  clearSelectedTags: () => void;
  searchTags: (query: string) => Promise<void>;
}

export const useTagStore = create<TagState>()(
  persist(
    (set, get) => ({
      // Initial state
      availableTags: [],
      documentTags: {},
      selectedTags: [],
      tagSuggestions: [],
      isLoading: false,
      error: null,

      // Load all available tags
      loadTags: async () => {
        set({ isLoading: true, error: null });
        try {
          const tags = await tagsAPI.list();
          set({ availableTags: tags, isLoading: false });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to load tags';
          set({ error: message, isLoading: false });
          toast.error(message);
        }
      },

      // Load tags for a specific document
      loadDocumentTags: async (documentId) => {
        const cached = get().documentTags[documentId];
        if (cached) return cached;

        set({ isLoading: true, error: null });
        try {
          const tagData = await tagsAPI.getDocumentTags(documentId);
          set((state) => ({
            documentTags: {
              ...state.documentTags,
              [documentId]: tagData
            },
            isLoading: false
          }));
          return tagData;
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to load document tags';
          set({ error: message, isLoading: false });
          toast.error(message);
          throw error;
        }
      },

      // Create a new tag
      createTag: async (name, color) => {
        set({ isLoading: true, error: null });
        try {
          const newTag = await tagsAPI.create(name, color);
          set((state) => ({
            availableTags: [...state.availableTags, newTag],
            isLoading: false
          }));
          toast.success('Tag created successfully');
          return newTag;
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to create tag';
          set({ error: message, isLoading: false });
          toast.error(message);
          throw error;
        }
      },

      // Delete a tag
      deleteTag: async (tagId) => {
        set({ isLoading: true, error: null });
        try {
          await tagsAPI.delete(tagId);
          set((state) => ({
            availableTags: state.availableTags.filter(t => t.id !== tagId),
            isLoading: false
          }));
          toast.success('Tag deleted successfully');
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to delete tag';
          set({ error: message, isLoading: false });
          toast.error(message);
          throw error;
        }
      },

      // Add tags to a document
      addDocumentTags: async (documentId, tags) => {
        set({ isLoading: true, error: null });
        try {
          await tagsAPI.addDocumentTags(documentId, tags);
          
          // Reload document tags to get updated state
          const updatedTags = await tagsAPI.getDocumentTags(documentId);
          set((state) => ({
            documentTags: {
              ...state.documentTags,
              [documentId]: updatedTags
            },
            isLoading: false
          }));
          
          toast.success(`Added ${tags.length} tag(s) to document`);
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to add tags';
          set({ error: message, isLoading: false });
          toast.error(message);
          throw error;
        }
      },

      // Remove a tag from a document
      removeDocumentTag: async (documentId, tagName) => {
        set({ isLoading: true, error: null });
        try {
          await tagsAPI.removeDocumentTag(documentId, tagName);
          
          // Update cache optimistically
          set((state) => {
            const docTags = state.documentTags[documentId];
            if (docTags) {
              return {
                documentTags: {
                  ...state.documentTags,
                  [documentId]: {
                    ...docTags,
                    user_tags: docTags.user_tags.filter(t => t !== tagName)
                  }
                },
                isLoading: false
              };
            }
            return { isLoading: false };
          });
          
          toast.success('Tag removed');
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to remove tag';
          set({ error: message, isLoading: false });
          toast.error(message);
          throw error;
        }
      },

      // Set selected tags for filtering
      setSelectedTags: (tags) => {
        set({ selectedTags: tags });
      },

      // Toggle a tag in selection
      toggleSelectedTag: (tag) => {
        set((state) => {
          const tags = new Set(state.selectedTags);
          if (tags.has(tag)) {
            tags.delete(tag);
          } else {
            tags.add(tag);
          }
          return { selectedTags: Array.from(tags) };
        });
      },

      // Clear all selected tags
      clearSelectedTags: () => {
        set({ selectedTags: [] });
      },

      // Search for tag suggestions
      searchTags: async (query) => {
        if (!query || query.length < 2) {
          set({ tagSuggestions: [] });
          return;
        }

        try {
          const suggestions = await tagsAPI.getSuggestions(query);
          set({ tagSuggestions: suggestions });
        } catch (error) {
          console.error('Failed to get tag suggestions:', error);
          set({ tagSuggestions: [] });
        }
      }
    }),
    {
      name: 'tag-store',
      partialize: (state) => ({
        selectedTags: state.selectedTags
      })
    }
  )
);