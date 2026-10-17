import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  BrainTeaser, 
  UserStats, 
  AppSettings 
} from '../types';
import { CATEGORY_MAP } from '../data/categories';
import { 
  Lightbulb, 
  ChevronLeft, 
  ChevronRight, 
  Share2, 
  Heart, 
  CheckCircle2, 
  RotateCcw,
  Sparkles, 
  Clock, 
  Play, 
  Pause, 
  PenTool, 
  FlipHorizontal, 
  ArrowRight,
  Zap,
  Check,
  PartyPopper
} from 'lucide-react';
import { sound } from '../services/sound';

interface CardViewProps {
  teaser: BrainTeaser | null;
  currentIndex: number;
  totalCount: number;
  stats: UserStats;
  settings: AppSettings;
  onNext: () => void;
  onPrev: () => void;
  onToggleFavorite: (id: string) => void;
  onMarkSolved: (id: string, xpEarned?: number) => void;
  onMarkRevealedOnly: (id: string) => void;
  onMarkHinted: (id: string) => void;
  onResetSeenPool: () => void;
  onMarkSeen?: (id: string) => void;
}

export const CardView: React.FC<CardViewProps> = ({
  teaser,
  currentIndex,
  totalCount,
  stats,
  settings,
  onNext,
  onPrev,
  onToggleFavorite,
  onMarkSolved,
  onMarkRevealedOnly,
  onMarkHinted,
  onResetSeenPool,
  onMarkSeen
}) => {
  // Flip state: false = Front (Question), true = Back (Answer & Explanation)
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  // Think Timer state
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [solveTimeRecorded, setSolveTimeRecorded] = useState<number | null>(null);

  // Quick Guess Scratchpad state
  const [userGuess, setUserGuess] = useState('');
  const [showScratchpad, setShowScratchpad] = useState(false);
  const [guessFeedback, setGuessFeedback] = useState<string | null>(null);

  // Drag physics for interactive swipe
  const dragX = useMotionValue(0);
  const cardRotate = useTransform(dragX, [-200, 200], [-8, 8]);
  const solveBadgeOpacity = useTransform(dragX, [40, 110], [0, 1]);
  const nextBadgeOpacity = useTransform(dragX, [-40, -110], [0, 1]);

  // Reset state when teaser changes
  useEffect(() => {
    setIsFlipped(false);
    setShowHint(false);
    setUserGuess('');
    setGuessFeedback(null);
    setTimerSeconds(0);
    setIsTimerRunning(true);
    setSolveTimeRecorded(null);
  }, [teaser?.id]);

  // Think Timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && !isFlipped && teaser) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, isFlipped, teaser]);

  if (!teaser) {
    return (
      <div 
        id="empty-pool-view"
        className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto"
      >
        <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-3xl mb-4">
          🏆
        </div>
        <h2 className="text-xl font-bold text-white mb-2 font-display">
          All Puzzles Conquered!
        </h2>
        <p className="text-sm text-slate-400 mb-6 leading-relaxed max-w-xs">
          You've explored every single brain teaser in this filter. Tap below to reshuffle the deck.
        </p>
        <button
          id="reset-seen-pool-btn"
          type="button"
          onClick={() => {
            sound.playSuccess(settings.soundEnabled, settings.soundVolume);
            onResetSeenPool();
          }}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-all flex items-center gap-2 shadow-sm active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reshuffle Deck</span>
        </button>
      </div>
    );
  }

  const isFavorite = stats.favoriteIds.includes(teaser.id);
  const isSolved = stats.solvedIds.includes(teaser.id);
  const categoryMeta = CATEGORY_MAP.get(teaser.category);

  const difficultyMeta: Record<string, { label: string; emoji: string; style: string }> = {
    easy: { label: 'Easy', emoji: '🟢', style: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/25' },
    medium: { label: 'Medium', emoji: '🟡', style: 'text-amber-300 bg-amber-500/10 border-amber-500/25' },
    hard: { label: 'Hard', emoji: '🔴', style: 'text-rose-300 bg-rose-500/10 border-rose-500/25' },
    expert: { label: 'Expert', emoji: '🟣', style: 'text-purple-300 bg-purple-500/10 border-purple-500/25' }
  };

  const currentDiff = difficultyMeta[teaser.difficulty] || difficultyMeta.medium;

  const fontSizes = {
    normal: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-relaxed',
    huge: 'text-xl sm:text-2xl leading-relaxed font-semibold'
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const handleFlipToAnswer = () => {
    sound.playCardFlip(settings.soundEnabled, settings.soundVolume);
    sound.vibrate(20, settings.hapticsEnabled);
    setIsFlipped(true);
    setIsTimerRunning(false);
    if (teaser) {
      onMarkSeen?.(teaser.id);
    }
  };

  const handleFlipBackToQuestion = () => {
    sound.playCardFlip(settings.soundEnabled, settings.soundVolume);
    sound.vibrate(15, settings.hapticsEnabled);
    setIsFlipped(false);
  };

  const handleCopyShare = async () => {
    sound.playTap(settings.soundEnabled, settings.soundVolume);
    const shareText = `🧠 Brain Teaser Challenge (${categoryMeta?.name || 'Riddle'} - ${currentDiff.label}):\n\n"${teaser.question}"\n\n${isFlipped ? `✨ Answer: ${teaser.answer}\n\n💡 Explanation: ${teaser.explanation}` : 'Can you solve this?'}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Brain Teaser Challenge',
          text: shareText
        });
        return;
      } catch {}
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2200);
    } catch {}
  };

  const handleSolveCelebration = () => {
    sound.playSuccess(settings.soundEnabled, settings.soundVolume);
    sound.vibrate([30, 40, 50], settings.hapticsEnabled);
    setSolveTimeRecorded(timerSeconds);

    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899']
      });
    } catch {}

    const earnedXp = showHint ? 50 : 75;
    onMarkSolved(teaser.id, earnedXp);
  };

  const handleMissed = () => {
    sound.playMiss(settings.soundEnabled, settings.soundVolume);
    sound.vibrate(15, settings.hapticsEnabled);
    onMarkRevealedOnly(teaser.id);
  };

  // Drag swipe release handler
  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x > 100) {
      // Swiped right -> Solve celebration
      if (!isSolved) {
        handleSolveCelebration();
      } else {
        sound.playCardSlide(settings.soundEnabled, settings.soundVolume);
        onNext();
      }
    } else if (info.offset.x < -100) {
      // Swiped left -> Next
      sound.playCardSlide(settings.soundEnabled, settings.soundVolume);
      sound.vibrate(15, settings.hapticsEnabled);
      onNext();
    }
  };

  // Quick check hypothesis feedback
  const handleCheckHypothesis = () => {
    sound.playTap(settings.soundEnabled, settings.soundVolume);
    if (!userGuess.trim()) return;
    const lowerGuess = userGuess.toLowerCase().trim();
    const lowerAnswer = teaser.answer.toLowerCase();
    
    const answerWords = lowerAnswer.split(/\W+/).filter(w => w.length > 3);
    const guessWords = lowerGuess.split(/\W+/).filter(w => w.length > 3);
    const hasWordMatch = guessWords.some(w => answerWords.includes(w) || lowerAnswer.includes(w));

    if (hasWordMatch) {
      setGuessFeedback("🔥 Very close or spot-on! Reveal the solution to confirm.");
    } else {
      setGuessFeedback("🤔 Good angle of attack. Flip to see if you got it!");
    }
  };

  return (
    <div 
      id="card-view-container"
      className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full px-3.5 sm:px-4 py-2 select-none relative"
    >
      {/* Toast Alert */}
      {copiedToast && (
        <div 
          id="copy-toast" 
          className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-full border border-slate-700 shadow-xl flex items-center gap-2 animate-in fade-in"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Copied riddle to clipboard!</span>
        </div>
      )}

      {/* 3D Motion Perspective Card Shell */}
      <div className="w-full [perspective:1000px] my-auto">
        <motion.div
          id={`teaser-card-motion-${teaser.id}`}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          style={{ 
            x: dragX, 
            rotateZ: cardRotate,
            transformStyle: 'preserve-3d'
          }}
          className="w-full relative cursor-grab active:cursor-grabbing touch-pan-y"
        >
          {/* Drag Overlay Feedback Badges */}
          <motion.div 
            style={{ opacity: solveBadgeOpacity }}
            className="absolute top-4 left-4 z-40 px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-lg flex items-center gap-1.5 pointer-events-none"
          >
            <PartyPopper className="w-3.5 h-3.5" />
            <span>SOLVED!</span>
          </motion.div>

          <motion.div 
            style={{ opacity: nextBadgeOpacity }}
            className="absolute top-4 right-4 z-40 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-100 font-bold text-xs shadow-lg border border-slate-700 flex items-center gap-1.5 pointer-events-none"
          >
            <span>NEXT</span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
          </motion.div>

          {/* AnimatePresence for 3D Card Front/Back Flip */}
          <AnimatePresence initial={false} mode="wait">
            {!isFlipped ? (
              /* ================= FRONT OF CARD (QUESTION) ================= */
              <motion.div
                key="card-front"
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 90, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col relative overflow-hidden"
              >
                {/* Header: Category, Difficulty, Share & Favorite */}
                <div className="flex items-center justify-between gap-2 pb-3 mb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {/* Category pill */}
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${categoryMeta?.badgeBg || 'bg-slate-800 text-slate-200'}`}>
                      <span>{categoryMeta?.emoji || '🧩'}</span>
                      <span>{categoryMeta?.name || teaser.category}</span>
                    </span>

                    {/* Difficulty Pill */}
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md border flex items-center gap-1 ${currentDiff.style}`}>
                      <span>{currentDiff.emoji}</span>
                      <span>{currentDiff.label}</span>
                    </span>

                    {/* Solved Badge if previously solved */}
                    {isSolved && (
                      <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        Mastered
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Share Button */}
                    <button
                      id="teaser-share-btn"
                      type="button"
                      onClick={handleCopyShare}
                      title="Share puzzle with friends"
                      aria-label="Share puzzle with friends"
                      className="w-10 h-10 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors active:scale-95 border border-transparent hover:border-slate-700/60"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>

                    {/* Favorite Button */}
                    <button
                      id="teaser-favorite-btn"
                      type="button"
                      onClick={() => {
                        sound.playTap(settings.soundEnabled, settings.soundVolume);
                        sound.vibrate(15, settings.hapticsEnabled);
                        onToggleFavorite(teaser.id);
                      }}
                      title={isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}
                      aria-label={isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors active:scale-95 ${
                        isFavorite 
                          ? 'text-rose-400 bg-rose-500/15 border border-rose-500/30' 
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent hover:border-slate-700/60'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-400 text-rose-400' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Question Body with high contrast & comfortable readability */}
                <div className="my-4 min-h-[105px] flex items-center">
                  <p className={`${fontSizes[settings.fontSize]} text-slate-100 font-bold tracking-normal select-text font-display leading-relaxed`}>
                    {teaser.question}
                  </p>
                </div>

                {/* Think Timer Pill & Hypothesis Scratchpad Toggle */}
                <div className="flex items-center justify-between gap-2 py-1.5 px-3 rounded-xl bg-slate-850 border border-slate-800 text-xs text-slate-400 my-1">
                  {/* Timer */}
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-mono font-semibold text-slate-200 text-xs">
                      {formatTimer(timerSeconds)}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playTap(settings.soundEnabled, settings.soundVolume);
                        setIsTimerRunning(prev => !prev);
                      }}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-750 transition-colors active:scale-95"
                      title={isTimerRunning ? 'Pause Timer' : 'Resume Timer'}
                      aria-label={isTimerRunning ? 'Pause Timer' : 'Resume Timer'}
                    >
                      {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-indigo-400" />}
                    </button>
                  </div>

                  {/* Scratchpad Toggle */}
                  <button
                    id="toggle-scratchpad-btn"
                    type="button"
                    onClick={() => {
                      sound.playTap(settings.soundEnabled, settings.soundVolume);
                      setShowScratchpad(prev => !prev);
                    }}
                    className={`h-8 min-h-[32px] flex items-center gap-1.5 px-3 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
                      showScratchpad 
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent'
                    }`}
                  >
                    <PenTool className="w-3 h-3 text-indigo-400" />
                    <span>{showScratchpad ? 'Hide Guess' : 'Test Guess'}</span>
                  </button>
                </div>

                {/* Clean Hypothesis Scratchpad */}
                {showScratchpad && (
                  <div className="mt-2.5 p-3 bg-slate-850 border border-slate-750 rounded-xl animate-in fade-in slide-in-from-top-1">
                    <label className="text-[11px] font-semibold text-slate-300 tracking-wide block mb-1.5 flex items-center justify-between">
                      <span>Enter your guess:</span>
                      <span className="text-[10px] text-slate-400 font-normal">Check before revealing</span>
                    </label>

                    <div className="flex items-center gap-2">
                      <input 
                        id="user-guess-input"
                        type="text"
                        placeholder="Type what you think it is..."
                        value={userGuess}
                        onChange={e => {
                          setUserGuess(e.target.value);
                          setGuessFeedback(null);
                        }}
                        onKeyDown={e => {
                          if (e.key === 'Enter' && userGuess.trim()) {
                            handleCheckHypothesis();
                          }
                        }}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 font-medium h-10"
                      />
                      {userGuess.trim() && (
                        <button
                          type="button"
                          onClick={handleCheckHypothesis}
                          className="h-10 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 shrink-0 transition-colors active:scale-95 shadow-sm"
                        >
                          <span>Check</span>
                        </button>
                      )}
                    </div>

                    {guessFeedback && (
                      <div className="mt-2 text-xs text-slate-200 bg-slate-800 p-2.5 rounded-xl border border-slate-700 flex items-center justify-between">
                        <span>{guessFeedback}</span>
                        <button
                          type="button"
                          onClick={handleFlipToAnswer}
                          className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 ml-2 h-7 px-2 flex items-center rounded bg-indigo-500/10"
                        >
                          Reveal →
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Hint Drawer */}
                <div className="mt-3">
                  {!showHint ? (
                    <button
                      id="teaser-request-hint-btn"
                      type="button"
                      onClick={() => {
                        sound.playHint(settings.soundEnabled, settings.soundVolume);
                        sound.vibrate(15, settings.hapticsEnabled);
                        setShowHint(true);
                        onMarkHinted(teaser.id);
                      }}
                      className="w-full h-11 min-h-[44px] px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/25 text-amber-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                    >
                      <Lightbulb className="w-4 h-4 text-amber-400" />
                      <span>Need a hint? Peek clue</span>
                    </button>
                  ) : (
                    <motion.div 
                      id="teaser-hint-box"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 bg-amber-950/20 border border-amber-500/30 rounded-xl text-xs text-amber-200 leading-relaxed"
                    >
                      <div className="flex items-center gap-1.5 font-semibold text-amber-400 mb-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Clue</span>
                      </div>
                      <p className="font-medium">{teaser.hint}</p>
                    </motion.div>
                  )}
                </div>

                {/* Tactile Flip Button */}
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <button
                    id="teaser-flip-to-answer-btn"
                    type="button"
                    onClick={handleFlipToAnswer}
                    className="w-full h-12 min-h-[48px] px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md shadow-indigo-950/40 cursor-pointer"
                  >
                    <FlipHorizontal className="w-4 h-4" />
                    <span>Flip & Reveal Answer</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              /* ================= BACK OF CARD (ANSWER & EXPLANATION) ================= */
              <motion.div
                key="card-back"
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: -90, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col relative overflow-hidden"
              >
                {/* Back Header */}
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                      Solution
                    </span>
                  </div>

                  {/* Flip back to question button */}
                  <button
                    id="flip-back-question-btn"
                    type="button"
                    onClick={handleFlipBackToQuestion}
                    className="h-9 min-h-[36px] px-3.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors active:scale-95 border border-slate-700/70 flex items-center gap-1.5"
                  >
                    <FlipHorizontal className="w-3.5 h-3.5 text-indigo-400" />
                    <span>View Question</span>
                  </button>
                </div>

                {/* Show User Guess if entered */}
                {userGuess && (
                  <div className="mb-2 p-2 bg-slate-850 border border-slate-750 rounded-lg text-xs text-slate-400 flex items-center justify-between">
                    <div>
                      <span className="text-slate-500 mr-1.5">Your Guess:</span>
                      <span className="font-semibold text-slate-200 italic">"{userGuess}"</span>
                    </div>
                  </div>
                )}

                {/* Highlighted Solution Box */}
                <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl my-1">
                  <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wide mb-1 flex items-center justify-between">
                    <span>Answer:</span>
                    {solveTimeRecorded !== null && (
                      <span className="text-[10px] text-emerald-300 font-mono bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        Solved in {formatTimer(solveTimeRecorded)}
                      </span>
                    )}
                  </div>
                  <p className="text-lg font-bold text-emerald-100 select-text font-display leading-snug">
                    {teaser.answer}
                  </p>
                </div>

                {/* Detailed Explanation */}
                <div className="my-2 p-3.5 bg-slate-850 border border-slate-800 rounded-xl text-xs text-slate-200 leading-relaxed max-h-32 overflow-y-auto no-scrollbar">
                  <div className="font-semibold text-amber-400 text-[11px] tracking-wide mb-1 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Explanation:</span>
                  </div>
                  <p className="whitespace-pre-line select-text text-slate-300 font-normal">
                    {teaser.explanation}
                  </p>
                </div>

                {/* Self-Scoring Buttons */}
                <div className="bg-slate-850 p-3 rounded-xl border border-slate-800 flex flex-col gap-2 mt-1">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                    <span>Did you get it right?</span>
                    <span className="text-[10px] text-indigo-400 font-bold">+50-75 XP</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      id="teaser-solve-success-btn"
                      type="button"
                      onClick={handleSolveCelebration}
                      className="h-12 min-h-[48px] px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-emerald-950/30 cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Got It!</span>
                    </button>
                    <button
                      id="teaser-solve-missed-btn"
                      type="button"
                      onClick={handleMissed}
                      className="h-12 min-h-[48px] px-3 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 border border-slate-700 hover:border-slate-650 cursor-pointer"
                    >
                      <span>Need Practice</span>
                    </button>
                  </div>
                </div>

                {/* Next Teaser button */}
                <button
                  id="back-card-next-teaser-btn"
                  type="button"
                  onClick={() => {
                    sound.playCardSlide(settings.soundEnabled, settings.soundVolume);
                    sound.vibrate(15, settings.hapticsEnabled);
                    onNext();
                  }}
                  className="mt-2.5 w-full h-12 min-h-[48px] px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-indigo-950/40 cursor-pointer"
                >
                  <span>Next Brain Teaser</span>
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom Navigation Controls */}
      <div 
        id="card-navigation-controls"
        className="w-full mt-3 bg-slate-900/95 border border-slate-800 rounded-2xl p-2 sm:p-2.5 flex items-center justify-between gap-3 shadow-md backdrop-blur-sm"
      >
        {/* Previous Button */}
        <button
          id="nav-prev-teaser-btn"
          type="button"
          onClick={() => {
            sound.playCardSlide(settings.soundEnabled, settings.soundVolume);
            sound.vibrate(15, settings.hapticsEnabled);
            onPrev();
          }}
          aria-label="Previous brain teaser"
          className="h-11 min-h-[44px] px-4 sm:px-5 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700/60 transition-all active:scale-95 flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Prev</span>
        </button>

        {/* Index & Progress Bar */}
        <div className="flex-1 text-center px-1">
          <div className="text-xs font-bold text-slate-200 tracking-wide">
            {currentIndex + 1} <span className="text-slate-500 font-normal">/</span> {totalCount}
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1.5 max-w-[120px] mx-auto">
            <div 
              className="bg-indigo-500 h-full rounded-full transition-all duration-200"
              style={{ width: `${Math.min(100, Math.max(4, ((currentIndex + 1) / Math.max(1, totalCount)) * 100))}%` }}
            />
          </div>
        </div>

        {/* Next Button */}
        <button
          id="nav-next-teaser-btn"
          type="button"
          onClick={() => {
            sound.playCardSlide(settings.soundEnabled, settings.soundVolume);
            sound.vibrate(15, settings.hapticsEnabled);
            onNext();
          }}
          aria-label="Next brain teaser"
          className="h-11 min-h-[44px] px-5 sm:px-6 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all active:scale-95 shadow-md shadow-indigo-950/40 flex items-center gap-1.5 shrink-0 cursor-pointer"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
