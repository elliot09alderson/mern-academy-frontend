import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, AlertTriangle } from 'lucide-react';
import AuthButton from './AuthButton';
import { useGetOffersQuery } from '@/store/api/offerApi';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { pathname } = useLocation();
  const { data: offersData } = useGetOffersQuery({ isActive: true });
  const offers = offersData?.data ?? [];
  // Duplicate for seamless loop
  const marqueeItems = offers.length > 0 ? [...offers, ...offers, ...offers] : null;

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
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => {
                const isActive = link.to === '/#courses'
                  ? pathname === '/'
                  : pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative text-xs font-mono tracking-[0.12em] uppercase transition-colors duration-200 group ${
                      isActive ? 'text-[#F0EBE1]' : 'text-[#6B6660] hover:text-[#F0EBE1]'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-[#C4622D] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                );
              })}
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
              {links.map((link) => {
                const isActive = link.to === '/#courses'
                  ? pathname === '/'
                  : pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`block font-mono text-xs tracking-[0.15em] uppercase transition-colors duration-200 ${
                      isActive ? 'text-[#F0EBE1]' : 'text-[#6B6660] hover:text-[#F0EBE1]'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                    {isActive && <span className="inline-block ml-2 w-1 h-1 bg-[#C4622D] rounded-full align-middle" />}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-[#2A2522]">
                <AuthButton />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Offer marquee bar */}
      {marqueeItems && (
        <div className="fixed top-[68px] w-full z-40 bg-[#1a1600] border-b border-[#3a2e00] overflow-hidden">
          <div
            className="flex items-center gap-0 py-2"
            style={{
              animation: 'marquee 40s linear infinite',
              width: 'max-content',
            }}
          >
            {marqueeItems.map((offer, i) => (
              <span key={`${offer._id}-${i}`} className="flex items-center gap-2.5 px-10 flex-shrink-0">
                <AlertTriangle className="h-3 w-3 text-yellow-400 flex-shrink-0" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-yellow-400 uppercase whitespace-nowrap">
                  {offer.text}
                </span>
                <span className="text-yellow-900 mx-2">·</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
