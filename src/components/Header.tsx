import React, { useEffect, useState } from 'react';
import { 
  Flame, 
  Search, 
  BarChart3, 
  Settings, 
  Smartphone,
  Maximize2,
  Headphones,
  Brain
} from 'lucide-react';
import { sound } from '../services/sound';
import { music } from '../services/music';

interface HeaderProps {
  streak: number;
  onOpenDaily: () => void;
  onOpenSearch: () => void;
  onOpenStats: () => void;
  onOpenSettings: () => void;
  onOpenMusic: () => void;
  musicPlaying: boolean;
  soundEnabled: boolean;
  soundVolume: number;
  isDeviceFramed: boolean;
  onToggleFrame: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  streak,
  onOpenDaily,
  onOpenSearch,
  onOpenStats,
  onOpenSettings,
  onOpenMusic,
  musicPlaying,
  soundEnabled,
  soundVolume,
  isDeviceFramed,
  onToggleFrame
}) => {
  const [bars, setBars] = useState<number[]>([0.3, 0.6, 0.4]);

  // Animated visualizer bars tick when music is playing
  useEffect(() => {
    if (!musicPlaying) return;
    const interval = setInterval(() => {
      const levels = music.getFrequencyLevels(3);
      setBars(levels);
    }, 100);
    return () => clearInterval(interval);
  }, [musicPlaying]);

  return (
    <header id="app-header" className="w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 select-none">
      {/* App Bar */}
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
        {/* Left: Clean, high-contrast Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm">
            <Brain className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold tracking-tight text-white font-display">
                Brain Teasers
              </h1>
            </div>
          </div>
        </div>

        {/* Right: Interactive Actions */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Music Soundscapes Button with Live Visualizer */}
          <button
            id="header-music-btn"
            type="button"
            onClick={() => {
              sound.playTap(soundEnabled, soundVolume);
              onOpenMusic();
            }}
            aria-label="Focus ambient music & soundscapes"
            className={`h-9 sm:h-10 flex items-center gap-1.5 px-2.5 sm:px-3 rounded-xl text-xs font-semibold border transition-all active:scale-95 cursor-pointer ${
              musicPlaying 
                ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300' 
                : 'bg-slate-800/80 border-slate-700/70 text-slate-300 hover:text-white hover:bg-slate-750'
            }`}
            title="Focus Soundscapes & Ambient Music"
          >
            {musicPlaying ? (
              <div className="flex items-end gap-0.5 h-3.5 px-0.5">
                {bars.map((bar, i) => (
                  <span 
                    key={i} 
                    className="w-0.5 bg-indigo-400 rounded-full transition-all duration-100"
                    style={{ height: `${Math.max(4, Math.round(bar * 14))}px` }}
                  />
                ))}
              </div>
            ) : (
              <Headphones className="w-4 h-4 text-slate-400" />
            )}
            <span className="text-[11px] font-bold">
              {musicPlaying ? 'Tunes' : 'Music'}
            </span>
          </button>

          {/* Daily Challenge & Streak button */}
          <button
            id="header-daily-challenge-btn"
            type="button"
            onClick={() => {
              sound.playTap(soundEnabled, soundVolume);
              onOpenDaily();
            }}
            aria-label="Daily Challenge & Streak"
            className="h-9 sm:h-10 flex items-center gap-1.5 px-2.5 sm:px-3 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition-all active:scale-95 text-xs font-bold cursor-pointer"
            title="Daily Challenge & Streak"
          >
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>{streak}</span>
          </button>

          {/* Search button */}
          <button
            id="header-search-btn"
            type="button"
            onClick={() => {
              sound.playTap(soundEnabled, soundVolume);
              onOpenSearch();
            }}
            aria-label="Search teasers"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors active:scale-95 cursor-pointer"
            title="Search puzzles"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Stats button */}
          <button
            id="header-stats-btn"
            type="button"
            onClick={() => {
              sound.playTap(soundEnabled, soundVolume);
              onOpenStats();
            }}
            aria-label="Progress & Statistics"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors active:scale-95 cursor-pointer"
            title="Stats & Mastery"
          >
            <BarChart3 className="w-4 h-4" />
          </button>

          {/* Settings button */}
          <button
            id="header-settings-btn"
            type="button"
            onClick={() => {
              sound.playTap(soundEnabled, soundVolume);
              onOpenSettings();
            }}
            aria-label="Settings"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors active:scale-95 cursor-pointer"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Frame toggle button (desktop only) */}
          <button
            id="header-frame-toggle-btn"
            type="button"
            onClick={() => {
              sound.playTap(soundEnabled, soundVolume);
              onToggleFrame();
            }}
            aria-label={isDeviceFramed ? 'Switch to fullscreen' : 'Switch to Android phone frame'}
            className="hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 rounded-xl items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors active:scale-95 cursor-pointer"
            title={isDeviceFramed ? 'Full View' : 'Android Frame'}
          >
            {isDeviceFramed ? <Maximize2 className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
