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
import { isFutureDate } from '../../utils/winterArc';

export default function SleepDurationChart({ daysList = [], daysData = {}, effectiveTodayStr }) {
  const chartData = daysList.map((day) => {
    const isFuture = isFutureDate(day.date, effectiveTodayStr);
    const dayRecord = daysData[day.date] || {};
    const sleep = dayRecord.sleepHours || 0;

    return {
      name: `D${day.dayNumber}`,
      dayNumber: day.dayNumber,
      date: day.date,
      sleep: isFuture ? 0 : sleep,
      isFuture,
      label: day.fullDateLabel
    };
  });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-3 rounded-xl bg-slate-950/95 border border-indigo-500/30 text-xs shadow-2xl backdrop-blur-md">
          <div className="font-bold text-slate-100">{data.label}</div>
          <div className="text-slate-300 mt-1">
            Sleep Logged: <span className="font-mono text-cyan-300 font-bold">{data.sleep > 0 ? `${data.sleep} Hours` : 'Not logged'}</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {data.sleep >= 7 ? '✓ Optimal Recovery' : data.sleep > 0 ? '⚠ Rest Needed (<7h)' : '—'}
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
            Sleep & Recovery Duration
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Recorded nightly sleep hours. Dotted line marks the 7-hour optimal recovery threshold.
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
              domain={[0, 10]} 
              ticks={[0, 2, 4, 6, 8, 10]}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              y={7} 
              stroke="#06b6d4" 
              strokeDasharray="3 3" 
              label={{ value: 'Optimal (7h)', fill: '#06b6d4', fontSize: 10, position: 'right' }} 
            />
            <Bar dataKey="sleep" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => {
                let color = '#1e293b';
                if (!entry.isFuture && entry.sleep > 0) {
                  color = entry.sleep < 7 ? '#f59e0b' : '#06b6d4';
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
