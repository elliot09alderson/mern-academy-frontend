import React from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useGetEventsQuery } from '@/store/api/eventApi';
import { Loader2, Calendar, MapPin, Users } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

const categories = ["All", "Academic", "Cultural", "Sports", "Technical", "Workshop", "Seminar", "Other"];

export const Gallery = () => {
  const { data: eventsData, isLoading } = useGetEventsQuery({ page: 1, limit: 100 });
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredEvents = React.useMemo(() => {
    if (!eventsData?.data) return [];
    if (selectedCategory === "All") return eventsData.data;
    return eventsData.data.filter((event: any) => event.category === selectedCategory);
  }, [eventsData, selectedCategory]);

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
                Events &amp; Moments
              </span>
              <h1
                className="font-display font-bold text-[#F0EBE1] leading-[1.05] tracking-[-0.03em] mb-8"
                style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
              >
                Our<br />Gallery
              </h1>
              <p className="text-[#6B6660] text-sm leading-relaxed max-w-lg">
                Explore our journey through workshops, events, and achievements.
                See how we're shaping the future of tech education.
              </p>
            </motion.div>

            {/* Category filter */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="mt-14 flex flex-wrap gap-2"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`font-mono text-[10px] tracking-[0.15em] uppercase px-5 py-2.5 border transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-[#C4622D] border-[#C4622D] text-[#F0EBE1]'
                      : 'border-[#2A2522] text-[#6B6660] hover:border-[#C4622D]/40 hover:text-[#A39E95]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="pb-28 px-6 lg:px-8 bg-[#141210]">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center py-28">
                <Loader2 className="h-6 w-6 animate-spin text-[#C4622D]" />
              </div>
            ) : filteredEvents.length > 0 ? (
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px pt-px"
                style={{ backgroundColor: '#2A2522' }}
              >
                {filteredEvents.map((event: any, index: number) => (
                  <motion.div
                    key={event._id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease }}
                    className="bg-[#141210] group hover:bg-[#1C1916] transition-colors duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden h-56">
                      <img
                        src={event.image.url}
                        alt={event.eventName}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 scale-[1.04] group-hover:scale-100 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-transparent opacity-60" />

                      {/* Category tag */}
                      <span className="absolute top-4 left-4 font-mono text-[9px] text-[#6B6660] border border-[#2A2522] bg-[#141210]/80 px-2.5 py-1.5 tracking-[0.12em] uppercase">
                        {event.category}
                      </span>
                      {event.isFeatured && (
                        <span className="absolute top-4 right-4 font-mono text-[9px] text-[#C4622D] border border-[#C4622D]/40 bg-[#141210]/80 px-2.5 py-1.5 tracking-[0.12em] uppercase">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="font-display font-bold text-[#F0EBE1] text-lg tracking-[-0.02em] mb-3 leading-snug">
                        {event.eventName}
                      </h3>
                      <p className="text-[#6B6660] text-sm leading-relaxed mb-6 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="mt-auto space-y-2.5 pt-5 border-t border-[#2A2522]">
                        <div className="flex items-center gap-2.5 text-sm text-[#6B6660]">
                          <Calendar className="h-3.5 w-3.5 text-[#C4622D] flex-shrink-0" />
                          <span className="font-mono text-[10px] tracking-[0.06em]">
                            {new Date(event.startDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <MapPin className="h-3.5 w-3.5 text-[#C4622D] flex-shrink-0" />
                          <span className="font-mono text-[10px] text-[#6B6660] tracking-[0.06em]">{event.venue}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Users className="h-3.5 w-3.5 text-[#C4622D] flex-shrink-0" />
                          <span className="font-mono text-[10px] text-[#6B6660] tracking-[0.06em]">
                            {event.registeredParticipants.length}
                            {event.maxParticipants ? ` / ${event.maxParticipants}` : ''} participants
                          </span>
                        </div>
                      </div>

                      {event.registrationLink && (
                        <a
                          href={event.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 font-mono text-[10px] text-[#C4622D] tracking-[0.15em] uppercase hover:opacity-70 transition-opacity duration-200 self-start"
                        >
                          Register Now →
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="border border-[#2A2522] p-16 text-center">
                <p className="font-mono text-sm text-[#6B6660]">
                  {selectedCategory === 'All'
                    ? 'No events available at the moment. Check back soon!'
                    : `No ${selectedCategory} events found.`}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;
