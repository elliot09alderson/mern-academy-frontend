import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const branches = [
  {
    id: 1,
    city: "Bhilai",
    area: "Chhattisgarh",
    address: "MERN Academy, Bhilai (CG), Chhattisgarh — 490023, Near IIT Bhilai",
    phone: "+91 8770800807",
    timing: "Mon–Sat: 9:00 AM – 8:00 PM",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
    facilities: ["Smart Classrooms", "AI Lab", "Library", "Cafeteria"],
    isMain: true,
  },
  {
    id: 2,
    city: "Bangalore",
    area: "Indira Nagar",
    address: "Indira Nagar, Bangalore",
    phone: "+91 8770800807",
    timing: "Mon–Sat: 9:00 AM – 8:00 PM",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop",
    facilities: ["Modern Labs", "Project Rooms", "Student Lounge", "Parking"],
    isMain: false,
  },
  {
    id: 3,
    city: "Hyderabad",
    area: "Ameerpet",
    address: "Ameerpet, Hyderabad",
    phone: "+91 8770800807",
    timing: "Mon–Sat: 9:00 AM – 8:00 PM",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=500&fit=crop",
    facilities: ["Co-working Space", "Seminar Hall", "24/7 Access", "High-Speed Wi-Fi"],
    isMain: false,
  },
  {
    id: 4,
    city: "Online",
    area: "Live + Recorded",
    address: "Learn from anywhere — live sessions, recorded lectures, and doubt support",
    phone: "+91 8770800807",
    timing: "Flexible — 24/7 Access",
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&h=500&fit=crop",
    facilities: ["Live Classes", "Recorded Sessions", "1-on-1 Mentorship", "Placement Support"],
    isMain: false,
  },
];

export const BranchesSection = () => {
  return (
    <section id="branches" className="py-32 px-6 lg:px-8 bg-[#141210]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-20"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#C4622D] uppercase block mb-6">
            Locations
          </span>
          <h2
            className="font-display font-bold text-[#F0EBE1] leading-[1.05] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Find Us
          </h2>
        </motion.div>

        {/* Branch list */}
        <div className="space-y-px" style={{ backgroundColor: "#2A2522" }}>
          {branches.map((branch, index) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease }}
              className="bg-[#141210] grid grid-cols-1 lg:grid-cols-2 group hover:bg-[#1C1916] transition-colors duration-300"
            >
              {/* Image */}
              <div className="overflow-hidden h-56 lg:h-auto">
                <img
                  src={branch.image}
                  alt={`MERN Academy ${branch.city}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-[1.04] group-hover:scale-100 transition-all duration-700"
                />
              </div>

              {/* Info */}
              <div className="p-10 lg:p-14">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-display font-bold text-[#F0EBE1] text-2xl tracking-[-0.025em] mb-1">
                      {branch.city}
                    </h3>
                    <p className="font-mono text-[10px] text-[#C4622D] tracking-[0.2em] uppercase">
                      {branch.area}
                    </p>
                  </div>
                  {branch.isMain && (
                    <span className="font-mono text-[9px] text-[#6B6660] border border-[#2A2522] px-2.5 py-1.5 tracking-[0.15em] uppercase">
                      Main
                    </span>
                  )}
                </div>

                <div className="space-y-3 mb-10 text-sm text-[#6B6660]">
                  <p className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-[#C4622D] flex-shrink-0 mt-0.5" />
                    {branch.address}
                  </p>
                  <a
                    href={`tel:${branch.phone.replace(/\s/g, '')}`}
                    className="flex items-center gap-3 hover:text-[#A39E95] transition-colors duration-200"
                  >
                    <Phone className="h-4 w-4 text-[#C4622D] flex-shrink-0" />
                    {branch.phone}
                  </a>
                  <p className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-[#C4622D] flex-shrink-0" />
                    {branch.timing}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {branch.facilities.map((f, i) => (
                    <span
                      key={i}
                      className="font-mono text-[9px] text-[#6B6660] border border-[#2A2522] px-3 py-1.5 tracking-[0.08em]"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expansion CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mt-16 border border-[#2A2522] p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="font-mono text-[9px] text-[#C4622D] tracking-[0.2em] uppercase mb-2">
              Have a Question?
            </p>
            <h3 className="font-display font-semibold text-[#F0EBE1] text-xl tracking-[-0.02em]">
              Talk to us directly on WhatsApp
            </h3>
          </div>
          <a
            href="https://wa.me/918770800807"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[10px] text-[#C4622D] border border-[#C4622D]/40 hover:border-[#C4622D] hover:bg-[#C4622D]/5 px-6 py-3 tracking-[0.2em] uppercase transition-colors duration-200 flex-shrink-0 flex items-center gap-2"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};
