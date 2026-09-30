import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Flame, 
  Trophy, 
  Check, 
  Moon, 
  Sparkles, 
  Lock, 
  ChevronRight,
  Zap,
  Grid3X3
} from 'lucide-react';
import { useWinterArc } from '../context/WinterArcContext';
import MonthGrid from '../components/calendar/MonthGrid';
import DayDetailModal from '../components/calendar/DayDetailModal';
import { 
  MONTHS, 
  ALL_90_DAYS, 
  STREAK_MILESTONES 
} from '../utils/winterArc';

export default function CalendarPage() {
  const { 
    daysData, 
    effectiveTodayStr, 
    stats, 
    settings, 
    activeMilestone, 
    setActiveMilestone 
  } = useWinterArc();

  // Active month tab: 'october' | 'november' | 'december' | 'all'
  const [activeTab, setActiveTab] = useState('october');
  const [inspectDate, setInspectDate] = useState(null);

  const activeMonthMeta = MONTHS.find(m => m.key === activeTab) || MONTHS[0];

  const filteredDays = React.useMemo(() => {
    if (activeTab === 'all') return ALL_90_DAYS;
    return ALL_90_DAYS.filter(d => d.month === activeTab);
  }, [activeTab]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 1. Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold tracking-widest uppercase mb-2">
            <CalendarIcon className="w-3.5 h-3.5" />
            The 90-Day Matrix
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
            90-Day Calendar & Streak Tracker
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            October 1, 2026 – December 29, 2026 • Click any day to view & edit habit records
          </p>
        </div>

        {/* Real Streak Indicator Banner with Fire Icon */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="p-3 px-4 rounded-2xl bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent border border-orange-500/30 flex items-center gap-3 frost-glow-orange">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 flex-shrink-0">
              <Flame className="w-6 h-6 fill-current animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Streak</div>
              <div className="text-lg font-black text-slate-100 flex items-baseline gap-1">
                {stats.currentStreak} <span className="text-xs font-bold text-orange-400">Days</span>
              </div>
            </div>
          </div>

          <div className="p-3 px-4 rounded-2xl bg-slate-900/80 border border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Longest Streak</div>
              <div className="text-lg font-black text-amber-300 font-mono">
                {stats.longestStreak} <span className="text-xs font-semibold text-slate-400">Days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Month Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-950/80 border border-white/10 select-none">
        {MONTHS.map((m) => (
          <button
            key={m.key}
            onClick={() => setActiveTab(m.key)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === m.key
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20 font-black'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <span>{m.name}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
              activeTab === m.key ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
            }`}>
              {m.daysCount}d
            </span>
          </button>
        ))}

        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ml-auto ${
            activeTab === 'all'
              ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20 font-black'
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Grid3X3 className="w-4 h-4" />
          <span>Full 90-Day Grid</span>
        </button>
      </div>

      {/* 3. Monthly Grid / Master Matrix */}
      {activeTab === 'all' ? (
        <div className="space-y-6">
          {MONTHS.map((m) => (
            <MonthGrid
              key={m.key}
              monthMeta={m}
              monthDays={ALL_90_DAYS.filter(d => d.month === m.key)}
              daysData={daysData}
              effectiveTodayStr={effectiveTodayStr}
              threshold={settings.threshold || 6}
              onSelectDay={(dateStr) => setInspectDate(dateStr)}
            />
          ))}
        </div>
      ) : (
        <MonthGrid
          monthMeta={activeMonthMeta}
          monthDays={filteredDays}
          daysData={daysData}
          effectiveTodayStr={effectiveTodayStr}
          threshold={settings.threshold || 6}
          onSelectDay={(dateStr) => setInspectDate(dateStr)}
        />
      )}

      {/* 4. Day Details Modal */}
      <DayDetailModal 
        dateStr={inspectDate} 
        onClose={() => setInspectDate(null)} 
      />
    </div>
  );
}
