import React from 'react';
import { Dumbbell, HeartPulse, Bike, Droplets, Wind, Camera } from 'lucide-react';

// PLACEHOLDER — dummy copy so the navbar link has somewhere to scroll.
// Replace the items below with the gym's real facility list.
const facilities = [
  { icon: Dumbbell, title: 'Strength Zone', text: 'Free weights, racks and plate-loaded machines.' },
  { icon: HeartPulse, title: 'Cardio Deck', text: 'Treadmills, ellipticals and rowers.' },
  { icon: Bike, title: 'Spin Studio', text: 'Group cycling with dedicated bikes.' },
  { icon: Wind, title: 'Functional Area', text: 'Turf track, ropes and kettlebells.' },
  { icon: Droplets, title: 'Steam & Sauna', text: 'Recovery rooms and clean shower stalls.' },
  { icon: Camera, title: 'Locker Rooms', text: 'Secure lockers and changing space.' },
];

export default function Facilities() {
  return (
    <section
      id="facilities"
      className="scroll-mt-20 relative py-20 bg-slate-950 text-slate-100 border-t border-slate-800/60 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-orange-400">
            What We Offer
          </span>
          <h2 className="font-teko mt-2 text-4xl sm:text-5xl uppercase tracking-wide text-white">
            Our Facilities
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-400">
            Placeholder copy — update this section with the real facility details.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-all hover:border-orange-500/40 hover:bg-slate-900/70"
            >
              <div className="inline-flex rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 p-2.5 text-white shadow-md">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-white">{title}</h3>
              <p className="mt-1.5 text-sm text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
