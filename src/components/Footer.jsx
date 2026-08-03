import React, { useState } from 'react';
import { 
  Dumbbell, MapPin, Phone, Clock, Mail, Send, 
  CheckCircle2, ChevronRight 
} from 'lucide-react';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About Us', href: '#about-us' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'Trainers', href: '#trainers' },
    { name: 'Class Schedule', href: '#class-schedule' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Book Trial', href: '#book-appointment' },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-300 relative overflow-hidden pt-16 pb-8">
      {/* Background Lighting Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Brand Info & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <a href="#hero" className="inline-flex items-center gap-2.5 group">
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-600/30">
                <Dumbbell className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white tracking-wider flex items-center gap-1">
                  BODY<span className="text-orange-500">FIT</span>
                </span>
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest -mt-1">
                  Fitness Centre
                </span>
              </div>
            </a>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Delhi’s premier health and transformation hub. Combining top-tier biomechanical equipment, certified personal coaches, and high-octane group fitness classes.
            </p>

            {/* Social Media Links with Instagram redirecting to zoyasayeedaahmed7 */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://instagram.com/zoyasayeedaahmed7"
                target="_blank"
                rel="noopener noreferrer"
                title="Follow Body Fit on Instagram (@zoyasayeedaahmed7)"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-orange-500/50 hover:bg-orange-500/10 text-slate-400 hover:text-orange-400 flex items-center justify-center transition-all duration-200"
              >
                <InstagramIcon />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Follow Body Fit on Facebook"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-orange-500/50 hover:bg-orange-500/10 text-slate-400 hover:text-orange-400 flex items-center justify-center transition-all duration-200"
              >
                <FacebookIcon />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Watch workouts on YouTube"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-orange-500/50 hover:bg-orange-500/10 text-slate-400 hover:text-orange-400 flex items-center justify-center transition-all duration-200"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white text-sm font-extrabold uppercase tracking-wider border-l-2 border-orange-500 pl-3">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.name === 'Home') {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="text-slate-400 hover:text-orange-400 flex items-center gap-1.5 transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-orange-500 opacity-60 group-hover:translate-x-1 transition-transform" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Location Info (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white text-sm font-extrabold uppercase tracking-wider border-l-2 border-orange-500 pl-3">
              Contact & Hours
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>D-20, Amrit Nagar, South Delhi, New Delhi - 110003</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <a href="tel:+919945505665" className="hover:text-white transition-colors">
                  +91 9945505665
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <div>Mon - Sat: 06:00 AM - 10:00 PM</div>
                  <div className="text-slate-500">Sunday: 07:00 AM - 01:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Offers & Newsletter Signup (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white text-sm font-extrabold uppercase tracking-wider border-l-2 border-orange-500 pl-3">
              Stay Updated
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Subscribe for exclusive trial offers, fitness tips & slot announcements.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-orange-600/20 transition-all"
              >
                <Send className="w-3.5 h-3.5" /> Subscribe
              </button>
            </form>

            {subscribed && (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold flex items-center gap-1.5 animate-fadeIn">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Subscribed successfully!
              </div>
            )}
          </div>

        </div>

        {/* Footer Bottom Copyright Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Body Fit Fitness Centre. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-400 font-medium">
            <span>Designed for</span>
            <span className="text-white font-bold">Body Fit Fitness Centre</span>
            <span className="text-slate-500">by Zoya GCE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
