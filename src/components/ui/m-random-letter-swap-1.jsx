"use client";

import React from "react";
import { RandomLetterSwap } from "@/components/ui/random-letter-swap";
import { Dumbbell, Sparkles } from "lucide-react";

const links = ["Home", "About Us", "Facilities", "Gallery", "Contact"];

const navTargetMap = {
  Home: "#hero",
  "About Us": "#about-us",
  Facilities: "#facilities",
  Gallery: "#gallery",
  Contact: "#book-appointment",
};

export default function RandomLetterSwapNav() {
  const handleNavClick = (link) => {
    const target = navTargetMap[link] || "#hero";
    const el = document.querySelector(target) || document.querySelector("#about-us") || document.querySelector("#book-appointment");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-600/30 group-hover:scale-105 transition-transform">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-white tracking-wider flex items-center gap-1">
              BODY<span className="text-orange-500">FIT</span>
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest -mt-1">
              Fitness Centre
            </span>
          </div>
        </a>

        {/* Animated Navigation Links */}
        <nav className="flex items-center gap-6 sm:gap-8 bg-slate-900/60 border border-slate-800/80 rounded-full px-5 py-2 backdrop-blur-md">
          {links.map((link) => (
            <div key={link} onClick={() => handleNavClick(link)}>
              <RandomLetterSwap
                className="cursor-pointer font-medium text-slate-300 text-xs sm:text-sm hover:text-white transition-colors"
                label={link}
                staggerDuration={0.025}
                transition={{ duration: 0.6, type: "spring" }}
              />
            </div>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="#book-appointment"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-orange-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Book Now</span>
          </a>
        </div>

      </div>
    </header>
  );
}
