import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Users, Loader2 } from "lucide-react";
import { useGetActiveCoursesQuery } from "@/store/api/courseApi";

const ease = [0.16, 1, 0.3, 1] as const;

const curriculum = [
  {
    id: "ai",
    category: "AI & Agents",
    count: 12,
    topics: [
      "Agentic AI", "Voice Agents", "Agentic Solutions", "Gen AI",
      "LLM Pipeline", "RAG", "LangChain", "LangGraph",
      "LangFuse", "LangSmith", "Vector DB", "OLLAMA",
    ],
  },
  {
    id: "fullstack",
    category: "Full Stack Dev",
    count: 6,
    topics: [
      "MERN Stack", "React & Next.js", "Node.js & Express",
      "MongoDB & SQL", "TypeScript", "REST APIs",
    ],
  },
  {
    id: "mobile",
    category: "Mobile & Automation",
    count: 6,
    topics: [
      "Android App Dev (AI)", "iOS App Dev (AI)", "Workflow Automation",
      "n8n · Make · Zapier", "Web Scraping", "AI-Powered Tools",
    ],
  },
  {
    id: "system",
    category: "System Design",
    count: 6,
    topics: [
      "Distributed System Design", "Microservices", "DSA & Problem Solving",
      "System Design Interviews", "Cloud Deployment", "Docker & CI/CD",
    ],
  },
  {
    id: "marketing",
    category: "Marketing & Growth",
    count: 6,
    topics: [
      "Social Media Marketing", "Content Strategy", "Personal Branding",
      "LinkedIn Growth", "Freelancing", "Client Acquisition",
    ],
  },
  {
    id: "career",
    category: "Soft Skills & Career",
    count: 6,
    topics: [
      "Communication Skills", "Interview Preparation", "Resume Building",
      "Placement Support", "Industry Mentorship", "Live Client Projects",
    ],
  },
];

const WhatWeTeach = () => {
  const [active, setActive] = useState(curriculum[0].id);
  const selected = curriculum.find((c) => c.id === active)!;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease }}
      className="mt-24 border border-[#2A2522]"
    >
      {/* Header */}
      <div className="border-b border-[#2A2522] px-10 py-5 flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.3em] text-[#C4622D] uppercase">
          What We Teach
        </span>
        <span className="font-mono text-[9px] text-[#6B6660] tracking-[0.1em]">
          {curriculum.reduce((s, c) => s + c.count, 0)}+ topics covered
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]" style={{ minHeight: 360 }}>

        {/* Category sidebar */}
        <div className="border-b lg:border-b-0 lg:border-r border-[#2A2522]">
          {curriculum.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`w-full text-left px-8 py-5 border-b border-[#2A2522] last:border-b-0 flex items-center justify-between group transition-colors duration-200 ${
                active === item.id
                  ? "bg-[#141210]"
                  : "hover:bg-[#141210]/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`font-mono text-[9px] tracking-[0.15em] transition-colors duration-200 ${
                  active === item.id ? "text-[#C4622D]" : "text-[#3A3330]"
                }`}>
                  0{i + 1}
                </span>
                <span className={`font-display font-semibold text-sm tracking-[-0.01em] transition-colors duration-200 ${
                  active === item.id ? "text-[#F0EBE1]" : "text-[#6B6660] group-hover:text-[#A39E95]"
                }`}>
                  {item.category}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`font-mono text-[9px] tracking-[0.1em] transition-colors duration-200 ${
                  active === item.id ? "text-[#C4622D]" : "text-[#2A2522]"
                }`}>
                  {item.count}
                </span>
                {active === item.id && (
                  <div className="w-1 h-1 rounded-full bg-[#C4622D]" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Topics panel */}
        <div className="p-10 lg:p-14 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25, ease }}
            >
              <p className="font-mono text-[9px] tracking-[0.3em] text-[#C4622D] uppercase mb-3">
                {selected.category}
              </p>
              <h3 className="font-display font-bold text-[#F0EBE1] text-2xl tracking-[-0.025em] mb-10">
                {selected.count} Topics
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {selected.topics.map((topic, i) => (
                  <motion.div
                    key={topic}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                    className="flex items-center gap-3 p-4 border border-[#2A2522] hover:border-[#C4622D]/40 hover:bg-[#141210] group transition-all duration-200 cursor-default"
                  >
                    <div className="w-1.5 h-1.5 bg-[#C4622D] flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity duration-200" />
                    <span className="text-[#A39E95] group-hover:text-[#F0EBE1] text-sm font-sans leading-tight transition-colors duration-200">
                      {topic}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export const CourseSection = () => {
  const { data: coursesData, isLoading } = useGetActiveCoursesQuery({ limit: 10 });

  return (
    <section id="courses" className="py-32 px-6 lg:px-8 bg-[#0D0C0A]">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-20"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#C4622D] uppercase block mb-6">
            Curriculum
          </span>
          <h2
            className="font-display font-bold text-[#F0EBE1] leading-[1.05] tracking-[-0.03em] mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Placement-Oriented<br />Courses
          </h2>
          <p className="text-[#6B6660] text-base max-w-xl leading-relaxed">
            Industry-designed curriculum with hands-on projects, live sessions,
            and guaranteed placement support.
          </p>
        </motion.div>

        {/* Courses */}
        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-6 w-6 animate-spin text-[#C4622D]" />
          </div>
        ) : coursesData?.data.length ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ backgroundColor: "#2A2522" }}
          >
            {coursesData.data.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.07, ease }}
                className="bg-[#0D0C0A] p-8 group hover:bg-[#141210] transition-colors duration-300 flex flex-col"
              >
                {/* Banner image or level */}
                {course.bannerImage?.url ? (
                  <div className="mb-6 overflow-hidden bg-[#141210]" style={{ aspectRatio: "16/9" }}>
                    <img
                      src={course.bannerImage.url}
                      alt={course.courseName}
                      className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="mb-6">
                    <span className="font-mono text-[9px] text-[#C4622D] tracking-[0.25em] uppercase border border-[#C4622D]/30 px-3 py-1.5">
                      {course.level}
                    </span>
                  </div>
                )}

                <h3 className="font-display font-semibold text-[#F0EBE1] text-xl tracking-[-0.02em] mb-3">
                  {course.courseName}
                </h3>

                <p className="text-[#6B6660] text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                  {course.description}
                </p>

                <div className="flex items-center gap-5 font-mono text-[10px] text-[#6B6660] tracking-[0.1em] mb-6">
                  <span className="flex items-center gap-1.5 uppercase">
                    <Clock className="h-3 w-3" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1.5 uppercase">
                    <Users className="h-3 w-3" />
                    {course.batchSize} seats
                  </span>
                </div>

                {/* Pricing */}
                <div className="border-t border-[#2A2522] pt-6">
                  <div className="flex items-baseline justify-between mb-5">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-2xl font-bold text-[#F0EBE1] tracking-[-0.02em]">
                        ₹{course.discountedPrice.toLocaleString("en-IN")}
                      </span>
                      <span className="font-mono text-sm text-[#6B6660] line-through">
                        ₹{course.originalPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#C4622D] border border-[#C4622D]/30 px-2 py-1 tracking-[0.1em]">
                      −{course.discountPercentage}%
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      document
                        .getElementById("course-info")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="w-full flex items-center justify-between px-5 py-3.5 bg-[#C4622D] hover:bg-[#D4723D] text-[#F0EBE1] text-sm font-display font-semibold tracking-[0.05em] transition-colors duration-200"
                  >
                    Enroll Now
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="border border-[#2A2522] p-16 text-center">
            <p className="font-mono text-sm text-[#6B6660] tracking-[0.1em]">
              No courses available at the moment
            </p>
          </div>
        )}

        {/* What We Teach — interactive tabs */}
        <WhatWeTeach />

        {/* Why MERN Academy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="mt-24 border border-[#2A2522]"
        >
          <div className="border-b border-[#2A2522] px-10 py-5">
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#C4622D] uppercase">
              Why MERN Academy
            </span>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x"
            style={{ borderColor: "#2A2522" }}
          >
            {[
              {
                num: "01",
                title: "Live 1-on-1 Sessions",
                desc: "Weekend doubt-clearing sessions with industry experts who've shipped real products.",
              },
              {
                num: "02",
                title: "Certification Program",
                desc: "Industry-recognized vocational training certificates upon program completion.",
              },
              {
                num: "03",
                title: "Real Client Projects",
                desc: "Work on actual client projects during the course to build a production portfolio.",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="p-10 hover:bg-[#141210] transition-colors duration-300 border-[#2A2522]"
                style={{ borderColor: "#2A2522" }}
              >
                <div className="font-mono text-[10px] text-[#6B6660] tracking-[0.2em] mb-5">
                  {item.num}
                </div>
                <h4 className="font-display font-semibold text-[#F0EBE1] text-lg tracking-[-0.01em] mb-3">
                  {item.title}
                </h4>
                <p className="text-[#6B6660] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
