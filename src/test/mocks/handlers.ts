import { http, HttpResponse } from 'msw'
import { db } from './db'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export const handlers = [
  // Auth endpoints
  http.post(`${API_URL}/api/v1/auth/login`, async ({ request }) => {
    const body = await request.json() as any
    
    // Find user in mock database
    const user = db.user.findFirst({
      where: { email: { equals: body.email } }
    })
    
    if (!user || user.password !== body.password) {
      return HttpResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }
    
    return HttpResponse.json({
      token: `test-token-${user.id}`,
      refresh_token: `test-refresh-${user.id}`,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        tenant_id: user.tenant_id,
        is_active: true,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
      expires_in: 3600,
    })
  }),

  http.post(`${API_URL}/api/v1/auth/register`, async ({ request }) => {
    const body = await request.json() as any
    
    // Check if user already exists
    const existing = db.user.findFirst({
      where: { email: { equals: body.email } }
    })
    
    if (existing) {
      return HttpResponse.json(
        { message: 'Email already exists' },
        { status: 400 }
      )
    }
    
    // Create new user
    const user = db.user.create({
      email: body.email,
      password: body.password,
      first_name: body.first_name,
      last_name: body.last_name,
      role: 'user',
      tenant_id: 'test-tenant',
      company: body.company,
    })
    
    return HttpResponse.json({
      token: `test-token-${user.id}`,
      refresh_token: `test-refresh-${user.id}`,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        tenant_id: user.tenant_id,
        is_active: true,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
      expires_in: 3600,
    })
  }),

  http.get(`${API_URL}/api/v1/auth/validate`, ({ request }) => {
    const authHeader = request.headers.get('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const token = authHeader.split(' ')[1]
    const userId = token.split('-')[2] // Extract from test-token-{id}
    
    const user = db.user.findFirst({
      where: { id: { equals: userId } }
    })
    
    if (!user) {
      return HttpResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }
    
    return HttpResponse.json({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      tenant_id: user.tenant_id,
      is_active: true,
      created_at: user.created_at,
      updated_at: user.updated_at,
    })
  }),

  http.post(`${API_URL}/api/v1/auth/logout`, () => {
    return HttpResponse.json({ message: 'Logged out successfully' })
  }),

  http.post(`${API_URL}/api/v1/auth/refresh`, async ({ request }) => {
    const body = await request.json() as any
    const refreshToken = body.refresh_token
    
    if (!refreshToken || !refreshToken.startsWith('test-refresh-')) {
      return HttpResponse.json(
        { message: 'Invalid refresh token' },
        { status: 401 }
      )
    }
    
    const userId = refreshToken.split('-')[2]
    
    return HttpResponse.json({
      token: `test-token-${userId}`,
      refresh_token: `test-refresh-${userId}`,
    })
  }),

  // Document endpoints
  http.get(`${API_URL}/api/v1/documents`, ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1')
    const pageSize = parseInt(url.searchParams.get('page_size') || '20')
    const search = url.searchParams.get('search') || ''
    
    let documents = db.document.getAll()
    
    // Apply search filter
    if (search) {
      documents = documents.filter(doc => 
        doc.title.toLowerCase().includes(search.toLowerCase()) ||
        doc.filename.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    // Pagination
    const total = documents.length
    const totalPages = Math.ceil(total / pageSize)
    const start = (page - 1) * pageSize
    const paginatedDocs = documents.slice(start, start + pageSize)
    
    return HttpResponse.json({
      data: paginatedDocs,
      total,
      page,
      page_size: pageSize,
      total_pages: totalPages,
    })
  }),

  http.get(`${API_URL}/api/v1/documents/:id`, ({ params }) => {
    const document = db.document.findFirst({
      where: { id: { equals: params.id as string } }
    })
    
    if (!document) {
      return HttpResponse.json(
        { message: 'Document not found' },
        { status: 404 }
      )
    }
    
    return HttpResponse.json(document)
  }),

  http.post(`${API_URL}/api/v1/documents/upload`, async ({ request }) => {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const title = formData.get('title') as string
    const enableAI = formData.get('enable_ai') === 'true'
    
    if (!file) {
      return HttpResponse.json(
        { message: 'No file provided' },
        { status: 400 }
      )
    }
    
    const document = db.document.create({
      title: title || file.name,
      filename: file.name,
      file_path: `/uploads/${file.name}`,
      content_type: file.type,
      file_size: file.size,
      document_type: 'other',
      ai_processed: enableAI,
      embedding_status: enableAI ? 'processing' : 'pending',
      tenant_id: 'test-tenant',
      user_id: 'test-user',
      tags: [],
      categories: [],
    })
    
    return HttpResponse.json(document)
  }),

  http.delete(`${API_URL}/api/v1/documents/:id`, ({ params }) => {
    const document = db.document.findFirst({
      where: { id: { equals: params.id as string } }
    })
    
    if (!document) {
      return HttpResponse.json(
        { message: 'Document not found' },
        { status: 404 }
      )
    }
    
    db.document.delete({
      where: { id: { equals: params.id as string } }
    })
    
    return HttpResponse.json({ message: 'Document deleted successfully' })
  }),

  http.get(`${API_URL}/api/v1/documents/:id/download`, ({ params }) => {
    const document = db.document.findFirst({
      where: { id: { equals: params.id as string } }
    })
    
    if (!document) {
      return HttpResponse.json(
        { message: 'Document not found' },
        { status: 404 }
      )
    }
    
    // Return a mock blob
    return new HttpResponse(
      new Blob(['Mock file content'], { type: document.content_type }),
      {
        headers: {
          'Content-Type': document.content_type,
          'Content-Disposition': `attachment; filename="${document.filename}"`,
        },
      }
    )
  }),

  http.get(`${API_URL}/api/v1/documents/:id/ai-results`, ({ params }) => {
    const document = db.document.findFirst({
      where: { id: { equals: params.id as string } }
    })
    
    if (!document) {
      return HttpResponse.json(
        { message: 'Document not found' },
        { status: 404 }
      )
    }
    
    return HttpResponse.json({
      document_id: document.id,
      summary: 'This is a mock AI-generated summary of the document.',
      document_type: document.document_type,
      confidence_score: 0.95,
      key_points: [
        'Key point 1 from the document',
        'Key point 2 from the document',
        'Key point 3 from the document',
      ],
      entities: ['Entity 1', 'Entity 2', 'Entity 3'],
      sentiment: 'neutral',
      processing_time_ms: 1500,
    })
  }),

  // Default handler for unmatched requests
  http.all('*', ({ request }) => {
    console.warn(`Unhandled ${request.method} request to ${request.url}`)
    return HttpResponse.json(
      { message: 'Not found' },
      { status: 404 }
    )
  }),
]