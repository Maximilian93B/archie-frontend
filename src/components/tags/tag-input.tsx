'use client';

import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { X, Hash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTagStore } from '@/store/tag-store';
import { useDebounce } from '@/hooks/use-debounce';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  allowCreate?: boolean;
  className?: string;
  disabled?: boolean;
}

export function TagInput({
  value = [],
  onChange,
  placeholder = 'Add tags...',
  maxTags = 10,
  allowCreate = true,
  className,
  disabled = false,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { tagSuggestions, searchTags, availableTags, loadTags } = useTagStore();
  const debouncedSearch = useDebounce(inputValue, 300);

  // Load available tags on mount
  useEffect(() => {
    if (availableTags.length === 0) {
      loadTags();
    }
  }, [availableTags.length, loadTags]);

  // Search for suggestions when input changes
  useEffect(() => {
    if (debouncedSearch.length >= 2) {
      searchTags(debouncedSearch);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [debouncedSearch, searchTags]);

  // Hide suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (
      trimmedTag &&
      !value.includes(trimmedTag) &&
      value.length < maxTags
    ) {
      onChange([...value, trimmedTag]);
      setInputValue('');
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      if (selectedSuggestionIndex >= 0 && tagSuggestions[selectedSuggestionIndex]) {
        addTag(tagSuggestions[selectedSuggestionIndex]);
      } else if (inputValue && allowCreate) {
        addTag(inputValue);
      }
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      // Remove last tag when backspace is pressed with empty input
      removeTag(value[value.length - 1]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestionIndex(prev =>
        prev < tagSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestionIndex(prev => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };

  const filteredSuggestions = tagSuggestions.filter(
    suggestion => !value.includes(suggestion.toLowerCase())
  );

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div
        className={cn(
          'min-h-[42px] w-full rounded-md border border-gray-200 bg-white px-3 py-2',
          'focus-within:ring-2 focus-within:ring-gray-950 focus-within:ring-offset-2',
          disabled && 'cursor-not-allowed opacity-50',
          'flex flex-wrap gap-2 items-center'
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Selected tags */}
        {value.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className="text-sm flex items-center gap-1"
          >
            <Hash className="w-3 h-3" />
            {tag}
            {!disabled && (
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
              >
                <X className="w-3 h-3" />
              </Button>
            )}
          </Badge>
        ))}

        {/* Input field */}
        {value.length < maxTags && !disabled && (
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={value.length === 0 ? placeholder : ''}
            className="flex-1 min-w-[120px] bg-transparent outline-none text-sm placeholder:text-gray-500"
            disabled={disabled}
          />
        )}
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          <div className="py-1">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                className={cn(
                  'w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2',
                  selectedSuggestionIndex === index && 'bg-gray-100'
                )}
                onClick={() => addTag(suggestion)}
              >
                <Hash className="w-3 h-3 text-gray-400" />
                {suggestion}
              </button>
            ))}
            {allowCreate && inputValue && !filteredSuggestions.includes(inputValue) && (
              <>
                <div className="border-t border-gray-200 my-1" />
                <button
                  className={cn(
                    'w-full px-3 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2',
                    selectedSuggestionIndex === filteredSuggestions.length && 'bg-gray-100'
                  )}
                  onClick={() => addTag(inputValue)}
                >
                  <Hash className="w-3 h-3 text-gray-400" />
                  Create "{inputValue}"
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Helper text */}
      {value.length >= maxTags && (
        <p className="text-xs text-amber-600 mt-1">
          Maximum {maxTags} tags allowed
        </p>
      )}
    </div>
  );
}