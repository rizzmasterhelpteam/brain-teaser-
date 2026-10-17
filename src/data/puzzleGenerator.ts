import { BrainTeaser, DifficultyLevel } from '../types';
import { CURATED_TEASERS } from './curatedTeasers';
import { DISTINCT_LOGIC_PUZZLES } from './logicPuzzles';
import { DISTINCT_MATH_PUZZLES } from './mathPuzzles';
import { DISTINCT_LATERAL_PUZZLES } from './lateralPuzzles';
import { DISTINCT_TRICK_PUZZLES } from './trickPuzzles';
import { DISTINCT_RIDDLE_PUZZLES } from './riddlePuzzles';
import { DISTINCT_WORD_PUZZLES } from './wordPuzzles';
import { DISTINCT_IMPOSSIBLE_PUZZLES } from './impossiblePuzzles';

// Fast seeded pseudo-random number generator for deterministic generation
function mulberry32(seed: number) {
  return function() {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Generates a comprehensive puzzle bank where EVERY SINGLE question is a unique, distinct scenario
export function generatePuzzleBank(): BrainTeaser[] {
  const teasers: BrainTeaser[] = [
    ...CURATED_TEASERS,
    ...DISTINCT_LOGIC_PUZZLES,
    ...DISTINCT_MATH_PUZZLES,
    ...DISTINCT_LATERAL_PUZZLES,
    ...DISTINCT_TRICK_PUZZLES,
    ...DISTINCT_RIDDLE_PUZZLES,
    ...DISTINCT_WORD_PUZZLES,
    ...DISTINCT_IMPOSSIBLE_PUZZLES
  ];

  // Procedural mathematical sequences with completely distinct formulas and numbers
  const proceduralMathSequences = [
    // Triangular numbers offset
    {
      gen: (n: number) => {
        const offset = 3 + n * 2;
        const seq = [1, 3, 6, 10, 15, 21].map(x => x + offset);
        return {
          id: `proc-math-tri-${n}`,
          category: 'math' as const,
          difficulty: 'medium' as DifficultyLevel,
          question: `Find the next number in this sequence: ${seq.slice(0, 5).join(', ')}, ?`,
          hint: 'Look at the differences between consecutive terms (+2, +3, +4...).',
          answer: `${seq[5]}`,
          explanation: `The differences between consecutive terms increase by 1 (+2, +3, +4, +5, +6). Adding 6 to ${seq[4]} gives ${seq[5]}.`,
          tags: ['sequences', 'triangular', 'difference-patterns']
        };
      },
      count: 4
    },
    // Alternating addition and multiplication
    {
      gen: (n: number) => {
        const add = 2 + n;
        const mult = 2;
        let val = 3 + n;
        const seq = [val];
        for (let i = 0; i < 5; i++) {
          if (i % 2 === 0) val += add;
          else val *= mult;
          seq.push(val);
        }
        return {
          id: `proc-math-alt-${n}`,
          category: 'math' as const,
          difficulty: 'hard' as DifficultyLevel,
          question: `What number completes the alternating progression: ${seq.slice(0, 5).join(', ')}, ?`,
          hint: `Notice how the operations alternate between adding ${add} and multiplying by ${mult}.`,
          answer: `${seq[5]}`,
          explanation: `The rule alternates between +${add} and x${mult}. The 6th term is obtained by ${5 % 2 === 1 ? `multiplying ${seq[4]} by ${mult}` : `adding ${add} to ${seq[4]}`}, resulting in ${seq[5]}.`,
          tags: ['sequences', 'alternating-operations', 'arithmetic']
        };
      },
      count: 4
    },
    // Square differences
    {
      gen: (n: number) => {
        const base = 5 + n * 3;
        const seq = [base, base + 1, base + 5, base + 14, base + 30, base + 55];
        return {
          id: `proc-math-sqdiff-${n}`,
          category: 'math' as const,
          difficulty: 'hard' as DifficultyLevel,
          question: `Identify the next term in the progression: ${seq.slice(0, 5).join(', ')}, ?`,
          hint: 'The differences between consecutive numbers are consecutive perfect squares (1^2, 2^2, 3^2, 4^2...).',
          answer: `${seq[5]}`,
          explanation: `Differences are +1 (1^2), +4 (2^2), +9 (3^2), +16 (4^2). The next difference is +25 (5^2): ${seq[4]} + 25 = ${seq[5]}.`,
          tags: ['sequences', 'squares', 'second-differences']
        };
      },
      count: 3
    }
  ];

  proceduralMathSequences.forEach(group => {
    for (let i = 1; i <= group.count; i++) {
      teasers.push(group.gen(i));
    }
  });

  // Distinct Clock Hand Angles at varied realistic times
  const distinctClockTimes = [
    {
      id: 'proc-clock-1',
      h: 3,
      m: 15,
      ans: '7.5 degrees',
      exp: 'At 3:15, minute hand is at 90°. Hour hand has moved 15 * 0.5° = 7.5° past 90°. The angle is 97.5° - 90° = 7.5°.'
    },
    {
      id: 'proc-clock-2',
      h: 9,
      m: 30,
      ans: '105 degrees',
      exp: 'At 9:30, minute hand is at 180°. Hour hand is at 9 * 30° + 30 * 0.5° = 285°. Angle is 285° - 180° = 105°.'
    },
    {
      id: 'proc-clock-3',
      h: 6,
      m: 0,
      ans: '180 degrees',
      exp: 'At 6:00, the hour hand points straight down at 180° and minute hand straight up at 0°, forming a straight 180° line.'
    },
    {
      id: 'proc-clock-4',
      h: 1,
      m: 20,
      ans: '80 degrees',
      exp: 'At 1:20, minute hand is at 120°. Hour hand is at 1 * 30° + 20 * 0.5° = 40°. Angle is 120° - 40° = 80°.'
    },
    {
      id: 'proc-clock-5',
      h: 8,
      m: 20,
      ans: '130 degrees',
      exp: 'At 8:20, minute hand is at 120°. Hour hand is at 8 * 30° + 20 * 0.5° = 250°. Angle is 250° - 120° = 130°.'
    }
  ];

  distinctClockTimes.forEach(clk => {
    teasers.push({
      id: clk.id,
      category: 'math',
      difficulty: 'hard',
      question: `On a standard analog clock, what is the exact smaller angle between the hour hand and the minute hand at ${clk.h}:${clk.m < 10 ? '0' + clk.m : clk.m}?`,
      hint: 'Remember that the hour hand continuously advances at 0.5 degrees per minute.',
      answer: clk.ans,
      explanation: clk.exp,
      tags: ['geometry', 'clocks', 'angles']
    });
  });

  // Strict Deduplication: ensure no duplicate question text or identical scenarios
  const seenQuestions = new Set<string>();
  const uniqueTeasers: BrainTeaser[] = [];

  for (const t of teasers) {
    // Normalize question string to detect duplicates
    const normalizedKey = t.question.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 45);
    if (!seenQuestions.has(normalizedKey)) {
      seenQuestions.add(normalizedKey);
      uniqueTeasers.push(t);
    }
  }

  // Deterministically shuffle dataset with mulberry32 so every category is evenly interspersed
  const rand = mulberry32(20260919);
  for (let i = uniqueTeasers.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [uniqueTeasers[i], uniqueTeasers[j]] = [uniqueTeasers[j], uniqueTeasers[i]];
  }

  return uniqueTeasers;
}
