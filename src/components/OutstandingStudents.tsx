import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Building2, ExternalLink, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGetOutstandingStudentsQuery } from '@/store/api/outstandingStudentApi';

export const OutstandingStudents = () => {
  const { data: studentsData, isLoading } = useGetOutstandingStudentsQuery({ isActive: true });

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
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-violet-500" />
          </div>
        ) : studentsData && studentsData.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {studentsData.data.slice(0, 3).map((student, index) => (
              <motion.div
                key={student._id}
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
                        src={student.image.url}
                        alt={student.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-primary/20"
                      />
                      <div className="absolute -top-2 -right-2 bg-gradient-primary rounded-full p-2 text-white font-bold text-sm">
                        #{student.rank}
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
                    <p className="text-sm font-medium text-muted-foreground">{student.role}</p>
                    <p className="text-sm font-semibold text-green-400 mt-1">{student.package}</p>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold mb-2">Key Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {student.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs glass-card">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Achievement */}
                  <div className="p-2 glass-card rounded-lg text-center">
                    <p className="text-xs text-muted-foreground">{student.achievement}</p>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No outstanding students found</p>
          </div>
        )}

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