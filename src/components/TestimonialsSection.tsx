import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quote, Star, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGetTestimonialsQuery } from '@/store/api/testimonialApi';

export const TestimonialsSection = () => {
  const { data: testimonialsData, isLoading } = useGetTestimonialsQuery({ isActive: true, limit: 6 });
  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/20 to-background">
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
              Student Success Stories
            </Badge>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            What Our{' '}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 blur-md opacity-10" />
              <span className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Students Say
              </span>
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hear from our successful students who have transformed their careers with us
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
          </div>
        ) : testimonialsData && testimonialsData.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialsData.data.map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
              <Card className="glass-card border-0 h-full group hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Quote className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Testimonial Content */}
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                    "{testimonial.description}"
                  </p>

                  {/* Student Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-blue-500/20">
                        <img
                          src={testimonial.image.url}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No testimonials available at the moment</p>
          </div>
        )}
      </div>
    </section>
  );
};
