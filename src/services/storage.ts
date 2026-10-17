import { AppSettings, BrainTeaser, UserStats } from '../types';

const STATS_KEY = 'brain_teasers_stats_v1';
const SETTINGS_KEY = 'brain_teasers_settings_v1';

export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  fontSize: 'normal',
  soundEnabled: true,
  soundVolume: 80,
  musicEnabled: false,
  musicTrack: 'zen',
  musicVolume: 50,
  hapticsEnabled: true,
  cardDisplayMode: 'flip3d',
  unseenOnly: false,
  adMobEnabled: true,
  interstitialFrequency: 4 // show simulated interstitial ad every 4 completed teasers
};

export const DEFAULT_STATS: UserStats = {
  solvedIds: [],
  seenIds: [],
  favoriteIds: [],
  revealedWithoutSolvingIds: [],
  hintedIds: [],
  streak: 0,
  bestStreak: 0,
  lastActiveDate: '',
  dailyCompletedDates: [],
  completedCountSinceLastAd: 0,
  xp: 0
};

// Returns current local date as YYYY-MM-DD
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function loadStoredStats(): UserStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return { ...DEFAULT_STATS };
    const parsed = JSON.parse(raw);
    const solvedCount = Array.isArray(parsed.solvedIds) ? parsed.solvedIds.length : 0;
    const computedXp = typeof parsed.xp === 'number' ? parsed.xp : solvedCount * 50;
    return { ...DEFAULT_STATS, ...parsed, xp: computedXp };
  } catch {
    return { ...DEFAULT_STATS };
  }
}

export function saveStoredStats(stats: UserStats): void {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (err) {
    console.error('Failed to save stats to localStorage', err);
  }
}

export function loadStoredSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveStoredSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save settings to localStorage', err);
  }
}

// Deterministically picks daily challenge teaser from full puzzle bank based on date
export function getDailyChallengeTeaser(allTeasers: BrainTeaser[], dateStr: string = getTodayDateString()): BrainTeaser {
  if (allTeasers.length === 0) {
    throw new Error('No brain teasers available');
  }
  // Simple deterministic hash of date string
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);
  const index = positiveHash % allTeasers.length;
  return allTeasers[index];
}

// Calculate streak updates when a teaser or daily challenge is completed
export function updateStreakOnActivity(currentStats: UserStats): { streak: number; bestStreak: number; lastActiveDate: string } {
  const today = getTodayDateString();
  if (currentStats.lastActiveDate === today) {
    return {
      streak: currentStats.streak || 1,
      bestStreak: Math.max(currentStats.bestStreak || 1, currentStats.streak || 1),
      lastActiveDate: today
    };
  }

  // Check if yesterday was active
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

  let newStreak = 1;
  if (currentStats.lastActiveDate === yesterdayStr) {
    newStreak = (currentStats.streak || 0) + 1;
  }

  const newBest = Math.max(currentStats.bestStreak || 0, newStreak);
  return {
    streak: newStreak,
    bestStreak: newBest,
    lastActiveDate: today
  };
}

// Export local data backup
export function exportUserData(): string {
  const stats = loadStoredStats();
  const settings = loadStoredSettings();
  const payload = {
    app: 'BrainTeasers',
    version: 1,
    exportedAt: new Date().toISOString(),
    stats,
    settings
  };
  return JSON.stringify(payload, null, 2);
}

// Import local data backup
export function importUserData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    if (data && data.stats) {
      saveStoredStats({ ...DEFAULT_STATS, ...data.stats });
    }
    if (data && data.settings) {
      saveStoredSettings({ ...DEFAULT_SETTINGS, ...data.settings });
    }
    return true;
  } catch {
    return false;
  }
}
