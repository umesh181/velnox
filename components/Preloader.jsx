'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const rootRef = useRef(null);
  const countRef = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    window.__lenis?.stop();

    const letters = root.querySelectorAll('.preloader__brand span:not(.reg)');
    const reg = root.querySelector('.preloader__brand .reg');
    const counter = { v: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        window.__lenis?.start();
        window.dispatchEvent(new CustomEvent('velnox:loaded'));
        setDone(true);
      },
    });

    tl.to(letters, {
      y: 0,
      duration: 0.9,
      stagger: 0.055,
      ease: 'power4.out',
      delay: 0.2,
    })
      .to(
        counter,
        {
          v: 100,
          duration: 1.6,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (countRef.current)
              countRef.current.textContent = `${Math.round(counter.v)}%`;
          },
        },
        '<'
      )
      .to(reg, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '<0.5')
      .to(reg, { opacity: 0, duration: 0.3 }, '>0.9')
      .to(letters, {
        y: '-110%',
        duration: 0.7,
        stagger: 0.04,
        ease: 'power3.in',
      }, '<')
      .to(
        root,
        {
          yPercent: -100,
          duration: 0.9,
          ease: 'power4.inOut',
        },
        '-=0.35'
      );

    return () => tl.kill();
  }, []);

  if (done) return null;

  const letter = 'inline-block translate-y-[110%]';

  return (
    <div
      className="fixed inset-0 z-[500] flex items-center justify-center bg-ink text-bg will-change-transform"
      ref={rootRef}
    >
      {/* preloader__brand — GSAP selects the letter spans + .reg by class */}
      <div
        className="preloader__brand flex overflow-hidden pt-[0.08em] pr-[0.12em] text-[clamp(48px,10vw,140px)] font-bold uppercase leading-none tracking-[-0.04em]"
        aria-label="Velnox"
      >
        <span className={letter}>V</span>
        <span className={letter}>E</span>
        <span className={letter}>L</span>
        <span className={letter}>N</span>
        <span className={letter}>O</span>
        <span className={letter}>X</span>
        <span className="reg inline-block self-start ml-[0.08em] mt-[0.28em] text-[0.3em] tracking-normal opacity-0">
          ®
        </span>
      </div>
      <div className="absolute left-gutter bottom-[28px] text-[12px] uppercase tracking-[0.18em] text-cream-45">
        Digital Agency
      </div>
      <div
        className="absolute right-gutter bottom-[28px] text-[clamp(14px,1.6vw,20px)] tabular-nums text-[rgba(242,239,233,0.65)]"
        ref={countRef}
      >
        0%
      </div>
    </div>
  );
}
