# 📋 Phase 1 Manual Testing Checklist

## 🚀 Getting Started

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Ensure backend is running**:
   - The Archivus backend should be running on `http://localhost:8080`
   - Check health: `curl http://localhost:8080/api/v1/health`

3. **Open the application**:
   - Navigate to `http://localhost:3000`
   - Login with test credentials or create a new account

## 📁 Folder System Testing

### Create Folders
- [ ] Click the "+" button in the folder tree header
- [ ] Create a root folder named "Test Documents"
- [ ] Verify the folder appears in the tree
- [ ] Right-click on "Test Documents" → "New Subfolder"
- [ ] Create a subfolder named "Projects"
- [ ] Verify the subfolder appears nested under "Test Documents"

### Edit Folders
- [ ] Right-click on a folder → "Rename"
- [ ] Change the folder name to "My Documents"
- [ ] Verify the name updates in the tree
- [ ] Edit folder and change the color
- [ ] Verify the color indicator updates

### Navigate Folders
- [ ] Click on a folder to select it
- [ ] Verify the folder is highlighted
- [ ] Click the chevron icon to expand/collapse folders
- [ ] Verify child folders show/hide correctly
- [ ] Check that document count badges display

### Delete Folders
- [ ] Create a test folder
- [ ] Right-click → "Delete"
- [ ] Confirm deletion in the dialog
- [ ] Verify the folder is removed from the tree
- [ ] Try deleting a folder with documents (should show warning)

### Document Upload with Folders
- [ ] Navigate to the upload page
- [ ] Select a destination folder from the dropdown
- [ ] Upload a test document
- [ ] Verify the document appears in the selected folder
- [ ] Check that the folder's document count increases

## 🏷️ Tags System Testing

### View AI-Generated Tags
- [ ] Upload a document with AI processing enabled
- [ ] Open the document detail panel
- [ ] Verify AI tags appear with:
  - [ ] Purple robot icon
  - [ ] Confidence percentage
  - [ ] Category-based colors
  - [ ] No remove button (AI tags can't be removed)

### Add User Tags
- [ ] In document detail panel, click "Add Tags"
- [ ] Type a tag name
- [ ] Verify auto-complete suggestions appear after 2 characters
- [ ] Press Enter to add the tag
- [ ] Verify the tag appears with:
  - [ ] User icon
  - [ ] Remove button (X)
  - [ ] Appropriate color

### Tag Auto-complete
- [ ] Click "Add Tags" on a document
- [ ] Type "inv" slowly
- [ ] Verify suggestions appear (e.g., "invoice", "inventory")
- [ ] Use arrow keys to navigate suggestions
- [ ] Press Enter to select
- [ ] Press Escape to close suggestions

### Remove User Tags
- [ ] Click the X button on a user tag
- [ ] Verify the tag is removed immediately
- [ ] Confirm AI tags don't have remove buttons

### Tag Filtering
- [ ] Open the document filter (Filter button)
- [ ] Navigate to the Tags section
- [ ] Select one or more tags
- [ ] Apply the filter
- [ ] Verify only documents with selected tags appear
- [ ] Clear the filter and verify all documents show

### Multiple Tags
- [ ] Add multiple tags at once: "urgent, review, q4-2024"
- [ ] Verify all tags are added
- [ ] Try adding more than 5 tags at once
- [ ] Verify only the first 5 are added

## 🔧 Integration Testing

### Folder + Tag Combination
- [ ] Create a folder structure:
  - Finance/
    - Invoices/
    - Reports/
  - Projects/
    - ClientA/
    - ClientB/

- [ ] Upload documents to different folders
- [ ] Verify each document shows its folder path
- [ ] Add tags to documents in different folders
- [ ] Filter by both folder AND tags
- [ ] Verify filtering works correctly

### Document List View
- [ ] Verify documents show:
  - [ ] Folder name with folder icon
  - [ ] First 2 tags + count if more
  - [ ] AI Processed badge if applicable
- [ ] Check that hovering shows action buttons

### Document Detail Panel
- [ ] Open a document detail
- [ ] Verify the Organization section shows:
  - [ ] Current folder name
  - [ ] All tags (AI and user)
- [ ] Test "Move to Folder" from dropdown menu

## 🎯 Edge Cases

### Empty States
- [ ] View empty folder (shows "No documents in this folder")
- [ ] Document with no tags (shows "No tags yet")
- [ ] Document not in any folder (shows "Not in any folder")

### Limits and Validation
- [ ] Try creating folder with empty name (should fail)
- [ ] Try creating duplicate folder names (should show error)
- [ ] Add 10+ tags to a document (UI should handle gracefully)
- [ ] Create deeply nested folders (5+ levels)

### Performance
- [ ] Create 20+ folders
- [ ] Expand/collapse all folders
- [ ] Filter with multiple tags selected
- [ ] Verify operations remain responsive

## ✅ Success Criteria

Phase 1 is complete when:
- [ ] All folder CRUD operations work
- [ ] Folder navigation is smooth and intuitive
- [ ] Documents can be organized in folders
- [ ] AI tags display with confidence scores
- [ ] User can add/remove their own tags
- [ ] Tag auto-complete provides helpful suggestions
- [ ] Documents can be filtered by folders and tags
- [ ] Integration between folders and tags works seamlessly
- [ ] UI is responsive and handles edge cases gracefully

## 🐛 Issues to Document

If you find any issues, document them with:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Screenshots if applicable
5. Browser console errors

---

**Testing Complete?** 🎉 
Move on to Phase 2: AI-Powered Features!