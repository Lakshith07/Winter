import React, { useState } from 'react';
import { Trophy, Plus, Trash2, Sparkles, Award } from 'lucide-react';
import { useWinterArc } from '../../context/WinterArcContext';

export default function AchievementsSection({ activeMonth = 'october', monthName = 'October 2026' }) {
  const { achievements, addAchievement, deleteAchievement } = useWinterArc();
  const monthAchievements = achievements[activeMonth] || [];

  const [text, setText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addAchievement(activeMonth, text);
    setText('');
    setIsAdding(false);
  };

  return (
    <div className="frost-card rounded-2xl p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span>2. What I Have Achieved This Month</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                {monthAchievements.length} Logged
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Victories, milestones & breakthrough moments in {monthName}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Log Win</span>
        </button>
      </div>

      {/* Add form */}
      {isAdding && (
        <form onSubmit={handleAdd} className="mb-4 p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/30 space-y-3 animate-fadeIn">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Log a win for ${monthName}... (e.g. Completed 14-day streak, solved 25 DP problems, down 2kg)`}
            className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-amber-400"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1 text-xs font-bold bg-amber-500 text-slate-950 rounded-lg shadow-sm"
            >
              Save Win
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="space-y-2">
        {monthAchievements.length === 0 ? (
          <div className="p-6 rounded-xl bg-white/[0.02] border border-dashed border-white/10 text-center text-xs text-slate-500">
            No achievements logged for {monthName} yet. Log your personal wins as you conquer the month!
          </div>
        ) : (
          monthAchievements.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-amber-950/15 border border-amber-500/20 flex items-center justify-between gap-3 group"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-100 leading-snug">
                    {item.text}
                  </div>
                  {item.date && (
                    <div className="text-[10px] text-amber-400/80 font-mono mt-0.5">
                      Logged {item.date}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => deleteAchievement(activeMonth, item.id)}
                className="p-1 rounded-md text-slate-500 hover:text-rose-400 hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                aria-label="Delete achievement"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
