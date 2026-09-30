import React, { useState } from 'react';
import { 
  Check, 
  Moon, 
  Lock, 
  Calendar as CalendarIcon, 
  Grid3X3, 
  Table2, 
  Flame, 
  TrendingUp 
} from 'lucide-react';
import DayCell from './DayCell';
import { 
  HABITS, 
  getCompletedCount, 
  isFutureDate, 
  getDayStatus 
} from '../../utils/winterArc';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function MonthGrid({
  monthMeta,
  monthDays = [],
  daysData = {},
  effectiveTodayStr,
  threshold = 6,
  onSelectDay
}) {
  const [viewMode, setViewMode] = useState('calendar'); // 'calendar' | 'matrix'

  // Calculate first day of month day-of-week padding
  const firstDay = monthDays[0];
  const firstDateObj = firstDay ? new Date(firstDay.year, monthMeta.monthIndex, 1) : new Date();
  const startDayOfWeek = firstDateObj.getDay(); // 0 = Sun, 1 = Mon ...

  // Calculate Month Stats
  let monthHabitsTotal = 0;
  let monthPossibleHabits = 0;
  let monthSuccessfulDays = 0;
  let monthSleepSum = 0;
  let monthSleepLogged = 0;

  monthDays.forEach((day) => {
    const isFuture = isFutureDate(day.date, effectiveTodayStr);
    const dayRecord = daysData[day.date] || {};
    const count = getCompletedCount(dayRecord);

    if (!isFuture) {
      monthPossibleHabits += 8;
      monthHabitsTotal += count;
      if (count >= threshold) {
        monthSuccessfulDays++;
      }
    }

    if (dayRecord.sleepHours) {
      monthSleepSum += dayRecord.sleepHours;
      monthSleepLogged++;
    }
  });

  const monthCompletionPct = monthPossibleHabits > 0 
    ? Math.round((monthHabitsTotal / monthPossibleHabits) * 100)
    : 0;

  const avgMonthSleep = monthSleepLogged > 0
    ? (monthSleepSum / monthSleepLogged).toFixed(1)
    : 'N/A';

  return (
    <div className="space-y-4">
      {/* Month Header & Controls */}
      <div className="frost-card rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
              {monthMeta.name}
            </h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
              Days {monthMeta.startDay}–{monthMeta.endDay}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {monthMeta.daysCount} total days • Threshold: {threshold}/8 habits for daily success
          </p>
        </div>

        {/* Month Quick Summary Cards & View Switcher */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Summary Pills */}
          <div className="flex items-center gap-2 text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/5 flex items-center gap-2">
              <span className="text-slate-400">Success Days:</span>
              <span className="font-black text-emerald-400 font-mono">{monthSuccessfulDays}</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/5 flex items-center gap-2">
              <span className="text-slate-400">Adherence:</span>
              <span className="font-black text-sky-400 font-mono">{monthCompletionPct}%</span>
            </div>
            <div className="hidden sm:flex px-3 py-1.5 rounded-xl bg-slate-900/80 border border-white/5 items-center gap-2">
              <span className="text-slate-400">Avg Sleep:</span>
              <span className="font-black text-cyan-300 font-mono">{avgMonthSleep}h</span>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900/90 border border-white/10">
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'calendar' 
                  ? 'bg-sky-500 text-slate-950 shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>Calendar</span>
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'matrix' 
                  ? 'bg-sky-500 text-slate-950 shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Table2 className="w-3.5 h-3.5" />
              <span>Matrix</span>
            </button>
          </div>
        </div>
      </div>

      {/* CALENDAR VIEW */}
      {viewMode === 'calendar' && (
        <div className="frost-card rounded-2xl p-4 sm:p-6 overflow-hidden">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-2 mb-2 text-center">
            {WEEKDAYS.map((day) => (
              <div key={day} className="text-xs font-bold uppercase tracking-wider text-slate-400 py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2 sm:gap-3">
            {/* Empty padding cells for start of month */}
            {Array.from({ length: startDayOfWeek }).map((_, idx) => (
              <div key={`empty-${idx}`} className="hidden sm:block min-h-[90px] rounded-2xl bg-white/[0.01] border border-transparent opacity-20" />
            ))}

            {/* Actual Day Cells */}
            {monthDays.map((dayMeta) => {
              const isToday = dayMeta.date === effectiveTodayStr;
              const isFuture = isFutureDate(dayMeta.date, effectiveTodayStr);
              const dayData = daysData[dayMeta.date] || {};

              return (
                <DayCell
                  key={dayMeta.date}
                  dayMeta={dayMeta}
                  dayData={dayData}
                  isToday={isToday}
                  isFuture={isFuture}
                  threshold={threshold}
                  onClick={onSelectDay}
                />
              );
            })}
          </div>

          {/* Color Legend */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-6 pt-4 border-t border-white/5 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
              <span>100% Completed (8/8)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-teal-400" />
              <span>Threshold Met (≥{threshold}/8)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-sky-400" />
              <span>Partial (1–{threshold - 1})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/60" />
              <span>0 Habits / Missed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full border border-sky-400" />
              <span>Today (Glowing)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-500" />
              <span>Future Date Locked</span>
            </div>
          </div>
        </div>
      )}

      {/* REFERENCE HABIT MATRIX TABLE VIEW */}
      {viewMode === 'matrix' && (
        <div className="frost-card rounded-2xl p-4 sm:p-6 overflow-x-auto">
          <div className="min-w-[800px]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase font-bold text-slate-400 tracking-wider">
                  <th className="py-3 px-3">Day</th>
                  <th className="py-3 px-2">Date</th>
                  {HABITS.map((h) => (
                    <th key={h.id} className="py-3 px-2 text-center" title={h.title}>
                      <span className="text-[10px] block truncate max-w-[60px]">{h.tag}</span>
                    </th>
                  ))}
                  <th className="py-3 px-2 text-center">Sleep</th>
                  <th className="py-3 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs font-medium">
                {monthDays.map((dayMeta) => {
                  const isToday = dayMeta.date === effectiveTodayStr;
                  const isFuture = isFutureDate(dayMeta.date, effectiveTodayStr);
                  const dayData = daysData[dayMeta.date] || {};
                  const count = getCompletedCount(dayData);
                  const isSuccess = count >= threshold;

                  return (
                    <tr
                      key={dayMeta.date}
                      onClick={() => onSelectDay(dayMeta.date)}
                      className={`hover:bg-sky-500/[0.05] cursor-pointer transition-colors ${
                        isToday ? 'bg-sky-500/10 font-bold' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-200">
                        D{String(dayMeta.dayNumber).padStart(2, '0')}
                      </td>
                      <td className="py-2.5 px-2 text-slate-400 whitespace-nowrap">
                        {dayMeta.dayOfMonth} {dayMeta.dayOfWeek}
                      </td>

                      {/* 8 Habit Check Columns */}
                      {HABITS.map((h) => {
                        const habitDone = dayData.habits?.[h.id]?.completed;
                        return (
                          <td key={h.id} className="py-2.5 px-2 text-center">
                            {isFuture ? (
                              <span className="text-slate-700">•</span>
                            ) : habitDone ? (
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                              </span>
                            ) : (
                              <span className="inline-block w-2 h-2 rounded-full bg-slate-800" />
                            )}
                          </td>
                        );
                      })}

                      {/* Sleep Column */}
                      <td className="py-2.5 px-2 text-center font-mono">
                        {dayData.sleepHours ? (
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            dayData.sleepHours < 7 ? 'text-amber-400 bg-amber-500/10' : 'text-cyan-300 bg-cyan-500/10'
                          }`}>
                            {dayData.sleepHours}h
                          </span>
                        ) : (
                          <span className="text-slate-600">-</span>
                        )}
                      </td>

                      {/* Total Habits Status */}
                      <td className="py-2.5 px-3 text-right">
                        {isFuture ? (
                          <span className="text-[10px] text-slate-600">Locked</span>
                        ) : (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                            count === 8
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              : isSuccess
                              ? 'bg-teal-500/20 text-teal-300 border-teal-500/30'
                              : count > 0
                              ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                              : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                          }`}>
                            {count}/8 ({Math.round((count / 8) * 100)}%)
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
