"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

interface HeroVideoModalProps {
  videoSrc?: string;
}

export default function HeroVideoModal({ videoSrc = "/assets/videos/home/hero-background-0.mp4" }: HeroVideoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  // Prevent scrolling when modal is open; move focus to close button on open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Move focus to close button when modal opens
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Return focus to the trigger button that opened the modal
    setTimeout(() => triggerRef.current?.focus(), 50);
  }, []);

  // Close on Escape key; trap focus within modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      // Focus trap: keep Tab within the modal
      if (e.key === "Tab") {
        const focusable = document.querySelectorAll<HTMLElement>(
          '[role="dialog"] button, [role="dialog"] [href], [role="dialog"] input, [role="dialog"] [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(true)}
        className="group inline-flex items-center gap-4 text-white hover:text-[#a08216] transition-colors duration-300 mt-8 focus:outline-none"
        aria-label="Watch the video"
        aria-haspopup="dialog"
      >
        <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-[#a08216] group-hover:bg-[#a08216] group-hover:text-white transition-all duration-300 backdrop-blur-sm relative">
          {/* Pulse effect */}
          <div className="absolute inset-0 rounded-full border border-white/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50 group-hover:border-[#a08216]"></div>
          <svg aria-hidden="true" className="w-5 h-5 fill-current ml-1" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <span className="text-[13px] font-bold uppercase tracking-[0.2em] underline decoration-transparent group-hover:decoration-[#a08216] underline-offset-4 transition-all">Watch The Video</span>
      </button>

      {mounted && isOpen && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]"
        >
          <button
            ref={closeButtonRef}
            onClick={closeModal}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 z-10 transition-colors"
            aria-label="Close video"
          >
            <svg aria-hidden="true" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl animate-[zoomIn_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={videoSrc}
              className="w-full h-full"
              controls
              autoPlay
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Close on backdrop click */}
          <div className="absolute inset-0 -z-10" onClick={closeModal} aria-hidden="true" />
        </div>,
        document.body
      )}
    </>
  );
}
