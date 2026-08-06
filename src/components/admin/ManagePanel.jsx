import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Save, X, Loader2, Cloud } from 'lucide-react';
import {
  getTrainers, saveTrainers, getClasses, saveClasses,
  getMemberships, saveMemberships, newId,
} from '../../utils/adminStore';
import { CLASS_CATEGORIES, DAYS_OF_WEEK } from '../../data/trainersAndScheduleData';
import { PLAN_GRADIENTS } from '../../data/membershipPlans';
import {
  getTrainersFromFirebase,
  addTrainerToFirebase,
  updateTrainerInFirebase,
  deleteTrainerFromFirebase,
} from '../../firebase';

// Each collection declares its own fields, so one editor renders all three.
// `list` fields are stored as arrays but edited as comma-separated text.
const COLLECTIONS = {
  memberships: {
    label: 'Membership Plans',
    idPrefix: 'mem',
    read: getMemberships,
    write: saveMemberships,
    note: 'Changes appear on the public Membership Plans section after a refresh.',
    primary: 'name',
    fields: [
      { key: 'name', label: 'Plan name', type: 'text' },
      { key: 'tier', label: 'Tier (used on the button)', type: 'text', placeholder: 'Basic' },
      { key: 'description', label: 'Short description', type: 'text', wide: true },
      { key: 'priceMonthly', label: 'Monthly price', type: 'text', placeholder: '₹1,500' },
      { key: 'priceYearly', label: 'Yearly price (per month)', type: 'text', placeholder: '₹1,200' },
      { key: 'yearlyTotal', label: 'Yearly total', type: 'text', placeholder: '₹14,400/yr' },
      { key: 'badgeText', label: 'Badge text', type: 'text', placeholder: 'Most Popular ⭐' },
      { key: 'badgeColor', label: 'Badge colour (hex)', type: 'text', placeholder: '#FF5733' },
      { key: 'gradient', label: 'Card gradient', type: 'select', options: PLAN_GRADIENTS },
      { key: 'discountTag', label: 'Discount tag', type: 'text', wide: true },
      { key: 'imageUrl', label: 'Image URL', type: 'text', wide: true },
      { key: 'features', label: 'Features (comma separated)', type: 'list', wide: true },
      { key: 'isFeatured', label: 'Highlight as featured plan', type: 'boolean' },
    ],
  },
  trainers: {
    label: 'Trainers',
    idPrefix: 'tr',
    read: getTrainers,
    write: saveTrainers,
    note: '⚡ Connected to Google Firebase Cloud Database. Changes update live across the website.',
    primary: 'name',
    fields: [
      { key: 'name', label: 'Full name', type: 'text' },
      { key: 'role', label: 'Role', type: 'text' },
      { key: 'experience', label: 'Experience', type: 'text', placeholder: '5+ Years' },
      { key: 'rating', label: 'Rating', type: 'number', step: '0.1' },
      { key: 'specialties', label: 'Specialties (comma separated)', type: 'list', wide: true },
      { key: 'photo', label: 'Photo Image URL', type: 'text', wide: true, placeholder: 'https://images.unsplash.com/...' },
      { key: 'bio', label: 'Short bio', type: 'textarea', wide: true },
      { key: 'available', label: 'Currently available', type: 'boolean' },
    ],
  },
  classes: {
    label: 'Class Schedule',
    idPrefix: 'sch',
    read: getClasses,
    write: saveClasses,
    note: 'Changes appear on the public Class Schedule after a refresh.',
    primary: 'className',
    fields: [
      { key: 'className', label: 'Class name', type: 'text' },
      {
        key: 'category',
        label: 'Category',
        type: 'select',
        options: CLASS_CATEGORIES.filter((item) => item.id !== 'All').map((item) => item.id),
      },
      { key: 'day', label: 'Day', type: 'select', options: DAYS_OF_WEEK },
      { key: 'time', label: 'Time', type: 'text', placeholder: '06:30 AM - 07:30 AM' },
      { key: 'trainer', label: 'Trainer', type: 'text' },
      { key: 'room', label: 'Room', type: 'text' },
      { key: 'capacity', label: 'Capacity', type: 'number' },
      { key: 'level', label: 'Level', type: 'text', placeholder: 'All Levels' },
    ],
  },
};

const blankRow = (config) => {
  const row = { id: newId(config.idPrefix) };
  config.fields.forEach((field) => {
    if (field.type === 'list') row[field.key] = [];
    else if (field.type === 'boolean') row[field.key] = true;
    else if (field.type === 'number') row[field.key] = 0;
    else row[field.key] = '';
  });
  return row;
};

function FieldInput({ field, value, onChange }) {
  const base =
    'w-full rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:border-orange-500/60 focus:outline-none';

  if (field.type === 'boolean') {
    return (
      <label className="flex cursor-pointer items-center gap-2 py-2 text-sm text-slate-300">
        <input
          checked={Boolean(value)}
          className="h-4 w-4 cursor-pointer accent-orange-500"
          onChange={(event) => onChange(event.target.checked)}
          type="checkbox"
        />
        {field.label}
      </label>
    );
  }

  if (field.type === 'select') {
    return (
      <select className={base} onChange={(event) => onChange(event.target.value)} value={value || ''}>
        <option value="">Select…</option>
        {field.options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    );
  }

  if (field.type === 'textarea') {
    return (
      <textarea
        className={base}
        onChange={(event) => onChange(event.target.value)}
        placeholder={field.placeholder}
        rows={2}
        value={value || ''}
      />
    );
  }

  if (field.type === 'list') {
    return (
      <input
        className={base}
        onChange={(event) => onChange(event.target.value)}
        placeholder={field.placeholder || 'One, Two, Three'}
        type="text"
        value={Array.isArray(value) ? value.join(', ') : value || ''}
      />
    );
  }

  return (
    <input
      className={base}
      onChange={(event) => onChange(field.type === 'number' ? Number(event.target.value) : event.target.value)}
      placeholder={field.placeholder}
      step={field.step}
      type={field.type}
      value={value ?? ''}
    />
  );
}

export default function ManagePanel() {
  const [active, setActive] = useState('memberships');
  const [rows, setRows] = useState(() => COLLECTIONS.memberships.read());
  const [editing, setEditing] = useState(null); // row id, or 'new'
  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const config = COLLECTIONS[active];

  // Load collection data (with Firebase Cloud sync for trainers)
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      if (active === 'trainers') {
        setLoading(true);
        try {
          const fbTrainers = await getTrainersFromFirebase();
          if (fbTrainers && fbTrainers.length > 0 && isMounted) {
            setRows(fbTrainers);
            saveTrainers(fbTrainers);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.warn('Firebase trainers fetch issue in admin:', err);
        }
        if (isMounted) {
          setRows(getTrainers());
          setLoading(false);
        }
      } else {
        setRows(COLLECTIONS[active].read());
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, [active]);

  const switchTo = (key) => {
    setActive(key);
    setEditing(null);
    setDraft(null);
  };

  const startEdit = (row) => {
    setEditing(row.id || row.docId);
    setDraft({ ...row });
  };

  const startNew = () => {
    setEditing('new');
    setDraft(blankRow(config));
  };

  const cancel = () => {
    setEditing(null);
    setDraft(null);
  };

  const commit = async () => {
    // Normalise comma-separated fields back into arrays before saving.
    const cleaned = { ...draft };
    config.fields
      .filter((field) => field.type === 'list')
      .forEach((field) => {
        const raw = cleaned[field.key];
        cleaned[field.key] = Array.isArray(raw)
          ? raw
          : String(raw || '')
              .split(',')
              .map((item) => item.trim())
              .filter(Boolean);
      });

    setIsSaving(true);

    if (active === 'trainers') {
      try {
        if (editing === 'new') {
          const added = await addTrainerToFirebase(cleaned);
          const next = [...rows, added || cleaned];
          saveTrainers(next);
          setRows(next);
        } else {
          const targetId = cleaned.docId || cleaned.id;
          await updateTrainerInFirebase(targetId, cleaned);
          const next = rows.map((row) => ((row.docId || row.id) === editing ? { ...row, ...cleaned } : row));
          saveTrainers(next);
          setRows(next);
        }
        window.dispatchEvent(new Event('bodyfit_trainers_updated'));
      } catch (err) {
        console.error('Failed to sync trainer with Firebase:', err);
        const next =
          editing === 'new'
            ? [...rows, cleaned]
            : rows.map((row) => (row.id === editing ? cleaned : row));
        config.write(next);
        setRows(next);
      }
    } else {
      const next =
        editing === 'new'
          ? [...rows, cleaned]
          : rows.map((row) => (row.id === editing ? cleaned : row));

      config.write(next);
      setRows(next);
    }

    setIsSaving(false);
    cancel();
  };

  const remove = async (row) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm(`Delete "${row[config.primary] || 'this entry'}"? This cannot be undone.`)) return;

    if (active === 'trainers') {
      try {
        await deleteTrainerFromFirebase(row.docId || row.id);
        const next = rows.filter((item) => (item.docId || item.id) !== (row.docId || row.id));
        saveTrainers(next);
        setRows(next);
        window.dispatchEvent(new Event('bodyfit_trainers_updated'));
      } catch (err) {
        console.error('Failed to delete trainer from Firebase:', err);
        const next = rows.filter((item) => item.id !== row.id);
        config.write(next);
        setRows(next);
      }
    } else {
      const next = rows.filter((item) => item.id !== row.id);
      config.write(next);
      setRows(next);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(COLLECTIONS).map(([key, item]) => (
            <button
              className={`rounded-lg px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                active === key
                  ? 'bg-orange-500 text-white'
                  : 'border border-slate-800 bg-slate-900/50 text-slate-400 hover:text-white'
              }`}
              key={key}
              onClick={() => switchTo(key)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          className="inline-flex items-center gap-2 self-start rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 px-4 py-2 text-xs font-black uppercase tracking-wider text-white transition-all active:scale-95"
          onClick={startNew}
          type="button"
        >
          <Plus className="h-4 w-4" />
          Add new
        </button>
      </div>

      <p className="mt-4 text-xs text-slate-500">{config.note}</p>

      {/* Editor */}
      {draft && (
        <div className="mt-4 rounded-2xl border border-orange-500/30 bg-slate-900/60 p-5">
          <h3 className="text-sm font-bold text-white">
            {editing === 'new' ? `New ${config.label.replace(/s$/, '')}` : 'Edit entry'}
          </h3>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {config.fields.map((field) => (
              <div className={field.wide ? 'sm:col-span-2' : ''} key={field.key}>
                {field.type !== 'boolean' && (
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {field.label}
                  </label>
                )}
                <FieldInput
                  field={field}
                  onChange={(value) => setDraft((prev) => ({ ...prev, [field.key]: value }))}
                  value={draft[field.key]}
                />
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2">
            <button
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 px-4 py-2 text-xs font-black uppercase tracking-wider text-white transition-all active:scale-95 disabled:opacity-50"
              onClick={commit}
              type="button"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {isSaving ? 'Syncing...' : 'Save'}
            </button>
            <button
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-800 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 transition-colors hover:text-white"
              onClick={cancel}
              type="button"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Rows */}
      <div className="mt-4 space-y-2">
        {loading ? (
          <div className="flex items-center justify-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 py-12 text-sm text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
            Loading live data from Google Firebase...
          </div>
        ) : rows.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 py-12 text-center text-sm text-slate-500">
            Nothing here yet. Use “Add new” to create the first entry.
          </div>
        ) : null}

        {!loading && rows.map((row, idx) => (
          <div
            className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3"
            key={row.docId || row.id || idx}
          >
            <div className="min-w-0">
              <div className="text-sm font-bold text-white">{row[config.primary] || 'Untitled'}</div>
              <div className="mt-0.5 truncate text-xs text-slate-500">
                {config.fields
                  .filter((field) => field.key !== config.primary && field.type !== 'textarea')
                  .slice(0, 3)
                  .map((field) => {
                    const value = row[field.key];
                    const text = Array.isArray(value) ? value.join(', ') : String(value ?? '');
                    return text ? `${field.label.split(' (')[0]}: ${text}` : null;
                  })
                  .filter(Boolean)
                  .join('  ·  ')}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                aria-label="Edit"
                className="rounded-lg border border-slate-800 p-2 text-slate-400 transition-colors hover:border-orange-500/40 hover:text-white"
                onClick={() => startEdit(row)}
                type="button"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <button
                aria-label="Delete"
                className="rounded-lg border border-slate-800 p-2 text-slate-500 transition-colors hover:border-red-500/40 hover:text-red-400"
                onClick={() => remove(row)}
                type="button"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
