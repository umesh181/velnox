'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MediaVideo from '@/components/ui/MediaVideo';
import { isTouchDevice } from '@/lib/perf';

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const rootRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mobile = isTouchDevice();

    const playVideo = () => {
      const video = videoRef.current;
      if (!video || !isPlaying) return;
      if (video.readyState < 2) video.load();
      void video.play().catch(() => {});
    };

    const pauseVideo = () => {
      videoRef.current?.pause();
    };

    const ctx = gsap.context(() => {
      const card = root.querySelector('.video-card');
      if (!card) return;

      gsap.set(card, { transformOrigin: 'center center', force3D: true });

      if (mobile) {
        gsap.fromTo(
          card,
          { scale: 0.92, opacity: 0.35, y: 56 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: root,
              start: 'top 92%',
              end: 'top 35%',
              scrub: 0.5,
            },
          }
        );
      } else {
        gsap.fromTo(
          card,
          {
            scale: 0.9,
            scaleX: 0.86,
            opacity: 0.35,
            y: 72,
            borderRadius: '56px',
            clipPath: 'inset(10% 8% round 56px)',
          },
          {
            scale: 1,
            scaleX: 1,
            opacity: 1,
            y: 0,
            borderRadius: '24px',
            clipPath: 'inset(0% 0% round 24px)',
            ease: 'power2.out',
            scrollTrigger: {
              trigger: root,
              start: 'top 92%',
              end: 'top 28%',
              scrub: 1.15,
            },
          }
        );
      }

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

    if (video.readyState < 2) video.load();
    void video.play().catch(() => {});
    setIsPlaying(true);
  };

  return (
    <section
      ref={rootRef}
      className="mx-auto w-full max-w-[1600px] px-gutter pt-[clamp(32px,5vh,56px)] pb-[clamp(40px,7vh,80px)] max-[900px]:pt-6 max-[900px]:pb-8"
      id="showreel"
    >
      <div
        onClick={(e) => handlePlayPause(e)}
        className="video-card group relative flex w-full cursor-pointer flex-col overflow-hidden rounded-[24px] border border-line/10 bg-black shadow-2xl will-change-[transform,opacity] h-[clamp(560px,88vh,1080px)] max-[900px]:h-auto"
      >
        <div className="relative min-h-0 flex-1 max-[900px]:h-[clamp(300px,52vh,420px)] max-[900px]:flex-none">
          <MediaVideo
            ref={videoRef}
            className="h-full w-full object-cover object-center transition-transform duration-[1.2s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-[1.03]"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/20 pointer-events-none z-[1] max-[900px]:to-black/40" />

          <div className="absolute top-5 left-5 right-[4.5rem] z-[2] flex items-center gap-3 pointer-events-none sm:top-8 sm:left-8 sm:right-24">
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

          {/* Desktop: overlay caption on video */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] max-[900px]:hidden">
            <div className="bg-gradient-to-t from-black via-black/85 to-transparent px-5 pb-6 pt-20 sm:px-8 sm:pb-8 sm:pt-24">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                <div className="min-w-0 max-w-full text-white sm:max-w-[min(52%,28rem)]">
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/60 sm:text-xs">
                    Agency Showreel
                  </p>
                  <h4 className="text-[clamp(15px,2.8vw,30px)] font-bold uppercase leading-[1.12] tracking-tight text-balance">
                    Crafting digital experiences that stand out
                  </h4>
                </div>

                <a
                  href="#services"
                  onClick={(e) => e.stopPropagation()}
                  className="btn-outline pointer-events-auto w-fit shrink-0 rounded-full border-white/20 bg-black/60 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm transition-all duration-300 select-none hover:bg-white hover:text-black sm:px-7 sm:py-[18px] sm:text-xs"
                >
                  Explore Services →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: caption below video — no overlap */}
        <div className="relative z-[2] hidden bg-ink px-5 py-5 text-white max-[900px]:block">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/60">
            Agency Showreel
          </p>
          <h4 className="mb-4 text-[clamp(17px,4.5vw,22px)] font-bold uppercase leading-[1.15] tracking-tight text-balance">
            Crafting digital experiences that stand out
          </h4>
          <a
            href="#services"
            onClick={(e) => e.stopPropagation()}
            className="btn-outline pointer-events-auto inline-flex w-full justify-center rounded-full border-white/20 bg-black/60 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm transition-all duration-300 select-none hover:bg-white hover:text-black"
          >
            Explore Services →
          </a>
        </div>
      </div>
    </section>
  );
}
