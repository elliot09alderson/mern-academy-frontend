import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Award, Briefcase, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGetActiveFacultiesQuery } from '@/store/api/facultyApi';
import { Loader2 } from 'lucide-react';

export const FacultySection = () => {
  const { data: facultiesData, isLoading } = useGetActiveFacultiesQuery({ limit: 6 });

  return (
    <section id="faculty" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-6">
            <Badge className="glass-card-modern px-6 py-2 text-base font-semibold border border-blue-500/20">
              Our Faculty
            </Badge>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            Learn From{' '}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 blur-md opacity-10" />
              <span className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Industry Experts
              </span>
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our experienced faculty members bring real-world expertise and dedication to help you succeed
          </p>
        </motion.div>

        {/* Faculty Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
          </div>
        ) : facultiesData && facultiesData.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultiesData.data.map((faculty, index) => (
              <motion.div
                key={faculty._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass-card border-0 overflow-hidden group hover:shadow-2xl transition-all duration-300">
                  {/* Card Header with Gradient */}
                  <div className="relative h-32 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
                    <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.1))]" />
                  </div>

                  {/* Faculty Image */}
                  <div className="relative -mt-16 flex justify-center">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full ring-4 ring-white shadow-xl overflow-hidden">
                        <img
                          src={faculty.image.url}
                          alt={faculty.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white" />
                    </div>
                  </div>

                  <CardHeader className="text-center pt-4">
                    <CardTitle className="text-xl md:text-2xl mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {faculty.name}
                    </CardTitle>
                    <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white inline-block mx-auto mb-3">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      {faculty.specialization}
                    </Badge>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Qualification */}
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/20">
                      <Award className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">Qualification</p>
                        <p className="text-sm text-muted-foreground">{faculty.qualification}</p>
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/20">
                      <Briefcase className="h-5 w-5 text-indigo-600" />
                      <div>
                        <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-100">Experience</p>
                        <p className="text-sm text-muted-foreground">{faculty.experience} years</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50/50 dark:bg-purple-950/20">
                      <Mail className="h-5 w-5 text-purple-600" />
                      <p className="text-sm text-muted-foreground truncate">{faculty.email}</p>
                    </div>

                    {/* Expertise */}
                    {faculty.expertise && faculty.expertise.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold mb-2">Areas of Expertise</p>
                        <div className="flex flex-wrap gap-2">
                          {faculty.expertise.slice(0, 4).map((skill, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="glass-card text-xs border-blue-200"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {faculty.expertise.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{faculty.expertise.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Office Hours */}
                    {faculty.officeHours && (
                      <div className="pt-3 border-t border-border/50">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-semibold">Office Hours:</span> {faculty.officeHours}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No faculty members available at the moment</p>
          </div>
        )}
      </div>
    </section>
  );
};
