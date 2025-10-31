import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, Award, Code2, Brain, Database, Zap, ArrowRight, Loader2, Rocket, Star, Trophy, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGetActiveCoursesQuery } from '@/store/api/courseApi';

const ICON_MAP: Record<string, any> = {
  code: Code2,
  brain: Brain,
  rocket: Rocket,
  star: Star,
  trophy: Trophy,
  target: Target,
  database: Database,
};

export const CourseSection = () => {
  const { data: coursesData, isLoading } = useGetActiveCoursesQuery({ limit: 10 });

  return (
    <section id="courses" className="py-24 px-4 sm:px-6 lg:px-8">
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
            <Badge className="glass-card-modern px-6 py-2 text-base font-semibold border border-violet-500/20">
              Our Courses
            </Badge>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            Placement-Oriented{' '}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 blur-md opacity-10" />
              <span className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Courses
              </span>
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Industry-designed curriculum with hands-on projects, live sessions, and guaranteed placement support
          </p>
        </motion.div>

        {/* Courses Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-violet-500" />
          </div>
        ) : coursesData && coursesData.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {coursesData.data.map((course, index) => {
              const IconComponent = ICON_MAP[course.icon] || Code2;

              return (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="glass-card border-0 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                    <CardHeader className="space-y-4 pb-4">
                      <div className="flex items-center justify-between">
                        {/* Icon with gradient background */}
                        <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center">
                          <IconComponent className="h-7 w-7 text-white" />
                        </div>
                        {/* Level Badge */}
                        <Badge variant="secondary" className="glass-card font-semibold">
                          {course.level}
                        </Badge>
                      </div>
                      <div>
                        <CardTitle className="text-xl md:text-2xl mb-3 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                          {course.courseName}
                        </CardTitle>
                        <CardDescription className="text-base leading-relaxed">
                          {course.description}
                        </CardDescription>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Course Info */}
                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4 text-violet-500" />
                          <span className="font-medium">{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4 text-violet-500" />
                          <span className="font-medium">{course.batchSize}</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <h4 className="font-bold mb-3 flex items-center gap-2 text-base">
                          <Zap className="h-5 w-5 text-violet-500" />
                          What You'll Get
                        </h4>
                        <ul className="space-y-2.5">
                          {course.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="text-sm text-muted-foreground flex items-center gap-2.5">
                              <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-purple-500" />
                              <span className="font-medium">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pricing */}
                      <div className="pt-4 border-t border-white/10">
                        <div className="flex items-baseline gap-3 mb-2">
                          <span className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            ₹{course.discountedPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-lg text-muted-foreground line-through">
                            ₹{course.originalPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 font-semibold">
                            Save {course.discountPercentage}%
                          </Badge>
                          {course.isLimitedOffer && (
                            <span className="text-xs text-muted-foreground">Limited Time</span>
                          )}
                        </div>
                      </div>

                      {/* CTA */}
                      <Button className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 py-6 text-base font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                        Enroll Now
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No courses available at the moment</p>
          </div>
        )}

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="glass-card p-8 md:p-12 rounded-2xl max-w-5xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center">
                Why Choose{' '}
                <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  MERN Academy?
                </span>
              </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 mb-4">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <h4 className="font-bold mb-3 text-lg bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Live 1-on-1 Sessions
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  Weekend doubt-clearing sessions with industry experts
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 mb-4">
                  <Award className="h-7 w-7 text-white" />
                </div>
                <h4 className="font-bold mb-3 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Certification Program
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  Industry-recognized vocational training certificates
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 mb-4">
                  <Code2 className="h-7 w-7 text-white" />
                </div>
                <h4 className="font-bold mb-3 text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Client Projects
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  Work on real client projects during the course
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};