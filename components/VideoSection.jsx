'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // Premium zoom-out/expand scroll reveal effect
      gsap.fromTo(
        root.querySelector('.video-card'),
        { 
          scale: 0.92, 
          borderRadius: '48px',
        },
        {
          scale: 1,
          borderRadius: '24px',
          ease: 'power1.out',
          scrollTrigger: {
            trigger: root,
            start: 'top 95%',
            end: 'top 35%',
            scrub: 1,
          },
        }
      );

      // Play video when it enters viewport, pause when it leaves
      ScrollTrigger.create({
        trigger: root,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          if (videoRef.current && isPlaying) {
            videoRef.current.play().catch(() => {});
          }
        },
        onLeave: () => {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        },
        onEnterBack: () => {
          if (videoRef.current && isPlaying) {
            videoRef.current.play().catch(() => {});
          }
        },
        onLeaveBack: () => {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      });
    }, root);

    return () => ctx.revert();
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <section 
      ref={rootRef}
      className="mx-auto w-full max-w-[1600px] px-gutter py-[clamp(24px,4vh,60px)]"
      id="showreel"
    >
      <div 
        onClick={handlePlayPause}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="video-card group relative h-[clamp(550px,88vh,1050px)] w-full cursor-pointer overflow-hidden border border-line/10 bg-black shadow-2xl transition-all duration-500"
      >
        {/* Background Video */}
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/dnf6zexsv/video/upload/Bubbles-Carousel-16-9_omufhb.mp4"
          loop
          muted
          playsInline
          className="h-full w-full object-cover transition-transform duration-[1.2s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-[1.03]"
        />

        {/* Ambient Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/60 pointer-events-none z-[1]" />

        {/* Dynamic HUD Details */}
        <div className="absolute top-8 left-8 z-[2] flex items-center gap-3 pointer-events-none">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
            Design Showreel // 2026
          </span>
        </div>

        {/* Play/Pause Button in Top Right (replacing FPS text) */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handlePlayPause();
          }}
          className="absolute top-8 right-8 z-[3] pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md select-none transition-all duration-300 hover:bg-white hover:text-black hover:scale-105"
          title={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="translate-x-0.5">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>

        {/* Video Card Bottom Label */}
        <div className="absolute bottom-8 left-8 z-[2] max-w-[40ch] pointer-events-none text-white">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-2">Agency Showreel</p>
          <h4 className="text-[clamp(20px,2.2vw,36px)] font-bold uppercase leading-tight tracking-tight">
            Crafting digital experiences that stand out
          </h4>
        </div>

        {/* Explore Services Button (moved down a little and placed absolute) */}
        <a 
          href="#services"
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-[4px] right-[14px] z-[3] btn-outline text-xs uppercase font-semibold tracking-wider text-white border-white/20 hover:bg-white hover:text-black pointer-events-auto px-7 py-[18px] rounded-full bg-black shadow-lg select-none transition-all duration-300"
        >
          Explore Services →
        </a>

      </div>
    </section>
  );
}
