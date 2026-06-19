import React from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import {
  MapPin, Phone, Mail, Clock, Wifi, Car, Coffee, Users,
  Monitor, BookOpen, Shield, Navigation as NavigationIcon,
  Image as ImageIcon, Loader2, Snowflake, Presentation,
  Trophy, Bed, Heart, Projector
} from 'lucide-react';
import { useGetBranchesQuery } from '@/store/api/branchApi';

const ease = [0.16, 1, 0.3, 1] as const;

const facilityIcons: Record<string, any> = {
  "50+ Lab Computers": Monitor,
  "High-Speed Wi-Fi": Wifi,
  "Air Conditioned Rooms": Snowflake,
  "Parking Facility": Car,
  "Cafeteria": Coffee,
  "Library": BookOpen,
  "24/7 Security": Shield,
  "Career Counseling": Users,
  "Projector Rooms": Projector,
  "Conference Hall": Presentation,
  "Sports Facility": Trophy,
  "Hostel": Bed,
  "Medical Room": Heart,
  "Food Court Nearby": Coffee,
  "Break Room": Coffee,
  "Study Areas": BookOpen,
  "Project Rooms": Users,
  "Security Systems": Shield,
  "Industry Mentorship": Users,
  "Placement Cell": Users,
};

export const Branches = () => {
  const { data: branchesData, isLoading, error } = useGetBranchesQuery({ page: 1, limit: 50 });

  const branches = branchesData?.data || [];
  const totalCapacity = branches.reduce((sum, branch) => sum + branch.totalSeats, 0);
  const totalComputers = branches.reduce((sum, branch) => {
    const computerFacility = branch.facilities?.find((f: string) => f.includes('Lab Computers'));
    if (computerFacility) {
      const match = computerFacility.match(/(\d+)/);
      return sum + (match ? parseInt(match[1]) : 0);
    }
    return sum;
  }, 0);

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
                Locations
              </span>
              <h1
                className="font-display font-bold text-[#F0EBE1] leading-[1.05] tracking-[-0.03em] mb-8"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
              >
                Our<br />Branches
              </h1>
              <p className="text-[#6B6660] text-sm leading-relaxed max-w-lg">
                Learn from the best at our state-of-the-art facilities across India.
                Each branch is equipped with modern infrastructure and experienced faculty.
              </p>
            </motion.div>

            {/* Stats bar */}
            {!isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease }}
                className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px"
                style={{ backgroundColor: '#2A2522' }}
              >
                {[
                  { value: String(branches.length), label: 'Active Branches' },
                  { value: `${totalCapacity}+`,     label: 'Total Capacity' },
                  { value: `${totalComputers}+`,    label: 'Lab Computers' },
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

        {/* Branches list */}
        <section className="pb-28 px-6 lg:px-8 bg-[#141210]">
          <div className="max-w-7xl mx-auto">
            {isLoading && (
              <div className="flex justify-center py-28">
                <Loader2 className="h-6 w-6 animate-spin text-[#C4622D]" />
              </div>
            )}

            {error && (
              <div className="border border-[#2A2522] p-16 text-center">
                <p className="font-mono text-sm text-[#6B6660]">Failed to load branches. Please try again later.</p>
              </div>
            )}

            {!isLoading && !error && branches.length === 0 && (
              <div className="border border-[#2A2522] p-16 text-center">
                <MapPin className="h-10 w-10 text-[#2A2522] mx-auto mb-4" />
                <p className="font-mono text-sm text-[#6B6660]">No branches available yet</p>
                <p className="font-mono text-[10px] text-[#6B6660] mt-1 tracking-[0.06em]">Check back soon for new locations</p>
              </div>
            )}

            {!isLoading && !error && branches.length > 0 && (
              <div className="space-y-px" style={{ backgroundColor: '#2A2522' }}>
                {branches.map((branch, index) => (
                  <motion.div
                    key={branch._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, delay: index * 0.08, ease }}
                    className="bg-[#141210] grid grid-cols-1 lg:grid-cols-2 group hover:bg-[#1C1916] transition-colors duration-300"
                  >
                    {/* Image */}
                    <div className="overflow-hidden h-64 lg:h-auto relative">
                      {branch.images && branch.images.length > 0 ? (
                        <img
                          src={branch.images[0].url}
                          alt={branch.branchName}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-[1.04] group-hover:scale-100 transition-all duration-700"
                        />
                      ) : (
                        <div className="w-full h-full min-h-[16rem] bg-[#1C1916] flex items-center justify-center">
                          <ImageIcon className="h-16 w-16 text-[#2A2522]" />
                        </div>
                      )}

                      {/* Badges */}
                      {branch.isHeadquarters && (
                        <span className="absolute top-4 left-4 font-mono text-[9px] text-[#6B6660] border border-[#2A2522] bg-[#141210] px-2.5 py-1.5 tracking-[0.15em] uppercase">
                          Headquarters
                        </span>
                      )}
                      {branch.establishedYear && (
                        <span className="absolute top-4 right-4 font-mono text-[9px] text-[#6B6660] border border-[#2A2522] bg-[#141210] px-2.5 py-1.5 tracking-[0.08em]">
                          Est. {branch.establishedYear}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-10 lg:p-14">
                      <h3 className="font-display font-bold text-[#F0EBE1] text-2xl tracking-[-0.025em] mb-6">
                        {branch.branchName}
                      </h3>

                      {/* Contact */}
                      <div className="space-y-3 mb-8 text-sm text-[#6B6660]">
                        {branch.address?.fullAddress && (
                          <p className="flex items-start gap-3">
                            <MapPin className="h-4 w-4 text-[#C4622D] flex-shrink-0 mt-0.5" />
                            {branch.address.fullAddress}
                          </p>
                        )}
                        {branch.contactInfo?.phone && (
                          <p className="flex items-center gap-3">
                            <Phone className="h-4 w-4 text-[#C4622D] flex-shrink-0" />
                            {branch.contactInfo.phone}
                          </p>
                        )}
                        {branch.contactInfo?.email && (
                          <p className="flex items-center gap-3">
                            <Mail className="h-4 w-4 text-[#C4622D] flex-shrink-0" />
                            {branch.contactInfo.email}
                          </p>
                        )}
                        {branch.operatingHours && (
                          <p className="flex items-start gap-3">
                            <Clock className="h-4 w-4 text-[#C4622D] flex-shrink-0 mt-0.5" />
                            <span>
                              {branch.operatingHours.weekdays}
                              {branch.operatingHours.weekends && (
                                <><br />{branch.operatingHours.weekends}</>
                              )}
                            </span>
                          </p>
                        )}
                      </div>

                      {/* Capacity */}
                      <div className="flex items-center gap-6 mb-8 pb-8 border-b border-[#2A2522]">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-[#C4622D]" />
                          <span className="font-mono text-[10px] text-[#A39E95] tracking-[0.06em]">{branch.totalSeats} Students</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Monitor className="h-4 w-4 text-[#C4622D]" />
                          <span className="font-mono text-[10px] text-[#A39E95] tracking-[0.06em]">Modern Labs</span>
                        </div>
                      </div>

                      {/* Facilities */}
                      {branch.facilities && branch.facilities.length > 0 && (
                        <div className="mb-8">
                          <p className="font-mono text-[9px] text-[#6B6660] tracking-[0.2em] uppercase mb-4">Facilities</p>
                          <div className="flex flex-wrap gap-2">
                            {branch.facilities.map((facility: string, i: number) => {
                              const IconComponent = facilityIcons[facility] || Monitor;
                              return (
                                <span
                                  key={i}
                                  className="font-mono text-[9px] text-[#6B6660] border border-[#2A2522] px-3 py-1.5 tracking-[0.06em] flex items-center gap-1.5"
                                >
                                  <IconComponent className="h-3 w-3 text-[#C4622D]" />
                                  {facility}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button className="font-display font-semibold text-sm tracking-[0.04em] bg-[#C4622D] hover:bg-[#D4723D] text-[#F0EBE1] px-6 py-3 transition-colors duration-200 flex items-center gap-2">
                          <NavigationIcon className="h-4 w-4" />
                          Get Directions
                        </button>
                        {branch.contactInfo?.phone && (
                          <button className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#C4622D] border border-[#C4622D]/40 hover:border-[#C4622D] px-6 py-3 transition-colors duration-200 flex items-center gap-2">
                            <Phone className="h-3.5 w-3.5" />
                            Contact Branch
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
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
                  Visit Us
                </span>
                <h2
                  className="font-display font-bold text-[#F0EBE1] leading-[1.05] tracking-[-0.03em]"
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
                >
                  Experience Our<br />Campuses Firsthand
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                <button
                  onClick={() => document.getElementById('course-info')?.scrollIntoView({ behavior: 'smooth' })}
                  className="font-display font-semibold text-sm tracking-[0.06em] bg-[#C4622D] hover:bg-[#D4723D] text-[#F0EBE1] px-8 py-4 transition-colors duration-200"
                >
                  Book Campus Tour
                </button>
                <button className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#C4622D] border border-[#C4622D]/40 hover:border-[#C4622D] px-8 py-4 transition-colors duration-200">
                  Attend Demo Class
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

export default Branches;
