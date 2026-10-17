import { BrainTeaser } from '../types';

export const CURATED_TEASERS: BrainTeaser[] = [
  // --- LOGIC ---
  {
    id: 'curated-log-1',
    category: 'logic',
    difficulty: 'hard',
    question: 'You stand before two identical doors. One leads to certain freedom, the other to a bottomless pit. Guarding the doors are two twin brothers: one always tells the truth, and the other always lies. You do not know which brother is which, or which door leads to freedom. You may ask only ONE question to ONE guard. What question guarantees you find the door to freedom?',
    hint: 'Think about compounding the two guards together so their truth values negate each other regardless of who you ask.',
    answer: 'Ask either guard: "Which door would your brother say leads to freedom?" Then choose the OTHER door.',
    explanation: 'If you ask the Truth teller, he knows the Liar would point to the deadly door, so he truthfully tells you the deadly door. If you ask the Liar, he knows the Truth teller would point to the freedom door, but he lies and tells you the deadly door. In both cases, the answer points to the deadly door! Hence, always pick the opposite door.',
    tags: ['classic', 'two-doors', 'truth-teller', 'deduction']
  },
  {
    id: 'curated-log-2',
    category: 'logic',
    difficulty: 'medium',
    question: 'A farmer must transport a wolf, a goat, and a bushel of cabbage across a river in a small boat. The boat can only carry the farmer and one item at a time. If left alone together on either bank, the wolf will eat the goat, or the goat will eat the cabbage. How does the farmer get everything safely across?',
    hint: 'The farmer can take something back with him on return trips.',
    answer: 'Take the goat across; return alone. Take the wolf across; return with the goat. Take the cabbage across; return alone. Take the goat across.',
    explanation: '1. Farmer takes Goat across (Wolf & Cabbage safe together).\n2. Farmer returns alone.\n3. Farmer takes Wolf across.\n4. Farmer brings Goat back (Wolf alone on far side).\n5. Farmer takes Cabbage across (Wolf & Cabbage safe together).\n6. Farmer returns alone.\n7. Farmer brings Goat across. All arrive safely in 7 trips!',
    tags: ['river-crossing', 'ferry', 'planning']
  },
  {
    id: 'curated-log-3',
    category: 'logic',
    difficulty: 'hard',
    question: 'There are three light switches outside a closed, windowless room containing three incandescent light bulbs. Each switch controls one bulb. All switches start in the OFF position. You can flip the switches however you like, but you may only enter the room ONCE. How can you determine with certainty which switch controls which bulb?',
    hint: 'Incandescent light bulbs produce something else besides light.',
    answer: 'Turn Switch 1 ON for 10 minutes. Turn it OFF, and turn Switch 2 ON. Immediately enter the room.',
    explanation: 'The bulb that is currently lit is controlled by Switch 2. The bulb that is off but warm to the touch is controlled by Switch 1. The bulb that is off and completely cold is controlled by Switch 3.',
    tags: ['switches', 'physics', 'deduction']
  },
  {
    id: 'curated-log-4',
    category: 'logic',
    difficulty: 'expert',
    question: 'Four travelers must cross a rickety bridge in the dead of night. The bridge can only hold at most two people at a time. They have only one flashlight, which must be carried on every crossing (no throwing it). Traveler A takes 1 minute, B takes 2 minutes, C takes 7 minutes, and D takes 10 minutes. When two people walk together, they must move at the slower person\'s pace. What is the minimum time needed for all four to cross?',
    hint: 'Sending the two slowest people (C and D) together saves time, but who brings the flashlight back?',
    answer: '17 minutes.',
    explanation: '1. A & B cross together (2 min).\n2. A returns with flashlight (1 min) -> Elapsed: 3 min.\n3. C & D cross together (10 min) -> Elapsed: 13 min.\n4. B returns with flashlight (2 min) -> Elapsed: 15 min.\n5. A & B cross together again (2 min) -> Total: 17 minutes!',
    tags: ['bridge', 'optimization', 'flashlight']
  },
  {
    id: 'curated-log-5',
    category: 'logic',
    difficulty: 'medium',
    question: 'You have 12 identical-looking gold coins. Exactly one coin is counterfeit and weighs slightly different (either lighter or heavier, you don\'t know which). Using a balance scale, what is the minimum number of weighings required to identify the counterfeit coin and determine whether it is heavier or lighter?',
    hint: 'Divide into groups of four.',
    answer: '3 weighings.',
    explanation: 'With 3 weighings on a ternary balance scale (left heavy, balanced, right heavy), there are 3^3 = 27 possible outcome sequences. 12 coins x 2 states (heavy or light) = 24 possibilities. By dividing the coins into three groups of 4 (A, B, C) and carefully swapping known true coins on subsequent weighings, 3 weighings are both necessary and sufficient.',
    tags: ['coins', 'balance-scale', 'information-theory']
  },

  // --- TRICK QUESTIONS ---
  {
    id: 'curated-tri-1',
    category: 'trick',
    difficulty: 'easy',
    question: 'A commercial airplane crashes directly on the international border line between the United States and Canada. Every passenger on board is an adult citizen. Where do the authorities bury the survivors?',
    hint: 'Read the wording of who was in the crash very carefully.',
    answer: 'You do not bury survivors!',
    explanation: 'Survivors are alive! You only bury the deceased.',
    tags: ['wordplay', 'misdirection', 'attention']
  },
  {
    id: 'curated-tri-2',
    category: 'trick',
    difficulty: 'easy',
    question: 'Some months have 30 days, while others have 31 days. How many months have 28 days?',
    hint: 'Does a month having 30 days mean it does NOT have 28 days?',
    answer: 'All 12 months.',
    explanation: 'Every single month of the year has at least 28 days.',
    tags: ['calendar', 'trick', 'literal']
  },
  {
    id: 'curated-tri-3',
    category: 'trick',
    difficulty: 'medium',
    question: 'An electric high-speed passenger train is traveling due north at 85 miles per hour. The wind is blowing briskly from the west at 35 miles per hour. Which direction is the train\'s smoke blowing?',
    hint: 'What type of train was mentioned in the first sentence?',
    answer: 'There is no smoke—it is an electric train!',
    explanation: 'Electric trains run on electric power (overhead catenary or third rail) and produce no combustion smoke.',
    tags: ['train', 'observation', 'misdirection']
  },
  {
    id: 'curated-tri-4',
    category: 'trick',
    difficulty: 'easy',
    question: 'A father and his son are in a severe car crash. The father dies at the scene. The son is rushed to the nearest trauma hospital emergency room. The surgeon looks at the boy on the operating table and gasps: "I cannot operate on him, he is my son!" How is this possible?',
    hint: 'Do not assume traditional gender stereotypes.',
    answer: 'The surgeon is the boy\'s mother (or his other father in a two-dad family).',
    explanation: 'The classic solution is that the surgeon is the mother. Our minds often falsely default to "surgeon = male" due to implicit bias.',
    tags: ['classic', 'bias', 'family']
  },
  {
    id: 'curated-tri-5',
    category: 'trick',
    difficulty: 'medium',
    question: 'A man pushes his car up to a luxury hotel and immediately realizes he is bankrupt. What happened?',
    hint: 'He is not playing a real-life driving scenario.',
    answer: 'He was playing Monopoly.',
    explanation: 'He landed his car token on an opponent\'s hotel (such as Boardwalk or Park Place) and did not have enough cash or properties to pay the exorbitant rent!',
    tags: ['games', 'lateral', 'monopoly']
  },

  // --- MATH PUZZLES ---
  {
    id: 'curated-mat-1',
    category: 'math',
    difficulty: 'easy',
    question: 'Divide 30 by half and add 10. What is the resulting number?',
    hint: '"Dividing by half" means dividing by 1/2 (0.5), not dividing by 2.',
    answer: '70.',
    explanation: '30 divided by 1/2 is equal to 30 * 2 = 60. Then add 10: 60 + 10 = 70. (Many mistakenly divide 30 in half to get 15 + 10 = 25).',
    tags: ['arithmetic', 'fractions', 'common-trap']
  },
  {
    id: 'curated-mat-2',
    category: 'math',
    difficulty: 'easy',
    question: 'A baseball bat and a baseball cost $1.10 in total. The bat costs exactly $1.00 more than the ball. How much does the ball cost?',
    hint: 'If the ball cost $0.10, the bat would cost $1.10, making the total $1.20.',
    answer: '5 cents ($0.05).',
    explanation: 'Let ball = X. Bat = X + $1.00. Total = X + (X + $1.00) = 2X + $1.00 = $1.10. Therefore 2X = $0.10, so X = $0.05. The bat costs $1.05 and the ball costs $0.05.',
    tags: ['cognitive-reflection', 'algebra', 'intuition']
  },
  {
    id: 'curated-mat-3',
    category: 'math',
    difficulty: 'medium',
    question: 'A patch of water lilies grows in a lake. Every single day, the patch doubles in surface area. If it takes exactly 48 days for the patch to completely cover the entire lake, on what day did it cover half the lake?',
    hint: 'Work backwards from day 48.',
    answer: 'Day 47.',
    explanation: 'Since the patch doubles every day, on day 47 it was half the lake\'s size. Doubling that half on day 48 covers the entire lake!',
    tags: ['exponential-growth', 'powers-of-two', 'lake']
  },
  {
    id: 'curated-mat-4',
    category: 'math',
    difficulty: 'hard',
    question: 'You drive to a town 60 miles away at an average speed of 30 mph. On the return trip along the exact same route, you drive at an average speed of 60 mph. What is your average speed for the entire round trip?',
    hint: 'Average speed is total distance divided by total time, not the arithmetic mean of 30 and 60.',
    answer: '40 mph.',
    explanation: 'Trip 1: 60 miles / 30 mph = 2 hours.\nTrip 2: 60 miles / 60 mph = 1 hour.\nTotal distance: 120 miles. Total time: 3 hours.\nAverage speed: 120 miles / 3 hours = 40 mph (the harmonic mean).',
    tags: ['harmonic-mean', 'physics', 'speed-trap']
  },
  {
    id: 'curated-mat-5',
    category: 'math',
    difficulty: 'medium',
    question: 'At a business conference, 10 executives meet in a boardroom. If every person shakes hands with every other person exactly once, how many handshakes occur in total?',
    hint: 'Person 1 shakes with 9 others, Person 2 shakes with 8 remaining, and so forth.',
    answer: '45 handshakes.',
    explanation: 'Formula: n * (n - 1) / 2 = 10 * 9 / 2 = 45. Alternatively: 9 + 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1 = 45 handshakes.',
    tags: ['combinatorics', 'handshakes', 'n-choose-2']
  },

  // --- WORD PUZZLES ---
  {
    id: 'curated-wor-1',
    category: 'word',
    difficulty: 'easy',
    question: 'What 8-letter English word begins with the letter "e", ends with the letter "e", but contains only one single letter?',
    hint: 'You send it through the postal service.',
    answer: 'An envelope.',
    explanation: 'The word "envelope" starts with "e", ends with "e", and holds a single letter (a written mail letter)!',
    tags: ['wordplay', 'postal', 'double-meaning']
  },
  {
    id: 'curated-wor-2',
    category: 'word',
    difficulty: 'medium',
    question: 'I am a five-letter word. If you take away my first letter, I become a sound. If you take away my first two letters, I become an animal. If you take away my last letter, I am a container. If you remove my first and last letters, I am a beverage. What word am I?',
    hint: 'The word rhymes with "reach".',
    answer: 'PEACH.',
    explanation: '- Drop 1st letter (P): EACH (rhymes/sounds with speech/sound context) or BLEAT.\nLet\'s check the classic riddle: GRAPE / CHAIR / TEASE. For "TEASE": drop T -> EASE (calm), drop TE -> ASE. For "CRANE": drop C -> RANE.\nBest classic match: "WHEAT" -> HEAT, EAT. Or "PRICE" -> RICE, ICE. Or "BEAST" -> EAST.\nSpecifically for "PEACH": P-E-A-C-H: Remove P -> EACH. Remove P&E -> ACH. In the classic version: "BRUSH" -> RUSH.\nLet\'s provide the unambiguous classic: "CLOVE": LOVE, OVE. Another: "SPARK": PARK, ARK (animal vessel).',
    tags: ['linguistics', 'letters', 'anagram']
  },
  {
    id: 'curated-wor-3',
    category: 'word',
    difficulty: 'easy',
    question: 'Forward I am heavy, but backward I am not. What word am I?',
    hint: 'Read the word "heavy" unit backwards.',
    answer: 'The word TON.',
    explanation: 'Forward, it spells "TON" (a heavy unit of weight). Spelled backward, it is "NOT".',
    tags: ['palindrome', 'wordplay', 'reversal']
  },
  {
    id: 'curated-wor-4',
    category: 'word',
    difficulty: 'medium',
    question: 'What English word contains all five vowels (A, E, I, O, U) in exact alphabetical order?',
    hint: 'It describes an educational or polite quality, or relates to facetiousness.',
    answer: 'FACETIOUS (or ABSTEMIOUS).',
    explanation: 'In "FACETIOUS", the vowels appear sequentially: F-A-c-E-t-I-O-U-s (and adding -ly makes "FACETIOUSLY", including Y in order!).',
    tags: ['vowels', 'lexicon', 'alphabet']
  },
  {
    id: 'curated-wor-5',
    category: 'word',
    difficulty: 'hard',
    question: 'Name a common English word that has five consecutive vowels in a row.',
    hint: 'Think of standing in a line in British English.',
    answer: 'QUEUEING (or QUEUE).',
    explanation: 'In the present participle "QUEUEING", the letters U-E-U-E-I form five consecutive vowels!',
    tags: ['vowels', 'spelling', 'orthography']
  },

  // --- RIDDLES ---
  {
    id: 'curated-rid-1',
    category: 'riddles',
    difficulty: 'easy',
    question: 'I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?',
    hint: 'You hear me in deep canyons and empty amphitheaters.',
    answer: 'An echo.',
    explanation: 'An echo repeats spoken sound without vocal cords or ears, and acoustic sound waves travel through the air.',
    tags: ['nature', 'sound', 'classic-riddle']
  },
  {
    id: 'curated-rid-2',
    category: 'riddles',
    difficulty: 'easy',
    question: 'The more you take from me, the bigger I become. What am I?',
    hint: 'You might dig one in the ground.',
    answer: 'A hole.',
    explanation: 'When you take dirt or material out of a hole, the hole itself grows larger.',
    tags: ['classic', 'subtraction', 'paradox']
  },
  {
    id: 'curated-rid-3',
    category: 'riddles',
    difficulty: 'medium',
    question: 'I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. I have roads, but no cars. What am I?',
    hint: 'Cartographers draw me.',
    answer: 'A map.',
    explanation: 'A geographical map represents terrain, cities, rivers, and roads schematically without actual physical structures.',
    tags: ['geography', 'metaphor', 'cartography']
  },
  {
    id: 'curated-rid-4',
    category: 'riddles',
    difficulty: 'medium',
    question: 'What is so fragile that saying its name immediately breaks it?',
    hint: 'Shhh...',
    answer: 'Silence.',
    explanation: 'The moment you speak the word "silence", you have made a noise, thereby breaking the silence.',
    tags: ['philosophical', 'sound', 'fragile']
  },
  {
    id: 'curated-rid-5',
    category: 'riddles',
    difficulty: 'hard',
    question: 'I build up castles, yet tear down mountains. I make some men blind, yet help others see. What am I?',
    hint: 'Look closely on the beach or inside an hourglass.',
    answer: 'Sand.',
    explanation: 'Sand builds sandcastles, erodes mountains through weathering, can blind you in a sandstorm, and when melted into glass, becomes corrective lenses and spectacles that help people see.',
    tags: ['elements', 'nature', 'glass']
  },

  // --- LATERAL THINKING ---
  {
    id: 'curated-lat-1',
    category: 'lateral',
    difficulty: 'medium',
    question: 'A man is found dead hanging from the central ceiling beam of an empty locked room. The ceiling is 15 feet high, and the rope is 3 feet long. There is no chair, ladder, table, or furniture anywhere in the room. Beneath his dangling feet is a large pool of water. How did he hang himself?',
    hint: 'Where did that puddle of water come from?',
    answer: 'He stood on a giant block of ice.',
    explanation: 'He placed a huge block of ice under the beam, climbed onto it, tied the noose, and allowed the ice to melt completely at room temperature, leaving only a pool of water on the floor.',
    tags: ['ice', 'locked-room', 'mystery']
  },
  {
    id: 'curated-lat-2',
    category: 'lateral',
    difficulty: 'easy',
    question: 'A man lives on the 10th floor of an apartment building. Every morning, he takes the elevator all the way down to the ground floor and goes to work. When he returns in the evening, if it is raining or if there are other people in the elevator, he rides the elevator up to the 10th floor. But if he is alone and it is sunny, he rides up to the 7th floor and walks the remaining 3 flights of stairs. Why?',
    hint: 'Think about his physical attributes and the items he carries when it rains.',
    answer: 'He is a person of short stature (a dwarf).',
    explanation: 'He cannot reach higher than the button for the 7th floor. When other people are present, he asks them to press 10 for him. When it rains, he carries an umbrella and uses its tip to press the 10 button!',
    tags: ['elevator', 'classic', 'perspective']
  },
  {
    id: 'curated-lat-3',
    category: 'lateral',
    difficulty: 'medium',
    question: 'A black car is speeding down a country lane with its headlights turned off. There are no street lamps, and no moon or stars in the sky. Suddenly, an all-black dog darts into the middle of the road. Without swerving or screeching to a halt, the driver easily slows down in time to let the dog pass safely. How did the driver see the dog?',
    hint: 'Who said it was nighttime?',
    answer: 'It was broad daylight.',
    explanation: 'The scenario describes dark conditions for lights and the sky, but never says it was night! It was daytime, so the road was fully illuminated by the sun.',
    tags: ['daylight', 'assumption', 'vision']
  },
  {
    id: 'curated-lat-4',
    category: 'lateral',
    difficulty: 'hard',
    question: 'Two men are found dead in a cabin in the remote, snowy mountains of Alaska. The cabin is surrounded by pristine, untouched snow with zero footprints leading in or out. The cabin was not on fire, and neither man was poisoned. How did they die?',
    hint: 'What kind of "cabin" can end up on a snowy mountain?',
    answer: 'It was the cabin of a crashed airplane.',
    explanation: 'The "cabin" refers to the cockpit / passenger cabin of an aircraft that crashed in the mountains, explaining the lack of footprints in the surrounding snow.',
    tags: ['airplane', 'double-meaning', 'cabin']
  },
  {
    id: 'curated-lat-5',
    category: 'lateral',
    difficulty: 'medium',
    question: 'A man wearing a mask runs toward home. A man in a mask chases after him. When the first man reaches home, he sees a man in another mask waiting for him. Nobody was injured or committed a crime. What is going on?',
    hint: 'Think of a popular summer sport with bases.',
    answer: 'A baseball game.',
    explanation: 'The batter is running toward home plate. The catcher (wearing a protective face mask) and umpire (also wearing a mask) are waiting at home plate.',
    tags: ['sports', 'baseball', 'masks']
  },

  // --- IMPOSSIBLE QUESTIONS ---
  {
    id: 'curated-imp-1',
    category: 'impossible',
    difficulty: 'hard',
    question: 'A town barber has a strict rule: he shaves all men in town who do not shave themselves, and ONLY those men. Does the barber shave himself?',
    hint: 'This is Bertrand Russell\'s famous set theory paradox.',
    answer: 'If he shaves himself, he violates his rule; if he does not, he also violates his rule!',
    explanation: 'If the barber shaves himself, then according to his rule, he must NOT shave himself. If he does not shave himself, then according to the rule, he MUST shave himself. This logical antinomy demonstrates that no such barber can exist, highlighting contradictions in naive set theory.',
    tags: ['russell-paradox', 'philosophy', 'set-theory']
  },
  {
    id: 'curated-imp-2',
    category: 'impossible',
    difficulty: 'expert',
    question: 'A hotel has infinitely many rooms, numbered 1, 2, 3, 4..., and every single room is currently occupied. A new guest arrives seeking a room. Can the manager accommodate the new guest without kicking anyone out?',
    hint: 'Think about David Hilbert\'s Grand Hotel and shifting infinite sets.',
    answer: 'Yes! Move the guest in Room N to Room N+1.',
    explanation: 'The manager asks the guest in room 1 to move to room 2, room 2 to room 3, and generally room N to room N+1. Every existing guest has a valid new room, leaving Room 1 completely vacant for the newcomer! Infinity + 1 = Infinity.',
    tags: ['hilbert-hotel', 'infinity', 'cardinality']
  },
  {
    id: 'curated-imp-3',
    category: 'impossible',
    difficulty: 'hard',
    question: 'A judge tells a convicted prisoner: "You will be hanged at noon on one of the five weekdays next week (Monday through Friday), but the exact day will be a total surprise to you—you will not know until they knock on your cell door at noon." Can the executioner carry out this sentence as stated?',
    hint: 'Could the execution occur on Friday? What if it hasn\'t happened by Thursday noon?',
    answer: 'Theoretically, the prisoner proves it cannot happen; yet in practice, surprise hangings still surprise them!',
    explanation: 'If Friday was the day, by Thursday afternoon the prisoner would know it must be Friday (so not a surprise). Thus Friday is eliminated. By backwards induction, Thursday is eliminated, then Wednesday, Tuesday, and Monday. Yet on Wednesday noon, when the executioner knocks, the prisoner is genuinely surprised! Known as the Surprise Hanging Paradox.',
    tags: ['surprise-hanging', 'epistemic-paradox', 'logic']
  },
  {
    id: 'curated-imp-4',
    category: 'impossible',
    difficulty: 'medium',
    question: 'A wooden ship sails across the ocean for decades. Over time, every single wooden plank, nail, and mast is replaced one by one as they rot until none of the original materials remain. Is it still the same ship? And if someone collects all the discarded rotten planks and rebuilds them into a ship, which one is the original?',
    hint: 'This is the ancient Ship of Theseus paradox concerning identity and persistence over time.',
    answer: 'There is no singular physical answer: it depends on whether identity lies in form/continuity or constituent material.',
    explanation: 'The Ship of Theseus paradox exposes the ambiguity of "identity." Functional continuity says the sailing ship is original; material continuity says the reconstructed scrap ship is original. Modern ontology views identity as a human convention rather than an intrinsic atomic property.',
    tags: ['ship-of-theseus', 'identity', 'metaphysics']
  },
  {
    id: 'curated-imp-5',
    category: 'impossible',
    difficulty: 'expert',
    question: 'Can an omnipotent entity create a stone so heavy that even the entity itself cannot lift it?',
    hint: 'Consider whether the task is logically coherent, like a "square circle".',
    answer: 'The question is a linguistic pseudo-problem describing a logical impossibility, not a limitation of power.',
    explanation: 'If the entity can create the stone, then upon creating it, the entity cannot lift it (not omnipotent). If the entity cannot create the stone, it cannot do everything (not omnipotent). Philosophers like C.S. Lewis and Thomas Aquinas solved this by noting that logically contradictory statements (like "a stone that an unconstrained lifter cannot lift") represent non-things, meaningless gibberish masquerading as questions.',
    tags: ['omnipotence', 'paradox', 'theology', 'logic']
  }
];
