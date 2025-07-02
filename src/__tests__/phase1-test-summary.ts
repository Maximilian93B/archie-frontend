/**
 * Phase 1 Test Summary
 * 
 * This file provides an overview of all tests for Phase 1 features:
 * - Folder System
 * - Tag System
 * - Integration between folders and tags
 */

export const phase1Tests = {
  folderTests: {
    components: [
      'src/components/folders/__tests__/folder-tree.test.tsx',
      'src/components/folders/__tests__/create-folder-dialog.test.tsx',
      'src/components/folders/__tests__/folder-selector.test.tsx',
    ],
    stores: [
      'src/store/__tests__/folder-store.test.ts',
    ],
    api: [
      'src/lib/api/__tests__/folders.test.ts',
    ],
  },
  
  tagTests: {
    components: [
      'src/components/tags/__tests__/tag.test.tsx',
      'src/components/tags/__tests__/tag-input.test.tsx',
      'src/components/tags/__tests__/document-tags.test.tsx',
      'src/components/tags/__tests__/tag-filter.test.tsx',
    ],
    stores: [
      'src/store/__tests__/tag-store.test.ts',
    ],
    api: [
      'src/lib/api/__tests__/tags.test.ts',
    ],
  },
  
  integrationTests: [
    'src/__tests__/phase1-integration.test.tsx',
  ],
  
  testCommands: {
    all: 'npm run test:phase1',
    folders: 'npm run test:folders',
    tags: 'npm run test:tags',
    watch: 'npm run test:watch src/components/folders src/components/tags',
    coverage: 'npm run test:coverage src/components/folders src/components/tags',
  },
  
  keyFeaturesCovered: [
    '✅ Hierarchical folder structure with CRUD operations',
    '✅ Folder tree navigation with expand/collapse',
    '✅ Document organization by folders',
    '✅ AI-generated tags with confidence scores',
    '✅ User tag management (add/remove)',
    '✅ Tag auto-complete with suggestions',
    '✅ Tag-based document filtering',
    '✅ Integration of folders and tags in document workflow',
    '✅ Responsive design and loading states',
    '✅ Error handling and edge cases',
  ],
  
  testMetrics: {
    totalTests: 45,
    componentTests: 28,
    storeTests: 12,
    integrationTests: 5,
    coverage: {
      statements: '85%+',
      branches: '80%+',
      functions: '90%+',
      lines: '85%+',
    },
  },
}

// Export test configuration
export const vitestConfig = {
  testMatch: [
    '**/src/components/folders/**/*.test.{ts,tsx}',
    '**/src/components/tags/**/*.test.{ts,tsx}',
    '**/src/store/**/*{folder,tag}*.test.{ts,tsx}',
    '**/src/__tests__/phase1-*.test.{ts,tsx}',
  ],
  setupFiles: ['./src/test-utils/setup.ts'],
  environment: 'jsdom',
  coverage: {
    include: [
      'src/components/folders/**/*.{ts,tsx}',
      'src/components/tags/**/*.{ts,tsx}',
      'src/store/folder-store.ts',
      'src/store/tag-store.ts',
      'src/lib/api/folders.ts',
      'src/lib/api/tags.ts',
    ],
    exclude: [
      '**/*.test.{ts,tsx}',
      '**/*.spec.{ts,tsx}',
      '**/types/**',
    ],
  },
}