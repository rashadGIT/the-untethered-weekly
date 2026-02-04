"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export default function HeroVideoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group inline-flex items-center gap-4 text-white hover:text-[#FF6B35] transition-colors duration-300 mt-8 focus:outline-none"
        aria-label="Watch the video"
      >
        <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-[#FF6B35] group-hover:bg-[#FF6B35] group-hover:text-white transition-all duration-300 backdrop-blur-sm relative">
             {/* Pulse effect */}
            <div className="absolute inset-0 rounded-full border border-white/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50 group-hover:border-[#FF6B35]"></div>
          <svg className="w-5 h-5 fill-current ml-1" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <span className="text-[13px] font-bold uppercase tracking-[0.2em] underline decoration-transparent group-hover:decoration-[#FF6B35] underline-offset-4 transition-all">Watch The Video</span>
      </button>

      {mounted && isOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 z-10 transition-colors"
            aria-label="Close video"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div 
            className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl animate-[zoomIn_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
             {/* Using the same video for now, but controls enabled */}
             <video
              src="/videos/hero-background-0.mp4" 
              className="w-full h-full"
              controls
              autoPlay
            >
                Your browser does not support the video tag.
            </video>
          </div>
          
          {/* Close on backdrop click */}
          <div className="absolute inset-0 -z-10" onClick={() => setIsOpen(false)} />
        </div>,
        document.body
      )}
    </>
  );
}
