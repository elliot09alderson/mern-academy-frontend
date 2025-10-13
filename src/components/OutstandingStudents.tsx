import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Building2, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export const OutstandingStudents = () => {
  const topStudents = [
    {
      id: 1,
      name: 'Rahul Sharma',
      college: 'IIT Delhi',
      skills: ['React', 'Node.js', 'AI/ML', 'System Design'],
      company: 'Google',
      package: '45 LPA',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Priya Patel',
      college: 'NIT Surat',
      skills: ['MERN Stack', 'DevOps', 'Cloud', 'MongoDB'],
      company: 'Microsoft',
      package: '38 LPA',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b820?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Arjun Mehta',
      college: 'DTU',
      skills: ['Full Stack', 'React Native', 'AWS', 'DSA'],
      company: 'Amazon',
      package: '42 LPA',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Sneha Gupta',
      college: 'BITS Pilani',
      skills: ['AI Tools', 'MERN', 'GraphQL', 'TypeScript'],
      company: 'Meta',
      package: '50 LPA',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 5,
      name: 'Vikash Kumar',
      college: 'Jadavpur University',
      skills: ['Backend', 'Microservices', 'Docker', 'Kubernetes'],
      company: 'Netflix',
      package: '35 LPA',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 6,
      name: 'Anjali Singh',
      college: 'Manipal Institute',
      skills: ['Frontend', 'React', 'Next.js', 'UI/UX'],
      company: 'Flipkart',
      package: '28 LPA',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
    }
  ];

  return (
    <section id="students" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="glass-card mb-4">Success Stories</Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Our{' '}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 blur-md opacity-10" />
              <span className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Outstanding Students
              </span>
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet our top performers who landed dream jobs at leading tech companies
          </p>
        </motion.div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {topStudents.map((student, index) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="glass-card border-0 transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden">
              <CardContent className="p-6">
                {/* Student Image & Basic Info */}
                <div className="text-center mb-6">
                  <div className="relative mb-4">
                    <img 
                      src={student.image} 
                      alt={student.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-primary/20"
                    />
                    <div className="absolute -top-2 -right-2 bg-gradient-primary rounded-full p-2">
                      <Star className="h-4 w-4 text-white fill-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{student.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {student.college}
                  </p>
                </div>

                {/* Company & Package */}
                <div className="mb-4 p-3 glass-card rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">Now at</p>
                  <p className="font-bold text-lg gradient-text">{student.company}</p>
                  <p className="text-sm font-semibold text-green-400">{student.package}</p>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-2">Key Skills:</p>
                  <div className="flex flex-wrap gap-1">
                    {student.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs glass-card">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(student.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Be the Next Success Story</h3>
            <p className="text-muted-foreground mb-6">
              Join our placement-oriented program and get placed in top tech companies with our proven track record
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="gradient-primary text-white btn-glow">
                View All Success Stories
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="glass-card">
                Start Your Journey
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};