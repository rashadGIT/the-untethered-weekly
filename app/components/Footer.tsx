import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-white font-bold text-2xl mb-4">Shannon Muruli</h3>
            <p className="text-gray-300 text-base leading-relaxed mb-6">
              Courage Coach & Self-Image Strategist to Women Who Sell
            </p>
            <p className="text-gray-400 text-sm">
              Empowering women in sales to embrace courage over comfort and unlock their full potential.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Navigate</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-300 text-sm hover:text-[#FF6B35] transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-300 text-sm hover:text-[#FF6B35] transition-colors">About</Link></li>
              <li><Link href="/work-with-me" className="text-gray-300 text-sm hover:text-[#FF6B35] transition-colors">Work With Me</Link></li>
              <li><Link href="/client-results" className="text-gray-300 text-sm hover:text-[#FF6B35] transition-colors">Client Results</Link></li>
              <li><Link href="/merch" className="text-gray-300 text-sm hover:text-[#FF6B35] transition-colors">Merch</Link></li>
              <li><Link href="/contact" className="text-gray-300 text-sm hover:text-[#FF6B35] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.instagram.com/shannonmuruli/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 text-sm hover:text-[#FF6B35] transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/shannonmuruli/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 text-sm hover:text-[#FF6B35] transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.theuntetheredweekly.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 text-sm hover:text-[#FF6B35] transition-colors"
                >
                  Newsletter
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 text-sm mb-2">
            © {new Date().getFullYear()} Shannon Muruli. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs italic">
            ✨ sell yourself on that
          </p>
        </div>
      </div>
    </footer>
  );
}
