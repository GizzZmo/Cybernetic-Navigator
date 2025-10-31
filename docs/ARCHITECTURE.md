# Architecture Overview

This document provides a high-level overview of the Cybernetic Navigator's architecture, design patterns, and technical decisions.

## Table of Contents

- [System Architecture](#system-architecture)
- [Technology Choices](#technology-choices)
- [Design Patterns](#design-patterns)
- [Data Flow](#data-flow)
- [State Management](#state-management)
- [Styling Architecture](#styling-architecture)
- [Performance Considerations](#performance-considerations)
- [Security Model](#security-model)
- [Future Enhancements](#future-enhancements)

## System Architecture

### High-Level Overview

Cybernetic Navigator is a **client-side single-page application (SPA)** built with React and TypeScript. It follows a modular, component-based architecture with clear separation of concerns.

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (Client)                      │
├─────────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────────────────┐  │
│  │              React Application                    │  │
│  │  ┌─────────────┐  ┌──────────────┐              │  │
│  │  │     UI      │  │     State     │              │  │
│  │  │ Components  │◄─┤  Management   │              │  │
│  │  └──────┬──────┘  └──────┬───────┘              │  │
│  │         │                 │                       │  │
│  │         │        ┌────────▼────────┐             │  │
│  │         └───────►│  Services Layer │             │  │
│  │                  └────────┬────────┘             │  │
│  └───────────────────────────┼───────────────────────┘  │
│                              │                          │
│         ┌────────────────────┼────────────────┐         │
│         │                    ▼                │         │
│         │  ┌──────────────────────────────┐  │         │
│         │  │      LocalStorage API        │  │         │
│         │  │  (Persistence Layer)         │  │         │
│         │  └──────────────────────────────┘  │         │
│         └─────────────────────────────────────┘         │
└──────────────────────────┬──────────────────────────────┘
                           │
                           │ HTTPS
                           │
                           ▼
        ┌──────────────────────────────────┐
        │   Google Gemini AI API           │
        │   (External Service)             │
        └──────────────────────────────────┘
```

### Layer Breakdown

#### 1. **Presentation Layer** (Components)
- **Responsibility:** User interface and interaction
- **Components:** React functional components
- **Location:** `components/`, `App.tsx`
- **Technologies:** React, TypeScript, CSS

#### 2. **Application Layer** (State Management)
- **Responsibility:** Application logic and state
- **Approach:** React hooks (useState, useEffect, useCallback)
- **Location:** Component state, App-level state
- **Technologies:** React hooks

#### 3. **Service Layer** (Business Logic)
- **Responsibility:** External API integration
- **Location:** `services/geminiService.ts`
- **Technologies:** Google Gemini AI SDK
- **Functions:** smartSearch, summarizeText, generateTheme

#### 4. **Persistence Layer** (Data Storage)
- **Responsibility:** Local data persistence
- **Technology:** Browser LocalStorage API
- **Data Stored:** API keys, bookmarks, history, summaries

## Technology Choices

### Core Technologies

#### **React 19.1**
**Why React?**
- ✅ Component-based architecture fits project needs
- ✅ Large ecosystem and community support
- ✅ Excellent TypeScript integration
- ✅ Virtual DOM for efficient updates
- ✅ Hooks API for clean state management

**Alternatives Considered:**
- Vue.js - Good, but React's ecosystem is more mature
- Svelte - Smaller bundle, but less ecosystem support
- Vanilla JS - Too much boilerplate for this complexity

#### **TypeScript 5.8**
**Why TypeScript?**
- ✅ Type safety prevents runtime errors
- ✅ Better IDE support and autocomplete
- ✅ Self-documenting code through types
- ✅ Easier refactoring
- ✅ Catches errors at compile time

**Alternatives Considered:**
- JavaScript - Faster to write, but error-prone
- Flow - Less popular, smaller ecosystem

#### **Vite 6.2**
**Why Vite?**
- ✅ Extremely fast development server
- ✅ Hot Module Replacement (HMR)
- ✅ Optimized production builds
- ✅ Modern ES modules support
- ✅ Excellent TypeScript support

**Alternatives Considered:**
- Create React App - Slower, less modern
- Webpack - More configuration needed
- Parcel - Good, but Vite is faster

#### **Google Gemini AI**
**Why Gemini?**
- ✅ State-of-the-art AI capabilities
- ✅ Structured output support (JSON)
- ✅ Good free tier for development
- ✅ Official SDK with TypeScript support
- ✅ Fast response times

**Alternatives Considered:**
- OpenAI GPT - More expensive, API key harder to get
- Claude - Good, but less free tier access
- Local LLMs - Too resource-intensive for browser

### Development Tools

- **Package Manager:** npm (widely supported)
- **Version Control:** Git/GitHub
- **Code Quality:** TypeScript compiler
- **Build Tool:** Vite
- **Dev Server:** Vite dev server with HMR

## Design Patterns

### 1. **Component Composition**

Components are composed together to build complex UIs:

```typescript
<App>
  <Header />
  <MainContent>
    <PanelNavigation />
    <SidePanel>
      {activePanel === 'SEARCH' && <AddressBarPanel />}
      {activePanel === 'SUMMARIZE' && <SummarizerPanel />}
    </SidePanel>
    <ViewportPanel />
  </MainContent>
  <StatusBar />
</App>
```

**Benefits:**
- Reusable components
- Clear hierarchy
- Easier testing
- Better maintainability

### 2. **Props Drilling with Callbacks**

Parent components pass data down and receive updates through callbacks:

```typescript
// Parent
const [bookmarks, setBookmarks] = useState([]);
const handleAdd = (url) => setBookmarks([...bookmarks, url]);

// Child receives callback
<ViewportPanel onAddBookmark={handleAdd} />

// Child calls callback
<button onClick={() => props.onAddBookmark(url)}>
```

**Benefits:**
- Unidirectional data flow
- Predictable state updates
- Clear component contracts

### 3. **Service Layer Pattern**

Business logic is separated into service modules:

```typescript
// Service
export const smartSearch = async (prompt, apiKey) => {
  // AI logic here
};

// Component
import { smartSearch } from './services/geminiService';

const result = await smartSearch(query, apiKey);
```

**Benefits:**
- Separation of concerns
- Easier testing
- Reusable logic
- Cleaner components

### 4. **Custom Hooks Pattern** (Potential)

While not extensively used currently, custom hooks could extract reusable logic:

```typescript
// Example custom hook
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

// Usage
const [bookmarks, setBookmarks] = useLocalStorage('bookmarks', []);
```

### 5. **Container/Presentational Pattern**

Some components separate logic from presentation:

- **Container:** Handles logic, state, API calls
- **Presentational:** Renders UI based on props

Example:
```typescript
// Container logic in parent
const handleSearch = async () => {
  setLoading(true);
  const result = await smartSearch(query);
  setLoading(false);
};

// Presentational component
<SearchUI 
  onSearch={handleSearch}
  isLoading={isLoading}
  results={results}
/>
```

## Data Flow

### Unidirectional Data Flow

React's data flows in one direction: **parent → child**.

```
┌─────────────┐
│     App     │
│  (State)    │
└──────┬──────┘
       │ Props ↓
       │
┌──────▼──────┐
│   Panel     │
│ (Receives)  │
└──────┬──────┘
       │ Callback ↑
       │
┌──────▼──────┐
│     App     │
│ (Updates)   │
└─────────────┘
```

### State Update Flow

1. **User Action** → Component event handler
2. **Event Handler** → Calls callback prop
3. **Callback** → Updates parent state
4. **State Change** → React re-renders
5. **Re-render** → Updated props flow down

### Data Persistence Flow

```
Component State
      ↓
   useEffect
      ↓
 localStorage.setItem
      ↓
  Browser Storage

On Load:
localStorage.getItem
      ↓
   JSON.parse
      ↓
 useState(initial)
      ↓
 Component State
```

## State Management

### Current Approach: React Hooks

**Why Hooks?**
- ✅ No additional dependencies
- ✅ Built into React
- ✅ Sufficient for this app's complexity
- ✅ Simple to understand
- ✅ Great performance

### State Location Strategy

#### **App-Level State** (in `App.tsx`)
- Theme configuration
- Active panel
- API key
- Bookmarks
- History
- Sidebar width

**Reason:** Shared across multiple components

#### **Component-Level State** (in individual components)
- Input values
- Loading states
- Local UI state
- Form data

**Reason:** Only relevant to that component

### State Persistence

Persisted to localStorage:
```typescript
useEffect(() => {
  localStorage.setItem('key', JSON.stringify(value));
}, [value]);
```

Loaded on mount:
```typescript
const [state, setState] = useState(() => {
  const saved = localStorage.getItem('key');
  return saved ? JSON.parse(saved) : defaultValue;
});
```

### Future Considerations

For more complex state needs:
- **Context API** - For deeply nested prop drilling
- **Redux** - For very complex state (probably overkill)
- **Zustand** - Lightweight alternative to Redux
- **Jotai** - Atomic state management

## Styling Architecture

### Dynamic Theming with CSS Variables

The app uses **CSS Custom Properties** (variables) for dynamic theming:

```typescript
// Set in JavaScript
root.style.setProperty('--primary-color', theme.primaryColor);
root.style.setProperty('--accent-color', theme.accentColor);
```

```css
/* Use in CSS */
.button {
  border-color: var(--primary-color);
  color: var(--text-color);
  background: var(--background-color);
}
```

**Benefits:**
- ✅ Runtime theme changes
- ✅ No CSS-in-JS overhead
- ✅ Cascade to all elements
- ✅ Browser-native performance

### Styling Approach

**Inline Styles + CSS Variables:**
```tsx
<div 
  className="cyber-button"
  style={{ 
    borderColor: 'var(--primary-color)',
    color: 'var(--text-color)'
  }}
>
```

**Benefits:**
- Component-level control
- Dynamic values
- No CSS file bloat
- Easy to understand

**Tradeoffs:**
- Less separation of concerns
- Harder to override
- No CSS preprocessing

### Responsive Design

- **Flexbox** for layout
- **Relative units** (%, em, rem)
- **Resizable panels** with drag handles
- **Min/max constraints** for usability

## Performance Considerations

### Current Optimizations

1. **useCallback for Event Handlers**
   ```typescript
   const handleClick = useCallback(() => {
     // Handler logic
   }, [dependencies]);
   ```
   Prevents unnecessary re-renders when passed as props.

2. **Lazy Loading** (via dynamic imports if needed)
   ```typescript
   const Component = React.lazy(() => import('./Component'));
   ```

3. **Debouncing** (where needed)
   For rapid API calls or expensive operations.

4. **Conditional Rendering**
   Only render active panels:
   ```typescript
   {activePanel === 'SEARCH' && <SearchPanel />}
   ```

### Bundle Size

**Current Build:**
- Total: ~420 KB (gzipped: ~105 KB)
- Acceptable for a rich SPA
- Main dependency: React + Google Gemini SDK

**Optimization Opportunities:**
- Code splitting for panels
- Tree-shaking unused code
- Image optimization
- Lazy load iframe content

### Runtime Performance

- **Virtual DOM** minimizes re-renders
- **CSS animations** use GPU acceleration
- **LocalStorage** is synchronous but fast
- **API calls** are debounced where needed

## Security Model

### API Key Security

**Storage:**
- LocalStorage (client-side only)
- Never sent to any server (except Google AI)
- Never logged or exposed in errors

**Risks:**
- ⚠️ Accessible by browser extensions
- ⚠️ Visible in browser dev tools
- ⚠️ Cleared if user clears browser data

**Mitigations:**
- Clear warnings to users
- Option to use environment variables
- Never commit keys to git
- Gitignore for `.env.local`

### Content Security

**XSS Protection:**
- React escapes content by default
- No `dangerouslySetInnerHTML` used
- User input sanitized

**Iframe Security:**
- Same-origin policy applies
- User controls what URLs to load
- No automatic execution

### Data Privacy

- **No server component** - all data stays local
- **No analytics** tracking users
- **No data collection** beyond what's needed
- **User controls** all their data

## Future Enhancements

### Potential Improvements

#### 1. **Advanced State Management**
- Implement Context API for theme
- Add Zustand for complex state
- Better state persistence strategy

#### 2. **Testing Infrastructure**
- Unit tests with Vitest
- Component tests with React Testing Library
- E2E tests with Playwright
- Snapshot testing

#### 3. **Performance Optimizations**
- Code splitting by route/panel
- Service worker for caching
- Virtual scrolling for long lists
- Optimize bundle size

#### 4. **Feature Enhancements**
- Browser extension version
- Offline support
- Export/import bookmarks
- Tabs management
- Custom themes gallery
- Theme sharing

#### 5. **Developer Experience**
- ESLint configuration
- Prettier for formatting
- Husky for pre-commit hooks
- Better error boundaries
- Logging system

#### 6. **Accessibility**
- ARIA labels
- Keyboard navigation
- Screen reader support
- High contrast mode
- Focus management

#### 7. **Documentation**
- Interactive component demos
- Video tutorials
- API playground
- Contribution examples

### Scalability Considerations

**If the app grows:**
- Move to folder-based component structure
- Implement proper routing (React Router)
- Add feature flags
- Implement error tracking
- Add analytics (privacy-respecting)
- Consider backend for shared features

## Architecture Decisions Log

### Why No Backend?

**Decision:** Pure client-side application

**Reasoning:**
- ✅ Simpler deployment (static hosting)
- ✅ No server costs
- ✅ Better privacy (no data collection)
- ✅ Faster for users (no API latency)
- ✅ Easier to develop and test

**Tradeoffs:**
- ❌ No user accounts
- ❌ No cross-device sync
- ❌ Can't share bookmarks/themes
- ❌ Limited to localStorage capacity

### Why LocalStorage Over IndexedDB?

**Decision:** Use LocalStorage for persistence

**Reasoning:**
- ✅ Simpler API
- ✅ Sufficient for data volume
- ✅ Synchronous (easier to use)
- ✅ Widely supported

**Tradeoffs:**
- ❌ 5-10 MB limit
- ❌ Synchronous (blocks main thread)
- ❌ Only stores strings (requires JSON)

### Why No State Management Library?

**Decision:** Use React hooks only

**Reasoning:**
- ✅ Sufficient complexity
- ✅ No extra dependencies
- ✅ Easier for contributors
- ✅ Better performance
- ✅ Less boilerplate

**When to reconsider:**
- Deep prop drilling becomes common
- State becomes very complex
- Multiple components need same state
- Performance issues with re-renders

---

For more information:
- [Component Documentation](./COMPONENTS.md)
- [API Documentation](./API.md)
- [Main README](../README.md)
