import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X, Check, ShieldAlert } from 'lucide-react';

export default function AdminConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  itemName = '',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  type = 'danger',
  loading = false,
}) {
  // Lock background scroll when modal is open and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !loading) {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, loading]);

  if (!isOpen) return null;

  const isDanger = type === 'danger';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop with Blur */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={() => !loading && onClose()}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl transition-all animate-in zoom-in-95 duration-200 z-10">
        {/* Top Accent Line */}
        <div
          className={`absolute top-0 left-0 right-0 h-1.5 ${
            isDanger ? 'bg-gradient-to-r from-red-600 via-rose-500 to-amber-500' : 'bg-gradient-to-r from-orange-500 to-amber-500'
          }`}
        />

        {/* Close Button */}
        <button
          className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          disabled={loading}
          onClick={onClose}
          type="button"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Icon & Heading Header */}
        <div className="flex flex-col items-center text-center">
          <div
            className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border ${
              isDanger
                ? 'border-red-500/30 bg-red-500/10 text-red-400 shadow-lg shadow-red-500/10 ring-4 ring-red-500/5'
                : 'border-orange-500/30 bg-orange-500/10 text-orange-400 shadow-lg shadow-orange-500/10 ring-4 ring-orange-500/5'
            }`}
          >
            {isDanger ? <Trash2 className="h-8 w-8 animate-pulse" /> : <AlertTriangle className="h-8 w-8" />}
          </div>

          <h3 className="font-teko text-3xl uppercase tracking-wide text-white">
            {title}
          </h3>

          {itemName && (
            <div className="mt-1 rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-1.5 text-xs font-semibold text-orange-400 truncate max-w-full">
              {itemName}
            </div>
          )}

          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            {message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
          <button
            className="w-full sm:w-auto flex-1 rounded-xl border border-slate-800 bg-slate-950/80 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white transition-all active:scale-95 disabled:opacity-50"
            disabled={loading}
            onClick={onClose}
            type="button"
          >
            {cancelText}
          </button>

          <button
            className={`w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg transition-all active:scale-95 disabled:opacity-50 ${
              isDanger
                ? 'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-red-500/25'
                : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 shadow-orange-500/25'
            }`}
            disabled={loading}
            onClick={onConfirm}
            type="button"
          >
            {loading ? (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : isDanger ? (
              <Trash2 className="h-4 w-4" />
            ) : (
              <Check className="h-4 w-4" />
            )}
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
