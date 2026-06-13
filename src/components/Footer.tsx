import { Stethoscope, MapPin, Phone, Mail, Clock, Compass, FileText } from "lucide-react";

export default function Footer() {
  const handleGetDirections = () => {
    // Open a real map search in Austin, Texas for maximum fidelity
    window.open(
      "https://www.google.com/maps/search/?api=1&query=500+Medical+Center+Parkway,+Austin,+TX+78701",
      "_blank"
    );
  };

  return (
    <footer id="contact" className="bg-[#1A365D] text-white pt-20 pb-10 relative overflow-hidden">
      {/* Visual backdrop curves */}
      <div className="absolute right-0 bottom-0 -z-10 h-[300px] w-[300px] rounded-full bg-white/2 blur-3xl pointer-events-none" />

      <div id="footer-container" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Core Info Grid */}
        <div id="footer-grid" className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 mb-16">
          
          {/* Col 1: Clinic overview (4 of 12 columns) */}
          <div id="footer-col-about" className="lg:col-span-4 text-left">
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-white shadow-md">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span id="footer-brand" className="font-serif text-2xl font-bold tracking-tight text-white">
                Ravi's Clinic
              </span>
            </div>
            <p id="footer-slogan" className="text-sm text-gray-300 leading-relaxed font-sans max-w-sm">
              Delivering state-of-the-art diagnostic screening and trusted family medical solutions with a patient-centered compass.
            </p>
            <div id="footer-credentials-seal" className="mt-6 inline-flex items-center space-x-2 text-xs text-secondary-light font-bold text-secondary bg-white/5 border border-white/10 p-2.5 rounded-lg max-w-fit">
              <Compass className="h-4 w-4 shrink-0" />
              <span>AMA General Practice Registry Code #4928-TX</span>
            </div>
          </div>

          {/* Col 2: Operating Hours (3 of 12 columns) */}
          <div id="footer-col-hours" className="lg:col-span-3 text-left">
            <h4 className="font-serif text-lg font-bold text-white mb-6 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-secondary shrink-0" />
              <span>Clinic Hours</span>
            </h4>
            <ul id="footer-hours-list" className="space-y-3.5 text-sm text-gray-300 font-sans">
              <li className="flex justify-between border-b border-white/5 pb-1.5">
                <span>Monday — Thursday</span>
                <span className="font-semibold text-white">8:00 AM — 5:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1.5">
                <span>Friday</span>
                <span className="font-semibold text-white">8:00 AM — 4:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1.5">
                <span>Saturday</span>
                <span className="font-semibold text-amber-300">9:00 AM — 1:00 PM *</span>
              </li>
              <li className="flex justify-between pb-1">
                <span>Sunday</span>
                <span className="font-semibold text-gray-400">Closed</span>
              </li>
            </ul>
            <p className="text-[11px] text-gray-400 font-medium leading-relaxed mt-4">
              * Saturday clinic hours are strictly reserved for preventative health screenings and pre-booked physical examinations.
            </p>
          </div>

          {/* Col 3: Contact & Address (3 of 12 columns) */}
          <div id="footer-col-contact" className="lg:col-span-3 text-left">
            <h4 className="font-serif text-lg font-bold text-white mb-6 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-secondary shrink-0" />
              <span>Contact & Address</span>
            </h4>
            <div id="footer-contact-details" className="space-y-4 text-sm text-gray-300 font-sans">
              
              <div id="contact-addr" className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <span>
                  <strong>Ravi's Family Clinic</strong> <br />
                  500 Medical Center Parkway, Suite 100 <br />
                  Austin, TX 78701
                </span>
              </div>

              <div id="contact-phone" className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-secondary shrink-0" />
                <span>
                  <strong>Tel:</strong> (512) 555-0199 <br />
                  <strong>Fax:</strong> (512) 555-0198
                </span>
              </div>

              <div id="contact-email" className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-secondary shrink-0" />
                <span><strong>Email:</strong> care@ravisclinic.com</span>
              </div>

            </div>
          </div>

          {/* Col 4: Stylized Embedded Map Card (2 of 12 columns, expands nicely) */}
          <div id="footer-col-map" className="lg:col-span-2 text-left">
            <h4 className="font-serif text-lg font-bold text-white mb-6">
              <span>Directions & Location</span>
            </h4>
            
            {/* Elegant Vector Map Simulation representation */}
            <div
              id="footer-map-card"
              onClick={handleGetDirections}
              className="relative w-full h-[140px] rounded-xl overflow-hidden border border-white/10 bg-slate-900 group cursor-pointer shadow-md"
            >
              <div className="absolute inset-0 bg-slate-800 opacity-60 flex flex-col justify-between p-3 select-none">
                
                {/* Simulated Grid overlay lines */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                
                {/* Map Pins and visual indicator */}
                <div className="relative flex justify-center items-center h-full">
                  <div className="absolute h-10 w-10 bg-secondary/20 rounded-full animate-ping" />
                  <div className="absolute h-6 w-6 bg-secondary/40 rounded-full flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  
                  {/* Coordinates overlay text */}
                  <span className="absolute bottom-1 right-1 font-mono text-[9px] text-gray-400 uppercase">
                    Austin Medical Center
                  </span>
                </div>
              </div>

              {/* Hover overlay caption */}
              <div className="absolute inset-0 bg-primary/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center">
                <Compass className="h-6 w-6 text-secondary mb-1 animate-spin" />
                <span className="text-xs font-bold text-white font-sans">Open in Google Maps</span>
              </div>
            </div>

            <button
              id="footer-directions-btn"
              onClick={handleGetDirections}
              className="mt-3.5 w-full text-center rounded-full bg-white/10 hover:bg-white text-white hover:text-primary py-2.5 text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer border border-white/5"
            >
              Get Directions
            </button>
          </div>

        </div>

        {/* Bottom copyright alignment bar */}
        <div id="footer-bottom" className="pt-8 border-t border-white/5 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-sans">
          <p id="footer-copyright-text">
            &copy; 2026 Dr. Ravi’s Family Health Clinic, PLLC. All Rights Reserved.
          </p>
          <div id="footer-bottom-links" className="flex items-center space-x-6">
            <a href="#faq" className="hover:text-white transition-colors">HIPAA Disclosures</a>
            <span className="text-white/10">|</span>
            <a href="#faq" className="hover:text-white transition-colors">Patient Privacy Policy</a>
            <span className="text-white/10">|</span>
            <a href="#faq" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
