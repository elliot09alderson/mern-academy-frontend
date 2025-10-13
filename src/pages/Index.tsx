import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { CourseSection } from '@/components/CourseSection';
import { NewsletterSection } from '@/components/NewsletterSection';
import { OutstandingStudents } from '@/components/OutstandingStudents';
import { BranchesSection } from '@/components/BranchesSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <CourseSection />
      <OutstandingStudents />
      <NewsletterSection />
      <BranchesSection />
      <Footer />
    </div>
  );
};

export default Index;
