'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Folder, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useFolderStore } from '@/store/folder-store';
import { FolderTreeNode } from '@/types';
import { cn } from '@/lib/utils';

interface FolderSelectorProps {
  value?: string | null;
  onChange?: (folderId: string | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function FolderSelector({
  value,
  onChange,
  placeholder = 'Select folder',
  className,
  disabled = false,
}: FolderSelectorProps) {
  const { folders, loadFolders } = useFolderStore();
  const [selectedFolder, setSelectedFolder] = useState<FolderTreeNode | null>(null);

  useEffect(() => {
    if (folders.length === 0) {
      loadFolders();
    }
  }, [folders.length, loadFolders]);

  useEffect(() => {
    if (value && folders.length > 0) {
      const findFolder = (nodes: FolderTreeNode[], id: string): FolderTreeNode | null => {
        for (const node of nodes) {
          if (node.id === id) return node;
          if (node.children.length > 0) {
            const found = findFolder(node.children, id);
            if (found) return found;
          }
        }
        return null;
      };
      setSelectedFolder(findFolder(folders, value));
    } else {
      setSelectedFolder(null);
    }
  }, [value, folders]);

  const handleSelect = (folder: FolderTreeNode | null) => {
    setSelectedFolder(folder);
    onChange?.(folder?.id || null);
  };

  const renderFolderItem = (folder: FolderTreeNode, level: number = 0) => {
    const isSelected = selectedFolder?.id === folder.id;
    
    return (
      <React.Fragment key={folder.id}>
        <DropdownMenuItem
          onClick={() => handleSelect(folder)}
          className={cn(
            'cursor-pointer',
            isSelected && 'bg-gray-100'
          )}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
        >
          <Folder
            className="w-4 h-4 mr-2 flex-shrink-0"
            style={{ color: folder.color || '#6B7280' }}
          />
          <span className="truncate">{folder.name}</span>
          {folder.document_count !== undefined && folder.document_count > 0 && (
            <span className="ml-auto text-xs text-gray-500">
              {folder.document_count}
            </span>
          )}
        </DropdownMenuItem>
        {folder.children.map((child) => renderFolderItem(child, level + 1))}
      </React.Fragment>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-between',
            !selectedFolder && 'text-gray-500',
            className
          )}
          disabled={disabled}
        >
          <span className="flex items-center gap-2 truncate">
            {selectedFolder ? (
              <>
                <Folder
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: selectedFolder.color || '#6B7280' }}
                />
                <span className="truncate">{selectedFolder.name}</span>
              </>
            ) : (
              <>
                <Folder className="w-4 h-4 flex-shrink-0" />
                <span>{placeholder}</span>
              </>
            )}
          </span>
          <ChevronDown className="w-4 h-4 ml-2 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64 max-h-96 overflow-y-auto">
        <DropdownMenuItem
          onClick={() => handleSelect(null)}
          className={cn(
            'cursor-pointer',
            !selectedFolder && 'bg-gray-100'
          )}
        >
          <FolderOpen className="w-4 h-4 mr-2" />
          <span>Root / No Folder</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {folders.length === 0 ? (
          <DropdownMenuItem disabled>
            <span className="text-gray-500">No folders available</span>
          </DropdownMenuItem>
        ) : (
          folders.map((folder) => renderFolderItem(folder))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}