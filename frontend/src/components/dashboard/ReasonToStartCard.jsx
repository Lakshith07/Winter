import React, { useState } from 'react';
import { Target, Edit2, Check, Sparkles } from 'lucide-react';
import { useWinterArc } from '../../context/WinterArcContext';

export default function ReasonToStartCard() {
  const { settings, updateSettings, showToast } = useWinterArc();
  const [isEditing, setIsEditing] = useState(false);
  const [draftReason, setDraftReason] = useState(settings.reasonToStart || '');

  const handleSave = () => {
    updateSettings({ reasonToStart: draftReason.trim() });
    setIsEditing(false);
    showToast("Your 'Reason to Start' has been saved.");
  };

  return (
    <div className="frost-card rounded-2xl p-5 sm:p-6 relative overflow-hidden group">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-1.5">
              <span>Your Reason to Start</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </h3>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
              The Winter Arc Anchor
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            if (isEditing) {
              handleSave();
            } else {
              setDraftReason(settings.reasonToStart || '');
              setIsEditing(true);
            }
          }}
          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-sky-500/20 text-slate-300 hover:text-sky-300 text-xs font-bold border border-white/5 hover:border-sky-500/30 transition-all flex items-center gap-1.5"
        >
          {isEditing ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Save</span>
            </>
          ) : (
            <>
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit Why</span>
            </>
          )}
        </button>
      </div>

      {/* Content */}
      {isEditing ? (
        <div className="mt-2 space-y-3">
          <textarea
            value={draftReason}
            onChange={(e) => setDraftReason(e.target.value)}
            rows={3}
            placeholder="Why are you doing the Winter Arc? What will you look and feel like after 90 days?"
            className="w-full p-3 rounded-xl bg-slate-950/80 border border-sky-500/30 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/50 leading-relaxed resize-none"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 text-xs text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 text-xs font-bold bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-lg shadow-sm transition-all"
            >
              Save Reason
            </button>
          </div>
        </div>
      ) : (
        <blockquote className="mt-2 text-sm text-slate-300 italic font-serif leading-relaxed pl-3 border-l-2 border-sky-500/50 bg-sky-500/[0.02] py-2 rounded-r-xl">
          "{settings.reasonToStart || "Set your personal manifesto. Why are you undertaking this 90-day transformation?"}"
        </blockquote>
      )}
    </div>
  );
}
