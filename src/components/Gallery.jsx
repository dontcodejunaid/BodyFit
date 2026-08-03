import React, { useState } from 'react';
import { Camera, ImageOff } from 'lucide-react';

/*
 * Placeholder photography: these are Unsplash stock URLs so the section has
 * something real to lay out. Swap `src` for photos of the actual gym floor
 * before launch — ideally imported from src/assets like the trainer portraits,
 * so the gallery keeps working offline and without a third-party request.
 */
const shots = [
  {
    src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
    caption: 'Main Strength Floor',
    tag: 'Weights',
    span: 'md:col-span-2 md:row-span-2'
  },
  {
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=700&q=80',
    caption: 'Cardio Theatre',
    tag: 'Cardio'
  },
  {
    src: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=700&q=80',
    caption: 'Functional Training Zone',
    tag: 'CrossFit'
  },
  {
    src: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=700&q=80',
    caption: 'Olympic Lifting Platform',
    tag: 'Strength'
  },
  {
    src: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=700&q=80',
    caption: 'Yoga & Mobility Studio',
    tag: 'Mobility'
  },
  {
    src: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=80',
    caption: 'Free Weight Racks',
    tag: 'Weights',
    span: 'md:col-span-2'
  },
  {
    src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=700&q=80',
    caption: 'Machine Circuit',
    tag: 'Machines'
  }
];

export default function Gallery() {
  // Remote images can fail (offline, blocked, dead id) — degrade to a labelled
  // tile rather than a broken-image icon in the middle of the grid.
  const [failed, setFailed] = useState({});

  return (
    <section
      id="gallery"
      className="relative py-20 sm:py-24 bg-slate-950 text-slate-100 overflow-hidden border-t border-slate-800/60"
    >
      {/* Background Decorative Lighting Orbs */}
      <div className="absolute top-1/4 -left-32 w-[28rem] h-[28rem] bg-orange-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 -right-24 w-[26rem] h-[26rem] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Camera className="w-4 h-4 text-orange-500" />
            Inside The Gym
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            See Where You'll Train.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            No stock-photo studio, no filters — this is the floor you walk onto every morning.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-[220px] gap-4">
          {shots.map((shot, idx) => (
            <figure
              key={shot.caption}
              className={`relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 group shadow-xl ${shot.span ?? ''}`}
            >
              {failed[idx] ? (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-900 to-slate-950 text-slate-500">
                  <ImageOff className="w-6 h-6" />
                  <span className="text-xs font-semibold">{shot.caption}</span>
                </div>
              ) : (
                <img
                  src={shot.src}
                  alt={`${shot.caption} at Body Fit Fitness Centre`}
                  loading="lazy"
                  onError={() => setFailed((prev) => ({ ...prev, [idx]: true }))}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              )}

              {/* Caption Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90" />
              <figcaption className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-white drop-shadow">
                  {shot.caption}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 backdrop-blur-md border border-amber-400/20 px-2.5 py-1 rounded-full shrink-0">
                  {shot.tag}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

      </div>
    </section>
  );
}
