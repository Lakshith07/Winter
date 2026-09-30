import React from 'react';
import { Sparkles, Flame, Trophy, ShieldCheck, RefreshCw, Zap } from 'lucide-react';
import { useWinterArc } from '../../context/WinterArcContext';
import { getContextualMotivation } from '../../utils/motivation';

export default function MotivationalBanner() {
  const { stats, challengeStatus, settings } = useWinterArc();

  const motivation = getContextualMotivation({
    challengeStatus,
    currentStreak: stats.currentStreak,
    todayCompletedCount: stats.todayCompletedCount,
    threshold: settings.threshold || 6,
    elapsedDaysCount: stats.elapsedDaysCount
  });

  const getThemeStyles = () => {
    switch (motivation.tone) {
      case 'perfect':
        return {
          bg: 'from-emerald-950/40 via-sky-950/30 to-slate-900/60 border-emerald-500/30',
          iconBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
          badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
          icon: Trophy
        };
      case 'milestone':
        return {
          bg: 'from-amber-950/40 via-orange-950/30 to-slate-900/60 border-amber-500/30',
          iconBg: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
          badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          icon: Flame
        };
      case 'rebound':
        return {
          bg: 'from-indigo-950/40 via-sky-950/30 to-slate-900/60 border-indigo-500/30',
          iconBg: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
          badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
          icon: RefreshCw
        };
      case 'streak':
        return {
          bg: 'from-orange-950/40 via-amber-950/30 to-slate-900/60 border-orange-500/30',
          iconBg: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
          badge: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
          icon: Zap
        };
      default:
        return {
          bg: 'from-sky-950/40 via-slate-900/60 to-slate-900/60 border-sky-500/20',
          iconBg: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
          badge: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
          icon: Sparkles
        };
    }
  };

  const currentTheme = getThemeStyles();
  const IconComponent = currentTheme.icon;

  return (
    <div className={`p-5 rounded-2xl bg-gradient-to-r ${currentTheme.bg} border backdrop-blur-xl shadow-xl flex items-start gap-4`}>
      <div className={`p-3 rounded-2xl ${currentTheme.iconBg} border flex-shrink-0 mt-0.5`}>
        <IconComponent className="w-6 h-6 animate-pulse-subtle" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full border ${currentTheme.badge}`}>
            {motivation.badge}
          </span>
        </div>

        <h4 className="text-base font-black text-slate-100 tracking-tight">
          {motivation.title}
        </h4>

        <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed font-normal">
          {motivation.message}
        </p>
      </div>
    </div>
  );
}
