import React, { useState } from 'react';
import { MapPin, Phone, Clock, Send, CheckCircle2, Lock } from 'lucide-react';
import logoImg from '../assets/logo.png';
import { WhatsAppConfig } from '../utils/whatsapp';
import { InstagramIcon, FacebookIcon, YoutubeIcon } from './ui/social-icons';
import { ADMIN_HASH } from './admin/AdminPortal';
import { ShinySheenButton } from './ui/shiny-button-sheen';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about-us' },
  { label: 'Our Trainers', href: '#trainers' },
  { label: 'Class Schedule', href: '#class-schedule' },
  { label: 'Book a Session', href: '#book-appointment' },
];

const socials = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/zoyasayeedaahmed7',
    Icon: InstagramIcon,
    hover: 'hover:bg-gradient-to-br hover:from-fuchsia-600 hover:to-amber-500 hover:border-transparent',
  },
  // TODO: replace with the gym's real page URLs once available.
  { label: 'Facebook', href: '#', Icon: FacebookIcon, hover: 'hover:bg-[#1877F2] hover:border-transparent' },
  { label: 'YouTube', href: '#', Icon: YoutubeIcon, hover: 'hover:bg-[#FF0000] hover:border-transparent' },
];

// Kept in sync with the booking slots in BookingForm.jsx.
const hours = [
  { days: 'Mon - Sun', shift: 'Morning Shift', time: '6:00 AM - 1:00 PM' },
  { days: 'Mon - Sun', shift: 'Evening Shift', time: '5:00 PM - 10:00 PM' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const phoneDigits = WhatsAppConfig.ActiveNumber;
  const phoneDisplay = `+${phoneDigits.slice(0, 2)} ${phoneDigits.slice(2, 7)} ${phoneDigits.slice(7)}`;

  const goTo = (event, href) => {
    event.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="relative bg-slate-950 text-slate-300 border-t border-slate-800/60 overflow-hidden">
      {/* Ambient orange glow to echo the hero treatment */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* Brand + socials */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <img alt="Body Fit" className="h-11 w-auto" src={logoImg} />
              <span className="font-teko text-3xl leading-none tracking-wide text-white">
                BODY<span className="text-orange-500">FIT</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              South Delhi&apos;s trusted fitness centre since 2016. Elite equipment, certified
              coaches, and a community that shows up every single day.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ label, href, Icon, hover }) => (
                <a
                  aria-label={label}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 transition-all duration-300 hover:text-white active:scale-95 ${hover}`}
                  href={href}
                  key={label}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h3 className="font-teko text-xl uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    className="text-sm text-slate-400 transition-colors hover:text-orange-400"
                    href={link.href}
                    onClick={(event) => goTo(event, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit us */}
          <div className="lg:col-span-3">
            <h3 className="font-teko text-xl uppercase tracking-wider text-white">Visit Us</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                <a
                  className="text-slate-400 transition-colors hover:text-orange-400"
                  href="https://maps.google.com/?q=D-20,+Amrit+Nagar,+Block+D,+New+Delhi,+Delhi+110049"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  D-20, Amrit Nagar, Block D,
                  <br />
                  New Delhi, Delhi 110049
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                <a
                  className="text-slate-400 transition-colors hover:text-orange-400"
                  href={`tel:+${phoneDigits}`}
                >
                  {phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                <div className="space-y-1.5">
                  {hours.map((entry) => (
                    <div className="text-slate-400" key={entry.shift}>
                      <span className="font-semibold text-slate-300">{entry.days}</span>
                      <span className="mx-1.5 text-slate-600">/</span>
                      {entry.time}
                      <span className="block text-xs text-slate-500">{entry.shift}</span>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="font-teko text-xl uppercase tracking-wider text-white">
              Offers &amp; Updates
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-slate-400">
              Join the list for membership offers, new class drops, and transformation challenges.
            </p>

            <form className="mt-5" onSubmit={handleSubscribe}>
              <label className="sr-only" htmlFor="footer-email">
                Email address
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 p-1.5 transition-colors focus-within:border-orange-500/60">
                <input
                  className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                  id="footer-email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (subscribed) setSubscribed(false);
                  }}
                  placeholder="you@example.com"
                  required
                  type="email"
                  value={email}
                />
                <button
                  aria-label="Subscribe"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md transition-all hover:shadow-[0_0_20px_rgba(251,146,60,0.45)] active:scale-95"
                  type="submit"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>

            {subscribed && (
              <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                You&apos;re on the list. See you at the gym.
              </p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-slate-800/60 pt-7 text-xs text-slate-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Body Fit Fitness Centre. All rights reserved.</p>
          <p>
            Designed for <span className="font-semibold text-slate-400">Body Fit Fitness Centre</span>
          </p>
          <div className="flex flex-col items-center gap-1.5 sm:items-end">
            <ShinySheenButton
              as="a"
              className="rounded-lg border border-orange-500/25 px-5 py-2.5"
              href={ADMIN_HASH}
            >
              <span className="flex items-center gap-2 font-bold tracking-wider">
                <Lock className="h-3.5 w-3.5" />
                Admin
              </span>
            </ShinySheenButton>
            <span className="text-[11px] text-slate-600">Owner access only</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
