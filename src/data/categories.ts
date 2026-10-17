import { CategoryId, CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'logic',
    name: 'Logic',
    emoji: '🧩',
    iconName: 'Cpu',
    color: 'text-indigo-400',
    badgeBg: 'bg-indigo-500/20 text-indigo-200 border-indigo-500/40 shadow-sm shadow-indigo-500/10',
    description: 'Deductive reasoning, paradoxes, and grid-based deductions'
  },
  {
    id: 'trick',
    name: 'Trick Questions',
    emoji: '🎪',
    iconName: 'Zap',
    color: 'text-amber-400',
    badgeBg: 'bg-amber-500/20 text-amber-200 border-amber-500/40 shadow-sm shadow-amber-500/10',
    description: 'Deceptive wordings and clever misdirections'
  },
  {
    id: 'math',
    name: 'Math Puzzles',
    emoji: '⚡',
    iconName: 'Calculator',
    color: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40 shadow-sm shadow-emerald-500/10',
    description: 'Numbers, algebra quirks, sequences, and geometric twists'
  },
  {
    id: 'word',
    name: 'Word Puzzles',
    emoji: '🔤',
    iconName: 'SpellCheck',
    color: 'text-cyan-400',
    badgeBg: 'bg-cyan-500/20 text-cyan-200 border-cyan-500/40 shadow-sm shadow-cyan-500/10',
    description: 'Anagrams, letter ciphers, palindromes, and linguistic puns'
  },
  {
    id: 'riddles',
    name: 'Riddles',
    emoji: '🕵️',
    iconName: 'HelpCircle',
    color: 'text-purple-400',
    badgeBg: 'bg-purple-500/20 text-purple-200 border-purple-500/40 shadow-sm shadow-purple-500/10',
    description: 'Poetic metaphors and classic enigmatic mysteries'
  },
  {
    id: 'lateral',
    name: 'Lateral Thinking',
    emoji: '💡',
    iconName: 'Compass',
    color: 'text-rose-400',
    badgeBg: 'bg-rose-500/20 text-rose-200 border-rose-500/40 shadow-sm shadow-rose-500/10',
    description: 'Outside-the-box scenarios requiring creative perspectives'
  },
  {
    id: 'impossible',
    name: 'Mind Benders',
    emoji: '🌌',
    iconName: 'Flame',
    color: 'text-orange-400',
    badgeBg: 'bg-orange-500/20 text-orange-200 border-orange-500/40 shadow-sm shadow-orange-500/10',
    description: 'Brain-melting paradoxes and counterintuitive physics/mindbenders'
  }
];

export const CATEGORY_MAP = new Map<CategoryId, CategoryInfo>(
  CATEGORIES.map(c => [c.id, c])
);
