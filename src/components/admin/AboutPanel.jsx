import React, { useState } from 'react';
import { Save, RotateCcw, Upload, X, Image as ImageIcon, Sparkles, User, Award, CheckCircle } from 'lucide-react';
import { getAboutData, saveAboutData, resetAboutData } from '../../utils/adminStore';

export default function AboutPanel() {
  const [data, setData] = useState(() => getAboutData());
  const [savedNotice, setSavedNotice] = useState('');
  const [fileError, setFileError] = useState('');

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

  const handleSave = () => {
    saveAboutData(data);
    setSavedNotice('✅ About Us details updated successfully! Live website will reflect changes immediately.');
    setTimeout(() => setSavedNotice(''), 4000);
  };

  const handleReset = () => {
    if (window.confirm('Reset About Us content to original defaults?')) {
      const defaultData = resetAboutData();
      setData(defaultData);
      setSavedNotice('Reset to default About Us values.');
      setTimeout(() => setSavedNotice(''), 4000);
    }
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
            onClick={handleReset}
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
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-orange-500/20 hover:from-orange-400 hover:to-amber-400 transition-all active:scale-95"
          onClick={handleSave}
          type="button"
        >
          <Save className="h-4 w-4" />
          Save All About Us Changes
        </button>
      </div>
    </div>
  );
}
