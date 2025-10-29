import React from 'react';

interface CyberButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active?: boolean;
}

export const CyberButton: React.FC<CyberButtonProps> = ({ children, active = false, ...props }) => {
  const baseClasses = "px-4 py-2 font-bold uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--background-color)] focus:ring-[var(--accent-color)]";
  const styleClasses = active
    ? "bg-[var(--primary-color)] text-[var(--background-color)] cyber-glow-hard shadow-lg shadow-[var(--primary-color)]/30"
    : "bg-[var(--background-color-transparent)] text-[var(--primary-color)] border-2 border-[var(--border-color)] hover:border-[var(--primary-color)] hover:text-[var(--background-color)] hover:bg-[var(--primary-color)] hover:shadow-lg hover:shadow-[var(--primary-color)]/30";
  
  return (
    <button
      {...props}
      style={{ clipPath: 'polygon(95% 0, 100% 15%, 100% 100%, 5% 100%, 0 85%, 0 0)' }}
      className={`${baseClasses} ${styleClasses}`}
    >
      {children}
    </button>
  );
};


interface CyberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const CyberInput: React.FC<CyberInputProps> = (props) => {
  return (
    <input
      {...props}
      className="w-full bg-black/50 text-[var(--text-color)] border-2 border-[var(--border-color)] p-3 placeholder:text-[var(--text-color)]/50 focus:outline-none focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] transition-all duration-300"
      style={{ clipPath: 'polygon(98% 0, 100% 25%, 100% 100%, 2% 100%, 0 75%, 0 0)' }}
    />
  );
};

interface CyberTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const CyberTextarea: React.FC<CyberTextareaProps> = (props) => {
  return (
    <textarea
        {...props}
        className="w-full h-48 bg-black/50 text-[var(--text-color)] border-2 border-[var(--border-color)] p-3 placeholder:text-[var(--text-color)]/50 focus:outline-none focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] transition-all duration-300 resize-none"
        style={{ clipPath: 'polygon(99% 0, 100% 10%, 100% 100%, 1% 100%, 0 90%, 0 0)' }}
    />
  );
};


export const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center space-x-2">
    <div className="w-4 h-4 rounded-full animate-pulse bg-[var(--primary-color)]"></div>
    <div className="w-4 h-4 rounded-full animate-pulse delay-200 bg-[var(--primary-color)]"></div>
    <div className="w-4 h-4 rounded-full animate-pulse delay-400 bg-[var(--primary-color)]"></div>
    <span className="text-[var(--primary-color)] ml-2 animate-pulse">Processing...</span>
  </div>
);

export const PowerIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
      <line x1="12" y1="2" x2="12" y2="12"></line>
    </svg>
);

export const CpuIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
        <rect x="9" y="9" width="6" height="6"></rect>
        <line x1="9" y1="1" x2="9" y2="4"></line>
        <line x1="15" y1="1" x2="15" y2="4"></line>
        <line x1="9" y1="20" x2="9" y2="23"></line>
        <line x1="15" y1="20" x2="15" y2="23"></line>
        <line x1="20" y1="9" x2="23" y2="9"></line>
        <line x1="20" y1="14" x2="23" y2="14"></line>
        <line x1="1" y1="9" x2="4" y2="9"></line>
        <line x1="1" y1="14" x2="4" y2="14"></line>
    </svg>
);

export const HelpIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
);

export const GlobeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
);

export const SettingsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.82l-.15.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1 0-2.82l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

export const StarIcon: React.FC<{ className?: string; filled?: boolean }> = ({ className, filled = false }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
);

export const HistoryIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
        <path d="M3 3v5h5"></path>
        <path d="M12 7v5l4 2"></path>
    </svg>
);