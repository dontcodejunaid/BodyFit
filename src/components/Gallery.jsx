import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

const tiles = [
  { label: 'Gym Floor', subtitle: 'Premium training space' },
  { label: 'Strength Zone', subtitle: 'Strength equipment' },
  { label: 'Cardio Deck', subtitle: 'High-energy cardio area' },
  { label: 'Group Class', subtitle: 'Motivating sessions' },
  { label: 'Locker Room', subtitle: 'Clean and comfortable' },
  { label: 'Reception', subtitle: 'Warm welcome area' },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="scroll-mt-20 relative overflow-hidden border-t border-slate-800/60 bg-slate-950 py-20 text-slate-100"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="text-xs font-extrabold uppercase tracking-[0.35em] text-orange-400">
            Inside BodyFit
          </span>
          <h2 className="mt-2 font-teko text-4xl uppercase tracking-wide text-white sm:text-5xl">
            Gallery
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Explore our training spaces, equipment, and community areas designed to support every fitness goal.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tiles.map((item) => (
            <div
              key={item.label}
              className="group flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-900/70 to-slate-800/50 transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/40 hover:bg-slate-900/80"
            >
              <div className="rounded-full border border-orange-500/20 bg-orange-500/10 p-3">
                <ImageIcon className="h-7 w-7 text-orange-500 transition-colors group-hover:text-orange-400" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-200">
                {item.label}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                {item.subtitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
