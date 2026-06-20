import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Phone } from "lucide-react";
import { CurriculumBubbleMenu } from "./CurriculumBubbleMenu";

const ease = [0.16, 1, 0.3, 1] as const;

const stats = [
  { value: "16+",    label: "Placed"      },
  { value: "25+",    label: "Companies"   },
  { value: "6mo",    label: "Program"     },
  { value: "12 LPA", label: "Avg Package" },
];

const techs = ["React", "Node.js", "MongoDB", "Express", "TypeScript", "Agentic AI", "Voice Agents", "Gen AI", "LLM Pipeline", "RAG", "LangChain", "LangGraph", "LangFuse", "LangSmith", "Vector DB", "OLLAMA", "Automation", "Android · iOS (AI)", "Distributed System Design", "Social Media Marketing", "DSA"];

export const Hero = () => {
  const [isCurriculumMenuOpen, setIsCurriculumMenuOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToCourseInfo = () => {
    document.getElementById("course-info")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0D0C0A]"
      style={{ paddingTop: "calc(68px + 28px)" }}
    >
      {/* Cursor spotlight */}
      <div
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(196,98,45,0.055), transparent 40%)`,
        }}
      />

      {/* Subtle column grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 99px, rgba(42,37,34,0.5) 99px, rgba(42,37,34,0.5) 100px)",
        }}
      />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-20 opacity-[0.028]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
        }}
      />

      <div className="relative z-30 max-w-7xl mx-auto px-6 lg:px-8 w-full py-20">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="mb-10"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#C4622D] uppercase">
            MERN Academy &mdash; Placement Program &middot; Est. 2024
          </span>
        </motion.div>

        {/* Headline — assembles line by line */}
        <div className="mb-10">
          {[
            { text: "The School",      accent: false },
            { text: "For Full-Stack",  accent: true  },
            { text: "Engineers.",      accent: false },
          ].map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.div
                initial={{ opacity: 0, x: -56 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, delay: 0.5 + i * 0.14, ease }}
              >
                <h1
                  className={`font-display font-bold leading-[1.0] tracking-[-0.04em] ${
                    line.accent ? "text-[#C4622D]" : "text-[#F0EBE1]"
                  }`}
                  style={{ fontSize: "clamp(3rem, 9.5vw, 8.5rem)" }}
                >
                  {line.text}
                </h1>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.05, ease }}
          className="text-[#A39E95] text-lg md:text-xl max-w-lg leading-relaxed mb-14"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Master MERN, AI Tools, System Design &amp; DSA in our
          intensive 6-month program. Placed at top tech companies.
        </motion.p>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2, ease }}
          className="flex flex-wrap border border-[#2A2522] divide-x divide-[#2A2522] mb-14 w-fit"
        >
          {stats.map((stat, i) => (
            <div key={i} className="px-7 py-5">
              <div className="font-mono text-2xl md:text-3xl font-bold text-[#F0EBE1] tracking-[-0.02em]">
                {stat.value}
              </div>
              <div className="font-mono text-[9px] tracking-[0.22em] text-[#6B6660] uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4, ease }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={scrollToCourseInfo}
            className="group flex items-center gap-3 bg-[#C4622D] hover:bg-[#D4723D] text-[#F0EBE1] px-8 py-4 font-display font-semibold text-sm tracking-[0.06em] transition-all duration-200"
          >
            Start Your Journey
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>

          <button
            onClick={() => setIsCurriculumMenuOpen(true)}
            className="group flex items-center gap-3 border border-[#2A2522] hover:border-[#3A3330] text-[#A39E95] hover:text-[#F0EBE1] px-8 py-4 font-display font-semibold text-sm tracking-[0.06em] transition-all duration-200"
          >
            <Download className="h-4 w-4" />
            Download Curriculum
          </button>

          <a
            href="tel:+918770800807"
            className="group flex items-center gap-3 border border-[#2A2522] hover:border-[#C4622D]/40 text-[#A39E95] hover:text-[#F0EBE1] px-8 py-4 font-display font-semibold text-sm tracking-[0.06em] transition-all duration-200"
          >
            <Phone className="h-4 w-4 text-[#C4622D]" />
            Call Us
          </a>
        </motion.div>

        {/* Tech stack line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.65, ease }}
          className="mt-16 pt-10 border-t border-[#2A2522]"
        >
          <span className="font-mono text-[10px] tracking-[0.22em] text-[#6B6660] uppercase">
            Technologies —{" "}
          </span>
          <span className="font-mono text-[10px] text-[#A39E95] tracking-[0.06em]">
            {techs.join(" · ")}
          </span>
        </motion.div>
      </div>

      <CurriculumBubbleMenu
        isOpen={isCurriculumMenuOpen}
        onClose={() => setIsCurriculumMenuOpen(false)}
      />
    </section>
  );
};
