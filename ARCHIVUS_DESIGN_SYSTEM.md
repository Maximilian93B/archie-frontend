# 🎨 Archivus Design System

## 📋 Overview

Archivus follows a clean, minimalist design philosophy inspired by Apple's design principles and email inbox patterns. The interface prioritizes clarity, simplicity, and familiarity.

## 🎯 Design Principles

### 1. **Clarity**
- Clear typography hierarchy
- Generous whitespace
- Obvious interactive elements
- Predictable navigation patterns

### 2. **Simplicity**
- Minimal color palette
- Clean iconography
- Reduced cognitive load
- Focus on content

### 3. **Familiarity**
- Email inbox-like layout
- Standard navigation patterns
- Conventional interactions
- Intuitive organization

## 🎨 Color Palette

### **Primary Colors**
```css
/* Core Brand Colors */
--color-primary: #000000;        /* Pure black for primary actions */
--color-primary-hover: #1a1a1a;  /* Slightly lighter on hover */
--color-background: #ffffff;     /* Pure white background */
--color-surface: #f8f9fa;        /* Light gray surface (sidebar) */
```

### **Neutral Colors**
```css
/* Gray Scale */
--color-gray-50: #f8f9fa;   /* Lightest gray - backgrounds */
--color-gray-100: #f1f3f5;  /* Light gray - hover states */
--color-gray-200: #e9ecef;  /* Borders, dividers */
--color-gray-300: #dee2e6;  /* Disabled borders */
--color-gray-400: #ced4da;  /* Placeholder text */
--color-gray-500: #adb5bd;  /* Muted text */
--color-gray-600: #6c757d;  /* Secondary text */
--color-gray-700: #495057;  /* Body text */
--color-gray-800: #343a40;  /* Headings */
--color-gray-900: #212529;  /* Darkest text */
```

### **Semantic Colors**
```css
/* Status Colors */
--color-success: #10b981;     /* Green - success, processed */
--color-warning: #f59e0b;     /* Amber - warnings */
--color-error: #ef4444;       /* Red - errors, destructive */
--color-info: #3b82f6;        /* Blue - informational */

/* AI/Processing Colors */
--color-ai: #8b5cf6;          /* Purple - AI features */
--color-processing: #06b6d4;  /* Cyan - processing state */
```

## 📐 Typography

### **Font Stack**
```css
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
             "Helvetica Neue", Arial, sans-serif;
--font-mono: ui-monospace, SFMono-Regular, "SF Mono", Consolas, 
             "Liberation Mono", Menlo, monospace;
```

### **Font Sizes**
```css
/* Type Scale */
--text-xs: 0.75rem;     /* 12px - metadata, labels */
--text-sm: 0.875rem;    /* 14px - secondary text */
--text-base: 1rem;      /* 16px - body text */
--text-lg: 1.125rem;    /* 18px - emphasized text */
--text-xl: 1.25rem;     /* 20px - section headers */
--text-2xl: 1.5rem;     /* 24px - page titles */
--text-3xl: 1.875rem;   /* 30px - main headings */
```

### **Font Weights**
```css
--font-normal: 400;     /* Body text */
--font-medium: 500;     /* Emphasized text */
--font-semibold: 600;   /* Headings */
--font-bold: 700;       /* Strong emphasis */
```

### **Line Heights**
```css
--leading-tight: 1.25;   /* Headings */
--leading-normal: 1.5;   /* Body text */
--leading-relaxed: 1.75; /* Long-form content */
```

## 📏 Spacing System

### **Base Unit: 4px**
```css
/* Spacing Scale */
--space-0: 0;           /* 0px */
--space-1: 0.25rem;     /* 4px */
--space-2: 0.5rem;      /* 8px */
--space-3: 0.75rem;     /* 12px */
--space-4: 1rem;        /* 16px */
--space-5: 1.25rem;     /* 20px */
--space-6: 1.5rem;      /* 24px */
--space-8: 2rem;        /* 32px */
--space-10: 2.5rem;     /* 40px */
--space-12: 3rem;       /* 48px */
--space-16: 4rem;       /* 64px */
```

## 🔲 Layout Grid

### **Container Widths**
```css
--width-xs: 20rem;      /* 320px - mobile */
--width-sm: 24rem;      /* 384px - small tablet */
--width-md: 28rem;      /* 448px - modal */
--width-lg: 32rem;      /* 512px - content */
--width-xl: 36rem;      /* 576px - wide content */
--width-2xl: 42rem;     /* 672px - max content */
--width-full: 100%;     /* Full width */
```

### **Breakpoints**
```css
--screen-sm: 640px;     /* Small devices */
--screen-md: 768px;     /* Medium devices */
--screen-lg: 1024px;    /* Large devices */
--screen-xl: 1280px;    /* Extra large devices */
--screen-2xl: 1536px;   /* 2X large devices */
```

## 🎭 Visual Effects

### **Border Radius**
```css
--radius-none: 0;         /* Sharp corners */
--radius-sm: 0.125rem;    /* 2px - subtle */
--radius-md: 0.375rem;    /* 6px - default */
--radius-lg: 0.5rem;      /* 8px - cards */
--radius-xl: 0.75rem;     /* 12px - modals */
--radius-full: 9999px;    /* Pills, avatars */
```

### **Shadows**
```css
/* Elevation Scale */
--shadow-none: none;
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);

/* Special Shadows */
--shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
--shadow-focus: 0 0 0 3px rgb(0 0 0 / 0.1);
```

### **Transitions**
```css
/* Timing */
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 300ms;

/* Easing */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

## 🎯 Component Tokens

### **Buttons**
```css
/* Primary Button */
--btn-primary-bg: var(--color-primary);
--btn-primary-text: var(--color-background);
--btn-primary-hover: var(--color-primary-hover);

/* Secondary Button */
--btn-secondary-bg: var(--color-background);
--btn-secondary-text: var(--color-gray-700);
--btn-secondary-border: var(--color-gray-300);
--btn-secondary-hover: var(--color-gray-50);

/* Button Sizing */
--btn-padding-x: var(--space-4);
--btn-padding-y: var(--space-2);
--btn-radius: var(--radius-md);
```

### **Cards**
```css
/* Card Styles */
--card-bg: var(--color-background);
--card-border: var(--color-gray-200);
--card-radius: var(--radius-lg);
--card-shadow: var(--shadow-sm);
--card-padding: var(--space-6);
```

### **Sidebar**
```css
/* Sidebar Styles */
--sidebar-bg: var(--color-surface);
--sidebar-width: 15rem;  /* 240px */
--sidebar-item-hover: var(--color-gray-100);
--sidebar-item-active: var(--color-primary);
--sidebar-text: var(--color-gray-700);
--sidebar-text-active: var(--color-primary);
```

### **List Items (Inbox Style)**
```css
/* List Item Styles */
--list-item-padding: var(--space-4);
--list-item-hover: var(--color-gray-50);
--list-item-border: var(--color-gray-200);
--list-item-selected: #e8f0fe;  /* Light blue tint */
```

## 🎨 Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#6c757d',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
        primary: {
          DEFAULT: '#000000',
          hover: '#1a1a1a',
        },
        surface: '#f8f9fa',
        ai: '#8b5cf6',
        processing: '#06b6d4',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Consolas', 'monospace'],
      },
    },
  },
}
```

## 📱 Responsive Design

### **Mobile First**
- Start with mobile layout
- Enhance for larger screens
- Touch-friendly interactions
- Appropriate tap targets (44px minimum)

### **Breakpoint Strategy**
```css
/* Mobile: default styles */
/* Tablet: @media (min-width: 768px) */
/* Desktop: @media (min-width: 1024px) */
/* Wide: @media (min-width: 1280px) */
```

## ♿ Accessibility

### **Color Contrast**
- Text on background: minimum 4.5:1 ratio
- Large text: minimum 3:1 ratio
- Interactive elements: clear focus states

### **Focus Indicators**
```css
/* Focus Styles */
--focus-ring: 0 0 0 2px var(--color-background), 0 0 0 4px var(--color-primary);
--focus-ring-offset: 2px;
```

## 🌗 Dark Mode (Future)

While the initial design is light mode only, provisions for dark mode:
```css
/* Dark Mode Colors */
@media (prefers-color-scheme: dark) {
  --color-background: #000000;
  --color-surface: #1a1a1a;
  --color-primary: #ffffff;
  /* ... additional dark mode tokens */
}
```

---

**This design system ensures consistency across all Archivus components while maintaining the clean, Apple-like aesthetic.**