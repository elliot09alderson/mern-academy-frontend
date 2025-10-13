import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

export const BranchesSection = () => {
  const branches = [
    {
      id: 1,
      city: 'Bangalore',
      area: 'Koramangala',
      address: '123 Innovation Street, Koramangala 5th Block, Bangalore - 560095',
      phone: '+91 98765 43210',
      timing: 'Mon-Sat: 9:00 AM - 8:00 PM',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop',
      facilities: ['Smart Classrooms', 'AI Lab', 'Library', 'Cafeteria'],
      isMain: true
    },
    {
      id: 2,
      city: 'Hyderabad',
      area: 'HITEC City',
      address: '456 Tech Boulevard, HITEC City, Hyderabad - 500081',
      phone: '+91 98765 43211',
      timing: 'Mon-Sat: 9:00 AM - 8:00 PM',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop',
      facilities: ['Modern Labs', 'Project Rooms', 'Student Lounge', 'Parking'],
      isMain: false
    },
    {
      id: 3,
      city: 'Pune',
      area: 'Baner',
      address: '789 Education Hub, Baner Road, Pune - 411045',
      phone: '+91 98765 43212',
      timing: 'Mon-Sat: 9:00 AM - 8:00 PM',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=250&fit=crop',
      facilities: ['Co-working Space', 'Seminar Hall', '24/7 Access', 'Food Court'],
      isMain: false
    }
  ];

  return (
    <section id="branches" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="glass-card mb-4">Our Locations</Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Visit Our{' '}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 blur-md opacity-10" />
              <span className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Branches
              </span>
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience hands-on learning at our state-of-the-art facilities across major tech cities
          </p>
        </motion.div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {branches.map((branch, index) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
            <Card className="glass-card border-0 transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
              {/* Branch Image */}
              <div className="relative">
                <img 
                  src={branch.image} 
                  alt={`MERN Academy ${branch.city} Branch`}
                  className="w-full h-48 object-cover"
                />
                {branch.isMain && (
                  <Badge className="absolute top-4 left-4 gradient-primary text-white">
                    Main Branch
                  </Badge>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  {branch.city} - {branch.area}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Address */}
                <div>
                  <p className="text-sm text-muted-foreground">
                    {branch.address}
                  </p>
                </div>

                {/* Contact & Timing */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>{branch.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{branch.timing}</span>
                  </div>
                </div>

                {/* Facilities */}
                <div>
                  <p className="text-sm font-semibold mb-2">Facilities:</p>
                  <div className="flex flex-wrap gap-1">
                    {branch.facilities.map((facility, index) => (
                      <Badge key={index} variant="secondary" className="text-xs glass-card">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 space-y-2">
                  <Button className="w-full gradient-primary text-white">
                    <Navigation className="mr-2 h-4 w-4" />
                    Get Directions
                  </Button>
                  <Button variant="outline" className="w-full glass-card">
                    Schedule Visit
                  </Button>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </div>

        {/* Opening New Branch Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <Card className="glass-card border-0 max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Expanding to More Cities
              </h3>
              <p className="text-muted-foreground mb-6">
                We're opening new branches in Chennai, Delhi, and Mumbai. 
                Be the first to know about our expansion and get early bird discounts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="gradient-primary text-white">
                  Notify Me About New Branches
                </Button>
                <Button variant="outline" className="glass-card">
                  Franchise Opportunities
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};