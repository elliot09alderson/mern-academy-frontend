import { Navigation } from '@/components/Navigation';
import { SEO } from '@/components/SEO';
import { Hero } from '@/components/Hero';
import { CourseSection } from '@/components/CourseSection';
import { NewsletterSection } from '@/components/NewsletterSection';
// import { OutstandingStudents } from '@/components/OutstandingStudents'; // temporarily disabled
import { FacultySection } from '@/components/FacultySection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { BranchesSection } from '@/components/BranchesSection';
import { ExpertsSaySection } from '@/components/ExpertsSaySection';
import { AlumniSection } from '@/components/AlumniSection';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="MERN Academy - Master MERN Stack Development with AI | Placement-Oriented Courses"
        description="MERN Academy offers placement-oriented MERN stack development courses with AI-powered web development, DSA, and System Design training. 6-month intensive program with successful placements at top tech companies."
        path="/"
      />
      <Navigation />
      <div className="pt-0">
        <Hero />
        <CourseSection />
        {/* Temporarily disabled until outstanding-student data is finalized */}
        {/* <OutstandingStudents /> */}
        <FacultySection />
        <TestimonialsSection />
        <NewsletterSection />
        <BranchesSection />
        <ExpertsSaySection />
        <AlumniSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
