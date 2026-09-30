import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmationModal({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to proceed? This action cannot be undone.",
  confirmLabel = "Confirm",
  confirmVariant = "danger", // 'danger' | 'primary'
  onConfirm,
  onCancel
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-md frost-card rounded-2xl p-6 shadow-2xl border border-white/10 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl flex-shrink-0 ${
            confirmVariant === 'danger' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
          }`}>
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-100">{title}</h3>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">{message}</p>
          </div>

          <button
            onClick={onCancel}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/5">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onCancel();
            }}
            className={`px-5 py-2 text-sm font-bold rounded-xl shadow-lg transition-all transform active:scale-95 ${
              confirmVariant === 'danger'
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/25'
                : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/25'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
