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
    <section className="section container" id="studio" ref={rootRef}>
      <div className="section__head">
        <p className="eyebrow">The Studio</p>
        <span className="section__count">(01)</span>
      </div>

      <p className="about__statement">
        {STATEMENT.map((w, i) => (
          <span key={i} className="word">
            {w.t}
            {i < STATEMENT.length - 1 ? ' ' : ''}
          </span>
        ))}
      </p>

      <div className="stats">
        {STATS.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat__num">
              <span data-count={s.num}>0</span>
              <span className="sym">{s.suffix}</span>
            </div>
            <div className="stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
