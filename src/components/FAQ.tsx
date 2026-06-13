import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, HelpCircle as AskIcon, FileText } from "lucide-react";
import { FAQItem } from "../types";

const INITIAL_FAQS: FAQItem[] = [
  {
    id: "faq-insurance",
    category: "Insurance",
    question: "Which health insurance networks and plans do you accept?",
    answer: "Ravi’s Clinic is in-network with most national and regional insurance providers, including Blue Cross Blue Shield (BCBS), Aetna, Cigna, UnitedHealthcare, Medicare, Humana, and Tricare. Before visiting, we recommend verifying specific coverage details with your member services team. For out-of-network patients, we offer detailed itemized superbills and competitive sliding self-pay rates.",
  },
  {
    id: "faq-visit-items",
    category: "Appointments",
    question: "What items should I bring to my initial consultation?",
    answer: "Please bring a physical government-issued photo ID (driver’s license or passport), your active insurance card, a complete written list of all prescription medications (and their dosages), and any copies of recent, relevant clinical laboratory panels or imaging CD/DVD discs from previous physicians.",
  },
  {
    id: "faq-cancel-rule",
    category: "Appointments",
    question: "What is your clinic's late cancellation and no-show policy?",
    answer: "We kindly request at least 24 hours' notice for any cancellations or rescheduling requests. This courtesy allows us to reallocate the empty slot to patients needing urgent medical attention. Non-emergency cancellations under 24 hours or unnotified 'no-shows' will be subject to a standard $50 administrative fee.",
  },
  {
    id: "faq-pharmacy-refills",
    category: "General",
    question: "How do I request a pharmacy prescription refill?",
    answer: "For faster, automated processing, please contact your originating pharmacy first to file a direct refill query. The pharmacy team will securely ping our office via electronic health records (EHR). Please allow 48 to 72 business hours for our clinical team to review the request, verify your labs, and sign off.",
  },
  {
    id: "faq-televisits-opt",
    category: "General",
    question: "Do you offer virtual visits or video-based telehealth?",
    answer: "Yes, Dr. Ravi conducts HIPAA-compliant telemedicine video sessions for virtual symptom consultations, basic follow-ups, psychiatric consultation updates, or lab result readouts. Telehealth visits must be scheduled in advance, and eligibility depends on your physiological evaluation conditions.",
  },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<"All" | "Insurance" | "Appointments" | "General">("All");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-insurance"); // default first opened

  const categories = [
    { label: "All FAQs", value: "All" as const },
    { label: "Insurance & Fees", value: "Insurance" as const },
    { label: "Appointments & Policies", value: "Appointments" as const },
    { label: "General & Telehealth", value: "General" as const },
  ];

  const filteredFaqs = INITIAL_FAQS.filter(
    (faq) => activeCategory === "All" || faq.category === activeCategory
  );

  const handleToggleFaq = (id: string) => {
    if (openFaqId === id) {
      setOpenFaqId(null);
    } else {
      setOpenFaqId(id);
    }
  };

  return (
    <section id="faq" className="bg-[#F8F9FA] py-20 sm:py-28 relative">
      <div id="faq-section-container" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div id="faq-heading-block" className="text-center max-w-2xl mx-auto mb-14">
          <span id="faq-sub" className="text-xs font-bold uppercase tracking-widest text-secondary block mb-3">
            Patient Information & Resource Office
          </span>
          <h2 id="faq-heading" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
            Common Patient Questions
          </h2>
          <div className="h-[3px] w-16 bg-action mx-auto my-5 rounded" />
          <p id="faq-intro" className="text-sm sm:text-base text-charcoal leading-relaxed">
            Review detailed logistical answers regarding registration credentials, payment methods, insurance networks, and pre-visit clinical checklists.
          </p>
        </div>

        {/* Category Filters (Mobile responsive tabs) */}
        <div id="faq-tabs-scroller" className="flex overflow-x-auto pb-4 mb-8 gap-2 scrollbar-none justify-start sm:justify-center">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                id={`faq-tab-${cat.value.toLowerCase()}`}
                onClick={() => {
                  setActiveCategory(cat.value);
                  // Auto-open first matching or nullify
                  const matching = INITIAL_FAQS.find((f) => cat.value === "All" || f.category === cat.value);
                  setOpenFaqId(matching ? matching.id : null);
                }}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap border transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white text-charcoal border-gray-200 hover:border-secondary/40"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Interactive Accordion Panel */}
        <div id="faq-accordions-stack" className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaqId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  id={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`rounded-2xl bg-white border shadow-soft transition-all duration-300 ${
                    isOpen ? "border-secondary/40 ring-1 ring-secondary/15 shadow-md" : "border-gray-100"
                  }`}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    id={`${faq.id}-trigger`}
                    onClick={() => handleToggleFaq(faq.id)}
                    className="flex w-full items-center justify-between p-5 sm:p-6 text-left font-serif text-base sm:text-lg font-bold text-primary hover:text-secondary transition-colors focus:outline-none min-h-[48px] cursor-pointer"
                    aria-expanded={isOpen}
                    aria-controls={`${faq.id}-content`}
                  >
                    <div className="flex items-start pr-4 space-x-3">
                      <HelpCircle className="h-5 w-5 text-secondary shrink-0 mt-[3px]" />
                      <span>{faq.question}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 text-gray-400"
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.div>
                  </button>

                  {/* Accordion Content Block */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`${faq.id}-content`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div
                          id={`${faq.id}-body`}
                          className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm sm:text-base text-gray-600 leading-relaxed font-sans border-t border-gray-50 pt-4"
                        >
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Quick Help Desk Card */}
        <div id="faq-clinical-support-card" className="mt-12 text-center bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto">
          <div className="flex items-center space-x-4 text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="font-serif text-base font-bold text-primary">Need specialized medical disclosures?</p>
              <p className="text-xs text-gray-500 font-medium mt-1">Our front-desk administration acts as a concierge service for custom insurance vetting.</p>
            </div>
          </div>
          <a
            id="faq-helpdesk-btn"
            href="#contact"
            className="rounded-full bg-primary hover:bg-opacity-95 text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider shadow-sm transition-all focus:outline-none shrink-0"
          >
            Contact Administrative Desk
          </a>
        </div>

      </div>
    </section>
  );
}
