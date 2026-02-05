'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from './Button';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/work-with-me', label: 'Work With Me' },
    { href: '/client-results', label: 'Results' },
    { href: '/merch', label: 'Merch' },
    { href: '/resources', label: 'Resources' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="font-serif text-2xl tracking-tight font-bold text-[#161317]">
            SHANNON <span className="text-[#FF6B35]">MURULI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[13px] font-bold uppercase tracking-[0.15em] transition-colors hover:text-[#FF6B35] ${
                  isActive(link.href) ? 'text-[#FF6B35]' : 'text-[#161317]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              href="/#newsletter" 
              className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#FF6B35] hover:text-[#e85a2a] transition-colors"
            >
              Join The Weekly
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2.5 border-2 border-[#161317] rounded-lg hover:bg-gray-50 transition-colors"
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-0.5 bg-[#161317] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-[#161317] transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-[#161317] transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-6 bg-white absolute left-0 right-0 px-6 shadow-xl">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-bold uppercase tracking-[0.15em] py-2 transition-colors hover:text-[#FF6B35] ${
                    isActive(link.href) ? 'text-[#FF6B35]' : 'text-[#161317]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="/#newsletter"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-[0.15em] text-[#FF6B35] py-2 hover:text-[#e85a2a] transition-colors"
              >
                Join The Weekly
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
