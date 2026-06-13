import { Award, ShieldCheck, HeartPulse, Sparkles } from "lucide-react";

export default function Credentials() {
  const credentialsList = [
    {
      id: "cred-certified",
      icon: Award,
      title: "Board Certified Physician",
      sub: "American Board of Internal Medicine",
      bg: "bg-primary/5",
      iconColor: "text-primary",
    },
    {
      id: "cred-experience",
      icon: HeartPulse,
      title: "15+ Years Experience",
      sub: "In Advanced Clinical Practice",
      bg: "bg-secondary/10",
      iconColor: "text-secondary",
    },
    {
      id: "cred-quality",
      icon: ShieldCheck,
      title: "HIPAA Compliant Practice",
      sub: "Highest Standard Data Encryption",
      bg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      id: "cred-rated",
      icon: Sparkles,
      title: "Top Rated Clinician",
      sub: "Press Ganey National Patient Choice Award",
      bg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <section
      id="credentials"
      className="relative z-10 bg-white border-y border-gray-100 py-6 sm:py-8 shadow-sm"
    >
      <div id="credentials-inner-container" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          id="credentials-flex"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-center divide-y sm:divide-y-0 sm:divide-x divide-gray-100"
        >
          {credentialsList.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                id={item.id}
                className={`flex items-start space-x-4 p-2 ${
                  index > 0 ? "pt-6 sm:pt-2 sm:pl-4 lg:pl-6" : ""
                }`}
              >
                {/* Clean round icon backing */}
                <div
                  id={`${item.id}-icon-bg`}
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${item.bg} ${item.iconColor} transition-transform duration-300 hover:scale-105`}
                >
                  <IconComponent className="h-6 w-6" />
                </div>
                
                {/* Value text column, ensuring open sans layout is legible */}
                <div id={`${item.id}-text-box`} className="flex flex-col text-left">
                  <h4
                    id={`${item.id}-title`}
                    className="font-serif text-sm font-bold text-primary tracking-wide leading-tight"
                  >
                    {item.title}
                  </h4>
                  <p
                    id={`${item.id}-desc`}
                    className="text-xs text-gray-500 font-medium mt-1 leading-snug"
                  >
                    {item.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
