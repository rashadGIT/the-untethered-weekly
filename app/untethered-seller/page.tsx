"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "../components/Button";
import { UNTETHERED_ACCESS_KEY } from "../components/StartSellingModal";

interface Day {
  number: number;
  title: string;
  description: string;
  audioSrc: string;
  pdfSrc: string;
}

const days: Day[] = [
  {
    number: 1,
    title: "Who Are You When It's Time to Sell?",
    description: "Selling isn't just about knowing how — it's about the woman doing the selling. Discover the powerful connection between who you are and what you do when it's time to sell.",
    audioSrc: "/assets/audio/untethered-seller/day-1.mp3",
    pdfSrc: "/assets/pdfs/untethered-seller/day-1-one-pager.pdf",
  },
  {
    number: 2,
    title: "FearX: What Are You Tethered To?",
    description: "Identify the fears, beliefs, stories, and assumptions that are quietly running the show and keeping you from selling more with confidence and consistency.",
    audioSrc: "/assets/audio/untethered-seller/day-2.mp3",
    pdfSrc: "/assets/pdfs/untethered-seller/day-2-one-pager.pdf",
  },
  {
    number: 3,
    title: "Courage Over Comfort: Choose Differently",
    description: "Explore your sales identity — how you talk to yourself, lead yourself, and see yourself. Learn how to choose courage before you feel ready, every time.",
    audioSrc: "/assets/audio/untethered-seller/day-3.mp3",
    pdfSrc: "/assets/pdfs/untethered-seller/day-3-one-pager.pdf",
  },
  {
    number: 4,
    title: "The Untethering Process: Act Differently",
    description: "Take courageous action that stretches you beyond your comfort zone and creates new evidence. This is where the real shift begins.",
    audioSrc: "/assets/audio/untethered-seller/day-4.mp3",
    pdfSrc: "/assets/pdfs/untethered-seller/day-4-one-pager.pdf",
  },
  {
    number: 5,
    title: "The Untethered Seller: Become Her",
    description: "See what's possible when courageous action becomes your new normal. You're not just doing different things — you're becoming a different seller.",
    audioSrc: "/assets/audio/untethered-seller/day-5.mp3",
    pdfSrc: "/assets/pdfs/untethered-seller/day-5-one-pager.pdf",
  },
];

export default function UntetheredSellerPage() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [playingDay, setPlayingDay] = useState<number | null>(null);
  const [welcomePlaying, setWelcomePlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const access = sessionStorage.getItem(UNTETHERED_ACCESS_KEY);
    if (!access) {
      router.replace("/");
      return;
    }
    setChecked(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, [router]);

  function togglePlay(day: Day) {
    const audio = audioRef.current;
    if (!audio) return;

    if (playingDay === day.number) {
      audio.pause();
      setPlayingDay(null);
      return;
    }

    audio.src = day.audioSrc;
    audio.play();
    setPlayingDay(day.number);
  }

  if (!checked) return null;

  return (
    <>
      <audio
        ref={audioRef}
        onEnded={() => setPlayingDay(null)}
        onPause={() => setPlayingDay((current) => (audioRef.current?.paused ? current : null))}
      />

      <section className="section-padding bg-white">
        <div className="container-narrow text-center">
          {/* Monogram */}
          <div className="mx-auto mb-10 w-24 h-24 rounded-full border border-[#a08216] flex items-center justify-center">
            <span
              className="text-[#a08216] text-[22px] italic tracking-[-0.12em]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              SM
            </span>
          </div>

          {/* Heading */}
          <p
            className="bg-gradient-to-r from-[#a08216] to-[#c4a030] bg-clip-text text-transparent text-[46px] sm:text-[64px] uppercase tracking-[0.3em] leading-tight mb-3"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Sell More
          </p>
          <p className="bg-gradient-to-r from-[#a08216] to-[#c4a030] bg-clip-text text-transparent flex flex-wrap items-baseline justify-center gap-x-2 mb-8 text-[15px] sm:text-[17px] uppercase tracking-[0.35em]">
            <span>As An Untethered Seller</span>
          </p>

          <div className="flex items-center justify-center gap-3 mb-5 text-[#a08216]/40">
            <span className="h-px w-14 sm:w-20 bg-[#a08216]/30" />
            <span className="w-2 h-2 border border-[#a08216] rotate-45 inline-block flex-shrink-0" />
            <span className="h-px w-14 sm:w-20 bg-[#a08216]/30" />
          </div>
          <p className="text-[#161317] text-[13px] sm:text-[14px] uppercase tracking-[0.3em] mb-14">
            A 5-Day Audio Experience For Women Who Sell
          </p>

          {/* Welcome video */}
          <div className="bg-[#FBF7EF] p-5 sm:p-7 mb-12 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-left">
            <div className="relative w-full sm:w-64 h-40 overflow-hidden bg-black flex-shrink-0">
              {welcomePlaying ? (
                <video
                  controls
                  autoPlay
                  className="w-full h-full object-cover"
                  poster="/assets/images/work-with-me/COCC.jpeg"
                >
                  <source src="/assets/videos/untethered-seller/welcome.mp4" type="video/mp4" />
                </video>
              ) : (
                <button
                  type="button"
                  onClick={() => setWelcomePlaying(true)}
                  aria-label="Play welcome video"
                  className="group relative w-full h-full"
                >
                  <Image
                    src="/assets/images/work-with-me/COCC.jpeg"
                    alt="Welcome video preview"
                    fill
                    className="object-cover"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-16 h-16 rounded-full bg-[#a08216] border-2 border-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                      <svg aria-hidden="true" className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </button>
              )}
            </div>
            <div>
              <p className="text-[#a08216] text-[12px] sm:text-[13px] uppercase tracking-[0.25em] font-bold mb-2">Start Here</p>
              <h2 className="text-[#161317] text-[26px] sm:text-[30px] mb-3" style={{ fontFamily: "var(--font-marcellus), serif" }}>Welcome!</h2>
              <p className="text-[#161317]/75 text-[15px] sm:text-[16px] mb-4 leading-relaxed">
                Watch this short welcome video first. I&apos;ll share how this 5-day experience works and how to get the most from it.
              </p>
              <div className="flex flex-col gap-1.5 text-[#161317]/60 text-[13px]">
                <span className="flex items-center gap-2">
                  <svg aria-hidden="true" className="w-4 h-4 text-[#a08216]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
                  </svg>
                  About 90 seconds
                </span>
                <span className="flex items-center gap-2">
                  <svg aria-hidden="true" className="w-4 h-4 text-[#a08216]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 18v-6a9 9 0 1118 0v6M3 18a2 2 0 002 2h1a1 1 0 001-1v-4a1 1 0 00-1-1H3m18 6a2 2 0 01-2 2h-1a1 1 0 01-1-1v-4a1 1 0 011-1h3" />
                  </svg>
                  Use headphones for best experience
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-16 sm:w-24 bg-[#a08216]/30" />
            <span className="text-[#a08216] text-[12px] sm:text-[13px] uppercase tracking-[0.3em] font-bold">Your 5-Day Audio Experience</span>
            <span className="h-px w-16 sm:w-24 bg-[#a08216]/30" />
          </div>

          {/* Day list */}
          <div className="flex flex-col gap-2 mb-4 text-left">
            {days.map((day) => {
              const isPlaying = playingDay === day.number;
              return (
                <div key={day.number} className="border border-[#a08216]/30 flex flex-col sm:flex-row sm:items-stretch">
                  <div className="flex-shrink-0 w-full sm:w-24 bg-[#a08216] text-white text-center flex flex-col items-center justify-center py-4 sm:py-0">
                    <p className="text-[11px] uppercase tracking-[0.25em] mb-0.5">Day</p>
                    <p className="text-[32px] leading-none" style={{ fontFamily: "var(--font-marcellus), serif" }}>{day.number}</p>
                  </div>
                  <div className="flex-1 px-5 sm:px-7 py-5 sm:py-6">
                    <h3 className="text-[#161317] text-[19px] sm:text-[20px] mb-1.5" style={{ fontFamily: "var(--font-marcellus), serif" }}>{day.title}</h3>
                    <p className="text-[#161317]/65 text-[14px] sm:text-[15px] leading-relaxed">{day.description}</p>
                  </div>
                  <div className="flex items-center justify-center gap-4 px-5 sm:px-7 py-4 sm:py-0 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => togglePlay(day)}
                      aria-label={isPlaying ? `Pause Day ${day.number} audio` : `Play Day ${day.number} audio`}
                      className="w-11 h-11 rounded-full border-2 border-[#a08216] text-[#a08216] flex items-center justify-center hover:bg-[#a08216] hover:text-white transition-colors"
                    >
                      {isPlaying ? (
                        <svg aria-hidden="true" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                      ) : (
                        <svg aria-hidden="true" className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>
                    <span className="h-8 w-px bg-[#a08216]/30" aria-hidden="true" />
                    <a
                      href={day.pdfSrc}
                      download
                      className="flex items-center gap-2 text-[#a08216] hover:text-[#7d6611] transition-colors"
                    >
                      <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                      <span className="text-[11px] uppercase tracking-wide leading-tight">Download<br /> Your One Pager</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-[#a08216] text-[15px] mb-14">Apply the work. Take the action. You&apos;ve got this. ♥</p>

          {/* Work with Shannon CTA */}
          <div className="bg-[#FBF7EF] p-5 sm:p-7 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 text-left mb-8">
            <div className="relative w-full sm:w-52 h-60 overflow-hidden flex-shrink-0">
              <Image
                src="/assets/images/home/table-portrait.jpg"
                alt="Shannon Muruli"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-[#a08216] text-[12px] sm:text-[13px] uppercase tracking-[0.25em] font-bold mb-2">Ready To Go Deeper?</p>
              <h2 className="text-[#161317] text-[26px] sm:text-[30px] mb-3" style={{ fontFamily: "var(--font-marcellus), serif" }}>Work With Shannon</h2>
              <p className="text-[#161317]/75 text-[15px] sm:text-[16px] mb-6 leading-relaxed">
                Whether you&apos;re just getting started, building momentum, growing your experience, or stepping into bigger opportunities — my coaching meets you where you are and helps you become the Untethered Seller you&apos;re meant to be.
              </p>
              <Button href="/work-with-me" variant="primary" className="!rounded !text-[13px] !tracking-[0.2em]">
                Explore Coaching Options
              </Button>
            </div>
          </div>

          <p className="text-[#161317]/50 text-[13px]">🔒 Your inbox is yours. Your information stays private.</p>
        </div>
      </section>
    </>
  );
}
