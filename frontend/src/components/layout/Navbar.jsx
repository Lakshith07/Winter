import React from 'react';
import { 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Sparkles, 
  Clock, 
  Calendar as CalendarIcon,
  Flame,
  Snowflake
} from 'lucide-react';
import { useWinterArc } from '../../context/WinterArcContext';
import { DAY_MAP } from '../../utils/winterArc';

export default function Navbar() {
  const { 
    settings, 
    updateSettings, 
    stats, 
    effectiveTodayStr, 
    challengeStatus, 
    triggerConfetti 
  } = useWinterArc();

  const formattedDate = React.useMemo(() => {
    if (DAY_MAP[effectiveTodayStr]) {
      return DAY_MAP[effectiveTodayStr].fullDateLabel;
    }
    const [y, m, d] = effectiveTodayStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }, [effectiveTodayStr]);

  const toggleSound = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
  };

  const toggleTheme = () => {
    const nextTheme = settings.theme === 'light' ? 'dark' : (settings.theme === 'dark' ? 'oled' : 'light');
    updateSettings({ theme: nextTheme });
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-950/80 border-b border-sky-500/10 backdrop-blur-xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left: Challenge Day Status & Date */}
      <div className="flex items-center gap-3">
        {/* Mobile Logo icon */}
        <div className="lg:hidden w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
          <Snowflake className="w-4 h-4 animate-pulse-subtle" />
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-bold tracking-wide">
            <CalendarIcon className="w-3.5 h-3.5 text-sky-400" />
            <span>
              {challengeStatus === 'before' 
                ? 'PRE-CHALLENGE' 
                : challengeStatus === 'completed'
                ? 'CHALLENGE COMPLETE'
                : `DAY ${String(stats.elapsedDaysCount).padStart(2, '0')} / 90`}
            </span>
          </div>

          <span className="hidden sm:inline-block text-xs font-semibold text-slate-400 border-l border-white/10 pl-2">
            {formattedDate}
          </span>
        </div>
      </div>

      {/* Right: Quick actions & indicators */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-black">
          <Flame className="w-3.5 h-3.5 fill-current animate-pulse" />
          <span>{stats.currentStreak}d</span>
        </div>

        {/* Confetti Quick Sparkle Button */}
        <button
          onClick={() => triggerConfetti(false)}
          title="Celebrate with Confetti"
          className="p-2 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-white/5 transition-colors"
          aria-label="Trigger confetti"
        >
          <Sparkles className="w-4 h-4" />
        </button>

        {/* Audio Toggle */}
        <button
          onClick={toggleSound}
          title={settings.soundEnabled ? "Mute sounds" : "Enable sounds"}
          className={`p-2 rounded-xl transition-colors ${
            settings.soundEnabled 
              ? 'text-sky-400 hover:bg-sky-500/10' 
              : 'text-slate-500 hover:text-slate-400 hover:bg-white/5'
          }`}
          aria-label="Toggle sound"
        >
          {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={`Current theme: ${settings.theme}. Click to cycle.`}
          className="p-2 rounded-xl text-slate-400 hover:text-sky-300 hover:bg-white/5 transition-colors capitalize text-xs flex items-center gap-1.5"
          aria-label="Toggle theme"
        >
          {settings.theme === 'light' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-sky-400" />
          )}
          <span className="hidden md:inline text-[11px] font-semibold text-slate-400">{settings.theme}</span>
        </button>
      </div>
    </header>
  );
}
