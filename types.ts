/**
 * @fileoverview Type definitions for Cybernetic Navigator.
 * Contains interfaces and types used throughout the application.
 * 
 * @module types
 */

/**
 * Represents a color theme configuration for the application.
 * All colors should be in hexadecimal format (e.g., "#03d8f3").
 * 
 * @interface Theme
 * @property {string} primaryColor - Primary neon color for borders, highlights, and main UI elements
 * @property {string} accentColor - Secondary accent color for special elements and CTAs
 * @property {string} textColor - Main text color, typically light for dark backgrounds
 * @property {string} backgroundColor - Dark background color for the main interface
 * 
 * @example
 * ```typescript
 * const defaultTheme: Theme = {
 *   primaryColor: '#03d8f3',
 *   accentColor: '#fcee0c',
 *   textColor: '#e0e0e0',
 *   backgroundColor: '#1a1a2e',
 * };
 * ```
 */
export interface Theme {
  primaryColor: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
}

/**
 * Represents a saved bookmark with a unique identifier and URL.
 * 
 * @interface Bookmark
 * @property {string} id - Unique identifier (typically "bm-{timestamp}")
 * @property {string} url - Full URL of the bookmarked page
 * 
 * @example
 * ```typescript
 * const bookmark: Bookmark = {
 *   id: 'bm-1234567890',
 *   url: 'https://example.com'
 * };
 * ```
 */
export interface Bookmark {
  id: string;
  url: string;
}

/**
 * Defines the available panel types in the application.
 * Each type corresponds to a different functional panel in the sidebar.
 * 
 * @typedef {('SEARCH' | 'SUMMARIZE' | 'THEME' | 'HELP' | 'VIEWPORT' | 'SETTINGS' | 'BOOKMARKS')} PanelType
 * 
 * @description
 * - SEARCH: AI-powered search and command panel
 * - SUMMARIZE: Text summarization panel
 * - THEME: AI theme generator panel
 * - HELP: Help and information panel
 * - VIEWPORT: Browser viewport (not directly selectable)
 * - SETTINGS: Application settings and API configuration
 * - BOOKMARKS: Bookmark management panel
 */
export type PanelType = 'SEARCH' | 'SUMMARIZE' | 'THEME' | 'HELP' | 'VIEWPORT' | 'SETTINGS' | 'BOOKMARKS';