import { motion } from "motion/react";
import { ArrowRight, Star, Heart, Calendar } from "lucide-react";

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 pt-28 pb-16 flex items-center overflow-hidden"
    >
      {/* Decorative background shapes for sterile premium aesthetic */}
      <div className="absolute right-0 top-0 -z-10 h-[600px] w-[500px] rounded-full bg-secondary/5 blur-3xl pointer-events-none" />
      <div className="absolute left-12 bottom-12 -z-10 h-[300px] w-[300px] rounded-full bg-primary/5 blur-2xl pointer-events-none" />

      <div id="hero-container" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div id="hero-grid" className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Hero text panel (6 cols of 12) */}
          <div id="hero-text-panel" className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Status alerts/Ribbon */}
            <motion.div
              id="hero-alert-ribbon"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex max-w-fit items-center space-x-2 rounded-full bg-secondary/10 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-primary mb-6"
            >
              <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />
              <span>We Are Welcoming New Patients Today</span>
            </motion.div>

            {/* Merriweather Academic Serif Heading */}
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-primary tracking-tight leading-[1.1]"
            >
              Expert Medical Care.<br />
              <span className="italic text-secondary">Compassionate</span> Approach.
            </motion.h1>

            {/* Supportive accessible subtext, min 18px body size */}
            <motion.p
              id="hero-subtext"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-charcoal leading-relaxed max-w-2xl font-sans"
            >
              At Ravi’s Clinic, we prioritize your long-term health and wellness. Guided by a patient-centered care philosophy, we deliver state-of-the-art diagnostic screening and trusted family medical solutions.
            </motion.p>

            {/* Action buttons mapping touch boundaries */}
            <motion.div
              id="hero-actions-container"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
            >
              {/* Primary Call To Action in Action Coral */}
              <button
                id="hero-cta-booking-btn"
                onClick={onBookClick}
                className="flex items-center justify-center space-x-2 rounded-full bg-action hover:brightness-110 text-white py-4 px-8 text-sm font-bold shadow-lg shadow-[#FF6B6B]/20 transition-all uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-action/50 cursor-pointer"
              >
                <Calendar className="h-5 w-5 shrink-0" />
                <span>Book Appointment</span>
              </button>

              {/* Secondary Scroll anchor */}
              <a
                id="hero-cta-services-anchor"
                href="#services"
                className="flex items-center justify-center space-x-2 rounded-full bg-white hover:bg-gray-50 border border-gray-200 text-primary py-4 px-8 text-sm font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <span>Explore Services</span>
                <ArrowRight className="h-4 w-4 text-secondary" />
              </a>
            </motion.div>

            {/* Simple Trust Metrics on mobile-first flex */}
            <motion.div
              id="hero-badges-tray"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="mt-10 pt-8 border-t border-gray-100 grid grid-cols-3 gap-4"
            >
              <div id="badge-trust-rating" className="flex flex-col">
                <span className="flex items-center text-amber-500 font-bold text-sm">
                  <Star className="h-4 w-4 fill-current mr-1" />
                  <span>4.9 / 5</span>
                </span>
                <span className="text-xs text-gray-400 font-semibold mt-1">Patient Rating</span>
              </div>
              <div id="badge-trust-experience" className="flex flex-col">
                <span className="text-primary font-serif font-bold text-base">15+ Years</span>
                <span className="text-xs text-gray-400 font-semibold mt-1">Clincial Practice</span>
              </div>
              <div id="badge-trust-insurance" className="flex flex-col">
                <span className="text-secondary font-sans font-bold text-xs sm:text-sm uppercase tracking-wider">All Insurances</span>
                <span className="text-xs text-gray-400 font-semibold mt-1">Accepted Locally</span>
              </div>
            </motion.div>

          </div>

          {/* Hero visual panel (5 cols of 12) */}
          <motion.div
            id="hero-image-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Outer soft shadow styling for high aesthetic finish */}
              <div className="relative overflow-hidden rounded-3xl border-8 border-white bg-white shadow-2xl aspect-[4/3] sm:aspect-square lg:aspect-[4/5]">
                <img
                  id="hero-img-element"
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800"
                  alt="Modern state-of-the-art office interior at Ravi's Medical Clinic"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover select-none"
                />
                
                {/* Visual glassmorphic overlay for sterile clinic tone */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Float badge 1: Doctor care */}
              <div
                id="floating-care-badge"
                className="absolute -left-6 bottom-8 hidden sm:flex items-center space-x-3 rounded-2xl bg-white p-4 shadow-xl border border-gray-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Accreditation</p>
                  <p className="text-sm font-bold text-primary">AMA Board Certified Office</p>
                </div>
              </div>

              {/* Float badge 2: Active patients */}
              <div
                id="floating-patients-badge"
                className="absolute -right-6 top-8 hidden sm:flex flex-col items-center justify-center rounded-2xl bg-primary p-4 text-white shadow-xl max-w-[120px]"
              >
                <span className="font-serif text-2xl font-bold leading-none">10k+</span>
                <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest text-center mt-1">
                  Active Patients
                </span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
