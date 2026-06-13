export interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: string; // Name of Lucide icon to use
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Insurance" | "Appointments";
}

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  serviceId: string;
  date: string;
  timeSlot: string;
  notes?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  text: string;
  rating: number;
}
