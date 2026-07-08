'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STEPS } from '@/data/process-steps';
import { onSectionGoto, revealElements } from '@/lib/sectionReveal';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const off = onSectionGoto('process', () => {
      revealElements(root.querySelectorAll('.process-card'));
    });

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

    return () => {
      off();
      ctx.revert();
    };
  }, []);

  return (
    <section
      className="bg-bg-soft py-[clamp(90px,14vh,180px)]"
      id="process"
      ref={rootRef}
    >
      <div className="mx-auto w-full px-gutter">
        <div className="mb-[clamp(48px,8vh,96px)] flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-6">How we work</p>
            <h2 className="section__title max-w-[18ch] text-[clamp(32px,5vw,76px)] font-medium leading-[1.08] tracking-[-0.03em]">
              From brief to brilliant
            </h2>
          </div>
          <span className="text-[13px] tabular-nums text-ink-40 whitespace-nowrap">
            (04)
          </span>
        </div>

        {/* process__wrap / process__track / process-card are horizontal-pin GSAP hooks */}
        <div className="process__wrap overflow-hidden">
          <div className="process__track flex gap-[clamp(20px,3vw,40px)] will-change-transform max-[900px]:flex-col">
            {PROCESS_STEPS.map((s, i) => (
              <div
                className="process-card flex w-[clamp(300px,34vw,480px)] flex-none flex-col gap-[clamp(40px,8vh,120px)] rounded-card border border-line bg-bg p-[clamp(28px,3vw,44px)] max-[900px]:w-full max-[900px]:gap-8"
                key={s.title}
              >
                <span className="text-[15px] font-semibold tabular-nums text-accent">
                  {String(i + 1).padStart(2, '0')} / 04
                </span>
                <h3 className="text-[clamp(30px,3.4vw,52px)] font-bold uppercase leading-none tracking-[-0.03em]">
                  {s.title}
                </h3>
                <p className="text-[15px] leading-[1.65] text-ink-60">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
