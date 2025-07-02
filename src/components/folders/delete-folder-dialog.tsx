'use client';

import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useFolderStore } from '@/store/folder-store';
import { FolderTreeNode } from '@/types';
import { AlertTriangle } from 'lucide-react';

interface DeleteFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  folder: FolderTreeNode;
}

export function DeleteFolderDialog({
  open,
  onOpenChange,
  folder,
}: DeleteFolderDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteFolder } = useFolderStore();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteFolder(folder.id);
      onOpenChange(false);
    } catch (error) {
      // Error is handled in the store
    } finally {
      setIsDeleting(false);
    }
  };

  const hasDocuments = folder.document_count && folder.document_count > 0;
  const hasSubfolders = folder.children && folder.children.length > 0;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex-1">
              <AlertDialogTitle>Delete Folder</AlertDialogTitle>
              <AlertDialogDescription className="mt-2">
                Are you sure you want to delete the folder "{folder.name}"?
                {(hasDocuments || hasSubfolders) && (
                  <div className="mt-3 space-y-1">
                    {hasDocuments && (
                      <p className="text-sm font-medium text-gray-900">
                        • This folder contains {folder.document_count} document
                        {folder.document_count > 1 ? 's' : ''}
                      </p>
                    )}
                    {hasSubfolders && (
                      <p className="text-sm font-medium text-gray-900">
                        • This folder contains {folder.children.length} subfolder
                        {folder.children.length > 1 ? 's' : ''}
                      </p>
                    )}
                    <p className="text-sm text-red-600 font-medium mt-2">
                      All contents will be permanently deleted.
                    </p>
                  </div>
                )}
                {!hasDocuments && !hasSubfolders && (
                  <p className="mt-2">This action cannot be undone.</p>
                )}
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isDeleting ? 'Deleting...' : 'Delete Folder'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}