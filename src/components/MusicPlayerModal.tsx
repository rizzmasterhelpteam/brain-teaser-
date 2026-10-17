import React, { useEffect, useState } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Waves, 
  CloudRain, 
  Compass, 
  Radio, 
  Headphones 
} from 'lucide-react';
import { AppSettings, MusicTrackId } from '../types';
import { MUSIC_TRACKS, music } from '../services/music';
import { sound } from '../services/sound';

interface MusicPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
}

export const MusicPlayerModal: React.FC<MusicPlayerModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) => {
  const [isPlaying, setIsPlaying] = useState(settings.musicEnabled);
  const [levels, setLevels] = useState<number[]>([0.2, 0.4, 0.3, 0.5, 0.3, 0.6, 0.4, 0.2]);

  // Sync playing state with settings
  useEffect(() => {
    setIsPlaying(settings.musicEnabled);
  }, [settings.musicEnabled]);

  // Live visualizer polling when open
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      const live = music.getFrequencyLevels(8);
      setLevels(live);
    }, 80);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const currentTrackMeta = MUSIC_TRACKS.find(t => t.id === settings.musicTrack) || MUSIC_TRACKS[0];

  const handleTogglePlay = () => {
    sound.playTap(settings.soundEnabled, settings.soundVolume);
    if (isPlaying) {
      music.stop();
      setIsPlaying(false);
      onUpdateSettings(prev => ({ ...prev, musicEnabled: false }));
    } else {
      music.start(settings.musicTrack, settings.musicVolume);
      setIsPlaying(true);
      onUpdateSettings(prev => ({ ...prev, musicEnabled: true }));
    }
  };

  const handleSelectTrack = (trackId: MusicTrackId) => {
    sound.playTap(settings.soundEnabled, settings.soundVolume);
    onUpdateSettings(prev => ({ ...prev, musicTrack: trackId }));
    if (isPlaying) {
      music.changeTrack(trackId, settings.musicVolume);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseInt(e.target.value, 10);
    onUpdateSettings(prev => ({ ...prev, musicVolume: vol }));
    music.setVolume(vol);
  };

  const getTrackIcon = (id: MusicTrackId) => {
    switch (id) {
      case 'zen':
        return <Sparkles className="w-4 h-4 text-emerald-400" />;
      case 'deep':
        return <Waves className="w-4 h-4 text-cyan-400" />;
      case 'rain':
        return <CloudRain className="w-4 h-4 text-blue-400" />;
      case 'cosmic':
        return <Compass className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div 
      id="music-player-modal-backdrop" 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="music-player-sheet" 
        className="w-full max-w-md bg-slate-900 border-t sm:border border-slate-800 rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl flex flex-col max-h-[85vh] overflow-y-auto no-scrollbar"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5 font-display">
                Focus Soundscapes
              </h2>
              <p className="text-xs text-slate-400">Synthesized audio natively generated in browser</p>
            </div>
          </div>
          <button
            id="close-music-player-btn"
            type="button"
            onClick={onClose}
            aria-label="Close Music Player"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors active:scale-95 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Audio Visualizer Banner */}
        <div className="my-4 p-4 rounded-xl bg-slate-850 border border-slate-800 flex flex-col items-center justify-center text-center relative overflow-hidden">
          {/* Equalizer Waveform */}
          <div className="flex items-center justify-center gap-1.5 h-10 mb-3">
            {levels.map((lvl, idx) => (
              <div 
                key={idx}
                className="w-1.5 bg-indigo-500 rounded-full transition-all duration-75"
                style={{ 
                  height: isPlaying ? `${Math.max(12, lvl * 40)}px` : '4px',
                  opacity: isPlaying ? 0.9 : 0.3
                }}
              />
            ))}
          </div>

          {/* Current track title & status */}
          <div className="text-xs font-bold text-white">
            {currentTrackMeta.name}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {currentTrackMeta.tagline}
          </div>

          {/* Play/Pause Toggle */}
          <button
            id="modal-toggle-music-play-btn"
            type="button"
            onClick={handleTogglePlay}
            className={`mt-3.5 h-11 min-h-[44px] px-6 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md cursor-pointer ${
              isPlaying 
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/40' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-950/40'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>Pause Soundscape</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white ml-0.5" />
                <span>Play Soundscape</span>
              </>
            )}
          </button>
        </div>

        {/* Volume Slider */}
        <div className="mb-4 bg-slate-850 border border-slate-800 p-3 rounded-xl">
          <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-2">
            <span className="flex items-center gap-1.5 text-slate-400">
              {settings.musicVolume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-slate-300" />}
              Volume
            </span>
            <span className="font-mono text-slate-400 text-[11px]">{settings.musicVolume}%</span>
          </div>
          <input 
            id="music-volume-range"
            type="range"
            min="0"
            max="100"
            value={settings.musicVolume}
            onChange={handleVolumeChange}
            className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
          />
        </div>

        {/* Soundscape Tracks Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 block mb-1">
            Choose Soundscape:
          </label>
          <div className="grid grid-cols-1 gap-2">
            {MUSIC_TRACKS.map(track => {
              const isSelected = settings.musicTrack === track.id;
              return (
                <button
                  key={track.id}
                  id={`track-option-${track.id}`}
                  type="button"
                  onClick={() => handleSelectTrack(track.id)}
                  className={`w-full min-h-[52px] p-3 rounded-xl border text-left transition-all active:scale-[0.99] flex items-center justify-between gap-3 cursor-pointer ${
                    isSelected 
                      ? 'bg-indigo-600/15 border-indigo-500/40 text-white shadow-sm' 
                      : 'bg-slate-850 border-slate-800 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                      {getTrackIcon(track.id)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        {track.name}
                        {isSelected && isPlaying && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">
                        {track.description}
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md shrink-0 ${
                    isSelected ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {isSelected ? (isPlaying ? 'Active' : 'Selected') : 'Select'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5">
          <Radio className="w-3.5 h-3.5 text-indigo-400" />
          <span>Procedural synthesis • Ambient Web Audio</span>
        </div>
      </div>
    </div>
  );
};
