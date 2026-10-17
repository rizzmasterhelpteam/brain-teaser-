export interface BrainLevelInfo {
  level: number;
  title: string;
  emoji: string;
  badgeBg: string;
  minXp: number;
  nextXp: number;
  progressPct: number;
}

export const BRAIN_LEVELS: { level: number; title: string; emoji: string; badgeBg: string; minXp: number }[] = [
  { level: 1, title: 'Curious Sprout', emoji: '🌱', badgeBg: 'from-emerald-500 to-teal-500', minXp: 0 },
  { level: 2, title: 'Riddle Scout', emoji: '🔍', badgeBg: 'from-blue-500 to-cyan-500', minXp: 150 },
  { level: 3, title: 'Puzzle Ninja', emoji: '🥷', badgeBg: 'from-indigo-500 to-violet-500', minXp: 400 },
  { level: 4, title: 'Logic Wizard', emoji: '🧙‍♂️', badgeBg: 'from-purple-500 to-pink-500', minXp: 800 },
  { level: 5, title: 'Paradox Master', emoji: '🔮', badgeBg: 'from-amber-500 to-orange-500', minXp: 1400 },
  { level: 6, title: 'Cosmic Genius', emoji: '🌌', badgeBg: 'from-rose-500 to-red-500', minXp: 2200 },
  { level: 7, title: 'Supreme Big Brain', emoji: '🧠⚡', badgeBg: 'from-yellow-400 to-amber-500', minXp: 3200 }
];

export function getBrainLevelInfo(xp: number): BrainLevelInfo {
  let current = BRAIN_LEVELS[0];
  let next = BRAIN_LEVELS[1];

  for (let i = BRAIN_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= BRAIN_LEVELS[i].minXp) {
      current = BRAIN_LEVELS[i];
      next = BRAIN_LEVELS[i + 1] || { ...current, minXp: current.minXp + 1500 };
      break;
    }
  }

  const range = next.minXp - current.minXp;
  const inLevel = Math.max(0, xp - current.minXp);
  const progressPct = Math.min(100, Math.round((inLevel / range) * 100));

  return {
    level: current.level,
    title: current.title,
    emoji: current.emoji,
    badgeBg: current.badgeBg,
    minXp: current.minXp,
    nextXp: next.minXp,
    progressPct
  };
}

export const FUN_BRAIN_QUIPS = [
  "Synapses firing! You're brilliant! ⚡",
  "Think outside the box! 🎁",
  "Gears turning smoothly! ⚙️",
  "Big brain energy today! 🧠✨",
  "Look for the twist in the question! 🌀",
  "Every puzzle expands your mind! 🚀",
  "Aha! That eureka moment is near! 💡",
  "Calculated, clever, and curious! 🎯",
  "Don't let the trick questions fool ya! 🎪",
  "You're a certified logic explorer! 🧭"
];

export function getRandomBrainQuip(): string {
  return FUN_BRAIN_QUIPS[Math.floor(Math.random() * FUN_BRAIN_QUIPS.length)];
}
