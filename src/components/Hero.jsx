import React, { useState, useEffect } from 'react';
import {
  Clock, Dumbbell, ShieldCheck, Users, Award, ChevronRight, Zap, ArrowDown
} from 'lucide-react';
import dumbbellBg from '../assets/dumbbell-bg.png';
import { getOpenStatus } from '../utils/gymHours';
import Component from './ui/gradient-bars-background';
import { LayeredText } from './ui/layered-text';
import { ShinyButton } from './ui/shiny-button';
import { scrollToSection } from '../lib/scrollToSection';

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const [nextStatusText, setNextStatusText] = useState('');

  useEffect(() => {
    const updateGymClock = () => {
      // Hours come from utils/gymHours.js so the badge, the FAQ bot and this
      // clock can never disagree. Evaluated against the visitor's local time.
      const status = getOpenStatus();
      setIsOpen(status.isOpen);
      setNextStatusText(
        status.isOpen
          ? `OPEN NOW (${status.detail})`.toUpperCase()
          : status.detail.toUpperCase()
      );
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
        <div className="relative z-10 w-full min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-88px)] flex flex-col justify-between pt-14 sm:pt-20 pb-6 overflow-hidden">

          {/* Live Real-time Status Badge - True Bottom Left Corner of Hero */}
          <div className="absolute bottom-3 left-4 sm:left-6 z-20 hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/90 border border-slate-800/90 backdrop-blur-2xl shadow-xl">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isOpen ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
            </span>
            <span className={`text-[10px] font-bold tracking-wider uppercase ${isOpen ? 'text-emerald-400' : 'text-amber-400'}`}>
              {nextStatusText}
            </span>
          </div>

          {/* Hero Content Area */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto text-center space-y-4 sm:space-y-5">

            {/* Bold Layered Interactive Animated Headline */}
            <div className="space-y-1 sm:space-y-2 max-w-4xl mx-auto">
              <LayeredText
                lines={[
                  { top: "\u00A0", bottom: "BODY FIT" },
                  { top: "BODY FIT", bottom: "FITNESS" },
                  { top: "FITNESS", bottom: "CENTRE" },
                  { top: "CENTRE", bottom: "\u00A0" },
                ]}
                fontSize="48px"
                fontSizeMd="28px"
                lineHeight={56}
                lineHeightMd={38}
              />
              <p className="text-slate-200 text-sm sm:text-lg max-w-xl mx-auto leading-normal font-black uppercase tracking-widest drop-shadow pt-1">
                "YOUR AVERAGE ENDS HERE"
              </p>
            </div>

            {/* Two Main CTA Buttons with ShinyButton - Perfectly centered between Tagline & Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4 sm:py-6">
              <a href="#book-appointment" className="w-full sm:w-auto">
                <ShinyButton className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-xl shadow-orange-600/30 text-xs sm:text-sm py-3 px-6">
                  <Zap className="w-4 h-4 fill-white text-white shrink-0" />
                  <span>Book a Free Trial</span>
                  <ChevronRight className="w-4 h-4 shrink-0" />
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
                <ShinyButton className="w-full sm:w-auto bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-xs sm:text-sm py-3 px-6">
                  <span>View Membership Plans</span>
                  <ArrowDown className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                </ShinyButton>
              </a>
            </div>

            {/* Stats Banner Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 max-w-4xl mx-auto pt-2 sm:pt-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <ShinyButton
                    key={index}
                    className="p-2.5 sm:p-3 rounded-xl bg-slate-900/85 border border-slate-800/80 backdrop-blur-xl flex items-center gap-2.5 shadow-lg hover:border-orange-500/40 transition-all font-normal text-left justify-start"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-left min-w-0">
                      <div className="text-base sm:text-xl font-black text-white leading-none">{stat.value}</div>
                      <div className="text-[10px] sm:text-xs font-bold text-slate-300 leading-tight mt-0.5 truncate">{stat.label}</div>
                    </div>
                  </ShinyButton>
                );
              })}
            </div>

          </div>

        </div>
      </Component>
    </div>
  );
}
