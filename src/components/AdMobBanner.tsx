import React from 'react';
import { ExternalLink, Info } from 'lucide-react';

interface AdMobBannerProps {
  enabled: boolean;
}

export const AdMobBanner: React.FC<AdMobBannerProps> = ({ enabled }) => {
  if (!enabled) {
    return (
      <div 
        id="admob-banner-disabled"
        className="w-full bg-slate-950 border-t border-slate-850 px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-400"
      >
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
          Ad-Free Mode active
        </span>
        <span className="text-slate-500 text-[10px]">Zero Network Requests</span>
      </div>
    );
  }

  return (
    <aside 
      id="admob-banner-container" 
      aria-label="Advertisement"
      className="w-full bg-slate-950 border-t border-slate-800/80 pt-1 pb-1.5 px-3 flex flex-col items-center select-none"
    >
      {/* Ad Attribution badge strictly separated from content */}
      <div className="w-full max-w-md flex items-center justify-between text-[10px] text-slate-400 px-1 mb-1">
        <span className="font-semibold uppercase tracking-wider bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[9px] border border-slate-700">
          Ad · Google AdMob
        </span>
        <span className="flex items-center gap-1 text-slate-400 hover:text-slate-300 cursor-default">
          <Info className="w-3 h-3" />
          Test Ad
        </span>
      </div>

      {/* 320x50 standard banner frame with safe padding */}
      <div 
        id="admob-banner-content"
        className="w-full max-w-[360px] h-[50px] bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between px-3 shadow-sm overflow-hidden"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400 font-bold text-xs">
            BT
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-slate-200 line-clamp-1">Train Your Mind Daily</p>
            <p className="text-[10px] text-slate-400 line-clamp-1">Riddles & Logic Puzzles</p>
          </div>
        </div>
        <button 
          id="admob-banner-install-btn"
          type="button"
          onClick={() => {}}
          className="px-2.5 py-1 text-[11px] font-semibold text-indigo-300 bg-indigo-950/80 border border-indigo-700/50 rounded-md hover:bg-indigo-900/90 transition-colors flex items-center gap-1 shrink-0"
        >
          <span>Install</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </button>
      </div>
    </aside>
  );
};
