'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactSplash from '@/components/layout/ContactSplash';
import { isTouchDevice } from '@/lib/perf';

gsap.registerPlugin(ScrollTrigger);

function resolveHashTarget(href) {
  if (!href || !href.startsWith('#') || href.length < 2) return null;

  try {
    return document.querySelector(href);
  } catch {
    return null;
  }
}

export default function SmoothScroll({ children }) {
  const splashRef = useRef(null);

  useEffect(() => {
    const touch = isTouchDevice();

    const lenis = new Lenis({
      lerp: touch ? 0.12 : 0.1,
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1,
    });
    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    if (!touch) gsap.ticker.lagSmoothing(0);

    const onClick = async (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;

      const href = a.getAttribute('href');
      const target = resolveHashTarget(href);
      if (!target) return;

      e.preventDefault();

      if (splashRef.current) {
        await splashRef.current.play(href);
        return;
      }

      lenis.scrollTo(target, { offset: -60, duration: touch ? 1 : 1.4 });
    };

    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return (
    <>
      <ContactSplash ref={splashRef} />
      {children}
    </>
  );
}
