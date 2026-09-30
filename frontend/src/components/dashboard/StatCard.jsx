import React from 'react';
import { 
  Flame, 
  Trophy, 
  TrendingUp, 
  CheckSquare, 
  Calendar, 
  Clock, 
  Target, 
  Zap,
  ChevronRight
} from 'lucide-react';

const ICON_MAP = {
  Flame,
  Trophy,
  TrendingUp,
  CheckSquare,
  Calendar,
  Clock,
  Target,
  Zap
};

export default function StatCard({
  title,
  value,
  subtitle,
  iconName = 'Flame',
  variant = 'sky', // 'sky' | 'orange' | 'emerald' | 'purple' | 'amber'
  badge,
  progress,
  onClick
}) {
  const IconComponent = ICON_MAP[iconName] || Flame;

  const getVariantStyles = () => {
    switch (variant) {
      case 'orange':
        return {
          iconBg: 'bg-orange-500/15 text-orange-400 border border-orange-500/30',
          glow: 'frost-glow-orange',
          badge: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
          progress: 'bg-orange-500'
        };
      case 'emerald':
        return {
          iconBg: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
          glow: 'frost-glow-emerald',
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          progress: 'bg-emerald-500'
        };
      case 'purple':
        return {
          iconBg: 'bg-purple-500/15 text-purple-400 border border-purple-500/30',
          glow: 'frost-glow',
          badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
          progress: 'bg-purple-500'
        };
      case 'amber':
        return {
          iconBg: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
          glow: 'frost-glow',
          badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          progress: 'bg-amber-500'
        };
      default:
        return {
          iconBg: 'bg-sky-500/15 text-sky-400 border border-sky-500/30',
          glow: 'frost-glow',
          badge: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
          progress: 'bg-sky-500'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div 
      onClick={onClick}
      className={`frost-card frost-card-hover rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block">
            {title}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight mt-1 flex items-baseline gap-1.5">
            {value}
          </div>
        </div>

        <div className={`p-3 rounded-xl ${styles.iconBg} flex items-center justify-center flex-shrink-0`}>
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      {/* Progress bar if present */}
      {typeof progress === 'number' && (
        <div className="w-full h-1.5 rounded-full bg-slate-800/80 overflow-hidden mt-3 mb-1">
          <div 
            className={`h-full ${styles.progress} transition-all duration-500 rounded-full`}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}

      {/* Bottom Subtitle / Badge */}
      <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
        <span className="truncate">{subtitle}</span>
        {badge && (
          <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-wider border ${styles.badge}`}>
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
