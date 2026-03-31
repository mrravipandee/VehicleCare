import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' }
  ];

  return (
    <footer className="border-t border-slate-100 bg-white py-8 px-4 sm:px-6 lg:px-8 text-sm text-slate-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Brand & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <span className="font-bold text-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              VehicleCare
            </span>
            <span className="hidden md:inline-block w-1.5 h-1.5 rounded-full bg-slate-200" />
            <span className="text-slate-400">
              © {currentYear} All rights reserved.
            </span>
          </div>

          {/* Center: Navigation links */}
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-medium text-slate-500 hover:text-indigo-600 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: Attribution */}
          <div className="flex items-center gap-1.5 font-medium bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
            Crafted with 
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" /> 
            by 
            <span className="text-slate-800 hover:text-indigo-600 transition-colors cursor-pointer">
              Ravi Pandey
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
}