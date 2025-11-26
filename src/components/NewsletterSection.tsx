import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, User, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCreateInquiryMutation } from '@/store/api/inquiryApi';
import { useToast } from '@/hooks/use-toast';

export const NewsletterSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    hereAboutUs: '',
    message: ''
  });

  const [createInquiry, { isLoading }] = useCreateInquiryMutation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createInquiry(formData).unwrap();

      toast({
        title: "Success!",
        description: "Thank you for your inquiry. We'll get back to you soon!",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        qualification: '',
        hereAboutUs: '',
        message: ''
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.data?.message || "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section id="course-info" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Get{' '}
            <span className="relative inline-block">
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 blur-md opacity-10" />
              <span className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Course Information
              </span>
            </span>
          </h2>
          <p className="text-muted-foreground">
            Share your details and connect with us
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                <Input
                  id="name"
                  placeholder="Full Name *"
                  className="glass-card border-0 pl-10 h-12"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Email Address *"
                  className="glass-card border-0 pl-10 h-12"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Phone Number *"
                  className="glass-card border-0 pl-10 h-12"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>

              {/* Qualification */}
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                <Input
                  id="qualification"
                  placeholder="Qualification *"
                  className="glass-card border-0 pl-10 h-12"
                  required
                  value={formData.qualification}
                  onChange={(e) => handleInputChange('qualification', e.target.value)}
                />
              </div>
            </div>

            {/* How did you hear about us */}
            <Select required value={formData.hereAboutUs} onValueChange={(value) => handleInputChange('hereAboutUs', value)}>
              <SelectTrigger className="glass-card border-0 h-12">
                <SelectValue placeholder="How did you hear about us? *" />
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

            {/* Message */}
            <Textarea
              id="message"
              placeholder="Your message or questions (Optional)"
              className="glass-card border-0 min-h-[100px] resize-none"
              rows={3}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:from-violet-700 hover:via-purple-700 hover:to-pink-700 text-white border-0 h-12 font-semibold"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Get Course Information'}
            </Button>

            {/* Privacy Note */}
            <p className="text-xs text-muted-foreground text-center pt-2">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};