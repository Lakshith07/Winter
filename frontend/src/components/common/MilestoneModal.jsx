import React from 'react';
import { 
  Trophy, Flame, Zap, ShieldCheck, Brain, Award, Compass, Medal, Crown, Sparkles, X, Check
} from 'lucide-react';

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

export default function MilestoneModal({ milestone, onClose }) {
  if (!milestone) return null;

  const IconComponent = ICON_MAP[milestone.icon] || Trophy;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-lg frost-card rounded-3xl p-8 shadow-2xl border border-sky-400/30 text-center relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-sky-500/20 blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Trophy icon */}
        <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center rounded-3xl bg-gradient-to-tr from-sky-600/40 via-cyan-400/20 to-indigo-600/40 border border-sky-400/40 shadow-xl frost-glow">
          <IconComponent className="w-12 h-12 text-sky-300 animate-float-slow" />
          <div className="absolute -top-2 -right-2 p-1.5 rounded-full bg-amber-500 text-slate-950">
            <Sparkles className="w-4 h-4 fill-current" />
          </div>
        </div>

        {/* Milestone badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold tracking-widest uppercase mb-3">
          <Flame className="w-3.5 h-3.5 fill-current text-orange-400" />
          {milestone.days} Day Milestone Unlocked
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight mb-2">
          {milestone.title}
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-sm mx-auto leading-relaxed mb-8">
          {milestone.desc}
        </p>

        <div className="bg-slate-900/60 rounded-2xl p-4 border border-white/5 mb-8 text-left flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400">
            <Check className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Achievement Recorded</div>
            <div className="text-sm font-semibold text-slate-200">
              Discipline standard maintained for {milestone.days} days
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-sky-500/25 transition-all transform active:scale-98"
        >
          Continue the Winter Arc
        </button>
      </div>
    </div>
  );
}
