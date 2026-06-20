import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCreateInquiryMutation } from "@/store/api/inquiryApi";
import { useToast } from "@/hooks/use-toast";

const ease = [0.16, 1, 0.3, 1] as const;

const inputClass =
  "w-full bg-transparent border-b border-[#2A2522] focus:border-[#C4622D] text-[#F0EBE1] placeholder:text-[#6B6660] py-3.5 text-sm outline-none transition-colors duration-200 font-mono tracking-[0.03em]";

export const NewsletterSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    hereAboutUs: "",
    message: "",
  });

  const [createInquiry, { isLoading }] = useCreateInquiryMutation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createInquiry(formData).unwrap();
      toast({
        title: "Inquiry received.",
        description: "We'll get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        qualification: "",
        hereAboutUs: "",
        message: "",
      });
    } catch (error: any) {
      toast({
        title: "Submission failed",
        description: error?.data?.message || "Please try again.",
        variant: "destructive",
      });
    }
  };

  const set = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <section id="course-info" className="py-32 px-6 lg:px-8 bg-[#141210]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#C4622D] uppercase block mb-6">
              Inquire
            </span>
            <h2
              className="font-display font-bold text-[#F0EBE1] leading-[1.05] tracking-[-0.03em] mb-8"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Get Course<br />Information
            </h2>
            <p className="text-[#6B6660] text-sm leading-relaxed mb-12">
              Share your details and we'll get back to you with everything you
              need to know about our placement-oriented programs.
            </p>

            <div className="border-t border-[#2A2522] pt-10 space-y-5">
              {[
                { label: "Email",    value: "info@mernacademy.com" },
                { label: "Phone",    value: "+91 8770800807"       },
                { label: "Location", value: "Bhilai · Bangalore · Hyderabad · Online" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-8">
                  <span className="font-mono text-[9px] text-[#6B6660] tracking-[0.2em] uppercase w-20 flex-shrink-0">
                    {item.label}
                  </span>
                  <span className="text-[#A39E95] text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <form onSubmit={handleSubmit} className="space-y-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                <input
                  placeholder="Full Name *"
                  required
                  value={formData.name}
                  onChange={(e) => set("name", e.target.value)}
                  className={`${inputClass} mb-8`}
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  required
                  value={formData.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={`${inputClass} mb-8`}
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  required
                  value={formData.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className={`${inputClass} mb-8`}
                />
                <input
                  placeholder="Qualification *"
                  required
                  value={formData.qualification}
                  onChange={(e) => set("qualification", e.target.value)}
                  className={`${inputClass} mb-8`}
                />
              </div>

              <select
                required
                value={formData.hereAboutUs}
                onChange={(e) => set("hereAboutUs", e.target.value)}
                className={`${inputClass} mb-8 appearance-none`}
                style={{ backgroundColor: "transparent" }}
              >
                <option value="" disabled>
                  How did you hear about us? *
                </option>
                <option value="linkedin">LinkedIn</option>
                <option value="friend">Friend / Referral</option>
                <option value="college">College / University</option>
                <option value="poster">Poster / Advertisement</option>
                <option value="website">Website / Search Engine</option>
                <option value="googlemap">Google Maps</option>
                <option value="other">Other</option>
              </select>

              <textarea
                placeholder="Message (optional)"
                rows={3}
                value={formData.message}
                onChange={(e) => set("message", e.target.value)}
                className={`${inputClass} mb-10 resize-none`}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full group flex items-center justify-between bg-[#C4622D] hover:bg-[#D4723D] disabled:opacity-50 text-[#F0EBE1] px-8 py-4 font-display font-semibold text-sm tracking-[0.06em] transition-all duration-200"
              >
                {isLoading ? "Submitting…" : "Get Course Information"}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <p className="font-mono text-[9px] text-[#6B6660] text-center mt-6 tracking-[0.1em]">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
