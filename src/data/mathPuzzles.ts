import { BrainTeaser } from '../types';

export const DISTINCT_MATH_PUZZLES: BrainTeaser[] = [
  {
    id: 'math-sc-1',
    category: 'math',
    difficulty: 'easy',
    question: 'A snail is at the bottom of a 30-foot deep well. Each day, it climbs up 3 feet, but each night while sleeping, it slips back down 2 feet. On which day will the snail finally reach the top of the well and escape?',
    hint: 'Once the snail reaches the top on the daytime climb, it escapes before it can slip back down!',
    answer: 'On the 28th day.',
    explanation: 'Over the first 27 days and nights, the snail has a net gain of 1 foot per day, reaching 27 feet. On the morning of day 28, it climbs 3 feet: 27 + 3 = 30 feet! It reaches the top and exits before nightfall.',
    tags: ['snail', 'well', 'rates', 'boundary-condition']
  },
  {
    id: 'math-sc-2',
    category: 'math',
    difficulty: 'medium',
    question: 'Two trains are on a single straight track 100 miles apart, heading directly toward each other. Train A travels at 20 mph, and Train B travels at 30 mph. A super-fast bird begins on Train A and flies back and forth between the two trains at 60 mph until the trains collide. What is the total distance the bird flies?',
    hint: 'Do not calculate each flight leg! Just find how long the trains travel before colliding.',
    answer: '120 miles.',
    explanation: 'The relative speed of the trains approaching each other is 20 + 30 = 50 mph. Time until collision: 100 miles / 50 mph = 2 hours. The bird flies continuously at 60 mph for 2 hours: 60 mph * 2 hours = 120 miles!',
    tags: ['trains', 'bird', 'von-neumann', 'kinematics']
  },
  {
    id: 'math-sc-3',
    category: 'math',
    difficulty: 'hard',
    question: 'There are 100 closed lockers in a hallway and 100 students. Student 1 opens every locker. Student 2 closes every second locker (2, 4, 6...). Student 3 toggles every third locker (3, 6, 9...). This continues until Student 100 toggles locker 100. Which lockers remain OPEN at the very end?',
    hint: 'A locker is toggled once for every factor it has. Most numbers have factors in pairs.',
    answer: 'Lockers with perfect square numbers: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 (10 lockers).',
    explanation: 'A locker is toggled once for each of its divisors. Numbers with an odd number of divisors will end up OPEN. Only perfect squares have an odd number of divisors (e.g. 16 has 1, 2, 4, 8, 16 because 4 * 4 pairs with itself). All other numbers have an even number of divisors and remain closed.',
    tags: ['lockers', 'factors', 'perfect-squares']
  },
  {
    id: 'math-sc-4',
    category: 'math',
    difficulty: 'medium',
    question: 'An elderly father passes away, leaving 17 camels to his three children. His will specifies: the eldest receives 1/2 of the camels, the middle child receives 1/3, and the youngest receives 1/9. No camel may be harmed or cut. The children are stumped until a wise elder arrives on a camel. How does the elder solve the division?',
    hint: 'Notice that 1/2 + 1/3 + 1/9 does not equal 1.',
    answer: 'The elder loans his camel, making 18 camels. Eldest gets 18/2 = 9. Middle gets 18/3 = 6. Youngest gets 18/9 = 2. 9 + 6 + 2 = 17 camels! The elder takes back his loaned camel and rides away.',
    explanation: '1/2 + 1/3 + 1/9 = 9/18 + 6/18 + 2/18 = 17/18. Because the fractions did not sum to 1 (18/18), introducing a temporary 18th camel allows exact integer division and leaves the loaned camel untouched!',
    tags: ['camels', 'fractions', 'classic-parable']
  },
  {
    id: 'math-sc-5',
    category: 'math',
    difficulty: 'medium',
    question: 'A customer buys a $30 pair of shoes at a boutique using a counterfeit $100 bill. The shoe clerk doesn\'t have change, so he takes the $100 bill next door to the grocer, breaks it for five $20 bills, gives the customer $70 change plus the shoes. Later, the grocer discovers the $100 bill is fake, and the shoe clerk repays the grocer $100 cash. What is the shoe store\'s total net financial loss?',
    hint: 'Track what left the shoe store and what entered the shoe store.',
    answer: '$100 in total ($70 in real cash + $30 in shoe value).',
    explanation: 'The transaction with the grocer was a zero-sum wash (the clerk received $100 and gave $100 back). The thief walked away with a $30 pair of shoes and $70 in real cash. Therefore, the shoe store lost exactly $100 ($70 cash + $30 shoes).',
    tags: ['counterfeit-bill', 'business', 'accounting']
  },
  {
    id: 'math-sc-6',
    category: 'math',
    difficulty: 'easy',
    question: 'How many times does the digit "7" appear when writing down all the whole numbers from 1 to 100 inclusive?',
    hint: 'Count the units place and the tens place separately.',
    answer: '20 times.',
    explanation: 'Units place: 7, 17, 27, 37, 47, 57, 67, 77, 87, 97 (10 times). Tens place: 70, 71, 72, 73, 74, 75, 76, 77, 78, 79 (10 times). Note that 77 counts twice. Total = 10 + 10 = 20 times.',
    tags: ['counting', 'base-10', 'digits']
  },
  {
    id: 'math-sc-7',
    category: 'math',
    difficulty: 'medium',
    question: 'What is the sum of all integers from 1 to 100 (1 + 2 + 3 + ... + 100)?',
    hint: 'Pair the first and last numbers: 1 + 100 = 101, 2 + 99 = 101...',
    answer: '5,050.',
    explanation: 'Young Carl Friedrich Gauss discovered that pairing terms from opposite ends produces 50 pairs of 101: 50 * 101 = 5,050. General formula: n * (n + 1) / 2 = 100 * 101 / 2 = 5,050.',
    tags: ['gauss', 'arithmetic-series', 'summation']
  },
  {
    id: 'math-sc-8',
    category: 'math',
    difficulty: 'hard',
    question: 'Two players play a game on a perfectly circular table. Taking turns, each player places a standard round quarter flat on the table without overlapping any existing quarter or hanging off the edge. The last player who is able to legally place a quarter wins. Can the first player always guarantee a win?',
    hint: 'Use rotational symmetry about the center of the circle.',
    answer: 'Yes! The first player places their first quarter dead-center on the table, then mirrors every subsequent move of Player 2 through the center point.',
    explanation: 'Because a circle has 180-degree rotational symmetry around its center, placing the first coin at the origin leaves the remainder of the table symmetrical. Whenever Player 2 places a coin at coordinates (x, y), Player 1 can always place a coin at the diametrically opposite spot (-x, -y)! Player 1 never runs out of moves.',
    tags: ['game-theory', 'symmetry', 'geometry']
  },
  {
    id: 'math-sc-9',
    category: 'math',
    difficulty: 'hard',
    question: 'What is the smallest positive whole number that leaves a remainder of 1 when divided by 2, 3, 4, 5, and 6, but is exactly divisible by 7 with remainder 0?',
    hint: 'Find the Least Common Multiple (LCM) of 2, 3, 4, 5, and 6, and test multiples of LCM + 1.',
    answer: '301.',
    explanation: 'LCM(2, 3, 4, 5, 6) = 60. The number must have the form 60k + 1. Checking k: k=1: 61 (61/7 = 8 R 5). k=2: 121 (121/7 = 17 R 2). k=3: 181 (181/7 = 25 R 6). k=4: 241 (241/7 = 34 R 3). k=5: 301. 301 / 7 = 43 with remainder 0!',
    tags: ['chinese-remainder', 'modular-arithmetic', 'lcm']
  },
  {
    id: 'math-sc-10',
    category: 'math',
    difficulty: 'medium',
    question: 'On an analog clock, how many times in a 24-hour day do the hour hand and minute hand overlap (point in the exact same direction)?',
    hint: 'It is not 24 times; the hands do not overlap at 12:00 twice in the same 12-hour cycle.',
    answer: '22 times.',
    explanation: 'The minute hand travels 12 revolutions while the hour hand travels 1 revolution in 12 hours. The relative speed difference means they overlap 12 - 1 = 11 times every 12 hours. In a full 24-hour day, they overlap 11 * 2 = 22 times!',
    tags: ['clock', 'angular-velocity', 'relative-motion']
  },
  {
    id: 'math-sc-11',
    category: 'math',
    difficulty: 'medium',
    question: 'You flip a fair coin 3 times. What is the probability of getting AT LEAST two heads in a row?',
    hint: 'List the 8 equally likely outcomes: HHH, HHT, HTH, HTT, THH, THT, TTH, TTT.',
    answer: '3/8 (37.5%).',
    explanation: 'Out of 2^3 = 8 possible sequences, the outcomes with at least two heads in a row are: HHH, HHT, and THH (3 outcomes). Note that HTH has two heads, but they are not consecutive. Thus, 3 / 8 = 37.5%.',
    tags: ['probability', 'coins', 'permutations']
  },
  {
    id: 'math-sc-12',
    category: 'math',
    difficulty: 'hard',
    question: 'A 4-digit number ABCD, when multiplied by 4, produces the 4-digit number DCBA (the digits are exactly reversed). What is the 4-digit number ABCD?',
    hint: 'A must be 2 because 4 * 2000 = 8000 (if A were 3, 4 * 3000 = 12000 which has 5 digits).',
    answer: '2178.',
    explanation: 'Since ABCD * 4 = DCBA: A must be 2, which means D must be 8 (4 * 2 = 8). 4 * 8 ends in 2, confirming A=2. Next, 4 * B cannot carry into the thousands place, so B must be 1. 4 * C + 3 must end in 1, so C = 7. Verifying: 2178 * 4 = 8712!',
    tags: ['cryptarithm', 'number-theory', 'reversal']
  }
];
