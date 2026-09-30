import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Lock, 
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { useWinterArc } from '../../context/WinterArcContext';
import { 
  ALL_90_DAYS, 
  DAY_MAP, 
  CHALLENGE_START, 
  CHALLENGE_END, 
  isFutureDate 
} from '../../utils/winterArc';

export default function DateSelector({ selectedDate, onSelectDate }) {
  const { effectiveTodayStr } = useWinterArc();

  const currentMeta = DAY_MAP[selectedDate] || ALL_90_DAYS[0];
  const currentIndex = ALL_90_DAYS.findIndex(d => d.date === selectedDate);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < ALL_90_DAYS.length - 1;

  const isToday = selectedDate === effectiveTodayStr;
  const isFuture = isFutureDate(selectedDate, effectiveTodayStr);

  const handlePrev = () => {
    if (canGoPrev) {
      onSelectDate(ALL_90_DAYS[currentIndex - 1].date);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onSelectDate(ALL_90_DAYS[currentIndex + 1].date);
    }
  };

  const handleJumpToday = () => {
    if (effectiveTodayStr >= CHALLENGE_START && effectiveTodayStr <= CHALLENGE_END) {
      onSelectDate(effectiveTodayStr);
    } else if (effectiveTodayStr < CHALLENGE_START) {
      onSelectDate(CHALLENGE_START);
    } else {
      onSelectDate(CHALLENGE_END);
    }
  };

  return (
    <div className="frost-card rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Left: Previous / Next Date Controls */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
        <button
          onClick={handlePrev}
          disabled={!canGoPrev}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent text-slate-300 hover:text-white transition-all border border-white/5"
          aria-label="Previous day"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Date center display */}
        <div className="flex items-center gap-2.5 px-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 font-black text-xs">
            {String(currentMeta.dayNumber).padStart(2, '0')}
          </div>
          <div>
            <div className="text-sm sm:text-base font-black text-slate-100 flex items-center gap-2">
              <span>{currentMeta.fullDateLabel}</span>
              {isToday && (
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Today
                </span>
              )}
              {isFuture && (
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Locked
                </span>
              )}
            </div>
            <div className="text-xs text-slate-400">
              {currentMeta.dayOfWeek} • Day {currentMeta.dayNumber} of 90
            </div>
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={!canGoNext}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent text-slate-300 hover:text-white transition-all border border-white/5"
          aria-label="Next day"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Right: Quick Day Picker & Jump to Today */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        {/* Day Dropdown */}
        <select
          value={selectedDate}
          onChange={(e) => onSelectDate(e.target.value)}
          className="px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-slate-200 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-sky-400"
        >
          {ALL_90_DAYS.map((d) => (
            <option key={d.date} value={d.date} className="bg-slate-900 text-slate-200">
              Day {String(d.dayNumber).padStart(2, '0')}: {d.fullDateLabel}
            </option>
          ))}
        </select>

        {!isToday && (
          <button
            onClick={handleJumpToday}
            className="px-3 py-2 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Today</span>
          </button>
        )}
      </div>
    </div>
  );
}
