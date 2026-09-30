import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  BarChart3, 
  Target, 
  Settings, 
  Flame, 
  Snowflake, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { useWinterArc } from '../../context/WinterArcContext';
import { CHALLENGE_START, CHALLENGE_END } from '../../utils/winterArc';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/habits', label: 'Daily Habits', icon: CheckSquare },
  { path: '/calendar', label: '90-Day Calendar', icon: Calendar },
  { path: '/analytics', label: 'Progress Analytics', icon: BarChart3 },
  { path: '/goals', label: 'Monthly Goals', icon: Target },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const { stats, settings, challengeStatus } = useWinterArc();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-slate-950/90 border-r border-sky-500/10 backdrop-blur-xl z-40 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500/20 via-cyan-400/20 to-sky-600/30 border border-sky-400/30 flex items-center justify-center text-sky-400 frost-glow">
            <Snowflake className="w-5 h-5 animate-pulse-subtle" />
          </div>
          <div>
            <h1 className="font-black text-base tracking-wider text-slate-100 flex items-center gap-1.5">
              WINTER ARC
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                90D
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium tracking-tight mt-0.5">
              Become Unrecognizable
            </p>
          </div>
        </div>
      </div>

      {/* Streak Badge Card */}
      <div className="px-5 pt-5 pb-3">
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <Flame className="w-4 h-4 fill-orange-500/30" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Current Streak</div>
              <div className="text-base font-black text-slate-100 flex items-baseline gap-1">
                {stats.currentStreak} <span className="text-xs font-semibold text-slate-400">Days</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-slate-500 font-medium">Longest</div>
            <div className="text-xs font-bold text-amber-400">{stats.longestStreak}d</div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Navigation
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                  isActive
                    ? 'bg-sky-500/15 text-sky-400 border border-sky-400/30 shadow-sm shadow-sky-500/10 font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-sky-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`} />
                  <span>{item.label}</span>
                  {item.path === '/habits' && stats.todayCompletedCount > 0 && (
                    <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-bold ${
                      stats.todayCompletedCount === 8
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                    }`}>
                      {stats.todayCompletedCount}/8
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer / User Profile & Phase */}
      <div className="p-4 border-t border-white/5 bg-slate-950/40">
        <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center font-black text-xs text-white shadow-md">
            {settings.userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-slate-200 truncate">
              {settings.userName}
            </div>
            <div className="text-[10px] text-sky-400 font-medium">
              Day {stats.elapsedDaysCount > 0 ? String(stats.elapsedDaysCount).padStart(2, '0') : '01'} / 90
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
