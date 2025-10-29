export interface Theme {
  primaryColor: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
}

export interface Bookmark {
  id: string;
  url: string;
}

export type PanelType = 'SEARCH' | 'SUMMARIZE' | 'THEME' | 'HELP' | 'VIEWPORT' | 'SETTINGS' | 'BOOKMARKS';