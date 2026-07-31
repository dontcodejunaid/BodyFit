import React, { useState, useEffect } from 'react';
import { Clock, ShieldCheck, Dumbbell, Users, Award, ChevronRight, PhoneCall, Calendar } from 'lucide-react';
import heroBg from '../assets/hero-bg.png';

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const [nextStatusText, setNextStatusText] = useState('');

  useEffect(() => {
    const checkGymStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      
      // Gym hours: 6:00 AM - 1:00 PM (6 - 13) and 5:00 PM - 10:00 PM (17 - 22)
      const isMorningShift = hours >= 6 && hours < 13;
      const isEveningShift = hours >= 17 && hours < 22;

      if (isMorningShift || isEveningShift) {
        setIsOpen(true);
        setNextStatusText('Open Now (Closes at ' + (isMorningShift ? '1:00 PM' : '10:00 PM') + ')');
      } else {
        setIsOpen(false);
        if (hours < 6) {
          setNextStatusText('Opens Today at 6:00 AM');
        } else if (hours >= 13 && hours < 17) {
          setNextStatusText('Opens Today at 5:00 PM');
        } else {
          setNextStatusText('Opens Tomorrow at 6:00 AM');
        }
      }
    };

    checkGymStatus();
    const interval = setInterval(checkGymStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Years Active', value: '10+', icon: Award },
    { label: 'Members Trained', value: '2,500+', icon: Users },
    { label: 'Pro Trainers', value: '8+', icon: ShieldCheck },
    { label: 'Modern Machines', value: '50+', icon: Dumbbell },
  ];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-slate-950 pt-20">
      {/* Background Image with Dark Gradient & Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Body Fit Gym Floor" 
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 my-auto w-full">
        <div className="max-w-3xl space-y-6">
          
          {/* Live Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-800 backdrop-blur-md text-sm font-medium shadow-lg">
            <span className="relative flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isOpen ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            </span>
            <Clock className="w-4 h-4 text-slate-400" />
            <span className={isOpen ? 'text-emerald-400' : 'text-amber-400'}>
              {nextStatusText}
            </span>
          </div>

          {/* Main Title & Headline */}
          <div className="space-y-3">
            <span className="text-orange-500 font-semibold tracking-wider uppercase text-sm sm:text-base flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-orange-500 inline" />
              Body Fit Fitness Centre
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
              Transform Your Body, <br />
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Elevate Your Life.
              </span>
            </h1>
          </div>

          {/* Description Tagline */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Welcome to New Delhi's premier fitness destination. Experience world-class strength equipment, certified personal trainers, and tailored workout plans built to help you conquer your goals.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <a 
              href="#book-appointment" 
              className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-base shadow-lg shadow-orange-600/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-5 h-5" />
              Book a Free Trial
              <ChevronRight className="w-5 h-5" />
            </a>

            <a 
              href="#membership-plans" 
              className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-100 font-semibold text-base backdrop-blur-md transition-all duration-200 hover:border-slate-500"
            >
              View Membership Plans
            </a>
          </div>

          {/* Location Quick Contact */}
          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              Amrit Nagar, South Delhi
            </span>
            <a href="tel:+919212059586" className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
              <PhoneCall className="w-4 h-4 text-orange-500" />
              +91 92120 59586
            </a>
          </div>

        </div>
      </div>

      {/* Quick Stats Strip Footer */}
      <div className="relative z-10 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex items-center gap-4 group">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 transition-colors">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400 font-medium">
                      {stat.label}
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
