'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useMagnetic from './useMagnetic';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const rootRef = useRef(null);
  const magRef = useRef(null);
  useMagnetic(magRef);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const lines = root.querySelectorAll('.cta__title .mask-line > span');
      gsap.from(lines, {
        y: '110%',
        duration: 1.1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: root, start: 'top 70%' },
      });
      gsap.from(root.querySelector('.cta__actions'), {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 70%' },
      });
      gsap.to(root.querySelector('.cta__ring'), {
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative mx-auto w-full overflow-hidden px-gutter py-[clamp(120px,20vh,240px)] text-center"
      id="contact"
      ref={rootRef}
    >
      {/* cta__ring / cta__title / cta__actions are GSAP scrub + reveal hooks */}
      <div
        className="cta__ring pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[clamp(340px,44vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-line"
        aria-hidden="true"
      />
      <p className="eyebrow mb-7 justify-center">Your move</p>
      <h2 className="cta__title text-[clamp(48px,9vw,150px)] font-bold uppercase leading-[0.98] tracking-[-0.045em]">
        <span className="mask-line">
          <span>Let’s build</span>
        </span>
        <span className="mask-line">
          <span>
            something great
          </span>
        </span>
      </h2>
      <div className="cta__actions mt-[clamp(36px,6vh,64px)] flex flex-wrap items-center justify-center gap-[18px]">
        <a href="mailto:hello@velnox.studio" className="btn-big" ref={magRef}>
          <span>hello@velnox.studio ↗</span>
        </a>
        <a href="#work" className="btn-outline">
          <span>Browse work first</span>
        </a>
      </div>
    </section>
  );
}
