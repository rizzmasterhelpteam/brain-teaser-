import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { BrainTeaser, UserStats, AppSettings } from '../types';
import { CATEGORY_MAP } from '../data/categories';
import { 
  X, 
  Flame, 
  Calendar, 
  CheckCircle2, 
  Eye, 
  Lightbulb, 
  Sparkles,
  Check
} from 'lucide-react';
import { sound } from '../services/sound';
import { getTodayDateString } from '../services/storage';

interface DailyChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  dailyTeaser: BrainTeaser;
  stats: UserStats;
  settings: AppSettings;
  onCompleteDaily: (id: string) => void;
}

export const DailyChallengeModal: React.FC<DailyChallengeModalProps> = ({
  isOpen,
  onClose,
  dailyTeaser,
  stats,
  settings,
  onCompleteDaily
}) => {
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!isOpen) return null;

  const todayStr = getTodayDateString();
  const isCompletedToday = stats.dailyCompletedDates.includes(todayStr) || stats.solvedIds.includes(dailyTeaser.id);
  const categoryMeta = CATEGORY_MAP.get(dailyTeaser.category);

  // Generate last 7 days for the streak track
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const dayLabel = d.toLocaleDateString(undefined, { weekday: 'narrow' });
    const isDone = stats.dailyCompletedDates.includes(dStr);
    const isToday = dStr === todayStr;
    days.push({ dStr, dayLabel, isDone, isToday });
  }

  const handleSolveDaily = () => {
    sound.playStreak(settings.soundEnabled, settings.soundVolume);
    sound.vibrate([40, 50, 60], settings.hapticsEnabled);
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#6366f1', '#10b981']
      });
    } catch {}
    onCompleteDaily(dailyTeaser.id);
  };

  return (
    <div 
      id="daily-challenge-modal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto select-none animate-in fade-in"
    >
      <div 
        id="daily-challenge-container"
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col my-auto"
      >
        {/* Header */}
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Flame className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white font-display">
                  Daily Challenge
                </h2>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  {stats.streak}d Streak
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                <span className="text-amber-300 font-medium ml-1.5">• +100 XP</span>
              </p>
            </div>
          </div>

          <button
            id="daily-challenge-close-btn"
            type="button"
            onClick={() => {
              sound.playTap(settings.soundEnabled, settings.soundVolume);
              onClose();
            }}
            aria-label="Close Daily Challenge"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors active:scale-95 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 7-Day Streak History Tracker */}
        <div className="px-4 py-3 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold text-slate-300">Past 7 Days</span>
            <span className="text-slate-400">Best Streak: <strong className="text-slate-200">{stats.bestStreak}d</strong></span>
          </div>
          <div className="grid grid-cols-7 gap-1.5 text-center">
            {days.map((item, idx) => (
              <div 
                key={idx} 
                className={`py-1.5 px-1 rounded-xl flex flex-col items-center justify-center border transition-all ${
                  item.isDone 
                    ? 'bg-amber-500/15 border-amber-500/35 text-amber-300' 
                    : item.isToday
                    ? 'bg-slate-800 border-slate-700 text-slate-200'
                    : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}
              >
                <span className="text-[10px] font-semibold">{item.dayLabel}</span>
                <div className="mt-1">
                  {item.isDone ? (
                    <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ) : (
                    <div className={`w-1.5 h-1.5 rounded-full ${item.isToday ? 'bg-amber-400' : 'bg-slate-700'}`} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Question Body */}
        <div className="p-4 space-y-3.5">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-lg border flex items-center gap-1.5 ${categoryMeta?.badgeBg || 'bg-slate-800 text-slate-300'}`}>
              <span>{categoryMeta?.emoji || '🧩'}</span>
              <span>{categoryMeta?.name || dailyTeaser.category}</span>
            </span>
            <span className="text-xs font-medium text-slate-400">
              Level: {dailyTeaser.difficulty}
            </span>
          </div>

          <div className="p-3.5 bg-slate-850 border border-slate-800 rounded-xl">
            <p className="text-sm sm:text-base text-slate-100 font-semibold leading-relaxed select-text font-display">
              {dailyTeaser.question}
            </p>
          </div>

          {/* Hint */}
          <div>
            {!showHint ? (
              <button
                id="daily-hint-btn"
                type="button"
                onClick={() => {
                  sound.playHint(settings.soundEnabled, settings.soundVolume);
                  setShowHint(true);
                }}
                className="w-full h-11 min-h-[44px] px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/15 text-amber-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all border border-amber-500/25 active:scale-[0.98] cursor-pointer"
              >
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Need a hint? Peek clue</span>
              </button>
            ) : (
              <div className="p-3.5 bg-amber-950/20 border border-amber-500/30 rounded-xl text-xs text-amber-200 leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-amber-400 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Clue</span>
                </div>
                <p className="font-normal">{dailyTeaser.hint}</p>
              </div>
            )}
          </div>

          {/* Answer Section */}
          <div>
            {!showAnswer ? (
              <button
                id="daily-reveal-answer-btn"
                type="button"
                onClick={() => {
                  sound.playTap(settings.soundEnabled, settings.soundVolume);
                  setShowAnswer(true);
                }}
                className="w-full h-11 min-h-[44px] px-4 bg-slate-800 hover:bg-slate-750 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-700 active:scale-[0.98] cursor-pointer"
              >
                <Eye className="w-4 h-4 text-indigo-400" />
                <span>Reveal Daily Solution</span>
              </button>
            ) : (
              <div className="space-y-3 pt-1 animate-in fade-in">
                <div className="p-3.5 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-xs text-emerald-200">
                  <span className="font-semibold text-emerald-400 text-xs block mb-1">Answer:</span>
                  <p className="font-bold text-sm select-text text-emerald-100 font-display">{dailyTeaser.answer}</p>
                  <p className="mt-2 text-slate-300 select-text whitespace-pre-line leading-relaxed font-normal">
                    {dailyTeaser.explanation}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Completion Button */}
          <div className="pt-1">
            {isCompletedToday ? (
              <div className="h-12 min-h-[48px] px-4 bg-emerald-500/15 border border-emerald-500/30 rounded-xl flex items-center justify-center gap-2 text-emerald-300 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Today's Challenge Completed!</span>
              </div>
            ) : (
              <button
                id="daily-mark-complete-btn"
                type="button"
                onClick={handleSolveDaily}
                className="w-full h-12 min-h-[48px] px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>I Solved It (+100 XP)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
