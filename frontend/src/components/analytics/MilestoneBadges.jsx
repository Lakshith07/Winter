import React from 'react';
import { 
  Trophy, 
  Flame, 
  Zap, 
  ShieldCheck, 
  Brain, 
  Award, 
  Compass, 
  Medal, 
  Crown, 
  Lock, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { STREAK_MILESTONES } from '../../utils/winterArc';
import { useWinterArc } from '../../context/WinterArcContext';

const ICON_MAP = {
  Flame,
  Zap,
  ShieldCheck,
  Brain,
  Award,
  Compass,
  Medal,
  Crown,
  Trophy
};

export default function MilestoneBadges() {
  const { stats, setActiveMilestone } = useWinterArc();

  return (
    <div className="frost-card rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
            <span>Milestone Trophy Room</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono font-bold">
              {stats.unlockedMilestones.length} / {STREAK_MILESTONES.length} Unlocked
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Streak milestones unlocked based on your longest consecutive consistency
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {STREAK_MILESTONES.map((m) => {
          const isUnlocked = stats.longestStreak >= m.days;
          const IconComp = ICON_MAP[m.icon] || Trophy;

          return (
            <div
              key={m.days}
              onClick={() => setActiveMilestone(m)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer select-none flex items-start gap-3.5 group ${
                isUnlocked
                  ? 'bg-gradient-to-br from-amber-950/20 via-slate-900/60 to-slate-900/90 border-amber-500/30 hover:border-amber-400/60 shadow-lg shadow-amber-500/5'
                  : 'bg-slate-900/30 border-white/5 opacity-50 hover:opacity-75 hover:border-white/10'
              }`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 ${
                isUnlocked
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 frost-glow'
                  : 'bg-slate-800/80 text-slate-600 border border-slate-700'
              }`}>
                {isUnlocked ? (
                  <IconComp className="w-5 h-5" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                    isUnlocked ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {m.days} DAYS
                  </span>

                  {isUnlocked && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </div>

                <h4 className={`text-xs sm:text-sm font-bold mt-1.5 truncate ${
                  isUnlocked ? 'text-slate-100' : 'text-slate-400'
                }`}>
                  {m.title}
                </h4>

                <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-tight">
                  {m.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
