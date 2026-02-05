'use client';

import { useRef, useState } from 'react';

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleVideoClick = () => {
    togglePlay();
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setTimeout(() => {
        videoRef.current?.load(); // Reload to show poster image again
      }, 1000);
    }
  };

  return (
    <div className="relative h-[350px] lg:h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-gray-900 group cursor-pointer">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster="/images/group-coaching.jpg"
        onClick={handleVideoClick}
        onEnded={handleVideoEnded}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      >
        <source src="/videos/hero-background-1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay and play button - only show when not playing */}
      {!isPlaying && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={togglePlay}
          >
            <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-[#FF6B35] ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </>
      )}

      {/* Video controls overlay when playing */}
      {isPlaying && (
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 bg-black/50 px-4 py-2 rounded-lg">
          <button
            onClick={togglePlay}
            className="text-white hover:text-[#FF6B35] transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
