import React, { useState, useEffect } from 'react';
import { Tag, Sparkles, Clock, X, ArrowRight } from 'lucide-react';

export default function OffersBanner({ onClaimOffer }) {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div id="special-offers-banner" className="w-full bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 text-white text-xs py-2.5 px-4 sm:px-6 shadow-md z-40 border-b border-orange-400/30">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        
        {/* Left Offer Text & Badge */}
        <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap sm:flex-nowrap">
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-black uppercase text-[10px] tracking-wider shrink-0 shadow-sm">
            SPECIAL OFFER
          </span>
          <p className="font-extrabold text-white text-xs sm:text-sm tracking-tight">
            🎉 NEW YEAR TRANSFORM: <span className="underline decoration-white/70">20% OFF ALL ANNUAL PLANS</span> + FREE 1-ON-1 PT SESSION!
          </p>
        </div>

        {/* Right Section: Timer, Claim Button & Close */}
        <div className="flex items-center justify-center gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-1 font-mono text-[11px] bg-slate-950/50 px-3 py-1 rounded-lg border border-white/20 text-slate-100 shadow-inner">
            <Clock className="w-3.5 h-3.5 text-amber-300 mr-1" />
            <span>{String(timeLeft.days).padStart(2, '0')}d</span>:
            <span>{String(timeLeft.hours).padStart(2, '0')}h</span>:
            <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>:
            <span className="text-amber-300 font-bold">{String(timeLeft.seconds).padStart(2, '0')}s</span>
          </div>

          <button
            onClick={() => onClaimOffer && onClaimOffer('FIT2026', 20)}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs transition-all duration-200 flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 shrink-0"
          >
            <span>Claim 20% Off</span>
            <ArrowRight className="w-3.5 h-3.5 text-orange-600" />
          </button>

          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-colors shrink-0"
            title="Dismiss offer banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
