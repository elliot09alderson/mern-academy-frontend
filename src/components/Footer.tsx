import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const navLinks = [
  { to: "/#courses",  label: "Courses"  },
  { to: "/students",  label: "Alumni"   },
  { to: "/branches",  label: "Branches" },
  { to: "/gallery",   label: "Gallery"  },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy"  },
  { href: "/terms",   label: "Terms of Service"},
  { href: "/refund",  label: "Refund Policy"   },
];

export const Footer = () => {
  return (
    <footer className="bg-[#0D0C0A] border-t border-[#2A2522] px-6 lg:px-8 pt-20 pb-12">
      <div className="max-w-7xl mx-auto">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-8 opacity-90 hover:opacity-100 transition-opacity duration-200">
              <img
                src="/mern_academy_logo_transparent.png"
                alt="MERN Academy"
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-[#6B6660] text-sm leading-relaxed max-w-xs">
              Empowering the next generation of full-stack engineers with
              industry-first curriculum and guaranteed placement support.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.25em] text-[#6B6660] uppercase mb-8">
              Navigation
            </p>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[#A39E95] hover:text-[#F0EBE1] text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-[9px] tracking-[0.25em] text-[#6B6660] uppercase mb-8">
              Contact
            </p>
            <div className="space-y-4">
              <p className="text-[#A39E95] text-sm flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#C4622D] flex-shrink-0 mt-0.5" />
                Koramangala, Bangalore
              </p>
              <p className="text-[#A39E95] text-sm flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#C4622D] flex-shrink-0" />
                +91 98765 43210
              </p>
              <p className="text-[#A39E95] text-sm flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#C4622D] flex-shrink-0" />
                info@mernacademy.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#2A2522] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] text-[#6B6660] tracking-[0.08em]">
            © 2024 MERN Academy. All rights reserved.
          </p>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[10px] text-[#6B6660] hover:text-[#A39E95] transition-colors duration-200 tracking-[0.06em]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
