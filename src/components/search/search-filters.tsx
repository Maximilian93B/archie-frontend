'use client'

import { useState } from 'react'
import { X, Calendar, FileType, Tag, Brain, HardDrive } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet'
import { Checkbox } from '@/components/ui/checkbox'
import { DatePicker } from '@/components/ui/date-picker'
import { formatBytes } from '@/lib/utils'
import type { SearchFilters as SearchFilterType } from '@/lib/api/search'

interface SearchFiltersProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: SearchFilterType
  onFiltersChange: (filters: SearchFilterType) => void
}

const DOCUMENT_TYPES = [
  { value: 'contract', label: 'Contract' },
  { value: 'invoice', label: 'Invoice' },
  { value: 'report', label: 'Report' },
  { value: 'email', label: 'Email' },
  { value: 'presentation', label: 'Presentation' },
  { value: 'spreadsheet', label: 'Spreadsheet' },
  { value: 'other', label: 'Other' },
]

export function SearchFilters({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
}: SearchFiltersProps) {
  const [localFilters, setLocalFilters] = useState<SearchFilterType>(filters)

  const handleApply = () => {
    onFiltersChange(localFilters)
    onOpenChange(false)
  }

  const handleClear = () => {
    setLocalFilters({})
    onFiltersChange({})
  }

  const updateFilter = <K extends keyof SearchFilterType>(
    key: K,
    value: SearchFilterType[K]
  ) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const toggleDocumentType = (type: string) => {
    const currentTypes = localFilters.documentTypes || []
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type]
    
    updateFilter('documentTypes', newTypes.length > 0 ? newTypes : undefined)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Search Filters</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Document Types */}
          <div>
            <Label className="text-sm font-medium mb-3 flex items-center">
              <FileType className="h-4 w-4 mr-2" />
              Document Types
            </Label>
            <div className="space-y-2">
              {DOCUMENT_TYPES.map(type => (
                <div key={type.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={type.value}
                    checked={localFilters.documentTypes?.includes(type.value) || false}
                    onCheckedChange={() => toggleDocumentType(type.value)}
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

          {/* AI Processing */}
          <div>
            <Label className="text-sm font-medium mb-3 flex items-center">
              <Brain className="h-4 w-4 mr-2" />
              AI Features
            </Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="ai-processed" className="text-sm font-normal">
                  Only AI processed documents
                </Label>
                <Switch
                  id="ai-processed"
                  checked={localFilters.aiProcessed || false}
                  onCheckedChange={(checked) => updateFilter('aiProcessed', checked || undefined)}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="has-embeddings" className="text-sm font-normal">
                  Has embeddings (semantic search)
                </Label>
                <Switch
                  id="has-embeddings"
                  checked={localFilters.hasEmbeddings || false}
                  onCheckedChange={(checked) => updateFilter('hasEmbeddings', checked || undefined)}
                />
              </div>
              {localFilters.aiProcessed && (
                <div>
                  <Label className="text-sm font-normal">
                    Minimum AI confidence: {((localFilters.minConfidence || 0) * 100).toFixed(0)}%
                  </Label>
                  <Slider
                    value={[localFilters.minConfidence || 0]}
                    onValueChange={([value]) => updateFilter('minConfidence', value || undefined)}
                    min={0}
                    max={1}
                    step={0.1}
                    className="mt-2"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <Label className="text-sm font-medium mb-3 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Label>
            <div className="space-y-3">
              <div>
                <Label className="text-sm text-gray-600">Created after</Label>
                <DatePicker
                  date={localFilters.createdAfter ? new Date(localFilters.createdAfter) : undefined}
                  onDateChange={(date) => updateFilter('createdAfter', date?.toISOString())}
                />
              </div>
              <div>
                <Label className="text-sm text-gray-600">Created before</Label>
                <DatePicker
                  date={localFilters.createdBefore ? new Date(localFilters.createdBefore) : undefined}
                  onDateChange={(date) => updateFilter('createdBefore', date?.toISOString())}
                />
              </div>
            </div>
          </div>

          {/* File Size */}
          <div>
            <Label className="text-sm font-medium mb-3 flex items-center">
              <HardDrive className="h-4 w-4 mr-2" />
              File Size
            </Label>
            <div className="space-y-3">
              <div>
                <Label className="text-sm text-gray-600">
                  Maximum size: {formatBytes(localFilters.maxSize || 100 * 1024 * 1024)}
                </Label>
                <Slider
                  value={[localFilters.maxSize || 100 * 1024 * 1024]}
                  onValueChange={([value]) => updateFilter('maxSize', value)}
                  min={0}
                  max={500 * 1024 * 1024} // 500MB
                  step={1024 * 1024} // 1MB steps
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </div>

        <SheetFooter>
          <Button variant="outline" onClick={handleClear}>
            Clear All
          </Button>
          <Button onClick={handleApply}>
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}