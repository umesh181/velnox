'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function scrollToSection(href, lenis) {
  const id = href?.replace('#', '');
  if (!id) return;

  const target = document.getElementById(id);
  if (!target) return;

  const top = Math.max(0, target.offsetTop - 60);

  window.scrollTo(0, top);

  if (lenis) {
    lenis.scrollTo(top, { immediate: true, force: true });
  }

  window.dispatchEvent(
    new CustomEvent('velnox:goto-section', { detail: { id } })
  );
  ScrollTrigger.refresh();
}

const ContactSplash = forwardRef(function ContactSplash(_, ref) {
  const rootRef = useRef(null);
  const countRef = useRef(null);
  const playingRef = useRef(false);
  const targetHrefRef = useRef('#contact');

  useImperativeHandle(ref, () => ({
    play: (href = '#contact') =>
      new Promise((resolve) => {
        const root = rootRef.current;
        if (!root || playingRef.current) {
          resolve();
          return;
        }

        targetHrefRef.current = href;

        const prefersReducedMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches;

        const lenis = window.__lenis;

        if (prefersReducedMotion) {
          scrollToSection(href, lenis);
          resolve();
          return;
        }

        playingRef.current = true;
        const counter = { v: 0 };

        lenis?.stop();

        gsap.set(root, { yPercent: 100, autoAlpha: 1, pointerEvents: 'auto' });
        if (countRef.current) countRef.current.textContent = '0%';

        const finishScroll = () => scrollToSection(targetHrefRef.current, lenis);

        const tl = gsap.timeline({
          onComplete: () => {
            gsap.set(root, { yPercent: 0, autoAlpha: 0, pointerEvents: 'none' });
            playingRef.current = false;
            lenis?.start();
            requestAnimationFrame(finishScroll);
            resolve();
          },
        });

        tl.to(root, {
          yPercent: 0,
          duration: 0.5,
          ease: 'power3.inOut',
        })
          .to(counter, {
            v: 100,
            duration: 0.55,
            ease: 'power2.out',
            onUpdate: () => {
              if (countRef.current) {
                countRef.current.textContent = `${Math.round(counter.v)}%`;
              }
            },
          })
          .call(finishScroll)
          .to(root, {
            yPercent: -100,
            duration: 0.5,
            ease: 'power3.inOut',
          }, '-=0.2');
      }),
  }));

  return (
    <div
      ref={rootRef}
      className="contact-splash pointer-events-none fixed inset-0 z-[500] flex items-center justify-center bg-ink text-bg opacity-0 will-change-transform"
      aria-hidden="true"
    >
      <div
        className="contact-splash__brand flex pt-[0.08em] pr-[0.12em] text-[clamp(48px,10vw,140px)] font-bold uppercase leading-none tracking-[-0.04em]"
        aria-label="Velnox"
      >
        Velnox
        <span className="ml-[0.08em] mt-[0.28em] self-start text-[0.3em] tracking-normal">
          ®
        </span>
      </div>
      <div className="absolute left-gutter bottom-[28px] text-[12px] uppercase tracking-[0.18em] text-cream-45">
        Digital Agency
      </div>
      <div
        ref={countRef}
        className="absolute right-gutter bottom-[28px] text-[clamp(14px,1.6vw,20px)] tabular-nums text-[rgba(242,239,233,0.65)]"
      >
        0%
      </div>
    </div>
  );
});

export default ContactSplash;
