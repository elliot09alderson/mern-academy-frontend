import { Code2, Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="glass-card mt-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">MERN Academy</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Empowering the next generation of developers with cutting-edge MERN stack development, 
              AI-powered tools, and placement-oriented training programs.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 glass-card rounded-lg flex items-center justify-center hover:scale-105 transition-smooth cursor-pointer">
                <Linkedin className="h-5 w-5 text-primary" />
              </div>
              <div className="w-10 h-10 glass-card rounded-lg flex items-center justify-center hover:scale-105 transition-smooth cursor-pointer">
                <Twitter className="h-5 w-5 text-primary" />
              </div>
              <div className="w-10 h-10 glass-card rounded-lg flex items-center justify-center hover:scale-105 transition-smooth cursor-pointer">
                <Instagram className="h-5 w-5 text-primary" />
              </div>
              <div className="w-10 h-10 glass-card rounded-lg flex items-center justify-center hover:scale-105 transition-smooth cursor-pointer">
                <Youtube className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li><a href="#courses" className="hover:text-foreground transition-smooth">Courses</a></li>
              <li><a href="#students" className="hover:text-foreground transition-smooth">Success Stories</a></li>
              <li><a href="#branches" className="hover:text-foreground transition-smooth">Our Branches</a></li>
              <li><a href="#gallery" className="hover:text-foreground transition-smooth">Gallery</a></li>
              <li><a href="/about" className="hover:text-foreground transition-smooth">About Us</a></li>
              <li><a href="/contact" className="hover:text-foreground transition-smooth">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">Koramangala, Bangalore</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm">info@mernacademy.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 MERN Academy. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-muted-foreground mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-foreground transition-smooth">Privacy Policy</a>
            <a href="/terms" className="hover:text-foreground transition-smooth">Terms of Service</a>
            <a href="/refund" className="hover:text-foreground transition-smooth">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};