import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { RandomLetterSwap } from "./random-letter-swap";
import { WhatsAppIcon } from "./social-icons";
import { cn } from "../../lib/utils";
import { WhatsAppConfig } from "../../utils/whatsapp";
import logoImg from "../../assets/logo.png";

// #facilities, #gallery and #testimonials have no matching section yet —
// add them to App.jsx and these links start working with no change here.
const links = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about-us" },
  { label: "Facilities", href: "#facilities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#book-appointment" },
];

export default function RandomLetterSwapNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${WhatsAppConfig.ActiveNumber}&text=${encodeURIComponent(
    "Hi Body Fit! I'd like to know more about your memberships."
  )}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (event, href) => {
    event.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/70 shadow-lg shadow-black/30"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <a
          className="flex shrink-0 items-center gap-3"
          href="#home"
          onClick={(event) => goTo(event, "#home")}
        >
          <img alt="Body Fit" className="h-10 w-auto" src={logoImg} />
          <span className="font-teko text-2xl leading-none tracking-wide text-white">
            BODY<span className="text-orange-500">FIT</span>
          </span>
        </a>

        {/* Desktop links — six labels need the wider lg breakpoint to breathe */}
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <RandomLetterSwap
              as="a"
              className="cursor-pointer text-sm font-semibold uppercase tracking-wider text-slate-400 transition-colors hover:text-white"
              href={link.href}
              key={link.label}
              label={link.label}
              onClick={(event) => goTo(event, link.href)}
              staggerDuration={0.025}
              transition={{ duration: 0.6, type: "spring" }}
            />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            aria-label="Chat with us on WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 transition-all duration-300 hover:border-transparent hover:bg-[#25D366] hover:text-white active:scale-95"
            href={whatsappUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
          </a>

          <a
            className="hidden rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 px-5 py-2.5 text-sm font-black uppercase tracking-wider text-white shadow-md transition-all hover:shadow-[0_0_25px_rgba(251,146,60,0.45)] active:scale-95 sm:inline-flex"
            href="#book-appointment"
            onClick={(event) => goTo(event, "#book-appointment")}
          >
            Book Now
          </a>

          <button
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-slate-800/60 hover:text-white lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-slate-800/70 bg-slate-950/95 px-6 py-4 backdrop-blur-xl lg:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  className="block rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-wider text-slate-300 transition-colors hover:bg-slate-800/60 hover:text-white"
                  href={link.href}
                  onClick={(event) => goTo(event, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                className="mt-2 block rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 px-3 py-3 text-center text-sm font-black uppercase tracking-wider text-white sm:hidden"
                href="#book-appointment"
                onClick={(event) => goTo(event, "#book-appointment")}
              >
                Book Now
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
