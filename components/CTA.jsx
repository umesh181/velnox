'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function useMagnetic(ref, strength = 0.35) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(hover: none)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });

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
    <section className="cta container" id="contact" ref={rootRef}>
      <div className="cta__ring" aria-hidden="true" />
      <p className="eyebrow cta__eyebrow">Your move</p>
      <h2 className="cta__title">
        <span className="mask-line">
          <span>Let’s build</span>
        </span>
        <span className="mask-line">
          <span>
            something great
          </span>
        </span>
      </h2>
      <div className="cta__actions">
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
