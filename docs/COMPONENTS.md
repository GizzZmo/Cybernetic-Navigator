# Component Documentation

This document provides detailed information about all React components in the Cybernetic Navigator application.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Main Components](#main-components)
  - [App](#app)
  - [Header](#header)
  - [StatusBar](#statusbar)
- [Panel Components](#panel-components)
  - [AddressBarPanel](#addressbarpanel)
  - [SummarizerPanel](#summarizerpanel)
  - [ThemeGeneratorPanel](#themegeneratorpanel)
  - [ViewportPanel](#viewportpanel)
  - [BookmarksPanel](#bookmarkspanel)
  - [SettingsPanel](#settingspanel)
  - [HelpPanel](#helppanel)
- [Common Components](#common-components)
  - [CyberButton](#cyberbutton)
  - [CyberInput](#cyberinput)
  - [CyberTextarea](#cybertextarea)
  - [LoadingSpinner](#loadingspinner)
  - [Icons](#icons)
- [Type Definitions](#type-definitions)

## Architecture Overview

The application follows a **component-based architecture** using React functional components with hooks:

```
App (Root)
├── Header
├── Main Content
│   ├── Panel Navigation Buttons
│   ├── Active Side Panel (AddressBar/Summarizer/Theme/etc.)
│   ├── Resize Handle
│   └── ViewportPanel
└── StatusBar
```

### State Management

- **Local State:** Component-specific state using `useState`
- **Persistence:** LocalStorage for bookmarks, history, API keys
- **Props:** Parent-to-child data flow
- **Callbacks:** Child-to-parent communication

### Styling Approach

- **CSS Variables** for theming (dynamic color schemes)
- **Utility Classes** via inline styles and className
- **Cyberpunk Aesthetic** with neon glows and dark themes

## Main Components

### App

**Location:** `App.tsx`

The root component that manages global state and layout.

**Responsibilities:**
- Theme management and application
- Panel navigation
- URL and bookmark management
- Browsing history tracking
- Resizable panel logic

**State:**
```typescript
const [theme, setTheme] = useState<Theme>({...});
const [activeSidePanel, setActiveSidePanel] = useState<PanelType>('SEARCH');
const [sessionApiKey, setSessionApiKey] = useState<string>('');
const [viewportUrl, setViewportUrl] = useState('https://www.google.com/webhp?igu=1');
const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
const [history, setHistory] = useState<string[]>([]);
const [sidebarWidth, setSidebarWidth] = useState(450);
```

**Key Features:**
- CSS variable injection for dynamic theming
- LocalStorage persistence for bookmarks, history, and API key
- Resizable sidebar with drag handle
- Panel switching logic

**Props:** None (root component)

**CSS Variables Set:**
- `--primary-color`
- `--accent-color`
- `--text-color`
- `--background-color`
- `--background-color-transparent`
- `--glow-color`
- `--border-color`

---

### Header

**Location:** `components/Header.tsx`

Displays the application header with branding.

**Responsibilities:**
- Show application title
- Display cyberpunk-styled branding

**Props:** None

**Example:**
```tsx
<Header />
```

---

### StatusBar

**Location:** `components/StatusBar.tsx`

Bottom status bar showing system information.

**Responsibilities:**
- Display status information
- Show connection state
- Provide footer branding

**Props:** None

**Example:**
```tsx
<StatusBar />
```

## Panel Components

### AddressBarPanel

**Location:** `components/AIPanels.tsx`

AI-powered search and command panel.

**Props:**
```typescript
interface AddressBarPanelProps {
  sessionApiKey?: string;
}
```

**State:**
```typescript
const [prompt, setPrompt] = useState('');
const [response, setResponse] = useState('');
const [isLoading, setIsLoading] = useState(false);
```

**Features:**
- Natural language query input
- AI-powered responses
- Loading state during API calls
- Enter key support for quick execution

**Usage:**
```tsx
<AddressBarPanel sessionApiKey={apiKey} />
```

**User Interactions:**
1. Enter search query or command
2. Click "Execute" or press Enter
3. View AI-generated response

---

### SummarizerPanel

**Location:** `components/AIPanels.tsx`

Text summarization panel with history.

**Props:**
```typescript
interface SummarizerPanelProps {
  sessionApiKey?: string;
}
```

**State:**
```typescript
const [text, setText] = useState('');
const [summary, setSummary] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [history, setHistory] = useState<SummaryHistoryItem[]>([]);
```

**Types:**
```typescript
interface SummaryHistoryItem {
  id: string;
  text: string;
  summary: string;
  timestamp: number;
}
```

**Features:**
- Large text input area
- AI-powered summarization
- History of past summarizations (last 50)
- Persistent history via localStorage
- Click history item to restore

**Usage:**
```tsx
<SummarizerPanel sessionApiKey={apiKey} />
```

**LocalStorage Key:** `summarizer-history`

---

### ThemeGeneratorPanel

**Location:** `components/AIPanels.tsx`

AI-powered theme generation panel.

**Props:**
```typescript
interface ThemeGeneratorPanelProps {
  onThemeGenerated: (theme: Theme) => void;
  sessionApiKey?: string;
}
```

**State:**
```typescript
const [prompt, setPrompt] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);
```

**Features:**
- Text prompt for theme description
- AI-generated color schemes
- Theme preview before applying
- One-click theme application
- Loading state during generation

**Usage:**
```tsx
<ThemeGeneratorPanel 
  onThemeGenerated={handleThemeGenerated}
  sessionApiKey={apiKey}
/>
```

**Example Prompts:**
- "neon green matrix style"
- "deep ocean blues"
- "sunset cyberpunk"
- "purple and gold luxury"

---

### ViewportPanel

**Location:** `components/AIPanels.tsx`

Browser viewport simulation with navigation controls.

**Props:**
```typescript
interface ViewportPanelProps {
  url: string;
  onUrlChange: (url: string) => void;
  onAddBookmark: (url: string) => void;
  bookmarks: Bookmark[];
  history: string[];
}
```

**State:**
```typescript
const [inputUrl, setInputUrl] = useState(url);
```

**Features:**
- URL address bar with validation
- Go/Navigate button
- Bookmark toggle (star icon)
- History dropdown
- Embedded iframe for URL display
- Input synchronization with props

**Usage:**
```tsx
<ViewportPanel
  url={currentUrl}
  onUrlChange={handleUrlChange}
  onAddBookmark={handleAddBookmark}
  bookmarks={bookmarks}
  history={history}
/>
```

**URL Validation:**
- Checks for http:// or https:// protocol
- Auto-prepends "https://" if missing

---

### BookmarksPanel

**Location:** `components/AIPanels.tsx`

Bookmark management and navigation panel.

**Props:**
```typescript
interface BookmarksPanelProps {
  bookmarks: Bookmark[];
  onDelete: (id: string) => void;
  onNavigate: (url: string) => void;
}
```

**Features:**
- List all saved bookmarks
- Click to navigate to bookmarked URL
- Delete individual bookmarks
- Empty state message
- URL truncation for long addresses

**Usage:**
```tsx
<BookmarksPanel
  bookmarks={bookmarks}
  onDelete={handleDeleteBookmark}
  onNavigate={handleNavigate}
/>
```

---

### SettingsPanel

**Location:** `components/AIPanels.tsx`

Application settings and configuration.

**Props:**
```typescript
interface SettingsPanelProps {
  sessionApiKey: string;
  onApiKeyChange: (key: string) => void;
}
```

**State:**
```typescript
const [apiKeyInput, setApiKeyInput] = useState(sessionApiKey);
const [showKey, setShowKey] = useState(false);
```

**Features:**
- API key configuration
- Show/hide API key toggle
- Save API key to localStorage
- Clear API key option
- Instructions and help text
- Link to obtain API key

**Usage:**
```tsx
<SettingsPanel
  sessionApiKey={currentApiKey}
  onApiKeyChange={setSessionApiKey}
/>
```

**Security:**
- Password-type input by default
- Toggle to text for verification
- Stored in localStorage (not server)

---

### HelpPanel

**Location:** `components/AIPanels.tsx`

Help and usage information panel.

**Props:** None

**Features:**
- Feature descriptions
- Usage instructions
- Keyboard shortcuts (if implemented)
- Tips and tricks
- Links to documentation

**Usage:**
```tsx
<HelpPanel />
```

## Common Components

### CyberButton

**Location:** `components/common/CyberElements.tsx`

Styled button with cyberpunk aesthetic.

**Props:**
```typescript
interface CyberButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}
```

**Features:**
- Neon border on hover
- Glow effect
- Active state styling
- Disabled state
- Smooth transitions

**Usage:**
```tsx
<CyberButton onClick={handleClick} active={isActive}>
  Execute
</CyberButton>
```

**Styling:**
- Uses `--primary-color` for effects
- Dark background with transparency
- Uppercase text transform

---

### CyberInput

**Location:** `components/common/CyberElements.tsx`

Styled text input with cyberpunk aesthetic.

**Props:**
```typescript
interface CyberInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  className?: string;
}
```

**Features:**
- Neon border glow on focus
- Dark background
- Placeholder styling
- Full width by default

**Usage:**
```tsx
<CyberInput
  type="text"
  value={input}
  onChange={(e) => setInput(e.target.value)}
  placeholder="Enter text..."
/>
```

---

### CyberTextarea

**Location:** `components/common/CyberElements.tsx`

Styled textarea for multi-line input.

**Props:**
```typescript
interface CyberTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  className?: string;
}
```

**Features:**
- Same styling as CyberInput
- Configurable rows
- Resize: vertical only

**Usage:**
```tsx
<CyberTextarea
  value={text}
  onChange={(e) => setText(e.target.value)}
  rows={10}
  placeholder="Paste text here..."
/>
```

---

### LoadingSpinner

**Location:** `components/common/CyberElements.tsx`

Animated loading indicator.

**Props:** None

**Features:**
- Spinning animation
- Neon color from theme
- Centered display

**Usage:**
```tsx
{isLoading && <LoadingSpinner />}
```

**Animation:**
- 1-second rotation cycle
- Infinite loop
- Uses CSS animations

---

### Icons

**Location:** `components/common/CyberElements.tsx`

SVG icon components with consistent styling.

#### Available Icons:
- `HelpIcon` - Question mark for help
- `GlobeIcon` - Globe for web/navigation
- `SettingsIcon` - Gear for settings
- `StarIcon` - Star for bookmarks
- `TrashIcon` - Trash can for delete
- `HistoryIcon` - Clock for history

**Props (all icons):**
```typescript
interface IconProps {
  className?: string;
  size?: number;
}
```

**Default Size:** 24px

**Usage:**
```tsx
<StarIcon size={20} className="custom-class" />
<TrashIcon size={16} />
```

**Styling:**
- `currentColor` fill (inherits text color)
- Inline by default
- Can be customized with className

## Type Definitions

**Location:** `types.ts`

### Theme

```typescript
interface Theme {
  primaryColor: string;    // Hex color (e.g., "#03d8f3")
  accentColor: string;     // Hex color (e.g., "#fcee0c")
  textColor: string;       // Hex color (e.g., "#e0e0e0")
  backgroundColor: string; // Hex color (e.g., "#1a1a2e")
}
```

### Bookmark

```typescript
interface Bookmark {
  id: string;  // Unique identifier (e.g., "bm-1234567890")
  url: string; // Full URL
}
```

### PanelType

```typescript
type PanelType = 
  | 'SEARCH'      // AI Search panel
  | 'SUMMARIZE'   // Text summarization
  | 'THEME'       // Theme generator
  | 'HELP'        // Help information
  | 'VIEWPORT'    // Browser viewport
  | 'SETTINGS'    // Settings configuration
  | 'BOOKMARKS';  // Bookmarks management
```

## Component Communication Patterns

### Parent to Child
```tsx
// Pass data via props
<ChildComponent data={parentData} />
```

### Child to Parent
```tsx
// Pass callback functions
<ChildComponent onAction={handleAction} />

// In child:
props.onAction(data);
```

### Sibling Communication
```tsx
// Through parent state
const Parent = () => {
  const [sharedState, setSharedState] = useState(null);
  
  return (
    <>
      <Child1 onUpdate={setSharedState} />
      <Child2 data={sharedState} />
    </>
  );
};
```

## Best Practices

### Component Design
1. **Single Responsibility** - Each component does one thing well
2. **Prop Types** - Always use TypeScript interfaces
3. **Error Handling** - Handle edge cases gracefully
4. **Loading States** - Show feedback for async operations
5. **Accessibility** - Use semantic HTML and ARIA labels

### State Management
1. **Keep state local** when possible
2. **Lift state up** only when necessary
3. **Use callbacks** for parent communication
4. **Persist important data** to localStorage

### Performance
1. **Use `useCallback`** for event handlers passed as props
2. **Use `useMemo`** for expensive computations
3. **Avoid inline functions** in render (when passed as props)
4. **Debounce rapid updates** for expensive operations

### Styling
1. **Use CSS variables** for dynamic theming
2. **Maintain cyberpunk aesthetic** in all components
3. **Ensure responsive design** on all screen sizes
4. **Test with different themes** for compatibility

## Testing Guidelines

### Component Testing Checklist

For each component, verify:
- ✅ Renders without errors
- ✅ Props are correctly typed
- ✅ State updates work as expected
- ✅ Event handlers trigger correctly
- ✅ Loading states display properly
- ✅ Error states are handled
- ✅ Edge cases are covered
- ✅ Accessibility is maintained
- ✅ Theme changes apply correctly

### Manual Testing

1. **Visual Testing**
   - Check appearance with default theme
   - Test with AI-generated themes
   - Verify responsive behavior
   - Check animations and transitions

2. **Functional Testing**
   - Test all user interactions
   - Verify data persistence
   - Test error scenarios
   - Test with and without API key

3. **Integration Testing**
   - Test component communication
   - Verify parent-child data flow
   - Test localStorage integration
   - Test API integration

## Common Issues & Solutions

### Issue: Component Not Re-rendering

**Solution:**
- Ensure state is updated immutably
- Check if props are changing reference
- Use React DevTools to inspect state

### Issue: LocalStorage Not Persisting

**Solution:**
- Verify localStorage key names
- Check for JSON parsing errors
- Ensure useEffect dependencies are correct

### Issue: Theme Not Applying

**Solution:**
- Check CSS variable names match
- Verify theme object has all required properties
- Ensure hex colors are valid

### Issue: API Calls Failing

**Solution:**
- Verify API key is configured
- Check network tab for errors
- Ensure error handling is in place

---

For more information:
- [API Documentation](./API.md)
- [Architecture Overview](./ARCHITECTURE.md)
- [Main README](../README.md)
