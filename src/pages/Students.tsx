import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Briefcase, Code2, Award, Loader2, Building2 } from 'lucide-react';
import { useGetOutstandingStudentsQuery } from '@/store/api/outstandingStudentApi';

export const Students = () => {
  const { data: studentsData, isLoading, error } = useGetOutstandingStudentsQuery({ isActive: true });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Header Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Outstanding{' '}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 blur-md opacity-10" />
                <span className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Students
                </span>
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Meet our outstanding performers who have excelled in their careers.
              These are the success stories that inspire our teaching methodology.
            </p>

            {/* Stats */}
            {studentsData && studentsData.data.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{studentsData.count}+</div>
                  <div className="text-muted-foreground">Students Placed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">25+</div>
                  <div className="text-muted-foreground">Partner Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">100%</div>
                  <div className="text-muted-foreground">Placement Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">12 LPA</div>
                  <div className="text-muted-foreground">Avg Package</div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Students Grid */}
        <section className="pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-violet-500" />
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-xl text-red-500">Failed to load students. Please try again later.</p>
              </div>
            ) : studentsData && studentsData.data.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {studentsData.data.map((student) => (
                  <Card key={student._id} className="glass-card border-0 hover-lift">
                    <CardContent className="p-0">
                      {/* Rank Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="gradient-primary text-white text-lg px-3 py-1">
                          #{student.rank}
                        </Badge>
                      </div>

                      {/* Student Image */}
                      <div className="relative">
                        <img
                          src={student.image.url}
                          alt={student.name}
                          className="w-full h-64 object-cover rounded-t-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent rounded-t-lg" />

                        {/* Achievement Badge */}
                        <div className="absolute bottom-4 right-4">
                          <Award className="h-6 w-6 text-primary" />
                        </div>
                      </div>

                      <div className="p-6">
                        {/* Student Info */}
                        <h3 className="text-xl font-bold mb-2">{student.name}</h3>

                        <div className="flex items-center gap-2 mb-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{student.college}</span>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">{student.role} at {student.company}</span>
                        </div>

                        <div className="mb-4">
                          <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
                            {student.package}
                          </Badge>
                        </div>

                        {/* Skills */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Code2 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Skills</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {student.skills.map((skill, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Achievement */}
                        <div className="p-3 glass-card rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <Award className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-primary">Achievement</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{student.achievement}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Award className="h-20 w-20 text-muted-foreground mx-auto mb-4" />
                <p className="text-xl text-muted-foreground">No outstanding students found</p>
                <p className="text-sm text-muted-foreground mt-2">Check back later for our success stories!</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Join Our <span className="gradient-text">Success Stories?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start your journey with MERN Academy and become the next success story. 
              Get placed in top companies with our industry-focused curriculum.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 gradient-primary text-white rounded-lg font-medium hover:opacity-90 transition-smooth">
                Enroll Now - 10% Diwali Discount
              </button>
              <button className="px-8 py-3 glass-card rounded-lg font-medium hover:bg-primary/10 transition-smooth">
                Download Brochure
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Students;