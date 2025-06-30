import { factory, primaryKey } from '@mswjs/data'

// Create a mock database schema
export const db = factory({
  user: {
    id: primaryKey(() => `user-${Math.random().toString(36).substr(2, 9)}`),
    email: String,
    password: String,
    first_name: String,
    last_name: String,
    company: String,
    role: String,
    tenant_id: String,
    created_at: () => new Date().toISOString(),
    updated_at: () => new Date().toISOString(),
  },
  document: {
    id: primaryKey(() => `doc-${Math.random().toString(36).substr(2, 9)}`),
    title: String,
    filename: String,
    file_path: String,
    content_type: String,
    file_size: Number,
    extracted_text: String,
    summary: String,
    document_type: String,
    confidence_score: Number,
    tenant_id: String,
    user_id: String,
    folder_id: String,
    ai_processed: Boolean,
    embedding_status: String,
    tags: Array,
    categories: Array,
    created_at: () => new Date().toISOString(),
    updated_at: () => new Date().toISOString(),
  },
})

// Seed initial data for tests
export function seedDatabase() {
  // Clear existing data
  db.user.deleteMany({ where: {} })
  db.document.deleteMany({ where: {} })
  
  // Create test users
  db.user.create({
    id: 'user-1',
    email: 'test@example.com',
    password: 'password123',
    first_name: 'Test',
    last_name: 'User',
    role: 'user',
    tenant_id: 'test-tenant',
    company: 'Test Company',
  })
  
  db.user.create({
    id: 'admin-1',
    email: 'admin@example.com',
    password: 'admin123',
    first_name: 'Admin',
    last_name: 'User',
    role: 'admin',
    tenant_id: 'test-tenant',
    company: 'Test Company',
  })
  
  // Create test documents
  db.document.create({
    id: 'doc-1',
    title: 'Test Document 1',
    filename: 'test1.pdf',
    file_path: '/uploads/test1.pdf',
    content_type: 'application/pdf',
    file_size: 1024000,
    document_type: 'contract',
    ai_processed: true,
    embedding_status: 'completed',
    tenant_id: 'test-tenant',
    user_id: 'user-1',
    tags: [],
    categories: [],
  })
  
  db.document.create({
    id: 'doc-2',
    title: 'Test Document 2',
    filename: 'test2.docx',
    file_path: '/uploads/test2.docx',
    content_type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    file_size: 2048000,
    document_type: 'report',
    ai_processed: false,
    embedding_status: 'pending',
    tenant_id: 'test-tenant',
    user_id: 'user-1',
    tags: [],
    categories: [],
  })
}