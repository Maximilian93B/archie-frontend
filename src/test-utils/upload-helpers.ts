import type { Document, UploadOptions } from '@/types'

/**
 * Create a mock File object for testing
 */
export function createMockFile(
  name: string,
  content: string | ArrayBuffer = 'test content',
  options?: { type?: string; size?: number }
): File {
  const type = options?.type || getMimeTypeFromFilename(name)
  
  // If size is specified, create content of that size
  if (options?.size) {
    content = 'x'.repeat(options.size)
  }
  
  return new File([content], name, { type })
}

/**
 * Get MIME type from filename extension
 */
export function getMimeTypeFromFilename(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase()
  
  const mimeTypes: Record<string, string> = {
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    odt: 'application/vnd.oasis.opendocument.text',
    rtf: 'application/rtf',
    txt: 'text/plain',
    md: 'text/markdown',
    csv: 'text/csv',
    json: 'application/json',
    xml: 'application/xml',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ods: 'application/vnd.oasis.opendocument.spreadsheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    odp: 'application/vnd.oasis.opendocument.presentation',
    png: 'image/png',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    webp: 'image/webp',
    bmp: 'image/bmp',
    svg: 'image/svg+xml',
    tiff: 'image/tiff',
    tif: 'image/tiff',
  }
  
  return mimeTypes[ext || ''] || 'application/octet-stream'
}

/**
 * Create a mock Document object for testing
 */
export function createMockDocument(overrides?: Partial<Document>): Document {
  return {
    id: `doc-${Math.random().toString(36).substr(2, 9)}`,
    title: 'Test Document',
    filename: 'test-document.pdf',
    file_path: '/uploads/test-document.pdf',
    content_type: 'application/pdf',
    file_size: 1024 * 10, // 10KB
    document_type: 'document',
    tenant_id: 'tenant-test',
    user_id: 'user-test',
    ai_processed: false,
    embedding_status: 'pending',
    status: 'uploaded',
    
    // Backend-specific fields
    file_name: 'test-document.pdf',
    original_name: 'test-document.pdf',
    storage_path: '/uploads/test-document.pdf',
    content_hash: `hash-${Math.random().toString(36).substr(2, 9)}`,
    text_extraction_status: 'completed',
    text_word_count: 150,
    text_char_count: 950,
    text_extraction_time_ms: 250,
    version: 1,
    language: 'en',
    compliance_status: 'compliant',
    legal_hold: false,
    permissions: {
      read: true,
      update: true,
      delete: true,
      share: true,
    },
    
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    ...overrides,
  }
}

/**
 * Create a mock Document with AI processing complete
 */
export function createMockAIProcessedDocument(
  overrides?: Partial<Document>
): Document {
  return createMockDocument({
    status: 'ai_processed',
    ai_processed: true,
    ai_processing_status: 'completed',
    embedding_status: 'completed',
    ai_summary: 'This is an AI-generated summary of the document content.',
    ai_entities: ['Entity 1', 'Entity 2', 'Entity 3'],
    ai_key_points: [
      'Key point 1 from the document',
      'Key point 2 from the document',
      'Key point 3 from the document',
    ],
    ai_category: 'business',
    ai_confidence_score: 0.92,
    extracted_text: 'This is the extracted text content from the document...',
    ...overrides,
  })
}

/**
 * Create default upload options for testing
 */
export function createMockUploadOptions(
  overrides?: Partial<UploadOptions>
): UploadOptions {
  return {
    enable_ai: true,
    enable_ocr: false,
    ...overrides,
  }
}

/**
 * Simulate upload progress events
 */
export function simulateUploadProgress(
  onProgress: (progress: number) => void,
  totalSize: number = 1024 * 1024 // 1MB default
): void {
  const steps = [0, 25, 50, 75, 100]
  
  steps.forEach((percentage, index) => {
    setTimeout(() => {
      onProgress(percentage)
    }, index * 100)
  })
}

/**
 * Create a batch of mock files for testing multiple uploads
 */
export function createMockFileBatch(count: number = 3): File[] {
  const fileTypes = ['pdf', 'docx', 'png', 'xlsx', 'txt']
  
  return Array.from({ length: count }, (_, index) => {
    const type = fileTypes[index % fileTypes.length]
    const name = `document-${index + 1}.${type}`
    return createMockFile(name)
  })
}

/**
 * Mock FormData for testing
 * Node.js doesn't have FormData, so we need to mock it
 */
export class MockFormData {
  private data: Map<string, any> = new Map()

  append(key: string, value: any): void {
    this.data.set(key, value)
  }

  get(key: string): any {
    return this.data.get(key)
  }

  has(key: string): boolean {
    return this.data.has(key)
  }

  getAll(): Record<string, any> {
    const result: Record<string, any> = {}
    this.data.forEach((value, key) => {
      result[key] = value
    })
    return result
  }
}

/**
 * Wait for async operations with timeout
 */
export function waitForWithTimeout(
  condition: () => boolean | Promise<boolean>,
  timeout: number = 5000,
  interval: number = 100
): Promise<void> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()
    
    const check = async () => {
      try {
        const result = await condition()
        if (result) {
          resolve()
          return
        }
        
        if (Date.now() - startTime > timeout) {
          reject(new Error(`Timeout waiting for condition after ${timeout}ms`))
          return
        }
        
        setTimeout(check, interval)
      } catch (error) {
        reject(error)
      }
    }
    
    check()
  })
}