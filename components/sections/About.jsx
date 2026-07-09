'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onSectionGoto, revealElements } from '@/lib/sectionReveal';

gsap.registerPlugin(ScrollTrigger);

const STATEMENT = [
  { t: 'We’re' },
  { t: 'not' },
  { t: 'a' },
  { t: 'traditional' },
  { t: 'agency.' },
  { t: 'We’re' },
  { t: 'a' },
  { t: 'team' },
  { t: 'of' },
  { t: 'designers' },
  { t: '&' },
  { t: 'engineers' },
  { t: 'obsessed' },
  { t: 'with' },
  { t: 'the' },
  { t: 'details' },
  { t: 'that' },
  { t: 'make' },
  { t: 'brands' },
  { t: 'impossible' },
  { t: 'to' },
  { t: 'ignore.' },
];

export default function About() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const off = onSectionGoto('studio', () => {
      revealElements(root.querySelectorAll('.about__statement .word'));
    });

    const ctx = gsap.context(() => {
      const words = root.querySelectorAll('.about__statement .word');

      gsap.to(words, {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about__statement',
          start: 'top 85%',
          end: 'bottom 50%',
          scrub: 0.8,
        },
      });
    }, root);

    return () => {
      off();
      ctx.revert();
    };
  }, []);

  return (
    <section
      className="mx-auto w-full px-gutter pt-[clamp(28px,4vh,48px)] pb-[clamp(90px,14vh,180px)] max-[900px]:pb-[40px]"
      id="studio"
      ref={rootRef}
    >
      <div className="mb-[clamp(28px,4vh,48px)] max-[900px]:mb-6 flex items-end justify-between gap-6">
        <p className="eyebrow">About</p>
        <span className="text-[13px] tabular-nums text-ink-40 whitespace-nowrap">
          (01)
        </span>
      </div>

      {/* about__statement + .word are GSAP scrub-reveal hooks */}
      <p className="about__statement max-w-[20ch] text-[clamp(26px,4.2vw,64px)] font-medium leading-[1.22] tracking-[-0.025em]">
        {STATEMENT.map((w, i) => (
          <span key={i} className="word inline-block opacity-[0.14]">
            {w.t}
            {i < STATEMENT.length - 1 ? ' ' : ''}
          </span>
        ))}
      </p>
    </section>
  );
}
