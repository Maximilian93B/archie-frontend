# 🧪 Phase 2: AI Chat Testing Guide

## 📋 Overview

This guide provides comprehensive testing instructions for the AI Chat implementation in Archivus.

## 🚀 Quick Start

### 1. Ensure Backend is Running
```bash
# Check backend health
curl http://localhost:8080/api/v1/health

# If you see a response, backend is ready
```

### 2. Start Frontend
```bash
npm run dev
```

### 3. Navigate to Test Page
Open: `http://localhost:3000/dashboard/chat/test`

## 🧪 Chat Implementation Components

### Components Created:
1. **Chat Store** (`src/store/chat-store.ts`)
   - Session management with LRU cache
   - Optimistic message updates
   - Draft persistence
   - Rate limiting (10 msg/min)

2. **Message Components** (`src/components/chat/message-bubble.tsx`)
   - Markdown rendering
   - Syntax highlighting
   - Copy/retry functionality
   - Loading states

3. **Chat Input** (`src/components/chat/chat-input.tsx`)
   - Multi-line support (Shift+Enter)
   - Auto-resize
   - Draft saving
   - Character limit (4000)

4. **Virtual Message List** (`src/components/chat/virtualized-message-list.tsx`)
   - Virtual scrolling for performance
   - Auto-scroll to bottom
   - Date separators
   - Empty states

5. **Chat Interface** (`src/components/chat/chat-interface.tsx`)
   - Complete chat UI
   - Session management
   - Error handling

## 📊 Test Scenarios

### 1. Basic Chat Flow
```javascript
// Test these actions:
1. Create a new chat session
2. Send "What is this document about?"
3. Wait for AI response
4. Verify markdown formatting
5. Send code snippet: "```javascript\nconst test = 'hello';\n```"
6. Verify syntax highlighting
```

### 2. Performance Tests
```javascript
// Virtual Scrolling Test
1. Send 100+ messages rapidly
2. Open Chrome DevTools > Performance
3. Record while scrolling
4. Verify:
   - 60fps maintained
   - Only visible messages rendered
   - Memory usage stable
```

### 3. Edge Cases
```javascript
// Test these scenarios:
- Network disconnection during message send
- Session with 1000+ messages
- Concurrent sessions
- Rate limit (11 messages in 1 minute)
- Very long messages (4000 chars)
- Special characters and emojis
```

## 🔧 API Test Script

Run the automated test:
```bash
# First, get a real document ID from your database
# Update TEST_DOCUMENT_ID in the script

node test-chat-implementation.js
```

Expected output:
```
🧪 Testing AI Chat Implementation

1️⃣ Logging in...
✅ Login successful

2️⃣ Creating chat session...
✅ Session created: uuid-here

3️⃣ Asking a question...
✅ Question answered!
   Response time: 1543ms
   Answer preview: Based on the document analysis...

[... more test results ...]

🎉 All chat tests passed successfully!
```

## 🐛 Common Issues & Solutions

### Issue: "Document not found"
```bash
# Get a valid document ID
# 1. Login to the app
# 2. Upload a test document
# 3. Copy the document ID from the URL
# 4. Use this ID in tests
```

### Issue: Rate limit hit immediately
```javascript
// Check and reset rate limit
const store = useChatStore.getState();
console.log('Messages sent:', store.messagesSentInLastMinute);
// Wait 60 seconds or refresh page
```

### Issue: Messages not appearing
```javascript
// Debug in console
const state = useChatStore.getState();
console.log('Current session:', state.currentSession);
console.log('Messages:', state.currentSession?.messages);
```

## 📱 Mobile Testing

1. Open Chrome DevTools
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select iPhone or Android
4. Test:
   - Touch scrolling
   - Keyboard behavior
   - Input focus
   - Responsive layout

## 🎯 Performance Metrics

Monitor these in DevTools:
- **Initial Render**: < 500ms
- **Message Send**: < 100ms (optimistic)
- **AI Response**: 1-3 seconds
- **Scroll Performance**: 60fps
- **Memory Growth**: < 10MB per 100 messages

## ✅ Testing Checklist

### Functionality
- [ ] Create new session
- [ ] Send text message
- [ ] Receive AI response
- [ ] Send multi-line message
- [ ] Copy message content
- [ ] Retry failed message
- [ ] Delete session
- [ ] Rename session
- [ ] Load existing session

### Performance
- [ ] Virtual scrolling works (50+ messages)
- [ ] Smooth 60fps scrolling
- [ ] No memory leaks
- [ ] Fast message rendering
- [ ] Efficient re-renders

### UX Features
- [ ] Draft saves automatically
- [ ] Draft restores on return
- [ ] Rate limit warning shows
- [ ] Loading states display
- [ ] Error states handle gracefully
- [ ] Empty state helpful
- [ ] Markdown renders correctly
- [ ] Code highlighting works

### Edge Cases
- [ ] Network error handling
- [ ] Session not found
- [ ] Very long messages
- [ ] Rapid message sending
- [ ] Browser refresh
- [ ] Multiple tabs

## 🔍 Debug Commands

```javascript
// In browser console:

// View all sessions
const store = useChatStore.getState();
console.log(store.sessions);

// Check rate limit
console.log('Can send:', store.canSendMessage());

// View drafts
console.log(store.drafts);

// Force refresh session
store.setCurrentSession(null);
store.setCurrentSession('session-id-here');
```

## 📈 Next Steps

After testing:
1. Document any bugs found
2. Note performance bottlenecks
3. Gather user feedback
4. Plan optimizations

---

**Ready to test! The chat system is optimized for performance with virtual scrolling, draft persistence, and rate limiting.**