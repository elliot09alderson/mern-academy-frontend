import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Code2 } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import AuthButton from './AuthButton';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-nav border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo with glow effect */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <Code2 className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
            </div>
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              MERN Academy
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              to="/#courses"
              className="relative text-sm lg:text-base font-medium text-foreground/70 hover:text-foreground transition-all duration-300 group"
            >
              Courses
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-purple-600 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              to="/students"
              className="relative text-sm lg:text-base font-medium text-foreground/70 hover:text-foreground transition-all duration-300 group"
            >
              Outstanding Students
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-purple-600 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              to="/branches"
              className="relative text-sm lg:text-base font-medium text-foreground/70 hover:text-foreground transition-all duration-300 group"
            >
              Branches
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-purple-600 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              to="/gallery"
              className="relative text-sm lg:text-base font-medium text-foreground/70 hover:text-foreground transition-all duration-300 group"
            >
              Gallery
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-600 to-purple-600 group-hover:w-full transition-all duration-300" />
            </Link>
            <AuthButton />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-violet-500/10"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu with animation */}
        {isMenuOpen && (
          <div className="md:hidden glass-card-modern mt-2 mb-4 p-4 rounded-2xl border border-white/10 animate-fade-in-up">
            <div className="flex flex-col space-y-3">
              <Link
                to="/#courses"
                className="px-4 py-3 rounded-xl text-foreground/80 hover:text-foreground hover:bg-violet-500/10 transition-all duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link
                to="/students"
                className="px-4 py-3 rounded-xl text-foreground/80 hover:text-foreground hover:bg-violet-500/10 transition-all duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Outstanding Students
              </Link>
              <Link
                to="/branches"
                className="px-4 py-3 rounded-xl text-foreground/80 hover:text-foreground hover:bg-violet-500/10 transition-all duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Branches
              </Link>
              <Link
                to="/gallery"
                className="px-4 py-3 rounded-xl text-foreground/80 hover:text-foreground hover:bg-violet-500/10 transition-all duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <div className="pt-2 border-t border-white/10" onClick={() => setIsMenuOpen(false)}>
                <AuthButton />
              </div>
            </div>
          </div>
        )}
        </div>
      </nav>

      {/* Diwali Discount Banner - Scrollable, positioned below fixed navbar */}
      <div className="mt-[64px] md:mt-[80px] bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white py-2 px-4 text-center">
        <p className="text-sm md:text-base font-semibold">
          🎉 Diwali Special - 10% OFF + Free Placement Support!
        </p>
      </div>
    </>
  );
};