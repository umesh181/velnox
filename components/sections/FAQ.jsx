'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FAQ_ITEMS } from '@/lib/seo/config';
import { onSectionGoto, revealElements } from '@/lib/sectionReveal';

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const rootRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const off = onSectionGoto('faq', () => {
      revealElements([
        root.querySelector('.section__title'),
        root.querySelectorAll('.faq-item'),
      ]);
    });

    const ctx = gsap.context(() => {
      gsap.from(root.querySelector('.section__title'), {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 78%' },
      });
      gsap.from(root.querySelectorAll('.faq-item'), {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.querySelector('.faq__list'), start: 'top 85%' },
      });
    }, root);

    return () => {
      off();
      ctx.revert();
    };
  }, []);

  return (
    <section
      className="mx-auto w-full px-gutter pt-[clamp(30px,4vh,60px)] pb-[clamp(90px,14vh,180px)] max-[900px]:pt-8 max-[900px]:pb-[48px]"
      id="faq"
      ref={rootRef}
      aria-labelledby="faq-heading"
    >
      <div className="mb-[clamp(48px,8vh,96px)] max-[900px]:mb-8 flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-6">FAQ</p>
          <h2
            id="faq-heading"
            className="section__title max-w-[20ch] text-[clamp(32px,5vw,76px)] font-medium leading-[1.08] tracking-[-0.03em]"
          >
            Questions teams ask before they hire us
          </h2>
        </div>
        <span className="text-[13px] tabular-nums text-ink-40 whitespace-nowrap">
          (05)
        </span>
      </div>

      <div className="faq__list mx-auto max-w-[min(900px,100%)] divide-y divide-line border-y border-line">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i;
          const panelId = `faq-panel-${i}`;
          const buttonId = `faq-button-${i}`;

          return (
            <article key={item.question} className="faq-item">
              <h3 className="m-0">
                <button
                  id={buttonId}
                  type="button"
                  className="flex w-full items-center justify-between gap-6 py-[clamp(22px,3vh,32px)] text-left"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                >
                  <span className="text-[clamp(17px,2vw,22px)] font-semibold leading-[1.25] tracking-[-0.02em]">
                    {item.question}
                  </span>
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-[18px] leading-none transition-transform duration-300"
                    aria-hidden="true"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
                  >
                    +
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="pb-[clamp(22px,3vh,32px)] text-[clamp(15px,1.2vw,17px)] leading-[1.7] text-ink-60"
              >
                {item.answer}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
