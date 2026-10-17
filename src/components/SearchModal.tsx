import React, { useState, useMemo } from 'react';
import { BrainTeaser, UserStats } from '../types';
import { CATEGORY_MAP } from '../data/categories';
import { Search, X, CheckCircle2, ChevronRight, Hash } from 'lucide-react';
import { sound } from '../services/sound';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allTeasers: BrainTeaser[];
  stats: UserStats;
  onSelectTeaser: (teaserId: string) => void;
  soundEnabled: boolean;
  soundVolume?: number;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  allTeasers,
  stats,
  onSelectTeaser,
  soundEnabled,
  soundVolume = 80
}) => {
  const [query, setQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q && selectedCat === 'all') {
      return allTeasers.slice(0, 30); // show initial popular 30
    }

    return allTeasers.filter(t => {
      if (selectedCat !== 'all' && t.category !== selectedCat) {
        return false;
      }
      if (!q) return true;
      return (
        t.question.toLowerCase().includes(q) ||
        t.answer.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }).slice(0, 50); // limit to 50 for silky smooth rendering
  }, [allTeasers, query, selectedCat]);

  if (!isOpen) return null;

  return (
    <div 
      id="search-modal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 select-none animate-in fade-in"
    >
      <div 
        id="search-modal-container"
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[85vh]"
      >
        {/* Search Header Input */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="search-query-input"
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search riddles, math, logic..."
              autoFocus
              className="w-full bg-slate-900 border border-slate-750 rounded-xl pl-10 pr-9 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            {query && (
              <button
                id="search-clear-query-btn"
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search input"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            id="search-modal-close-btn"
            type="button"
            onClick={() => {
              sound.playTap(soundEnabled, soundVolume);
              onClose();
            }}
            aria-label="Close search"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors active:scale-95 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Pills inside Search */}
        <div className="bg-slate-950/60 px-4 py-2 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => {
              sound.playTap(soundEnabled, soundVolume);
              setSelectedCat('all');
            }}
            className={`min-h-[32px] px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCat === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            All
          </button>
          {Array.from(CATEGORY_MAP.values()).map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                sound.playTap(soundEnabled, soundVolume);
                setSelectedCat(cat.id);
              }}
              className={`min-h-[32px] px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCat === cat.id
                  ? `${cat.badgeBg} border`
                  : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
          <div className="text-xs text-slate-400 mb-2 flex items-center justify-between">
            <span>Found {filtered.length} entries</span>
            <span>Local Index</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="text-sm font-medium text-slate-300">No teasers matched "{query}"</p>
              <p className="text-xs text-slate-500 mt-1">Try another keyword, category, or clear filters</p>
            </div>
          ) : (
            filtered.map(t => {
              const catMeta = CATEGORY_MAP.get(t.category);
              const isSolved = stats.solvedIds.includes(t.id);
              return (
                <button
                  key={t.id}
                  id={`search-result-${t.id}`}
                  type="button"
                  onClick={() => {
                    sound.playTap(soundEnabled, soundVolume);
                    onSelectTeaser(t.id);
                    onClose();
                  }}
                  className="w-full text-left p-3.5 bg-slate-850 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl transition-all flex items-start justify-between gap-3 group active:scale-[0.99]"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${catMeta?.badgeBg || 'bg-slate-800'}`}>
                        {catMeta?.name}
                      </span>
                      <span className="text-[10px] uppercase font-semibold text-slate-400">
                        {t.difficulty}
                      </span>
                      {isSolved && (
                        <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3" />
                          Solved
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed font-medium">
                      {t.question}
                    </p>
                    {t.tags.length > 0 && (
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <Hash className="w-2.5 h-2.5" />
                        <span>{t.tags.slice(0, 2).join(', ')}</span>
                      </div>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 shrink-0 mt-1 transition-colors" />
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
