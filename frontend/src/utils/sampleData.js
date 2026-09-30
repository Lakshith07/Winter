// ==========================================
// WINTER ARC — 90 DAYS: Sample / Demo Data Generator
// ==========================================
import { ALL_90_DAYS, HABITS } from './winterArc';

export function generateSampleChallengeData() {
  const sampleDays = {};

  // Fill sample data for up to day 35 (e.g. realistic progress through Oct & early Nov)
  ALL_90_DAYS.forEach((dayMeta, index) => {
    if (index < 38) { // First 38 days filled
      const habits = {};
      
      // High consistency rate (approx 85-90% success)
      const isRestOrChallengingDay = index % 11 === 0;
      const isPerfectDay = index % 3 === 0;

      HABITS.forEach(h => {
        let isDone = true;
        if (isRestOrChallengingDay && (h.id === 'workout' || h.id === 'new_skill')) {
          isDone = false;
        }
        if (index === 14 && (h.id === 'social_media' || h.id === 'diet' || h.id === 'leetcode')) {
          isDone = false;
        }
        if (isPerfectDay) {
          isDone = true;
        }

        habits[h.id] = {
          completed: isDone,
          completedAt: isDone ? (h.id === 'wake_early' ? '05:36 AM' : '07:30 PM') : null
        };
      });

      // Realistic sleep patterns (between 6 and 9 hours)
      const sleepHours = [7, 8, 7.5, 8, 6, 8, 9, 7][index % 8] || 7;

      sampleDays[dayMeta.date] = {
        date: dayMeta.date,
        dayNumber: dayMeta.dayNumber,
        habits,
        sleepHours: Math.round(sleepHours),
        notes: index % 5 === 0 
          ? `Day ${dayMeta.dayNumber}: Crushed morning workout and completed 2 LeetCode problems.` 
          : ''
      };
    }
  });

  return sampleDays;
}
