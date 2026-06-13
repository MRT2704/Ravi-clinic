import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Service, Appointment } from "./types";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Credentials from "./components/Credentials";
import Services from "./components/Services";
import AboutDoctor from "./components/AboutDoctor";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import AppointmentModal from "./components/AppointmentModal";
import { Bell, HeartPulse, Trash2, Calendar, Clock } from "lucide-react";

const CLINIC_SERVICES: Service[] = [
  {
    id: "family-practice",
    title: "Family Practice Medicine",
    description: "Dedicated outpatient wellness assessments, periodic health checkups, preventative counselling, and immediate treatments for patients of all ages.",
    icon: "activity",
    details: [
      "Annual preventative physical assessments",
      "Pediatric development and growth checkups",
      "Routine clinical health consultations",
      "Lifestyle risk evaluations & longevity advisory",
    ],
  },
  {
    id: "chronic-disease",
    title: "Chronic Disease Protocols",
    description: "Expert coordination of ongoing pharmaceutical and behavioral treatments to alleviate diabetes, high blood pressure, and cholesterol anomalies.",
    icon: "heart",
    details: [
      "Continuous glucose monitoring & insulin therapy",
      "Hypertension therapeutic management",
      "High cholesterol and lipid panels regulation",
      "Cardiovascular strength advisory & assessment",
    ],
  },
  {
    id: "screenings",
    title: "Health Screenings & Diagnostics",
    description: "Advanced clinical screening panels, rapid in-house pathology blood tests, diagnostic ECGs, and early cancerous tumor inspections.",
    icon: "shield",
    details: [
      "Fast clinical phlebotomy (blood drawings)",
      "Standard 12-lead electrocardiograms (ECGs)",
      "Cancer preventative and metabolic checks",
      "Thyroid, liver, and kidney efficiency panels",
    ],
  },
  {
    id: "immunizations",
    title: "Immunology & Senior Care",
    description: "Focused medical attention on the biological needs of seniors, including CDC-accredited vaccine deliveries and cognitive evaluations.",
    icon: "plus",
    details: [
      "Annual high-protection flu vaccinations",
      "Pneumococcal & shingles protective shots",
      "Geriatric mobility and dexterity counseling",
      "Comprehensive memory and alertness checkups",
    ],
  },
];

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookings, setBookings] = useState<Appointment[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const [notification, setNotification] = useState<string | null>(null);

  // Load booked slots from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ravis_clinic_appointments");
      if (saved) {
        setBookings(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Could not retrieve local storage bookings.", e);
    }
  }, []);

  // Set appointment save logic
  const handleBookAppointment = (apt: Appointment) => {
    const updated = [apt, ...bookings];
    setBookings(updated);
    localStorage.setItem("ravis_clinic_appointments", JSON.stringify(updated));
    
    // Trigger notification toast
    setNotification(`Successfully scheduled: ${apt.id}`);
    setTimeout(() => {
      setNotification(null);
    }, 5000);

    // Retrieve corresponding service metadata
    const chosenServiceObj = CLINIC_SERVICES.find((s) => s.id === apt.serviceId);

    // Background call to the server-side email dispatch service
    fetch("/api/book-appointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appointment: apt,
        serviceTitle: chosenServiceObj ? chosenServiceObj.title : apt.serviceId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("[Email Alert] Booking notification dispatched successfully. Message ID:", data.messageId);
          if (data.isTest && data.previewUrl) {
            console.log("[Email Alert] (Development sandbox mode) View simulated email render at:", data.previewUrl);
          }
        } else {
          console.error("[Email Alert] Dispatch service responded with error status:", data.error);
        }
      })
      .catch((err) => {
        console.error("[Email Alert] Fatal communication error with notification endpoint:", err);
      });
  };

  const handleDeleteBooking = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem("ravis_clinic_appointments", JSON.stringify(updated));
    
    setNotification("Appointment registration removed");
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const openModalWithService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setIsModalOpen(true);
  };

  const openGeneralModal = () => {
    setSelectedServiceId(CLINIC_SERVICES[0]?.id || "");
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-charcoal antialiased">
      {/* Sticky header bar */}
      <Navbar onBookClick={openGeneralModal} />

      {/* Main landing sections */}
      <main className="flex-grow pt-4">
        
        {/* Section 1: Hero Segment */}
        <Hero onBookClick={openGeneralModal} />

        {/* Section 2: Clinical Credentials Band */}
        <Credentials />

        {/* Section 3: Diagnostic & Clinical Services */}
        <Services
          services={CLINIC_SERVICES}
          onBookServiceClick={openModalWithService}
        />

        {/* Section 4: Academic Biography (About Doctor) */}
        <AboutDoctor />

        {/* Section 5: Accordion Patient FAQ resources */}
        <FAQ />

        {/* Option display: Bookings manager block (only if active bookings exist) */}
        <AnimatePresence>
          {bookings.length > 0 && (
            <motion.section
              id="active-appointments-dashboard"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-primary/5 py-12 border-t border-gray-100"
            >
              <div id="dashboard-container" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-left">
                <div id="dashboard-header" className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary rounded-xl text-white">
                      <HeartPulse className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-primary">Your Registered Clinical Visits</h3>
                      <p className="text-xs text-gray-500 font-semibold mt-1">Manage or review your upcoming medical evaluation details safely.</p>
                    </div>
                  </div>
                  <span id="dashboard-badge-count" className="text-xs font-bold px-3 py-1 bg-white border border-gray-200 text-secondary rounded-full">
                    {bookings.length} Appointment{bookings.length > 1 ? "s" : ""}
                  </span>
                </div>

                {/* Grid list of appointments */}
                <div id="booking-items-grid" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {bookings.map((apt) => {
                    const svcObj = CLINIC_SERVICES.find((s) => s.id === apt.serviceId || s.id === "family-practice");
                    return (
                      <motion.div
                        key={apt.id}
                        id={`dashboard-ticket-${apt.id}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative rounded-xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div className="pr-4">
                            <span id={`dash-ticket-id-${apt.id}`} className="font-mono text-[10px] font-bold text-secondary uppercase tracking-widest block mb-1">
                              ID: {apt.id}
                            </span>
                            <span id={`dash-ticket-svc-${apt.id}`} className="font-serif text-sm font-bold text-primary block leading-snug">
                              {svcObj?.title}
                            </span>
                            <p id={`dash-ticket-name-${apt.id}`} className="text-xs text-gray-400 font-semibold mt-1">
                              Patient: <span className="text-gray-700">{apt.patientName}</span>
                            </p>
                          </div>
                          
                          <button
                            id={`dash-ticket-del-btn-${apt.id}`}
                            onClick={(e) => handleDeleteBooking(apt.id, e)}
                            className="text-gray-400 hover:text-[#FF6B6B] p-1.5 hover:bg-red-50 rounded-lg transition-all"
                            title="Cancel Appointment Registration"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Date details */}
                        <div id={`dash-ticket-details-box-${apt.id}`} className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs font-semibold text-gray-500 gap-2">
                          <span className="flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1 text-secondary shrink-0" />
                            {apt.date}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1 text-secondary shrink-0" />
                            {apt.timeSlot}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

      </main>

      {/* Corporate Footer segment with address, map anchor, hours */}
      <Footer />

      {/* Appointment booking dynamic modal overlay */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        services={CLINIC_SERVICES}
        onBookAppointment={handleBookAppointment}
      />

      {/* Floating Success notification banner */}
      <AnimatePresence>
        {notification && (
          <motion.div
            id="global-toast-notification"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 rounded-xl bg-primary px-5 py-4 text-white shadow-xl border border-white/5 font-sans text-sm font-semibold max-w-sm"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-white">
              <Bell className="h-4 w-4 animate-ring" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-secondary-light font-bold text-secondary">Ravi’s Clinic Alert</p>
              <p className="text-white mt-0.5">{notification}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
