'use client';

import React, { useEffect, useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Folder, 
  FolderOpen,
  Plus,
  MoreVertical,
  Edit,
  Trash,
  FolderPlus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFolderStore } from '@/store/folder-store';
import { FolderTreeNode } from '@/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreateFolderDialog } from './create-folder-dialog';
import { EditFolderDialog } from './edit-folder-dialog';
import { DeleteFolderDialog } from './delete-folder-dialog';

interface FolderTreeProps {
  onFolderSelect?: (folderId: string | null) => void;
  className?: string;
}

export function FolderTree({ onFolderSelect, className }: FolderTreeProps) {
  const {
    folders,
    selectedFolderId,
    expandedFolderIds,
    isLoading,
    loadFolders,
    selectFolder,
    toggleFolderExpanded,
    expandAllFolders,
    collapseAllFolders
  } = useFolderStore();

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingFolder, setEditingFolder] = useState<FolderTreeNode | null>(null);
  const [deletingFolder, setDeletingFolder] = useState<FolderTreeNode | null>(null);
  const [parentFolderId, setParentFolderId] = useState<string | undefined>();

  useEffect(() => {
    loadFolders();
  }, [loadFolders]);

  const handleFolderClick = (folder: FolderTreeNode) => {
    selectFolder(folder.id);
    onFolderSelect?.(folder.id);
  };

  const handleCreateSubfolder = (parentId: string) => {
    setParentFolderId(parentId);
    setCreateDialogOpen(true);
  };

  const handleCreateRootFolder = () => {
    setParentFolderId(undefined);
    setCreateDialogOpen(true);
  };

  const renderFolder = (folder: FolderTreeNode, level: number = 0) => {
    const isExpanded = expandedFolderIds.has(folder.id);
    const isSelected = selectedFolderId === folder.id;
    const hasChildren = folder.children.length > 0;

    return (
      <div key={folder.id}>
        <div
          className={cn(
            'group flex items-center gap-1 px-2 py-1.5 hover:bg-gray-100 rounded-md cursor-pointer',
            isSelected && 'bg-gray-100',
            'transition-colors'
          )}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
        >
          {/* Expand/Collapse Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (hasChildren) {
                toggleFolderExpanded(folder.id);
              }
            }}
            className={cn(
              'p-0.5 hover:bg-gray-200 rounded transition-colors',
              !hasChildren && 'invisible'
            )}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            )}
          </button>

          {/* Folder Icon & Name */}
          <div
            onClick={() => handleFolderClick(folder)}
            className="flex items-center gap-2 flex-1 min-w-0"
          >
            {isExpanded && hasChildren ? (
              <FolderOpen 
                className="w-4 h-4 flex-shrink-0" 
                style={{ color: folder.color || '#6B7280' }}
              />
            ) : (
              <Folder 
                className="w-4 h-4 flex-shrink-0" 
                style={{ color: folder.color || '#6B7280' }}
              />
            )}
            <span className="text-sm truncate">{folder.name}</span>
            {folder.document_count !== undefined && folder.document_count > 0 && (
              <span className="text-xs text-gray-500 ml-auto mr-2">
                {folder.document_count}
              </span>
            )}
          </div>

          {/* Actions Menu */}
          {!folder.is_system && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleCreateSubfolder(folder.id)}>
                  <FolderPlus className="w-4 h-4 mr-2" />
                  New Subfolder
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setEditingFolder(folder)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Rename
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setDeletingFolder(folder)}
                  className="text-red-600"
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Render Children */}
        {isExpanded && hasChildren && (
          <div>
            {folder.children.map((child) => renderFolder(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (isLoading && folders.length === 0) {
    return (
      <div className={cn('p-4', className)}>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('', className)}>
      {/* Header Actions */}
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <h3 className="text-sm font-medium">Folders</h3>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCreateRootFolder}
            className="h-7 px-2"
          >
            <Plus className="w-4 h-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 px-2">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={expandAllFolders}>
                Expand All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={collapseAllFolders}>
                Collapse All
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* All Documents Option */}
      <div className="p-2">
        <div
          onClick={() => {
            selectFolder(null);
            onFolderSelect?.(null);
          }}
          className={cn(
            'flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 rounded-md cursor-pointer',
            selectedFolderId === null && 'bg-gray-100'
          )}
        >
          <Folder className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium">All Documents</span>
        </div>
      </div>

      {/* Folder Tree */}
      <div className="px-2 pb-2">
        {folders.length === 0 ? (
          <div className="text-center py-8">
            <Folder className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No folders yet</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCreateRootFolder}
              className="mt-2"
            >
              <Plus className="w-4 h-4 mr-1" />
              Create Folder
            </Button>
          </div>
        ) : (
          folders.map((folder) => renderFolder(folder))
        )}
      </div>

      {/* Dialogs */}
      <CreateFolderDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        parentFolderId={parentFolderId}
      />
      
      {editingFolder && (
        <EditFolderDialog
          open={!!editingFolder}
          onOpenChange={(open) => !open && setEditingFolder(null)}
          folder={editingFolder}
        />
      )}
      
      {deletingFolder && (
        <DeleteFolderDialog
          open={!!deletingFolder}
          onOpenChange={(open) => !open && setDeletingFolder(null)}
          folder={deletingFolder}
        />
      )}
    </div>
  );
}