'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tag } from './tag';
import { TagInput } from './tag-input';
import { useTagStore } from '@/store/tag-store';
import { sortTags } from '@/lib/api/tags';
import { cn } from '@/lib/utils';

interface DocumentTagsProps {
  documentId: string;
  className?: string;
  showAddButton?: boolean;
  maxDisplayTags?: number;
}

export function DocumentTags({
  documentId,
  className,
  showAddButton = true,
  maxDisplayTags = 10,
}: DocumentTagsProps) {
  const [isAddingTags, setIsAddingTags] = useState(false);
  const [newTags, setNewTags] = useState<string[]>([]);
  const [showAllTags, setShowAllTags] = useState(false);
  
  const {
    documentTags,
    loadDocumentTags,
    addDocumentTags,
    removeDocumentTag,
    isLoading,
    error
  } = useTagStore();

  const tagData = documentTags[documentId];

  useEffect(() => {
    if (!tagData) {
      loadDocumentTags(documentId);
    }
  }, [documentId, tagData, loadDocumentTags]);

  const handleAddTags = async () => {
    if (newTags.length === 0) return;
    
    try {
      await addDocumentTags(documentId, newTags);
      setNewTags([]);
      setIsAddingTags(false);
    } catch (error) {
      // Error is handled in the store
    }
  };

  const handleRemoveTag = async (tagName: string) => {
    await removeDocumentTag(documentId, tagName);
  };

  if (isLoading && !tagData) {
    return (
      <div className={cn('flex items-center justify-center py-4', className)}>
        <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error && !tagData) {
    return (
      <div className={cn('flex items-center gap-2 text-red-600 text-sm', className)}>
        <AlertCircle className="w-4 h-4" />
        <span>Failed to load tags</span>
      </div>
    );
  }

  if (!tagData) return null;

  const { aiTags, userTags, topTags } = sortTags(tagData);
  const displayTags = showAllTags ? [...aiTags, ...userTags] : topTags.slice(0, maxDisplayTags);
  const hasMoreTags = aiTags.length + userTags.length > maxDisplayTags;

  return (
    <div className={cn('space-y-4', className)}>
      {/* AI-Generated Tags Section */}
      {aiTags.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">AI-Generated Tags</h4>
          <div className="flex flex-wrap gap-2">
            {(showAllTags ? aiTags : aiTags.slice(0, 5)).map((tag) => (
              <Tag
                key={tag.name}
                name={tag.name}
                type="ai"
                category={tag.category}
                confidence={tag.confidence}
                relevance={tag.relevance}
                size="sm"
              />
            ))}
          </div>
        </div>
      )}

      {aiTags.length > 0 && userTags.length > 0 && <Separator />}

      {/* User Tags Section */}
      {userTags.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Your Tags</h4>
          <div className="flex flex-wrap gap-2">
            {(showAllTags ? userTags : userTags.slice(0, 5)).map((tag) => (
              <Tag
                key={tag}
                name={tag}
                type="user"
                size="sm"
                onRemove={() => handleRemoveTag(tag)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Add Tags Section */}
      {isAddingTags ? (
        <div className="space-y-2">
          <TagInput
            value={newTags}
            onChange={setNewTags}
            placeholder="Type to add tags..."
            maxTags={5}
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleAddTags} disabled={newTags.length === 0}>
              Add Tags
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setIsAddingTags(false);
                setNewTags([]);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {showAddButton && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsAddingTags(true)}
            >
              <Plus className="w-3 h-3 mr-1" />
              Add Tags
            </Button>
          )}
          
          {hasMoreTags && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowAllTags(!showAllTags)}
            >
              {showAllTags ? 'Show Less' : `+${aiTags.length + userTags.length - maxDisplayTags} more`}
            </Button>
          )}
        </div>
      )}

      {/* Categories Display */}
      {tagData.categories && tagData.categories.length > 0 && (
        <div className="text-xs text-gray-500">
          Categories: {tagData.categories.join(', ')}
        </div>
      )}
    </div>
  );
}