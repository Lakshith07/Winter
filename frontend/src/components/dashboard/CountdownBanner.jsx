import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, Flame, ShieldAlert, Trophy } from 'lucide-react';
import { CHALLENGE_START, CHALLENGE_END } from '../../utils/winterArc';

export default function CountdownBanner({ effectiveTodayStr, challengeStatus }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      
      let targetDate;
      if (challengeStatus === 'before') {
        // Target is Oct 1, 2026 00:00:00
        targetDate = new Date(2026, 9, 1, 0, 0, 0);
      } else {
        // Target is Dec 29, 2026 23:59:59
        targetDate = new Date(2026, 11, 29, 23, 59, 59);
      }

      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [challengeStatus]);

  if (challengeStatus === 'completed') {
    return (
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-900/30 via-sky-900/20 to-slate-900/40 border border-emerald-500/30 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-100">90-Day Winter Arc Completed</h4>
            <p className="text-xs text-slate-400">December 29, 2026 concluded. You proved what consistency can forge.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 via-sky-950/30 to-slate-900/90 border border-sky-500/20 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Left title */}
      <div className="flex items-center gap-3 text-center md:text-left">
        <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 frost-glow flex-shrink-0">
          <Clock className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="text-xs uppercase font-bold text-sky-400 tracking-wider flex items-center justify-center md:justify-start gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {challengeStatus === 'before' ? 'Countdown to Challenge Start' : 'Countdown to December 29, 2026'}
          </div>
          <div className="text-sm font-bold text-slate-200 mt-0.5">
            {challengeStatus === 'before' 
              ? 'Prepare your systems. Day 1 begins October 1, 2026.'
              : 'Every single second counts toward your final 90-day transformation.'}
          </div>
        </div>
      </div>

      {/* Countdown Timer Units */}
      <div className="flex items-center gap-2 sm:gap-3 select-none">
        <div className="flex flex-col items-center justify-center px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 min-w-[58px]">
          <span className="text-lg sm:text-xl font-black text-sky-400 font-mono">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Days</span>
        </div>
        <span className="text-slate-600 font-bold">:</span>
        <div className="flex flex-col items-center justify-center px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 min-w-[58px]">
          <span className="text-lg sm:text-xl font-black text-sky-400 font-mono">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Hours</span>
        </div>
        <span className="text-slate-600 font-bold">:</span>
        <div className="flex flex-col items-center justify-center px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 min-w-[58px]">
          <span className="text-lg sm:text-xl font-black text-sky-400 font-mono">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Mins</span>
        </div>
        <span className="text-slate-600 font-bold">:</span>
        <div className="flex flex-col items-center justify-center px-3 py-2 rounded-xl bg-slate-950/80 border border-white/10 min-w-[58px]">
          <span className="text-lg sm:text-xl font-black text-cyan-300 font-mono">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Secs</span>
        </div>
      </div>
    </div>
  );
}
