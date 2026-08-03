import React, { useState, useEffect, useRef } from 'react';
import { RandomLetterSwap } from '@/components/ui/random-letter-swap';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { scrollToSection } from '../lib/scrollToSection';
import './Navbar.css';
import logoImg from '../assets/logo.png';

// `id` must match the id on the corresponding <section> in App.jsx.
const primaryLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About Us', id: 'about-us' },
  { label: 'Facilities', id: 'facilities' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Contact', id: 'book-appointment' },
];

// Rendered on a second row underneath the primary links.
const secondaryLinks = [
  { label: 'Membership Plans', id: 'membership' },
  { label: 'Testimonials', id: 'testimonials' },
];

const allLinks = [...primaryLinks, ...secondaryLinks];

// Module scope keeps the reference stable across renders — useScrollSpy
// re-binds its scroll listener whenever this array changes identity.
const navSectionIds = allLinks.map((link) => link.id);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const headerRef = useRef(null);

  const activeId = useScrollSpy(navSectionIds, headerRef);

  // Handle scroll detection for transparent-to-solid background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Deep links (bodyfit.com/#facilities) land before the header has its final
  // height, so the browser's own jump lands too high. Re-run it once mounted.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    const timer = setTimeout(() => {
      scrollToSection(id, headerRef.current?.getBoundingClientRect().height ?? 0);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileOpen((open) => !open);
  };

  const handleNavClick = (event, id) => {
    // Let ctrl/cmd-click open in a new tab as usual.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const offset = headerRef.current?.getBoundingClientRect().height ?? 0;

    // If the section is missing, leave the default hash jump alone rather than
    // swallowing the click and going nowhere.
    if (!scrollToSection(id, offset)) return;

    event.preventDefault();
    setIsMobileOpen(false);

    // Keep the URL shareable, but replaceState avoids a second, unoffset jump.
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <header ref={headerRef} className={`header-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      {/* Top Contact Bar */}
      <div className="top-bar">
        <div className="top-bar-container">
          <a href="tel:+1234567890" className="top-link">
            📞 <span>+1 (234) 567-890</span>
          </a>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="top-link whatsapp-link"
          >
            💬 <span>WhatsApp Chat</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar">
        {/* Custom Logo Image + Gym Name */}
        <a
          href="#home"
          className="navbar-logo"
          onClick={(e) => handleNavClick(e, 'home')}
        >
          <img src={logoImg} alt="BodyFit Logo" className="logo-img" />
          <span className="brand-name">BodyFit</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="nav-links-stack desktop-only">
          <ul className="nav-links">
            {primaryLinks.map(({ label, id }) => (
              <li key={label}>
                <a
                  href={`#${id}`}
                  className={activeId === id ? 'active' : ''}
                  aria-current={activeId === id ? 'true' : undefined}
                  onClick={(e) => handleNavClick(e, id)}
                >
                  <RandomLetterSwap
                    label={label}
                    staggerDuration={0.025}
                    transition={{ duration: 0.6, type: 'spring' }}
                  />
                </a>
              </li>
            ))}
          </ul>

          <ul className="nav-links nav-links-secondary">
            {secondaryLinks.map(({ label, id }) => (
              <li key={label}>
                <a
                  href={`#${id}`}
                  className={activeId === id ? 'active' : ''}
                  aria-current={activeId === id ? 'true' : undefined}
                  onClick={(e) => handleNavClick(e, id)}
                >
                  <RandomLetterSwap
                    label={label}
                    staggerDuration={0.025}
                    transition={{ duration: 0.6, type: 'spring' }}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* High-Contrast Orange CTA */}
        <div className="navbar-actions">
          <button
            className="btn-orange"
            onClick={(e) => handleNavClick(e, 'book-appointment')}
          >
            Book Now
          </button>

          {/* Mobile Hamburger Button */}
          <button
            className="hamburger"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation"
            aria-expanded={isMobileOpen}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Slide-In Drawer */}
      <div className={`mobile-drawer ${isMobileOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-links">
          {allLinks.map(({ label, id }) => (
            <li key={label}>
              <a
                href={`#${id}`}
                className={activeId === id ? 'active' : ''}
                aria-current={activeId === id ? 'true' : undefined}
                onClick={(e) => handleNavClick(e, id)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="btn-orange full-width"
          onClick={(e) => handleNavClick(e, 'book-appointment')}
        >
          Book Now
        </button>
      </div>

      {/* Drawer Backdrop Overlay */}
      {isMobileOpen && (
        <div className="drawer-overlay" onClick={toggleMobileMenu}></div>
      )}
    </header>
  );
};

export default Navbar;
