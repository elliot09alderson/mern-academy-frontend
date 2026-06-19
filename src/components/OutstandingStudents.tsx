import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { useGetOutstandingStudentsQuery } from "@/store/api/outstandingStudentApi";

const ease = [0.16, 1, 0.3, 1] as const;

export const OutstandingStudents = () => {
  const { data: studentsData, isLoading } = useGetOutstandingStudentsQuery({ isActive: true });

  return (
    <section id="students" className="py-32 px-6 lg:px-8 bg-[#0D0C0A]">
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
            Success Stories
          </span>
          <h2
            className="font-display font-bold text-[#F0EBE1] leading-[1.05] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Alumni at<br />Leading Companies
          </h2>
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-6 w-6 animate-spin text-[#C4622D]" />
          </div>
        ) : studentsData?.data.length ? (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-px mb-16"
            style={{ backgroundColor: "#2A2522" }}
          >
            {studentsData.data.slice(0, 3).map((student, index) => (
              <motion.div
                key={student._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease }}
                className="bg-[#0D0C0A] p-10 group hover:bg-[#141210] transition-colors duration-300"
              >
                {/* Rank */}
                <div className="font-mono text-[10px] text-[#6B6660] tracking-[0.2em] uppercase mb-8">
                  Rank #{student.rank}
                </div>

                {/* Photo */}
                <div className="mb-8">
                  <img
                    src={student.image.url}
                    alt={student.name}
                    className="w-14 h-14 object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>

                {/* Name & College */}
                <h3 className="font-display font-semibold text-[#F0EBE1] text-xl tracking-[-0.02em] mb-1">
                  {student.name}
                </h3>
                <p className="font-mono text-[10px] text-[#6B6660] tracking-[0.1em] mb-8">
                  {student.college}
                </p>

                {/* Company block */}
                <div className="border-t border-[#2A2522] pt-6 mb-6">
                  <p className="font-mono text-[9px] text-[#6B6660] tracking-[0.2em] uppercase mb-2">
                    Now at
                  </p>
                  <p className="font-display font-bold text-[#C4622D] text-xl tracking-[-0.01em]">
                    {student.company}
                  </p>
                  <p className="text-[#A39E95] text-sm mt-1">{student.role}</p>
                  <p className="font-mono text-sm text-[#F0EBE1] mt-2 font-medium">
                    {student.package}
                  </p>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {student.skills.slice(0, 4).map((skill, i) => (
                    <span
                      key={i}
                      className="font-mono text-[9px] text-[#6B6660] border border-[#2A2522] px-2.5 py-1 tracking-[0.08em]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="border border-[#2A2522] p-24 text-center mb-16">
            <p className="font-mono text-sm text-[#6B6660]">No student profiles yet</p>
          </div>
        )}

        {/* CTA block */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="border border-[#2A2522] p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <h3 className="font-display font-bold text-[#F0EBE1] text-2xl tracking-[-0.025em] mb-2">
              Be the Next Success Story
            </h3>
            <p className="text-[#6B6660] text-sm max-w-md leading-relaxed">
              Join our placement-oriented program and get placed at top tech companies.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0 flex-wrap">
            <a
              href="/students"
              className="group flex items-center gap-2 text-sm font-display font-semibold text-[#A39E95] hover:text-[#F0EBE1] border border-[#2A2522] hover:border-[#3A3330] px-6 py-3.5 transition-all duration-200"
            >
              View All Alumni
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <button
              onClick={() =>
                document.getElementById("course-info")?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex items-center gap-2 text-sm font-display font-semibold bg-[#C4622D] hover:bg-[#D4723D] text-[#F0EBE1] px-6 py-3.5 transition-colors duration-200"
            >
              Start Your Journey
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
