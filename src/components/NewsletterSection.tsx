import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, User, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export const NewsletterSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get{' '}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 blur-md opacity-10" />
              <span className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Course Information
              </span>
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Share your details and we'll send you personalized course recommendations and updates
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Connect with MERN Academy
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name *
                  </Label>
                  <Input 
                    id="name"
                    placeholder="Enter your full name"
                    className="glass-card border-0"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone Number *
                  </Label>
                  <Input 
                    id="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    className="glass-card border-0"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address *
                  </Label>
                  <Input 
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="glass-card border-0"
                    required
                  />
                </div>

                {/* Qualification */}
                <div className="space-y-2">
                  <Label htmlFor="qualification" className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Qualification *
                  </Label>
                  <Input 
                    id="qualification"
                    placeholder="e.g., B.Tech CSE, BCA, MCA"
                    className="glass-card border-0"
                    required
                  />
                </div>
              </div>

              {/* How did you hear about us */}
              <div className="space-y-2">
                <Label htmlFor="source">How did you hear about us? *</Label>
                <Select required>
                  <SelectTrigger className="glass-card border-0">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-0">
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="friend">Friend/Referral</SelectItem>
                    <SelectItem value="college">College/University</SelectItem>
                    <SelectItem value="poster">Poster/Advertisement</SelectItem>
                    <SelectItem value="website">Website/Search Engine</SelectItem>
                    <SelectItem value="googlemap">Google Maps</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea 
                  id="message"
                  placeholder="Tell us about your goals, experience, or any specific questions you have..."
                  className="glass-card border-0 min-h-[100px]"
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                size="lg" 
                className="w-full gradient-primary text-white btn-glow"
              >
                Get Course Information
              </Button>

              {/* Privacy Note */}
              <p className="text-xs text-muted-foreground text-center">
                We respect your privacy. Your information will only be used to send you course details and updates.
                You can unsubscribe at any time.
              </p>
            </form>
          </CardContent>
        </Card>
        </motion.div>
      </div>
    </section>
  );
};