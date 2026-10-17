import { BrainTeaser } from '../types';

export const DISTINCT_WORD_PUZZLES: BrainTeaser[] = [
  {
    id: 'wor-sc-1',
    category: 'word',
    difficulty: 'easy',
    question: 'What 8-letter English word begins with the letter "e", ends with the letter "e", but contains only one single letter?',
    hint: 'You drop it in a mailbox with a postage stamp.',
    answer: 'An envelope.',
    explanation: 'The word "envelope" begins with E, ends with E, and encloses a paper letter inside!',
    tags: ['envelope', 'wordplay', 'pun']
  },
  {
    id: 'wor-sc-2',
    category: 'word',
    difficulty: 'easy',
    question: 'Forward I am heavy, but backward I am not. What 3-letter word am I?',
    hint: 'A unit of 2,000 pounds read in reverse.',
    answer: 'TON.',
    explanation: 'Spelled forward, "TON" is a heavy unit of weight. Spelled backward, it forms the word "NOT".',
    tags: ['ton', 'palindrome', 'reversal']
  },
  {
    id: 'wor-sc-3',
    category: 'word',
    difficulty: 'medium',
    question: 'What English word contains all five vowels (A, E, I, O, U) in exact alphabetical order?',
    hint: 'Describes being humorous or not taking serious things seriously.',
    answer: 'FACETIOUS (or ABSTEMIOUS).',
    explanation: 'In F-A-c-E-t-I-O-U-s, all five vowels appear in sequence. (Adding "-ly" gives FACETIOUSLY, including Y in alphabetical order!).',
    tags: ['vowels', 'alphabet', 'lexicon']
  },
  {
    id: 'wor-sc-4',
    category: 'word',
    difficulty: 'hard',
    question: 'Name a common English word that has five consecutive vowels in a row.',
    hint: 'Think of waiting in line at a shop in British English.',
    answer: 'QUEUEING.',
    explanation: 'In the word "QUEUEING", the vowels U-E-U-E-I sit together without intervening consonants.',
    tags: ['queueing', 'vowels', 'orthography']
  },
  {
    id: 'wor-sc-5',
    category: 'word',
    difficulty: 'medium',
    question: 'Unscramble this clever anagram into a profession that studies celestial objects: "MOON STARER"',
    hint: 'Someone with a large telescope peering at the night sky.',
    answer: 'ASTRONOMER.',
    explanation: 'The letters in "MOON STARER" rearrange precisely to form "ASTRONOMER".',
    tags: ['anagram', 'astronomer', 'space']
  },
  {
    id: 'wor-sc-6',
    category: 'word',
    difficulty: 'medium',
    question: 'Unscramble this anagram into a term for a lively spoken exchange between people: "VOICES RANT ON"',
    hint: 'A discussion or chat.',
    answer: 'CONVERSATION.',
    explanation: 'Rearranging "VOICES RANT ON" yields "CONVERSATION".',
    tags: ['anagram', 'conversation', 'linguistics']
  },
  {
    id: 'wor-sc-7',
    category: 'word',
    difficulty: 'easy',
    question: 'Unscramble this anagram into the organs of vision in the human body: "THEY SEE"',
    hint: 'Two words: THE + plural noun.',
    answer: 'THE EYES.',
    explanation: '"THEY SEE" uses the exact same seven letters as "THE EYES".',
    tags: ['anagram', 'vision', 'eyes']
  },
  {
    id: 'wor-sc-8',
    category: 'word',
    difficulty: 'hard',
    question: 'Unscramble this anagram into an early electrical telegraph communication method: "HERE COME DOTS"',
    hint: 'Invented by Samuel Morse.',
    answer: 'THE MORSE CODE.',
    explanation: '"HERE COME DOTS" anagrams directly into "THE MORSE CODE".',
    tags: ['morse-code', 'anagram', 'history']
  },
  {
    id: 'wor-sc-9',
    category: 'word',
    difficulty: 'medium',
    question: 'Unscramble this anagram into a college campus residential building: "DIRTY ROOM"',
    hint: 'Where university students sleep.',
    answer: 'DORMITORY.',
    explanation: '"DIRTY ROOM" reorganizes cleanly into "DORMITORY".',
    tags: ['dormitory', 'anagram', 'campus']
  },
  {
    id: 'wor-sc-10',
    category: 'word',
    difficulty: 'medium',
    question: 'Unscramble this anagram into casino gambling equipment with spinning reels: "CASH LOST IN ME"',
    hint: 'One-armed bandits in Las Vegas.',
    answer: 'SLOT MACHINES.',
    explanation: '"CASH LOST IN ME" rearranges into "SLOT MACHINES".',
    tags: ['slot-machines', 'anagram', 'games']
  }
];
