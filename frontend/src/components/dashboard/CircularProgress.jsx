import React from 'react';

export default function CircularProgress({ 
  percentage = 0, 
  size = 200, 
  strokeWidth = 14, 
  dayNumber = 1,
  totalDays = 90,
  label = "Overall Progress"
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  const offset = circumference - (clampedPercentage / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      <div className="relative" style={{ width: size, height: size }}>
        <svg 
          className="w-full h-full transform -rotate-90"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="winterArcProgressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#00f2fe" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <filter id="arcGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-800/60 fill-none"
          />

          {/* Progress Glowing Indicator */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#winterArcProgressGrad)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="fill-none transition-all duration-1000 ease-out"
            filter="url(#arcGlow)"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
            DAY {String(dayNumber).padStart(2, '0')} / {totalDays}
          </span>
          <div className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight mt-0.5">
            {clampedPercentage}%
          </div>
          <span className="text-[11px] text-slate-400 font-medium mt-0.5">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
