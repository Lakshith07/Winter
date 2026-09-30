import React, { useState, useEffect } from 'react';
import { FileText, Save, Check } from 'lucide-react';
import { useWinterArc } from '../../context/WinterArcContext';
import { DAY_MAP } from '../../utils/winterArc';

export default function DailyNotesSection({ selectedDate }) {
  const { daysData, setDayNotes } = useWinterArc();
  const dayRecord = daysData[selectedDate] || {};
  const dayMeta = DAY_MAP[selectedDate];

  const [notes, setNotes] = useState(dayRecord.notes || '');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setNotes(dayRecord.notes || '');
    setSaved(false);
  }, [selectedDate, dayRecord.notes]);

  const handleSave = () => {
    setDayNotes(selectedDate, notes);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="frost-card rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-100">
              Daily Reflection & Workout Notes
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Document your wins, workout lifts, LeetCode problem insights, or lessons learned today
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
        >
          {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
          <span>{saved ? 'Saved' : 'Save Notes'}</span>
        </button>
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={3}
        placeholder={`Write your daily log for ${dayMeta?.fullDateLabel || selectedDate}... (e.g. Chest & Triceps PR, solved LeetCode #199 Binary Tree Right Side View, felt 100% disciplined)`}
        className="w-full mt-2 p-3 rounded-xl bg-slate-950/80 border border-white/10 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/50 leading-relaxed resize-none"
      />
    </div>
  );
}
