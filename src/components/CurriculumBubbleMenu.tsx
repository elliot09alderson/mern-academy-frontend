import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CurriculumOption {
  id: string;
  title: string;
  filename: string;
  icon: string;
  color: string;
}

const curriculumOptions: CurriculumOption[] = [
  {
    id: '1',
    title: 'MERN Stack + AI Course',
    filename: 'mern-stack-ai-course.pdf',
    icon: '🚀',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: '2',
    title: 'DSA Placement Readiness',
    filename: 'dsa-placement-syllabus.pdf',
    icon: '📚',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: '3',
    title: 'Gen AI Curriculum',
    filename: 'gen-ai-curriculum.pdf',
    icon: '🤖',
    color: 'from-emerald-500 to-teal-500'
  }
];

interface CurriculumBubbleMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CurriculumBubbleMenu = ({ isOpen, onClose }: CurriculumBubbleMenuProps) => {
  const handleDownload = async (filename: string, title: string) => {
    try {
      // First, try to fetch the file to check if it exists
      const response = await fetch(`/docs/${encodeURIComponent(filename)}`);

      if (!response.ok) {
        console.error(`File not found: ${filename}`);
        alert(`Unable to download ${title}. Please try again later.`);
        return;
      }

      // Get the blob from the response
      const blob = await response.blob();

      // Create a blob URL
      const blobUrl = window.URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;

      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the blob URL
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 100);

      console.log(`Downloading: ${title}`);
    } catch (error) {
      console.error('Download error:', error);
      alert(`Unable to download ${title}. Please try again later.`);
    }
  };

  const bubbleVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      y: 20
    },
    visible: (custom: number) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: custom * 0.1
      }
    }),
    exit: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Bubble Menu Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative pointer-events-auto">
              {/* Close Button */}
              <motion.button
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                onClick={onClose}
                className="absolute -top-4 -right-4 z-10 w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </motion.button>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center mb-8"
              >
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Download Curriculum
                </h3>
                <p className="text-muted-foreground mt-2">Choose your course to download</p>
              </motion.div>

              {/* Bubble Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {curriculumOptions.map((option, index) => (
                  <motion.div
                    key={option.id}
                    custom={index}
                    variants={bubbleVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDownload(option.filename, option.title)}
                    className="cursor-pointer"
                  >
                    <div className={`relative glass-card p-6 rounded-2xl border-0 overflow-hidden group hover:shadow-2xl transition-all duration-300`}>
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-10 group-hover:opacity-20 transition-opacity`} />

                      {/* Content */}
                      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                        {/* Icon */}
                        <div className="text-6xl mb-2 transform group-hover:scale-110 transition-transform">
                          {option.icon}
                        </div>

                        {/* Title */}
                        <h4 className="font-bold text-lg min-h-[3rem] flex items-center">
                          {option.title}
                        </h4>

                        {/* Download Button */}
                        <Button
                          size="sm"
                          className={`bg-gradient-to-r ${option.color} text-white border-0 group-hover:shadow-lg transition-shadow`}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      </div>

                      {/* Decorative Elements */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-2xl" />
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-xl" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Helper Text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center text-sm text-muted-foreground mt-6"
              >
                Click on any card to download the course curriculum
              </motion.p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
