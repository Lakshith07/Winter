import React from 'react';
import { Lock, Check, Moon, Sparkles } from 'lucide-react';
import { getCompletedCount, getDayStatus, HABITS } from '../../utils/winterArc';

export default function DayCell({
  dayMeta,
  dayData = {},
  isToday = false,
  isFuture = false,
  threshold = 6,
  onClick
}) {
  const completedCount = getCompletedCount(dayData);
  const status = getDayStatus(dayData, isFuture, threshold);
  const sleepHours = dayData.sleepHours;

  const getStatusStyles = () => {
    if (isFuture) {
      return {
        card: 'bg-slate-950/40 border-white/5 text-slate-600 cursor-not-allowed opacity-60',
        badge: 'text-slate-600',
        dot: 'bg-slate-800'
      };
    }
    if (status === 'perfect') { // 8/8 Green
      return {
        card: 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200 hover:border-emerald-400 hover:bg-emerald-950/40 shadow-sm shadow-emerald-500/10 cursor-pointer',
        badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        dot: 'bg-emerald-400'
      };
    }
    if (status === 'success') { // >= Threshold (e.g. 6-7) Cyan/Emerald
      return {
        card: 'bg-teal-950/30 border-teal-500/40 text-teal-200 hover:border-teal-400 hover:bg-teal-950/40 shadow-sm shadow-teal-500/10 cursor-pointer',
        badge: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
        dot: 'bg-teal-400'
      };
    }
    if (status === 'partial') { // 1 to threshold-1 Blue
      return {
        card: 'bg-sky-950/30 border-sky-500/30 text-sky-200 hover:border-sky-400 hover:bg-sky-950/40 cursor-pointer',
        badge: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
        dot: 'bg-sky-400'
      };
    }
    // 0 habits completed (Red or muted gray)
    return {
      card: 'bg-rose-950/15 border-rose-500/20 text-slate-400 hover:border-rose-500/40 hover:bg-rose-950/25 cursor-pointer',
      badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      dot: 'bg-slate-700'
    };
  };

  const styles = getStatusStyles();

  return (
    <div
      onClick={() => onClick(dayMeta.date)}
      className={`relative p-3 rounded-2xl border transition-all duration-200 flex flex-col justify-between min-h-[90px] sm:min-h-[105px] group select-none ${
        styles.card
      } ${
        isToday ? 'ring-2 ring-sky-400 shadow-lg shadow-sky-500/20 z-10 scale-[1.02]' : ''
      }`}
    >
      {/* Top Header: Day Number & Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs sm:text-sm font-black font-mono">
            {String(dayMeta.dayOfMonth).padStart(2, '0')}
          </span>
          <span className="text-[10px] text-slate-500 font-semibold uppercase">
            {dayMeta.dayOfWeek}
          </span>
        </div>

        {isToday ? (
          <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-sky-500 text-slate-950 shadow-sm animate-pulse">
            Today
          </span>
        ) : isFuture ? (
          <Lock className="w-3 h-3 text-slate-600" />
        ) : (
          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ${styles.badge}`}>
            {completedCount}/8
          </span>
        )}
      </div>

      {/* Mini Habit Dots Grid */}
      <div className="grid grid-cols-4 gap-1 my-1.5">
        {HABITS.map((h) => {
          const habitDone = dayData.habits?.[h.id]?.completed;
          return (
            <div
              key={h.id}
              title={h.title}
              className={`h-1.5 rounded-full transition-all ${
                habitDone ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-slate-800'
              }`}
            />
          );
        })}
      </div>

      {/* Bottom Sleep & Challenge Day label */}
      <div className="flex items-center justify-between text-[10px] pt-1 border-t border-white/5">
        <span className="text-slate-500 font-mono text-[9px]">
          D{String(dayMeta.dayNumber).padStart(2, '0')}
        </span>

        {sleepHours ? (
          <span className={`inline-flex items-center gap-0.5 font-bold font-mono ${
            sleepHours < 7 ? 'text-amber-400' : 'text-cyan-400'
          }`}>
            <Moon className="w-2.5 h-2.5" />
            <span>{sleepHours}h</span>
          </span>
        ) : (
          <span className="text-slate-600 text-[9px]">-</span>
        )}
      </div>
    </div>
  );
}
