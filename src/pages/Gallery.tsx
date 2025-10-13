import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const Gallery = () => {
  const galleryItems = [
    {
      id: 1,
      title: "Full Stack Development Workshop",
      category: "Workshop",
      image: "/api/placeholder/400/300",
      description: "Students working on MERN stack projects"
    },
    {
      id: 2,
      title: "AI Tools Training Session",
      category: "Training",
      image: "/api/placeholder/400/300",
      description: "Learning modern AI development tools"
    },
    {
      id: 3,
      title: "System Design Bootcamp",
      category: "Bootcamp",
      image: "/api/placeholder/400/300",
      description: "Advanced system design concepts"
    },
    {
      id: 4,
      title: "Placement Success Celebration",
      category: "Event",
      image: "/api/placeholder/400/300",
      description: "Celebrating student achievements"
    },
    {
      id: 5,
      title: "DSA Problem Solving",
      category: "Training",
      image: "/api/placeholder/400/300",
      description: "Data structures and algorithms practice"
    },
    {
      id: 6,
      title: "Industry Expert Session",
      category: "Workshop",
      image: "/api/placeholder/400/300",
      description: "Guest lecture from industry professionals"
    },
    {
      id: 7,
      title: "Project Presentation Day",
      category: "Event",
      image: "/api/placeholder/400/300",
      description: "Students showcasing their final projects"
    },
    {
      id: 8,
      title: "Hackathon 2024",
      category: "Event",
      image: "/api/placeholder/400/300",
      description: "48-hour coding challenge"
    },
    {
      id: 9,
      title: "Web Development Masterclass",
      category: "Training",
      image: "/api/placeholder/400/300",
      description: "Advanced web development techniques"
    }
  ];

  const categories = ["All", "Workshop", "Training", "Event", "Bootcamp"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredItems = selectedCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Header Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Gallery</span>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <Card key={item.id} className="glass-card border-0 group hover-lift cursor-pointer">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-smooth"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                    <Badge className="absolute top-4 left-4 gradient-primary text-white">
                      {item.category}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 group-hover:gradient-text transition-smooth">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;