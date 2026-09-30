import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  AlarmClock, 
  Dumbbell, 
  Utensils, 
  Droplets, 
  Code2, 
  Cpu, 
  PhoneOff, 
  Sparkles,
  ArrowRight,
  Sparkle
} from 'lucide-react';
import { useWinterArc } from '../../context/WinterArcContext';
import { HABITS } from '../../utils/winterArc';

const ICON_COMPONENTS = {
  AlarmClock,
  Dumbbell,
  Utensils,
  Droplets,
  Code2,
  Cpu,
  PhoneOff,
  Sparkles
};

export default function TodayHabitsQuickList() {
  const navigate = useNavigate();
  const { 
    effectiveTodayStr, 
    daysData, 
    toggleHabit, 
    stats 
  } = useWinterArc();

  const todayRecord = daysData[effectiveTodayStr] || { habits: {} };

  return (
    <div className="frost-card rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
            <span>Today's Habit Checklist</span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
              stats.todayCompletedCount === 8
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-sky-500/10 text-sky-400 border-sky-500/30'
            }`}>
              {stats.todayCompletedCount}/8 Completed
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Click any habit to mark complete or undo
          </p>
        </div>

        <button
          onClick={() => navigate('/habits')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors"
        >
          <span>Workspace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of habits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {HABITS.map((habit) => {
          const habitData = todayRecord.habits?.[habit.id] || { completed: false, completedAt: null };
          const isDone = habitData.completed;
          const IconComp = ICON_COMPONENTS[habit.iconName] || Sparkles;

          return (
            <div
              key={habit.id}
              onClick={() => toggleHabit(effectiveTodayStr, habit.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 group select-none ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                  : 'bg-slate-900/40 border-white/5 hover:border-sky-500/30 text-slate-300 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Custom Checkbox */}
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all flex-shrink-0 ${
                  isDone
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                    : 'border-2 border-slate-600 group-hover:border-sky-400 bg-slate-950/60'
                }`}>
                  {isDone && <Check className="w-4 h-4 stroke-[3]" />}
                </div>

                <div className="min-w-0">
                  <div className={`text-xs font-bold truncate transition-colors ${
                    isDone ? 'line-through text-slate-400' : 'text-slate-200 group-hover:text-sky-300'
                  }`}>
                    {habit.title}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate flex items-center gap-1.5">
                    <span>{habit.category}</span>
                    {isDone && habitData.completedAt && (
                      <>
                        <span>•</span>
                        <span className="text-emerald-400">{habitData.completedAt}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className={`p-2 rounded-lg flex-shrink-0 transition-colors ${
                isDone ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-slate-400 group-hover:text-sky-400'
              }`}>
                <IconComp className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
