'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ITEMS = [
  'Web Design',
  'Development',
  'Branding',
  'E-Commerce',
  'SEO & Growth',
  'Motion',
];

function Row() {
  return (
    <span className="inline-flex items-center gap-12 text-[clamp(18px,2.4vw,28px)] font-semibold uppercase tracking-[-0.02em]">
      {ITEMS.map((s) => (
        <span key={s}>
          {s} <span className="text-[0.8em] text-accent"> ✦ </span>
        </span>
      ))}
    </span>
  );
}

export default function Marquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 28,
      ease: 'none',
      repeat: -1,
    });
    return () => tween.kill();
  }, []);

  return (
    <div
      className="overflow-hidden whitespace-nowrap border-y border-line bg-bg py-[18px]"
      aria-hidden="true"
    >
      <div
        className="inline-flex items-center gap-12 pr-12 will-change-transform"
        ref={trackRef}
      >
        <Row />
        <Row />
        <Row />
        <Row />
      </div>
    </div>
  );
}
