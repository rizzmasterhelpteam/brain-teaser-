import { BrainTeaser } from '../types';

export const DISTINCT_LOGIC_PUZZLES: BrainTeaser[] = [
  {
    id: 'logic-sc-1',
    category: 'logic',
    difficulty: 'hard',
    question: 'A border bridge between two hostile countries takes 15 minutes to walk across. A sentry on the bridge stays in his watchtower for 5 minutes, then steps out for 1 minute. If he sees anyone attempting to cross, he sends them back to where they came from. You cannot hide or run. How can a person safely escape across the bridge?',
    hint: 'Think about which direction the sentry will send you if he catches you walking in a specific direction.',
    answer: 'Walk across the bridge for 4 minutes. Just before the sentry steps out at minute 5, turn around and walk backward toward where you started. When the sentry sees you, he will order you to turn around and cross to the opposite side!',
    explanation: 'The sentry assumes anyone walking toward him is trying to cross from their departure side, so he orders them "Go back where you came from!", which is the destination you were trying to reach all along!',
    tags: ['border-guard', 'sentry', 'reverse-psychology']
  },
  {
    id: 'logic-sc-2',
    category: 'logic',
    difficulty: 'easy',
    question: 'You have 8 identical gold coins. Exactly one is counterfeit and known to be lighter than the others. Using a two-pan balance scale, what is the minimum number of weighings needed to guarantee finding the fake coin?',
    hint: 'Divide the 8 coins into groups of 3, 3, and 2.',
    answer: 'Only 2 weighings.',
    explanation: 'Weighing 1: Put 3 coins on the left and 3 on the right. If they balance, the fake is among the remaining 2 (weigh those two to find the lighter one in weighing 2). If one side is lighter, weigh any 2 coins from that group of 3 (if balanced, the 3rd is fake; if unbalanced, the scale points to the fake). 2 weighings always suffice!',
    tags: ['coins', 'balance-scale', 'ternary-search']
  },
  {
    id: 'logic-sc-3',
    category: 'logic',
    difficulty: 'hard',
    question: 'Three missionaries and three cannibals must cross a river using a small boat that holds at most two people. At any point on either riverbank, if the cannibals ever outnumber the missionaries, the missionaries will be eaten. The boat cannot row itself. How can all six people reach the other side safely?',
    hint: 'Send two cannibals first, or one of each.',
    answer: '1. Two cannibals cross; one returns. 2. Two cannibals cross; one returns. 3. Two missionaries cross; one missionary & one cannibal return. 4. Two missionaries cross; one cannibal returns. 5. Two cannibals cross; one returns. 6. Two cannibals cross. All 6 arrive safely in 11 trips!',
    explanation: 'By keeping cannibals equal to or fewer than missionaries on each bank at all transitions, missionaries are never outnumbered and all 6 reach the destination safely in 11 crossings.',
    tags: ['river-crossing', 'missionaries-cannibals', 'constraint-satisfaction']
  },
  {
    id: 'logic-sc-4',
    category: 'logic',
    difficulty: 'medium',
    question: 'Three identical closed boxes contain coins. Box A has two gold coins. Box B has two silver coins. Box C has one gold and one silver coin. You choose a box at random and draw one coin blindly without looking inside. The coin you drew is GOLD. What is the probability that the other coin in that same box is ALSO gold?',
    hint: 'This is Bertrand\'s Box Paradox. Count individual gold coins, not just boxes.',
    answer: '2/3 (approximately 66.7%).',
    explanation: 'There are 3 total gold coins in the boxes: Coin G1 and Coin G2 in Box A, and Coin G3 in Box C. If you drew G1, the other coin is G2 (Gold). If you drew G2, the other is G1 (Gold). If you drew G3, the other is Silver. 2 out of the 3 possible gold coin draws leave you with another gold coin: 2/3!',
    tags: ['bertrands-box', 'conditional-probability', 'bayes']
  },
  {
    id: 'logic-sc-5',
    category: 'logic',
    difficulty: 'expert',
    question: 'Three deities—A, B, and C—are named Truth, False, and Random. Truth always speaks truly, False always lies, but whether Random speaks truly or falsely is completely random. They understand English, but answer in their own language with "da" or "ja", which mean "yes" and "no", but you do not know which word means which! How can you determine their identities in only 3 yes/no questions?',
    hint: 'Formulate questions with embedded counterfactual conditionals: "If I were to ask you X, would you say \'da\'?"',
    answer: 'George Boolos\'s solution: Ask deity A a nested conditional question to locate a deity who is definitely NOT Random. Then ask that non-random deity two more nested questions to uncover all identities.',
    explanation: 'By nesting questions ("Would you say \'da\' if I asked you X?"), Truth and False both output \'da\' if X is true, and \'ja\' if X is false, effectively neutralizing the unknown language barrier and isolating Random in 3 inquiries.',
    tags: ['hardest-logic-puzzle', 'boolos', 'gods']
  },
  {
    id: 'logic-sc-6',
    category: 'logic',
    difficulty: 'medium',
    question: 'You have two non-uniform ropes. Each rope takes exactly 60 minutes to burn completely from end to end, but they burn unevenly (one half might burn in 10 minutes and the other in 50). How can you measure exactly 45 minutes?',
    hint: 'Lighting both ends of a rope cuts its total burn time in half.',
    answer: 'Light Rope 1 at both ends and Rope 2 at one end simultaneously. When Rope 1 finishes burning (30 min), immediately light the other end of Rope 2. When Rope 2 burns out, exactly 45 minutes have passed.',
    explanation: 'Rope 1 burns out in 30 minutes. At that exact moment, Rope 2 has 30 minutes of burn time remaining. Lighting its other end burns the remaining half in 15 minutes: 30 + 15 = 45 minutes.',
    tags: ['burning-ropes', 'timing', 'lateral-logic']
  },
  {
    id: 'logic-sc-7',
    category: 'logic',
    difficulty: 'medium',
    question: 'You have an unlimited supply of water, a 3-gallon jug, and a 5-gallon jug. Neither jug has measurement markings. How can you measure out exactly 4 gallons of water into the 5-gallon jug?',
    hint: 'Fill the 5-gallon jug first, or repeatedly fill the 3-gallon jug into the 5-gallon jug.',
    answer: 'Fill the 5-gallon jug. Pour into the 3-gallon jug until full (leaves 2 gal in the 5-gal jug). Empty the 3-gal jug. Pour the 2 gal into the 3-gal jug. Fill the 5-gal jug completely. Pour from the 5-gal jug into the 3-gal jug until full (takes 1 gal). Exactly 4 gallons remain in the 5-gal jug!',
    explanation: '5 - 3 = 2 gal. 2 gal moved to 3-gal jug. 5 gal refilled. 1 gal poured to top off the 3-gal jug: 5 - 1 = 4 gallons.',
    tags: ['water-jugs', 'die-hard', 'diophantine']
  },
  {
    id: 'logic-sc-8',
    category: 'logic',
    difficulty: 'medium',
    question: 'Three boxes are labeled "Apples", "Oranges", and "Apples & Oranges". You are informed that every single box is labeled INCORRECTLY. You may draw one single fruit from one box without looking inside. Which box should you pick from to determine the correct contents of all three boxes?',
    hint: 'Pick from the box labeled "Apples & Oranges".',
    answer: 'Draw one fruit from the box labeled "Apples & Oranges".',
    explanation: 'Since the label "Apples & Oranges" is false, that box must be ALL apples or ALL oranges. If you draw an apple, it is the Apples box! The box labeled "Oranges" cannot be oranges and cannot be apples, so it must be Apples & Oranges. The box labeled "Apples" must then be Oranges.',
    tags: ['labeling', 'boxes', 'deduction']
  },
  {
    id: 'logic-sc-9',
    category: 'logic',
    difficulty: 'hard',
    question: 'You are on a game show with 3 doors. Behind one is a luxury sports car; behind the other two are goats. You pick Door 1. The host, Monty Hall, who knows what is behind every door, opens Door 3 to reveal a goat. He asks: "Do you want to switch to Door 2?" Does switching increase your odds of winning?',
    hint: 'What was the initial probability of your first choice being correct versus wrong?',
    answer: 'Yes! Switching doubles your chance of winning from 1/3 (33.3%) to 2/3 (66.7%).',
    explanation: 'When you picked Door 1, there was a 1/3 chance the car was there and a 2/3 chance it was in the other two doors. Monty eliminating a goat concentrates the entire 2/3 probability into Door 2!',
    tags: ['monty-hall', 'probability', 'paradox']
  },
  {
    id: 'logic-sc-10',
    category: 'logic',
    difficulty: 'hard',
    question: 'Three prisoners stand in a line facing forward. Prisoner 3 can see Prisoners 2 and 1 in front of him. Prisoner 2 can see only Prisoner 1. Prisoner 1 can see no one. They are told there are 3 black hats and 2 white hats. Each is given a hat. Prisoner 3 says: "I do not know my hat color." Prisoner 2 hears this and says: "I also do not know." Hearing both, Prisoner 1 correctly announces his hat color. What color is Prisoner 1 wearing?',
    hint: 'What would Prisoner 3 have seen if Prisoners 1 and 2 both wore white hats?',
    answer: 'Prisoner 1 is wearing a BLACK hat.',
    explanation: 'If Prisoners 1 and 2 were both wearing white hats, Prisoner 3 would have known immediately that his hat was black. Since Prisoner 3 didn\'t know, 1 and 2 cannot both be white. If Prisoner 1 were white, Prisoner 2 would have deduced his own hat was black. Because Prisoner 2 didn\'t know, Prisoner 1 deduced his hat must be BLACK!',
    tags: ['hats', 'line', 'epistemic-logic']
  },
  {
    id: 'logic-sc-11',
    category: 'logic',
    difficulty: 'hard',
    question: 'You have 10 bottles of identical pills. 9 bottles contain pills weighing 10 grams each. Exactly 1 bottle contains defective pills weighing 11 grams each. You have a digital scale that displays exact grams. What is the minimum number of weighings needed to find the defective bottle?',
    hint: 'Take a different number of pills from each bottle.',
    answer: 'Exactly 1 weighing.',
    explanation: 'Take 1 pill from bottle 1, 2 pills from bottle 2, 3 from bottle 3... up to 10 pills from bottle 10 (55 pills total). If all were normal, total weight = 550g. Any excess weight above 550g directly reveals the bottle number! (e.g. 556g means Bottle 6 is defective).',
    tags: ['digital-scale', 'pills', 'single-weighing']
  },
  {
    id: 'logic-sc-12',
    category: 'logic',
    difficulty: 'expert',
    question: 'A king has 1,000 bottles of vintage wine, but one bottle is poisoned with a tasteless, deadly toxin that kills within 24 hours. He has 10 test mice. He must identify the poisoned bottle within 24 hours. How can 10 mice identify the single poisoned bottle in one round?',
    hint: 'Think in binary: 2^10 = 1024.',
    answer: 'Label each bottle in binary from 1 to 1000 (10 bits). Assign each mouse to one bit position. A mouse sips from bottle N if and only if bit position K of N is 1. The dying mice form the binary digits of the poisoned bottle!',
    explanation: 'Because 2^10 = 1024 > 1000, every bottle has a unique 10-bit signature. The combination of which mice succumb after 24 hours reconstructs the exact binary number of the poisoned bottle.',
    tags: ['binary', 'information-theory', 'poisoned-wine']
  },
  {
    id: 'logic-sc-13',
    category: 'logic',
    difficulty: 'expert',
    question: '5 rational, greedy, and bloodthirsty pirates (A, B, C, D, E in order of rank) must divide 100 gold coins. The senior pirate proposes a distribution. All pirates vote (including the proposer). If at least 50% vote yes, the proposal passes; otherwise the proposer is thrown to the sharks and the next senior pirate proposes. What distribution should pirate A propose?',
    hint: 'Use backward induction starting from 2 pirates (D and E).',
    answer: 'Pirate A keeps 98 coins, gives 0 to B, 1 to C, 0 to D, and 1 to E (98, 0, 1, 0, 1).',
    explanation: 'If only D & E remain, D keeps 100 (needs 50%, votes for himself). So in 3 pirates, C gives 1 to E (better than 0) and keeps 99 (99, 0, 1). In 4 pirates, B gives 1 to D and keeps 99 (99, 0, 1, 0). Thus, A needs only 2 votes besides his own: he offers 1 coin to C and 1 coin to E (better than the 0 they get under B). Passing 3-to-2, A gets 98 coins!',
    tags: ['game-theory', 'backward-induction', 'pirates']
  },
  {
    id: 'logic-sc-14',
    category: 'logic',
    difficulty: 'hard',
    question: 'Three guests check into a hotel room costing $30. Each guest chips in $10. Later, the clerk realizes the room was only $25, and hands the bellhop five $1 bills to refund them. The bellhop pockets $2 and gives each guest $1 back. Each guest paid $9 ($27 total), and the bellhop kept $2 ($27 + $2 = $29). Where is the missing $1?',
    hint: 'Look at the math: why are you adding the bellhop\'s stolen money to the total spent instead of subtracting it?',
    answer: 'There is no missing dollar. It is a bookkeeping sleight of hand!',
    explanation: 'The guests paid $27 total. Of that $27, $25 went to the hotel register and $2 went into the bellhop\'s pocket ($25 + $2 = $27). Adding the $2 to $27 is nonsense; the $2 is already part of the $27!',
    tags: ['missing-dollar', 'accounting', 'illusion']
  },
  {
    id: 'logic-sc-15',
    category: 'logic',
    difficulty: 'expert',
    question: 'An island has 100 inhabitants, all with blue eyes. A strict rule states: if anyone discovers they have blue eyes, they must leave the island at midnight. There are no mirrors and no one ever speaks about eye color. One day, a visitor announces to everyone: "At least one person on this island has blue eyes." What happens, and on what night?',
    hint: 'Consider what would happen if only 1 person had blue eyes, then 2, then by mathematical induction.',
    answer: 'All 100 blue-eyed islanders leave together on the 100th night.',
    explanation: 'If N=1, he leaves night 1. If N=2, each sees one blue-eyed person, expects them to leave night 1, and when they don\'t, both realize they have blue eyes and leave on night 2. By induction, common knowledge propagates over 100 days until all 100 leave on the 100th night.',
    tags: ['blue-eyes', 'common-knowledge', 'induction']
  },
  {
    id: 'logic-sc-16',
    category: 'logic',
    difficulty: 'hard',
    question: 'You have a 7-minute hourglass and an 11-minute hourglass. How can you measure exactly 15 minutes to boil a delicate stew?',
    hint: 'Start both hourglasses simultaneously.',
    answer: 'Start both hourglasses together. When the 7-min sand runs out (at 7 min), drop the stew into the pot. 4 minutes remain in the 11-min hourglass. When the 11-min hourglass finishes (4 min of cooking), immediately flip it over to run for 11 more minutes: 4 + 11 = 15 minutes of cooking!',
    explanation: 'The difference between 11 and 7 is 4 minutes. Cooking begins at minute 7, runs through the 4 remaining minutes of the 11-min glass, and continues through one full 11-min flip: 4 + 11 = 15 minutes.',
    tags: ['hourglass', 'timing', 'subtraction']
  },
  {
    id: 'logic-sc-17',
    category: 'logic',
    difficulty: 'medium',
    question: 'Albert and Bernard want to know Cheryl\'s birthday. Cheryl gives them a list of 10 possible dates: May 15, May 16, May 19, June 17, June 18, July 14, July 16, August 14, August 15, August 17. She privately tells Albert the MONTH, and Bernard the DAY. Albert says: "I don\'t know, but I know Bernard doesn\'t know either." Bernard then says: "At first I didn\'t know, but now I know!" Albert says: "Then I also know Cheryl\'s birthday!" What is Cheryl\'s birthday?',
    hint: 'May 19 and June 18 have unique days, so Albert knowing Bernard doesn\'t know eliminates those entire months.',
    answer: 'July 16.',
    explanation: '1. Albert knows Bernard doesn\'t know, eliminating May (has 19) and June (has 18). Only July and August remain.\n2. Bernard says he now knows: this eliminates day 14 (appears in both July & August), leaving July 16, August 15, August 17.\n3. Albert says he now knows: since he knows the month, if it were August he still wouldn\'t know (15 or 17). Thus the month must be July, so July 16!',
    tags: ['cheryls-birthday', 'epistemic-deduction', 'grid']
  },
  {
    id: 'logic-sc-18',
    category: 'logic',
    difficulty: 'medium',
    question: 'Four playing cards lie on a table showing: [ A ], [ K ], [ 4 ], [ 7 ]. The rule states: "If a card has a vowel on one side, it must have an even number on the other side." Which minimum cards MUST you turn over to test whether this rule is true?',
    hint: 'Look for cards that could potentially DISPROVE the rule (the contrapositive).',
    answer: 'Card [ A ] and Card [ 7 ].',
    explanation: 'This is the Wason selection task. Turning [ A ] checks if the back is even. Turning [ 7 ] checks if the back is a vowel (which would violate the rule!). Turning [ 4 ] is unnecessary because consonants can have even numbers. Turning [ K ] is unnecessary because consonants have no rule.',
    tags: ['wason-task', 'contrapositive', 'formal-logic']
  },
  {
    id: 'logic-sc-19',
    category: 'logic',
    difficulty: 'hard',
    question: 'A revolver cylinder has 6 chambers. Two bullets are loaded side-by-side in adjacent chambers. You spin the cylinder once, point it away, and pull the trigger: *CLICK* (empty chamber). Your opponent says you may spin the cylinder again before pulling the trigger a second time, or just pull it immediately. What should you do to maximize your survival?',
    hint: 'Calculate conditional probability: what follows an empty chamber when bullets are adjacent?',
    answer: 'Do NOT spin the cylinder! Pull the trigger immediately.',
    explanation: 'With 2 adjacent bullets, there are 4 empty chambers. Of those 4 empty chambers, 3 are followed by another empty chamber, and only 1 is followed by a bullet! P(survival without spin) = 3/4 = 75%. If you spin, P(survival) resets to 4/6 = 66.7%.',
    tags: ['russian-roulette', 'conditional-probability', 'adjacent']
  },
  {
    id: 'logic-sc-20',
    category: 'logic',
    difficulty: 'medium',
    question: 'You are blindfolded in a dark room. On the table are 100 coins: exactly 10 are heads up, and 90 are tails up. You cannot see or feel which side is up. How can you separate the coins into two piles such that both piles have the EXACT same number of heads-up coins?',
    hint: 'Make a pile of 10 coins and flip all of them over.',
    answer: 'Take any 10 coins to form Pile 1, and flip every single coin in Pile 1 over. The remaining 90 coins form Pile 2. Both piles now have the exact same number of heads!',
    explanation: 'Suppose your chosen 10 coins contain k heads. That leaves (10 - k) heads in the remaining 90 coins. When you flip the 10 coins, the k heads become tails, and the (10 - k) tails become heads! Both piles have exactly (10 - k) heads.',
    tags: ['coins', 'algebra', 'complementary']
  },
  {
    id: 'logic-sc-21',
    category: 'logic',
    difficulty: 'expert',
    question: '100 prisoners are numbered 1 to 100. In a room are 100 closed boxes containing random permutations of the numbers 1 to 100. Each prisoner enters alone and opens at most 50 boxes. If EVERY prisoner finds their own number, all are pardoned; if even ONE fails, all are executed. What strategy gives them over a 30% chance of survival instead of virtually zero ((1/2)^100)?',
    hint: 'Permutations decompose into disjoint cycles. Have each prisoner follow the pointers inside the boxes.',
    answer: 'Loop strategy: each prisoner opens the box matching their own number. If it contains number K, they next open box K, and follow the cycle. If all cycles in the permutation have length ≤ 50, all 100 prisoners succeed (~31.18% chance)!',
    explanation: 'Instead of independent guesses ((1/2)^100 ≈ 8x10^-31), following the permutation cycles links their fates together. The probability that a random permutation of 100 elements has no cycle longer than 50 is 1 - ln(2) ≈ 31.18%!',
    tags: ['100-prisoners', 'cycle-decomposition', 'advanced-logic']
  },
  {
    id: 'logic-sc-22',
    category: 'logic',
    difficulty: 'medium',
    question: 'A detective arrives at a murder crime scene with three suspects: X, Y, and Z. Exactly one is the murderer, one is an accomplice, and one is innocent. The murderer always lies, the accomplice tells the truth or lies, and the innocent person always tells the truth. X says: "Z is the murderer." Y says: "X is innocent." Z says: "I am the accomplice." Who is the murderer, accomplice, and innocent person?',
    hint: 'Can an innocent person claim to be the accomplice? Can a murderer tell the truth?',
    answer: 'X is the Innocent person, Y is the Accomplice, and Z is the Murderer.',
    explanation: 'Z says "I am the accomplice." The innocent cannot say this (they tell truth). If Z were the accomplice, he would be telling the truth about being the accomplice. But if Z is the accomplice, who is the murderer? X says "Z is the murderer", so if X is innocent, Z is indeed the murderer, making Z\'s claim a lie (matching a murderer!). Y is the accomplice, and X is innocent.',
    tags: ['deduction', 'courtroom', 'truth-teller']
  },
  {
    id: 'logic-sc-23',
    category: 'logic',
    difficulty: 'hard',
    question: 'A wealthy king has 3 daughters. To test suitors, he sets 3 identical sealed kettles on a hearth. Suitors are told: "One kettle will boil in 5 minutes, one in 10 minutes, and one in 15 minutes." The clever suitor notices the fire is completely uniform and asks to inspect the kettles before lighting the fire. What did he check to know which boils first?',
    hint: 'What property of liquid or thermal capacity changes boiling time without changing fire strength?',
    answer: 'The amount (volume) of water in each kettle!',
    explanation: 'With identical kettles and uniform fire heat transfer, the kettle containing the smallest volume of water requires the least thermal energy and boils first (5 min), the medium volume in 10 min, and the full kettle in 15 min.',
    tags: ['physics', 'thermodynamics', 'observation']
  },
  {
    id: 'logic-sc-24',
    category: 'logic',
    difficulty: 'hard',
    question: 'Three travelers sit around a campfire in the woods. While sleeping, a trickster smudges soot on all three of their foreheads. In the morning, each person can see the other two foreheads, but not their own. The guide says: "At least one of you has soot on your forehead. If you can deduce that YOUR forehead is smudged, raise your hand." All three look around, and after a few seconds of silence, one traveler raises his hand. How did he deduce his forehead was smudged?',
    hint: 'If his own forehead were clean, what would the other two have reasoned?',
    answer: 'He realized that if his forehead were clean, either of the other two travelers would have immediately known their own forehead was dirty upon seeing the other hesitate.',
    explanation: 'Let travelers be A, B, C. Suppose A\'s head were clean. Then B would look at C and think: "A is clean, so C sees only me; since C didn\'t immediately raise his hand, my forehead must be dirty!" But B did not raise his hand either. A realized that B\'s hesitation proved A\'s own head must be dirty!',
    tags: ['muddy-children', 'common-knowledge', 'induction']
  },
  {
    id: 'logic-sc-25',
    category: 'logic',
    difficulty: 'medium',
    question: 'You have two candles of equal height. Candle 1 burns completely in 4 hours. Candle 2 burns completely in 3 hours. If both candles are lit at the same time, after how many hours will Candle 1 be exactly twice as tall as Candle 2?',
    hint: 'Set up an equation for remaining height: H1(t) = 1 - t/4, H2(t) = 1 - t/3.',
    answer: 'After 2.4 hours (2 hours and 24 minutes).',
    explanation: 'Let initial height = 1. Remaining heights at time t: H1 = 1 - t/4 and H2 = 1 - t/3. We want H1 = 2 * H2: 1 - t/4 = 2(1 - t/3) => 1 - t/4 = 2 - 2t/3. Rearranging: 2t/3 - t/4 = 1 => 5t/12 = 1 => t = 12/5 = 2.4 hours (2 hours, 24 minutes).',
    tags: ['candles', 'algebra', 'rates']
  }
];
