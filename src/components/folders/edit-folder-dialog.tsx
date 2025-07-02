'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useFolderStore } from '@/store/folder-store';
import { FolderTreeNode } from '@/types';
import { Folder } from 'lucide-react';

const editFolderSchema = z.object({
  name: z.string().min(1, 'Folder name is required').max(50, 'Name too long'),
  description: z.string().max(200, 'Description too long').optional(),
  color: z.string().optional(),
});

type EditFolderFormData = z.infer<typeof editFolderSchema>;

interface EditFolderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  folder: FolderTreeNode;
}

const DEFAULT_COLORS = [
  '#6B7280', // Gray (default)
  '#EF4444', // Red
  '#F59E0B', // Amber
  '#10B981', // Emerald
  '#3B82F6', // Blue
  '#8B5CF6', // Violet
  '#EC4899', // Pink
  '#14B8A6', // Teal
];

export function EditFolderDialog({
  open,
  onOpenChange,
  folder,
}: EditFolderDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateFolder } = useFolderStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<EditFolderFormData>({
    resolver: zodResolver(editFolderSchema),
    defaultValues: {
      name: folder.name,
      description: folder.description || '',
      color: folder.color || DEFAULT_COLORS[0],
    },
  });

  const selectedColor = watch('color');

  useEffect(() => {
    // Reset form when folder changes
    reset({
      name: folder.name,
      description: folder.description || '',
      color: folder.color || DEFAULT_COLORS[0],
    });
  }, [folder, reset]);

  const onSubmit = async (data: EditFolderFormData) => {
    setIsSubmitting(true);
    try {
      await updateFolder(folder.id, {
        name: data.name,
        description: data.description,
        color: data.color,
      });
      onOpenChange(false);
    } catch (error) {
      // Error is handled in the store
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Folder</DialogTitle>
          <DialogDescription>
            Make changes to the folder "{folder.name}"
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {/* Folder Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Folder Name</Label>
              <Input
                id="name"
                placeholder="Enter folder name"
                {...register('name')}
                autoFocus
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="Enter folder description"
                rows={3}
                {...register('description')}
              />
              {errors.description && (
                <p className="text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            {/* Color Picker */}
            <div className="grid gap-2">
              <Label>Folder Color</Label>
              <div className="flex gap-2">
                {DEFAULT_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setValue('color', color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? 'border-gray-900 scale-110'
                        : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="grid gap-2">
              <Label>Preview</Label>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                <Folder
                  className="w-5 h-5"
                  style={{ color: selectedColor }}
                />
                <span className="text-sm">
                  {watch('name') || 'Folder Name'}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}