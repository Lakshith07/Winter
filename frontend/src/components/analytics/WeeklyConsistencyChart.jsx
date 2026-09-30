import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';
import { ALL_90_DAYS, getCompletedCount, isFutureDate } from '../../utils/winterArc';

export default function WeeklyConsistencyChart({ daysData = {}, effectiveTodayStr, threshold = 6 }) {
  // Group 90 days into 13 weeks (7 days each, week 13 has 6 days)
  const weeks = [];
  const totalWeeks = Math.ceil(ALL_90_DAYS.length / 7);

  for (let w = 0; w < totalWeeks; w++) {
    const weekDays = ALL_90_DAYS.slice(w * 7, (w + 1) * 7);
    let totalCompleted = 0;
    let possibleHabits = 0;
    let successfulDays = 0;
    let activeDaysCount = 0;

    weekDays.forEach((d) => {
      const isFuture = isFutureDate(d.date, effectiveTodayStr);
      if (!isFuture) {
        activeDaysCount++;
        possibleHabits += 8;
        const count = getCompletedCount(daysData[d.date]);
        totalCompleted += count;
        if (count >= threshold) successfulDays++;
      }
    });

    const completionRate = possibleHabits > 0 
      ? Math.round((totalCompleted / possibleHabits) * 100) 
      : 0;

    weeks.push({
      weekName: `W${w + 1}`,
      weekLabel: `Week ${w + 1} (Days ${w * 7 + 1}–${Math.min(90, (w + 1) * 7)})`,
      completionRate,
      successfulDays,
      activeDaysCount,
      hasData: activeDaysCount > 0
    });
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-3 rounded-xl bg-slate-950/95 border border-sky-500/30 text-xs shadow-2xl backdrop-blur-md">
          <div className="font-bold text-slate-100">{data.weekLabel}</div>
          <div className="text-slate-300 mt-1">
            Weekly Consistency: <span className="font-mono text-sky-400 font-bold">{data.completionRate}%</span>
          </div>
          <div className="text-slate-400 mt-0.5">
            Successful Days: <span className="font-mono text-emerald-400 font-bold">{data.successfulDays} / {data.activeDaysCount}</span>
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
            Weekly Consistency Trend
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Weekly adherence percentage across all 13 weeks of the Winter Arc
          </p>
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weeks} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="weeklyAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="weekName" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="completionRate" 
              stroke="#38bdf8" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#weeklyAreaGrad)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
