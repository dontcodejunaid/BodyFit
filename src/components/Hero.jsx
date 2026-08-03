import React, { useState, useEffect } from 'react';
import { 
  Clock, ShieldCheck, Dumbbell, Users, Award, ChevronRight, PhoneCall, 
  Calendar, Sparkles, Flame, CheckCircle2, Zap, ArrowUpRight
} from 'lucide-react';
import heroBg from '../assets/hero-bg.png';

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const [nextStatusText, setNextStatusText] = useState('');
  const [currentTimeStr, setCurrentTimeStr] = useState('');

  useEffect(() => {
    const updateGymClock = () => {
      const now = new Date();
      
      // Format Live Time (e.g., 11:40:15 AM)
      setCurrentTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

      const hours = now.getHours();
      const isMorningShift = hours >= 6 && hours < 13;
      const isEveningShift = hours >= 17 && hours < 22;

      if (isMorningShift || isEveningShift) {
        setIsOpen(true);
        setNextStatusText('OPEN NOW (Closes ' + (isMorningShift ? '1:00 PM' : '10:00 PM') + ')');
      } else {
        setIsOpen(false);
        if (hours < 6) {
          setNextStatusText('OPENS TODAY AT 6:00 AM');
        } else if (hours >= 13 && hours < 17) {
          setNextStatusText('OPENS TODAY AT 5:00 PM');
        } else {
          setNextStatusText('OPENS TOMORROW AT 6:00 AM');
        }
      }
    };

    updateGymClock();
    const interval = setInterval(updateGymClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Years of Excellence', value: '10+', desc: 'Serving South Delhi', icon: Award, accent: 'from-orange-500 to-amber-500' },
    { label: 'Active Members', value: '2,500+', desc: 'Transforming Lives', icon: Users, accent: 'from-amber-500 to-yellow-500' },
    { label: 'Certified Coaches', value: '8+', desc: 'Personalized Care', icon: ShieldCheck, accent: 'from-orange-500 to-red-500' },
    { label: 'Modern Machines', value: '50+', desc: 'Imported Equipment', icon: Dumbbell, accent: 'from-red-500 to-orange-500' },
  ];

  const highlights = [
    'No Admission Fee This Month',
    'Free Body Composition Analysis',
    'Custom Diet & Workout Blueprint'
  ];

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-between overflow-hidden bg-slate-950 pt-16 sm:pt-20">
      
      {/* Dynamic Background Glow Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-0 w-[30rem] h-[30rem] bg-amber-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Body Fit Gym Floor" 
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 my-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Live Clock & Status Badge Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-xl">
                <span className="relative flex h-3 w-3">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isOpen ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                </span>
                <span className={`text-xs font-extrabold tracking-wider ${isOpen ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {nextStatusText}
                </span>
              </div>

              {/* Real-Time Live Clock Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/80 border border-slate-800/80 backdrop-blur-md text-xs font-mono text-slate-300">
                <Clock className="w-3.5 h-3.5 text-orange-400" />
                <span>{currentTimeStr || '11:40 AM'} IST</span>
              </div>
            </div>

            {/* Main Headline & Badge Tag */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <Flame className="w-4 h-4 text-orange-500" />
                South Delhi's Premier Fitness Hub
              </div>
              
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08]">
                Build Power. <br />
                Sculpt Strength. <br />
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent drop-shadow-sm">
                  Own Your Future.
                </span>
              </h1>
            </div>

            {/* Description Paragraph */}
            <p className="text-slate-300 text-base sm:text-xl max-w-2xl leading-relaxed font-normal">
              Step into <strong className="text-white font-semibold">Body Fit Fitness Centre</strong>. Experience world-class strength machines, personalized 1-on-1 coaching, and an empowering community designed for real transformation.
            </p>

            {/* Offer Highlights Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-slate-900/50 px-3 py-2 rounded-lg border border-slate-800/60">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              <a 
                href="#book-appointment" 
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-extrabold text-base shadow-xl shadow-orange-600/30 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
              >
                <Zap className="w-5 h-5 fill-white text-white" />
                Book Free Trial Session
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a 
                href="#about-us" 
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-200 font-semibold text-base backdrop-blur-xl transition-all duration-200"
              >
                Explore Facilities
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Direct Phone & Address Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-400 border-t border-slate-800/80">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                D-20, Amrit Nagar, Block D, New Delhi
              </span>
              <a href="tel:+919212059586" className="flex items-center gap-2 hover:text-orange-400 transition-colors font-medium text-slate-300">
                <PhoneCall className="w-3.5 h-3.5 text-orange-500" />
                +91 92120 59586
              </a>
            </div>

          </div>

          {/* Right Column: Visual Interactive Glass Card */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative group rounded-3xl p-1 bg-gradient-to-b from-orange-500/30 via-slate-800/50 to-slate-900 shadow-2xl backdrop-blur-2xl">
              <div className="bg-slate-950/90 rounded-[22px] p-6 space-y-6">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Member Highlights</span>
                  </div>
                  <span className="text-[11px] bg-amber-400/10 border border-amber-400/20 text-amber-400 font-bold px-2.5 py-1 rounded-full">
                    ★ 4.9 Rating
                  </span>
                </div>

                {/* Main Feature Highlight */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 space-y-3">
                  <div className="text-xs text-orange-400 font-bold uppercase">Featured Package</div>
                  <div className="text-lg font-bold text-white">Full Body Transformation</div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Includes personal trainer guidance, customized meal plans, progress tracking & unlimited gym access.
                  </p>
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-xs text-slate-400">Gym Timing</div>
                    <div className="text-xs font-bold text-white mt-1">6 AM - 1 PM</div>
                    <div className="text-xs font-bold text-white">5 PM - 10 PM</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-xs text-slate-400">WhatsApp Alert</div>
                    <div className="text-xs font-bold text-emerald-400 mt-1">Instant Confirmation</div>
                    <div className="text-[10px] text-slate-500">Zero Wait Time</div>
                  </div>
                </div>

                {/* CTA Mini Button */}
                <a 
                  href="#book-appointment" 
                  className="w-full py-3 bg-slate-900 hover:bg-orange-600 hover:text-white border border-slate-800 hover:border-orange-500 rounded-xl font-bold text-xs text-center text-slate-200 transition-all flex items-center justify-center gap-2"
                >
                  Book Free Session Now <ChevronRight className="w-4 h-4" />
                </a>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Glassmorphic Quick Stats Strip Footer */}
      <div className="relative z-10 border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-2xl py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={idx} 
                  className="flex items-center gap-4 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-orange-500/40 hover:bg-slate-900/80 transition-all duration-300 group"
                >
                  <div className={`p-3.5 rounded-xl bg-gradient-to-br ${stat.accent} text-white shadow-md shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold text-slate-300">
                      {stat.label}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {stat.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </section>
  );
}
