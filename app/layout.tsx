import type { Metadata } from "next";
import { Inter, Marcellus, DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

const marcellus = Marcellus({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marcellus",
  display: 'swap',
});

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Shannon Muruli | Courage Coach to Women Who Sell",
  description: "Untether from your comfort zone. Serve more. Sell more. Join the Untethered Weekly for sales courage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${marcellus.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased text-[#161317]">
        <Navigation />
        
        <main className="min-h-screen">
          {children}
        </main>

        <footer className="bg-[#161317] text-white pt-20 pb-10">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              <div className="col-span-1 md:col-span-2">
                <a href="/" className="font-serif text-2xl tracking-tight font-bold block mb-6">
                  SHANNON <span className="text-[#FF6B35]">MURULI</span>
                </a>
                <p className="text-gray-400 max-w-sm mb-6 font-light leading-relaxed">
                  Helping women who sell untether from their comfort zones to serve more and sell more.
                </p>
                <div className="flex gap-4">
                  {/* Social Icons Placeholder */}
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF6B35] transition-colors cursor-pointer">
                    <span className="sr-only">Instagram</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-[13px] font-bold uppercase tracking-[0.15em] mb-6 text-gray-300">Explore</h4>
                <ul className="space-y-4">
                  <li><a href="/about" className="text-gray-400 hover:text-white transition-colors text-sm">About Shannon</a></li>
                  <li><a href="/work-with-me" className="text-gray-400 hover:text-white transition-colors text-sm">Work With Me</a></li>
                  <li><a href="/client-results" className="text-gray-400 hover:text-white transition-colors text-sm">Success Stories</a></li>
                  <li><a href="/merch" className="text-gray-400 hover:text-white transition-colors text-sm">Merch</a></li>
                  <li><a href="/resources" className="text-gray-400 hover:text-white transition-colors text-sm">Free Resources</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-[13px] font-bold uppercase tracking-[0.15em] mb-6 text-gray-300">Company</h4>
                <ul className="space-y-4">
                  <li><a href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</a></li>
                  <li><a href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
                  <li><a href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
              <p>&copy; {new Date().getFullYear()} Shannon Muruli. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}