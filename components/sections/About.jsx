'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

const STATS = [
  { num: 40, suffix: '+', label: 'Projects shipped' },
  { num: 12, suffix: '', label: 'Industries served' },
  { num: 98, suffix: '%', label: 'Client retention' },
  { num: 6, suffix: '', label: 'Countries reached' },
];

export default function About() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // word-by-word scrub reveal
      gsap.to(root.querySelectorAll('.about__statement .word'), {
        opacity: 1,
        stagger: 0.06,
        ease: 'none',
        scrollTrigger: {
          trigger: root.querySelector('.about__statement'),
          start: 'top 78%',
          end: 'bottom 45%',
          scrub: 0.6,
        },
      });

      // stat counters
      root.querySelectorAll('.stat__num [data-count]').forEach((el) => {
        const target = Number(el.dataset.count);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
          onUpdate: () => {
            el.textContent = Math.round(obj.v);
          },
        });
      });

      gsap.from(root.querySelectorAll('.stat'), {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.querySelector('.stats'),
          start: 'top 85%',
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="mx-auto w-full px-gutter py-[clamp(90px,14vh,180px)]"
      id="studio"
      ref={rootRef}
    >
      <div className="mb-[clamp(48px,8vh,96px)] flex items-end justify-between gap-6">
        <p className="eyebrow">The Studio</p>
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

      {/* stats / stat / stat__num are GSAP counter + reveal hooks */}
      <div className="stats mt-[clamp(64px,10vh,120px)] grid grid-cols-4 gap-6 border-t border-line max-[900px]:grid-cols-2 max-[900px]:gap-x-6 max-[900px]:gap-y-10">
        {STATS.map((s) => (
          <div className="stat border-t-2 border-transparent pt-7" key={s.label}>
            <div className="stat__num text-[clamp(44px,5.5vw,88px)] font-bold leading-none tracking-[-0.04em] tabular-nums">
              <span data-count={s.num}>0</span>
              <span className="text-accent">{s.suffix}</span>
            </div>
            <div className="mt-3 text-[13px] uppercase tracking-[0.12em] text-ink-60">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
