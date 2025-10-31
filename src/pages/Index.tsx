import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { CourseSection } from '@/components/CourseSection';
import { NewsletterSection } from '@/components/NewsletterSection';
import { OutstandingStudents } from '@/components/OutstandingStudents';
import { FacultySection } from '@/components/FacultySection';
import { BranchesSection } from '@/components/BranchesSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-0">
        <Hero />
        <CourseSection />
        <OutstandingStudents />
        <FacultySection />
        <NewsletterSection />
        <BranchesSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
