import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Flame, 
  Trophy, 
  TrendingUp, 
  CheckSquare, 
  Calendar, 
  Clock, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Snowflake
} from 'lucide-react';
import { useWinterArc } from '../context/WinterArcContext';
import CircularProgress from '../components/dashboard/CircularProgress';
import CountdownBanner from '../components/dashboard/CountdownBanner';
import StatCard from '../components/dashboard/StatCard';
import TodayHabitsQuickList from '../components/dashboard/TodayHabitsQuickList';
import MotivationalBanner from '../components/dashboard/MotivationalBanner';
import ReasonToStartCard from '../components/dashboard/ReasonToStartCard';
import SleepQuickLog from '../components/dashboard/SleepQuickLog';
import MilestoneProgress from '../components/dashboard/MilestoneProgress';
import QuoteCard from '../components/dashboard/QuoteCard';
import { DAY_MAP } from '../utils/winterArc';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { 
    settings, 
    stats, 
    challengeStatus, 
    effectiveTodayStr 
  } = useWinterArc();

  const formattedDate = React.useMemo(() => {
    if (DAY_MAP[effectiveTodayStr]) {
      return DAY_MAP[effectiveTodayStr].fullDateLabel;
    }
    const [y, m, d] = effectiveTodayStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }, [effectiveTodayStr]);

  const currentDayNum = stats.elapsedDaysCount > 0 ? stats.elapsedDaysCount : 1;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* 1. Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold tracking-widest uppercase mb-2">
            <Snowflake className="w-3.5 h-3.5 animate-pulse" />
            90 Days. No Excuses. Become Unrecognizable.
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight">
            Welcome to your Winter Arc, <span className="shimmer-text">{settings.userName}</span>.
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {formattedDate} • Challenge Day {String(currentDayNum).padStart(2, '0')} of 90
          </p>
        </div>

        {/* Quick Jump to Daily Workspace */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/habits')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-sky-500/20 transition-all flex items-center gap-2"
          >
            <span>Daily Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Live Countdown Banner */}
      <CountdownBanner 
        effectiveTodayStr={effectiveTodayStr} 
        challengeStatus={challengeStatus} 
      />

      {/* 3. Hero Dashboard Overview: Circular Gauge + Key Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Circular Gauge Card */}
        <div className="frost-card rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-4">
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
              Arc Progress
            </span>
          </div>

          <div className="my-2">
            <CircularProgress 
              percentage={stats.overallProgressPct} 
              size={210} 
              strokeWidth={15}
              dayNumber={currentDayNum}
              totalDays={90}
              label="Challenge Completion"
            />
          </div>

          <div className="w-full grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-white/5">
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Days Completed</span>
              <span className="text-xl font-black text-slate-100 font-mono mt-0.5 block">{stats.totalSuccessfulDays} / 90</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-white/5 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Days Left</span>
              <span className="text-xl font-black text-sky-400 font-mono mt-0.5 block">{stats.daysRemaining}</span>
            </div>
          </div>
        </div>

        {/* 4 Core Stat Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatCard
            title="Current Streak"
            value={`${stats.currentStreak} Days`}
            subtitle={stats.currentStreak > 0 ? "Momentum in full effect" : "Ready to ignite a new streak"}
            iconName="Flame"
            variant="orange"
            badge={stats.currentStreak >= 7 ? "On Fire" : "Active"}
            onClick={() => navigate('/calendar')}
          />

          <StatCard
            title="Longest Streak"
            value={`${stats.longestStreak} Days`}
            subtitle="Personal Winter Arc record"
            iconName="Trophy"
            variant="amber"
            badge={`Record`}
            onClick={() => navigate('/analytics')}
          />

          <StatCard
            title="Today's Habit Target"
            value={`${stats.todayCompletedCount} / 8`}
            subtitle={`${stats.todayPct}% completed for today`}
            iconName="CheckSquare"
            variant={stats.todayCompletedCount === 8 ? "emerald" : "sky"}
            progress={stats.todayPct}
            badge={stats.todayCompletedCount >= (settings.threshold || 6) ? "Target Met" : `${(settings.threshold || 6) - stats.todayCompletedCount} to Target`}
            onClick={() => navigate('/habits')}
          />

          <StatCard
            title="Total Habits Executed"
            value={`${stats.totalHabitsCompleted}`}
            subtitle={`${stats.toDateCompletionRate}% overall consistency`}
            iconName="TrendingUp"
            variant="emerald"
            progress={stats.toDateCompletionRate}
            badge="Total Volume"
            onClick={() => navigate('/analytics')}
          />
        </div>
      </div>

      {/* 4. Contextual Motivation Banner */}
      <MotivationalBanner />

      {/* 5. Today's Quick Habit Action List */}
      <TodayHabitsQuickList />

      {/* 6. Sleep Quick Logger & Reason to Start Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SleepQuickLog />
        <ReasonToStartCard />
      </div>

      {/* 7. Milestone Progress & Quote of the Day */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MilestoneProgress />
        <QuoteCard />
      </div>
    </div>
  );
}
