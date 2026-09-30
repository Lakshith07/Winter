import React, { useState } from 'react';
import { TrendingUp, Plus, Trash2, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useWinterArc } from '../../context/WinterArcContext';

export default function ImprovementsSection({ activeMonth = 'october', monthName = 'October 2026' }) {
  const { improvements, addImprovement, deleteImprovement } = useWinterArc();
  const monthImprovements = improvements[activeMonth] || [];

  const [text, setText] = useState('');
  const [actionPlan, setActionPlan] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    addImprovement(activeMonth, text, actionPlan);
    setText('');
    setActionPlan('');
    setIsAdding(false);
  };

  return (
    <div className="frost-card rounded-2xl p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span>3. What Should I Improve?</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                {monthImprovements.length} Items
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Constructive reflection & action adjustments for {monthName}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="px-3 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 text-xs font-bold border border-teal-500/30 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Note</span>
        </button>
      </div>

      {/* Add form */}
      {isAdding && (
        <form onSubmit={handleAdd} className="mb-4 p-3.5 rounded-xl bg-slate-900/90 border border-teal-500/30 space-y-3 animate-fadeIn">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What area needs adjustment? (e.g. Bedtime delay caused morning grogginess)"
            className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-teal-400"
            autoFocus
          />
          <input
            type="text"
            value={actionPlan}
            onChange={(e) => setActionPlan(e.target.value)}
            placeholder="Action plan: (e.g. Put phone in airplane mode at 10:00 PM)"
            className="w-full p-2.5 rounded-lg bg-slate-950 border border-white/10 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-teal-400"
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
              className="px-4 py-1 text-xs font-bold bg-teal-500 text-slate-950 rounded-lg shadow-sm"
            >
              Save Adjustment
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="space-y-2.5">
        {monthImprovements.length === 0 ? (
          <div className="p-6 rounded-xl bg-white/[0.02] border border-dashed border-white/10 text-center text-xs text-slate-500">
            No improvement notes logged for {monthName}. Reflect regularly to fine-tune your discipline.
          </div>
        ) : (
          monthImprovements.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-teal-950/15 border border-teal-500/20 flex items-start justify-between gap-3 group"
            >
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-teal-400 flex-shrink-0" />
                  <span>{item.text}</span>
                </div>
                {item.actionPlan && (
                  <div className="mt-1 text-[11px] text-teal-300/90 pl-5 leading-relaxed bg-teal-500/5 py-1 px-2 rounded-lg border-l border-teal-400/40">
                    <span className="font-bold text-teal-400">Action Plan:</span> {item.actionPlan}
                  </div>
                )}
              </div>

              <button
                onClick={() => deleteImprovement(activeMonth, item.id)}
                className="p-1 rounded-md text-slate-500 hover:text-rose-400 hover:bg-white/5 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                aria-label="Delete improvement note"
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
