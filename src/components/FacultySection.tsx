import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useGetActiveFacultiesQuery } from "@/store/api/facultyApi";

const ease = [0.16, 1, 0.3, 1] as const;

export const FacultySection = () => {
  const { data: facultiesData, isLoading } = useGetActiveFacultiesQuery({ limit: 6 });

  return (
    <section id="faculty" className="py-32 px-6 lg:px-8 bg-[#141210]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-20 border-b border-[#2A2522] pb-12"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#C4622D] uppercase block mb-6">
            Faculty
          </span>
          <h2
            className="font-display font-bold text-[#F0EBE1] leading-[1.05] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Built by<br />Practitioners
          </h2>
        </motion.div>

        {/* Faculty grid */}
        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-6 w-6 animate-spin text-[#C4622D]" />
          </div>
        ) : facultiesData?.data.length ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ backgroundColor: "#2A2522" }}
          >
            {facultiesData.data.map((faculty, index) => (
              <motion.div
                key={faculty._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.08, ease }}
                className="bg-[#141210] p-8 group hover:bg-[#1C1916] transition-colors duration-300"
              >
                <div className="flex gap-6">
                  {/* Index number */}
                  <span className="font-mono text-[10px] text-[#6B6660] tracking-[0.1em] mt-1 flex-shrink-0 w-6">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1 min-w-0">
                    {/* Photo */}
                    <div className="mb-5">
                      <img
                        src={faculty.image.url}
                        alt={faculty.name}
                        className="w-12 h-12 object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    </div>

                    {/* Name */}
                    <h3 className="font-display font-semibold text-[#F0EBE1] text-lg tracking-[-0.01em] mb-1">
                      {faculty.name}
                    </h3>

                    {/* Specialization */}
                    <p className="font-mono text-[10px] text-[#C4622D] tracking-[0.1em] uppercase mb-5">
                      {faculty.specialization}
                    </p>

                    {/* Details */}
                    <div className="space-y-1 mb-6 font-mono text-[10px] text-[#6B6660] tracking-[0.05em]">
                      <p>{faculty.qualification}</p>
                      <p>{faculty.experience} years experience</p>
                    </div>

                    {/* Expertise */}
                    {faculty.expertise?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-5 border-t border-[#2A2522]">
                        {faculty.expertise.slice(0, 4).map((skill, i) => (
                          <span
                            key={i}
                            className="font-mono text-[9px] text-[#6B6660] border border-[#2A2522] px-2 py-0.5 tracking-[0.06em]"
                          >
                            {skill}
                          </span>
                        ))}
                        {faculty.expertise.length > 4 && (
                          <span className="font-mono text-[9px] text-[#6B6660] border border-[#2A2522] px-2 py-0.5">
                            +{faculty.expertise.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="border border-[#2A2522] p-16 text-center">
            <p className="font-mono text-sm text-[#6B6660]">No faculty profiles available</p>
          </div>
        )}
      </div>
    </section>
  );
};
