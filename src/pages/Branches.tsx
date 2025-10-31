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
  Navigation as NavigationIcon,
  Image as ImageIcon,
  Loader2,
  Snowflake,
  Presentation,
  Trophy,
  Bed,
  Heart,
  Projector
} from 'lucide-react';
import { useGetBranchesQuery } from '@/store/api/branchApi';

export const Branches = () => {
  const { data: branchesData, isLoading, error } = useGetBranchesQuery({ page: 1, limit: 50 });

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
    // Additional common facilities
    "Food Court Nearby": Coffee,
    "Break Room": Coffee,
    "Study Areas": BookOpen,
    "Project Rooms": Users,
    "Security Systems": Shield,
    "Industry Mentorship": Users,
    "Placement Cell": Users
  };

  const branches = branchesData?.data || [];
  const totalCapacity = branches.reduce((sum, branch) => sum + branch.totalSeats, 0);
  const totalComputers = branches.reduce((sum, branch) => {
    const computerFacility = branch.facilities?.find(f => f.includes('Lab Computers'));
    if (computerFacility) {
      const match = computerFacility.match(/(\d+)/);
      return sum + (match ? parseInt(match[1]) : 0);
    }
    return sum;
  }, 0);

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
            {!isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{branches.length}</div>
                  <div className="text-muted-foreground">Active Branches</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{totalCapacity}+</div>
                  <div className="text-muted-foreground">Total Capacity</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{totalComputers}+</div>
                  <div className="text-muted-foreground">Lab Computers</div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Branches Section */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            )}

            {/* Error State */}
            {error && (
              <Card className="glass-card border-0 p-12 text-center">
                <p className="text-lg text-muted-foreground">Failed to load branches. Please try again later.</p>
              </Card>
            )}

            {/* No Branches State */}
            {!isLoading && !error && branches.length === 0 && (
              <Card className="glass-card border-0 p-12 text-center">
                <MapPin className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No branches available yet</p>
                <p className="text-muted-foreground mt-2">Check back soon for new locations</p>
              </Card>
            )}

            {/* Branches List */}
            {!isLoading && !error && branches.length > 0 && (
              <div className="space-y-12">
                {branches.map((branch) => (
                  <Card key={branch._id} className="glass-card border-0 hover-lift overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      {/* Image Section */}
                      <div className="relative">
                        {branch.images && branch.images.length > 0 ? (
                          <img
                            src={branch.images[0].url}
                            alt={branch.branchName}
                            className="w-full h-64 lg:h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-64 lg:h-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center">
                            <ImageIcon className="h-24 w-24 text-white opacity-50" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent lg:bg-gradient-to-r" />

                        {/* Headquarters Badge */}
                        {branch.isHeadquarters && (
                          <Badge className="absolute top-4 left-4 gradient-primary text-white">
                            Headquarters
                          </Badge>
                        )}

                        {/* Established Badge */}
                        {branch.establishedYear && (
                          <Badge className="absolute top-4 right-4 glass-card">
                            Est. {branch.establishedYear}
                          </Badge>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="p-8">
                        <CardHeader className="p-0 mb-6">
                          <CardTitle className="text-2xl font-bold mb-4">
                            {branch.branchName}
                          </CardTitle>

                          {/* Contact Info */}
                          <div className="space-y-3">
                            {branch.address?.fullAddress && (
                              <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{branch.address.fullAddress}</span>
                              </div>
                            )}

                            {branch.contactInfo?.phone && (
                              <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary" />
                                <span className="text-muted-foreground">{branch.contactInfo.phone}</span>
                              </div>
                            )}

                            {branch.contactInfo?.email && (
                              <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary" />
                                <span className="text-muted-foreground">{branch.contactInfo.email}</span>
                              </div>
                            )}

                            {branch.operatingHours && (
                              <div className="flex items-start gap-3">
                                <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                <div className="text-muted-foreground">
                                  <div>{branch.operatingHours.weekdays}</div>
                                  {branch.operatingHours.weekends && (
                                    <div>{branch.operatingHours.weekends}</div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </CardHeader>

                        <CardContent className="p-0">
                          {/* Capacity Info */}
                          <div className="flex items-center gap-6 mb-6">
                            <div className="flex items-center gap-2">
                              <Users className="h-5 w-5 text-primary" />
                              <span className="font-medium">{branch.totalSeats} Students</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Monitor className="h-5 w-5 text-primary" />
                              <span className="font-medium">Modern Labs</span>
                            </div>
                          </div>

                          {/* Facilities */}
                          {branch.facilities && branch.facilities.length > 0 && (
                            <div className="mb-6">
                              <h4 className="font-semibold mb-3">Facilities & Amenities</h4>
                              <div className="grid grid-cols-2 gap-3">
                                {branch.facilities.map((facility, index) => {
                                  const IconComponent = facilityIcons[facility] || Monitor;
                                  return (
                                    <div key={index} className="flex items-center gap-2">
                                      <IconComponent className="h-4 w-4 text-primary" />
                                      <span className="text-sm text-muted-foreground">{facility}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button className="gradient-primary text-white">
                              <NavigationIcon className="h-4 w-4 mr-2" />
                              Get Directions
                            </Button>
                            {branch.contactInfo?.phone && (
                              <Button variant="outline" className="glass-card">
                                <Phone className="h-4 w-4 mr-2" />
                                Contact Branch
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
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