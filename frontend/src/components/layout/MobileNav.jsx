import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  BarChart3, 
  Target, 
  Settings 
} from 'lucide-react';
import { useWinterArc } from '../../context/WinterArcContext';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: LayoutDashboard },
  { path: '/habits', label: 'Habits', icon: CheckSquare },
  { path: '/calendar', label: '90D Grid', icon: Calendar },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/goals', label: 'Goals', icon: Target },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function MobileNav() {
  const { stats } = useWinterArc();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-sky-500/15 backdrop-blur-2xl px-2 py-1.5 flex items-center justify-around select-none shadow-2xl safe-area-bottom">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative ${
                isActive
                  ? 'text-sky-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`p-1 rounded-lg transition-transform ${isActive ? 'bg-sky-500/20 scale-105' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
                {item.path === '/habits' && stats.todayCompletedCount > 0 && (
                  <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                )}
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
