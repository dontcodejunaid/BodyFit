import React, { useState, useEffect } from 'react';
import { RandomLetterSwap } from '@/components/ui/random-letter-swap';
import './Navbar.css';
import logoImg from '../assets/logo.png';

const primaryLinks = [
  { label: 'Home', href: '#home', active: true },
  { label: 'About Us', href: '#about' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

// Rendered on a second row underneath the primary links.
const secondaryLinks = [
  { label: 'Membership Plans', href: '#membership' },
  { label: 'Testimonials', href: '#testimonials' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Handle scroll detection for transparent-to-solid background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <header className={`header-wrapper ${isScrolled ? 'scrolled' : ''}`}>
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
        <a href="#home" className="navbar-logo">
          <img src={logoImg} alt="BodyFit Logo" className="logo-img" />
          <span className="brand-name">BodyFit</span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="nav-links-stack desktop-only">
          <ul className="nav-links">
            {primaryLinks.map(({ label, href, active }) => (
              <li key={label}>
                <a href={href} className={active ? 'active' : ''}>
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
            {secondaryLinks.map(({ label, href }) => (
              <li key={label}>
                <a href={href}>
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
          <button className="btn-orange">Book Now</button>
          
          {/* Mobile Hamburger Button */}
          <button className="hamburger" onClick={toggleMobileMenu} aria-label="Toggle navigation">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Slide-In Drawer */}
      <div className={`mobile-drawer ${isMobileOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-links">
          {[...primaryLinks, ...secondaryLinks].map(({ label, href }) => (
            <li key={label}>
              <a href={href} onClick={toggleMobileMenu}>{label}</a>
            </li>
          ))}
        </ul>
        <button className="btn-orange full-width" onClick={toggleMobileMenu}>
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