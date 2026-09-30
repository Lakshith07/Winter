import React from 'react';
import { Moon, BedDouble, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useWinterArc } from '../../context/WinterArcContext';
import { SLEEP_OPTIONS, DAY_MAP } from '../../utils/winterArc';

export default function SleepQuickLog() {
  const { 
    effectiveTodayStr, 
    daysData, 
    setSleepHours, 
    stats 
  } = useWinterArc();

  const todayRecord = daysData[effectiveTodayStr] || {};
  const currentSleep = todayRecord.sleepHours;

  return (
    <div className="frost-card rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Moon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
              <span>Sleep & Recovery</span>
              {currentSleep && (
                <span className={`text-xs px-2 py-0.5 rounded-md font-bold border ${
                  currentSleep < 7
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                }`}>
                  {currentSleep} Hours Logged
                </span>
              )}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Record last night's sleep duration (7–8h optimal for peak recovery)
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
          <span>Avg Sleep:</span>
          <span className="font-bold text-sky-400">{stats.avgSleep > 0 ? `${stats.avgSleep}h` : 'N/A'}</span>
        </div>
      </div>

      {/* Selectable Hour Buttons (4, 5, 6, 7, 8, 9, 10) */}
      <div className="grid grid-cols-7 gap-2 mt-4">
        {SLEEP_OPTIONS.map((hours) => {
          const isSelected = currentSleep === hours;
          const isUnderOptimal = hours < 7;

          return (
            <button
              key={hours}
              type="button"
              onClick={() => setSleepHours(effectiveTodayStr, hours)}
              className={`py-2.5 px-1 rounded-xl text-xs sm:text-sm font-bold border transition-all flex flex-col items-center justify-center gap-1 select-none ${
                isSelected
                  ? isUnderOptimal
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-cyan-500/25 text-cyan-200 border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900/40 text-slate-400 border-white/5 hover:border-sky-500/30 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              <span className="font-mono text-sm sm:text-base leading-none">{hours}h</span>
              <span className="text-[9px] uppercase tracking-wider font-semibold opacity-75">
                {isUnderOptimal ? 'Rest' : 'Optimal'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sleep feedback note */}
      {currentSleep && currentSleep < 7 && (
        <div className="mt-3.5 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2 text-xs text-amber-300">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>Prioritize getting to bed earlier tonight. Recovery fuels physical and cognitive gains.</span>
        </div>
      )}

      {currentSleep && currentSleep >= 7 && (
        <div className="mt-3.5 p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-2 text-xs text-cyan-300">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>Prime sleep duration logged. Your brain and muscles have the recovery they need.</span>
        </div>
      )}
    </div>
  );
}
