import React from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Loader2, Award, Briefcase, Building2, Code2 } from 'lucide-react';
import { useGetOutstandingStudentsQuery } from '@/store/api/outstandingStudentApi';

const ease = [0.16, 1, 0.3, 1] as const;

export const Students = () => {
  const { data: studentsData, isLoading, error } = useGetOutstandingStudentsQuery({ isActive: true });

  return (
    <div className="min-h-screen bg-[#0D0C0A]">
      <Navigation />

      <main className="pt-20">
        {/* Header */}
        <section className="py-28 px-6 lg:px-8 bg-[#0D0C0A]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#C4622D] uppercase block mb-6">
                Alumni
              </span>
              <h1
                className="font-display font-bold text-[#F0EBE1] leading-[1.05] tracking-[-0.03em] mb-8"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
              >
                Outstanding<br />Students
              </h1>
              <p className="text-[#6B6660] text-sm leading-relaxed max-w-lg">
                Meet the performers who have gone on to build careers at the world's leading companies.
                These success stories define our teaching methodology.
              </p>
            </motion.div>

            {/* Stats bar */}
            {studentsData && studentsData.data.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease }}
                className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px"
                style={{ backgroundColor: '#2A2522' }}
              >
                {[
                  { value: `${studentsData.count}+`, label: 'Students Placed' },
                  { value: '25+',                    label: 'Partner Companies' },
                  { value: '100%',                   label: 'Placement Rate' },
                  { value: '12 LPA',                 label: 'Avg Package' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-[#0D0C0A] px-8 py-8">
                    <p className="font-display font-bold text-[#F0EBE1] text-3xl tracking-[-0.04em] mb-1">
                      {stat.value}
                    </p>
                    <p className="font-mono text-[9px] text-[#6B6660] tracking-[0.15em] uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Students Grid */}
        <section className="pb-28 px-6 lg:px-8 bg-[#141210]">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center py-28">
                <Loader2 className="h-6 w-6 animate-spin text-[#C4622D]" />
              </div>
            ) : error ? (
              <div className="border border-[#2A2522] p-16 text-center">
                <p className="font-mono text-sm text-[#6B6660]">Failed to load students. Please try again later.</p>
              </div>
            ) : studentsData && studentsData.data.length > 0 ? (
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px pt-px"
                style={{ backgroundColor: '#2A2522' }}
              >
                {studentsData.data.map((student, index) => (
                  <motion.div
                    key={student._id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease }}
                    className="bg-[#141210] group hover:bg-[#1C1916] transition-colors duration-300 relative overflow-hidden flex flex-col"
                  >
                    {/* Rank */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="font-mono text-[9px] text-[#6B6660] border border-[#2A2522] bg-[#141210] px-2.5 py-1.5 tracking-[0.15em] group-hover:border-[#C4622D]/40 transition-colors duration-300">
                        #{student.rank}
                      </span>
                    </div>

                    {/* Photo */}
                    <div className="overflow-hidden h-64 relative">
                      <img
                        src={student.image.url}
                        alt={student.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-[1.04] group-hover:scale-100 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-transparent opacity-80" />
                    </div>

                    {/* Info */}
                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="font-display font-bold text-[#F0EBE1] text-xl tracking-[-0.025em] mb-1">
                        {student.name}
                      </h3>

                      <div className="flex items-center gap-2 mb-1">
                        <Building2 className="h-3.5 w-3.5 text-[#6B6660] flex-shrink-0" />
                        <span className="font-mono text-[10px] text-[#6B6660] tracking-[0.06em]">{student.college}</span>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <Briefcase className="h-3.5 w-3.5 text-[#C4622D] flex-shrink-0" />
                        <span className="text-sm text-[#A39E95]">
                          {student.role} <span className="text-[#6B6660]">at</span>{' '}
                          <span className="text-[#C4622D]">{student.company}</span>
                        </span>
                      </div>

                      {/* Package */}
                      <span className="font-mono text-[9px] text-[#6B6660] border border-[#2A2522] px-3 py-1.5 tracking-[0.1em] self-start mb-5">
                        {student.package}
                      </span>

                      {/* Skills */}
                      {student.skills?.length > 0 && (
                        <div className="mb-5">
                          <div className="flex items-center gap-2 mb-2.5">
                            <Code2 className="h-3.5 w-3.5 text-[#6B6660]" />
                            <span className="font-mono text-[9px] text-[#6B6660] tracking-[0.15em] uppercase">Skills</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {student.skills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="font-mono text-[9px] text-[#6B6660] border border-[#2A2522] px-2.5 py-1 tracking-[0.06em]"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Achievement */}
                      <div className="mt-auto pt-5 border-t border-[#2A2522]">
                        <div className="flex items-start gap-2.5">
                          <Award className="h-3.5 w-3.5 text-[#C4622D] flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-[#6B6660] leading-relaxed">{student.achievement}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="border border-[#2A2522] p-16 text-center">
                <Award className="h-10 w-10 text-[#2A2522] mx-auto mb-4" />
                <p className="font-mono text-sm text-[#6B6660]">No outstanding students found</p>
                <p className="font-mono text-[10px] text-[#6B6660] mt-1 tracking-[0.06em]">Check back later for our success stories</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-28 px-6 lg:px-8 bg-[#0D0C0A]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="border border-[#2A2522] p-14 lg:p-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10"
            >
              <div>
                <span className="font-mono text-[9px] text-[#C4622D] tracking-[0.25em] uppercase block mb-4">
                  Your Turn
                </span>
                <h2
                  className="font-display font-bold text-[#F0EBE1] leading-[1.05] tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
                >
                  Ready to Join<br />Our Success Stories?
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <button
                  onClick={() => document.getElementById('course-info')?.scrollIntoView({ behavior: 'smooth' })}
                  className="font-display font-semibold text-sm tracking-[0.06em] bg-[#C4622D] hover:bg-[#D4723D] text-[#F0EBE1] px-8 py-4 transition-colors duration-200"
                >
                  Enroll Now
                </button>
                <button className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C4622D] border border-[#C4622D]/40 hover:border-[#C4622D] px-8 py-4 transition-colors duration-200">
                  Download Brochure
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Students;
