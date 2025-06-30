'use client'

import { useState } from 'react'
import { Calendar, FileText, Tag, Folder } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'
import { DatePickerWithRange } from '@/components/ui/date-range-picker'
import type { DocumentType } from '@/types'

export interface DocumentFilters {
  document_types?: DocumentType[]
  date_range?: {
    from: Date
    to: Date
  }
  tags?: string[]
  folder_id?: string
  ai_processed?: boolean
}

interface DocumentFilterProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: DocumentFilters
  onFiltersChange: (filters: DocumentFilters) => void
  availableTags?: string[]
  availableFolders?: Array<{ id: string; name: string }>
}

const DOCUMENT_TYPES: { value: DocumentType; label: string }[] = [
  { value: 'pdf', label: 'PDF' },
  { value: 'doc', label: 'Word Document' },
  { value: 'docx', label: 'Word Document (DOCX)' },
  { value: 'txt', label: 'Text File' },
  { value: 'image', label: 'Image' },
  { value: 'spreadsheet', label: 'Spreadsheet' },
  { value: 'presentation', label: 'Presentation' },
  { value: 'other', label: 'Other' },
]

export function DocumentFilter({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  availableTags = [],
  availableFolders = [],
}: DocumentFilterProps) {
  const [localFilters, setLocalFilters] = useState<DocumentFilters>(filters)

  const handleTypeToggle = (type: DocumentType) => {
    const currentTypes = localFilters.document_types || []
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type]
    
    setLocalFilters({
      ...localFilters,
      document_types: newTypes.length > 0 ? newTypes : undefined,
    })
  }

  const handleTagToggle = (tag: string) => {
    const currentTags = localFilters.tags || []
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag]
    
    setLocalFilters({
      ...localFilters,
      tags: newTags.length > 0 ? newTags : undefined,
    })
  }

  const handleApply = () => {
    onFiltersChange(localFilters)
    onOpenChange(false)
  }

  const handleClear = () => {
    setLocalFilters({})
    onFiltersChange({})
  }

  const activeFilterCount = Object.values(localFilters).filter(Boolean).length

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Documents</SheetTitle>
          <SheetDescription>
            Narrow down your document list by applying filters
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Document Types */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-4 w-4" />
              <h3 className="font-medium">Document Type</h3>
            </div>
            <div className="space-y-2">
              {DOCUMENT_TYPES.map(type => (
                <div key={type.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={type.value}
                    checked={localFilters.document_types?.includes(type.value) || false}
                    onCheckedChange={() => handleTypeToggle(type.value)}
                  />
                  <Label 
                    htmlFor={type.value} 
                    className="text-sm font-normal cursor-pointer"
                  >
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Date Range */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4" />
              <h3 className="font-medium">Date Range</h3>
            </div>
            <DatePickerWithRange
              value={localFilters.date_range}
              onChange={(range) => setLocalFilters({
                ...localFilters,
                date_range: range,
              })}
            />
          </div>

          <Separator />

          {/* AI Processing Status */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-4 w-4" />
              <h3 className="font-medium">AI Processing</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="ai-processed"
                  checked={localFilters.ai_processed === true}
                  onCheckedChange={(checked) => setLocalFilters({
                    ...localFilters,
                    ai_processed: checked === true ? true : undefined,
                  })}
                />
                <Label htmlFor="ai-processed" className="text-sm font-normal cursor-pointer">
                  Only AI-processed documents
                </Label>
              </div>
            </div>
          </div>

          {/* Tags */}
          {availableTags.length > 0 && (
            <>
              <Separator />
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-4 w-4" />
                  <h3 className="font-medium">Tags</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <Button
                      key={tag}
                      variant={localFilters.tags?.includes(tag) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Folders */}
          {availableFolders.length > 0 && (
            <>
              <Separator />
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Folder className="h-4 w-4" />
                  <h3 className="font-medium">Folder</h3>
                </div>
                <select
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  value={localFilters.folder_id || ''}
                  onChange={(e) => setLocalFilters({
                    ...localFilters,
                    folder_id: e.target.value || undefined,
                  })}
                >
                  <option value="">All folders</option>
                  {availableFolders.map(folder => (
                    <option key={folder.id} value={folder.id}>
                      {folder.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>

        <SheetFooter>
          <div className="flex items-center justify-between w-full">
            <Button variant="ghost" onClick={handleClear}>
              Clear all
              {activeFilterCount > 0 && (
                <span className="ml-2 bg-gray-200 text-xs px-2 py-0.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={handleApply}>Apply Filters</Button>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}