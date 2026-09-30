import React, { useState } from 'react';
import { 
  Target, 
  Trophy, 
  TrendingUp, 
  Calendar, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useWinterArc } from '../context/WinterArcContext';
import MonthlyGoalsSection from '../components/goals/MonthlyGoalsSection';
import AchievementsSection from '../components/goals/AchievementsSection';
import ImprovementsSection from '../components/goals/ImprovementsSection';
import { MONTHS } from '../utils/winterArc';

export default function MonthlyGoalsPage() {
  const [activeMonth, setActiveMonth] = useState('october'); // 'october' | 'november' | 'december'

  const currentMonthMeta = MONTHS.find(m => m.key === activeMonth) || MONTHS[0];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold tracking-widest uppercase mb-2">
            <Target className="w-3.5 h-3.5" />
            Strategic Evolution
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            Monthly Goals & Reflections
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Recreation of the reference tracker's three foundational monthly sections
          </p>
        </div>

        {/* Month Selector Pills */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-950/80 border border-white/10 select-none">
          {MONTHS.map((m) => (
            <button
              key={m.key}
              onClick={() => setActiveMonth(m.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeMonth === m.key
                  ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20 font-black'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <span>{m.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Month Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-950/30 via-slate-900/60 to-slate-900/90 border border-sky-500/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 font-mono font-bold text-sm">
            {currentMonthMeta.shortName}
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-100">
              {currentMonthMeta.name} Roadmap (Days {currentMonthMeta.startDay} to {currentMonthMeta.endDay})
            </h3>
            <p className="text-xs text-slate-400">
              Track your strategic goals, log milestone breakthroughs, and calibrate weaknesses.
            </p>
          </div>
        </div>
      </div>

      {/* 3. The Three Sections */}
      <div className="space-y-6">
        {/* Section 1: My Monthly Goals */}
        <MonthlyGoalsSection 
          activeMonth={activeMonth} 
          monthName={currentMonthMeta.name} 
        />

        {/* Section 2: What I Have Achieved This Month */}
        <AchievementsSection 
          activeMonth={activeMonth} 
          monthName={currentMonthMeta.name} 
        />

        {/* Section 3: What Should I Improve? */}
        <ImprovementsSection 
          activeMonth={activeMonth} 
          monthName={currentMonthMeta.name} 
        />
      </div>
    </div>
  );
}
