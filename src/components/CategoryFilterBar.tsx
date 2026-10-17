import React from 'react';
import { CATEGORIES } from '../data/categories';
import { CategoryId, DifficultyLevel } from '../types';
import { Heart, EyeOff } from 'lucide-react';
import { sound } from '../services/sound';

interface CategoryFilterBarProps {
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (cat: CategoryId | 'all') => void;
  selectedDifficulty: DifficultyLevel | 'all';
  onSelectDifficulty: (diff: DifficultyLevel | 'all') => void;
  unseenOnly: boolean;
  onToggleUnseenOnly: () => void;
  favoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  onRandomPick: () => void;
  unseenCount: number;
  totalFilteredCount: number;
  soundEnabled: boolean;
  soundVolume: number;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedDifficulty,
  onSelectDifficulty,
  unseenOnly,
  onToggleUnseenOnly,
  favoritesOnly,
  onToggleFavoritesOnly,
  onRandomPick,
  unseenCount,
  soundEnabled,
  soundVolume
}) => {
  const difficulties: Array<{ id: DifficultyLevel | 'all'; label: string; emoji: string }> = [
    { id: 'all', label: 'All', emoji: '✨' },
    { id: 'easy', label: 'Easy', emoji: '🟢' },
    { id: 'medium', label: 'Med', emoji: '🟡' },
    { id: 'hard', label: 'Hard', emoji: '🔴' },
    { id: 'expert', label: 'Pro', emoji: '🟣' }
  ];

  return (
    <div id="category-filter-bar" className="w-full bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 py-2 px-4 select-none">
      <div className="max-w-md mx-auto space-y-2">
        {/* Horizontal scrollable category pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            id="cat-pill-all"
            type="button"
            onClick={() => {
              sound.playTap(soundEnabled, soundVolume);
              onSelectCategory('all');
            }}
            className={`min-h-[36px] px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 flex items-center gap-1.5 shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-750 border border-slate-700/60'
            }`}
          >
            <span>✨</span>
            <span>All Topics</span>
          </button>

          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-pill-${cat.id}`}
                type="button"
                onClick={() => {
                  sound.playTap(soundEnabled, soundVolume);
                  onSelectCategory(cat.id);
                }}
                className={`min-h-[36px] px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  isSelected
                    ? `${cat.badgeBg} border shadow-sm`
                    : 'bg-slate-800/90 text-slate-300 hover:text-white hover:bg-slate-750 border border-slate-700/60'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary controls row: Difficulties, Unseen toggle, Favorites, Random */}
        <div className="flex items-center justify-between gap-1 text-xs pt-0.5">
          {/* Difficulty selector */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            {difficulties.map(d => (
              <button
                key={d.id}
                id={`diff-pill-${d.id}`}
                type="button"
                onClick={() => {
                  sound.playTap(soundEnabled, soundVolume);
                  onSelectDifficulty(d.id);
                }}
                className={`min-h-[32px] px-2.5 py-1 rounded-lg text-xs font-semibold transition-all active:scale-95 flex items-center gap-1 shrink-0 cursor-pointer ${
                  selectedDifficulty === d.id
                    ? 'bg-slate-700 text-white border border-slate-600 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span className="text-[11px]">{d.emoji}</span>
                <span>{d.label}</span>
              </button>
            ))}
          </div>

          {/* Quick action buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Unseen Only Toggle */}
            <button
              id="filter-unseen-toggle-btn"
              type="button"
              onClick={() => {
                sound.playTap(soundEnabled, soundVolume);
                onToggleUnseenOnly();
              }}
              title={unseenOnly ? 'Showing unseen questions only' : 'Showing all questions'}
              aria-label={unseenOnly ? 'Showing unseen questions only' : 'Showing all questions'}
              className={`h-8 min-h-[32px] px-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all active:scale-95 cursor-pointer ${
                unseenOnly
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700/70 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <EyeOff className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[11px] font-bold">{unseenCount}</span>
            </button>

            {/* Favorites Toggle */}
            <button
              id="filter-favorites-toggle-btn"
              type="button"
              onClick={() => {
                sound.playTap(soundEnabled, soundVolume);
                onToggleFavoritesOnly();
              }}
              title={favoritesOnly ? 'Showing favorites only' : 'Filter by favorites'}
              aria-label={favoritesOnly ? 'Showing favorites only' : 'Filter by favorites'}
              className={`h-8 w-8 min-h-[32px] min-w-[32px] rounded-lg border flex items-center justify-center transition-all active:scale-95 cursor-pointer ${
                favoritesOnly
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-sm'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700/70 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${favoritesOnly ? 'fill-rose-400 text-rose-400' : ''}`} />
            </button>

            {/* Random Pick Button */}
            <button
              id="filter-random-pick-btn"
              type="button"
              onClick={() => {
                sound.playDice(soundEnabled, soundVolume);
                onRandomPick();
              }}
              title="Surprise me with a random teaser!"
              aria-label="Surprise me with a random teaser!"
              className="h-8 min-h-[32px] px-2.5 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition-all active:scale-95 flex items-center gap-1.5 font-bold text-xs cursor-pointer"
            >
              <span>🎲</span>
              <span className="text-[11px]">Shuffle</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
