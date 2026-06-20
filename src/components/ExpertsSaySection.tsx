import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const experts = [
  {
    id: 1,
    name: "Pratik Verma",
    title: "Forward Deployed Engineer",
    credential: "5+ Years Experience · FDE",
    quote:
      "MERN Academy represents the future of education — combining traditional academic values with modern technological skills. Their commitment to holistic student development prepares students not just for jobs, but for successful careers.",
    image: "/experts/pratik-verma.jpg",
  },
  {
    id: 2,
    name: "Abhishek Verma",
    title: "Senior Software Engineer",
    credential: "Full Stack & Systems Expert",
    quote:
      "In today's rapidly evolving world, institutions like MERN Academy are essential. They bridge the gap between academic knowledge and industry requirements, ensuring students are equipped with both technical expertise and professional skills.",
    image: "/experts/abhishek-verma.jpg",
  },
];

export const ExpertsSaySection = () => {
  return (
    <section className="py-32 px-6 lg:px-8 bg-[#0D0C0A]">
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
            Expert Opinions
          </span>
          <h2
            className="font-display font-bold text-[#F0EBE1] leading-[1.05] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            What Experts<br />Are Saying
          </h2>
        </motion.div>

        {/* Expert cards */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-px"
          style={{ backgroundColor: "#2A2522" }}
        >
          {experts.map((expert, index) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: index * 0.12, ease }}
              className="bg-[#0D0C0A] p-12 lg:p-16 group hover:bg-[#141210] transition-colors duration-300 relative overflow-hidden"
            >
              {/* Decorative large quote */}
              <div
                className="absolute top-8 right-10 font-display select-none pointer-events-none text-[#141210] group-hover:text-[#1C1916] transition-colors duration-300"
                style={{ fontSize: "clamp(6rem, 12vw, 10rem)", lineHeight: 1 }}
                aria-hidden
              >
                &ldquo;
              </div>

              <p className="text-[#A39E95] text-lg leading-[1.8] mb-12 relative z-10 font-sans">
                {expert.quote}
              </p>

              <div className="flex items-center gap-4 pt-8 border-t border-[#2A2522] relative z-10">
                <img
                  src={expert.image}
                  alt={expert.name}
                  className="w-11 h-11 object-cover grayscale flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      expert.name
                    )}&background=2A2522&color=A39E95&size=128`;
                  }}
                />
                <div>
                  <h4 className="font-display font-semibold text-[#F0EBE1] tracking-[-0.01em]">
                    {expert.name}
                  </h4>
                  <p className="font-mono text-[9px] text-[#6B6660] tracking-[0.08em] mt-0.5">
                    {expert.title}
                  </p>
                  <p className="font-mono text-[9px] text-[#C4622D] tracking-[0.08em] mt-0.5">
                    {expert.credential}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
