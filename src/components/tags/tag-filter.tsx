'use client';

import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTagStore } from '@/store/tag-store';
import { cn } from '@/lib/utils';

interface TagFilterProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  matchMode?: 'any' | 'all';
  onMatchModeChange?: (mode: 'any' | 'all') => void;
  className?: string;
}

export function TagFilter({
  selectedTags,
  onTagsChange,
  matchMode = 'any',
  onMatchModeChange,
  className,
}: TagFilterProps) {
  const { availableTags, loadTags } = useTagStore();

  useEffect(() => {
    if (availableTags.length === 0) {
      loadTags();
    }
  }, [availableTags.length, loadTags]);

  const toggleTag = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      onTagsChange(selectedTags.filter(t => t !== tagName));
    } else {
      onTagsChange([...selectedTags, tagName]);
    }
  };

  const clearAllTags = () => {
    onTagsChange([]);
  };

  // Group tags by usage count
  const popularTags = availableTags
    .filter(tag => tag.usage_count && tag.usage_count > 0)
    .sort((a, b) => (b.usage_count || 0) - (a.usage_count || 0))
    .slice(0, 20);

  const allTagsSorted = [...availableTags].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <div className={cn('space-y-4', className)}>
      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Selected Tags ({selectedTags.length})</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllTags}
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map(tag => (
              <Badge
                key={tag}
                variant="default"
                className="cursor-pointer"
                onClick={() => toggleTag(tag)}
              >
                {tag}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Match Mode */}
      {selectedTags.length > 1 && onMatchModeChange && (
        <>
          <Separator />
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Match Mode</h4>
            <div className="flex gap-2">
              <Button
                variant={matchMode === 'any' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onMatchModeChange('any')}
              >
                Match Any Tag
              </Button>
              <Button
                variant={matchMode === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onMatchModeChange('all')}
              >
                Match All Tags
              </Button>
            </div>
          </div>
        </>
      )}

      <Separator />

      {/* Popular Tags */}
      {popularTags.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Popular Tags</h4>
          <div className="flex flex-wrap gap-2">
            {popularTags.map(tag => {
              const isSelected = selectedTags.includes(tag.name);
              return (
                <Badge
                  key={tag.id}
                  variant={isSelected ? 'default' : 'outline'}
                  className="cursor-pointer transition-colors"
                  onClick={() => toggleTag(tag.name)}
                >
                  {isSelected && <Check className="w-3 h-3 mr-1" />}
                  {tag.name}
                  <span className="ml-1 text-xs opacity-60">
                    ({tag.usage_count})
                  </span>
                </Badge>
              );
            })}
          </div>
        </div>
      )}

      <Separator />

      {/* All Tags */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">All Tags</h4>
        <ScrollArea className="h-64">
          <div className="flex flex-wrap gap-2 pr-4">
            {allTagsSorted.map(tag => {
              const isSelected = selectedTags.includes(tag.name);
              return (
                <Badge
                  key={tag.id}
                  variant={isSelected ? 'default' : 'outline'}
                  className="cursor-pointer transition-colors"
                  onClick={() => toggleTag(tag.name)}
                >
                  {isSelected && <Check className="w-3 h-3 mr-1" />}
                  {tag.name}
                  {tag.is_ai_generated && (
                    <span className="ml-1 text-xs opacity-60">AI</span>
                  )}
                </Badge>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}