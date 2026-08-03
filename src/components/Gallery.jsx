import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

// PLACEHOLDER — dummy tiles so the navbar link has somewhere to scroll.
// Swap each tile for a real gym photo when they're ready.
const tiles = [
  'Gym Floor',
  'Strength Zone',
  'Cardio Deck',
  'Group Class',
  'Locker Room',
  'Reception',
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="scroll-mt-20 relative py-20 bg-slate-950 text-slate-100 border-t border-slate-800/60 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-orange-400">
            Inside Body Fit
          </span>
          <h2 className="font-teko mt-2 text-4xl sm:text-5xl uppercase tracking-wide text-white">
            Gallery
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
            Placeholder tiles — replace these with real photos of the gym.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {tiles.map((label) => (
            <div
              key={label}
              className="group flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 transition-all hover:border-orange-500/40 hover:bg-slate-900/70"
            >
              <ImageIcon className="h-7 w-7 text-slate-600 transition-colors group-hover:text-orange-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
