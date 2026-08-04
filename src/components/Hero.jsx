import React, { useState, useEffect } from 'react';
import {
  Clock, Dumbbell, ShieldCheck, Users, Award, ChevronRight, Zap, ArrowDown
} from 'lucide-react';
import dumbbellBg from '../assets/dumbbell-bg.png';
import Component from './ui/gradient-bars-background';
import { LayeredText } from './ui/layered-text';
import { ShinyButton } from './ui/shiny-button';
import { scrollToSection } from '../lib/scrollToSection';

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
    { label: 'Years Active', value: '5', icon: Award },
    { label: 'Members Trained', value: '1,200+', icon: Users },
    { label: 'Certified Trainers', value: '8', icon: ShieldCheck },
    { label: 'Pieces of Equipment', value: '50+', icon: Dumbbell },
  ];

  return (
    <div id="home" className="relative min-h-screen w-full bg-slate-950 overflow-hidden">

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
        <div className="relative z-10 w-full min-h-screen flex flex-col justify-between pt-16 sm:pt-20 pb-10">

          {/* Hero Content Area */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 my-auto text-center space-y-8">

            {/* Live Real-time Status Badge - Compact Positioned Fixed at Bottom Left Corner */}
            <div className="fixed bottom-4 left-4 z-50 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/90 border border-slate-800/90 backdrop-blur-2xl shadow-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isOpen ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              </span>
              <span className={`text-[10px] sm:text-xs font-bold tracking-wider uppercase ${isOpen ? 'text-emerald-400' : 'text-amber-400'}`}>
                {nextStatusText}
              </span>
            </div>

            {/* Bold Layered Interactive Animated Headline */}
            <div className="space-y-2 max-w-4xl mx-auto">
              <LayeredText
                lines={[
                  { top: "\u00A0", bottom: "BODY FIT" },
                  { top: "BODY FIT", bottom: "FITNESS" },
                  { top: "FITNESS", bottom: "CENTRE" },
                  { top: "CENTRE", bottom: "\u00A0" },
                ]}
                fontSize="64px"
                fontSizeMd="32px"
                lineHeight={75}
                lineHeightMd={45}
              />
              <p className="text-slate-200 text-lg sm:text-2xl max-w-2xl mx-auto leading-relaxed font-black uppercase tracking-widest drop-shadow pt-2">
                "YOUR AVERAGE ENDS HERE"
              </p>
            </div>

            {/* Two Main CTA Buttons with ShinyButton */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a href="#book-appointment" className="w-full sm:w-auto">
                <ShinyButton className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-xl shadow-orange-600/30">
                  <Zap className="w-5 h-5 fill-white text-white shrink-0" />
                  <span>Book a Free Trial</span>
                  <ChevronRight className="w-5 h-5 shrink-0" />
                </ShinyButton>
              </a>

              <a
                href="#membership"
                className="w-full sm:w-auto"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('membership', 80);
                }}
              >
                <ShinyButton className="w-full sm:w-auto bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200">
                  <span>View Membership Plans</span>
                  <ArrowDown className="w-4 h-4 text-orange-400 shrink-0" />
                </ShinyButton>
              </a>
            </div>

            {/* Stats Banner Grid (Restored) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto pt-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl flex items-center gap-3.5 shadow-xl hover:border-orange-500/30 transition-all"
                  >
                    <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-xl sm:text-2xl font-black text-white leading-tight">{stat.value}</div>
                      <div className="text-xs font-bold text-slate-300 leading-tight">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </Component>
    </div>
  );
}
