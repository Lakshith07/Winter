import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell 
} from 'recharts';
import { HABITS, isFutureDate } from '../../utils/winterArc';

export default function HabitAdherenceChart({ daysList = [], daysData = {}, effectiveTodayStr }) {
  // Compute adherence for each of the 8 habits over active days in the current filter
  let activeDaysCount = 0;
  const habitCounts = {};
  HABITS.forEach(h => { habitCounts[h.id] = 0; });

  daysList.forEach((day) => {
    const isFuture = isFutureDate(day.date, effectiveTodayStr);
    if (!isFuture) {
      activeDaysCount++;
      const record = daysData[day.date]?.habits || {};
      HABITS.forEach((h) => {
        if (record[h.id]?.completed) {
          habitCounts[h.id]++;
        }
      });
    }
  });

  const chartData = HABITS.map((h) => {
    const count = habitCounts[h.id] || 0;
    const rate = activeDaysCount > 0 ? Math.round((count / activeDaysCount) * 100) : 0;
    return {
      id: h.id,
      name: h.title,
      category: h.category,
      count,
      rate,
      totalPossible: activeDaysCount
    };
  }).sort((a, b) => b.rate - a.rate);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-3 rounded-xl bg-slate-950/95 border border-sky-500/30 text-xs shadow-2xl backdrop-blur-md">
          <div className="font-bold text-slate-100">{data.name}</div>
          <div className="text-slate-400 mt-0.5">Category: {data.category}</div>
          <div className="text-slate-300 mt-1">
            Adherence: <span className="font-mono text-sky-400 font-bold">{data.rate}%</span> ({data.count}/{data.totalPossible} days)
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="frost-card rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-100">
            Habit Adherence Breakdown
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Adherence percentage for each of the 8 Winter Arc daily habits
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {chartData.map((item, idx) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <span className="text-[10px] text-slate-500 font-mono">#{idx + 1}</span>
                <span>{item.name}</span>
              </span>
              <span className="font-mono font-bold text-sky-400">
                {item.rate}% <span className="text-[10px] text-slate-500 font-normal">({item.count}/{item.totalPossible}d)</span>
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  item.rate >= 90
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    : item.rate >= 75
                    ? 'bg-gradient-to-r from-sky-500 to-cyan-400'
                    : item.rate >= 50
                    ? 'bg-gradient-to-r from-indigo-500 to-sky-400'
                    : 'bg-gradient-to-r from-amber-500 to-rose-400'
                }`}
                style={{ width: `${item.rate}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
