'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useMagnetic from '@/hooks/useMagnetic';

gsap.registerPlugin(ScrollTrigger);

const HeroCanvas = dynamic(() => import('@/components/effects/HeroCanvas'), {
  ssr: false,
});

export default function Hero() {
  const rootRef = useRef(null);
  const magRef = useRef(null);
  useMagnetic(magRef);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const lines = root.querySelectorAll('.hero__title .mask-line > span');
    gsap.set(lines, { y: '110%' });

    const play = () => {
      const tl = gsap.timeline();
      tl.to(lines, {
        y: 0,
        duration: 1.2,
        stagger: 0.09,
        ease: 'power4.out',
      })
        .to(
          root.querySelector('.hero__eyebrow'),
          { opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.7'
        )
        .to(
          [root.querySelector('.hero__sub'), root.querySelector('.hero__cta')],
          { opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power2.out' },
          '-=0.5'
        )
        .to(
          root.querySelector('.hero__scroll'),
          { opacity: 1, duration: 0.8 },
          '-=0.4'
        );
    };

    window.addEventListener('velnox:loaded', play, { once: true });
    const fallback = setTimeout(play, 4800);

    // particle field falls away and fades as you scroll into the page
    const ctx = gsap.context(() => {
      gsap.to(root.querySelector('.hero__canvas'), {
        yPercent: 22,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, root);

    return () => {
      window.removeEventListener('velnox:loaded', play);
      clearTimeout(fallback);
      ctx.revert();
    };
  }, []);

  return (
    <section
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-gutter pt-[calc(var(--spacing-nav)+24px)] pb-[60px] text-center"
      id="top"
      ref={rootRef}
    >
      {/* hero__canvas — GSAP scrubs this on scroll; three.js mounts a <canvas> inside */}
      <div className="hero__canvas absolute inset-0 z-0 [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full">
        <HeroCanvas />
      </div>

      <div className="relative z-[1] flex flex-col items-center">
        <p className="hero__eyebrow eyebrow mb-[clamp(20px,4vh,40px)] opacity-0">
          Digital agency · Worldwide
        </p>

        <h1 className="hero__title max-w-[15ch] text-[clamp(40px,6.4vw,96px)] font-bold uppercase leading-[0.98] tracking-[-0.045em] max-[900px]:text-[clamp(40px,10.4vw,64px)] max-[900px]:leading-[1.02]">
          <span className="mask-line">
            <span>We craft digital</span>
          </span>
          <span className="mask-line">
            <span>experiences that</span>
          </span>
          <span className="mask-line">
            <span>
              move brands <em className="not-italic text-accent">forward</em>
            </span>
          </span>
        </h1>

        <p className="hero__sub mt-[clamp(20px,4vh,36px)] max-w-[460px] text-[clamp(15px,1.3vw,18px)] leading-[1.6] text-ink-60 opacity-0">
          Velnox is a digital agency partnering with ambitious teams to design,
          build and scale websites and products that win attention and keep
          it.
        </p>

        <div className="hero__cta mt-[clamp(24px,4vh,40px)] flex items-center gap-[14px] opacity-0 max-[900px]:w-full max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:gap-3">
          <a
            href="#contact"
            className="btn-big max-[900px]:justify-center"
            ref={magRef}
          >
            <span>Start a project ↗</span>
          </a>
          <a href="#work" className="btn-outline max-[900px]:justify-center">
            <span>See our work</span>
          </a>
        </div>
      </div>

      <div className="hero__scroll absolute bottom-[26px] left-1/2 z-[1] -translate-x-1/2 text-[11px] uppercase tracking-[0.22em] text-ink-40 opacity-0">
        Scroll
      </div>
    </section>
  );
}
