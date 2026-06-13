import { motion } from "motion/react";
import { Award, GraduationCap, Globe, ShieldAlert, HeartHandshake } from "lucide-react";

export default function AboutDoctor() {
  const achievements = [
    {
      id: "award-1",
      icon: GraduationCap,
      text: "MD - Johns Hopkins University School of Medicine (Chief Resident)",
    },
    {
      id: "award-2",
      icon: Award,
      text: "Recipient of the National Patient Choice Award (Past 4 Years Consecutively)",
    },
    {
      id: "award-3",
      icon: HeartHandshake,
      text: "Distinguished Fellow of the American College of Physicians (FACP)",
    },
    {
      id: "award-4",
      icon: Globe,
      text: "Fluent in English, Hindi, and Telugu (Broad Medical Interpretation Expert)",
    },
  ];

  return (
    <section id="about" className="bg-white py-20 sm:py-28 relative overflow-hidden">
      {/* Visual embellishment for sterile clean theme */}
      <div className="absolute left-0 bottom-0 -z-10 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      <div id="doctor-container" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div id="doctor-grid" className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Doctor Portrait Panel (5 of 12 columns) */}
          <motion.div
            id="doctor-portrait-panel"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div id="doctor-img-wrap" className="relative group">
              {/* Outer decorative box element to highlight portrait layout */}
              <div className="absolute -inset-4 rounded-3xl bg-secondary/5 -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
              
              <div className="relative overflow-hidden rounded-[32px] border-[10px] border-white bg-white shadow-soft aspect-square sm:aspect-[4/5]">
                <img
                  id="doctor-img"
                  src="/src/assets/images/regenerated_image_1781362729698.jpg"
                  alt="Dr. Ravi, MD - Chief Medical Director and Primary Physician"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-102 select-none"
                />
                
                {/* Embedded dynamic badge */}
                <div
                  id="doctor-float-accreditation"
                  className="absolute bottom-6 left-6 right-6 rounded-xl bg-primary/95 backdrop-blur-sm p-4 text-white hover:bg-primary transition-colors text-left"
                >
                  <p id="doc-title-overlay" className="font-serif text-base font-bold">Dr. Ravi Munaganti, MD</p>
                  <p id="doc-subtitle-overlay" className="text-xs text-secondary font-bold mt-1 uppercase tracking-wider">Internal Medicine Specialist</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Biography & Philosophy Panel (7 of 12 columns) */}
          <motion.div
            id="doctor-bio-panel"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            <span id="doctor-bio-sub" className="text-xs font-bold uppercase tracking-widest text-secondary block mb-3">
              MEET OUR CLINICAL FOUNDER
            </span>
            <h2 id="doctor-bio-h2" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
              Dr. Ravi Munaganti, MD
            </h2>
            <p id="doctor-bio-headline" className="text-base sm:text-lg font-bold text-secondary mt-2">
              Commitment to Medical Rigor, Grounded in Compassionate Listening.
            </p>
            
            <div className="h-[2px] w-12 bg-action my-6 rounded" />

            <p id="doctor-bio-p1" className="text-base sm:text-lg text-charcoal leading-relaxed font-sans">
              15 years experience, outpatient expertise
            </p>

            <blockquote
              id="doctor-philosophy-quote"
              className="mt-6 border-l-4 border-secondary bg-gray-50 p-4 rounded-r-xl italic text-sm sm:text-base text-gray-600 leading-relaxed font-sans"
            >
              "I believe clinical medicine is a collaborative covenant. My team operates by listening to your specific narrative first, so that we can accurately formulate long-term therapeutic options together. Education, transparency, and data privacy form the pillars of how we secure your longevity."
            </blockquote>

            {/* Awards section */}
            <div id="doctor-awards-section" className="mt-8">
              <h3 id="doctor-awards-h3" className="font-serif text-lg font-bold text-primary tracking-wide mb-4 flex items-center">
                <Award className="h-5 w-5 text-secondary mr-2 shrink-0" />
                <span>Undergraduate & Professional Accolades</span>
              </h3>
              <ul id="doctor-awards-list" className="space-y-3 font-sans">
                {achievements.map((ach) => {
                  const AchIcon = ach.icon;
                  return (
                    <li
                      key={ach.id}
                      id={ach.id}
                      className="flex items-start text-sm sm:text-base text-charcoal font-semibold"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary mr-3 mt-[2px]">
                        <AchIcon className="h-4 w-4" />
                      </span>
                      <span className="mt-[2px]">{ach.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            
          </motion.div>

        </div>
      </div>
    </section>
  );
}
