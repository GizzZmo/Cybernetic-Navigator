import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import StatusBar from './components/StatusBar';
import { AddressBarPanel, SummarizerPanel, ThemeGeneratorPanel, HelpPanel, ViewportPanel, SettingsPanel, BookmarksPanel } from './components/AIPanels';
import { CyberButton } from './components/common/CyberElements';
import type { Theme, PanelType, Bookmark } from './types';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>({
    primaryColor: '#03d8f3',
    accentColor: '#fcee0c',
    textColor: '#e0e0e0',
    backgroundColor: '#1a1a2e',
  });
  const [activeSidePanel, setActiveSidePanel] = useState<PanelType>('SEARCH');
  const [sessionApiKey, setSessionApiKey] = useState<string>(
    () => localStorage.getItem('cyber-navigator-apikey') || ''
  );
  
  const [viewportUrl, setViewportUrl] = useState('https://www.google.com/webhp?igu=1');
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    try {
      const saved = localStorage.getItem('cyber-navigator-bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to parse bookmarks from localStorage", error);
      return [];
    }
  });
  
  const [history, setHistory] = useState<string[]>(() => {
    try {
        const saved = localStorage.getItem('cyber-navigator-history');
        return saved ? JSON.parse(saved) : [];
    } catch (error) {
        console.error("Failed to parse history from localStorage", error);
        return [];
    }
  });

  const [sidebarWidth, setSidebarWidth] = useState(450);
  const isResizing = useRef(false);
  const mainContentRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (sessionApiKey) {
      localStorage.setItem('cyber-navigator-apikey', sessionApiKey);
    } else {
      localStorage.removeItem('cyber-navigator-apikey');
    }
  }, [sessionApiKey]);
  
  useEffect(() => {
    try {
      localStorage.setItem('cyber-navigator-bookmarks', JSON.stringify(bookmarks));
    } catch (error) {
      console.error("Failed to save bookmarks to localStorage", error);
    }
  }, [bookmarks]);
  
  useEffect(() => {
    try {
        localStorage.setItem('cyber-navigator-history', JSON.stringify(history));
    } catch (error) {
        console.error("Failed to save history to localStorage", error);
    }
  }, [history]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--accent-color', theme.accentColor);
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--background-color', theme.backgroundColor);
    root.style.setProperty('--background-color-transparent', `${theme.backgroundColor}d9`); // Add ~85% alpha
    root.style.setProperty('--glow-color', theme.primaryColor);
    
    const hex = theme.primaryColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    root.style.setProperty('--border-color', `rgba(${r}, ${g}, ${b}, 0.3)`);

  }, [theme]);
  
  const handleUrlChange = useCallback((newUrl: string) => {
    setViewportUrl(newUrl);

    setHistory(prevHistory => {
        if (prevHistory[0] === newUrl) {
            return prevHistory;
        }
        const updatedHistory = [newUrl, ...prevHistory];
        return updatedHistory.slice(0, 50); // Keep last 50
    });
  }, []);

  const handleAddBookmark = useCallback((url: string) => {
    if (!url || url.trim() === '') return;
    
    const isBookmarked = bookmarks.some(b => b.url === url);
    if (isBookmarked) {
        setBookmarks(prev => prev.filter(b => b.url !== url));
    } else {
        const newBookmark: Bookmark = {
          id: `bm-${Date.now()}`,
          url,
        };
        setBookmarks(prev => [newBookmark, ...prev]);
    }
  }, [bookmarks]);

  const handleDeleteBookmark = useCallback((id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isResizing.current && mainContentRef.current) {
        const newWidth = e.clientX - mainContentRef.current.offsetLeft;
        const minWidth = 350;
        const maxWidth = mainContentRef.current.offsetWidth - 400;
        setSidebarWidth(Math.max(minWidth, Math.min(newWidth, maxWidth)));
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const handleThemeGenerated = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
  }, []);
  
  const handleNavigate = useCallback((url: string) => {
    handleUrlChange(url);
  }, [handleUrlChange]);

  const renderActiveSidePanel = () => {
    switch (activeSidePanel) {
      case 'SEARCH':
        return <AddressBarPanel sessionApiKey={sessionApiKey} />;
      case 'SUMMARIZE':
        return <SummarizerPanel sessionApiKey={sessionApiKey} />;
      case 'THEME':
        return <ThemeGeneratorPanel onThemeGenerated={handleThemeGenerated} sessionApiKey={sessionApiKey} />;
      case 'BOOKMARKS':
        return <BookmarksPanel bookmarks={bookmarks} onDelete={handleDeleteBookmark} onNavigate={handleNavigate} />;
      case 'SETTINGS':
        return <SettingsPanel sessionApiKey={sessionApiKey} onApiKeyChange={setSessionApiKey} />;
      case 'HELP':
        return <HelpPanel />;
      default:
        return <AddressBarPanel sessionApiKey={sessionApiKey} />;
    }
  };

  const sidePanelButtons: Exclude<PanelType, 'VIEWPORT'>[] = ['SEARCH', 'SUMMARIZE', 'THEME', 'BOOKMARKS', 'SETTINGS', 'HELP'];

  const backgroundImageUrl = `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${theme.primaryColor.substring(1)}' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`;

  return (
    <div className="min-h-screen w-full flex flex-col p-4 bg-cover bg-center" style={{ backgroundColor: theme.backgroundColor, backgroundImage: `url("${backgroundImageUrl}")`}}>
      <div className="flex flex-col flex-grow w-full border-2 border-[var(--border-color)] bg-[var(--background-color-transparent)] backdrop-blur-md shadow-2xl shadow-black/50 overflow-hidden">
        <Header />
        <main className="flex-grow flex flex-col overflow-hidden">
          <div className="p-2 border-b-2 border-[var(--border-color)] flex space-x-2">
            {sidePanelButtons.map(panel => (
              <CyberButton key={panel} active={activeSidePanel === panel} onClick={() => setActiveSidePanel(panel)}>
                {panel.charAt(0) + panel.slice(1).toLowerCase()}
              </CyberButton>
            ))}
          </div>
          <div ref={mainContentRef} className="flex-grow flex flex-row overflow-hidden">
            <div className="flex-none flex flex-col" style={{ width: `${sidebarWidth}px`}}>
                <div className="flex-grow overflow-y-auto">
                    {renderActiveSidePanel()}
                </div>
            </div>
            <div 
                className="w-2 flex-none cursor-col-resize flex items-center justify-center group"
                onMouseDown={handleMouseDown}
            >
                <div className="w-0.5 h-1/2 bg-[var(--border-color)] group-hover:bg-[var(--primary-color)] transition-colors duration-200"></div>
            </div>
            <div className="flex-grow flex flex-col overflow-hidden">
                <ViewportPanel 
                  url={viewportUrl}
                  onUrlChange={handleUrlChange}
                  onAddBookmark={handleAddBookmark}
                  bookmarks={bookmarks}
                  history={history}
                />
            </div>
          </div>
        </main>
        <StatusBar />
      </div>
    </div>
  );
};

export default App;