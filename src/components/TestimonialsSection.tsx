import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Star } from "lucide-react";
import { useGetTestimonialsQuery } from "@/store/api/testimonialApi";

const ease = [0.16, 1, 0.3, 1] as const;

export const TestimonialsSection = () => {
  const { data: testimonialsData, isLoading } = useGetTestimonialsQuery({
    isActive: true,
    limit: 8,
  });
  const [paused, setPaused] = useState(false);

  const testimonials = testimonialsData?.data ?? [];
  const doubled = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-32 bg-[#0D0C0A] overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="font-mono text-[10px] tracking-[0.3em] text-[#C4622D] uppercase block mb-6">
            Student Voices
          </span>
          <h2
            className="font-display font-bold text-[#F0EBE1] leading-[1.05] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Heard From<br />Our Students
          </h2>
        </motion.div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-[#C4622D]" />
        </div>
      ) : testimonials.length > 0 ? (
        /* Infinite horizontal scroll — Aceternity InfiniteMovingCards pattern */
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Edge fades */}
          <div
            className="absolute left-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #0D0C0A, transparent)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #0D0C0A, transparent)" }}
          />

          <div
            className="flex gap-px"
            style={{
              animation: paused ? "none" : "marquee 50s linear infinite",
              width: "max-content",
              backgroundColor: "#2A2522",
            }}
          >
            {doubled.map((testimonial, index) => (
              <div
                key={`${testimonial._id}-${index}`}
                className="w-[340px] flex-shrink-0 bg-[#0D0C0A] px-8 py-10 flex flex-col hover:bg-[#141210] transition-colors duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-[#C4622D] text-[#C4622D]"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[#A39E95] text-sm leading-relaxed mb-auto line-clamp-5 pb-8">
                  &ldquo;{testimonial.description}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-6 border-t border-[#2A2522]">
                  <img
                    src={testimonial.image.url}
                    alt={testimonial.name}
                    className="w-8 h-8 object-cover grayscale flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-display font-semibold text-sm text-[#F0EBE1] tracking-[-0.01em] truncate">
                      {testimonial.name}
                    </p>
                    <p className="font-mono text-[9px] text-[#6B6660] mt-0.5 tracking-[0.08em] truncate">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="border border-[#2A2522] p-16 text-center">
            <p className="font-mono text-sm text-[#6B6660]">No testimonials yet</p>
          </div>
        </div>
      )}
    </section>
  );
};
