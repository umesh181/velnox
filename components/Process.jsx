'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    title: 'Discover',
    body: 'One sharp kickoff to lock scope, goals and success metrics. We ask the hard questions early so nothing surprises us later.',
  },
  {
    title: 'Design',
    body: 'High-fidelity, production-ready design in days — prototyped, validated, and stress-tested before a single line of code.',
  },
  {
    title: 'Build',
    body: 'Clean, scalable code with performance budgets baked in. Reviewed, tested and staged — no black boxes, no surprises.',
  },
  {
    title: 'Launch & Scale',
    body: 'We ship it live, watch the metrics, and stay in it — iterating, optimising and growing the product as partners.',
  },
];

export default function Process() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 901px)', () => {
        const track = root.querySelector('.process__track');
        const getX = () =>
          -(track.scrollWidth - root.querySelector('.process__wrap').clientWidth);
        gsap.to(track, {
          x: getX,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            // pin only once the cards are fully in view (section top at viewport top)
            start: 'top top',
            end: () => `+=${-getX() + 200}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      });

      mm.add('(max-width: 900px)', () => {
        gsap.from(root.querySelectorAll('.process-card'), {
          y: 60,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: root.querySelector('.process__track'),
            start: 'top 85%',
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="process section" id="process" ref={rootRef}>
      <div className="container">
        <div className="section__head">
          <div>
            <p className="eyebrow" style={{ marginBottom: 24 }}>
              How we work
            </p>
            <h2 className="section__title">
              From brief to brilliant
            </h2>
          </div>
          <span className="section__count">(04)</span>
        </div>

        <div className="process__wrap">
          <div className="process__track">
            {STEPS.map((s, i) => (
              <div className="process-card" key={s.title}>
                <span className="process-card__idx">
                  {String(i + 1).padStart(2, '0')} / 04
                </span>
                <h3 className="process-card__title">{s.title}</h3>
                <p className="process-card__body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
