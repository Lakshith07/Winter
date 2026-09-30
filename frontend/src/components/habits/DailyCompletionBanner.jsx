import React from 'react';
import { Trophy, Sparkles, CheckCircle2, Flame } from 'lucide-react';
import { useWinterArc } from '../../context/WinterArcContext';

export default function DailyCompletionBanner({ completedCount = 8 }) {
  const { triggerConfetti } = useWinterArc();

  if (completedCount < 8) return null;

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-sky-950/40 border border-emerald-500/40 shadow-xl frost-glow-emerald animate-fadeIn flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3.5 text-center sm:text-left">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0">
          <Trophy className="w-6 h-6 animate-bounce-short" />
        </div>
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-xs font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              8/8 Flawless Victory
            </span>
            <Flame className="w-4 h-4 text-orange-400 fill-current" />
          </div>
          <h4 className="text-base font-black text-slate-100 mt-1">
            You showed up for yourself today. That's a 100% win.
          </h4>
          <p className="text-xs text-slate-300 mt-0.5">
            Every habit executed with precision. Your discipline is compounding.
          </p>
        </div>
      </div>

      <button
        onClick={() => triggerConfetti(true)}
        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs tracking-wider shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5 flex-shrink-0"
      >
        <Sparkles className="w-3.5 h-3.5 fill-current" />
        <span>Celebrate</span>
      </button>
    </div>
  );
}
