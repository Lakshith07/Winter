import React, { useState } from 'react';
import { Target, Plus, Check, Trash2, Sparkles } from 'lucide-react';
import { useWinterArc } from '../../context/WinterArcContext';

export default function MonthlyGoalsSection({ activeMonth = 'october', monthName = 'October 2026' }) {
  const { goals, addGoal, toggleGoal, deleteGoal } = useWinterArc();
  const monthGoals = goals[activeMonth] || [];

  const [newGoalText, setNewGoalText] = useState('');
  const [priority, setPriority] = useState('high'); // 'high' | 'medium' | 'low'
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newGoalText.trim()) return;
    addGoal(activeMonth, newGoalText, priority);
    setNewGoalText('');
    setIsAdding(false);
  };

  const completedCount = monthGoals.filter(g => g.completed).length;

  return (
    <div className="frost-card rounded-2xl p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span>1. My Monthly Goals</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20">
                {completedCount} / {monthGoals.length} Done
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Primary strategic targets for {monthName}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-3 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 text-xs font-bold border border-sky-500/30 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Goal</span>
        </button>
      </div>

      {/* Add form */}
      {isAdding && (
        <form onSubmit={handleAdd} className="mb-4 p-3.5 rounded-xl bg-slate-900/90 border border-sky-500/30 space-y-3 animate-fadeIn">
          <input
            type="text"
            value={newGoalText}
            onChange={(e) => setNewGoalText(e.target.value)}
            placeholder={`Enter a major goal for ${monthName}... (e.g. Master Graph Traversal & solve 40 problems)`}
            className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-sky-400"
            autoFocus
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Priority:</span>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="px-2 py-1 rounded bg-slate-950 border border-white/10 text-slate-300 text-xs focus:outline-none"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Standard</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3 py-1 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 text-xs font-bold bg-sky-500 text-slate-950 rounded-lg shadow-sm"
              >
                Save Goal
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Goals List */}
      <div className="space-y-2">
        {monthGoals.length === 0 ? (
          <div className="p-6 rounded-xl bg-white/[0.02] border border-dashed border-white/10 text-center text-xs text-slate-500">
            No goals recorded for {monthName} yet. Click "Add Goal" to set your targets.
          </div>
        ) : (
          monthGoals.map((goal) => (
            <div
              key={goal.id}
              className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 group ${
                goal.completed
                  ? 'bg-emerald-950/20 border-emerald-500/25 text-slate-400'
                  : 'bg-slate-900/40 border-white/5 text-slate-200 hover:border-sky-500/30'
              }`}
            >
              <div 
                onClick={() => toggleGoal(activeMonth, goal.id)}
                className="flex items-center gap-3 flex-1 min-w-0 cursor-pointer"
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all ${
                  goal.completed
                    ? 'bg-emerald-500 text-slate-950'
                    : 'border-2 border-slate-600 group-hover:border-sky-400 bg-slate-950'
                }`}>
                  {goal.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>

                <span className={`text-xs font-semibold leading-relaxed truncate ${
                  goal.completed ? 'line-through text-slate-400' : 'text-slate-200'
                }`}>
                  {goal.text}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                  goal.priority === 'high'
                    ? 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                  {goal.priority}
                </span>

                <button
                  onClick={() => deleteGoal(activeMonth, goal.id)}
                  className="p-1 rounded-md text-slate-500 hover:text-rose-400 hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-all"
                  aria-label="Delete goal"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
