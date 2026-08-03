import React, { useState } from 'react';
import { 
  Target, HeartPulse, Trophy, CheckCircle2, ShieldCheck, Star, 
  Sparkles, Award, Dumbbell, Activity, Users2
} from 'lucide-react';
import ownerImg from '../assets/owner.png';

export default function About() {
  const [activeTab, setActiveTab] = useState('philosophy');

  const tabContents = {
    philosophy: {
      title: 'Our Fitness Philosophy',
      quote: 'Fitness is not a 30-day challenge; it is a lifetime habit. We focus on form, longevity, and building functional strength that improves your daily life.',
      bullets: [
        'Scientific progressive overload training methodology',
        'Balanced focus on strength, mobility, and cardiovascular health',
        'Zero-ego, positive environment tailored for all fitness levels'
      ]
    },
    equipment: {
      title: 'World-Class Facility & Gear',
      quote: 'We invest in commercial-grade biomechanically engineered machinery to ensure smooth resistance curves and maximum joint safety.',
      bullets: [
        'Bio-mechanically correct plate-loaded & pin-selected machines',
        'Dedicated Olympic lifting turf & CrossFit functional rig',
        'Imported rubberized dumbbells ranging from 2.5kg to 50kg'
      ]
    },
    coaching: {
      title: 'Personalized Coaching Standards',
      quote: 'Our trainers are REPs certified professionals who continuous educate themselves in sports nutrition, rehab, and biomechanics.',
      bullets: [
        '1-on-1 dedicated fitness & form assessment',
        'Customized weekly macro & calorie recommendations',
        'Weekly accountability check-ins to ensure continuous progress'
      ]
    }
  };

  const highlights = [
    {
      title: 'Certified Master Coaches',
      description: 'Experienced trainers providing individual attention, customized workout regimens, and injury-prevention guidance.',
      icon: ShieldCheck,
      color: 'from-orange-500 to-amber-500'
    },
    {
      title: 'State-of-the-Art Equipment',
      description: 'Dedicated zones for cardio blast, heavy strength training, functional CrossFit, and calming yoga sessions.',
      icon: Target,
      color: 'from-amber-500 to-red-500'
    },
    {
      title: 'Supportive & Motivating Vibe',
      description: 'Join a tight-knit community of fitness enthusiasts where every milestone, big or small, is celebrated together.',
      icon: HeartPulse,
      color: 'from-red-500 to-orange-500'
    },
  ];

  const badges = [
    { text: 'REPs India Certified', icon: Award },
    { text: 'IFBB Professional Coaches', icon: ShieldCheck },
    { text: 'Top 5 Rated Gym in Delhi', icon: Star },
    { text: '100% Sanitized & Clean', icon: Sparkles },
  ];

  const gymMetrics = [
    { value: '15,000+', label: 'Kg Weight Lost' },
    { value: '98%', label: 'Member Retention' },
    { value: '4.9 ★', label: 'Google Rating' },
    { value: '100%', label: 'Goal Satisfaction' }
  ];

  return (
    <section id="about-us" className="py-24 bg-slate-900 border-t border-b border-slate-800/80 text-slate-100 relative overflow-hidden">
      
      {/* Background Decorative Lighting Orbs */}
      <div className="absolute top-1/3 -left-32 w-[28rem] h-[28rem] bg-orange-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-[30rem] h-[30rem] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-orange-500" />
            Discover Body Fit Fitness Centre
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Engineered For Results. <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Built For Your Transformation.
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Established in 2016 in South Delhi, Body Fit combines elite equipment, certified expert guidance, and an inspiring environment to help you hit your peak fitness.
          </p>
        </div>

        {/* Interactive Tabbed Spotlight & Owner Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Owner Profile & Interactive Tabs Card */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            
            {/* Interactive Tab Headers */}
            <div className="p-1.5 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-3 gap-1">
              {[
                { id: 'philosophy', label: 'Philosophy', icon: HeartPulse },
                { id: 'equipment', label: 'Equipment', icon: Dumbbell },
                { id: 'coaching', label: 'Coaching', icon: ShieldCheck },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
                      isActive 
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg shadow-orange-600/20' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Tab Content Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-5 flex-1 flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <div className="text-xs font-extrabold uppercase tracking-wider text-orange-400">
                  {tabContents[activeTab].title}
                </div>
                <blockquote className="text-slate-200 text-sm sm:text-base leading-relaxed italic border-l-2 border-orange-500 pl-4 py-1">
                  "{tabContents[activeTab].quote}"
                </blockquote>
                <ul className="space-y-2.5 pt-2">
                  {tabContents[activeTab].bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gym Location Badge Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-orange-500" />
                  D-20, Amrit Nagar, New Delhi
                </span>
                <span className="text-amber-400 font-semibold bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full">
                  10+ Yrs Legacy
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Owner Card with Glass Overlay */}
          <div className="lg:col-span-6">
            <div className="relative group rounded-3xl p-1 bg-gradient-to-b from-orange-500/40 via-slate-800 to-slate-950 shadow-2xl h-full flex flex-col">
              <div className="bg-slate-950 rounded-[22px] p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                
                {/* Image Container with Badges */}
                <div className="relative overflow-hidden rounded-2xl aspect-[16/10] border border-slate-800">
                  <img 
                    src={ownerImg} 
                    alt="Body Fit Gym Founder & Lead Coach" 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-bold">
                    <div className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700">
                      <Users2 className="w-3.5 h-3.5 text-orange-400" />
                      Head Coach & Founder
                    </div>
                    <div className="flex items-center gap-1 bg-amber-500/20 backdrop-blur-md border border-amber-500/30 text-amber-400 px-3 py-1.5 rounded-full">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      4.9 / 5 Rating
                    </div>
                  </div>
                </div>

                {/* Owner Statement */}
                <div className="space-y-3">
                  <div className="text-xs uppercase tracking-wider font-extrabold text-orange-400">Founder's Commitment</div>
                  <h3 className="text-xl font-bold text-white">"We Measure Success By Your Results"</h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    At Body Fit, we don't just sell gym memberships — we coach individuals. Every member gets direct guidance to ensure correct form, safety, and sustainable long-term strength development.
                  </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-800">
                  {gymMetrics.map((m, idx) => (
                    <div key={idx} className="text-center p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
                      <div className="text-xs sm:text-sm font-black text-amber-400">{m.value}</div>
                      <div className="text-[10px] text-slate-400 font-medium">{m.label}</div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* 3 Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="p-7 rounded-3xl bg-slate-950/80 border border-slate-800/90 hover:border-orange-500/50 hover:bg-slate-950 transition-all duration-300 space-y-4 group shadow-xl"
              >
                <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.color} text-white w-fit shadow-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-extrabold text-white group-hover:text-orange-400 transition-colors">{item.title}</h4>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Certifications & Quality Badges Ribbon */}
        <div className="rounded-3xl bg-slate-950 p-6 border border-slate-800/80 shadow-2xl">
          <div className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Recognized Gym Standards & Certifications
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {badges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div 
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800/80 text-xs sm:text-sm font-semibold text-slate-200 hover:border-orange-500/40 transition-colors"
                >
                  <Icon className="w-4 h-4 text-orange-500" />
                  {badge.text}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
