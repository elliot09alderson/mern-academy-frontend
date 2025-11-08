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
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 blur-md opacity-10" />
              <span className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
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
            <Loader2 className="h-12 w-12 animate-spin text-violet-500" />
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
                className="pt-16"
              >
                {/* Floating Profile Image */}
                <div className="flex justify-center mb-[-3.5rem] relative z-10">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-background shadow-2xl bg-background">
                      <img
                        src={faculty.image.url}
                        alt={faculty.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-2 right-2 w-7 h-7 bg-green-500 rounded-full border-4 border-background shadow-lg" />
                  </div>
                </div>

                <Card className="glass-card border border-border/40 hover:shadow-2xl transition-all duration-300 h-full rounded-3xl overflow-visible">
                  <CardContent className="pt-16 pb-8 px-8">
                    {/* Name */}
                    <h3 className="text-center text-2xl font-bold mb-3 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {faculty.name}
                    </h3>

                    {/* Specialization Badge */}
                    <div className="flex justify-center mb-8">
                      <div className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white text-center font-semibold shadow-lg text-sm">
                        {faculty.specialization}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-violet-50/50 to-purple-50/50 dark:from-violet-950/20 dark:to-purple-950/20">
                        <Award className="h-5 w-5 text-violet-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">Qualification</p>
                          <p className="text-sm font-medium">{faculty.qualification}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
                        <Briefcase className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">Experience</p>
                          <p className="text-sm font-medium">{faculty.experience} years</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-pink-50/50 to-violet-50/50 dark:from-pink-950/20 dark:to-violet-950/20">
                        <Mail className="h-5 w-5 text-pink-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">Email</p>
                          <p className="text-sm font-medium break-all">{faculty.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Expertise */}
                    {faculty.expertise && faculty.expertise.length > 0 && (
                      <div className="pt-6 border-t border-border/50">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">Expertise</p>
                        <div className="flex flex-wrap gap-2">
                          {faculty.expertise.slice(0, 5).map((skill, idx) => (
                            <div
                              key={idx}
                              className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 border border-violet-200/50 dark:border-violet-800/50 text-xs font-semibold hover:scale-105 transition-transform"
                            >
                              {skill}
                            </div>
                          ))}
                          {faculty.expertise.length > 5 && (
                            <div className="px-4 py-2 rounded-full bg-secondary border border-border text-xs font-semibold">
                              +{faculty.expertise.length - 5}
                            </div>
                          )}
                        </div>
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
