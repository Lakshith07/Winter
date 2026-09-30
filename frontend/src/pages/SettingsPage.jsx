import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Sun, 
  Moon, 
  Flame, 
  Volume2, 
  VolumeX, 
  Download, 
  Upload, 
  RotateCcw, 
  Sparkles, 
  Check, 
  ShieldAlert,
  Calendar,
  Layers,
  HelpCircle,
  Clock
} from 'lucide-react';
import { useWinterArc } from '../context/WinterArcContext';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { 
  CHALLENGE_START, 
  CHALLENGE_END, 
  ALL_90_DAYS 
} from '../utils/winterArc';

export default function SettingsPage() {
  const { 
    settings, 
    updateSettings, 
    exportData, 
    importData, 
    resetAllData, 
    loadSampleData,
    showToast 
  } = useWinterArc();

  const [draftName, setDraftName] = useState(settings.userName || 'Lakshith');
  const [draftReason, setDraftReason] = useState(settings.reasonToStart || '');
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

  const handleNameSave = (e) => {
    e.preventDefault();
    if (!draftName.trim()) return;
    updateSettings({ userName: draftName.trim() });
    showToast("Display name updated.");
  };

  const handleReasonSave = () => {
    updateSettings({ reasonToStart: draftReason.trim() });
    showToast("Personal motivation saved.");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        importData(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto animate-fadeIn">
      {/* 1. Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold tracking-widest uppercase mb-2">
          <SettingsIcon className="w-3.5 h-3.5" />
          System Preferences
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
          Settings & Challenge Configuration
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Customize your profile, streak thresholds, theme appearance, and manage data backups
        </p>
      </div>

      {/* 2. Profile & Identity Settings */}
      <div className="frost-card rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
          <User className="w-4 h-4 text-sky-400" />
          <span>User Profile</span>
        </h3>

        <form onSubmit={handleNameSave} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Display Name
            </label>
            <input
              type="text"
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              placeholder="e.g. Lakshith"
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400/50"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-sm transition-all"
            >
              Save Name
            </button>
          </div>
        </form>

        <div className="pt-3 border-t border-white/5">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Your Reason to Start (Personal Manifesto)
          </label>
          <textarea
            value={draftReason}
            onChange={(e) => setDraftReason(e.target.value)}
            onBlur={handleReasonSave}
            rows={3}
            className="w-full p-3 rounded-xl bg-slate-950 border border-white/10 text-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-400/50 leading-relaxed resize-none"
            placeholder="Write your core purpose..."
          />
        </div>
      </div>

      {/* 3. Challenge Rules & Streak Threshold */}
      <div className="frost-card rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-400" />
          <span>Streak Rules & Fixed Dates</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Streak Threshold */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5">
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Daily Streak Success Threshold
            </label>
            <p className="text-[11px] text-slate-400 mb-3">
              Minimum habits required to count a day as successful (Default: 6 of 8).
            </p>
            <div className="grid grid-cols-4 gap-2">
              {[5, 6, 7, 8].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => updateSettings({ threshold: t })}
                  className={`py-2 rounded-xl text-xs font-mono font-bold border transition-all ${
                    (settings.threshold || 6) === t
                      ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md'
                      : 'bg-slate-900/60 text-slate-400 border-white/5 hover:border-sky-500/30'
                  }`}
                >
                  {t} / 8
                </button>
              ))}
            </div>
          </div>

          {/* Fixed Challenge Dates */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5">
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Challenge Duration (Fixed)
            </label>
            <p className="text-[11px] text-slate-400 mb-2">
              Fixed to exactly 90 days.
            </p>
            <div className="space-y-1 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Start Date:</span>
                <span className="text-slate-200 font-bold">October 1, 2026</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">End Date:</span>
                <span className="text-slate-200 font-bold">December 29, 2026</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Total Duration:</span>
                <span className="text-sky-400 font-bold">Exactly 90 Days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Theme & Audio Controls */}
      <div className="frost-card rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
          <Sun className="w-4 h-4 text-amber-400" />
          <span>Appearance & Audio</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Theme Selector */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Theme Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'dark', label: 'Dark Winter', icon: Moon },
                { id: 'light', label: 'Glacier Light', icon: Sun },
                { id: 'oled', label: 'Pure OLED', icon: Layers },
              ].map((th) => {
                const Icon = th.icon;
                const isSelected = (settings.theme || 'dark') === th.id;
                return (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => updateSettings({ theme: th.id })}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-sky-500/20 text-sky-300 border-sky-400 shadow-md shadow-sky-500/10'
                        : 'bg-slate-950/60 text-slate-400 border-white/5 hover:border-sky-500/30 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{th.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sound Effects Toggle */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Audio Feedback
            </label>
            <button
              type="button"
              onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
              className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${
                settings.soundEnabled
                  ? 'bg-sky-500/15 text-sky-300 border-sky-400/50'
                  : 'bg-slate-950/60 text-slate-500 border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                {settings.soundEnabled ? <Volume2 className="w-5 h-5 text-sky-400" /> : <VolumeX className="w-5 h-5" />}
                <div className="text-left">
                  <div className="text-xs font-bold">Icy Sound Chimes</div>
                  <div className="text-[10px] text-slate-400">Synthesized habit completion & victory chimes</div>
                </div>
              </div>
              <span className="text-xs font-bold font-mono">
                {settings.soundEnabled ? 'ON' : 'OFF'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Date Simulation & Testing Tools (For Review / Demo) */}
      <div className="frost-card rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>Testing & Simulation Controls</span>
        </h3>
        <p className="text-xs text-slate-400">
          Simulate being on any challenge day to test countdowns, habits, calendar lock restrictions, and full analytics.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Simulate Current Date:</label>
            <select
              value={settings.simulatedDate || ''}
              onChange={(e) => updateSettings({ simulatedDate: e.target.value || null })}
              className="w-full p-2.5 rounded-xl bg-slate-950 border border-white/10 text-slate-200 text-xs font-mono focus:outline-none"
            >
              <option value="">Actual System Date (Real-time)</option>
              <option value="2026-09-30">Eve of Challenge (Sept 30, 2026)</option>
              <option value="2026-10-01">Day 01 (Oct 1, 2026 - Challenge Kickoff)</option>
              <option value="2026-10-07">Day 07 (Oct 7, 2026 - 1 Week Streak)</option>
              <option value="2026-10-31">Day 31 (Oct 31, 2026 - Phase 1 Finish)</option>
              <option value="2026-11-15">Day 46 (Nov 15, 2026 - Halfway Point)</option>
              <option value="2026-12-01">Day 62 (Dec 1, 2026 - December Sprint)</option>
              <option value="2026-12-29">Day 90 (Dec 29, 2026 - Final Victory)</option>
              <option value="2026-12-30">Post-Challenge (Dec 30, 2026)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={() => setIsSampleModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Load Sample Demo Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6. Data Persistence & Backup Actions */}
      <div className="frost-card rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Data Backup, Export & Reset</span>
        </h3>
        <p className="text-xs text-slate-400">
          All progress is safely persisted in browser LocalStorage. Export your data regularly to keep a secure offline JSON backup.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Export JSON */}
          <button
            type="button"
            onClick={exportData}
            className="p-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON Backup</span>
          </button>

          {/* Import JSON */}
          <label className="p-3.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4" />
            <span>Import Backup File</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Reset All Data */}
          <button
            type="button"
            onClick={() => setIsResetModalOpen(true)}
            className="p-3.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Challenge Data</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <ConfirmationModal
        isOpen={isResetModalOpen}
        title="Reset All Winter Arc Progress?"
        message="This will completely clear your daily habit checkmarks, sleep logs, monthly goals, and achievements. Are you sure you want to reset?"
        confirmLabel="Reset Everything"
        confirmVariant="danger"
        onConfirm={resetAllData}
        onCancel={() => setIsResetModalOpen(false)}
      />

      {/* Sample Data Confirmation Modal */}
      <ConfirmationModal
        isOpen={isSampleModalOpen}
        title="Load Sample Progress Data?"
        message="This will populate realistic habit records, sleep logs, and milestones for Days 1 to 38 so you can explore the complete charts, streaks, and analytics."
        confirmLabel="Load Demo Data"
        confirmVariant="primary"
        onConfirm={loadSampleData}
        onCancel={() => setIsSampleModalOpen(false)}
      />
    </div>
  );
}
