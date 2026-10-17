import React, { useState } from 'react';
import { AppSettings, UserStats } from '../types';
import { 
  X, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  Vibrate, 
  RotateCcw, 
  Trash2, 
  Download, 
  Upload, 
  ShieldCheck, 
  Tv, 
  Type,
  Sparkles,
  Check,
  Headphones,
  Music,
  FlipHorizontal,
  Volume1
} from 'lucide-react';
import { sound } from '../services/sound';
import { music, MUSIC_TRACKS } from '../services/music';
import { exportUserData, importUserData } from '../services/storage';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  onResetSeenPool: () => void;
  onResetAllData: () => void;
  onTriggerTestInterstitial: () => void;
  stats: UserStats;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetSeenPool,
  onResetAllData,
  onTriggerTestInterstitial,
  stats
}) => {
  const [importText, setImportText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExport = async () => {
    const data = exportUserData();
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(data);
        setExportSuccess(true);
        setTimeout(() => setExportSuccess(false), 2500);
      } else {
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `brain-teasers-backup-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
      }
    } catch {}
  };

  const handleImport = () => {
    if (!importText.trim()) return;
    const ok = importUserData(importText);
    if (ok) {
      setImportStatus('Backup restored successfully!');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setImportStatus('Invalid backup JSON. Please check format.');
    }
  };

  return (
    <div 
      id="settings-modal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto select-none animate-in fade-in"
    >
      <div 
        id="settings-modal-container"
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 font-display">
            <span>Settings & Audio</span>
          </h2>

          <button
            id="settings-modal-close-btn"
            type="button"
            onClick={() => {
              sound.playTap(settings.soundEnabled, settings.soundVolume);
              onClose();
            }}
            aria-label="Close settings"
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Settings Body */}
        <div className="p-4 overflow-y-auto space-y-4 no-scrollbar">
          {/* Audio & Music Suite */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5 text-indigo-400" />
              <span>Music & Sound Effects</span>
            </h3>

            {/* Sound Effects Toggle & Volume */}
            <div className="p-3 bg-slate-850 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {settings.soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                  <span className="text-xs font-medium text-slate-200">Sound Effects</span>
                </div>
                <input
                  id="toggle-sound-input"
                  type="checkbox"
                  checked={settings.soundEnabled}
                  onChange={e => {
                    const checked = e.target.checked;
                    onUpdateSettings(prev => ({ ...prev, soundEnabled: checked }));
                    if (checked) sound.playSuccess(true, settings.soundVolume);
                  }}
                  className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                />
              </div>

              {settings.soundEnabled && (
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>SFX Volume</span>
                    <span className="font-mono text-slate-300">{settings.soundVolume}%</span>
                  </div>
                  <input
                    id="sound-volume-range"
                    type="range"
                    min="10"
                    max="100"
                    value={settings.soundVolume}
                    onChange={e => {
                      const vol = parseInt(e.target.value, 10);
                      onUpdateSettings(prev => ({ ...prev, soundVolume: vol }));
                    }}
                    onMouseUp={() => sound.playSuccess(settings.soundEnabled, settings.soundVolume)}
                    onTouchEnd={() => sound.playSuccess(settings.soundEnabled, settings.soundVolume)}
                    className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => sound.playSuccess(settings.soundEnabled, settings.soundVolume)}
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Test Fanfare Chime</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Ambient Focus Music */}
            <div className="p-3 bg-slate-850 border border-slate-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Music className={`w-4 h-4 ${settings.musicEnabled ? 'text-indigo-400' : 'text-slate-500'}`} />
                  <div>
                    <span className="text-xs font-medium text-slate-200 block">Focus Ambient Music</span>
                    <span className="text-[10px] text-slate-400">Procedural sound synthesizer</span>
                  </div>
                </div>
                <input
                  id="toggle-music-settings-input"
                  type="checkbox"
                  checked={settings.musicEnabled}
                  onChange={e => {
                    const checked = e.target.checked;
                    onUpdateSettings(prev => ({ ...prev, musicEnabled: checked }));
                    if (checked) {
                      music.start(settings.musicTrack, settings.musicVolume);
                    } else {
                      music.stop();
                    }
                  }}
                  className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                />
              </div>

              {settings.musicEnabled && (
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Music Volume</span>
                    <span className="font-mono text-slate-300">{settings.musicVolume}%</span>
                  </div>
                  <input
                    id="settings-music-volume-range"
                    type="range"
                    min="5"
                    max="100"
                    value={settings.musicVolume}
                    onChange={e => {
                      const vol = parseInt(e.target.value, 10);
                      onUpdateSettings(prev => ({ ...prev, musicVolume: vol }));
                      music.setVolume(vol);
                    }}
                    className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                  />

                  {/* Quick Track Switcher */}
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    {MUSIC_TRACKS.map(t => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          onUpdateSettings(prev => ({ ...prev, musicTrack: t.id }));
                          music.changeTrack(t.id, settings.musicVolume);
                        }}
                        className={`px-2.5 py-1.5 rounded-lg text-left text-xs border transition-all ${
                          settings.musicTrack === t.id
                            ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-200 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <span className="block truncate">{t.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Haptic Vibration */}
            <div className="p-3 bg-slate-850 border border-slate-800 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Vibrate className={`w-4 h-4 ${settings.hapticsEnabled ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span className="text-xs font-medium text-slate-200">Haptic Vibration</span>
              </div>
              <input
                id="toggle-haptics-input"
                type="checkbox"
                checked={settings.hapticsEnabled}
                onChange={e => {
                  const checked = e.target.checked;
                  onUpdateSettings(prev => ({ ...prev, hapticsEnabled: checked }));
                  if (checked) sound.vibrate(25, true);
                }}
                className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Appearance & Layout */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Appearance & Typography
            </h3>
            
            {/* Theme */}
            <div className="p-3 bg-slate-850 border border-slate-800 rounded-xl flex items-center justify-between">
              <span className="text-xs font-medium text-slate-200">Theme</span>
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button
                  id="theme-btn-dark"
                  type="button"
                  onClick={() => onUpdateSettings(prev => ({ ...prev, theme: 'dark' }))}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition-colors ${
                    settings.theme === 'dark'
                      ? 'bg-slate-800 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark</span>
                </button>
                <button
                  id="theme-btn-light"
                  type="button"
                  onClick={() => onUpdateSettings(prev => ({ ...prev, theme: 'light' }))}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition-colors ${
                    settings.theme === 'light'
                      ? 'bg-slate-200 text-slate-900 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light</span>
                </button>
              </div>
            </div>

            {/* Font Size Selector */}
            <div className="p-3 bg-slate-850 border border-slate-800 rounded-xl flex items-center justify-between">
              <span className="text-xs font-medium text-slate-200 flex items-center gap-1.5">
                <Type className="w-4 h-4 text-indigo-400" />
                <span>Card Text Size</span>
              </span>
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                {(['normal', 'large', 'huge'] as const).map(size => (
                  <button
                    key={size}
                    id={`font-size-btn-${size}`}
                    type="button"
                    onClick={() => onUpdateSettings(prev => ({ ...prev, fontSize: size }))}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                      settings.fontSize === size
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AdMob Configuration */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              AdMob Integration Simulation
            </h3>
            <div className="space-y-2">
              <div className="p-3 bg-slate-850 border border-slate-800 rounded-xl flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-xs font-medium text-slate-200 flex items-center gap-1.5">
                    <Tv className="w-4 h-4 text-amber-400" />
                    <span>AdMob Ads (Banner & Interstitials)</span>
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    Safe spacing away from buttons per AdMob policies
                  </span>
                </div>
                <input
                  id="toggle-admob-input"
                  type="checkbox"
                  checked={settings.adMobEnabled}
                  onChange={e => onUpdateSettings(prev => ({ ...prev, adMobEnabled: e.target.checked }))}
                  className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                />
              </div>

              {settings.adMobEnabled && (
                <div className="p-3 bg-slate-850 border border-slate-800 rounded-xl flex items-center justify-between">
                  <span className="text-xs text-slate-300">Interstitial Frequency</span>
                  <select
                    id="admob-frequency-select"
                    value={settings.interstitialFrequency}
                    onChange={e => onUpdateSettings(prev => ({ ...prev, interstitialFrequency: Number(e.target.value) }))}
                    className="bg-slate-900 border border-slate-700 text-xs text-slate-200 rounded-lg px-2 py-1 focus:outline-none"
                  >
                    <option value={3}>Every 3 teasers</option>
                    <option value={4}>Every 4 teasers</option>
                    <option value={5}>Every 5 teasers</option>
                    <option value={8}>Every 8 teasers</option>
                  </select>
                </div>
              )}

              <button
                id="test-admob-interstitial-btn"
                type="button"
                onClick={() => {
                  sound.playTap(settings.soundEnabled, settings.soundVolume);
                  onTriggerTestInterstitial();
                }}
                className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 text-xs font-medium rounded-xl flex items-center justify-center gap-1.5 transition-colors active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Test Interstitial Ad Flow Now</span>
              </button>
            </div>
          </div>

          {/* Storage & Pool Controls */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Data & Local Pool Management
            </h3>

            <div className="space-y-2">
              <button
                id="settings-reset-seen-pool-btn"
                type="button"
                onClick={() => {
                  sound.playTap(settings.soundEnabled, settings.soundVolume);
                  onResetSeenPool();
                }}
                className="w-full py-2.5 px-3 bg-slate-850 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-medium rounded-xl flex items-center justify-between transition-colors active:scale-95"
              >
                <span className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-indigo-400" />
                  <span>Reset Seen Questions ({stats.seenIds.length} seen)</span>
                </span>
                <span className="text-[10px] text-slate-400">Keeps stats</span>
              </button>

              <button
                id="settings-export-data-btn"
                type="button"
                onClick={handleExport}
                className="w-full py-2.5 px-3 bg-slate-850 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-medium rounded-xl flex items-center justify-between transition-colors active:scale-95"
              >
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>Export Progress Backup (JSON)</span>
                </span>
                {exportSuccess && (
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Copied!
                  </span>
                )}
              </button>

              <button
                id="settings-import-toggle-btn"
                type="button"
                onClick={() => setShowImportBox(!showImportBox)}
                className="w-full py-2.5 px-3 bg-slate-850 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-medium rounded-xl flex items-center justify-between transition-colors active:scale-95"
              >
                <span className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-cyan-400" />
                  <span>Import Progress Backup</span>
                </span>
                <span className="text-[10px] text-slate-400">JSON</span>
              </button>

              {showImportBox && (
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                  <textarea
                    id="import-backup-textarea"
                    value={importText}
                    onChange={e => setImportText(e.target.value)}
                    placeholder="Paste your JSON backup payload here..."
                    className="w-full h-20 bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
                  />
                  <div className="flex items-center justify-between">
                    {importStatus && <span className="text-xs text-emerald-400">{importStatus}</span>}
                    <button
                      id="import-backup-confirm-btn"
                      type="button"
                      onClick={handleImport}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-colors"
                    >
                      Restore Data
                    </button>
                  </div>
                </div>
              )}

              <button
                id="settings-reset-all-data-btn"
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to reset all solved teasers, favorites, and streak statistics?')) {
                    sound.playTap(settings.soundEnabled, settings.soundVolume);
                    onResetAllData();
                    onClose();
                  }
                }}
                className="w-full py-2.5 px-3 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/40 text-rose-300 text-xs font-medium rounded-xl flex items-center justify-center gap-1.5 transition-colors active:scale-95"
              >
                <Trash2 className="w-4 h-4 text-rose-400" />
                <span>Reset All History & Streaks</span>
              </button>
            </div>
          </div>

          {/* Local Privacy & Architecture Banner */}
          <div className="p-3.5 bg-slate-850 border border-slate-800 rounded-xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-[11px] text-slate-400 space-y-1">
              <p className="font-semibold text-slate-200">Local Architecture & Privacy</p>
              <p>
                Zero backend, zero authentication required, zero external API queries. All brain teasers, hints, answers, explanations, and streaks persist safely in local storage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
