# 📧 Archivus Component Patterns - Inbox-Style Interface

## 📋 Overview

Archivus components follow email inbox patterns to create a familiar, intuitive interface. Users interact with documents like they would with emails - viewing, organizing, and managing files in a clean, list-based interface.

## 🎯 Core Layout Pattern

### **Three-Column Layout (Desktop)**
```
┌─────────────┬───────────────────────┬─────────────────┐
│   Sidebar   │    Document List      │  Detail Panel   │
│   (240px)   │     (flexible)        │    (400px)      │
│             │                       │                 │
│ ▪ Dashboard │ ┌───────────────────┐ │ Document View   │
│ ▪ Inbox     │ │ Document Item 1   │ │ AI Analysis     │
│ ▪ Chat      │ ├───────────────────┤ │ Actions         │
│ ▪ Search    │ │ Document Item 2   │ │                 │
│ ▪ Analytics │ ├───────────────────┤ │                 │
│             │ │ Document Item 3   │ │                 │
└─────────────┴───────────────────────┴─────────────────┘
```

### **Two-Column Layout (Tablet)**
```
┌─────────────┬─────────────────────────┐
│   Sidebar   │    Document List        │
│   (240px)   │     (flexible)          │
└─────────────┴─────────────────────────┘
```

### **Single Column (Mobile)**
```
┌─────────────────────────┐
│    Document List        │
│   (full width)          │
└─────────────────────────┘
```

## 🧩 Component Library

### **1. Navigation Sidebar**

```tsx
// Clean, minimal sidebar like Apple Mail
<Sidebar className="w-60 bg-gray-50 border-r border-gray-200">
  <SidebarHeader>
    <Logo />
  </SidebarHeader>
  
  <SidebarContent>
    <NavItem icon={LayoutDashboard} label="Dashboard" active />
    <NavItem icon={Inbox} label="Inbox" count={4} />
    <NavItem icon={MessageSquare} label="Chat" />
    <NavItem icon={Search} label="Search" />
    <NavItem icon={BarChart} label="Analytics" />
  </SidebarContent>
  
  <SidebarFooter>
    <UserMenu />
  </SidebarFooter>
</Sidebar>
```

**Design Specs:**
- Background: `#f8f9fa` (gray-50)
- Width: 240px fixed
- Border: 1px right border `#e9ecef`
- Item height: 36px
- Padding: 12px horizontal
- Active state: Black text, light gray background
- Icons: 20px, gray-600 default, black when active

### **2. Document List (Inbox Style)**

```tsx
// Email-like list view
<DocumentList>
  <ListHeader>
    <SearchBar placeholder="Search documents..." />
    <ViewToggle /> {/* List/Grid toggle */}
    <SortDropdown />
  </ListHeader>
  
  <ListContent>
    {documents.map(doc => (
      <DocumentItem
        key={doc.id}
        selected={selectedId === doc.id}
        onClick={() => selectDocument(doc.id)}
      >
        <ItemCheckbox />
        <ItemIcon type={doc.type} />
        <ItemContent>
          <ItemTitle>{doc.title}</ItemTitle>
          <ItemMeta>
            {doc.ai_processed && <AIBadge />}
            <ItemDate>{formatDate(doc.created_at)}</ItemDate>
          </ItemMeta>
        </ItemContent>
        <ItemActions>
          <StarButton />
          <MoreButton />
        </ItemActions>
      </DocumentItem>
    ))}
  </ListContent>
</DocumentList>
```

**Design Specs:**
- Item height: 64px
- Padding: 16px
- Hover: `#f8f9fa` background
- Selected: Light blue tint `#e8f0fe`
- Border bottom: 1px `#e9ecef`
- Title: 14px, semibold, gray-900
- Meta text: 12px, regular, gray-600

### **3. Detail Panel**

```tsx
// Document preview/details panel
<DetailPanel>
  <PanelHeader>
    <BackButton /> {/* Mobile only */}
    <PanelTitle>{document.title}</PanelTitle>
    <PanelActions>
      <Button variant="icon" icon={Download} />
      <Button variant="icon" icon={Share} />
      <Button variant="icon" icon={Trash} />
    </PanelActions>
  </PanelHeader>
  
  <PanelContent>
    <DocumentPreview />
    
    <Section title="AI Analysis">
      <AISummary />
      <AITags />
      <ConfidenceScore />
    </Section>
    
    <Section title="Details">
      <DetailRow label="Type" value={document.type} />
      <DetailRow label="Size" value={formatSize(document.size)} />
      <DetailRow label="Uploaded" value={formatDate(document.created_at)} />
    </Section>
  </PanelContent>
</DetailPanel>
```

**Design Specs:**
- Width: 400px (desktop), full (mobile)
- Background: white
- Border left: 1px `#e9ecef`
- Section spacing: 24px
- Section title: 12px, uppercase, gray-600

### **4. Action Cards**

```tsx
// Quick action cards from dashboard
<ActionCard>
  <CardIcon>
    <Plus className="w-5 h-5" />
  </CardIcon>
  <CardContent>
    <CardTitle>Upload Document</CardTitle>
    <CardDescription>Add new files to your library</CardDescription>
  </CardContent>
</ActionCard>
```

**Design Specs:**
- Height: 80px
- Padding: 20px
- Border: 1px `#e9ecef`
- Border radius: 8px
- Hover: Border color `#ced4da`
- Icon: 40px circle, gray-100 background

### **5. Empty States**

```tsx
// Clean, helpful empty states
<EmptyState>
  <EmptyIcon>
    <FolderOpen className="w-12 h-12 text-gray-400" />
  </EmptyIcon>
  <EmptyTitle>No documents yet</EmptyTitle>
  <EmptyDescription>
    Upload your first document to get started
  </EmptyDescription>
  <EmptyAction>
    <Button variant="primary">
      <Plus className="w-4 h-4 mr-2" />
      Upload Document
    </Button>
  </EmptyAction>
</EmptyState>
```

### **6. Status Badges**

```tsx
// Minimal status indicators
<Badge variant="ai" size="sm">
  <BrainIcon className="w-3 h-3 mr-1" />
  AI Processed
</Badge>

<Badge variant="success" size="sm">
  <CheckIcon className="w-3 h-3 mr-1" />
  Completed
</Badge>
```

**Badge Variants:**
- `default`: Gray background
- `ai`: Purple background
- `success`: Green background
- `warning`: Amber background
- `error`: Red background

### **7. Search Interface**

```tsx
// Global search bar
<SearchBar>
  <SearchIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
  <SearchInput
    placeholder="Search..."
    className="pl-10 pr-4 py-2 w-full"
  />
  <SearchShortcut>⌘K</SearchShortcut>
</SearchBar>
```

**Design Specs:**
- Height: 36px
- Background: `#f1f3f5`
- Border radius: 8px
- No border (until focused)
- Focus: White background, black border

### **8. Buttons**

```tsx
// Button hierarchy
<Button variant="primary">New Document</Button>    // Black bg
<Button variant="secondary">Cancel</Button>        // White bg, gray border
<Button variant="ghost">Learn More</Button>        // No bg, no border
<Button variant="danger">Delete</Button>           // Red text

// Icon buttons
<Button variant="icon" size="sm">
  <MoreVertical className="w-4 h-4" />
</Button>
```

**Button Specs:**
- Height: 36px (default), 32px (small)
- Padding: 16px horizontal
- Border radius: 6px
- Font: 14px, medium weight
- Transition: 200ms ease

### **9. Form Controls**

```tsx
// Clean form inputs
<FormField>
  <Label>Document Title</Label>
  <Input 
    placeholder="Enter title..."
    className="mt-1"
  />
  <HelperText>This will be displayed in the document list</HelperText>
</FormField>

// Select dropdown
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Choose type..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="contract">Contract</SelectItem>
    <SelectItem value="invoice">Invoice</SelectItem>
  </SelectContent>
</Select>
```

**Form Specs:**
- Input height: 40px
- Border: 1px `#dee2e6`
- Border radius: 6px
- Focus: Black border, subtle shadow
- Label: 14px, medium, gray-700
- Helper text: 12px, regular, gray-600

### **10. Modal Dialogs**

```tsx
// Clean modal design
<Modal>
  <ModalHeader>
    <ModalTitle>Upload Documents</ModalTitle>
    <ModalClose />
  </ModalHeader>
  
  <ModalContent>
    <DropZone />
  </ModalContent>
  
  <ModalFooter>
    <Button variant="secondary">Cancel</Button>
    <Button variant="primary">Upload</Button>
  </ModalFooter>
</Modal>
```

**Modal Specs:**
- Max width: 480px
- Padding: 24px
- Border radius: 12px
- Backdrop: Black 50% opacity
- Animation: Fade and scale

## 🎨 Interaction Patterns

### **Selection Model**
- Single click: Select item
- Cmd/Ctrl click: Multi-select
- Shift click: Range select
- Click outside: Deselect all

### **Drag and Drop**
- Drag files to upload
- Drag documents to folders
- Visual feedback during drag
- Drop zones highlight

### **Keyboard Navigation**
- `↑/↓`: Navigate list
- `Enter`: Open selected
- `Space`: Toggle selection
- `Cmd+A`: Select all
- `Delete`: Delete selected
- `Cmd+K`: Focus search

### **Loading States**
- Skeleton screens for lists
- Shimmer effect for content
- Progress bars for uploads
- Subtle spinners for actions

### **Error Handling**
- Inline validation messages
- Toast notifications for actions
- Retry options for failures
- Clear error recovery paths

## 📱 Responsive Behavior

### **Mobile Adaptations**
- Bottom tab navigation
- Full-screen modals
- Swipe gestures
- Touch-friendly tap targets
- Collapsed sidebar

### **Tablet Adaptations**
- Floating detail panel
- Landscape optimization
- Touch + keyboard support
- Adaptive grid layouts

## 🎯 Component Best Practices

1. **Consistency**: Use the same patterns throughout
2. **Familiarity**: Leverage email/inbox mental models
3. **Clarity**: Clear visual hierarchy and actions
4. **Efficiency**: Minimize clicks to complete tasks
5. **Feedback**: Immediate response to all interactions
6. **Accessibility**: Keyboard navigable, screen reader friendly

---

**These patterns create a cohesive, intuitive interface that feels as familiar as checking email.**