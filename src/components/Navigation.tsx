import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import AuthButton from './AuthButton';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { to: '/#courses', label: 'Courses' },
    { to: '/students', label: 'Alumni' },
    { to: '/branches', label: 'Branches' },
    { to: '/gallery', label: 'Gallery' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0D0C0A]/95 backdrop-blur-md border-b border-[#2A2522]'
            : 'bg-[#0D0C0A] border-b border-[#2A2522]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-[68px]">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 opacity-90 hover:opacity-100 transition-opacity duration-200">
              <img
                src="/mern_academy_logo_transparent.png"
                alt="MERN Academy"
                className="h-9 w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative text-xs font-mono tracking-[0.12em] uppercase text-[#6B6660] hover:text-[#F0EBE1] transition-colors duration-200 group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C4622D] group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-3">
              <AuthButton />
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[#6B6660] hover:text-[#F0EBE1] transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0D0C0A] border-t border-[#2A2522]">
            <div className="px-6 py-8 space-y-6">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block font-mono text-xs tracking-[0.15em] uppercase text-[#6B6660] hover:text-[#F0EBE1] transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-[#2A2522]">
                <AuthButton />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Slim announcement bar */}
      <div className="fixed top-[68px] w-full z-40 bg-[#141210] border-b border-[#2A2522]">
        <p className="text-center py-2 font-mono text-[10px] tracking-[0.25em] text-[#C4622D] uppercase">
          Diwali Special — 10% Off + Free Placement Support
        </p>
      </div>
    </>
  );
};
