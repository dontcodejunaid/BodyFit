import React, { useState } from 'react';
import { Save, RotateCcw, Upload, X, Image as ImageIcon, Sparkles, User, Award, CheckCircle, Loader2 } from 'lucide-react';
import { getAboutData, saveAboutData, resetAboutData } from '../../utils/adminStore';
import { saveAboutToFirebase } from '../../firebase';
import AdminConfirmModal from './AdminConfirmModal';


export default function AboutPanel() {
  const [data, setData] = useState(() => getAboutData());
  const [savedNotice, setSavedNotice] = useState('');
  const [fileError, setFileError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const updateField = (path, value) => {
    const keys = path.split('.');
    setData((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      let curr = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        curr = curr[keys[i]];
      }
      curr[keys[keys.length - 1]] = value;
      return copy;
    });
  };

  const handlePhotoUpload = (e) => {
    setFileError('');
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFileError('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError('Image file size must be under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      updateField('founder.photo', event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    updateField('founder.photo', '');
  };

  const handleSave = async () => {
    setIsSaving(true);
    saveAboutData(data);
    await saveAboutToFirebase(data);
    setIsSaving(false);
    setShowSuccessModal(true);
  };

  const handleResetRequest = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = async () => {
    setIsSaving(true);
    const defaultData = resetAboutData();
    setData(defaultData);
    await saveAboutToFirebase(defaultData);
    setIsSaving(false);
    setShowResetConfirm(false);
    setShowSuccessModal(true);
  };



  return (
    <div className="space-y-8 text-slate-100">
      {/* Top Header & Save Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-5">
        <div>
          <h2 className="font-teko text-3xl uppercase tracking-wide text-white">
            Manage <span className="text-orange-500">About Us</span> Section
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            Edit text content, owner/head coach photo, story, metrics, and highlights displayed on the public website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-2.5 text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
            onClick={handleResetRequest}
            type="button"
          >
            <RotateCcw className="h-4 w-4" />
            Reset Defaults
          </button>


          <button
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-orange-500/20 hover:from-orange-400 hover:to-amber-400 transition-all active:scale-95"
            onClick={handleSave}
            type="button"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>

      {savedNotice && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-bold text-emerald-300 animate-in fade-in">
          {savedNotice}
        </div>
      )}

      {/* Section 1: Header Titles & Main Story */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
        <h3 className="flex items-center gap-2 text-sm font-bold text-orange-400 uppercase tracking-wider">
          <Sparkles className="h-4 w-4" />
          1. Header & Main Story
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
              Badge Text
            </label>
            <input
              className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-orange-500/60 focus:outline-none"
              onChange={(e) => updateField('header.badge', e.target.value)}
              value={data.header?.badge || ''}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
              Main Title
            </label>
            <input
              className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-orange-500/60 focus:outline-none"
              onChange={(e) => updateField('header.titleMain', e.target.value)}
              value={data.header?.titleMain || ''}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
              Subtitle (Gradient Highlight)
            </label>
            <input
              className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-orange-500/60 focus:outline-none"
              onChange={(e) => updateField('header.titleSub', e.target.value)}
              value={data.header?.titleSub || ''}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
              Main Story Description
            </label>
            <textarea
              className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:border-orange-500/60 focus:outline-none"
              onChange={(e) => updateField('header.story', e.target.value)}
              rows={4}
              value={data.header?.story || ''}
            />
          </div>
        </div>
      </div>

      {/* Section 2: Founder / Head Coach & Picture */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-6">
        <h3 className="flex items-center gap-2 text-sm font-bold text-orange-400 uppercase tracking-wider">
          <User className="h-4 w-4" />
          2. Founder & Head Coach Section (Photo & Quote)
        </h3>

        {/* Founder Picture Upload & Manager */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Head Coach / Founder Photo
          </label>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Image Preview Box */}
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-md">
              {data.founder?.photo ? (
                <img
                  alt="Founder Preview"
                  className="h-full w-full object-cover object-top"
                  src={data.founder.photo}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center text-slate-600">
                  <ImageIcon className="h-8 w-8 mb-1" />
                  <span className="text-[10px]">Default Asset</span>
                </div>
              )}
            </div>

            <div className="flex-1 space-y-3 w-full">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:border-orange-500/60 focus:outline-none"
                  onChange={(e) => updateField('founder.photo', e.target.value)}
                  placeholder="Paste Image URL or upload file below..."
                  type="text"
                  value={data.founder?.photo || ''}
                />

                <label className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-bold text-slate-200 transition-all hover:border-orange-500/50 hover:bg-slate-700 hover:text-white active:scale-95">
                  <Upload className="h-4 w-4 text-orange-400" />
                  <span>Upload Photo</span>
                  <input
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                    type="file"
                  />
                </label>

                {data.founder?.photo && (
                  <button
                    className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-500/20 transition-colors"
                    onClick={handleRemovePhoto}
                    title="Remove custom photo"
                    type="button"
                  >
                    <X className="h-4 w-4" />
                    <span>Remove</span>
                  </button>
                )}
              </div>

              {fileError && <p className="text-xs font-semibold text-red-400">{fileError}</p>}
              <p className="text-[11px] text-slate-500">
                You can upload a custom image (JPG, PNG, WEBP) or paste a direct image URL. If cleared, default asset photo is used.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
              Badge Title (e.g. Head Coach & Owner)
            </label>
            <input
              className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3.5 py-2.5 text-sm text-slate-100 focus:border-orange-500/60 focus:outline-none"
              onChange={(e) => updateField('founder.badge', e.target.value)}
              value={data.founder?.badge || ''}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
              Rating Badge
            </label>
            <input
              className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3.5 py-2.5 text-sm text-slate-100 focus:border-orange-500/60 focus:outline-none"
              onChange={(e) => updateField('founder.rating', e.target.value)}
              value={data.founder?.rating || ''}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
              Section Title
            </label>
            <input
              className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3.5 py-2.5 text-sm text-slate-100 focus:border-orange-500/60 focus:outline-none"
              onChange={(e) => updateField('founder.title', e.target.value)}
              value={data.founder?.title || ''}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-400">
              Owner's Quote / Note
            </label>
            <textarea
              className="w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3.5 py-2.5 text-sm text-slate-100 focus:border-orange-500/60 focus:outline-none"
              onChange={(e) => updateField('founder.note', e.target.value)}
              rows={3}
              value={data.founder?.note || ''}
            />
          </div>
        </div>
      </div>

      {/* Section 3: Key Gym Metrics & Stats */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
        <h3 className="flex items-center gap-2 text-sm font-bold text-orange-400 uppercase tracking-wider">
          <Award className="h-4 w-4" />
          3. Key Statistics & Achievements
        </h3>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {(data.metrics || []).map((metric, idx) => (
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 space-y-2" key={idx}>
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500">Value</label>
                <input
                  className="w-full rounded border border-slate-800 bg-slate-900 px-2 py-1 text-sm font-bold text-white focus:border-orange-500/60 focus:outline-none"
                  onChange={(e) => {
                    const newMetrics = [...data.metrics];
                    newMetrics[idx].value = e.target.value;
                    setData((prev) => ({ ...prev, metrics: newMetrics }));
                  }}
                  value={metric.value}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500">Label</label>
                <input
                  className="w-full rounded border border-slate-800 bg-slate-900 px-2 py-1 text-xs text-slate-300 focus:border-orange-500/60 focus:outline-none"
                  onChange={(e) => {
                    const newMetrics = [...data.metrics];
                    newMetrics[idx].label = e.target.value;
                    setData((prev) => ({ ...prev, metrics: newMetrics }));
                  }}
                  value={metric.label}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Save Bar */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
        <button
          disabled={isSaving}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-orange-500/20 hover:from-orange-400 hover:to-amber-400 transition-all active:scale-95 disabled:opacity-50"
          onClick={handleSave}
          type="button"
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isSaving ? 'Syncing...' : 'Save All About Us Changes'}
        </button>
      </div>

      {/* Custom Reset Confirmation Modal */}
      <AdminConfirmModal
        cancelText="Cancel"
        confirmText="Reset to Defaults"
        isOpen={showResetConfirm}
        loading={isSaving}
        message="Are you sure you want to reset all About Us text, images, and metrics back to their original default values? This action will sync live across the site."
        onClose={() => setShowResetConfirm(false)}
        onConfirm={confirmReset}
        title="Reset About Us Defaults"
        type="danger"
      />

      {/* Pop-up Window Modal: CHANGES SAVED */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
            onClick={() => setShowSuccessModal(false)}
          />
          <div className="relative w-full max-w-md transform overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl transition-all animate-in zoom-in-95 duration-200 z-10 text-center">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />

            <button
              className="absolute top-4 right-4 rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              onClick={() => setShowSuccessModal(false)}
              type="button"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-4 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-lg shadow-emerald-500/20 ring-4 ring-emerald-500/10">
              <CheckCircle className="h-8 w-8 animate-bounce" />
            </div>

            <h3 className="font-teko text-3xl uppercase tracking-wide text-white">
              CHANGES SAVED
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              Your About Us changes have been successfully saved and synced live to Google Firebase Cloud Database! Visitors on all devices and live links will now see your updated content immediately.
            </p>

            <div className="mt-6 flex justify-center">
              <button
                className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-400 hover:to-teal-400 transition-all active:scale-95"
                onClick={() => setShowSuccessModal(false)}
                type="button"
              >
                OK, Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


