
import React from 'react';
import { PowerIcon } from './common/CyberElements';

const StatusBar: React.FC = () => {
  return (
    <footer className="flex items-center justify-between p-2 border-t-2 border-[var(--border-color)] bg-[var(--background-color-transparent)] text-sm uppercase text-[var(--text-color)]/80">
      <div className="flex items-center space-x-2">
        <PowerIcon className="w-4 h-4 text-green-400 animate-pulse" />
        <span>SYSTEM: ONLINE</span>
      </div>
      <span>AI CORE: ACTIVE</span>
      <span>CONN_TYPE: QUANTUM_ENTANGLEMENT</span>
      <span>// READY</span>
    </footer>
  );
};

export default StatusBar;
