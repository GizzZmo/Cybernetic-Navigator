
import React, { useState, useEffect } from 'react';
import { CpuIcon } from './common/CyberElements';

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="text-lg font-bold text-[var(--primary-color)] cyber-glow-text">
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <header 
        className="flex items-center justify-between p-3 border-b-2 border-[var(--border-color)] bg-[var(--background-color-transparent)] backdrop-blur-sm"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 98% 100%, 0 100%, 2% 85%)' }}
    >
      <div className="flex items-center space-x-3">
        <CpuIcon className="w-8 h-8 text-[var(--accent-color)] cyber-glow-hard" />
        <h1 className="text-2xl font-bold uppercase text-[var(--accent-color)] cyber-glow-text">
          Cybernetic Navigator
        </h1>
      </div>
      <div className="flex items-center space-x-4">
          <div className="text-sm uppercase text-[var(--text-color)]">
            {new Date().toLocaleDateString([], { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
          </div>
          <Clock />
      </div>
    </header>
  );
};

export default Header;
