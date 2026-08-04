import React from 'react';
import {
  Dumbbell, HeartPulse, Zap, Sparkles, Users2, Droplets,
  Car, LayoutGrid, Trophy, Flame, Utensils
} from 'lucide-react';
import SocialCards from './ui/card-fan-carousel';

const facilityCards = [
  {
    title: 'Cardio Zone',
    description: 'State-of-the-art treadmills, ellipticals, rowers & stairmaster stations with personal monitors.',
    icon: HeartPulse,
    stat: '24 Stations',
    imgUrl: 'https://media.istockphoto.com/id/1392310809/photo/treadmills-in-a-gym.jpg?s=612x612&w=0&k=20&c=mlrBv5jH6nNw6VV21iUETrpy0avUDVdTB3mG51uxEJs=',
    alt: 'Cardio Zone'
  },
  {
    title: 'Free Weights Area',
    description: 'Heavy dumbbell racks up to 50kg, power cages, Olympic benches & bumper plates for intense lifting.',
    icon: Dumbbell,
    stat: '3,000 sq ft',
    imgUrl: 'https://media.istockphoto.com/id/2284853006/photo/a-collection-of-dumbbells-neatly-arranged-on-a-rack-inside-a-modern-fitness-gym-free-weight.jpg?s=612x612&w=0&k=20&c=pJMMEJHhXBLbf5WU9GLqxupokIFHR-Sm3LFA6Bw79CU=',
    alt: 'Free Weights Area'
  },
  {
    title: 'Strength Machines',
    description: 'Pin-selected & plate-loaded biomechanical isolation machines targeting every muscle group safely.',
    icon: Zap,
    stat: '50+ Rigs',
    imgUrl: 'https://media.istockphoto.com/id/1810395787/photo/professional-plate-loaded-machine-in-modern-gym.jpg?s=612x612&w=0&k=20&c=ikRwBNX5fEjlIteCcBFzpHmKb346K4Fu6zXCrFlTgL0=',
    alt: 'Strength Machines'
  },
  {
    title: 'Functional Training Turf',
    description: 'Astro-turf sled tracks, kettlebell matrix, battle ropes, plyo boxes & pull-up rigs for athletic conditioning.',
    icon: Flame,
    stat: '1,200 sq ft',
    imgUrl: 'https://media.istockphoto.com/id/2150309411/photo/a-green-field-with-a-white-line-that-says-start.jpg?s=612x612&w=0&k=20&c=-DN5MVBEtMPyWjU7b-FsQ9dImTrZnX_WkwKoXfDTIS4=',
    alt: 'Functional Training Turf'
  },
  {
    title: 'Locker Rooms & Showers',
    description: 'Spacious changing rooms, individual changing bays, hot rainfall showers & daily sanitized towel service.',
    icon: Droplets,
    stat: 'Sanitized Daily',
    imgUrl: 'https://media.istockphoto.com/id/583973120/photo/dressroom-in-fitness-center.jpg?s=612x612&w=0&k=20&c=X9G2-oGTs2W4yqbRAQn7pEUTd1HO-49beauB51-eFMw=',
    alt: 'Locker Rooms & Showers'
  },
  {
    title: 'Steam & Sauna Lounge',
    description: 'Therapeutic heat rooms designed for muscle recovery, detox, circulation boost & post-workout relaxation.',
    icon: Sparkles,
    stat: 'Detox Zone',
    imgUrl: 'https://media.istockphoto.com/id/2241221478/photo/sauna.jpg?s=612x612&w=0&k=20&c=hgxzZwPkE8w2SNzEwRHw5YypSRZy5RSnH3DMdwGlolU=',
    alt: 'Steam & Sauna Lounge'
  },
  {
    title: 'Pure Drinking Water',
    description: 'Chilled reverse-osmosis electrolyte drinking water stations & protein bar located across all floors.',
    icon: Utensils,
    stat: 'Hydration Station',
    imgUrl: 'https://media.istockphoto.com/id/1441225869/photo/reverse-osmosis-water-purification-system-under-sink-in-a-kitchen-water-cleaning-system.jpg?s=612x612&w=0&k=20&c=MQDyU_yDL15rSjr1nkTl9GmVchQ6mtfZRifWN0OVO4M=',
    alt: 'Pure Drinking Water'
  },
  {
    title: 'Parking Facility',
    description: 'Covered two-wheeler and four-wheeler parking with 24/7 security camera surveillance.',
    icon: Car,
    stat: 'Free Parking',
    imgUrl: 'https://media.istockphoto.com/id/2229983623/photo/underground-parking-lot-with-green-section-markings-parked-cars-bright-lighting-in-modern.jpg?s=612x612&w=0&k=20&c=upnacWW6hizA-qWn3GZnWiTvHcaRNKWI2YswJwx5NO0=',
    alt: 'Parking Facility'
  },
  {
    title: 'Personal Training Suite',
    description: 'Private assessment and coaching bays equipped for 1-on-1 personalized guidance and body composition scans.',
    icon: Users2,
    stat: '8 Certified Coaches',
    imgUrl: 'https://media.istockphoto.com/id/1392290139/photo/interior-of-physiotherapy-center.jpg?s=612x612&w=0&k=20&c=WFA3NWytT0r2lgWrU0zEWIWXDl3LTETd1b8BikicB2w=',
    alt: 'Personal Training Suite'
  }
];

export default function Facilities() {
  return (
    <section
      id="facilities"
      className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 bg-slate-950 text-slate-100 overflow-hidden border-t border-slate-800/60 scroll-mt-48"
    >
      {/* Background Decorative Lighting Orbs */}
      <div className="absolute top-24 -right-32 w-[28rem] h-[28rem] bg-orange-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 -left-24 w-[26rem] h-[26rem] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-2 sm:space-y-4">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <LayoutGrid className="w-4 h-4 text-orange-500" />
            Our World-Class Facilities
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Designed For Performance,{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Built For Results.
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Hover or drag across our interactive facility card fan below to explore everything our gym offers.
          </p>
        </div>

        {/* Card Fan Carousel */}
        <div className="w-full">
          <SocialCards cards={facilityCards} />
        </div>

        {/* Facility of the Month Spotlight Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-orange-950/40 to-slate-900 border border-orange-500/30 p-6 sm:p-8 shadow-2xl mt-2 sm:mt-4">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-orange-500/20 border border-orange-500/40 text-orange-400 shrink-0">
                <Trophy className="w-8 h-8" />
              </div>
              <div className="space-y-1 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-400">
                  <Sparkles className="w-3.5 h-3.5" /> Facility Of The Month
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Infrared Steam & Sauna Recovery Lounge
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                  Upgraded this month with full-spectrum infrared heating panels to reduce soreness 40% faster and boost post-workout recovery.
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <a
                href="#book-appointment"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs sm:text-sm hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg shadow-orange-500/25"
              >
                Book a Free Tour
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
