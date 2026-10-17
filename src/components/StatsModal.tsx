import React from 'react';
import { UserStats, BrainTeaser } from '../types';
import { CATEGORIES } from '../data/categories';
import { 
  X, 
  Flame, 
  CheckCircle2, 
  Eye, 
  Heart, 
  RotateCcw,
  Sparkles,
  Award
} from 'lucide-react';
import { sound } from '../services/sound';
import { getBrainLevelInfo } from '../services/gamification';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
  allTeasers: BrainTeaser[];
  soundEnabled: boolean;
  soundVolume?: number;
  onResetSeenPool: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  stats,
  allTeasers,
  soundEnabled,
  soundVolume = 80,
  onResetSeenPool
}) => {
  if (!isOpen) return null;

  const totalPool = allTeasers.length;
  const totalSolved = stats.solvedIds.length;
  const totalSeen = stats.seenIds.length;
  const totalFavorites = stats.favoriteIds.length;
  const totalHinted = stats.hintedIds.length;
  const totalUnseen = Math.max(0, totalPool - totalSeen);

  const totalAttempts = totalSolved + stats.revealedWithoutSolvingIds.length;
  const accuracy = totalAttempts > 0 
    ? Math.round((totalSolved / totalAttempts) * 100) 
    : 100;

  const currentXp = stats.xp || (totalSolved * 50);
  const levelInfo = getBrainLevelInfo(currentXp);

  // Category counts
  const categoryCounts = CATEGORIES.map(cat => {
    const totalInCat = allTeasers.filter(t => t.category === cat.id).length;
    const solvedInCat = allTeasers.filter(t => t.category === cat.id && stats.solvedIds.includes(t.id)).length;
    return {
      cat,
      total: totalInCat,
      solved: solvedInCat,
      pct: totalInCat > 0 ? Math.round((solvedInCat / totalInCat) * 100) : 0
    };
  });

  return (
    <div 
      id="stats-modal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto select-none animate-in fade-in"
    >
      <div 
        id="stats-modal-container"
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white font-display">
                Player Stats & Mastery
              </h2>
              <p className="text-xs text-slate-400">Player Progress Profile</p>
            </div>
          </div>

          <button
            id="stats-modal-close-btn"
            type="button"
            onClick={() => {
              sound.playTap(soundEnabled, soundVolume);
              onClose();
            }}
            aria-label="Close statistics"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors active:scale-95 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Stats Body */}
        <div className="p-4 overflow-y-auto space-y-3.5 no-scrollbar">
          {/* Brain Level Card */}
          <div className="p-4 bg-slate-850 border border-slate-800 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{levelInfo.emoji}</span>
                <div>
                  <div className="text-[11px] font-semibold text-indigo-400">Level {levelInfo.level}</div>
                  <div className="text-sm font-bold text-white">{levelInfo.title}</div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-semibold text-amber-300 bg-amber-500/15 border border-amber-500/25 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  {currentXp} XP
                </span>
              </div>
            </div>

            {/* XP Progress to Next Level */}
            <div className="space-y-1.5 mt-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>Next Rank Progress</span>
                <span>{levelInfo.progressPct}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(4, levelInfo.progressPct)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 bg-slate-850 border border-slate-800 rounded-xl text-center">
              <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                <Flame className="w-3.5 h-3.5 fill-amber-400" />
                <span className="text-base font-bold">{stats.streak}</span>
              </div>
              <span className="text-[11px] font-semibold text-slate-300 block">Streak</span>
              <span className="text-[10px] text-slate-500">Best: {stats.bestStreak}d</span>
            </div>

            <div className="p-3 bg-slate-850 border border-slate-800 rounded-xl text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-400 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="text-base font-bold">{totalSolved}</span>
              </div>
              <span className="text-[11px] font-semibold text-slate-300 block">Solved</span>
              <span className="text-[10px] text-slate-500">{accuracy}% accuracy</span>
            </div>

            <div className="p-3 bg-slate-850 border border-slate-800 rounded-xl text-center">
              <div className="flex items-center justify-center gap-1 text-rose-400 mb-1">
                <Heart className="w-3.5 h-3.5 fill-rose-400" />
                <span className="text-base font-bold">{totalFavorites}</span>
              </div>
              <span className="text-[11px] font-semibold text-slate-300 block">Saved</span>
              <span className="text-[10px] text-slate-500">{totalHinted} hinted</span>
            </div>
          </div>

          {/* Local Pool Exploration Progress */}
          <div className="p-3 bg-slate-850 border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-indigo-400" />
                <span>Dataset Exploration</span>
              </span>
              <span className="text-slate-400 font-medium text-[11px]">
                {totalSeen} seen ({totalUnseen} unseen)
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (totalSeen / Math.max(1, totalPool)) * 100)}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400">
              No repeated teasers until you've explored all {totalPool.toLocaleString()} questions in the pool.
            </p>
          </div>

          {/* Category-by-Category Mastery */}
          <div className="space-y-2 pt-1">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Category Mastery
            </h3>
            <div className="space-y-2">
              {categoryCounts.map(({ cat, total, solved, pct }) => (
                <div 
                  key={cat.id}
                  className="p-2.5 bg-slate-850 border border-slate-800 rounded-xl"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                    <span className="text-slate-200 flex items-center gap-1.5">
                      <span>{cat.emoji}</span>
                      <span>{cat.name}</span>
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {solved} / {total} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-500 h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, pct)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reset Seen Pool */}
          <div className="pt-2">
            <button
              id="stats-reset-seen-btn"
              type="button"
              onClick={() => {
                sound.playTap(soundEnabled, soundVolume);
                onResetSeenPool();
                onClose();
              }}
              className="w-full h-11 min-h-[44px] px-4 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-indigo-400" />
              <span>Reshuffle Seen Questions (Preserve XP & Streak)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
