import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Stethoscope, Menu, X, CalendarCheck } from "lucide-react";

interface NavbarProps {
  onBookClick: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll for header background styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "About Dr. Ravi", href: "#about" },
    { name: "FAQs", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-4"
          : "bg-white/80 backdrop-blur-sm py-5"
      }`}
    >
      <div id="navbar-container" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div id="navbar-flex" className="flex items-center justify-between">
          
          {/* Logo & Clinical Brand */}
          <a
            id="nav-logo"
            href="#home"
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-secondary/50 rounded-lg p-1"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
              <Stethoscope className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span id="nav-brand-title" className="font-serif text-xl font-bold tracking-tight text-primary leading-none">
                Ravi's Clinic
              </span>
              <span id="nav-brand-sub" className="text-[10px] font-bold text-secondary uppercase tracking-widest mt-1">
                Medical Excellence
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={`nav-link-desktop-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                href={link.href}
                className="text-sm font-semibold text-charcoal hover:text-secondary transition-colors relative py-1 focus:outline-none focus:ring-1 focus:ring-secondary/50 rounded px-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Booking Button (Desktop) */}
          <div id="desktop-cta-container" className="hidden md:flex items-center">
            <button
              id="desktop-nav-booking-btn"
              onClick={onBookClick}
              className="flex items-center space-x-2 rounded-full bg-action hover:brightness-110 text-white px-6 py-2.5 text-xs font-bold shadow-lg shadow-[#FF6B6B]/20 transition-all uppercase tracking-widest focus:outline-none cursor-pointer"
            >
              <CalendarCheck className="h-4 w-4 shrink-0" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Menu Action / Menu Trigger */}
          <div id="mobile-controls" className="flex md:hidden items-center space-x-2">
            {/* Quick booking icon for mobile */}
            <button
              id="mobile-quick-book-btn"
              onClick={onBookClick}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-action text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-action/50"
              aria-label="Quick book appointment"
            >
              <CalendarCheck className="h-5 w-5" />
            </button>

            {/* Hamburger Button (strictly at least 44px touch region implicitly via padding/dims) */}
            <button
              id="mobile-hamburger-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-xl text-charcoal hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary/50 select-none"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md overflow-hidden"
          >
            <div id="mobile-links-container" className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  id={`nav-link-mobile-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-base font-semibold text-charcoal hover:text-secondary py-2 border-b border-gray-50 focus:outline-none focus:ring-1 focus:ring-secondary/20 px-1"
                >
                  {link.name}
                </a>
              ))}
              
              <div id="mobile-cta-drawer-container" className="pt-2">
                <button
                  id="mobile-nav-drawer-booking-btn"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onBookClick();
                  }}
                  className="flex w-full items-center justify-center space-x-2 rounded-full bg-action hover:brightness-110 text-white py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest shadow-lg shadow-[#FF6B6B]/20 transition-all focus:outline-none cursor-pointer"
                >
                  <CalendarCheck className="h-5 w-5" />
                  <span>Schedule Appointment</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
