'use client';

import React from 'react';
import { X, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getCategoryColor, formatConfidence } from '@/lib/api/tags';

interface TagProps {
  name: string;
  type: 'ai' | 'user';
  category?: string;
  confidence?: number;
  relevance?: number;
  onRemove?: () => void;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  showConfidence?: boolean;
  className?: string;
}

export function Tag({
  name,
  type,
  category,
  confidence,
  relevance,
  onRemove,
  onClick,
  size = 'md',
  showConfidence = true,
  className,
}: TagProps) {
  const score = confidence && relevance ? confidence * relevance : 0;
  const categoryColor = category ? getCategoryColor(category) : undefined;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  const iconSize = {
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4',
  };

  const content = (
    <Badge
      variant={type === 'ai' ? 'secondary' : 'outline'}
      className={cn(
        'inline-flex items-center gap-1 font-medium transition-colors',
        sizeClasses[size],
        onClick && 'cursor-pointer hover:bg-gray-100',
        type === 'ai' && categoryColor && 'border-l-4',
        className
      )}
      style={{
        borderLeftColor: type === 'ai' ? categoryColor : undefined,
      }}
      onClick={onClick}
    >
      {/* Icon */}
      {type === 'ai' ? (
        <Bot className={cn(iconSize[size], 'text-purple-600')} />
      ) : (
        <User className={cn(iconSize[size], 'text-gray-600')} />
      )}

      {/* Tag name */}
      <span>{name}</span>

      {/* Confidence indicator for AI tags */}
      {type === 'ai' && confidence && showConfidence && (
        <span
          className={cn(
            'ml-1 text-xs',
            confidence >= 0.8 ? 'text-green-600' : confidence >= 0.6 ? 'text-amber-600' : 'text-gray-500'
          )}
        >
          {formatConfidence(confidence)}
        </span>
      )}

      {/* Remove button */}
      {type === 'user' && onRemove && (
        <Button
          variant="ghost"
          size="sm"
          className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <X className="w-3 h-3" />
        </Button>
      )}
    </Badge>
  );

  // Add tooltip for AI tags with metadata
  if (type === 'ai' && (confidence || relevance || category)) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1 text-xs">
              {category && (
                <p>
                  <span className="font-medium">Category:</span> {category}
                </p>
              )}
              {confidence && (
                <p>
                  <span className="font-medium">Confidence:</span> {formatConfidence(confidence)}
                </p>
              )}
              {relevance && (
                <p>
                  <span className="font-medium">Relevance:</span> {formatConfidence(relevance)}
                </p>
              )}
              {score > 0 && (
                <p>
                  <span className="font-medium">Score:</span> {(score * 100).toFixed(0)}%
                </p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
}