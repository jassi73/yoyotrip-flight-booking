import React from 'react';

interface QrCodeGraphicProps {
  value: string;
}

export const QrCodeGraphic: React.FC<QrCodeGraphicProps> = ({ value }) => {
  return (
    <div className="flex flex-col items-center justify-center p-3 bg-slate-50 border border-slate-200 rounded-2xl">
      <div className="w-24 h-24 bg-white p-2 border border-slate-300 rounded-xl flex items-center justify-center shadow-xs">
        {/* SVG QR Code Simulation */}
        <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
          <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" />
          <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" />
          <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" />
          <rect x="40" y="10" width="10" height="20" />
          <rect x="10" y="40" width="20" height="10" />
          <rect x="40" y="40" width="20" height="20" />
          <rect x="70" y="40" width="20" height="10" />
          <rect x="50" y="70" width="20" height="20" />
          <rect x="80" y="70" width="15" height="15" />
        </svg>
      </div>
      <span className="text-[10px] font-mono font-bold text-slate-500 mt-1.5 uppercase">
        {value}
      </span>
    </div>
  );
};
