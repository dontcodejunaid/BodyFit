import React from 'react';
import {
  Dumbbell, HeartPulse, Zap, Sparkles, Users2, Droplets,
  Wifi, Snowflake, Car, ShieldCheck, Clock, Music, LayoutGrid
} from 'lucide-react';

const zones = [
  {
    title: 'Strength & Free Weights',
    description: 'Rubberized dumbbells from 2.5kg to 50kg, Olympic barbells, and plate-loaded rigs across a dedicated 3,000 sq ft floor.',
    icon: Dumbbell,
    color: 'from-orange-500 to-amber-500',
    stat: '50+ machines'
  },
  {
    title: 'Cardio Theatre',
    description: 'Treadmills, ellipticals, rowers, and assault bikes — each with an individual screen so you set your own pace and playlist.',
    icon: HeartPulse,
    color: 'from-amber-500 to-red-500',
    stat: '24 stations'
  },
  {
    title: 'Functional & CrossFit Rig',
    description: 'Olympic lifting turf, battle ropes, kettlebells, and a full functional rig built for explosive, compound movement.',
    icon: Zap,
    color: 'from-red-500 to-orange-500',
    stat: '1,200 sq ft turf'
  },
  {
    title: 'Yoga & Mobility Studio',
    description: 'A quiet, mirrored studio for guided yoga, stretching, and mobility work — away from the noise of the main floor.',
    icon: Sparkles,
    color: 'from-orange-500 to-yellow-500',
    stat: '6 classes daily'
  },
  {
    title: 'Personal Training Suites',
    description: 'Private coaching bays for form assessments, one-on-one sessions, and body composition analysis with your trainer.',
    icon: Users2,
    color: 'from-amber-500 to-orange-600',
    stat: '8 certified coaches'
  },
  {
    title: 'Locker Rooms & Showers',
    description: 'Spacious changing rooms with hot showers, lockers, grooming stations, and a daily-sanitised towel service.',
    icon: Droplets,
    color: 'from-orange-600 to-red-500',
    stat: 'Sanitised daily'
  }
];

const amenities = [
  { text: 'Fully Air Conditioned', icon: Snowflake },
  { text: 'Free High-Speed Wi-Fi', icon: Wifi },
  { text: 'Covered Two-Wheeler Parking', icon: Car },
  { text: 'Premium Sound System', icon: Music },
  { text: 'CCTV Monitored Floors', icon: ShieldCheck },
  { text: 'Open 6 AM – 10 PM', icon: Clock }
];

export default function Facilities() {
  return (
    <section
      id="facilities"
      className="relative py-20 sm:py-24 bg-slate-950 text-slate-100 overflow-hidden border-t border-slate-800/60"
    >
      {/* Background Decorative Lighting Orbs */}
      <div className="absolute top-24 -right-32 w-[28rem] h-[28rem] bg-orange-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-[26rem] h-[26rem] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <LayoutGrid className="w-4 h-4 text-orange-500" />
            Our Facilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Every Zone You Need,{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Under One Roof.
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Six purpose-built training zones across 8,000 sq ft — so you never queue for a rack, and never train around someone else's session.
          </p>
        </div>

        {/* Zone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {zones.map((zone) => {
            const Icon = zone.icon;
            return (
              <div
                key={zone.title}
                className="p-7 rounded-3xl bg-slate-950/90 backdrop-blur-xl border border-slate-800/90 hover:border-orange-500/50 hover:bg-slate-900/40 transition-all duration-300 space-y-4 group shadow-xl"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${zone.color} text-white w-fit shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full">
                    {zone.stat}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-white group-hover:text-orange-400 transition-colors">
                  {zone.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {zone.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Amenities Ribbon */}
        <div className="rounded-3xl bg-slate-950/90 backdrop-blur-xl p-6 border border-slate-800/80 shadow-2xl">
          <div className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Included With Every Membership
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {amenities.map((amenity) => {
              const Icon = amenity.icon;
              return (
                <div
                  key={amenity.text}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800/80 text-xs sm:text-sm font-semibold text-slate-200 hover:border-orange-500/40 transition-colors"
                >
                  <Icon className="w-4 h-4 text-orange-500" />
                  {amenity.text}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
