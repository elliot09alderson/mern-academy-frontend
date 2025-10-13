import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Wifi, 
  Car, 
  Coffee, 
  Users, 
  Monitor,
  BookOpen,
  Shield,
  Navigation as NavigationIcon
} from 'lucide-react';

export const Branches = () => {
  const branches = [
    {
      id: 1,
      name: "MERN Academy - Delhi Main Campus",
      address: "Plot No. 45, Sector 18, Noida, Uttar Pradesh 201301",
      phone: "+91 98765 43210",
      email: "delhi@mernacademy.com",
      timing: "Mon-Fri: 9:00 AM - 8:00 PM, Sat: 9:00 AM - 6:00 PM",
      image: "/api/placeholder/600/400",
      facilities: [
        "50+ Lab Computers",
        "High-Speed Wi-Fi",
        "Air Conditioned Rooms",
        "Parking Facility",
        "Cafeteria",
        "Library",
        "24/7 Security",
        "Career Counseling"
      ],
      capacity: "120 Students",
      established: "2020",
      isHeadquarters: true
    },
    {
      id: 2,
      name: "MERN Academy - Bangalore Tech Hub",
      address: "3rd Floor, Tech Park Building, Electronic City, Bangalore 560100",
      phone: "+91 98765 43211",
      email: "bangalore@mernacademy.com",
      timing: "Mon-Fri: 8:30 AM - 8:30 PM, Sat: 9:00 AM - 5:00 PM",
      image: "/api/placeholder/600/400",
      facilities: [
        "40+ Lab Computers",
        "High-Speed Wi-Fi",
        "Modern Workstations",
        "Parking Facility",
        "Break Room",
        "Project Rooms",
        "24/7 Security",
        "Industry Mentorship"
      ],
      capacity: "80 Students",
      established: "2022",
      isHeadquarters: false
    },
    {
      id: 3,
      name: "MERN Academy - Pune Innovation Center",
      address: "Floor 2, IT Tower, Hinjewadi Phase 2, Pune, Maharashtra 411057",
      phone: "+91 98765 43212",
      email: "pune@mernacademy.com",
      timing: "Mon-Fri: 9:00 AM - 7:30 PM, Sat: 10:00 AM - 4:00 PM",
      image: "/api/placeholder/600/400",
      facilities: [
        "35+ Lab Computers",
        "High-Speed Wi-Fi",
        "Smart Classrooms",
        "Metro Connectivity",
        "Food Court Nearby",
        "Study Areas",
        "Security Systems",
        "Placement Cell"
      ],
      capacity: "60 Students",
      established: "2023",
      isHeadquarters: false
    }
  ];

  const facilityIcons = {
    "High-Speed Wi-Fi": Wifi,
    "Parking Facility": Car,
    "Cafeteria": Coffee,
    "Food Court Nearby": Coffee,
    "Break Room": Coffee,
    "Library": BookOpen,
    "Study Areas": BookOpen,
    "Project Rooms": Users,
    "24/7 Security": Shield,
    "Security Systems": Shield,
    "Career Counseling": Users,
    "Industry Mentorship": Users,
    "Placement Cell": Users
  };

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
                  Branches
                </span>
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Learn from the best at our state-of-the-art facilities across India. 
              Each branch is equipped with modern infrastructure and experienced faculty.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{branches.length}</div>
                <div className="text-muted-foreground">Active Branches</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">260+</div>
                <div className="text-muted-foreground">Total Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">125+</div>
                <div className="text-muted-foreground">Lab Computers</div>
              </div>
            </div>
          </div>
        </section>

        {/* Branches Section */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-12">
              {branches.map((branch) => (
                <Card key={branch.id} className="glass-card border-0 hover-lift overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative">
                      <img
                        src={branch.image}
                        alt={branch.name}
                        className="w-full h-64 lg:h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent lg:bg-gradient-to-r" />
                      
                      {/* Headquarters Badge */}
                      {branch.isHeadquarters && (
                        <Badge className="absolute top-4 left-4 gradient-primary text-white">
                          Headquarters
                        </Badge>
                      )}
                      
                      {/* Established Badge */}
                      <Badge className="absolute top-4 right-4 glass-card">
                        Est. {branch.established}
                      </Badge>
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                      <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-2xl font-bold mb-4">
                          {branch.name}
                        </CardTitle>
                        
                        {/* Contact Info */}
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{branch.address}</span>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-primary" />
                            <span className="text-muted-foreground">{branch.phone}</span>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-primary" />
                            <span className="text-muted-foreground">{branch.email}</span>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{branch.timing}</span>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="p-0">
                        {/* Capacity Info */}
                        <div className="flex items-center gap-6 mb-6">
                          <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" />
                            <span className="font-medium">{branch.capacity}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Monitor className="h-5 w-5 text-primary" />
                            <span className="font-medium">Modern Labs</span>
                          </div>
                        </div>

                        {/* Facilities */}
                        <div className="mb-6">
                          <h4 className="font-semibold mb-3">Facilities & Amenities</h4>
                          <div className="grid grid-cols-2 gap-3">
                            {branch.facilities.map((facility) => {
                              const IconComponent = facilityIcons[facility] || Monitor;
                              return (
                                <div key={facility} className="flex items-center gap-2">
                                  <IconComponent className="h-4 w-4 text-primary" />
                                  <span className="text-sm text-muted-foreground">{facility}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button className="gradient-primary text-white">
                            <NavigationIcon className="h-4 w-4 mr-2" />
                            Get Directions
                          </Button>
                          <Button variant="outline" className="glass-card">
                            <Phone className="h-4 w-4 mr-2" />
                            Contact Branch
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Visit Our <span className="gradient-text">Campuses</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Experience our world-class facilities firsthand. Book a campus tour or 
              attend a demo class to see why students choose MERN Academy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-primary text-white">
                Book Campus Tour
              </Button>
              <Button size="lg" variant="outline" className="glass-card">
                Attend Demo Class
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Branches;