# Chat Page Visual Guide

## 🎨 Layout Structure

### Desktop View (1024px+)
```
┌─────────────────────────────────────────────────────────────────┐
│                         Top Navigation                           │
├─────────────────┬───────────────────────────────────────────────┤
│                 │                                               │
│  Session List   │             Main Chat Area                    │
│    (320px)      │                                               │
│                 │  ┌─────────────────────────────────────────┐ │
│ ┌─────────────┐ │  │          Chat Header                    │ │
│ │   Search    │ │  │  [←] Session Name            [✏️] [🗑️]  │ │
│ └─────────────┘ │  │      📄 Document Name                   │ │
│                 │  └─────────────────────────────────────────┘ │
│ ┌─────────────┐ │                                               │
│ │ + New Chat  │ │  ┌─────────────────────────────────────────┐ │
│ └─────────────┘ │  │                                         │ │
│                 │  │         Message List                     │ │
│ ┌─────────────┐ │  │      (Virtual Scrolling)                │ │
│ │ Session 1   │ │  │                                         │ │
│ │ 2 messages  │ │  │  User: Hello                            │ │
│ │ 2 hours ago │ │  │  AI: Hi! How can I help?               │ │
│ └─────────────┘ │  │  User: Tell me about...                │ │
│                 │  │  AI: [Markdown response]                │ │
│ ┌─────────────┐ │  │                                         │ │
│ │ Session 2   │ │  └─────────────────────────────────────────┘ │
│ │ 5 messages  │ │                                               │
│ │ Yesterday   │ │  ┌─────────────────────────────────────────┐ │
│ └─────────────┘ │  │         Chat Input                      │ │
│                 │  │  ┌─────────────────────────┐ [Send]    │ │
│                 │  │  │ Type your message...    │           │ │
│                 │  │  └─────────────────────────┘           │ │
│                 │  └─────────────────────────────────────────┘ │
└─────────────────┴───────────────────────────────────────────────┘
```

### Mobile View (<768px)
```
┌─────────────────────────┐
│    Top Navigation       │
├─────────────────────────┤
│  [☰] Chat Header        │
│      Session Name       │
├─────────────────────────┤
│                         │
│     Message List        │
│   (Full Screen)         │
│                         │
│  User: Question         │
│  AI: Answer            │
│                         │
├─────────────────────────┤
│    Chat Input          │
│  [Type here...] [Send] │
└─────────────────────────┘
```

## 🔄 User Flows

### 1. Starting a New Chat
```
Empty State
    │
    ├─→ "Choose Document" button
    │       │
    │       ├─→ Document Picker Dialog opens
    │       │       │
    │       │       ├─→ Optional: Enter session name
    │       │       │
    │       │       └─→ Select document
    │       │               │
    │       │               └─→ New session created
    │       │                       │
    │       │                       └─→ Chat interface ready
    │       │
    │       └─→ Cancel → Back to empty state
    │
    └─→ Click "New" in sidebar → Same flow
```

### 2. Sending a Message
```
Type in Input
    │
    ├─→ Auto-save draft (500ms debounce)
    │
    ├─→ Press Enter or Click Send
    │       │
    │       ├─→ Rate limit check
    │       │       │
    │       │       ├─→ Pass → Send message
    │       │       │           │
    │       │       │           ├─→ Show loading
    │       │       │           │
    │       │       │           └─→ Add to messages
    │       │       │
    │       │       └─→ Fail → Show warning
    │       │
    │       └─→ Network error → Restore draft
    │
    └─→ Shift+Enter → New line
```

### 3. Managing Sessions
```
Session List
    │
    ├─→ Click session → Load messages
    │
    ├─→ Hover → Show actions
    │       │
    │       ├─→ Edit → Inline rename
    │       │
    │       └─→ Delete → Confirmation → Remove
    │
    └─→ Search → Filter sessions
```

## 🎯 Interactive Elements

### Buttons & Actions
- **Primary Button**: Black background, white text
- **Ghost Button**: Transparent, hover shows background
- **Icon Buttons**: 32x32px touch targets
- **Loading State**: Spinning loader icon

### Input Fields
- **Chat Input**: Multi-line, auto-resize, 4000 char limit
- **Search Input**: Icon prefix, instant filter
- **Session Name**: Inline edit on click

### Feedback
- **Rate Limit**: Red warning text
- **Loading**: Spinner in message list
- **Success**: Message appears instantly
- **Error**: Toast notification

## 🎨 Visual States

### Empty State
```
┌─────────────────────────────┐
│                             │
│         💬                  │
│    Start a New Chat         │
│                             │
│  Select a document to       │
│  begin asking questions     │
│                             │
│   [Choose Document]         │
│                             │
└─────────────────────────────┘
```

### Loading State
```
┌─────────────────────────────┐
│                             │
│         ⟳                   │
│      Loading...             │
│                             │
└─────────────────────────────┘
```

### Message Types
```
User Message:
┌─────────────────────────────┐
│ You                    2:34 │
│ What is the revenue?        │
└─────────────────────────────┘

AI Message:
┌─────────────────────────────┐
│ Assistant              2:35 │
│ The revenue for Q4 was...   │
│                             │
│ • Point 1                   │
│ • Point 2                   │
│                             │
│ ```python                   │
│ # Code example              │
│ ```                         │
│                             │
│ [Copy] [Retry]              │
└─────────────────────────────┘
```

## 🌈 Color Scheme

- **Background**: White (#FFFFFF)
- **Sidebar**: Light Gray (#F9FAFB)
- **Borders**: Gray (#E5E7EB)
- **Primary**: Black (#000000)
- **Text**: Dark Gray (#374151)
- **Muted Text**: Medium Gray (#6B7280)
- **Success**: Green (#10B981)
- **Error**: Red (#EF4444)
- **AI Indicator**: Purple (#8B5CF6)

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (Single column)
- **Tablet**: 768px - 1023px (Collapsible sidebar)
- **Desktop**: ≥ 1024px (Full layout)

## ⚡ Performance Features

1. **Virtual Scrolling**: Only visible messages rendered
2. **Lazy Loading**: Sessions load on demand
3. **Prefetching**: Hover to preload
4. **Debouncing**: Draft saves optimized
5. **Memoization**: Prevent re-renders

---

This visual guide shows the complete chat page layout and interaction patterns.