import React from 'react';
import { Trophy, Flame, Zap, Award, Sparkles, ChevronRight } from 'lucide-react';
import { useWinterArc } from '../../context/WinterArcContext';
import { STREAK_MILESTONES } from '../../utils/winterArc';

export default function MilestoneProgress() {
  const { stats, setActiveMilestone } = useWinterArc();
  const next = stats.nextMilestone;
  const current = stats.currentStreak;

  const neededDays = Math.max(0, next.days - current);
  const progressPct = Math.min(100, Math.round((current / next.days) * 100));

  return (
    <div className="frost-card rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-100">
              Next Streak Milestone
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Target: <span className="text-amber-400 font-semibold">{next.days}-Day Streak</span> — {next.title}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveMilestone(next)}
          className="text-xs text-slate-400 hover:text-sky-400 flex items-center gap-1 transition-colors font-semibold"
        >
          <span>View Details</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-300 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-400 fill-current" />
            <span>{current} / {next.days} Days</span>
          </span>
          <span className="font-mono text-sky-400 font-bold">
            {neededDays === 0 ? 'Unlocked!' : `${neededDays} more ${neededDays === 1 ? 'day' : 'days'} needed`}
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden relative">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-sky-400 transition-all duration-700 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Mini milestones preview pills */}
      <div className="grid grid-cols-5 sm:grid-cols-9 gap-1.5 mt-4 pt-3 border-t border-white/5">
        {STREAK_MILESTONES.map((m) => {
          const isUnlocked = stats.longestStreak >= m.days;
          const isTarget = next.days === m.days;

          return (
            <div
              key={m.days}
              title={`${m.days} Days: ${m.title}`}
              onClick={() => setActiveMilestone(m)}
              className={`py-1.5 px-1 rounded-lg text-center cursor-pointer transition-all border ${
                isUnlocked
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold shadow-sm'
                  : isTarget
                  ? 'bg-sky-500/20 text-sky-300 border-sky-400 font-bold animate-pulse-subtle'
                  : 'bg-slate-900/40 text-slate-500 border-white/5 hover:text-slate-300'
              }`}
            >
              <div className="text-[10px] font-mono leading-none">{m.days}d</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
