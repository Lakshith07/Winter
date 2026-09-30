// ==========================================
// WINTER ARC — 90 DAYS: Core Calculations & Engine
// ==========================================

export const CHALLENGE_START = '2026-10-01';
export const CHALLENGE_END = '2026-12-29';
export const TOTAL_DAYS = 90;
export const DEFAULT_THRESHOLD = 6;
export const DEFAULT_USER_NAME = 'Lakshith';

export const HABITS = [
  {
    id: 'wake_early',
    title: 'Wake up at 5:30–5:40 AM',
    subtitle: 'Conquer the dawn before the world awakens',
    category: 'Discipline',
    iconName: 'AlarmClock',
    accentColor: 'amber',
    tag: '05:30 AM'
  },
  {
    id: 'workout',
    title: 'Gym / Workout',
    subtitle: 'Intense strength training & conditioning',
    category: 'Fitness',
    iconName: 'Dumbbell',
    accentColor: 'orange',
    tag: 'Physical'
  },
  {
    id: 'diet',
    title: 'Follow my diet',
    subtitle: 'Clean fuel, hit protein target, 0 junk',
    category: 'Nutrition',
    iconName: 'Utensils',
    accentColor: 'emerald',
    tag: 'Fuel'
  },
  {
    id: 'water',
    title: 'Drink enough water',
    subtitle: 'Stay hydrated with 3.5–4.0 Liters daily',
    category: 'Health',
    iconName: 'Droplets',
    accentColor: 'cyan',
    tag: 'Hydration'
  },
  {
    id: 'leetcode',
    title: 'Solve one LeetCode problem',
    subtitle: 'Sharpen logic with 1 Medium/Hard algorithm',
    category: 'Coding',
    iconName: 'Code2',
    accentColor: 'yellow',
    tag: 'Algorithms'
  },
  {
    id: 'dsa',
    title: 'DSA practice',
    subtitle: 'Master data structure patterns & system concepts',
    category: 'Engineering',
    iconName: 'Cpu',
    accentColor: 'blue',
    tag: 'Core CS'
  },
  {
    id: 'social_media',
    title: 'Limit social media',
    subtitle: 'Zero mindless scrolling, protect dopamine',
    category: 'Focus',
    iconName: 'PhoneOff',
    accentColor: 'rose',
    tag: 'Mental Armor'
  },
  {
    id: 'new_skill',
    title: 'Learn one new skill daily',
    subtitle: '30+ minutes deliberate learning & expansion',
    category: 'Growth',
    iconName: 'Sparkles',
    accentColor: 'purple',
    tag: 'Evolution'
  }
];

export const SLEEP_OPTIONS = [4, 5, 6, 7, 8, 9, 10];

export const STREAK_MILESTONES = [
  { days: 3, title: 'Spark of Discipline', desc: '3 consecutive days of showing up.', icon: 'Flame', tier: 'bronze' },
  { days: 7, title: 'Iron Habit', desc: '1 full week of relentless consistency.', icon: 'Zap', tier: 'silver' },
  { days: 14, title: 'Two Weeks of Fortitude', desc: 'Neural pathways locking in.', icon: 'ShieldCheck', tier: 'silver' },
  { days: 21, title: 'Rewired Mind', desc: '3 weeks: The scientific habit threshold.', icon: 'Brain', tier: 'gold' },
  { days: 30, title: 'Phase 1: The Foundation', desc: '30 days completed. Unshakable routine.', icon: 'Award', tier: 'gold' },
  { days: 45, title: 'Halfway Unrecognizable', desc: 'Day 45 milestone. Transforming.', icon: 'Compass', tier: 'platinum' },
  { days: 60, title: 'Phase 2: Cold Mastery', desc: '60 days of pure execution.', icon: 'Medal', tier: 'platinum' },
  { days: 75, title: 'Apex Predator', desc: '15 days remaining. The final push.', icon: 'Crown', tier: 'diamond' },
  { days: 90, title: 'UNRECOGNIZABLE VICTORY', desc: 'The 90-day Winter Arc finished. A new you.', icon: 'Trophy', tier: 'mythic' }
];

export const MONTHS = [
  { key: 'october', name: 'October 2026', shortName: 'Oct', daysCount: 31, startDay: 1, endDay: 31, monthIndex: 9, year: 2026 },
  { key: 'november', name: 'November 2026', shortName: 'Nov', daysCount: 30, startDay: 32, endDay: 61, monthIndex: 10, year: 2026 },
  { key: 'december', name: 'December 2026', shortName: 'Dec', daysCount: 29, startDay: 62, endDay: 90, monthIndex: 11, year: 2026 }
];

/**
 * Generates all 90 challenge dates metadata
 */
export function generate90Days() {
  const days = [];
  let dayCounter = 1;

  // October 1 to 31 (31 days)
  for (let d = 1; d <= 31; d++) {
    const dayStr = String(d).padStart(2, '0');
    const dateStr = `2026-10-${dayStr}`;
    const dateObj = new Date(2026, 9, d);
    days.push({
      dayNumber: dayCounter++,
      date: dateStr,
      dayOfMonth: d,
      month: 'october',
      monthName: 'October',
      year: 2026,
      dayOfWeek: dateObj.toLocaleDateString('en-US', { weekday: 'short' }),
      fullDateLabel: `October ${d}, 2026`
    });
  }

  // November 1 to 30 (30 days)
  for (let d = 1; d <= 30; d++) {
    const dayStr = String(d).padStart(2, '0');
    const dateStr = `2026-11-${dayStr}`;
    const dateObj = new Date(2026, 10, d);
    days.push({
      dayNumber: dayCounter++,
      date: dateStr,
      dayOfMonth: d,
      month: 'november',
      monthName: 'November',
      year: 2026,
      dayOfWeek: dateObj.toLocaleDateString('en-US', { weekday: 'short' }),
      fullDateLabel: `November ${d}, 2026`
    });
  }

  // December 1 to 29 (29 days)
  for (let d = 1; d <= 29; d++) {
    const dayStr = String(d).padStart(2, '0');
    const dateStr = `2026-12-${dayStr}`;
    const dateObj = new Date(2026, 11, d);
    days.push({
      dayNumber: dayCounter++,
      date: dateStr,
      dayOfMonth: d,
      month: 'december',
      monthName: 'December',
      year: 2026,
      dayOfWeek: dateObj.toLocaleDateString('en-US', { weekday: 'short' }),
      fullDateLabel: `December ${d}, 2026`
    });
  }

  return days;
}

export const ALL_90_DAYS = generate90Days();

export const DAY_MAP = ALL_90_DAYS.reduce((acc, item) => {
  acc[item.date] = item;
  return acc;
}, {});

/**
 * Formats a Date object to YYYY-MM-DD
 */
export function formatDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Returns formatted time string e.g. "05:42 AM"
 */
export function formatCurrentTime() {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Checks if a given date string is in the future relative to today's effective date
 */
export function isFutureDate(dateStr, effectiveTodayStr) {
  return dateStr > effectiveTodayStr;
}

/**
 * Returns challenge status: 'before', 'during', or 'completed'
 */
export function getChallengeStatus(effectiveTodayStr) {
  if (effectiveTodayStr < CHALLENGE_START) return 'before';
  if (effectiveTodayStr > CHALLENGE_END) return 'completed';
  return 'during';
}

/**
 * Gets Day X of 90 number for a date
 */
export function getDayNumber(dateStr) {
  if (DAY_MAP[dateStr]) {
    return DAY_MAP[dateStr].dayNumber;
  }
  if (dateStr < CHALLENGE_START) return 0;
  return 90;
}

/**
 * Calculates day status for calendar & UI
 * @returns {'perfect' | 'success' | 'partial' | 'zero' | 'future'}
 */
export function getDayStatus(dayData, isFuture, threshold = DEFAULT_THRESHOLD) {
  const completedCount = getCompletedCount(dayData);
  
  if (isFuture && completedCount === 0) {
    return 'future';
  }
  if (completedCount === 8) {
    return 'perfect'; // 100% Green
  }
  if (completedCount >= threshold) {
    return 'success'; // Green/Cyan
  }
  if (completedCount > 0) {
    return 'partial'; // Blue
  }
  return 'zero'; // Red / Muted Gray
}

export function getCompletedCount(dayData) {
  if (!dayData || !dayData.habits) return 0;
  return Object.values(dayData.habits).filter(h => h && h.completed).length;
}

/**
 * Comprehensive streak & statistics calculator
 */
export function calculateStats(daysData, effectiveTodayStr, threshold = DEFAULT_THRESHOLD) {
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let totalSuccessfulDays = 0;
  let totalMissedDays = 0;
  let totalHabitsCompleted = 0;

  const habitCounts = {
    wake_early: 0,
    workout: 0,
    diet: 0,
    water: 0,
    leetcode: 0,
    dsa: 0,
    social_media: 0,
    new_skill: 0
  };

  let totalSleepSum = 0;
  let totalSleepLoggedDays = 0;
  const sleepDistribution = { short: 0, optimal: 0, surplus: 0 }; // <7h, 7-8h, 9h+

  // Determine elapsed days in challenge (up to effective today, capped 1..90)
  let elapsedDaysCount = 0;
  if (effectiveTodayStr < CHALLENGE_START) {
    elapsedDaysCount = 0;
  } else if (effectiveTodayStr > CHALLENGE_END) {
    elapsedDaysCount = 90;
  } else {
    const todayMeta = DAY_MAP[effectiveTodayStr];
    elapsedDaysCount = todayMeta ? todayMeta.dayNumber : 1;
  }

  // Iterate chronologically through all 90 challenge days
  for (let i = 0; i < ALL_90_DAYS.length; i++) {
    const dayMeta = ALL_90_DAYS[i];
    const dateKey = dayMeta.date;
    const isFuture = isFutureDate(dateKey, effectiveTodayStr);
    const dayRecord = daysData[dateKey] || { habits: {}, sleepHours: null };

    const completedCount = getCompletedCount(dayRecord);
    totalHabitsCompleted += completedCount;

    // Count habit breakdown
    if (dayRecord.habits) {
      Object.keys(habitCounts).forEach(hId => {
        if (dayRecord.habits[hId]?.completed) {
          habitCounts[hId]++;
        }
      });
    }

    // Sleep tracking
    if (dayRecord.sleepHours) {
      totalSleepSum += dayRecord.sleepHours;
      totalSleepLoggedDays++;
      if (dayRecord.sleepHours < 7) {
        sleepDistribution.short++;
      } else if (dayRecord.sleepHours <= 8) {
        sleepDistribution.optimal++;
      } else {
        sleepDistribution.surplus++;
      }
    }

    // Streak and success evaluation
    // We only evaluate streak for days up to today (or past days)
    if (!isFuture) {
      const isSuccess = completedCount >= threshold;
      if (isSuccess) {
        totalSuccessfulDays++;
        tempStreak++;
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
      } else {
        totalMissedDays++;
        tempStreak = 0;
      }
    }
  }

  // Compute Current Streak leading up to effective today
  // If effective today is during challenge:
  currentStreak = tempStreak;

  // If today is day 1 and not yet 6 habits, but it's current day, check if yesterday was successful
  // The streak logic: consecutive successful days right up to today
  const possibleHabitsToDate = Math.max(1, elapsedDaysCount) * 8;
  const overallProgressPct = Math.min(100, Math.round((totalHabitsCompleted / (90 * 8)) * 100));
  const toDateCompletionRate = elapsedDaysCount > 0 
    ? Math.min(100, Math.round((totalHabitsCompleted / possibleHabitsToDate) * 100))
    : 0;

  const avgSleep = totalSleepLoggedDays > 0 
    ? (totalSleepSum / totalSleepLoggedDays).toFixed(1)
    : 0;

  // Milestones evaluation
  const unlockedMilestones = STREAK_MILESTONES.filter(m => longestStreak >= m.days);
  const nextMilestone = STREAK_MILESTONES.find(m => currentStreak < m.days) || STREAK_MILESTONES[STREAK_MILESTONES.length - 1];

  // Today specific
  const todayRecord = daysData[effectiveTodayStr] || { habits: {}, sleepHours: null };
  const todayCompletedCount = getCompletedCount(todayRecord);
  const todayPct = Math.round((todayCompletedCount / 8) * 100);

  const daysRemaining = Math.max(0, 90 - elapsedDaysCount);

  return {
    currentStreak,
    longestStreak,
    totalSuccessfulDays,
    totalMissedDays,
    totalHabitsCompleted,
    overallProgressPct,
    toDateCompletionRate,
    elapsedDaysCount,
    daysRemaining,
    todayCompletedCount,
    todayPct,
    todayRecord,
    habitCounts,
    avgSleep,
    totalSleepLoggedDays,
    sleepDistribution,
    unlockedMilestones,
    nextMilestone
  };
}
