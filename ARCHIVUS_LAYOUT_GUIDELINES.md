# 📐 Archivus Layout & Spacing Guidelines

## 📋 Overview

Archivus layouts follow Apple's spatial design principles: generous whitespace, clear hierarchy, and consistent alignment. The layout system creates a calm, focused environment for document management.

## 🏗️ Layout Architecture

### **Primary Layout Structure**

```
┌─────────────────────────────────────────────────────────┐
│                    Top Navigation (64px)                 │
├─────────────┬───────────────────────────────────────────┤
│             │                                           │
│   Sidebar   │            Main Content Area              │
│   (240px)   │              (flexible)                   │
│             │                                           │
│   Fixed     │         ┌─────────────┬─────────────┐    │
│   Position  │         │ List View   │ Detail View │    │
│             │         │ (flex: 1)   │   (400px)   │    │
│             │         │             │             │    │
└─────────────┴─────────┴─────────────┴─────────────┴────┘
```

### **Responsive Breakpoints**

```css
/* Mobile First Approach */
@media (min-width: 640px)  { /* sm: Tablet portrait */ }
@media (min-width: 768px)  { /* md: Tablet landscape */ }
@media (min-width: 1024px) { /* lg: Desktop */ }
@media (min-width: 1280px) { /* xl: Wide desktop */ }
@media (min-width: 1536px) { /* 2xl: Ultra-wide */ }
```

## 📏 Grid System

### **12-Column Grid**
```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;  /* 16px gutters */
}

/* Responsive container widths */
@media (min-width: 640px)  { .container { max-width: 640px; } }
@media (min-width: 768px)  { .container { max-width: 768px; } }
@media (min-width: 1024px) { .container { max-width: 1024px; } }
@media (min-width: 1280px) { .container { max-width: 1280px; } }
```

### **Content Widths**
```css
/* Optimal reading widths */
.content-narrow { max-width: 45rem; }    /* ~720px - Long-form text */
.content-medium { max-width: 60rem; }    /* ~960px - Mixed content */
.content-wide   { max-width: 80rem; }    /* ~1280px - Dashboards */
.content-full   { max-width: none; }     /* Full width */
```

## 🎯 Spacing System

### **Base Unit: 4px**
All spacing follows a 4px base unit for consistency:

```css
/* Spacing Scale */
.p-0  { padding: 0; }        /* 0px */
.p-1  { padding: 4px; }      /* 4px */
.p-2  { padding: 8px; }      /* 8px */
.p-3  { padding: 12px; }     /* 12px */
.p-4  { padding: 16px; }     /* 16px - Default */
.p-5  { padding: 20px; }     /* 20px */
.p-6  { padding: 24px; }     /* 24px - Cards */
.p-8  { padding: 32px; }     /* 32px - Sections */
.p-10 { padding: 40px; }     /* 40px */
.p-12 { padding: 48px; }     /* 48px - Large sections */
```

### **Component-Specific Spacing**

#### **Navigation**
```css
.nav-header {
  height: 64px;
  padding: 0 24px;
  border-bottom: 1px solid var(--color-gray-200);
}

.nav-item {
  height: 36px;
  padding: 0 16px;
  margin: 2px 8px;
}
```

#### **Cards & Panels**
```css
.card {
  padding: 24px;
  margin-bottom: 16px;
  border-radius: 8px;
}

.card-compact {
  padding: 16px;
}

.card-spacious {
  padding: 32px;
}
```

#### **Lists**
```css
.list-item {
  padding: 16px;
  border-bottom: 1px solid var(--color-gray-200);
}

.list-item:hover {
  background: var(--color-gray-50);
}

.list-item-compact {
  padding: 12px 16px;
}
```

#### **Forms**
```css
.form-group {
  margin-bottom: 24px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.label {
  margin-bottom: 8px;
  display: block;
}

.input {
  height: 40px;
  padding: 0 12px;
}

.textarea {
  padding: 12px;
  min-height: 120px;
}
```

## 📱 Responsive Layout Patterns

### **Desktop (≥1024px)**
```css
.layout-desktop {
  display: grid;
  grid-template-columns: 240px 1fr 400px;
  gap: 0;
}

.sidebar { position: sticky; top: 0; }
.main-content { min-width: 0; }
.detail-panel { position: sticky; top: 0; }
```

### **Tablet (768px - 1023px)**
```css
.layout-tablet {
  display: grid;
  grid-template-columns: 240px 1fr;
}

.detail-panel {
  position: fixed;
  right: 0;
  top: 64px;
  width: 80%;
  height: calc(100vh - 64px);
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.detail-panel.open {
  transform: translateX(0);
}
```

### **Mobile (<768px)**
```css
.layout-mobile {
  display: block;
}

.sidebar {
  position: fixed;
  left: 0;
  top: 64px;
  width: 80%;
  height: calc(100vh - 64px);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.sidebar.open {
  transform: translateX(0);
}

.main-content,
.detail-panel {
  width: 100%;
}
```

## 🎨 Visual Rhythm

### **Vertical Rhythm**
Maintain consistent vertical spacing using multiples of 4px:

```css
/* Typography spacing */
h1 { margin: 0 0 24px; }
h2 { margin: 32px 0 16px; }
h3 { margin: 24px 0 12px; }
p  { margin: 0 0 16px; }

/* Section spacing */
.section { padding: 48px 0; }
.section-compact { padding: 32px 0; }
.subsection { margin-top: 32px; }
```

### **Horizontal Rhythm**
```css
/* Content alignment */
.content {
  padding-left: 24px;
  padding-right: 24px;
}

/* Nested content */
.nested-content {
  margin-left: 40px;  /* Indent for hierarchy */
}
```

## 🖼️ Common Layout Patterns

### **Dashboard Layout**
```tsx
<div className="min-h-screen bg-white">
  <TopNav />
  
  <div className="flex">
    <Sidebar className="w-60 border-r" />
    
    <main className="flex-1 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">Good morning</h1>
        <p className="text-gray-600 mt-2">Here's what's happening...</p>
      </header>
      
      <div className="grid grid-cols-3 gap-6 mb-8">
        <MetricCard />
        <MetricCard />
        <MetricCard />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <ActionCard />
        <ActionCard />
      </div>
    </main>
  </div>
</div>
```

### **List + Detail Layout**
```tsx
<div className="flex h-screen">
  <Sidebar />
  
  <div className="flex-1 flex">
    {/* List View */}
    <div className="flex-1 border-r overflow-y-auto">
      <ListHeader className="sticky top-0 bg-white border-b" />
      <DocumentList className="divide-y" />
    </div>
    
    {/* Detail View */}
    <div className="w-[400px] bg-white overflow-y-auto">
      <DetailHeader className="sticky top-0 bg-white border-b" />
      <DetailContent className="p-6" />
    </div>
  </div>
</div>
```

### **Form Layout**
```tsx
<div className="max-w-2xl mx-auto p-8">
  <h2 className="text-2xl font-semibold mb-6">Upload Document</h2>
  
  <form className="space-y-6">
    <FormSection>
      <SectionTitle>Document Information</SectionTitle>
      <div className="space-y-4">
        <FormField />
        <FormField />
      </div>
    </FormSection>
    
    <FormSection>
      <SectionTitle>AI Processing Options</SectionTitle>
      <div className="space-y-4">
        <CheckboxField />
        <CheckboxField />
      </div>
    </FormSection>
    
    <FormActions className="flex gap-3 justify-end pt-6 border-t">
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Upload</Button>
    </FormActions>
  </form>
</div>
```

## 📏 Alignment Principles

### **Edge Alignment**
- Align elements to consistent edges
- Create clear vertical lines through the layout
- Use grid for complex alignments

### **Optical Alignment**
- Icons may need slight adjustments for visual balance
- Consider visual weight, not just mathematical center
- Test with real content

### **Baseline Alignment**
- Align text to consistent baselines
- Match line heights across components
- Consider cap height for headings

## 🎯 Layout Best Practices

### **Do's**
- ✅ Use consistent spacing scale
- ✅ Maintain clear visual hierarchy
- ✅ Create generous whitespace
- ✅ Align to invisible grid
- ✅ Test at all breakpoints
- ✅ Consider touch targets (44px min)

### **Don'ts**
- ❌ Mix spacing units randomly
- ❌ Create cramped interfaces
- ❌ Break established patterns
- ❌ Ignore responsive needs
- ❌ Use fixed heights unnecessarily
- ❌ Forget about scrolling contexts

## 🔧 Implementation Tips

### **CSS Grid for Layouts**
```css
/* Flexible grid with minmax */
.document-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}
```

### **Flexbox for Components**
```css
/* Center content with flex */
.center-content {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}
```

### **Sticky Positioning**
```css
/* Sticky headers and sidebars */
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
}
```

---

**These layout guidelines ensure Archivus maintains a clean, consistent, and professional appearance across all screens and devices.**