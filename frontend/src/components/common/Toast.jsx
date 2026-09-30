import React from 'react';
import { CheckCircle2, AlertTriangle, Info, Sparkles, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'celebrate':
        return <Sparkles className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '3s' }} />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-rose-400" />;
      case 'info':
        return <Info className="w-5 h-5 text-sky-400" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'celebrate':
        return 'border-amber-500/40 shadow-amber-500/10';
      case 'error':
        return 'border-rose-500/40 shadow-rose-500/10';
      case 'info':
        return 'border-sky-500/40 shadow-sky-500/10';
      default:
        return 'border-emerald-500/40 shadow-emerald-500/10';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/95 text-slate-100 border ${getBorderColor()} shadow-2xl backdrop-blur-xl max-w-md`}>
        {getIcon()}
        <span className="text-sm font-medium leading-snug">{toast.message}</span>
        <button
          onClick={onClose}
          className="ml-auto p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
