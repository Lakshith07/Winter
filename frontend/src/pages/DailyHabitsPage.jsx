import React from 'react';
import { 
  CheckSquare, 
  Sparkles, 
  Calendar, 
  Lock, 
  Trophy, 
  Clock, 
  Flame, 
  RotateCcw,
  Moon
} from 'lucide-react';
import { useWinterArc } from '../context/WinterArcContext';
import DateSelector from '../components/habits/DateSelector';
import HabitCard from '../components/habits/HabitCard';
import DailyCompletionBanner from '../components/habits/DailyCompletionBanner';
import DailyNotesSection from '../components/habits/DailyNotesSection';
import SleepQuickLog from '../components/dashboard/SleepQuickLog';
import { 
  HABITS, 
  DAY_MAP, 
  getCompletedCount, 
  isFutureDate 
} from '../utils/winterArc';

export default function DailyHabitsPage() {
  const { 
    daysData, 
    selectedDate, 
    setSelectedDate, 
    toggleHabit, 
    effectiveTodayStr, 
    settings,
    triggerConfetti 
  } = useWinterArc();

  const currentMeta = DAY_MAP[selectedDate] || { dayNumber: 1, fullDateLabel: selectedDate, dayOfWeek: '' };
  const dayRecord = daysData[selectedDate] || { habits: {}, sleepHours: null, notes: '' };
  const completedCount = getCompletedCount(dayRecord);
  const isFuture = isFutureDate(selectedDate, effectiveTodayStr);
  const isToday = selectedDate === effectiveTodayStr;
  const progressPct = Math.round((completedCount / 8) * 100);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold tracking-widest uppercase mb-2">
            <CheckSquare className="w-3.5 h-3.5" />
            Execution Protocol
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Daily Habits Workspace
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Execute all 8 core disciplines daily. Consistency is non-negotiable.
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-2xl border flex items-center gap-2.5 backdrop-blur-xl ${
            completedCount === 8
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300 frost-glow-emerald'
              : completedCount >= (settings.threshold || 6)
              ? 'bg-teal-500/15 border-teal-500/30 text-teal-300'
              : 'bg-slate-900/80 border-white/10 text-slate-300'
          }`}>
            <span className="text-xs font-semibold text-slate-400">Selected Day:</span>
            <span className="text-sm font-black font-mono">
              {completedCount} / 8 Completed ({progressPct}%)
            </span>
          </div>
        </div>
      </div>

      {/* 2. Date Navigator */}
      <DateSelector 
        selectedDate={selectedDate} 
        onSelectDate={setSelectedDate} 
      />

      {/* 3. Daily Completion Banner (if all 8 completed) */}
      <DailyCompletionBanner completedCount={completedCount} />

      {/* 4. Future Date Lock Notice */}
      {isFuture && (
        <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex items-center gap-3 text-rose-300 text-xs sm:text-sm">
          <Lock className="w-5 h-5 text-rose-400 flex-shrink-0" />
          <div>
            <span className="font-bold">Future Date Locked: </span>
            <span>You cannot mark habits for future days. You can view upcoming schedule or select today / past dates to log entries.</span>
          </div>
        </div>
      )}

      {/* 5. 8 Habits Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            8 Daily Disciplines ({currentMeta.fullDateLabel})
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            {isFuture ? "Locked" : "Click card or checkbox to toggle"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HABITS.map((habit) => {
            const habitData = dayRecord.habits?.[habit.id] || { completed: false, completedAt: null };

            return (
              <HabitCard
                key={habit.id}
                habit={habit}
                habitData={habitData}
                isFuture={isFuture}
                onToggle={(hId) => toggleHabit(selectedDate, hId)}
              />
            );
          })}
        </div>
      </div>

      {/* 6. Sleep Tracker for the Selected Day */}
      <div className="frost-card rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Moon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-100">
                Sleep Duration for {currentMeta.fullDateLabel}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Target: 7–8 hours of quality restorative sleep
              </p>
            </div>
          </div>

          {dayRecord.sleepHours && (
            <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${
              dayRecord.sleepHours < 7
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
            }`}>
              {dayRecord.sleepHours} Hours Recorded
            </span>
          )}
        </div>

        <div className="grid grid-cols-7 gap-2 mt-4">
          {[4, 5, 6, 7, 8, 9, 10].map((hours) => {
            const isSelected = dayRecord.sleepHours === hours;
            return (
              <button
                key={hours}
                type="button"
                disabled={isFuture}
                onClick={() => {
                  if (!isFuture) setSleepHours(selectedDate, hours);
                }}
                className={`py-2 rounded-xl text-xs sm:text-sm font-mono font-bold border transition-all ${
                  isFuture 
                    ? 'opacity-40 cursor-not-allowed border-white/5'
                    : isSelected
                    ? hours < 7
                      ? 'bg-amber-500/25 text-amber-300 border-amber-400 shadow-md'
                      : 'bg-cyan-500/25 text-cyan-200 border-cyan-400 shadow-md'
                    : 'bg-slate-900/40 text-slate-400 border-white/5 hover:border-sky-500/30 hover:text-slate-200'
                }`}
              >
                {hours}h
              </button>
            );
          })}
        </div>
      </div>

      {/* 7. Daily Notes & Reflection */}
      <DailyNotesSection selectedDate={selectedDate} />
    </div>
  );
}
