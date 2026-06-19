import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const branches = [
  {
    id: 1,
    city: "Bangalore",
    area: "Koramangala",
    address: "123 Innovation Street, Koramangala 5th Block, Bangalore — 560095",
    phone: "+91 98765 43210",
    timing: "Mon–Sat: 9:00 AM – 8:00 PM",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
    facilities: ["Smart Classrooms", "AI Lab", "Library", "Cafeteria"],
    isMain: true,
  },
  {
    id: 2,
    city: "Hyderabad",
    area: "HITEC City",
    address: "456 Tech Boulevard, HITEC City, Hyderabad — 500081",
    phone: "+91 98765 43211",
    timing: "Mon–Sat: 9:00 AM – 8:00 PM",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop",
    facilities: ["Modern Labs", "Project Rooms", "Student Lounge", "Parking"],
    isMain: false,
  },
  {
    id: 3,
    city: "Pune",
    area: "Baner",
    address: "789 Education Hub, Baner Road, Pune — 411045",
    phone: "+91 98765 43212",
    timing: "Mon–Sat: 9:00 AM – 8:00 PM",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=500&fit=crop",
    facilities: ["Co-working Space", "Seminar Hall", "24/7 Access", "Food Court"],
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
                  <p className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-[#C4622D] flex-shrink-0" />
                    {branch.phone}
                  </p>
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
              Expanding Soon
            </p>
            <h3 className="font-display font-semibold text-[#F0EBE1] text-xl tracking-[-0.02em]">
              Coming to Chennai, Delhi &amp; Mumbai
            </h3>
          </div>
          <button
            onClick={() =>
              document.getElementById("course-info")?.scrollIntoView({ behavior: "smooth" })
            }
            className="font-mono text-[10px] text-[#C4622D] border border-[#C4622D]/40 hover:border-[#C4622D] px-6 py-3 tracking-[0.2em] uppercase transition-colors duration-200 flex-shrink-0"
          >
            Get Early Access
          </button>
        </motion.div>
      </div>
    </section>
  );
};
