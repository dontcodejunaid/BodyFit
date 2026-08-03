import React, { useState, useEffect } from 'react';
import { 
  Clock, Dumbbell, ShieldCheck, Users, Award, ChevronRight, Zap, ArrowDown
} from 'lucide-react';
import dumbbellBg from '../assets/dumbbell-bg.png';
import Component from './ui/gradient-bars-background';

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const [nextStatusText, setNextStatusText] = useState('');

  useEffect(() => {
    const updateGymClock = () => {
      const now = new Date();
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

    return () => {
      clearInterval(interval);
    };
  }, []);

  const stats = [
    { label: 'Years Active', value: '10+', icon: Award },
    { label: 'Members Trained', value: '2,500+', icon: Users },
    { label: 'Certified Trainers', value: '8+', icon: ShieldCheck },
    { label: 'Modern Equipment', value: '50+', icon: Dumbbell },
  ];

  return (
    <div className="relative min-h-screen w-full bg-slate-950 overflow-hidden">
      
      {/* Background Dumbbell Image positioned in top dark area */}
      <div className="absolute top-0 left-0 right-0 h-[65vh] z-0 overflow-hidden pointer-events-none">
        <img 
          src={dumbbellBg} 
          alt="Gym Dumbbells Background" 
          className="w-full h-full object-cover object-center opacity-85 brightness-110 contrast-125 scale-105"
        />
        {/* Soft Vignette Overlay to merge with dark theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/40 to-slate-950" />
      </div>

      {/* Gradient Bars Theme Background Container */}
      <Component
        numBars={18}
        gradientFrom="rgba(255, 60, 0, 0.6)"
        gradientTo="transparent"
        animationDuration={2}
        backgroundColor="transparent"
      >
        <div className="relative z-10 w-full min-h-screen flex flex-col justify-between pt-16 sm:pt-20">
          
          {/* Hero Content Area */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 my-auto text-center space-y-8">
            
            {/* Live Real-time Status Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl">
              <span className="relative flex h-3.5 w-3.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isOpen ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              </span>
              <span className={`text-xs sm:text-sm font-black tracking-wider uppercase ${isOpen ? 'text-emerald-400' : 'text-amber-400'}`}>
                {nextStatusText}
              </span>
            </div>

            {/* Bold Headline & Short Tagline */}
            <div className="space-y-4 max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05] drop-shadow-md">
                Body Fit <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">Fitness Centre</span>
              </h1>
              <p className="text-slate-200 text-lg sm:text-2xl max-w-2xl mx-auto leading-relaxed font-medium drop-shadow">
                Transform your body, build unshakeable strength, and own your future with South Delhi's premier fitness hub.
              </p>
            </div>

            {/* Two Main CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a 
                href="#book-appointment" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-base shadow-xl shadow-orange-600/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                <Zap className="w-5 h-5 fill-white" />
                Book a Free Trial
                <ChevronRight className="w-5 h-5" />
              </a>

              <a 
                href="#about-us" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-200 font-extrabold text-base backdrop-blur-xl transition-all"
              >
                View Membership Plans
                <ArrowDown className="w-4 h-4 text-orange-400" />
              </a>
            </div>

          </div>

        </div>
      </Component>
    </div>
  );
}
