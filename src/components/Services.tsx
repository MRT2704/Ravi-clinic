import React from "react";
import { motion } from "motion/react";
import { Activity, Heart, Shield, PlusCircle, Check, ArrowRight } from "lucide-react";
import { Service } from "../types";

interface ServicesProps {
  services: Service[];
  onBookServiceClick: (serviceId: string) => void;
}

// Icon mapper helper
const getServiceIcon = (iconName: string) => {
  switch (iconName) {
    case "activity":
      return <Activity className="h-6 w-6 text-primary" />;
    case "heart":
      return <Heart className="h-6 w-6 text-secondary" />;
    case "shield":
      return <Shield className="h-6 w-6 text-green-600" />;
    case "plus":
    default:
      return <PlusCircle className="h-6 w-6 text-amber-500" />;
  }
};

export default function Services({ services, onBookServiceClick }: ServicesProps) {
  return (
    <section id="services" className="bg-[#F8F9FA] py-20 sm:py-28 relative">
      <div id="services-grid-container" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div id="services-header" className="text-center max-w-3xl mx-auto mb-16">
          <span id="services-sub" className="text-xs font-bold uppercase tracking-widest text-secondary block mb-3">
            Available Medical Services & Specialties
          </span>
          <h2 id="services-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
            Comprehensive Healthcare For Your Family
          </h2>
          <div className="h-[3px] w-16 bg-action mx-auto my-6 rounded" />
          <p id="services-intro" className="text-base sm:text-lg text-charcoal leading-relaxed">
            Dr. Ravi is dedicated to offering personalized, high-quality interventions across a wide portfolio of medical fields. Review our core therapeutic divisions below.
          </p>
        </div>

        {/* Services mapping */}
        <div id="services-card-grid" className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((svc, index) => (
            <motion.div
              key={svc.id}
              id={`service-card-${svc.id}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col justify-between rounded-2xl bg-white p-6 shadow-soft hover:shadow-xl transition-all duration-300 border border-gray-100/80 hover:border-secondary/30 hover:-translate-y-1"
            >
              <div id={`service-inside-${svc.id}`}>
                {/* Icon backplane */}
                <div
                  id={`service-${svc.id}-icon-holder`}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 group-hover:bg-secondary/10 transition-colors duration-300 mb-6"
                >
                  {getServiceIcon(svc.icon)}
                </div>

                {/* Service Heading - Georgia Serif */}
                <h3
                  id={`service-${svc.id}-title`}
                  className="font-serif text-lg sm:text-xl font-bold text-primary group-hover:text-secondary transition-colors leading-snug"
                >
                  {svc.title}
                </h3>
                
                {/* Service Paragraph */}
                <p
                  id={`service-${svc.id}-desc`}
                  className="text-sm text-gray-500 mt-3 leading-relaxed animate-none"
                >
                  {svc.description}
                </p>

                {/* Feature Bullet Points */}
                <ul id={`service-${svc.id}-bullets`} className="mt-5 space-y-2 border-t border-gray-50 pt-5 text-left">
                  {svc.details.map((detail, dIdx) => (
                    <li
                      key={dIdx}
                      id={`service-${svc.id}-bullet-${dIdx}`}
                      className="flex items-start text-xs sm:text-sm text-charcoal font-medium animate-none"
                    >
                      <Check className="h-4 w-4 text-emerald-500 shrink-0 mr-2 mt-[2px]" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tappable deep anchor - strictly size >= 44px for thumb tap */}
              <div id={`service-${svc.id}-action-panel`} className="mt-8 pt-4">
                <button
                  id={`service-${svc.id}-book-btn`}
                  onClick={() => onBookServiceClick(svc.id)}
                  className="flex w-full items-center justify-center space-x-1 rounded-full bg-white hover:bg-action text-primary group-hover:text-primary hover:text-white! hover:border-action border border-gray-200 py-3 text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer min-h-[44px]"
                >
                  <span>Book This Service</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating summary note */}
        <div id="services-disclaimer-box" className="mt-16 text-center max-w-2xl mx-auto p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <p id="services-disclaimer-text" className="text-xs text-gray-400 font-semibold leading-relaxed">
            *Please note: In case of acute cardiovascular distress, respiratory failures, or any other life-threatening medical emergency, call 911 or visit the nearest hospital emergency room directly.
          </p>
        </div>

      </div>
    </section>
  );
}
