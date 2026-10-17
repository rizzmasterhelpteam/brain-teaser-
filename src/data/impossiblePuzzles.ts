import { BrainTeaser } from '../types';

export const DISTINCT_IMPOSSIBLE_PUZZLES: BrainTeaser[] = [
  {
    id: 'imp-sc-1',
    category: 'impossible',
    difficulty: 'hard',
    question: 'In a small village, a barber shaves all men who do NOT shave themselves, and ONLY those men. Does the barber shave himself?',
    hint: 'This is Bertrand Russell\'s famous foundational set-theory paradox.',
    answer: 'Neither! If he shaves himself, he must not; if he does not, he must. The premise is a logical contradiction.',
    explanation: 'If the barber shaves himself, he belongs to the group that shaves themselves, so he must not shave himself. If he doesn\'t, he must shave himself. This logical antinomy proved that naive set theory contains inherent contradictions.',
    tags: ['russell-paradox', 'set-theory', 'antinomy']
  },
  {
    id: 'imp-sc-2',
    category: 'impossible',
    difficulty: 'expert',
    question: 'David Hilbert\'s Grand Hotel has an infinite number of rooms (1, 2, 3, 4...), and every single room is currently occupied. A new guest arrives at the front desk. Can the manager provide a room without evicting anyone?',
    hint: 'Shift every existing guest by one room number.',
    answer: 'Yes! Move the guest in Room N to Room N+1, leaving Room 1 completely vacant.',
    explanation: 'Because the set of natural numbers is countably infinite, shifting every occupant N to N+1 frees up Room 1 while still assigning every existing resident to a valid, distinct room: Infinity + 1 = Infinity.',
    tags: ['hilbert-hotel', 'infinity', 'cardinality']
  },
  {
    id: 'imp-sc-3',
    category: 'impossible',
    difficulty: 'hard',
    question: 'A judge sentences a prisoner on Sunday: "You will be hanged at noon on a weekday next week (Mon-Fri), but the day will come as an absolute surprise—you will not know until they knock at noon." Can this sentence be carried out as promised?',
    hint: 'Could the execution happen on Friday afternoon?',
    answer: 'Logically, backwards induction seems to eliminate all days; yet on Wednesday noon when the knock arrives, the prisoner is genuinely surprised!',
    explanation: 'By backwards induction: if not executed by Thursday noon, it must be Friday (so not a surprise), ruling out Friday. Then Thursday is ruled out, then Wednesday, Tuesday, and Monday. The prisoner assumes he is safe, yet a knock on Wednesday is a total surprise! Known as the Surprise Examination Paradox.',
    tags: ['surprise-hanging', 'epistemic', 'induction']
  },
  {
    id: 'imp-sc-4',
    category: 'impossible',
    difficulty: 'medium',
    question: 'The Ship of Theseus sails for 100 years. Over that time, every single wooden plank, rope, and sail is replaced one by one as they wear out, until none of the original physical matter remains. Is it still the same ship?',
    hint: 'Does identity reside in the physical constituent atoms, or in continuous form and history?',
    answer: 'There is no single physical answer: identity is a human conceptual abstraction.',
    explanation: 'This paradox highlights two competing definitions of identity: spatiotemporal continuity (it never stopped being the ship) vs. material composition (none of the original wood remains).',
    tags: ['ship-of-theseus', 'identity', 'philosophy']
  },
  {
    id: 'imp-sc-5',
    category: 'impossible',
    difficulty: 'expert',
    question: 'Can an omnipotent being create a stone so heavy that the being itself cannot lift it?',
    hint: 'Can omnipotence be asked to perform logically contradictory tasks like drawing a square circle?',
    answer: 'The question is a linguistic contradiction, not a genuine restriction of power.',
    explanation: 'A "stone too heavy for an omnipotent being to lift" is an inherently contradictory concept, equivalent to a "married bachelor" or a "four-sided triangle." Logical impossibilities do not represent actual things or actions.',
    tags: ['omnipotence', 'paradox', 'theology', 'logic']
  },
  {
    id: 'imp-sc-6',
    category: 'impossible',
    difficulty: 'expert',
    question: 'Achilles runs 10 times faster than a tortoise, but grants the tortoise a 100-meter head start. Whenever Achilles reaches the tortoise\'s previous spot, the tortoise has moved ahead. Does Achilles ever overtake the tortoise?',
    hint: 'Zeno\'s dichotomy paradox involves summing an infinite series of shrinking time intervals.',
    answer: 'Yes! Achilles overtakes the tortoise at exactly 111.11... meters.',
    explanation: 'While Zeno divided the motion into an infinite number of discrete intervals, the sum of those intervals forms a convergent geometric series (100 + 10 + 1 + 0.1... = 100 / (1 - 0.1) = 111.11 meters) that elapses in finite time.',
    tags: ['zeno', 'achilles', 'calculus', 'infinite-series']
  },
  {
    id: 'imp-sc-7',
    category: 'impossible',
    difficulty: 'hard',
    question: 'Consider the sentence: "This statement is false." If it is true, then it is false. If it is false, then it is true. What is its truth value?',
    hint: 'This is the ancient Epimenides / Eubulides Liar Paradox.',
    answer: 'It has no truth value in standard bivalent logic; it is an antinomy resulting from unrestricted self-reference.',
    explanation: 'Alfred Tarski demonstrated that semantic truth cannot be consistently defined within the same language that allows self-reference without producing contradictions, requiring hierarchical metalanguages.',
    tags: ['liar-paradox', 'tarski', 'self-reference']
  },
  {
    id: 'imp-sc-8',
    category: 'impossible',
    difficulty: 'hard',
    question: 'You have a heap of 1,000,000 grains of sand. Removing one grain still leaves a heap. If you remove one grain at a time, at what single grain does it stop being a "heap"?',
    hint: 'The Sorites Paradox explores vague predicates.',
    answer: 'There is no sharp atomic boundary; "heap" is a vague linguistic predicate without an exact threshold.',
    explanation: 'The Sorites paradox shows that natural language classifications lack crisp mathematical boundaries. Fuzzy logic resolves this by assigning fractional truth values between 0 (not a heap) and 1 (definitely a heap).',
    tags: ['sorites', 'fuzzy-logic', 'vague-predicates']
  }
];
