// ==========================================
// WINTER ARC — 90 DAYS: Global State Context
// ==========================================
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  CHALLENGE_START,
  CHALLENGE_END,
  ALL_90_DAYS,
  DAY_MAP,
  HABITS,
  STREAK_MILESTONES,
  calculateStats,
  formatDateKey,
  formatCurrentTime,
  isFutureDate,
  getChallengeStatus
} from '../utils/winterArc';
import {
  STORAGE_KEYS,
  DEFAULT_SETTINGS,
  DEFAULT_GOALS,
  DEFAULT_ACHIEVEMENTS,
  DEFAULT_IMPROVEMENTS,
  loadFromStorage,
  saveToStorage,
  exportAllData,
  validateAndImportData,
  resetAllChallengeData
} from '../utils/storage';
import { soundEngine } from '../utils/sound';
import { generateSampleChallengeData } from '../utils/sampleData';

const WinterArcContext = createContext(null);

export function WinterArcProvider({ children }) {
  // 1. Settings & Preferences
  const [settings, setSettings] = useState(() => 
    loadFromStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS)
  );

  // 2. All 90 Days Habit & Sleep Data
  const [daysData, setDaysData] = useState(() => 
    loadFromStorage(STORAGE_KEYS.DAYS, {})
  );

  // 3. Monthly Goals, Achievements, Improvements
  const [goals, setGoals] = useState(() => 
    loadFromStorage(STORAGE_KEYS.GOALS, DEFAULT_GOALS)
  );
  const [achievements, setAchievements] = useState(() => 
    loadFromStorage(STORAGE_KEYS.ACHIEVEMENTS, DEFAULT_ACHIEVEMENTS)
  );
  const [improvements, setImprovements] = useState(() => 
    loadFromStorage(STORAGE_KEYS.IMPROVEMENTS, DEFAULT_IMPROVEMENTS)
  );

  // 4. Effective Today & Selected Date
  // Real date formatted YYYY-MM-DD
  const realTodayStr = useMemo(() => formatDateKey(new Date()), []);
  
  // If simulated date is set in settings, use that; otherwise use real date or clamp to Challenge start
  const effectiveTodayStr = useMemo(() => {
    if (settings.simulatedDate) return settings.simulatedDate;
    // Default to real today; if real today is before Oct 1, 2026, we can still default selected date to Day 1
    return realTodayStr;
  }, [settings.simulatedDate, realTodayStr]);

  // Selected date in the workspace/habits page (defaults to Day 1 if before challenge, or effectiveToday)
  const [selectedDate, setSelectedDate] = useState(() => {
    if (effectiveTodayStr < CHALLENGE_START) return CHALLENGE_START;
    if (effectiveTodayStr > CHALLENGE_END) return CHALLENGE_END;
    return effectiveTodayStr;
  });

  // Modal / Toast states
  const [activeMilestone, setActiveMilestone] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync settings theme to HTML body
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-oled');
    if (settings.theme === 'light') {
      root.classList.add('theme-light');
    } else if (settings.theme === 'oled') {
      root.classList.add('theme-oled');
    }
  }, [settings.theme]);

  // Save changes to localStorage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SETTINGS, settings);
  }, [settings]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.DAYS, daysData);
  }, [daysData]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.GOALS, goals);
  }, [goals]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ACHIEVEMENTS, achievements);
  }, [achievements]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.IMPROVEMENTS, improvements);
  }, [improvements]);

  // Derived Stats
  const stats = useMemo(() => {
    return calculateStats(daysData, effectiveTodayStr, settings.threshold || 6);
  }, [daysData, effectiveTodayStr, settings.threshold]);

  // Challenge Status ('before', 'during', 'completed')
  const challengeStatus = useMemo(() => {
    return getChallengeStatus(effectiveTodayStr);
  }, [effectiveTodayStr]);

  // Confetti trigger helper
  const triggerConfetti = (isMilestone = false) => {
    try {
      if (typeof confetti === 'function') {
        if (isMilestone) {
          confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#38bdf8', '#00f2fe', '#f59e0b', '#10b981', '#ffffff']
          });
        } else {
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#38bdf8', '#10b981', '#3b82f6', '#93c5fd']
          });
        }
      }
    } catch (e) {
      // Ignore
    }
  };

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // -------------------------------------------------------------
  // HABIT ACTIONS
  // -------------------------------------------------------------
  const toggleHabit = (dateStr, habitId) => {
    // Check future date restriction
    if (isFutureDate(dateStr, effectiveTodayStr)) {
      showToast("Cannot complete habits for future dates.", "error");
      return;
    }

    const currentDayRecord = daysData[dateStr] || {
      date: dateStr,
      dayNumber: DAY_MAP[dateStr]?.dayNumber || 1,
      habits: {},
      sleepHours: null,
      notes: ''
    };

    const currentHabit = currentDayRecord.habits?.[habitId] || { completed: false, completedAt: null };
    const nextCompleted = !currentHabit.completed;

    const updatedHabits = {
      ...currentDayRecord.habits,
      [habitId]: {
        completed: nextCompleted,
        completedAt: nextCompleted ? formatCurrentTime() : null
      }
    };

    const updatedDayRecord = {
      ...currentDayRecord,
      date: dateStr,
      dayNumber: DAY_MAP[dateStr]?.dayNumber || 1,
      habits: updatedHabits
    };

    // Calculate completed count for this day
    const newCompletedCount = Object.values(updatedHabits).filter(h => h?.completed).length;

    // Play sounds
    if (nextCompleted) {
      if (newCompletedCount === 8) {
        soundEngine.playCelebrationSound(settings.soundEnabled);
        triggerConfetti(true);
        showToast("All 8 habits completed today! Legendary discipline.", "celebrate");
      } else {
        soundEngine.playCheckSound(settings.soundEnabled);
      }
    } else {
      soundEngine.playUncheckSound(settings.soundEnabled);
    }

    const nextDaysData = {
      ...daysData,
      [dateStr]: updatedDayRecord
    };

    setDaysData(nextDaysData);

    // Check for newly unlocked milestone
    const newStats = calculateStats(nextDaysData, effectiveTodayStr, settings.threshold || 6);
    if (newStats.currentStreak > stats.currentStreak) {
      const milestoneHit = STREAK_MILESTONES.find(m => m.days === newStats.currentStreak);
      if (milestoneHit) {
        setActiveMilestone(milestoneHit);
        soundEngine.playMilestoneSound(settings.soundEnabled);
        triggerConfetti(true);
      }
    }
  };

  const setSleepHours = (dateStr, hours) => {
    const currentDayRecord = daysData[dateStr] || {
      date: dateStr,
      dayNumber: DAY_MAP[dateStr]?.dayNumber || 1,
      habits: {},
      sleepHours: null,
      notes: ''
    };

    const nextDayRecord = {
      ...currentDayRecord,
      sleepHours: hours
    };

    setDaysData(prev => ({
      ...prev,
      [dateStr]: nextDayRecord
    }));

    soundEngine.playCheckSound(settings.soundEnabled);
    showToast(`Logged ${hours} hours of sleep for ${DAY_MAP[dateStr]?.fullDateLabel || dateStr}.`);
  };

  const setDayNotes = (dateStr, notes) => {
    const currentDayRecord = daysData[dateStr] || {
      date: dateStr,
      dayNumber: DAY_MAP[dateStr]?.dayNumber || 1,
      habits: {},
      sleepHours: null,
      notes: ''
    };

    setDaysData(prev => ({
      ...prev,
      [dateStr]: {
        ...currentDayRecord,
        notes
      }
    }));
    showToast("Notes saved successfully.");
  };

  // -------------------------------------------------------------
  // MONTHLY GOALS ACTIONS
  // -------------------------------------------------------------
  const addGoal = (month, text, priority = 'medium') => {
    if (!text.trim()) return;
    const newGoal = {
      id: `g-${month}-${Date.now()}`,
      text: text.trim(),
      completed: false,
      priority
    };
    setGoals(prev => ({
      ...prev,
      [month]: [...(prev[month] || []), newGoal]
    }));
    soundEngine.playCheckSound(settings.soundEnabled);
    showToast("Goal added.");
  };

  const toggleGoal = (month, goalId) => {
    setGoals(prev => {
      const updatedList = (prev[month] || []).map(g => 
        g.id === goalId ? { ...g, completed: !g.completed } : g
      );
      return { ...prev, [month]: updatedList };
    });
    soundEngine.playCheckSound(settings.soundEnabled);
  };

  const deleteGoal = (month, goalId) => {
    setGoals(prev => ({
      ...prev,
      [month]: (prev[month] || []).filter(g => g.id !== goalId)
    }));
    showToast("Goal deleted.");
  };

  // -------------------------------------------------------------
  // MONTHLY ACHIEVEMENTS ACTIONS
  // -------------------------------------------------------------
  const addAchievement = (month, text) => {
    if (!text.trim()) return;
    const newAch = {
      id: `a-${month}-${Date.now()}`,
      text: text.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setAchievements(prev => ({
      ...prev,
      [month]: [...(prev[month] || []), newAch]
    }));
    soundEngine.playCelebrationSound(settings.soundEnabled);
    triggerConfetti(false);
    showToast("Achievement logged! Keep winning.");
  };

  const deleteAchievement = (month, id) => {
    setAchievements(prev => ({
      ...prev,
      [month]: (prev[month] || []).filter(a => a.id !== id)
    }));
    showToast("Achievement removed.");
  };

  // -------------------------------------------------------------
  // MONTHLY IMPROVEMENTS ACTIONS
  // -------------------------------------------------------------
  const addImprovement = (month, text, actionPlan) => {
    if (!text.trim()) return;
    const newImp = {
      id: `i-${month}-${Date.now()}`,
      text: text.trim(),
      actionPlan: (actionPlan || '').trim()
    };
    setImprovements(prev => ({
      ...prev,
      [month]: [...(prev[month] || []), newImp]
    }));
    soundEngine.playCheckSound(settings.soundEnabled);
    showToast("Improvement note added.");
  };

  const deleteImprovement = (month, id) => {
    setImprovements(prev => ({
      ...prev,
      [month]: (prev[month] || []).filter(i => i.id !== id)
    }));
    showToast("Improvement note removed.");
  };

  // -------------------------------------------------------------
  // SETTINGS & BACKUP ACTIONS
  // -------------------------------------------------------------
  const updateSettings = (partialSettings) => {
    setSettings(prev => ({ ...prev, ...partialSettings }));
    showToast("Settings updated.");
  };

  const exportData = () => {
    exportAllData();
    showToast("Challenge backup downloaded successfully.");
  };

  const importData = (jsonString) => {
    const result = validateAndImportData(jsonString);
    if (result.success) {
      setDaysData(result.data.days || {});
      setGoals(result.data.goals || DEFAULT_GOALS);
      setAchievements(result.data.achievements || DEFAULT_ACHIEVEMENTS);
      setImprovements(result.data.improvements || DEFAULT_IMPROVEMENTS);
      if (result.data.settings) setSettings(result.data.settings);
      showToast("Data imported successfully!");
      return true;
    } else {
      showToast(result.error || "Failed to import data.", "error");
      return false;
    }
  };

  const resetAllData = () => {
    const success = resetAllChallengeData();
    if (success) {
      setDaysData({});
      setGoals(DEFAULT_GOALS);
      setAchievements(DEFAULT_ACHIEVEMENTS);
      setImprovements(DEFAULT_IMPROVEMENTS);
      setSettings(prev => ({ ...DEFAULT_SETTINGS, userName: prev.userName }));
      showToast("Challenge progress reset.");
    }
  };

  const loadSampleData = () => {
    const sample = generateSampleChallengeData();
    setDaysData(sample);
    showToast("Sample challenge demo progress loaded! Enjoy exploring.");
  };

  const value = {
    // Data & state
    daysData,
    settings,
    goals,
    achievements,
    improvements,
    stats,
    challengeStatus,
    effectiveTodayStr,
    realTodayStr,
    selectedDate,
    activeMilestone,
    toastMessage,

    // Setters & Navigation
    setSelectedDate,
    setActiveMilestone,
    setToastMessage,

    // Actions
    toggleHabit,
    setSleepHours,
    setDayNotes,
    addGoal,
    toggleGoal,
    deleteGoal,
    addAchievement,
    deleteAchievement,
    addImprovement,
    deleteImprovement,
    updateSettings,
    exportData,
    importData,
    resetAllData,
    loadSampleData,
    triggerConfetti,
    showToast
  };

  return (
    <WinterArcContext.Provider value={value}>
      {children}
    </WinterArcContext.Provider>
  );
}

export function useWinterArc() {
  const context = useContext(WinterArcContext);
  if (!context) {
    throw new Error('useWinterArc must be used within a WinterArcProvider');
  }
  return context;
}
