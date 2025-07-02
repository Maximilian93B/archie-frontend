# 🧪 Phase 1 Testing Guide

## 📋 Overview

This guide helps you test the completed Phase 1 features: **Folders** and **Tags** systems.

## 🚀 Quick Start

### 1. Install Missing Dependencies
```bash
npm install @radix-ui/react-alert-dialog @radix-ui/react-scroll-area @radix-ui/react-tooltip @radix-ui/react-tabs @radix-ui/react-sheet @radix-ui/react-switch
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Set Environment Variables
Create `.env.local` if not exists:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 📁 Testing Folder System

### 1. **Folder Tree Navigation**
- Navigate to `/dashboard/documents/inbox-with-folders`
- You should see a folder tree in the left sidebar
- Test expanding/collapsing folders with chevron icons

### 2. **Create Folders**
- Click the "+" button in folder tree header
- Test creating:
  - Root folder
  - Subfolder (right-click on existing folder → "New Subfolder")
- Verify folder colors and icons

### 3. **Edit Folders**
- Right-click on a folder → "Rename"
- Test changing:
  - Folder name
  - Folder color
  - Description

### 4. **Delete Folders**
- Right-click on a folder → "Delete"
- Test deleting:
  - Empty folder (should delete immediately)
  - Folder with documents (should show warning)
  - Folder with subfolders (should show warning)

### 5. **Folder Selection in Upload**
- Navigate to `/dashboard/upload`
- Look for "Destination Folder" dropdown
- Test selecting different folders for upload

### 6. **Document Filtering by Folder**
- Select a folder in the tree
- Verify document list updates to show only documents in that folder
- Click "All Documents" to see all documents again

## 🏷️ Testing Tags System

### 1. **View AI-Generated Tags**
- Open any document detail panel
- Look for "Tags" section
- AI tags should show:
  - Purple robot icon
  - Confidence percentage
  - Category color coding

### 2. **Add User Tags**
- In document detail panel, click "Add Tags"
- Test:
  - Typing to see auto-complete suggestions
  - Creating new tags
  - Adding multiple tags at once
  - Maximum tag limit (5 per operation)

### 3. **Remove User Tags**
- Click the "X" on any user tag
- Verify tag is removed
- Note: AI tags cannot be removed

### 4. **Tag Filtering**
- Open document filter (Filter button in document list)
- Navigate to Tags section
- Test:
  - Selecting multiple tags
  - "Popular Tags" section
  - Scrollable "All Tags" list
  - Clear all tags

### 5. **Tag Input Auto-complete**
- When adding tags, type slowly
- After 2 characters, suggestions should appear
- Test:
  - Arrow keys to navigate suggestions
  - Enter to select
  - Escape to close suggestions

## 🔍 Integration Testing

### 1. **Document Upload with Folder**
1. Navigate to upload page
2. Select a destination folder
3. Enable/disable AI processing
4. Upload a document
5. Verify document appears in selected folder

### 2. **Document List with Tags**
1. View document list
2. Verify tags show in document items (max 2 + count)
3. Hover over documents to see all tags

### 3. **Search with Filters**
1. Apply folder filter
2. Apply tag filters
3. Combine with text search
4. Verify results match all criteria

## 🐛 Common Issues & Solutions

### Issue: Components not rendering
**Solution**: Check if all Radix UI dependencies are installed

### Issue: Folder tree not loading
**Solution**: 
1. Check if backend is running
2. Verify folder API endpoints are accessible
3. Check browser console for errors

### Issue: Tags not showing
**Solution**:
1. Ensure documents have been AI-processed
2. Check tag API endpoints
3. Verify document has `ai_processed: true`

### Issue: Auto-complete not working
**Solution**:
1. Type at least 2 characters
2. Check if tag store is loading tags
3. Verify debounce delay (300ms)

## ✅ Testing Checklist

### Folder Features
- [ ] Create root folder
- [ ] Create subfolder
- [ ] Edit folder name and color
- [ ] Delete empty folder
- [ ] Delete folder with contents (with warning)
- [ ] Expand/collapse folders
- [ ] Select folder to filter documents
- [ ] Folder shows in document upload
- [ ] Documents show folder name

### Tag Features
- [ ] View AI-generated tags with confidence
- [ ] Add user tags to document
- [ ] Remove user tags
- [ ] Tag auto-complete works
- [ ] Tag filtering in document list
- [ ] Tags show in document list items
- [ ] Tag categories have different colors
- [ ] Popular tags show usage count

### Integration
- [ ] Upload document to specific folder
- [ ] Filter documents by folder AND tags
- [ ] Document detail shows both folder and tags
- [ ] Search works with folder/tag filters

## 📊 Performance Checks

1. **Folder Tree Performance**
   - Test with 50+ folders
   - Nested folders (5+ levels deep)
   - Expand/collapse should be instant

2. **Tag Loading**
   - Tags should load within 1 second
   - Auto-complete should feel responsive
   - No lag when adding/removing tags

3. **Filter Performance**
   - Applying filters should update list immediately
   - Multiple filter combinations should work smoothly

## 🎯 Success Criteria

Phase 1 is complete when:
- ✅ Users can organize documents in hierarchical folders
- ✅ AI-generated tags appear automatically after processing
- ✅ Users can add their own tags
- ✅ Documents can be filtered by folders and tags
- ✅ All CRUD operations work for folders
- ✅ Tag auto-complete provides helpful suggestions
- ✅ UI is responsive and intuitive

## 🚀 Next: Phase 2

Once testing is complete, Phase 2 will add:
- AI-powered chat system
- Document insights and summaries
- Multi-document analysis
- Enhanced search capabilities

---

**Happy Testing! 🎉**