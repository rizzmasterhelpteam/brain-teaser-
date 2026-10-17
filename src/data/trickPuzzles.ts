import { BrainTeaser } from '../types';

export const DISTINCT_TRICK_PUZZLES: BrainTeaser[] = [
  {
    id: 'tri-sc-1',
    category: 'trick',
    difficulty: 'easy',
    question: 'A commercial airplane crashes directly on the international border line between the United States and Canada. Where do authorities bury the survivors?',
    hint: 'Read the wording of who was in the crash very carefully.',
    answer: 'You do not bury survivors!',
    explanation: 'Survivors are alive! You only bury the deceased.',
    tags: ['misdirection', 'survivors', 'literal']
  },
  {
    id: 'tri-sc-2',
    category: 'trick',
    difficulty: 'easy',
    question: 'Some months have 30 days, while others have 31 days. How many months have 28 days?',
    hint: 'Does having 30 days prevent a month from having 28 days?',
    answer: 'All 12 months.',
    explanation: 'Every single month of the year has at least 28 days.',
    tags: ['calendar', 'trick', 'literal']
  },
  {
    id: 'tri-sc-3',
    category: 'trick',
    difficulty: 'medium',
    question: 'An electric high-speed train is traveling due north at 80 miles per hour. The wind is blowing briskly from the west at 30 miles per hour. Which direction is the train\'s smoke blowing?',
    hint: 'What type of locomotive was mentioned in the opening sentence?',
    answer: 'There is no smoke—it is an electric train!',
    explanation: 'Electric trains run on overhead electric wires or battery power; they do not produce combustion smoke.',
    tags: ['electric-train', 'smoke', 'observation']
  },
  {
    id: 'tri-sc-4',
    category: 'trick',
    difficulty: 'easy',
    question: 'If a doctor gives you 3 pills and instructs you to take one every half hour, how many minutes will all the pills last?',
    hint: 'You take the first pill immediately right now at minute 0.',
    answer: '60 minutes (1 hour).',
    explanation: 'Pill 1 is taken at minute 0. Pill 2 is taken at minute 30. Pill 3 is taken at minute 60. Total elapsed time is 60 minutes, not 90 minutes!',
    tags: ['pills', 'intervals', 'time']
  },
  {
    id: 'tri-sc-5',
    category: 'trick',
    difficulty: 'easy',
    question: 'A man walked outside during a torrential downpour without an umbrella, hat, or coat. Not a single hair on his head got wet. How is this possible?',
    hint: 'Think about his head.',
    answer: 'The man was completely bald!',
    explanation: 'He had no hair on his head to get wet.',
    tags: ['bald', 'rain', 'literal']
  },
  {
    id: 'tri-sc-6',
    category: 'trick',
    difficulty: 'easy',
    question: 'If you have a bowl containing six fresh apples and you take away four apples, how many apples do you have?',
    hint: 'Who has the apples that were taken?',
    answer: 'You have 4 apples.',
    explanation: 'You took 4 apples, so you possess 4 apples! (The bowl is left with 2 apples).',
    tags: ['apples', 'possession', 'wording']
  },
  {
    id: 'tri-sc-7',
    category: 'trick',
    difficulty: 'easy',
    question: 'Before Mount Everest was surveyed and discovered in 1856, what was the highest mountain on Earth?',
    hint: 'Does a mountain need to be named by humans to physically exist?',
    answer: 'Mount Everest was still the highest mountain on Earth!',
    explanation: 'Everest was always the highest peak; humans had simply not yet surveyed, mapped, or named it.',
    tags: ['geography', 'everest', 'discovery']
  },
  {
    id: 'tri-sc-8',
    category: 'trick',
    difficulty: 'easy',
    question: 'Clara\'s mother had four daughters: April, May, June, and what was the fourth daughter\'s name?',
    hint: 'Reread the very first word of the question.',
    answer: 'Clara!',
    explanation: 'The sentence opens: "Clara\'s mother had four daughters...". Clara is the fourth daughter.',
    tags: ['names', 'family', 'attention']
  },
  {
    id: 'tri-sc-9',
    category: 'trick',
    difficulty: 'easy',
    question: 'A clerk in a butcher shop stands 5 feet 10 inches tall and wears size 11 shoes. What does he weigh?',
    hint: 'What is his daily job at the butcher counter?',
    answer: 'He weighs meat!',
    explanation: 'As a butcher shop clerk, his primary occupation is weighing cuts of meat for customers.',
    tags: ['butcher', 'double-meaning', 'pun']
  },
  {
    id: 'tri-sc-10',
    category: 'trick',
    difficulty: 'medium',
    question: 'How much dirt is there inside a rectangular hole in the ground measuring 4 feet deep, 3 feet wide, and 6 feet long?',
    hint: 'What defines a hole?',
    answer: 'There is no dirt in a hole!',
    explanation: 'A hole is by definition an empty cavity; all the dirt has already been removed.',
    tags: ['hole', 'dirt', 'definition']
  }
];
