import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ReferenceLine,
  Cell
} from 'recharts';
import { getCompletedCount, isFutureDate } from '../../utils/winterArc';

export default function DailyHabitBarChart({ 
  daysList = [], 
  daysData = {}, 
  effectiveTodayStr,
  threshold = 6 
}) {
  const chartData = daysList.map((day) => {
    const isFuture = isFutureDate(day.date, effectiveTodayStr);
    const dayRecord = daysData[day.date] || {};
    const count = isFuture ? 0 : getCompletedCount(dayRecord);

    return {
      name: `D${day.dayNumber}`,
      dayNumber: day.dayNumber,
      date: day.date,
      habits: count,
      isFuture,
      label: day.fullDateLabel
    };
  });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-3 rounded-xl bg-slate-950/95 border border-sky-500/30 text-xs shadow-2xl backdrop-blur-md">
          <div className="font-bold text-slate-100">{data.label}</div>
          <div className="text-slate-400 mt-1">
            Challenge Day: <span className="font-mono text-sky-400 font-bold">#{data.dayNumber}</span>
          </div>
          <div className="text-slate-200 mt-0.5">
            Completed: <span className="font-mono text-emerald-400 font-bold">{data.habits} / 8 habits</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            {data.habits === 8 
              ? '★ Perfect Day' 
              : data.habits >= threshold 
              ? '✓ Target Met' 
              : data.isFuture 
              ? '🔒 Future Date' 
              : '⚠ Below Threshold'}
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
            Daily Habit Completion Trend
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Number of habits executed per day (0 to 8). Dotted line shows the {threshold}-habit success threshold.
          </p>
        </div>
      </div>

      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              stroke="#64748b" 
              fontSize={10} 
              tickLine={false}
              interval={daysList.length > 40 ? 4 : 2}
            />
            <YAxis 
              stroke="#64748b" 
              fontSize={10} 
              domain={[0, 8]} 
              ticks={[0, 2, 4, 6, 8]}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              y={threshold} 
              stroke="#38bdf8" 
              strokeDasharray="3 3" 
              label={{ value: `Threshold (${threshold})`, fill: '#38bdf8', fontSize: 10, position: 'right' }} 
            />
            <Bar dataKey="habits" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => {
                let color = '#334155'; // default/future
                if (!entry.isFuture) {
                  if (entry.habits === 8) color = '#10b981'; // Emerald
                  else if (entry.habits >= threshold) color = '#06b6d4'; // Cyan
                  else if (entry.habits > 0) color = '#38bdf8'; // Blue
                  else color = '#f43f5e'; // Rose / Red
                }
                return <Cell key={`cell-${index}`} fill={color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
