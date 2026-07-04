'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

export default function Hero() {
  const rootRef = useRef(null);

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

    // subtle parallax + fade on the WebGL orb so type stays the focus
    const ctx = gsap.context(() => {
      gsap.to(root.querySelector('.hero__canvas'), {
        yPercent: 18,
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
    <section className="hero" id="top" ref={rootRef}>
      <div className="hero__canvas">
        <HeroCanvas />
      </div>

      <div className="hero__content">
        <p className="hero__eyebrow eyebrow">Digital agency — Worldwide</p>

        <h1 className="hero__title">
          <span className="mask-line">
            <span>We craft digital</span>
          </span>
          <span className="mask-line">
            <span className="indent">experiences that</span>
          </span>
          <span className="mask-line">
            <span>move brands forward</span>
          </span>
        </h1>

        <div className="hero__row">
          <p className="hero__sub">
            Velnox is a digital agency partnering with ambitious teams to
            design, build and scale websites and products that win attention —
            and keep it.
          </p>
          <div className="hero__cta">
            <a href="#contact" className="btn-big">
              <span>Start a project ↗</span>
            </a>
            <a href="#work" className="btn-outline">
              <span>See our work</span>
            </a>
          </div>
        </div>
      </div>

      <div className="hero__scroll">Scroll</div>
    </section>
  );
}
