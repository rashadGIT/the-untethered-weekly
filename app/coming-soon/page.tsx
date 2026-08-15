"use client";

import FadeIn from "../components/FadeIn";

export default function ComingSoonPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#161317]">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/videos/home/hero-background-1.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#161317]/75" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 py-16 max-w-2xl w-full mx-auto gap-8">

        {/* Brand name */}
        <FadeIn delay={0} duration={1}>
          <span className="font-heading text-sm tracking-[0.35em] uppercase text-[#a08216]">
            Shannon Muruli
          </span>
        </FadeIn>

        {/* Headline */}
        <FadeIn delay={0.2} duration={1}>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl leading-tight text-white">
            Something Bold<br />
            Is{" "}
            <span className="bg-gradient-to-r from-[#a08216] to-[#c4a030] bg-clip-text text-transparent">
              Coming.
            </span>
          </h1>
        </FadeIn>

        {/* Subline */}
        <FadeIn delay={0.4} duration={1}>
          <p className="font-sans text-base sm:text-lg text-white/65 max-w-md leading-relaxed">
            Courage Coach to Women Who Sell — a new home for bold sellers
            ready to choose courage over comfort.
          </p>
        </FadeIn>

        {/* Divider */}
        <FadeIn delay={0.5} duration={1}>
          <div className="w-12 h-px bg-[#a08216]" aria-hidden="true" />
        </FadeIn>

        {/* Social links */}
        <FadeIn delay={0.8} duration={1}>
          <div className="flex items-center gap-5">
            <span className="font-sans text-xs tracking-widest uppercase text-white/40">Follow along</span>
            <a
              href="https://www.instagram.com/shannonmuruli/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Shannon Muruli on Instagram"
              className="text-white/50 hover:text-[#a08216] transition-colors duration-200"
            >
              {/* Instagram icon */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/shannonmuruli/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Shannon Muruli on Facebook"
              className="text-white/50 hover:text-[#a08216] transition-colors duration-200"
            >
              {/* Facebook icon */}
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </FadeIn>

        {/* Footer note */}
        <FadeIn delay={1} duration={1}>
          <p className="font-sans text-xs text-white/25 tracking-wider">
            © {new Date().getFullYear()} Shannon Muruli. All rights reserved.
          </p>
        </FadeIn>
      </div>
    </main>
  );
}
