// 📁 Folder Store
// Zustand store for folder management state

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FolderTreeNode, Folder } from '@/types';
import { folderAPI } from '@/lib/api/folders';
import { toast } from 'react-hot-toast';

interface FolderState {
  // State
  folders: FolderTreeNode[];
  selectedFolderId: string | null;
  expandedFolderIds: Set<string>;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadFolders: () => Promise<void>;
  createFolder: (data: { name: string; parent_id?: string; color?: string; icon?: string }) => Promise<Folder>;
  updateFolder: (folderId: string, data: { name?: string; color?: string; icon?: string }) => Promise<void>;
  deleteFolder: (folderId: string) => Promise<void>;
  selectFolder: (folderId: string | null) => void;
  toggleFolderExpanded: (folderId: string) => void;
  expandFolder: (folderId: string) => void;
  collapseFolder: (folderId: string) => void;
  expandAllFolders: () => void;
  collapseAllFolders: () => void;
  moveDocumentsToFolder: (targetFolderId: string, documentIds: string[]) => Promise<void>;
  refreshFolder: (folderId: string) => Promise<void>;
}

export const useFolderStore = create<FolderState>()(
  persist(
    (set, get) => ({
      // Initial state
      folders: [],
      selectedFolderId: null,
      expandedFolderIds: new Set<string>(),
      isLoading: false,
      error: null,

      // Load all folders and build tree
      loadFolders: async () => {
        set({ isLoading: true, error: null });
        try {
          const folderTree = await folderAPI.getTree();
          set({ folders: folderTree, isLoading: false });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to load folders';
          set({ error: message, isLoading: false });
          toast.error(message);
        }
      },

      // Create a new folder
      createFolder: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const newFolder = await folderAPI.create(data);
          
          // Reload folders to get updated tree
          await get().loadFolders();
          
          // Expand parent folder if exists
          if (data.parent_id) {
            get().expandFolder(data.parent_id);
          }
          
          toast.success('Folder created successfully');
          return newFolder;
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to create folder';
          set({ error: message, isLoading: false });
          toast.error(message);
          throw error;
        }
      },

      // Update folder
      updateFolder: async (folderId, data) => {
        set({ isLoading: true, error: null });
        try {
          await folderAPI.update(folderId, data);
          await get().loadFolders();
          toast.success('Folder updated successfully');
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to update folder';
          set({ error: message, isLoading: false });
          toast.error(message);
          throw error;
        }
      },

      // Delete folder
      deleteFolder: async (folderId) => {
        set({ isLoading: true, error: null });
        try {
          await folderAPI.delete(folderId);
          
          // Clear selection if deleted folder was selected
          if (get().selectedFolderId === folderId) {
            set({ selectedFolderId: null });
          }
          
          await get().loadFolders();
          toast.success('Folder deleted successfully');
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to delete folder';
          set({ error: message, isLoading: false });
          toast.error(message);
          throw error;
        }
      },

      // Select a folder
      selectFolder: (folderId) => {
        set({ selectedFolderId: folderId });
      },

      // Toggle folder expanded state
      toggleFolderExpanded: (folderId) => {
        set((state) => {
          const expanded = new Set(state.expandedFolderIds);
          if (expanded.has(folderId)) {
            expanded.delete(folderId);
          } else {
            expanded.add(folderId);
          }
          return { expandedFolderIds: expanded };
        });
      },

      // Expand a folder
      expandFolder: (folderId) => {
        set((state) => {
          const expanded = new Set(state.expandedFolderIds);
          expanded.add(folderId);
          return { expandedFolderIds: expanded };
        });
      },

      // Collapse a folder
      collapseFolder: (folderId) => {
        set((state) => {
          const expanded = new Set(state.expandedFolderIds);
          expanded.delete(folderId);
          return { expandedFolderIds: expanded };
        });
      },

      // Expand all folders
      expandAllFolders: () => {
        const allFolderIds = new Set<string>();
        const collectIds = (folders: FolderTreeNode[]) => {
          folders.forEach((folder) => {
            allFolderIds.add(folder.id);
            if (folder.children.length > 0) {
              collectIds(folder.children);
            }
          });
        };
        collectIds(get().folders);
        set({ expandedFolderIds: allFolderIds });
      },

      // Collapse all folders
      collapseAllFolders: () => {
        set({ expandedFolderIds: new Set<string>() });
      },

      // Move documents to folder
      moveDocumentsToFolder: async (targetFolderId, documentIds) => {
        set({ isLoading: true, error: null });
        try {
          await folderAPI.moveDocuments(targetFolderId, documentIds);
          toast.success(`${documentIds.length} document(s) moved successfully`);
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to move documents';
          set({ error: message, isLoading: false });
          toast.error(message);
          throw error;
        }
      },

      // Refresh a specific folder
      refreshFolder: async (folderId) => {
        try {
          const folder = await folderAPI.get(folderId);
          // Update the folder in the tree
          set((state) => {
            const updateFolderInTree = (nodes: FolderTreeNode[]): FolderTreeNode[] => {
              return nodes.map((node) => {
                if (node.id === folderId) {
                  return {
                    ...node,
                    ...folder,
                    children: node.children,
                    is_expanded: state.expandedFolderIds.has(folderId),
                    is_selected: state.selectedFolderId === folderId
                  };
                }
                if (node.children.length > 0) {
                  return {
                    ...node,
                    children: updateFolderInTree(node.children)
                  };
                }
                return node;
              });
            };
            
            return {
              folders: updateFolderInTree(state.folders)
            };
          });
        } catch (error) {
          console.error('Failed to refresh folder:', error);
        }
      }
    }),
    {
      name: 'folder-store',
      partialize: (state) => ({
        selectedFolderId: state.selectedFolderId,
        expandedFolderIds: Array.from(state.expandedFolderIds)
      }),
      onRehydrateStorage: () => (state) => {
        if (state && state.expandedFolderIds) {
          // Convert array back to Set after rehydration
          state.expandedFolderIds = new Set(state.expandedFolderIds as any);
        }
      }
    }
  )
);