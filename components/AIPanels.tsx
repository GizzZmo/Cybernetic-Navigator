import React, { useState, useCallback, useEffect, useRef } from 'react';
import { smartSearch, summarizeText, generateTheme } from '../services/geminiService';
import { CyberButton, CyberInput, CyberTextarea, LoadingSpinner, HelpIcon, GlobeIcon, SettingsIcon, StarIcon, TrashIcon, HistoryIcon } from './common/CyberElements';
import type { Theme, Bookmark } from '../types';

interface AddressBarPanelProps {
  sessionApiKey?: string;
}

export const AddressBarPanel: React.FC<AddressBarPanelProps> = ({ sessionApiKey }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(async () => {
    if (!prompt) return;
    setIsLoading(true);
    setResponse('');
    const result = await smartSearch(prompt, sessionApiKey);
    setResponse(result);
    setIsLoading(false);
  }, [prompt, sessionApiKey]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl text-[var(--accent-color)] cyber-glow-text uppercase">AI Search & Command</h2>
      <div className="flex space-x-2">
        <CyberInput
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter search query or command..."
          disabled={isLoading}
        />
        <CyberButton onClick={handleSearch} disabled={isLoading}>
          Execute
        </CyberButton>
      </div>
      {isLoading && <LoadingSpinner />}
      {response && (
        <div className="p-4 border-2 border-[var(--border-color)] bg-black/30 whitespace-pre-wrap leading-relaxed text-[var(--text-color)]">
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

interface SummarizerPanelProps {
    sessionApiKey?: string;
}

interface SummaryHistoryItem {
  id: string;
  text: string;
  summary: string;
  timestamp: number;
}

export const SummarizerPanel: React.FC<SummarizerPanelProps> = ({ sessionApiKey }) => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<SummaryHistoryItem[]>([]);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('summarizer-history');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error("Failed to parse summarizer history from localStorage", error);
      localStorage.removeItem('summarizer-history');
    }
  }, []);

  const handleSummarize = useCallback(async () => {
    if (!text) return;
    setIsLoading(true);
    setSummary('');
    const result = await summarizeText(text, sessionApiKey);
    setSummary(result);
    setIsLoading(false);

    if (!result.startsWith("Error:") && result.trim() !== "No text provided to summarize.") {
        const newHistoryItem: SummaryHistoryItem = {
          id: `sum-${Date.now()}`,
          text,
          summary: result,
          timestamp: Date.now(),
        };
        const updatedHistory = [newHistoryItem, ...history].slice(0, 50); // Keep last 50
        setHistory(updatedHistory);
        localStorage.setItem('summarizer-history', JSON.stringify(updatedHistory));
      }
  }, [text, sessionApiKey, history]);
  
  const handleSelectHistory = (item: SummaryHistoryItem) => {
    setText(item.text);
    setSummary(item.summary);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('summarizer-history');
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl text-[var(--accent-color)] cyber-glow-text uppercase">Text Summarizer</h2>
      <CyberTextarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste text here to summarize..."
        disabled={isLoading}
      />
      <div className="flex items-center space-x-4">
        <CyberButton onClick={handleSummarize} disabled={isLoading || !text}>
          Summarize
        </CyberButton>
        {isLoading && <LoadingSpinner />}
      </div>
      {summary && (
        <div className="p-4 border-2 border-[var(--border-color)] bg-black/30 whitespace-pre-wrap leading-relaxed text-[var(--text-color)]">
          <p>{summary}</p>
        </div>
      )}
      
      <div className="pt-4 mt-4 border-t-2 border-[var(--border-color)]">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg text-[var(--accent-color)]/80 cyber-glow-text uppercase">History</h3>
            {history.length > 0 && (
            <CyberButton onClick={handleClearHistory} className="!px-3 !py-1 !text-xs">
                Clear All
            </CyberButton>
            )}
        </div>
        {history.length === 0 ? (
            <p className="text-[var(--text-color)]/50 italic">No past summaries recorded.</p>
        ) : (
            <ul className="space-y-1 max-h-52 overflow-y-auto pr-2">
            {history.map((item) => (
                <li
                key={item.id}
                onClick={() => handleSelectHistory(item)}
                className="p-2 border border-[var(--border-color)] bg-black/20 cursor-pointer hover:bg-[var(--primary-color)]/10 hover:border-[var(--primary-color)]/50 transition-all duration-200"
                style={{ clipPath: 'polygon(98% 0, 100% 20%, 100% 100%, 2% 100%, 0 80%, 0 0)' }}
                role="button"
                aria-label={`Restore summary from ${new Date(item.timestamp).toLocaleString()}`}
                >
                <p className="text-sm text-[var(--text-color)] truncate" title={item.text}>
                    {item.text}
                </p>
                <p className="text-xs text-[var(--text-color)]/60 mt-1">
                    {new Date(item.timestamp).toLocaleString()}
                </p>
                </li>
            ))}
            </ul>
        )}
      </div>
    </div>
  );
};

interface ThemeGeneratorPanelProps {
  onThemeGenerated: (theme: Theme) => void;
  sessionApiKey?: string;
}

export const ThemeGeneratorPanel: React.FC<ThemeGeneratorPanelProps> = ({ onThemeGenerated, sessionApiKey }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = useCallback(async () => {
    if (!prompt) return;
    setIsLoading(true);
    setError('');
    const newTheme = await generateTheme(prompt, sessionApiKey);
    if (newTheme) {
      onThemeGenerated(newTheme);
    } else {
      setError('Failed to generate theme. AI core may be unstable or API key is invalid. Try a different prompt.');
    }
    setIsLoading(false);
  }, [prompt, onThemeGenerated, sessionApiKey]);
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl text-[var(--accent-color)] cyber-glow-text uppercase">AI Theme Generator</h2>
      <p className="text-[var(--text-color)]/80">Describe a theme, e.g., "vaporwave sunset", "toxic waste green", "data stream blue".</p>
      <div className="flex space-x-2">
        <CyberInput
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter theme prompt..."
          disabled={isLoading}
        />
        <CyberButton onClick={handleGenerate} disabled={isLoading}>
          Generate
        </CyberButton>
      </div>
      {isLoading && <LoadingSpinner />}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export const HelpPanel: React.FC = () => {
  return (
    <div className="p-6 space-y-6 text-[var(--text-color)]/90 leading-relaxed max-w-4xl mx-auto">
      <h2 className="text-2xl text-[var(--accent-color)] cyber-glow-text uppercase flex items-center gap-3">
        <HelpIcon className="w-7 h-7" />
        System Manual // Help
      </h2>

      <div className="space-y-4 p-4 border-l-2 border-[var(--primary-color)]/50">
        <h3 className="text-xl text-[var(--primary-color)] cyber-glow-text uppercase">AI Core Modules</h3>
        <p>The Cybernetic Navigator integrates several AI modules to augment your browsing experience. Access them via the main panel selectors.</p>
        <ul className="list-disc list-inside space-y-2 pl-4">
           <li>
            <strong className="text-[var(--accent-color)]/90">Viewport:</strong> The main web rendering interface. Load any URL for direct browsing.
          </li>
          <li>
            <strong className="text-[var(--accent-color)]/90">Search & Command:</strong> Submit any query or command. The AI will respond as a futuristic assistant from within the cyberpunk universe.
          </li>
          <li>
            <strong className="text-[var(--accent-color)]/90">Summarizer:</strong> Paste long-form text to receive a concise, bulleted summary, ideal for quick data assimilation.
          </li>
          <li>
            <strong className="text-[var(--accent-color)]/90">Theme Gen:</strong> Generate a new visual theme for the browser by providing a descriptive prompt (e.g., "deep sea bioluminescence", "glitching city neon", "amber terminal").
          </li>
        </ul>
      </div>

      <div className="space-y-4 p-4 border-l-2 border-[var(--primary-color)]/50">
        <h3 className="text-xl text-[var(--primary-color)] cyber-glow-text uppercase">System Configuration</h3>
        <p className="font-bold text-amber-400">API Key Configuration</p>
        <p>For full functionality, a Google Gemini API key is required. You can provide one in the 'Settings' panel. This key is stored securely in your browser's local storage and is never transmitted anywhere except to the Google AI services.</p>
        <p>Alternatively, the application can be run in a secure environment where the key is provided as a host-level environment variable (`API_KEY`).</p>
      </div>
      
       <div className="space-y-2 p-4 border-l-2 border-[var(--primary-color)]/50">
        <h3 className="text-xl text-[var(--primary-color)] cyber-glow-text uppercase">About</h3>
        <p>This application is a simulation of an advanced, AI-driven web browser built with a distinctive cyberpunk aesthetic. It leverages on-device AI models for privacy and performance, wrapped in an immersive and thematic user interface.</p>
      </div>
    </div>
  );
};

interface ViewportPanelProps {
  url: string;
  onUrlChange: (url: string) => void;
  onAddBookmark: (url: string) => void;
  bookmarks: Bookmark[];
  history: string[];
}

export const ViewportPanel: React.FC<ViewportPanelProps> = ({ url, onUrlChange, onAddBookmark, bookmarks, history }) => {
  const [inputUrl, setInputUrl] = useState(url);
  const [isLoading, setIsLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);

  const isBookmarked = bookmarks.some(b => b.url === url);

  useEffect(() => {
    setInputUrl(url);
    setIsLoading(true);
  }, [url]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (historyRef.current && !historyRef.current.contains(event.target as Node)) {
            setShowHistory(false);
        }
    };
    if (showHistory) {
        document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showHistory]);

  const handleLoadUrl = useCallback(() => {
    if (!inputUrl) return;
    let correctedUrl = inputUrl.trim();
    if (!/^https?:\/\//i.test(correctedUrl)) {
      correctedUrl = `https://${correctedUrl}`;
    }
    onUrlChange(correctedUrl);
  }, [inputUrl, onUrlChange]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLoadUrl();
    }
  };
  
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="p-4 flex flex-col flex-grow">
      <div className="flex space-x-2 mb-4 relative" ref={historyRef}>
        <div className="flex-none p-3 border-2 border-[var(--border-color)] bg-black/50" style={{ clipPath: 'polygon(90% 0, 100% 35%, 100% 100%, 10% 100%, 0 65%, 0 0)' }}>
            <GlobeIcon className="w-6 h-6 text-[var(--primary-color)]" />
        </div>
        <CyberInput
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter URL and press Enter..."
          disabled={isLoading}
        />
        <CyberButton 
          onClick={() => onAddBookmark(url)} 
          disabled={isLoading} 
          className="!px-3"
          title={isBookmarked ? "URL is bookmarked" : "Bookmark this URL"}
        >
          <StarIcon filled={isBookmarked} className="w-5 h-5" />
        </CyberButton>
        <CyberButton
            onClick={() => setShowHistory(prev => !prev)}
            disabled={isLoading || history.length === 0}
            className="!px-3"
            title="View visited URLs history"
        >
            <HistoryIcon className="w-5 h-5" />
        </CyberButton>
        <CyberButton onClick={handleLoadUrl} disabled={isLoading}>
          Load
        </CyberButton>
        
        {showHistory && (
          <div 
            className="absolute top-full mt-2 w-full max-h-60 overflow-y-auto z-20 bg-[var(--background-color)] border-2 border-[var(--border-color)] p-2"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 5% 100%, 0 95%)' }}
          >
            {history.length === 0 ? (
                <p className="p-2 text-sm text-[var(--text-color)]/50 italic">No history recorded.</p>
            ) : (
                <ul className="space-y-1">
                {history.map((histUrl, index) => (
                    <li
                    key={`${histUrl}-${index}`}
                    onClick={() => {
                        onUrlChange(histUrl);
                        setShowHistory(false);
                    }}
                    className="p-2 text-sm text-[var(--text-color)] truncate cursor-pointer hover:bg-[var(--primary-color)]/20 hover:text-[var(--primary-color)] transition-colors"
                    title={histUrl}
                    >
                    {histUrl}
                    </li>
                ))}
                </ul>
            )}
          </div>
        )}
      </div>
      <div className="flex-grow border-2 border-[var(--border-color)] bg-black/50 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--background-color-transparent)] z-10">
            <LoadingSpinner />
          </div>
        )}
        <iframe
          src={url}
          onLoad={handleIframeLoad}
          onError={() => setIsLoading(false)}
          title="Web Viewport"
          className="w-full h-full bg-white"
          sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts"
        ></iframe>
      </div>
    </div>
  );
};

interface BookmarksPanelProps {
  bookmarks: Bookmark[];
  onDelete: (id: string) => void;
  onNavigate: (url: string) => void;
}

export const BookmarksPanel: React.FC<BookmarksPanelProps> = ({ bookmarks, onDelete, onNavigate }) => {
    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl text-[var(--accent-color)] cyber-glow-text uppercase">Bookmarks</h2>
            {bookmarks.length === 0 ? (
                <p className="text-[var(--text-color)]/50 italic">No bookmarks saved.</p>
            ) : (
                <ul className="space-y-2">
                {bookmarks.map((bookmark) => (
                    <li
                    key={bookmark.id}
                    className="p-2 border border-[var(--border-color)] bg-black/20 flex items-center justify-between gap-2 transition-all duration-200"
                    style={{ clipPath: 'polygon(98% 0, 100% 20%, 100% 100%, 2% 100%, 0 80%, 0 0)' }}
                    >
                    <p 
                        className="text-sm text-[var(--text-color)] truncate flex-grow cursor-pointer hover:text-[var(--primary-color)]" 
                        title={bookmark.url}
                        onClick={() => onNavigate(bookmark.url)}
                    >
                        {bookmark.url}
                    </p>
                    <button 
                        onClick={() => onDelete(bookmark.id)} 
                        className="p-1 text-[var(--text-color)]/50 hover:text-red-500 transition-colors"
                        title="Delete bookmark"
                    >
                        <TrashIcon className="w-4 h-4" />
                    </button>
                    </li>
                ))}
                </ul>
            )}
        </div>
    );
};

interface SettingsPanelProps {
  sessionApiKey: string;
  onApiKeyChange: (key: string) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ sessionApiKey, onApiKeyChange }) => {
  const [localKey, setLocalKey] = useState(sessionApiKey);
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = () => {
    onApiKeyChange(localKey);
    setSaveMessage('API Key saved to local browser storage.');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="p-6 space-y-6 text-[var(--text-color)]/90 leading-relaxed max-w-4xl mx-auto">
      <h2 className="text-2xl text-[var(--accent-color)] cyber-glow-text uppercase flex items-center gap-3">
        <SettingsIcon className="w-7 h-7" />
        System Configuration
      </h2>

      <div className="space-y-4 p-4 border-l-2 border-[var(--primary-color)]/50">
        <h3 className="text-xl text-[var(--primary-color)] cyber-glow-text uppercase">Gemini API Key</h3>
        <p>Enter your Google Gemini API key below. The key will be stored in your browser's local storage and used for all AI-powered features.</p>
        
        <div className="p-3 my-2 bg-yellow-900/50 border border-yellow-500/50 text-yellow-300">
            <strong>Security Warning:</strong> Never share your API key. While it is stored locally, be cautious when using public or untrusted computers.
        </div>
        
        <div className="flex space-x-2 items-center">
            <CyberInput
            type="password"
            value={localKey}
            onChange={(e) => setLocalKey(e.target.value)}
            placeholder="Enter your Gemini API key..."
            />
            <CyberButton onClick={handleSave}>
            Save Key
            </CyberButton>
        </div>
        {saveMessage && <p className="text-green-400 animate-pulse">{saveMessage}</p>}
      </div>
    </div>
  );
};