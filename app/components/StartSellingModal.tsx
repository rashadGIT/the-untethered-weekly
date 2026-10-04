"use client";

import { useState, useEffect, useRef, useCallback, ReactNode } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export const UNTETHERED_ACCESS_KEY = "untethered-seller-access";

interface StartSellingModalProps {
  className?: string;
  children: ReactNode;
}

export default function StartSellingModal({ className = "", children }: StartSellingModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
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
    setTimeout(() => triggerRef.current?.focus(), 50);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sessionStorage.setItem(
      UNTETHERED_ACCESS_KEY,
      JSON.stringify({ name, email })
    );
    router.push("/untethered-seller");
  }

  return (
    <>
      <button ref={triggerRef} onClick={() => setIsOpen(true)} className={className} aria-haspopup="dialog">
        {children}
      </button>

      {mounted && isOpen && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Sell more as an Untethered Seller sign up"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 sm:p-8 backdrop-blur-sm overflow-y-auto no-scrollbar animate-[fadeIn_0.3s_ease-out]"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-xl my-auto bg-[#FBF7EF] shadow-2xl px-8 py-14 sm:px-16 sm:py-16 text-center animate-[zoomIn_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              onClick={closeModal}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-[#a08216]/40 flex items-center justify-center text-[#a08216] hover:bg-[#a08216] hover:text-white transition-colors"
              aria-label="Close"
            >
              <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mx-auto mb-8 w-24 h-24 rounded-full border border-[#a08216] flex items-center justify-center">
              <span
                className="text-[#a08216] text-[26px] italic tracking-[-0.12em]"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                SM
              </span>
            </div>

            <p
              className="text-[#a08216] text-[34px] sm:text-[46px] uppercase tracking-[0.22em] leading-tight mb-2"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Sell More
            </p>
            <p className="text-[#a08216] text-[20px] sm:text-[30px] uppercase tracking-[0.35em] mb-3">as an</p>
            <p
              className="text-[#a08216] text-[34px] sm:text-[43px] mb-7 uppercase leading-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Untethered Seller
            </p>

            <div className="flex items-center justify-center gap-4 mb-7 text-[#a08216]/40">
              <span className="h-px w-20 sm:w-28 bg-[#a08216]/30" />
              <span className="text-xs text-[#a08216]">◆</span>
              <span className="h-px w-20 sm:w-28 bg-[#a08216]/30" />
            </div>

            <p className="text-[#a08216] text-[13px] sm:text-[15px] font-bold uppercase tracking-[0.22em] mb-6 leading-relaxed">
              A Free 5-Day Audio Experience<br />For Women Who Sell
            </p>

            <p className="text-[#a08216]/90 text-[16px] sm:text-[18px] mb-8 leading-[1.7]">
              Discover what&apos;s really happening between knowing what to do—and doing it when it&apos;s time to sell.
              <br /><br />
              5 short audios. Real insights.<br />One courageous step every day.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <label htmlFor="modal-name" className="sr-only">Your Name</label>
              <div className="relative">
                <svg aria-hidden="true" className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a08216]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <input
                  id="modal-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full pl-12 pr-5 py-4 border border-[#a08216]/40 text-[15px] focus:outline-none focus:border-[#a08216] transition-colors placeholder:text-[#161317]/40"
                />
              </div>
              <label htmlFor="modal-email" className="sr-only">Your Email Address</label>
              <div className="relative">
                <svg aria-hidden="true" className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a08216]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0-.414.336-.75.75-.75h18c.414 0 .75.336.75.75v10.5a.75.75 0 01-.75.75h-18a.75.75 0 01-.75-.75V6.75zm1.5.313v9.937h16.5V7.063l-7.72 5.147a1.5 1.5 0 01-1.66 0L3.75 7.063z" />
                </svg>
                <input
                  id="modal-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address"
                  className="w-full pl-12 pr-5 py-4 border border-[#a08216]/40 text-[15px] focus:outline-none focus:border-[#a08216] transition-colors placeholder:text-[#161317]/40"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#a08216] hover:bg-[#7d6611] text-white font-bold uppercase tracking-[0.2em] text-[14px] py-5 transition-colors"
              >
                Start Selling More
              </button>
            </form>

            <p className="text-[#161317]/50 text-[13px] mt-6">
              🔒 Your inbox is yours. Your information stays private.
            </p>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
