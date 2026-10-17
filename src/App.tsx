import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  BrainTeaser, 
  CategoryId, 
  DifficultyLevel, 
  UserStats, 
  AppSettings 
} from './types';
import { generatePuzzleBank } from './data/puzzleGenerator';
import { 
  loadStoredStats, 
  saveStoredStats, 
  loadStoredSettings, 
  saveStoredSettings,
  getDailyChallengeTeaser,
  updateStreakOnActivity,
  DEFAULT_STATS,
  DEFAULT_SETTINGS
} from './services/storage';
import { Header } from './components/Header';
import { CategoryFilterBar } from './components/CategoryFilterBar';
import { CardView } from './components/CardView';
import { AdMobBanner } from './components/AdMobBanner';
import { AdMobInterstitial } from './components/AdMobInterstitial';
import { DailyChallengeModal } from './components/DailyChallengeModal';
import { StatsModal } from './components/StatsModal';
import { SearchModal } from './components/SearchModal';
import { SettingsModal } from './components/SettingsModal';
import { MusicPlayerModal } from './components/MusicPlayerModal';
import { BrainMascot } from './components/BrainMascot';
import { music } from './services/music';
import { Wifi, Battery, Signal } from 'lucide-react';

export default function App() {
  // Master local asset dataset
  const allTeasers = useMemo(() => generatePuzzleBank(), []);

  // State management
  const [stats, setStats] = useState<UserStats>(() => loadStoredStats());
  const [settings, setSettings] = useState<AppSettings>(() => loadStoredSettings());

  // Filter & Navigation state
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [unseenOnly, setUnseenOnly] = useState(false);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Modals state
  const [isDailyOpen, setIsDailyOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [isInterstitialOpen, setIsInterstitialOpen] = useState(false);
  const [isDeviceFramed, setIsDeviceFramed] = useState(false);
  const [recentXpGain, setRecentXpGain] = useState<number | null>(null);

  // Save changes to local storage
  useEffect(() => {
    saveStoredStats(stats);
  }, [stats]);

  useEffect(() => {
    saveStoredSettings(settings);
  }, [settings]);

  // Synchronize background procedural ambient music
  useEffect(() => {
    if (settings.musicEnabled) {
      music.start(settings.musicTrack, settings.musicVolume);
    } else {
      music.stop();
    }
    return () => {
      // Cleanup on unmount
    };
  }, [settings.musicEnabled, settings.musicTrack]);

  useEffect(() => {
    music.setVolume(settings.musicVolume);
  }, [settings.musicVolume]);

  // Apply theme to document
  useEffect(() => {
    const isDark = settings.theme === 'dark' || (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  // Filtered teasers pool
  const filteredTeasers = useMemo(() => {
    return allTeasers.filter(t => {
      if (selectedCategory !== 'all' && t.category !== selectedCategory) {
        return false;
      }
      if (selectedDifficulty !== 'all' && t.difficulty !== selectedDifficulty) {
        return false;
      }
      if (favoritesOnly && !stats.favoriteIds.includes(t.id)) {
        return false;
      }
      if (unseenOnly && stats.seenIds.includes(t.id)) {
        return false;
      }
      return true;
    });
  }, [allTeasers, selectedCategory, selectedDifficulty, favoritesOnly, unseenOnly, stats.favoriteIds, stats.seenIds]);

  // Keep index within bounds safely without triggering infinite loops
  useEffect(() => {
    if (filteredTeasers.length === 0) {
      if (currentIndex !== 0) setCurrentIndex(0);
    } else if (currentIndex >= filteredTeasers.length) {
      setCurrentIndex(0);
    }
  }, [filteredTeasers.length, currentIndex]);

  const currentTeaser = filteredTeasers[currentIndex] || null;

  // Dedicated helper to mark a teaser as seen safely on user interactions
  const markAsSeen = useCallback((id: string) => {
    if (!id) return;
    setStats(prev => {
      if (prev.seenIds.includes(id)) return prev;
      return {
        ...prev,
        seenIds: [...prev.seenIds, id]
      };
    });
  }, []);

  // Unseen count for current filters
  const currentUnseenCount = useMemo(() => {
    return allTeasers.filter(t => {
      if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
      if (selectedDifficulty !== 'all' && t.difficulty !== selectedDifficulty) return false;
      return !stats.seenIds.includes(t.id);
    }).length;
  }, [allTeasers, selectedCategory, selectedDifficulty, stats.seenIds]);

  // Today's Daily Challenge Teaser
  const dailyTeaser = useMemo(() => {
    return getDailyChallengeTeaser(allTeasers);
  }, [allTeasers]);

  // Handlers
  const handleNext = useCallback(() => {
    if (filteredTeasers.length === 0) return;
    if (currentTeaser) {
      markAsSeen(currentTeaser.id);
    }
    if (unseenOnly) {
      // In unseen-only mode, the current teaser will be filtered out on the next cycle,
      // so the next puzzle naturally slides into currentIndex unless we're at the very end.
      if (currentIndex >= filteredTeasers.length - 1) {
        setCurrentIndex(0);
      }
    } else {
      setCurrentIndex(prev => (prev + 1) % filteredTeasers.length);
    }
  }, [filteredTeasers.length, currentTeaser, unseenOnly, currentIndex, markAsSeen]);

  const handlePrev = useCallback(() => {
    if (filteredTeasers.length === 0) return;
    if (currentTeaser) {
      markAsSeen(currentTeaser.id);
    }
    setCurrentIndex(prev => (prev - 1 + filteredTeasers.length) % filteredTeasers.length);
  }, [filteredTeasers.length, currentTeaser, markAsSeen]);

  const handleRandomPick = useCallback(() => {
    if (filteredTeasers.length <= 1) return;
    if (currentTeaser) {
      markAsSeen(currentTeaser.id);
    }
    let nextIdx = Math.floor(Math.random() * filteredTeasers.length);
    if (nextIdx === currentIndex && filteredTeasers.length > 1) {
      nextIdx = (nextIdx + 1) % filteredTeasers.length;
    }
    setCurrentIndex(nextIdx);
  }, [filteredTeasers.length, currentIndex, currentTeaser, markAsSeen]);

  const handleToggleFavorite = useCallback((id: string) => {
    setStats(prev => {
      const exists = prev.favoriteIds.includes(id);
      return {
        ...prev,
        favoriteIds: exists 
          ? prev.favoriteIds.filter(favId => favId !== id)
          : [...prev.favoriteIds, id]
      };
    });
  }, []);

  const handleMarkSolved = useCallback((id: string, xpEarned: number = 50) => {
    setRecentXpGain(xpEarned);
    setTimeout(() => setRecentXpGain(null), 2400);

    setStats(prev => {
      const alreadySolved = prev.solvedIds.includes(id);
      const newSolvedIds = alreadySolved ? prev.solvedIds : [...prev.solvedIds, id];
      const alreadySeen = prev.seenIds.includes(id);
      const newSeenIds = alreadySeen ? prev.seenIds : [...prev.seenIds, id];
      const streakUpdate = updateStreakOnActivity(prev);
      const newAdCount = prev.completedCountSinceLastAd + 1;
      const currentXp = typeof prev.xp === 'number' ? prev.xp : 0;

      // Check if interstitial should trigger
      if (settings.adMobEnabled && newAdCount >= settings.interstitialFrequency) {
        setTimeout(() => {
          setIsInterstitialOpen(true);
        }, 800);
      }

      return {
        ...prev,
        solvedIds: newSolvedIds,
        seenIds: newSeenIds,
        streak: streakUpdate.streak,
        bestStreak: streakUpdate.bestStreak,
        lastActiveDate: streakUpdate.lastActiveDate,
        completedCountSinceLastAd: newAdCount >= settings.interstitialFrequency ? 0 : newAdCount,
        xp: currentXp + xpEarned
      };
    });
  }, [settings.adMobEnabled, settings.interstitialFrequency]);

  const handleMarkRevealedOnly = useCallback((id: string) => {
    setRecentXpGain(15);
    setTimeout(() => setRecentXpGain(null), 2400);

    setStats(prev => {
      const alreadyLogged = prev.revealedWithoutSolvingIds.includes(id);
      const newRevealed = alreadyLogged ? prev.revealedWithoutSolvingIds : [...prev.revealedWithoutSolvingIds, id];
      const alreadySeen = prev.seenIds.includes(id);
      const newSeenIds = alreadySeen ? prev.seenIds : [...prev.seenIds, id];
      const newAdCount = prev.completedCountSinceLastAd + 1;
      const currentXp = typeof prev.xp === 'number' ? prev.xp : 0;

      if (settings.adMobEnabled && newAdCount >= settings.interstitialFrequency) {
        setTimeout(() => {
          setIsInterstitialOpen(true);
        }, 800);
      }

      return {
        ...prev,
        revealedWithoutSolvingIds: newRevealed,
        seenIds: newSeenIds,
        completedCountSinceLastAd: newAdCount >= settings.interstitialFrequency ? 0 : newAdCount,
        xp: currentXp + 15
      };
    });
  }, [settings.adMobEnabled, settings.interstitialFrequency]);

  const handleMarkHinted = useCallback((id: string) => {
    setStats(prev => {
      const alreadyHinted = prev.hintedIds.includes(id);
      const alreadySeen = prev.seenIds.includes(id);
      if (alreadyHinted && alreadySeen) return prev;
      return {
        ...prev,
        hintedIds: alreadyHinted ? prev.hintedIds : [...prev.hintedIds, id],
        seenIds: alreadySeen ? prev.seenIds : [...prev.seenIds, id]
      };
    });
  }, []);

  const handleCompleteDaily = useCallback((id: string) => {
    const todayStr = new Date().toISOString().slice(0, 10);
    setRecentXpGain(100);
    setTimeout(() => setRecentXpGain(null), 2400);

    setStats(prev => {
      const streakUpdate = updateStreakOnActivity(prev);
      const dailyDates = prev.dailyCompletedDates.includes(todayStr) 
        ? prev.dailyCompletedDates 
        : [...prev.dailyCompletedDates, todayStr];
      const newSolved = prev.solvedIds.includes(id) 
        ? prev.solvedIds 
        : [...prev.solvedIds, id];
      const currentXp = typeof prev.xp === 'number' ? prev.xp : 0;

      return {
        ...prev,
        dailyCompletedDates: dailyDates,
        solvedIds: newSolved,
        streak: streakUpdate.streak,
        bestStreak: streakUpdate.bestStreak,
        lastActiveDate: streakUpdate.lastActiveDate,
        xp: currentXp + 100
      };
    });
  }, []);

  const handleResetSeenPool = useCallback(() => {
    setStats(prev => ({
      ...prev,
      seenIds: []
    }));
  }, []);

  const handleResetAllData = useCallback(() => {
    setStats({ ...DEFAULT_STATS });
    setSettings({ ...DEFAULT_SETTINGS });
    setCurrentIndex(0);
  }, []);

  const handleSelectTeaserById = useCallback((id: string) => {
    const index = filteredTeasers.findIndex(t => t.id === id);
    if (index !== -1) {
      setCurrentIndex(index);
    } else {
      setSelectedCategory('all');
      setSelectedDifficulty('all');
      setFavoritesOnly(false);
      setUnseenOnly(false);
      const fullIndex = allTeasers.findIndex(t => t.id === id);
      if (fullIndex !== -1) {
        setCurrentIndex(fullIndex);
      }
    }
  }, [filteredTeasers, allTeasers]);

  return (
    <div className={`min-h-screen ${settings.theme === 'light' ? 'bg-slate-100 text-slate-900' : 'bg-slate-950 text-slate-100'} flex flex-col items-center justify-center p-0 sm:p-4 transition-colors`}>
      {/* Android Device Mock Frame Container */}
      <div 
        id="app-viewport-shell"
        className={`w-full flex flex-col transition-all duration-300 ${
          isDeviceFramed 
            ? 'max-w-[420px] h-[92vh] max-h-[890px] rounded-[40px] border-[8px] border-slate-800 shadow-2xl overflow-hidden relative' 
            : 'max-w-md min-h-screen sm:min-h-[92vh] sm:rounded-3xl sm:border sm:border-slate-800 shadow-2xl overflow-hidden relative flex-1'
        } ${settings.theme === 'light' ? 'bg-white' : 'bg-slate-950'}`}
      >
        {/* Android Native Status Bar */}
        <div 
          id="android-status-bar"
          className="w-full bg-slate-950 px-6 pt-2 pb-1 flex items-center justify-between text-[11px] font-semibold text-slate-400 select-none z-40 border-b border-slate-900"
        >
          <span>9:41</span>
          {/* Android Punch Hole Camera notch */}
          <div className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-slate-800" />
          <div className="flex items-center gap-2">
            <Signal className="w-3 h-3 text-slate-400" />
            <Wifi className="w-3 h-3 text-slate-400" />
            <Battery className="w-3.5 h-3.5 text-slate-300" />
          </div>
        </div>

        {/* Top App Bar Header with Live Sound & Music Visualizer */}
        <Header 
          streak={stats.streak}
          onOpenDaily={() => setIsDailyOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenStats={() => setIsStatsOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenMusic={() => setIsMusicOpen(true)}
          musicPlaying={settings.musicEnabled}
          soundEnabled={settings.soundEnabled}
          soundVolume={settings.soundVolume}
          isDeviceFramed={isDeviceFramed}
          onToggleFrame={() => setIsDeviceFramed(prev => !prev)}
        />

        {/* Category & Filter Navigation Bar */}
        <CategoryFilterBar 
          selectedCategory={selectedCategory}
          onSelectCategory={cat => {
            setSelectedCategory(cat);
            setCurrentIndex(0);
          }}
          selectedDifficulty={selectedDifficulty}
          onSelectDifficulty={diff => {
            setSelectedDifficulty(diff);
            setCurrentIndex(0);
          }}
          unseenOnly={unseenOnly}
          onToggleUnseenOnly={() => {
            setUnseenOnly(prev => !prev);
            setCurrentIndex(0);
          }}
          favoritesOnly={favoritesOnly}
          onToggleFavoritesOnly={() => {
            setFavoritesOnly(prev => !prev);
            setCurrentIndex(0);
          }}
          onRandomPick={handleRandomPick}
          unseenCount={currentUnseenCount}
          totalFilteredCount={filteredTeasers.length}
          soundEnabled={settings.soundEnabled}
          soundVolume={settings.soundVolume}
        />

        {/* Core Interactive Card Flow Area with 3D Flip & Motion Physics */}
        <main className="flex-1 flex flex-col overflow-y-auto no-scrollbar relative">
          {/* Interactive Brain Mascot & Gamification Level Bar */}
          <BrainMascot 
            xp={stats.xp || 0}
            soundEnabled={settings.soundEnabled}
            soundVolume={settings.soundVolume}
            streak={stats.streak}
            recentXpGain={recentXpGain}
          />

          <CardView 
            teaser={currentTeaser}
            currentIndex={currentIndex}
            totalCount={filteredTeasers.length}
            stats={stats}
            settings={settings}
            onNext={handleNext}
            onPrev={handlePrev}
            onToggleFavorite={handleToggleFavorite}
            onMarkSolved={handleMarkSolved}
            onMarkRevealedOnly={handleMarkRevealedOnly}
            onMarkHinted={handleMarkHinted}
            onResetSeenPool={handleResetSeenPool}
            onMarkSeen={markAsSeen}
          />
        </main>

        {/* Google AdMob Persistent Banner (Strictly separated from interactive controls) */}
        <AdMobBanner enabled={settings.adMobEnabled} />

        {/* Android Gesture Navigation Bar pill */}
        <div className="w-full bg-slate-950 py-1.5 flex justify-center items-center select-none">
          <div className="w-28 h-1 rounded-full bg-slate-700/80" />
        </div>
      </div>

      {/* Focus Music Soundscapes Sheet / Modal */}
      <MusicPlayerModal 
        isOpen={isMusicOpen}
        onClose={() => setIsMusicOpen(false)}
        settings={settings}
        onUpdateSettings={setSettings}
      />

      {/* Daily Challenge Modal */}
      <DailyChallengeModal 
        isOpen={isDailyOpen}
        onClose={() => setIsDailyOpen(false)}
        dailyTeaser={dailyTeaser}
        stats={stats}
        settings={settings}
        onCompleteDaily={handleCompleteDaily}
      />

      {/* Stats & Mastery Modal */}
      <StatsModal 
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={stats}
        allTeasers={allTeasers}
        soundEnabled={settings.soundEnabled}
        soundVolume={settings.soundVolume}
        onResetSeenPool={handleResetSeenPool}
      />

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        allTeasers={allTeasers}
        stats={stats}
        onSelectTeaser={handleSelectTeaserById}
        soundEnabled={settings.soundEnabled}
        soundVolume={settings.soundVolume}
      />

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={setSettings}
        onResetSeenPool={handleResetSeenPool}
        onResetAllData={handleResetAllData}
        onTriggerTestInterstitial={() => setIsInterstitialOpen(true)}
        stats={stats}
      />

      {/* Sensibly Spaced AdMob Interstitial Ad */}
      <AdMobInterstitial 
        isOpen={isInterstitialOpen}
        onClose={() => setIsInterstitialOpen(false)}
        soundEnabled={settings.soundEnabled}
      />
    </div>
  );
}
