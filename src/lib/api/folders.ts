// 📁 Folder API Client
// API integration for folder management

import { apiClient } from './client';
import { 
  Folder, 
  CreateFolderRequest, 
  UpdateFolderRequest,
  FolderTreeNode,
  PaginatedResponse,
  Document
} from '@/types';

// ================================
// 📁 Folder API Functions
// ================================

export const folderAPI = {
  /**
   * Create a new folder
   */
  async create(data: CreateFolderRequest): Promise<Folder> {
    const response = await apiClient.post('/folders', data);
    return response.data;
  },

  /**
   * Get all folders (flat list)
   */
  async list(): Promise<Folder[]> {
    const response = await apiClient.get('/folders');
    return response.data;
  },

  /**
   * Get folder tree structure
   */
  async getTree(): Promise<FolderTreeNode[]> {
    const folders = await this.list();
    return buildFolderTree(folders);
  },

  /**
   * Get a specific folder by ID
   */
  async get(folderId: string): Promise<Folder> {
    const response = await apiClient.get(`/folders/${folderId}`);
    return response.data;
  },

  /**
   * Update a folder
   */
  async update(folderId: string, data: UpdateFolderRequest): Promise<Folder> {
    const response = await apiClient.put(`/folders/${folderId}`, data);
    return response.data;
  },

  /**
   * Delete a folder
   */
  async delete(folderId: string): Promise<void> {
    await apiClient.delete(`/folders/${folderId}`);
  },

  /**
   * Get documents in a folder
   */
  async getDocuments(
    folderId: string,
    params?: {
      page?: number;
      page_size?: number;
      sort_by?: string;
      sort_desc?: boolean;
    }
  ): Promise<PaginatedResponse<Document>> {
    const response = await apiClient.get(`/folders/${folderId}/documents`, {
      params
    });
    return response.data;
  },

  /**
   * Move documents to a folder
   */
  async moveDocuments(
    targetFolderId: string,
    documentIds: string[]
  ): Promise<void> {
    await apiClient.post(`/folders/${targetFolderId}/documents`, {
      document_ids: documentIds
    });
  },

  /**
   * Get folder path (breadcrumbs)
   */
  async getPath(folderId: string): Promise<Folder[]> {
    const folder = await this.get(folderId);
    const folders = await this.list();
    return buildFolderPath(folder, folders);
  }
};

// ================================
// 🛠️ Helper Functions
// ================================

/**
 * Build hierarchical folder tree from flat list
 */
function buildFolderTree(folders: Folder[]): FolderTreeNode[] {
  const folderMap = new Map<string, FolderTreeNode>();
  const rootFolders: FolderTreeNode[] = [];

  // First pass: create all nodes
  folders.forEach(folder => {
    folderMap.set(folder.id, {
      ...folder,
      children: [],
      document_count: folder.document_count || 0,
      is_expanded: false,
      is_selected: false
    });
  });

  // Second pass: build tree structure
  folders.forEach(folder => {
    const node = folderMap.get(folder.id)!;
    
    if (folder.parent_id) {
      const parent = folderMap.get(folder.parent_id);
      if (parent) {
        parent.children.push(node);
      }
    } else {
      rootFolders.push(node);
    }
  });

  // Sort folders alphabetically at each level
  const sortFolders = (nodes: FolderTreeNode[]) => {
    nodes.sort((a, b) => {
      // System folders first
      if (a.is_system !== b.is_system) {
        return a.is_system ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
    
    nodes.forEach(node => {
      if (node.children.length > 0) {
        sortFolders(node.children);
      }
    });
  };

  sortFolders(rootFolders);
  return rootFolders;
}

/**
 * Build folder path from root to specified folder
 */
function buildFolderPath(
  targetFolder: Folder,
  allFolders: Folder[]
): Folder[] {
  const path: Folder[] = [targetFolder];
  let currentFolder = targetFolder;

  while (currentFolder.parent_id) {
    const parent = allFolders.find(f => f.id === currentFolder.parent_id);
    if (parent) {
      path.unshift(parent);
      currentFolder = parent;
    } else {
      break;
    }
  }

  return path;
}

/**
 * Find folder by path
 */
export function findFolderByPath(
  tree: FolderTreeNode[],
  path: string
): FolderTreeNode | null {
  const parts = path.split('/').filter(Boolean);
  let current = tree;
  let folder: FolderTreeNode | null = null;

  for (const part of parts) {
    folder = current.find(f => f.name === part) || null;
    if (!folder) return null;
    current = folder.children;
  }

  return folder;
}

/**
 * Get all descendant folder IDs
 */
export function getDescendantFolderIds(
  folder: FolderTreeNode
): string[] {
  const ids: string[] = [];
  
  const collect = (node: FolderTreeNode) => {
    ids.push(node.id);
    node.children.forEach(collect);
  };
  
  collect(folder);
  return ids;
}