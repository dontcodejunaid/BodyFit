import React, { useState } from 'react';
import { 
  HeartPulse, Dumbbell, Zap, Activity, Lock, 
  Flame, Droplets, Car, Sparkles, Trophy, CheckCircle2, ShieldCheck 
} from 'lucide-react';

export default function Facilities() {
  const [hoveredFacility, setHoveredFacility] = useState(null);

  const facilitiesList = [
    {
      id: 'cardio',
      title: 'Biomechanical Cardio Zone',
      category: 'Endurance & Fat Loss',
      desc: 'Commercial treadmills, ellipticals, stairmasters, and assault bikes with real-time heart rate and calorie tracking.',
      icon: HeartPulse,
      badge: 'High Performance',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'weights',
      title: 'Heavy Free Weights Arena',
      category: 'Strength & Hypertrophy',
      desc: 'Dumbbells ranging from 2.5kg to 50kg, competition powerlifting benches, squat racks, and bumper plates.',
      icon: Dumbbell,
      badge: 'Pro Grade',
      image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'machines',
      title: 'Pin-Selected Strength Machines',
      category: 'Targeted Isolation',
      desc: 'Bio-mechanically engineered resistance equipment designed for joint safety and optimal muscle contraction curves.',
      icon: Activity,
      badge: 'Joint Safe',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'functional',
      title: 'Functional & Turf Arena',
      category: 'Agility & CrossFit',
      desc: 'Sled turf track, battle ropes, kettlebells, plyo boxes, and wall ball targets for athletic conditioning.',
      icon: Zap,
      badge: 'CrossFit Ready',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'lockers',
      title: 'Luxury Lockers & Showers',
      category: 'Hygiene & Comfort',
      desc: 'Digital touch-lock security lockers, private hot water shower cubicles, hairdryers, and changing lounges.',
      icon: Lock,
      badge: '100% Sanitized',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'steam',
      title: 'Steam & Sauna Recovery Suite',
      category: 'Muscle Detox & Recovery',
      desc: 'Therapeutic eucalyptus steam bath and Finnish wooden sauna for rapid lactic acid flush and muscle relaxation.',
      icon: Flame,
      badge: 'Recovery Hub',
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'water',
      title: 'Purified Hydration Stations',
      category: 'Pure Hydration',
      desc: 'Multi-stage RO + UV alkaline purified chilled drinking water dispensers located conveniently across all workout floors.',
      icon: Droplets,
      badge: 'Unlimited Pure Water',
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4e?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'parking',
      title: 'Dedicated Member Parking',
      category: 'Convenience',
      desc: 'Spacious secure parking bay for two-wheelers and four-wheelers with 24/7 CCTV surveillance.',
      icon: Car,
      badge: 'Free Parking',
      image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section id="facilities" className="py-24 bg-slate-950 border-t border-slate-800 text-slate-100 relative overflow-hidden">
      {/* Background Lighting Orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-orange-500" />
            World-Class Infrastructure
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Designed For Peak <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Performance & Luxury Recovery
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            From imported biomechanical machinery to luxury recovery suites, discover everything Body Fit offers for your transformation journey.
          </p>
        </div>

        {/* "Facility of the Month" Spotlight Banner */}
        <div className="relative group rounded-3xl p-1 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 shadow-2xl overflow-hidden">
          <div className="bg-slate-900/95 rounded-[22px] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-black uppercase tracking-widest">
                <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                Facility of the Month Spotlight
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                High-Tech Biomechanical Cardio Zone & Steam Recovery Suite
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Featured this month: Our newly upgraded cardio deck featuring touch-screen entertainment console treadmills, assault air bikes, and our therapeutic eucalyptus steam room for faster recovery.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'Real-time heart rate telemetry integration',
                  'Post-workout eucalyptus steam bath',
                  'Dedicated functional sled turf track',
                  '24/7 HVAC air purification & climate control'
                ].map((perk, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <a
                  href="#book-appointment"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-orange-600/30 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Explore Facility With Free Pass</span>
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800" 
                alt="Facility of the month spotlight"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white font-bold">
                <span className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700">
                  Amrit Nagar Center
                </span>
                <span className="text-amber-400 bg-amber-500/20 backdrop-blur-md border border-amber-500/30 px-3 py-1.5 rounded-full">
                  ★ Top Rated Gym
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Facilities Grid (4x2 Responsive Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilitiesList.map((item) => {
            const Icon = item.icon;
            const isHovered = hoveredFacility === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredFacility(item.id)}
                onMouseLeave={() => setHoveredFacility(null)}
                className="group relative rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-orange-500/50 backdrop-blur-md overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-orange-500/10 min-h-[300px]"
              >
                {/* Optional Photo Reveal On Hover / Background Layer */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-out z-0"
                  style={{ 
                    backgroundImage: `url(${item.image})`,
                    opacity: isHovered ? 0.35 : 0.08
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10" />

                {/* Card Content Layer */}
                <div className="relative z-20 p-6 flex-1 flex flex-col justify-between space-y-4">
                  
                  {/* Top Bar: Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-950/80 border border-slate-800 text-amber-400">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[10px] text-orange-400 uppercase font-extrabold tracking-wider">
                      {item.category}
                    </div>
                    <h4 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Indicator */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-orange-500" /> Included in Pass
                    </span>
                    <span className="text-orange-400 group-hover:translate-x-1 transition-transform">
                      Explore →
                    </span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
