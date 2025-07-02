# 🧪 Phase 1 Vitest Testing Guide

## 📋 Overview

This guide covers running Vitest tests for the completed Phase 1 features: **Folders** and **Tags** systems.

## 🚀 Quick Start

### 1. Install Dependencies
First, ensure all dependencies including test utilities are installed:

```bash
npm install
```

### 2. Run All Phase 1 Tests
```bash
npm run test:phase1
```

### 3. Run Tests in Watch Mode
```bash
npm run test:watch
```

### 4. Run Tests with Coverage
```bash
npm run test:coverage
```

## 🎯 Available Test Commands

### Run Specific Test Suites

```bash
# Test only folder components
npm run test:folders

# Test only tag components  
npm run test:tags

# Run integration tests
npm run test src/__tests__/phase1-integration.test.tsx

# Run with UI (interactive test runner)
npm run test:ui
```

### Watch Specific Files

```bash
# Watch folder tests
npm run test:watch src/components/folders

# Watch tag tests
npm run test:watch src/components/tags

# Watch store tests
npm run test:watch src/store/__tests__
```

## 📁 Test Structure

```
src/
├── components/
│   ├── folders/__tests__/
│   │   ├── folder-tree.test.tsx      # Folder tree navigation tests
│   │   └── (other folder tests)
│   └── tags/__tests__/
│       ├── tag.test.tsx              # Individual tag component
│       ├── tag-input.test.tsx        # Auto-complete input tests
│       └── document-tags.test.tsx    # Document tags display
├── store/__tests__/
│   ├── folder-store.test.ts          # Folder state management
│   └── tag-store.test.ts             # Tag state management
└── __tests__/
    └── phase1-integration.test.tsx   # Integration tests
```

## 🧪 What's Being Tested

### Folder System Tests
- ✅ Folder tree rendering and navigation
- ✅ Expand/collapse functionality
- ✅ CRUD operations (create, rename, delete)
- ✅ Context menu interactions
- ✅ Folder selection and highlighting
- ✅ Nested folder indentation
- ✅ Document count display
- ✅ Loading and error states

### Tag System Tests
- ✅ Tag component rendering with categories
- ✅ AI tag indicators and confidence scores
- ✅ Tag input with auto-complete
- ✅ Keyboard navigation in suggestions
- ✅ Adding/removing user tags
- ✅ Tag filtering functionality
- ✅ Popular tags display
- ✅ Tag search functionality

### Integration Tests
- ✅ Folders and tags in document list
- ✅ Document detail panel integration
- ✅ AI processing indicators
- ✅ Empty states handling
- ✅ Performance with many documents

## 📊 Test Coverage

Run coverage report:
```bash
npm run test:coverage
```

Expected coverage targets:
- Statements: 85%+
- Branches: 80%+
- Functions: 90%+
- Lines: 85%+

View detailed HTML coverage report:
```bash
open coverage/index.html
```

## 🐛 Debugging Tests

### Run Single Test File
```bash
npx vitest run src/components/tags/__tests__/tag-input.test.tsx
```

### Run Tests Matching Pattern
```bash
npx vitest -t "should show suggestions"
```

### Debug in VS Code
1. Install "Vitest" extension
2. Click on test markers in the gutter
3. Use breakpoints for debugging

## ⚡ Performance Tips

1. **Run tests in parallel** (default behavior)
2. **Use focused tests during development**:
   ```typescript
   it.only('test only this', () => {
     // ...
   })
   ```
3. **Skip slow tests temporarily**:
   ```typescript
   it.skip('expensive test', () => {
     // ...
   })
   ```

## 🔍 Common Test Patterns

### Testing Async Operations
```typescript
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument()
})
```

### Testing User Interactions
```typescript
const user = userEvent.setup()
await user.type(input, 'search term')
await user.click(button)
```

### Mocking API Calls
```typescript
vi.mock('@/lib/api/folders')
;(folderAPI.list as any).mockResolvedValue(mockFolders)
```

## 🚨 Troubleshooting

### Tests Failing with Module Errors
- Ensure `@` alias is configured in `vitest.config.ts`
- Check that all imports use consistent paths

### DOM Testing Issues
- Use `screen.debug()` to see current DOM
- Check that elements are rendered before asserting
- Use appropriate queries (getBy vs queryBy vs findBy)

### Async Test Timeouts
- Increase timeout for slow tests:
  ```typescript
  it('slow test', async () => {
    // test code
  }, 10000) // 10 second timeout
  ```

## 📈 Next Steps

After all tests pass:
1. Review coverage report for gaps
2. Add edge case tests if needed
3. Run tests in CI/CD pipeline
4. Begin Phase 2 implementation

---

**Happy Testing! 🎉**