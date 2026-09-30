import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Flame, 
  Trophy, 
  Moon, 
  CheckSquare, 
  Calendar, 
  Sparkles,
  Filter
} from 'lucide-react';
import { useWinterArc } from '../context/WinterArcContext';
import DailyHabitBarChart from '../components/analytics/DailyHabitBarChart';
import WeeklyConsistencyChart from '../components/analytics/WeeklyConsistencyChart';
import SleepDurationChart from '../components/analytics/SleepDurationChart';
import HabitAdherenceChart from '../components/analytics/HabitAdherenceChart';
import MilestoneBadges from '../components/analytics/MilestoneBadges';
import StatCard from '../components/dashboard/StatCard';
import { 
  ALL_90_DAYS, 
  MONTHS, 
  HABITS, 
  getCompletedCount, 
  isFutureDate 
} from '../utils/winterArc';

export default function AnalyticsPage() {
  const { 
    daysData, 
    effectiveTodayStr, 
    stats, 
    settings 
  } = useWinterArc();

  const [activeRange, setActiveRange] = useState('all'); // 'all' | 'october' | 'november' | 'december'

  const filteredDaysList = React.useMemo(() => {
    if (activeRange === 'all') return ALL_90_DAYS;
    return ALL_90_DAYS.filter(d => d.month === activeRange);
  }, [activeRange]);

  // Compute monthly completion percentages for Oct, Nov, Dec
  const monthlyStats = React.useMemo(() => {
    return MONTHS.map((m) => {
      const monthDays = ALL_90_DAYS.filter(d => d.month === m.key);
      let completed = 0;
      let possible = 0;
      let successful = 0;

      monthDays.forEach((d) => {
        const isFuture = isFutureDate(d.date, effectiveTodayStr);
        if (!isFuture) {
          possible += 8;
          const count = getCompletedCount(daysData[d.date]);
          completed += count;
          if (count >= (settings.threshold || 6)) successful++;
        }
      });

      const rate = possible > 0 ? Math.round((completed / possible) * 100) : 0;

      return {
        ...m,
        completed,
        possible,
        successful,
        rate
      };
    });
  }, [daysData, effectiveTodayStr, settings.threshold]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold tracking-widest uppercase mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            Performance Intelligence
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Progress Analytics & Metrics
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Data-backed visualization of your discipline, habit execution, and recovery
          </p>
        </div>

        {/* Range Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/80 border border-white/10 select-none">
          <button
            onClick={() => setActiveRange('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeRange === 'all'
                ? 'bg-sky-500 text-slate-950 shadow-sm font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All 90 Days
          </button>
          {MONTHS.map((m) => (
            <button
              key={m.key}
              onClick={() => setActiveRange(m.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeRange === m.key
                  ? 'bg-sky-500 text-slate-950 shadow-sm font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {m.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Current Streak"
          value={`${stats.currentStreak} Days`}
          subtitle="Consecutive successful days"
          iconName="Flame"
          variant="orange"
          badge="Live"
        />

        <StatCard
          title="Longest Streak"
          value={`${stats.longestStreak} Days`}
          subtitle="Challenge high-water mark"
          iconName="Trophy"
          variant="amber"
          badge="All-Time"
        />

        <StatCard
          title="Total Habits Checked"
          value={`${stats.totalHabitsCompleted}`}
          subtitle="Out of 720 total possible"
          iconName="CheckSquare"
          variant="emerald"
          badge="Volume"
        />

        <StatCard
          title="Average Sleep"
          value={stats.avgSleep > 0 ? `${stats.avgSleep}h` : 'N/A'}
          subtitle={`${stats.totalSleepLoggedDays} nights recorded`}
          iconName="Clock"
          variant="purple"
          badge="Recovery"
        />
      </div>

      {/* 3. Monthly Completion Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {monthlyStats.map((m) => (
          <div key={m.key} className="frost-card rounded-2xl p-5 border flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-slate-400">{m.name}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Days {m.startDay}–{m.endDay}
              </span>
            </div>

            <div className="my-3">
              <div className="text-2xl font-black text-slate-100 font-mono">
                {m.rate}% <span className="text-xs font-semibold text-slate-400">Adherence</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {m.successful} Successful Days • {m.completed} habits done
              </div>
            </div>

            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${m.rate}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 4. Daily Habit Completion Chart */}
      <DailyHabitBarChart
        daysList={filteredDaysList}
        daysData={daysData}
        effectiveTodayStr={effectiveTodayStr}
        threshold={settings.threshold || 6}
      />

      {/* 5. Weekly Consistency & Habit Adherence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyConsistencyChart
          daysData={daysData}
          effectiveTodayStr={effectiveTodayStr}
          threshold={settings.threshold || 6}
        />
        <HabitAdherenceChart
          daysList={filteredDaysList}
          daysData={daysData}
          effectiveTodayStr={effectiveTodayStr}
        />
      </div>

      {/* 6. Sleep Duration Chart */}
      <SleepDurationChart
        daysList={filteredDaysList}
        daysData={daysData}
        effectiveTodayStr={effectiveTodayStr}
      />

      {/* 7. Milestone Trophy Gallery */}
      <MilestoneBadges />
    </div>
  );
}
