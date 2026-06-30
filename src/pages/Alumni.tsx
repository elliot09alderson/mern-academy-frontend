import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const ease = [0.16, 1, 0.3, 1] as const;

const alumni = [
  {
    id: 1,
    name: "Khilendra Dewangan",
    title: "Full Stack AI Engineer",
    company: "MADANAPALLE INSTITUTE OF TECHNOLOGY & SCIENCE",
    image: "/alumni/khilendra.png",
    linkedin: "https://www.linkedin.com/in/khilendra-dewangan-9b236229a/",
  },
  {
    id: 2,
    name: "Abhishek Verma",
    title: "Senior Software Engineer (Three.js)",
    company: "Tata Communications",
    image: "/alumni/abhishek.png",
    linkedin: "https://www.linkedin.com/in/abhishekmill/",
  },
  {
    id: 3,
    name: "Bhupendra Sahu",
    title: "SDE 2",
    company: "Decorpot",
    image: "/alumni/bhupendra.png",
    linkedin: "https://www.linkedin.com/in/bsahu6659/",
  },
  {
    id: 4,
    name: "Sharon Rosario",
    title: "AI/ML Engineer (NLP | OCR | Huggingface)",
    company: "",
    image: "/alumni/sharon.png",
    linkedin: "https://www.linkedin.com/in/sharon-rosario/",
  },
  {
    id: 5,
    name: "Shubham Sahoo",
    title: "AI Engineer",
    company: "Nu10 Technologies",
    image: "/alumni/subham.png",
    linkedin: "https://www.linkedin.com/in/shubham-sahoo-628aa1227/",
  },
  {
    id: 6,
    name: "Nagalakshmi BM",
    title: "AI Engineer",
    company: "Nu10 Technologies",
    image: "/alumni/nagalakshmi.png",
    linkedin: "https://www.linkedin.com/in/nagalakshmi-bm-0a764b1b9/",
  },
  {
    id: 7,
    name: "Pratik Verma",
    title: "Senior Software Engineer",
    company: "Nu10 Technologies",
    image: "/alumni/pratik.png",
    linkedin: "https://www.linkedin.com/in/pratik-verma-1a0970192",
  },
];

const Alumni = () => {
  return (
    <div className="min-h-screen bg-[#0D0C0A]">
      <Navigation />

      <main className="pt-20">
        {/* Header */}
        <section className="py-28 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#C4622D] uppercase block mb-6">
                Our Alumni
              </span>
              <h1
                className="font-display font-bold text-[#F0EBE1] leading-[1.05] tracking-[-0.03em]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                Where Our<br />Alumni Work
              </h1>
              <p className="mt-6 text-[#A39E95] text-lg max-w-xl">
                Our graduates are making an impact at top companies and research institutions across the country.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Alumni Grid */}
        <section className="px-6 lg:px-8 pb-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px" style={{ backgroundColor: "#2A2522" }}>
              {alumni.map((person, index) => (
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease }}
                  className="bg-[#0D0C0A] p-10 group hover:bg-[#141210] transition-colors duration-300 flex flex-col items-center text-center"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-6 ring-1 ring-[#2A2522] group-hover:ring-[#C4622D] transition-all duration-300">
                    <img
                      src={person.image}
                      alt={person.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=2A2522&color=A39E95&size=256`;
                      }}
                    />
                  </div>

                  <h3 className="font-display font-semibold text-[#F0EBE1] tracking-[-0.01em] mb-1">
                    {person.name}
                  </h3>
                  <p className="font-mono text-[9px] text-[#C4622D] tracking-[0.08em] mb-1">
                    {person.title}
                  </p>
                  {person.company && (
                    <p className="font-mono text-[9px] text-[#6B6660] tracking-[0.06em] leading-relaxed">
                      {person.company}
                    </p>
                  )}
                  {person.linkedin && (
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 font-mono text-[9px] text-[#A39E95] hover:text-[#C4622D] tracking-[0.08em] transition-colors duration-200"
                    >
                      LinkedIn ↗
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Alumni;
