'use client';

import { useEffect } from 'react';
import gsap from 'gsap';

/* Magnetic hover: the element leans toward the cursor and springs back. */
export default function useMagnetic(ref, strength = 0.35) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(hover: none)').matches) return;

    const xTo = gsap.quickTo(el, 'x', {
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    });
    const yTo = gsap.quickTo(el, 'y', {
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    });

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [ref, strength]);
}
