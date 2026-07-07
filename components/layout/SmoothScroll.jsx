'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    window.__lenis = lenis;

    lenis.on('scroll', () => ScrollTrigger.update());

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;

      const href = a.getAttribute('href');
      const target = resolveHashTarget(href);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target, { offset: -60, duration: 1.4 });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return children;
}
