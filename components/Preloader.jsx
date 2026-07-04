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

  return (
    <div className="preloader" ref={rootRef}>
      <div className="preloader__brand" aria-label="Velnox">
        <span>V</span>
        <span>E</span>
        <span>L</span>
        <span>N</span>
        <span>O</span>
        <span>X</span>
        <span className="reg">®</span>
      </div>
      <div className="preloader__tag">Digital Agency</div>
      <div className="preloader__count" ref={countRef}>
        0%
      </div>
    </div>
  );
}
