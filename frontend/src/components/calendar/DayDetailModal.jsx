import React, { useState } from 'react';
import { 
  X, 
  Calendar as CalendarIcon, 
  Check, 
  Clock, 
  Moon, 
  Lock, 
  FileText, 
  Trophy, 
  Sparkles,
  AlarmClock,
  Dumbbell,
  Utensils,
  Droplets,
  Code2,
  Cpu,
  PhoneOff
} from 'lucide-react';
import { useWinterArc } from '../../context/WinterArcContext';
import { 
  DAY_MAP, 
  HABITS, 
  SLEEP_OPTIONS, 
  isFutureDate, 
  getCompletedCount 
} from '../../utils/winterArc';

const ICON_MAP = {
  AlarmClock,
  Dumbbell,
  Utensils,
  Droplets,
  Code2,
  Cpu,
  PhoneOff,
  Sparkles
};

export default function DayDetailModal({ dateStr, onClose }) {
  const { 
    daysData, 
    toggleHabit, 
    setSleepHours, 
    setDayNotes, 
    effectiveTodayStr,
    settings 
  } = useWinterArc();

  if (!dateStr) return null;

  const dayMeta = DAY_MAP[dateStr] || { dayNumber: 1, fullDateLabel: dateStr, dayOfWeek: '' };
  const dayRecord = daysData[dateStr] || { habits: {}, sleepHours: null, notes: '' };
  const isFuture = isFutureDate(dateStr, effectiveTodayStr);
  const isToday = dateStr === effectiveTodayStr;
  const completedCount = getCompletedCount(dayRecord);

  const [notes, setNotes] = useState(dayRecord.notes || '');

  const handleNotesBlur = () => {
    if (notes !== dayRecord.notes) {
      setDayNotes(dateStr, notes);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-2xl frost-card rounded-3xl p-6 sm:p-8 shadow-2xl border border-sky-400/20 max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 font-mono font-black text-base frost-glow">
              D{String(dayMeta.dayNumber).padStart(2, '0')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-100">
                  {dayMeta.fullDateLabel}
                </h3>
                {isToday && (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-sky-500 text-slate-950 font-sans">
                    Today
                  </span>
                )}
                {isFuture && (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1 font-sans">
                    <Lock className="w-3 h-3" />
                    Locked
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {dayMeta.dayOfWeek} • Winter Arc 90-Day Challenge
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Completion Status:</span>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
              completedCount === 8
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : completedCount >= (settings.threshold || 6)
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/30'
                : completedCount > 0
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}>
              {completedCount} of 8 Habits ({Math.round((completedCount / 8) * 100)}%)
            </span>
          </div>

          {isFuture ? (
            <span className="text-xs text-slate-500">Future date protected</span>
          ) : (
            <span className="text-xs text-slate-400">Click habits to toggle</span>
          )}
        </div>

        {/* 8 Habits Checklist */}
        <div className="space-y-2.5 mb-6">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
            Daily Habits
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {HABITS.map((habit) => {
              const habitData = dayRecord.habits?.[habit.id] || { completed: false, completedAt: null };
              const isDone = habitData.completed;
              const IconComp = ICON_MAP[habit.iconName] || Sparkles;

              return (
                <div
                  key={habit.id}
                  onClick={() => {
                    if (!isFuture) toggleHabit(dateStr, habit.id);
                  }}
                  className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    isFuture
                      ? 'opacity-50 cursor-not-allowed bg-slate-950/20 border-white/5'
                      : isDone
                      ? 'bg-emerald-950/25 border-emerald-500/35 cursor-pointer hover:bg-emerald-950/35'
                      : 'bg-slate-900/40 border-white/5 cursor-pointer hover:border-sky-500/30 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all flex-shrink-0 ${
                      isDone
                        ? 'bg-emerald-500 text-slate-950'
                        : isFuture
                        ? 'border border-slate-700 bg-slate-900'
                        : 'border-2 border-slate-600 bg-slate-950'
                    }`}>
                      {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : null}
                    </div>

                    <div className="min-w-0">
                      <div className={`text-xs font-bold truncate ${
                        isDone ? 'line-through text-slate-400' : 'text-slate-200'
                      }`}>
                        {habit.title}
                      </div>
                      {isDone && habitData.completedAt && (
                        <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          <span>{habitData.completedAt}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`p-1.5 rounded-lg flex-shrink-0 ${
                    isDone ? 'text-emerald-400' : 'text-slate-500'
                  }`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sleep Tracker Section */}
        <div className="mb-6 pt-4 border-t border-white/5">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5 text-indigo-400" />
              <span>Sleep Hours</span>
            </h4>
            {dayRecord.sleepHours && (
              <span className="text-xs font-bold text-cyan-300 font-mono">
                {dayRecord.sleepHours} Hours Recorded
              </span>
            )}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {SLEEP_OPTIONS.map((h) => {
              const isSelected = dayRecord.sleepHours === h;
              return (
                <button
                  key={h}
                  disabled={isFuture}
                  onClick={() => setSleepHours(dateStr, h)}
                  className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                    isFuture
                      ? 'opacity-40 cursor-not-allowed border-white/5 text-slate-600'
                      : isSelected
                      ? h < 7
                        ? 'bg-amber-500/25 text-amber-300 border-amber-400 shadow-md'
                        : 'bg-cyan-500/25 text-cyan-200 border-cyan-400 shadow-md'
                      : 'bg-slate-900/40 text-slate-400 border-white/5 hover:border-sky-500/30 hover:text-slate-200'
                  }`}
                >
                  {h}h
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes Section */}
        <div className="pt-4 border-t border-white/5">
          <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5 mb-2">
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span>Daily Log & Notes</span>
          </h4>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={handleNotesBlur}
            disabled={isFuture}
            rows={2}
            placeholder={isFuture ? "Future date locked." : "Add workout notes, LeetCode problem details, or lessons learned..."}
            className="w-full p-3 rounded-xl bg-slate-950/80 border border-white/10 text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400/50 leading-relaxed resize-none disabled:opacity-40"
          />
        </div>

        {/* Bottom Close Button */}
        <div className="mt-6 pt-4 border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-lg transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
