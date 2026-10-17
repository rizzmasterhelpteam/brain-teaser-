export type CategoryId = 
  | 'logic' 
  | 'trick' 
  | 'math' 
  | 'word' 
  | 'riddles' 
  | 'lateral' 
  | 'impossible';

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

export interface BrainTeaser {
  id: string;
  question: string;
  hint: string;
  answer: string;
  explanation: string;
  category: CategoryId;
  difficulty: DifficultyLevel;
  tags: string[];
}

export interface UserStats {
  solvedIds: string[];
  seenIds: string[];
  favoriteIds: string[];
  revealedWithoutSolvingIds: string[];
  hintedIds: string[];
  streak: number;
  bestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  dailyCompletedDates: string[]; // ['YYYY-MM-DD', ...]
  completedCountSinceLastAd: number;
  xp: number;
}

export type MusicTrackId = 'zen' | 'deep' | 'rain' | 'cosmic';

export interface AppSettings {
  theme: 'dark' | 'light' | 'system';
  fontSize: 'normal' | 'large' | 'huge';
  soundEnabled: boolean;
  soundVolume: number; // 0 to 100
  musicEnabled: boolean;
  musicTrack: MusicTrackId;
  musicVolume: number; // 0 to 100
  hapticsEnabled: boolean;
  cardDisplayMode: 'flip3d' | 'classic';
  unseenOnly: boolean;
  adMobEnabled: boolean; // simulated test ads
  interstitialFrequency: number; // e.g. every 5 teasers
}

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  emoji: string;
  iconName: string;
  color: string;
  badgeBg: string;
  description: string;
}
