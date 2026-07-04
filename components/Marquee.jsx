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
    <span className="marquee__item">
      {ITEMS.map((s) => (
        <span key={s} className="marquee__pair">
          {s} <span className="star"> ✦ </span>
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
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track" ref={trackRef}>
        <Row />
        <Row />
        <Row />
        <Row />
      </div>
    </div>
  );
}
