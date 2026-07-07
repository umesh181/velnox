'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MediaVideo from '@/components/ui/MediaVideo';

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const playVideo = () => {
      const video = videoRef.current;
      if (!video || !isPlaying) return;
      if (video.readyState < 2) {
        video.load();
      }
      void video.play().catch(() => {});
    };

    const pauseVideo = () => {
      videoRef.current?.pause();
    };

    const ctx = gsap.context(() => {
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

      ScrollTrigger.create({
        trigger: root,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: playVideo,
        onLeave: pauseVideo,
        onEnterBack: playVideo,
        onLeaveBack: pauseVideo,
      });
    }, root);

    return () => ctx.revert();
  }, [isPlaying]);

  const handlePlayPause = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();

    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    if (video.readyState < 2) {
      video.load();
    }

    void video.play().catch(() => {});
    setIsPlaying(true);
  };

  return (
    <section
      ref={rootRef}
      className="mx-auto w-full max-w-[1600px] px-gutter py-[clamp(24px,4vh,60px)]"
      id="showreel"
    >
      <div
        onClick={(e) => handlePlayPause(e)}
        className="video-card group relative h-[clamp(550px,88vh,1050px)] w-full cursor-pointer overflow-hidden border border-line/10 bg-black shadow-2xl transition-all duration-500"
      >
        <MediaVideo
          ref={videoRef}
          className="h-full w-full object-cover transition-transform duration-[1.2s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-[1.03]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/60 pointer-events-none z-[1]" />

        <div className="absolute top-5 left-5 right-16 z-[2] flex items-center gap-3 pointer-events-none sm:top-8 sm:left-8 sm:right-8">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 sm:text-[11px] sm:tracking-[0.2em]">
            Design Showreel // 2026
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePlayPause();
          }}
          className="absolute top-5 right-5 z-[3] pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md select-none transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 sm:top-8 sm:right-8"
          title={isPlaying ? 'Pause Video' : 'Play Video'}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="translate-x-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="absolute inset-x-0 bottom-0 z-[2] flex flex-col items-start gap-4 p-5 pb-6 pointer-events-none sm:flex-row sm:items-end sm:justify-between sm:p-8">
          <div className="max-w-[34ch] text-white sm:max-w-[40ch]">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/60 sm:text-xs">
              Agency Showreel
            </p>
            <h4 className="text-[clamp(18px,5vw,36px)] font-bold uppercase leading-tight tracking-tight">
              Crafting digital experiences that stand out
            </h4>
          </div>

          <a
            href="#services"
            onClick={(e) => e.stopPropagation()}
            className="btn-outline pointer-events-auto shrink-0 self-start rounded-full border-white/20 bg-black px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-white shadow-lg transition-all duration-300 select-none hover:bg-white hover:text-black sm:px-7 sm:py-[18px] sm:text-xs"
          >
            Explore Services →
          </a>
        </div>
      </div>
    </section>
  );
}
