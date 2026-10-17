import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Brain } from 'lucide-react';
import { getBrainLevelInfo, getRandomBrainQuip } from '../services/gamification';
import { sound } from '../services/sound';

interface BrainMascotProps {
  xp: number;
  soundEnabled: boolean;
  soundVolume: number;
  streak: number;
  recentXpGain?: number | null;
}

export const BrainMascot: React.FC<BrainMascotProps> = ({
  xp,
  soundEnabled,
  soundVolume,
  streak,
  recentXpGain
}) => {
  const [quip, setQuip] = useState<string | null>(null);
  const [isBouncing, setIsBouncing] = useState(false);
  const levelInfo = getBrainLevelInfo(xp);

  const handleMascotTap = () => {
    sound.playPop(soundEnabled, soundVolume);
    setIsBouncing(true);
    setQuip(getRandomBrainQuip());
    setTimeout(() => setIsBouncing(false), 500);
    setTimeout(() => setQuip(null), 3500);
  };

  return (
    <div id="brainy-mascot-widget" className="w-full px-4 pt-2 pb-1 select-none">
      <div className="flex items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 shadow-sm">
        
        {/* Left: Mascot & Level Progress */}
        <div className="flex items-center gap-3">
          <button
            id="brain-mascot-btn"
            type="button"
            onClick={handleMascotTap}
            title="Tap for a quick tip!"
            aria-label="Tap Brainy for a quick tip!"
            className="relative focus:outline-none shrink-0 cursor-pointer active:scale-95 transition-transform"
          >
            <motion.div
              animate={isBouncing ? { scale: [1, 1.15, 0.95, 1.05, 1] } : { y: [0, -1.5, 0] }}
              transition={isBouncing ? { duration: 0.4 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center cursor-pointer hover:bg-indigo-600/30 transition-colors"
            >
              <Brain className="w-5 h-5 text-indigo-400" />
            </motion.div>

            {/* Subtle XP Gain Indicator */}
            <AnimatePresence>
              {recentXpGain && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.8 }}
                  animate={{ opacity: 1, y: -20, scale: 1 }}
                  exit={{ opacity: 0, y: -28, scale: 0.9 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="absolute -top-1 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold shadow-md whitespace-nowrap pointer-events-none flex items-center gap-1 z-30"
                >
                  <Sparkles className="w-2.5 h-2.5 fill-current" />
                  <span>+{recentXpGain} XP</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Level Info & XP Progress Bar */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white flex items-center gap-1">
                <span>{levelInfo.emoji}</span>
                <span>{levelInfo.title}</span>
              </span>
              <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Lv. {levelInfo.level}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-28 sm:w-36 bg-slate-800 h-2 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${levelInfo.progressPct}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="bg-indigo-500 h-full rounded-full"
                />
              </div>
              <span className="text-[11px] font-mono font-medium text-slate-400">
                {xp} XP
              </span>
            </div>
          </div>
        </div>

        {/* Right: Streak status badge */}
        {streak > 0 && (
          <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold">
            <span className="text-xs">🔥</span>
            <span>{streak}d Streak</span>
          </div>
        )}
      </div>

      {/* Speech Bubble Quip */}
      <AnimatePresence>
        {quip && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="mt-2 px-3.5 py-2 rounded-xl bg-slate-850 border border-slate-700/80 text-slate-200 text-xs font-medium shadow-md flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">💡</span>
              <span>{quip}</span>
            </div>
            <button
              type="button"
              onClick={() => setQuip(null)}
              className="text-slate-400 hover:text-slate-200 text-xs font-bold ml-2 p-0.5"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
