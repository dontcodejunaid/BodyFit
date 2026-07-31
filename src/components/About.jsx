import React from 'react';
import { Target, HeartPulse, Trophy, CheckCircle2, Users, ShieldCheck, Star } from 'lucide-react';
import ownerImg from '../assets/owner.png';

export default function About() {
  const highlights = [
    {
      title: 'Professional Certified Trainers',
      description: 'Our certified fitness coaches customize workout and nutrition plans according to your unique body composition and goals.',
      icon: ShieldCheck,
    },
    {
      title: 'State-of-the-Art Equipment',
      description: 'Imported strength machines, dedicated free weight zone, cardio arena, and functional CrossFit turf setup.',
      icon: Target,
    },
    {
      title: 'Supportive & Motivating Community',
      description: 'A friendly, zero-judgment atmosphere where beginners and advanced athletes train together and celebrate progress.',
      icon: HeartPulse,
    },
  ];

  const badges = [
    'IFBB Certified Coaches',
    'REPs India Affiliated',
    'Top Rated Gym in South Delhi',
    '100% Clean & Sanitized Facility',
  ];

  return (
    <section id="about-us" className="py-20 bg-slate-900 border-t border-b border-slate-800 text-slate-100 relative overflow-hidden">
      {/* Background Decorative Accent glow */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-orange-500 font-semibold uppercase tracking-wider text-sm flex items-center justify-center gap-2">
            <Trophy className="w-4 h-4 text-orange-500 inline" />
            About Body Fit Fitness Centre
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            More Than Just A Gym. <br />
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              Your Fitness Sanctuary.
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Founded with a passion to deliver genuine fitness transformations, Body Fit Fitness Centre is committed to helping every individual build physical strength, mental resilience, and sustainable healthy habits.
          </p>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: Owner & Gym Philosophy Card */}
          <div className="lg:col-span-5">
            <div className="relative group rounded-3xl p-1 bg-gradient-to-b from-orange-500/40 via-slate-800 to-slate-800 shadow-2xl">
              <div className="bg-slate-950 rounded-[22px] p-6 sm:p-8 space-y-6">
                
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] border border-slate-800">
                  <img 
                    src={ownerImg} 
                    alt="Body Fit Gym Founder & Lead Coach" 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700 flex items-center gap-1.5 text-xs text-amber-400 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    4.9 / 5 Rated Gym
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-xs uppercase tracking-wider font-semibold text-orange-400">Founder & Head Coach</div>
                  <h3 className="text-xl font-bold text-white">Message From Management</h3>
                  <blockquote className="text-slate-300 text-sm leading-relaxed italic border-l-2 border-orange-500 pl-4">
                    "Fitness isn't about being better than someone else. It's about being better than you were yesterday. At Body Fit, we give you the guidance, environment, and accountability to exceed your own expectations."
                  </blockquote>
                </div>

                {/* Gym Location Details */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>D-20, Amrit Nagar, Block D, New Delhi</span>
                  <span className="text-emerald-400 font-medium">Est. 2016</span>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: 3 Core Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              Why Members Choose <span className="text-orange-500">Body Fit</span>
            </h3>

            <div className="grid gap-6">
              {highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={idx} 
                    className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-orange-500/40 transition-all duration-300 flex items-start gap-5 hover:bg-slate-950/90"
                  >
                    <div className="p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-lg font-bold text-white">{item.title}</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Certifications & Badges Banner */}
        <div className="rounded-2xl bg-slate-950 p-6 border border-slate-800">
          <div className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
            Certifications & Gym Standards
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {badges.map((badge, idx) => (
              <div 
                key={idx}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-xs sm:text-sm font-medium text-slate-200"
              >
                <CheckCircle2 className="w-4 h-4 text-orange-500" />
                {badge}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
