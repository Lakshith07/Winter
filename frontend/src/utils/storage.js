// ==========================================
// WINTER ARC — 90 DAYS: LocalStorage & Persistence
// ==========================================

export const STORAGE_KEYS = {
  DAYS: 'winter_arc_days_v1',
  GOALS: 'winter_arc_goals_v1',
  ACHIEVEMENTS: 'winter_arc_achievements_v1',
  IMPROVEMENTS: 'winter_arc_improvements_v1',
  SETTINGS: 'winter_arc_settings_v1',
  WATER_TRACKER: 'winter_arc_water_v1',
  LEETCODE_NOTES: 'winter_arc_leetcode_v1'
};

export const DEFAULT_SETTINGS = {
  userName: 'Lakshith',
  reasonToStart: 'To transform my body, build elite coding mastery, rewire my discipline, and become completely unrecognizable physically and mentally in 90 days.',
  threshold: 6,
  theme: 'dark', // 'dark' | 'light' | 'oled'
  soundEnabled: true,
  simulatedDate: null // When null, uses actual current date
};

export const DEFAULT_GOALS = {
  october: [
    { id: 'g-oct-1', text: 'Lock in 5:30 AM wake up routine with 0 snooze', completed: false, priority: 'high' },
    { id: 'g-oct-2', text: 'Solve 30 LeetCode Medium problems & revise Arrays/Trees', completed: false, priority: 'high' },
    { id: 'g-oct-3', text: 'Hit 100% gym sessions without missing a single leg day', completed: false, priority: 'medium' },
    { id: 'g-oct-4', text: 'Zero sugary drinks and maintain strict caloric deficit/surplus', completed: false, priority: 'medium' }
  ],
  november: [
    { id: 'g-nov-1', text: 'Advance to Dynamic Programming & Graph algorithms', completed: false, priority: 'high' },
    { id: 'g-nov-2', text: 'Increase bench press and squat working weights by 10%', completed: false, priority: 'medium' },
    { id: 'g-nov-3', text: 'Build a full-stack portfolio project from scratch', completed: false, priority: 'high' }
  ],
  december: [
    { id: 'g-dec-1', text: 'Complete all 90 days of the Winter Arc with >90% consistency', completed: false, priority: 'high' },
    { id: 'g-dec-2', text: 'Achieve peak physical conditioning and visible definition', completed: false, priority: 'high' },
    { id: 'g-dec-3', text: 'Review 90 days of metrics and set 2027 high-velocity goals', completed: false, priority: 'medium' }
  ]
};

export const DEFAULT_ACHIEVEMENTS = {
  october: [
    { id: 'a-oct-1', text: 'Committed fully to the 90-Day Winter Arc challenge.', date: 'Oct 1, 2026' }
  ],
  november: [],
  december: []
};

export const DEFAULT_IMPROVEMENTS = {
  october: [
    { id: 'i-oct-1', text: 'Go to sleep before 10:30 PM to make 5:30 AM wakeups effortless.', actionPlan: 'Set phone aside by 10:00 PM.' }
  ],
  november: [],
  december: []
};

/**
 * Safely loads JSON from LocalStorage
 */
export function loadFromStorage(key, defaultValue) {
  try {
    if (typeof window === 'undefined') return defaultValue;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Safely saves data to LocalStorage
 */
export function saveToStorage(key, value) {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(`Error saving localStorage key "${key}":`, error);
  }
}

/**
 * Exports all Winter Arc data into a single formatted JSON payload
 */
export function exportAllData() {
  const exportPayload = {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    days: loadFromStorage(STORAGE_KEYS.DAYS, {}),
    goals: loadFromStorage(STORAGE_KEYS.GOALS, DEFAULT_GOALS),
    achievements: loadFromStorage(STORAGE_KEYS.ACHIEVEMENTS, DEFAULT_ACHIEVEMENTS),
    improvements: loadFromStorage(STORAGE_KEYS.IMPROVEMENTS, DEFAULT_IMPROVEMENTS),
    settings: loadFromStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS)
  };

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  const nowStr = new Date().toISOString().split('T')[0];
  downloadAnchor.setAttribute("download", `winter-arc-backup-${nowStr}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

/**
 * Validates and imports a backup JSON object
 */
export function validateAndImportData(jsonString) {
  try {
    const data = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
    
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid JSON format.');
    }

    if (data.days) saveToStorage(STORAGE_KEYS.DAYS, data.days);
    if (data.goals) saveToStorage(STORAGE_KEYS.GOALS, data.goals);
    if (data.achievements) saveToStorage(STORAGE_KEYS.ACHIEVEMENTS, data.achievements);
    if (data.improvements) saveToStorage(STORAGE_KEYS.IMPROVEMENTS, data.improvements);
    if (data.settings) saveToStorage(STORAGE_KEYS.SETTINGS, { ...DEFAULT_SETTINGS, ...data.settings });

    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message || 'Failed to parse backup file.' };
  }
}

/**
 * Clears all challenge progress and resets to default state
 */
export function resetAllChallengeData() {
  try {
    localStorage.removeItem(STORAGE_KEYS.DAYS);
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(DEFAULT_GOALS));
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(DEFAULT_ACHIEVEMENTS));
    localStorage.setItem(STORAGE_KEYS.IMPROVEMENTS, JSON.stringify(DEFAULT_IMPROVEMENTS));
    // Keep user name but reset other values
    const currentSettings = loadFromStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({ ...DEFAULT_SETTINGS, userName: currentSettings.userName }));
    return true;
  } catch (error) {
    console.error('Error resetting challenge data:', error);
    return false;
  }
}
