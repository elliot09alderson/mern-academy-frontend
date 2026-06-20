import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, FileText } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

const curriculumOptions = [
  {
    id: '1',
    title: 'MERN Stack + AI Course',
    subtitle: 'Full Stack · 6 Months',
    filename: 'mern-stack-ai-course.pdf',
  },
  {
    id: '2',
    title: 'DSA Placement Readiness',
    subtitle: 'Algorithms · Problem Solving',
    filename: 'dsa-placement-syllabus.pdf',
  },
  {
    id: '3',
    title: 'Gen AI Curriculum',
    subtitle: 'AI Tools · Automation · 4 Months',
    filename: 'gen-ai-curriculum.pdf',
  },
];

interface CurriculumBubbleMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CurriculumBubbleMenu = ({ isOpen, onClose }: CurriculumBubbleMenuProps) => {
  const handleDownload = async (filename: string, title: string) => {
    try {
      const response = await fetch(`/docs/${encodeURIComponent(filename)}`);
      if (!response.ok) {
        alert(`Unable to download ${title}. Please try again later.`);
        return;
      }
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 100);
    } catch {
      alert(`Unable to download ${title}. Please try again later.`);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-[#0D0C0A]/90 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
          >
            <div className="relative pointer-events-auto w-full max-w-3xl">

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute -top-3 -right-3 z-10 w-9 h-9 flex items-center justify-center border border-[#2A2522] bg-[#0D0C0A] text-[#6B6660] hover:text-[#F0EBE1] hover:border-[#C4622D]/40 transition-colors duration-200"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, ease }}
                className="mb-10"
              >
                <span className="font-mono text-[10px] tracking-[0.3em] text-[#C4622D] uppercase block mb-3">
                  Curriculum
                </span>
                <h3
                  className="font-display font-bold text-[#F0EBE1] leading-[1.05] tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
                >
                  Download Curriculum
                </h3>
              </motion.div>

              {/* Cards */}
              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-px"
                style={{ backgroundColor: '#2A2522' }}
              >
                {curriculumOptions.map((option, index) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4, delay: index * 0.08, ease }}
                    onClick={() => handleDownload(option.filename, option.title)}
                    className="bg-[#0D0C0A] hover:bg-[#141210] group cursor-pointer p-10 flex flex-col justify-between transition-colors duration-300 relative overflow-hidden"
                  >
                    {/* Index */}
                    <span className="font-mono text-[9px] text-[#2A2522] group-hover:text-[#3A3330] tracking-[0.15em] mb-6 transition-colors duration-300">
                      0{index + 1}
                    </span>

                    {/* Icon */}
                    <div className="mb-8">
                      <FileText className="h-8 w-8 text-[#C4622D] opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Title */}
                    <div className="mb-8">
                      <h4 className="font-display font-bold text-[#F0EBE1] text-lg tracking-[-0.02em] leading-snug mb-1">
                        {option.title}
                      </h4>
                      <p className="font-mono text-[9px] text-[#6B6660] tracking-[0.1em] uppercase">
                        {option.subtitle}
                      </p>
                    </div>

                    {/* Download CTA */}
                    <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.15em] uppercase text-[#C4622D] group-hover:text-[#D4723D] transition-colors duration-200">
                      <Download className="h-3.5 w-3.5 group-hover:translate-y-0.5 transition-transform duration-200" />
                      Download PDF
                    </div>

                    {/* Hover border accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-[#C4622D] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="font-mono text-[9px] text-[#6B6660] tracking-[0.1em] mt-6 text-center"
              >
                Click any card to download the course curriculum
              </motion.p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
