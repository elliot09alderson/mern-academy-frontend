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
      {/* Discount Strip */}
      <div className="fixed top-16 md:top-20 left-0 right-0 z-40 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white py-2 px-4 text-center">
        <p className="text-sm md:text-base font-semibold">
          🎉 Diwali Special - 10% OFF + Free Placement Support!
        </p>
      </div>
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
