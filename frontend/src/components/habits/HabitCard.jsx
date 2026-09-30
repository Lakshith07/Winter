import React from 'react';
import { 
  Check, 
  Clock, 
  Lock, 
  AlarmClock, 
  Dumbbell, 
  Utensils, 
  Droplets, 
  Code2, 
  Cpu, 
  PhoneOff, 
  Sparkles,
  Plus,
  Minus,
  ExternalLink
} from 'lucide-react';

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

export default function HabitCard({
  habit,
  habitData = { completed: false, completedAt: null },
  isFuture = false,
  onToggle
}) {
  const isDone = habitData.completed;
  const IconComp = ICON_MAP[habit.iconName] || Sparkles;

  const handleCardClick = () => {
    if (isFuture) return;
    onToggle(habit.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`frost-card rounded-2xl p-5 border transition-all duration-200 relative overflow-hidden select-none ${
        isFuture
          ? 'opacity-60 cursor-not-allowed bg-slate-950/40 border-white/5'
          : isDone
          ? 'bg-gradient-to-br from-emerald-950/20 via-slate-900/60 to-slate-900/90 border-emerald-500/35 frost-glow-emerald cursor-pointer'
          : 'bg-slate-900/40 hover:bg-slate-800/40 border-white/5 hover:border-sky-500/30 cursor-pointer'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left: Checkbox & Info */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Custom Checkbox */}
          <button
            type="button"
            disabled={isFuture}
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 mt-0.5 ${
              isFuture
                ? 'bg-slate-900 border border-slate-700 text-slate-600'
                : isDone
                ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/30 scale-105'
                : 'border-2 border-slate-600 hover:border-sky-400 bg-slate-950/80 hover:bg-sky-500/10'
            }`}
            aria-label={`Toggle ${habit.title}`}
          >
            {isDone ? (
              <Check className="w-4 h-4 stroke-[3] animate-bounce-short" />
            ) : isFuture ? (
              <Lock className="w-3.5 h-3.5" />
            ) : null}
          </button>

          <div className="flex-1 min-w-0">
            {/* Category tag & badge */}
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-md border ${
                isDone
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-sky-500/10 text-sky-400 border-sky-500/20'
              }`}>
                {habit.category}
              </span>
              <span className="text-[10px] font-semibold text-slate-500">
                {habit.tag}
              </span>
            </div>

            {/* Habit Title */}
            <h4 className={`text-sm sm:text-base font-bold tracking-tight transition-all ${
              isDone ? 'text-slate-100 font-extrabold' : 'text-slate-200'
            }`}>
              {habit.title}
            </h4>

            {/* Subtitle / guidance */}
            <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
              {habit.subtitle}
            </p>

            {/* Completion Timestamp badge */}
            {isDone && habitData.completedAt && (
              <div className="inline-flex items-center gap-1.5 mt-2.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-bold">
                <Clock className="w-3 h-3" />
                <span>Completed at {habitData.completedAt}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Category Icon */}
        <div className={`p-3 rounded-2xl flex-shrink-0 transition-colors ${
          isDone
            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
            : 'bg-white/5 text-slate-400 border border-white/5'
        }`}>
          <IconComp className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
