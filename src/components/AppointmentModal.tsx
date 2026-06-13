import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Calendar, Clock, CheckCircle2, ShieldCheck, FileText } from "lucide-react";
import { Service, Appointment } from "../types";

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  onBookAppointment: (appointment: Appointment) => void;
}

const TIME_SLOTS = [
  "08:30 AM",
  "09:30 AM",
  "10:30 AM",
  "11:30 AM",
  "01:30 PM",
  "02:30 PM",
  "03:30 PM",
  "04:30 PM",
];

export default function AppointmentModal({
  isOpen,
  onClose,
  services,
  onBookAppointment,
}: AppointmentModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedService, setSelectedService] = useState(services[0]?.id || "");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  
  // Patient Details
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [notes, setNotes] = useState("");
  
  // Form Validation & Confirmation
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  // Get current date string for minimum date input (today)
  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!selectedService) newErrors.service = "Please select a service";
    if (!selectedDate) newErrors.date = "Please select a date";
    if (!selectedTimeSlot) newErrors.timeSlot = "Please select a preferred time slot";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!patientName.trim()) newErrors.name = "Full name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patientEmail.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(patientEmail)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Simple 10-digit phone checking
    const phoneClean = patientPhone.replace(/\D/g, "");
    if (!patientPhone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (phoneClean.length < 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
      setErrors({});
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    const appointment: Appointment = {
      id: "APT-" + Math.floor(100000 + Math.random() * 900000),
      patientName,
      patientEmail,
      patientPhone,
      serviceId: selectedService,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      notes,
      createdAt: new Date().toISOString(),
    };

    onBookAppointment(appointment);
    setConfirmedAppointment(appointment);
  };

  const handleResetModal = () => {
    setStep(1);
    setSelectedService(services[0]?.id || "");
    setSelectedDate("");
    setSelectedTimeSlot("");
    setPatientName("");
    setPatientEmail("");
    setPatientPhone("");
    setNotes("");
    setErrors({});
    setConfirmedAppointment(null);
    onClose();
  };

  // Format date display nicely
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return "";
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", options);
  };

  const chosenServiceObj = services.find((s) => s.id === selectedService);

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="appointment-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop animate */}
          <motion.div
            id="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={confirmedAppointment ? handleResetModal : onClose}
            className="fixed inset-0 bg-primary/40 backdrop-blur-md"
          />

          {/* Modal content box */}
          <motion.div
            id="appointment-modal-container"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Header */}
            <div id="modal-header" className="flex items-center justify-between border-b border-gray-100 bg-primary px-6 py-4 text-white">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-secondary" />
                <h3 className="font-serif text-xl font-bold">Schedule an Appointment</h3>
              </div>
              <button
                id="modal-close-btn"
                onClick={confirmedAppointment ? handleResetModal : onClose}
                className="rounded-full p-1 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Close booking modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Body */}
            <div id="modal-body" className="max-h-[80vh] overflow-y-auto p-6 md:p-8">
              {!confirmedAppointment ? (
                <div>
                  {/* Step Indicators */}
                  <div id="step-indicator-bar" className="mb-8 flex items-center justify-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span id="step-1-badge" className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                        step === 1 ? "bg-secondary text-white" : "bg-gray-100 text-gray-500"
                      }`}>
                        1
                      </span>
                      <span id="step-1-label" className={`text-sm font-semibold ${step === 1 ? "text-primary" : "text-gray-400"}`}>
                        Select Slot
                      </span>
                    </div>
                    <div className="h-[2px] w-12 bg-gray-200" />
                    <div className="flex items-center space-x-2">
                      <span id="step-2-badge" className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                        step === 2 ? "bg-secondary text-white" : "bg-gray-100 text-gray-500"
                      }`}>
                        2
                      </span>
                      <span id="step-2-label" className={`text-sm font-semibold ${step === 2 ? "text-primary" : "text-gray-400"}`}>
                        Patient Info
                      </span>
                    </div>
                  </div>

                  {step === 1 ? (
                    /* Step 1: Services, Date, and Time */
                    <form id="booking-step1-form" onSubmit={handleNextStep} className="space-y-6">
                      {/* Select Service */}
                      <div id="service-select-group">
                        <label id="service-label" className="block text-sm font-semibold text-charcoal mb-2">
                          Select Required Medical Consultation
                        </label>
                        <select
                          id="service-select"
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full rounded-lg border border-gray-200 bg-white p-3 text-base text-charcoal shadow-sm transition-all focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                        >
                          {services.map((srv) => (
                            <option key={srv.id} value={srv.id}>
                              {srv.title}
                            </option>
                          ))}
                        </select>
                        {errors.service && (
                          <span id="service-error-msg" className="text-xs font-semibold text-[#FF6B6B] mt-1 block">
                            {errors.service}
                          </span>
                        )}
                      </div>

                      {/* Select Date */}
                      <div id="date-select-group">
                        <label id="date-label" className="block text-sm font-semibold text-charcoal mb-2">
                          Preferred Appointment Date
                        </label>
                        <div className="relative">
                          <input
                            id="date-input"
                            type="date"
                            min={getTodayString()}
                            value={selectedDate}
                            onChange={(e) => {
                              setSelectedDate(e.target.value);
                              if (errors.date) setErrors((prev) => ({ ...prev, date: "" }));
                            }}
                            className="w-full rounded-lg border border-gray-200 p-3 pl-10 text-base text-charcoal shadow-sm transition-all focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                          />
                          <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                        {errors.date && (
                          <span id="date-error-msg" className="text-xs font-semibold text-[#FF6B6B] mt-1 block">
                            {errors.date}
                          </span>
                        )}
                      </div>

                      {/* Select Time Slot */}
                      <div id="time-select-group">
                        <label id="time-label" className="block text-sm font-semibold text-charcoal mb-2">
                          Available Time Slots
                        </label>
                        <div id="time-grid" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                          {TIME_SLOTS.map((slot) => {
                            const isSelected = selectedTimeSlot === slot;
                            return (
                              <button
                                key={slot}
                                id={`time-slot-${slot.replace(/\s+/g, "-")}`}
                                type="button"
                                onClick={() => {
                                  setSelectedTimeSlot(slot);
                                  if (errors.timeSlot) setErrors((prev) => ({ ...prev, timeSlot: "" }));
                                }}
                                className={`flex items-center justify-center space-x-1 rounded-lg py-3 text-sm font-semibold border transition-all ${
                                  isSelected
                                    ? "bg-secondary text-white border-secondary shadow-md"
                                    : "bg-white text-charcoal border-gray-200 hover:border-secondary/50 hover:bg-gray-50"
                                }`}
                              >
                                <Clock className="h-4 w-4" />
                                <span>{slot}</span>
                              </button>
                            );
                          })}
                        </div>
                        {errors.timeSlot && (
                          <span id="time-error-msg" className="text-xs font-semibold text-[#FF6B6B] mt-1 block">
                            {errors.timeSlot}
                          </span>
                        )}
                      </div>

                      {/* Summary Note */}
                      {chosenServiceObj && (
                        <div id="service-brief-box" className="rounded-lg bg-gray-50 p-4 border border-gray-100">
                          <p className="font-semibold text-primary text-sm">{chosenServiceObj.title}</p>
                          <p className="text-xs text-gray-500 mt-1">{chosenServiceObj.description}</p>
                        </div>
                      )}

                      {/* Action */}
                      <div id="step1-action-container" className="pt-4 flex justify-end">
                        <button
                          id="step1-next-btn"
                          type="submit"
                          className="flex items-center justify-center space-x-2 rounded-full bg-action hover:brightness-110 text-white px-8 py-3.5 font-bold shadow-lg shadow-[#FF6B6B]/20 transition-all uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-action/50 cursor-pointer text-xs sm:text-sm"
                        >
                          <span>Confirm Details & Next</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    /* Step 2: Patient Registration Information */
                    <form id="booking-step2-form" onSubmit={handleSubmit} className="space-y-6">
                      <div id="selected-summary-banner" className="flex flex-col sm:flex-row justify-between items-start sm:items-center rounded-xl bg-primary/5 p-4 border border-primary/10 gap-2 mb-6">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-gray-500 font-bold">Selected Schedule</p>
                          <p className="font-serif text-sm font-semibold text-primary">{chosenServiceObj?.title}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center text-xs text-charcoal font-semibold">
                            <Calendar className="mr-1 h-4 w-4 text-secondary" />
                            {formatDateDisplay(selectedDate)}
                          </div>
                          <div className="flex items-center text-xs text-charcoal font-semibold">
                            <Clock className="mr-1 h-4 w-4 text-secondary" />
                            {selectedTimeSlot}
                          </div>
                        </div>
                      </div>

                      {/* Full Name */}
                      <div id="patient-name-group">
                        <label id="patient-name-label" className="block text-sm font-semibold text-charcoal mb-2">
                          Patient's Full Name
                        </label>
                        <input
                          id="patient-name-input"
                          type="text"
                          placeholder="e.g., Johnathan Smith"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          className="w-full rounded-lg border border-gray-200 p-3 text-base text-charcoal shadow-sm transition-all focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                        />
                        {errors.name && (
                          <span id="patient-name-error" className="text-xs font-semibold text-[#FF6B6B] mt-1 block">
                            {errors.name}
                          </span>
                        )}
                      </div>

                      {/* Contact Info (Split in Grid) */}
                      <div id="patient-contact-grid" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* Email Address */}
                        <div id="patient-email-group">
                          <label id="patient-email-label" className="block text-sm font-semibold text-charcoal mb-2">
                            Email Address
                          </label>
                          <input
                            id="patient-email-input"
                            type="email"
                            placeholder="patient@example.com"
                            value={patientEmail}
                            onChange={(e) => setPatientEmail(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 p-3 text-base text-charcoal shadow-sm transition-all focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                          />
                          {errors.email && (
                            <span id="patient-email-error" className="text-xs font-semibold text-[#FF6B6B] mt-1 block">
                              {errors.email}
                            </span>
                          )}
                        </div>

                        {/* Phone Number */}
                        <div id="patient-phone-group">
                          <label id="patient-phone-label" className="block text-sm font-semibold text-charcoal mb-2">
                            Phone Number
                          </label>
                          <input
                            id="patient-phone-input"
                            type="tel"
                            placeholder="e.g., 555-019-2834"
                            value={patientPhone}
                            onChange={(e) => setPatientPhone(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 p-3 text-base text-charcoal shadow-sm transition-all focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                          />
                          {errors.phone && (
                            <span id="patient-phone-error" className="text-xs font-semibold text-[#FF6B6B] mt-1 block">
                              {errors.phone}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Brief Symptoms or Comments */}
                      <div id="patient-notes-group">
                        <label id="patient-notes-label" className="block text-sm font-semibold text-charcoal mb-2">
                          Symptoms / Consultation Notes <span className="text-xs font-normal text-gray-400">(Optional)</span>
                        </label>
                        <textarea
                          id="patient-notes-input"
                          rows={3}
                          placeholder="Please briefly describe any current symptoms, pre-existing conditions, or general topics you wish to evaluate..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full rounded-lg border border-gray-200 p-3 text-base text-charcoal shadow-sm transition-all focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20 resize-none"
                        />
                      </div>

                      {/* HIPAA Compliance Consent Tag */}
                      <div id="hiapaa-disclaimer" className="flex items-start space-x-2 text-xs text-gray-500 rounded bg-gray-50 p-3 border border-gray-100">
                        <ShieldCheck className="h-5 w-5 text-green-600 shrink-0 mt-[2px]" />
                        <p>
                          <span className="font-semibold text-gray-700">Data Privacy Disclosure:</span> Ravi’s Clinic secures patient requests in obedience with HIPAA confidentiality rules. By submitting this request, you agree to receive automated notification updates regarding your slot request.
                        </p>
                      </div>

                      {/* Buttons */}
                      <div id="step2-action-container" className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <button
                          id="step2-back-btn"
                          type="button"
                          onClick={() => setStep(1)}
                          className="text-sm font-semibold text-gray-500 hover:text-primary transition-colors cursor-pointer"
                        >
                          Back to Schedule Selection
                        </button>
                        
                        <button
                          id="step2-submit-btn"
                          type="submit"
                          className="flex items-center justify-center space-x-2 rounded-full bg-action hover:brightness-110 text-white px-8 py-3.5 font-bold shadow-lg shadow-[#FF6B6B]/20 transition-all uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-action/50 cursor-pointer text-xs sm:text-sm"
                        >
                          <CheckCircle2 className="h-5 w-5" />
                          <span>Finalize Booking</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                /* Success Confirmation State */
                <motion.div
                  id="booking-success-box"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-6 px-2"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4 text-green-600">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h4 className="font-serif text-2xl font-bold text-primary mb-2">Appointment Scheduled Successfully!</h4>
                  <p className="text-gray-600 text-base max-w-md mx-auto mb-6">
                    Thank you, <span className="font-semibold text-gray-900">{confirmedAppointment.patientName}</span>. Your appointment request has been securely registered.
                  </p>

                  <div id="booking-details-receipt" className="text-left bg-gray-50 rounded-xl p-6 border border-gray-100 max-w-md mx-auto mb-8 space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 font-bold border-b border-gray-200 pb-2 uppercase tracking-wide">
                      <span>Confirmation Summary</span>
                      <span className="text-primary font-mono">{confirmedAppointment.id}</span>
                    </div>
                    <div className="flex justify-between items-start text-sm">
                      <span className="text-gray-500">Practice:</span>
                      <span className="font-semibold text-primary">Dr. Ravi's Clinic</span>
                    </div>
                    <div className="flex justify-between items-start text-sm">
                      <span className="text-gray-500">Service:</span>
                      <span className="font-semibold text-charcoal">{chosenServiceObj?.title}</span>
                    </div>
                    <div className="flex justify-between items-start text-sm">
                      <span className="text-gray-500">Date:</span>
                      <span className="font-semibold text-charcoal">{formatDateDisplay(confirmedAppointment.date)}</span>
                    </div>
                    <div className="flex justify-between items-start text-sm">
                      <span className="text-gray-500">Time Slot:</span>
                      <span className="font-semibold text-charcoal">{confirmedAppointment.timeSlot}</span>
                    </div>
                    <div className="flex justify-between items-start text-sm">
                      <span className="text-gray-500">Registered Email:</span>
                      <span className="font-semibold text-charcoal">{confirmedAppointment.patientEmail}</span>
                    </div>
                  </div>

                  <div id="booking-instructional-note" className="flex items-start space-x-3 bg-secondary/5 text-left rounded-xl p-4 border border-secondary/10 max-w-md mx-auto mb-8 text-xs text-secondary-dark font-medium text-gray-600">
                    <FileText className="h-5 w-5 text-secondary shrink-0" />
                    <span>Please bring a high-resolution print or digital copy of your health insurance ID card, a driver's license/valid ID, and any relevant clinical history or current lists of medications to your visit.</span>
                  </div>

                  <button
                    id="success-dismiss-btn"
                    onClick={handleResetModal}
                    className="rounded-full bg-primary hover:bg-opacity-95 text-white px-8 py-3.5 font-bold tracking-wider uppercase shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer text-xs sm:text-sm"
                  >
                    Close & Return to Home
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
