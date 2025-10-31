import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGetEventsQuery } from '@/store/api/eventApi';
import { Loader2, Calendar, MapPin, Users } from 'lucide-react';

export const Gallery = () => {
  const { data: eventsData, isLoading } = useGetEventsQuery({ page: 1, limit: 100 });

  const categories = ["All", "Academic", "Cultural", "Sports", "Technical", "Workshop", "Seminar", "Other"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredEvents = React.useMemo(() => {
    if (!eventsData?.data) return [];

    if (selectedCategory === "All") {
      return eventsData.data;
    }

    return eventsData.data.filter(event => event.category === selectedCategory);
  }, [eventsData, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Header Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our{' '}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 blur-md opacity-10" />
                <span className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Gallery
                </span>
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Explore our journey through workshops, events, and achievements. 
              See how we're shaping the future of tech education.
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer px-6 py-2 text-sm transition-smooth ${
                    selectedCategory === category 
                      ? "gradient-primary text-white" 
                      : "glass-card hover:bg-primary/10"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-violet-500" />
              </div>
            ) : filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <Card key={event._id} className="glass-card border-0 group hover-lift cursor-pointer overflow-hidden">
                    <div className="relative overflow-hidden">
                      <img
                        src={event.image.url}
                        alt={event.eventName}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-smooth"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                      <Badge className="absolute top-4 left-4 gradient-primary text-white">
                        {event.category}
                      </Badge>
                      {event.isFeatured && (
                        <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                          Featured
                        </Badge>
                      )}
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-3 group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-smooth">
                        {event.eventName}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 text-violet-500" />
                          <span>{new Date(event.startDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 text-purple-500" />
                          <span>{event.venue}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4 text-pink-500" />
                          <span>
                            {event.registeredParticipants.length}
                            {event.maxParticipants ? ` / ${event.maxParticipants}` : ''} participants
                          </span>
                        </div>
                      </div>

                      {event.registrationLink && (
                        <div className="mt-4">
                          <a
                            href={event.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-violet-600 hover:text-violet-700 font-medium"
                          >
                            Register Now →
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">
                  {selectedCategory === "All"
                    ? "No events available at the moment. Check back soon!"
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