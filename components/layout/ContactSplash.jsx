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
        const letters = root.querySelectorAll('.contact-splash__brand span:not(.reg)');
        const reg = root.querySelector('.contact-splash__brand .reg');
        const counter = { v: 0 };

        lenis?.stop();

        gsap.set(root, { yPercent: 0, autoAlpha: 1, pointerEvents: 'auto' });
        gsap.set(letters, { y: '110%' });
        gsap.set(reg, { opacity: 0 });
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

        tl.to(letters, {
          y: 0,
          duration: 0.9,
          stagger: 0.055,
          ease: 'power4.out',
          delay: 0.15,
        })
          .to(
            counter,
            {
              v: 100,
              duration: 1.4,
              ease: 'power2.inOut',
              onUpdate: () => {
                if (countRef.current) {
                  countRef.current.textContent = `${Math.round(counter.v)}%`;
                }
              },
            },
            '<'
          )
          .to(reg, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '<0.45')
          .to(reg, { opacity: 0, duration: 0.3 }, '>0.75')
          .call(finishScroll)
          .to(
            letters,
            {
              y: '-110%',
              duration: 0.7,
              stagger: 0.04,
              ease: 'power3.in',
            },
            '<'
          )
          .to(
            root,
            {
              yPercent: -100,
              duration: 0.9,
              ease: 'power4.inOut',
            },
            '-=0.35'
          );
      }),
  }));

  const letter = 'inline-block translate-y-[110%]';

  return (
    <div
      ref={rootRef}
      className="contact-splash pointer-events-none fixed inset-0 z-[500] flex items-center justify-center bg-ink text-bg opacity-0 will-change-transform"
      aria-hidden="true"
    >
      <div
        className="contact-splash__brand flex overflow-hidden pt-[0.08em] pr-[0.12em] text-[clamp(48px,10vw,140px)] font-bold uppercase leading-none tracking-[-0.04em]"
        aria-label="Velnox"
      >
        <span className={letter}>V</span>
        <span className={letter}>E</span>
        <span className={letter}>L</span>
        <span className={letter}>N</span>
        <span className={letter}>O</span>
        <span className={letter}>X</span>
        <span className="reg inline-block self-start ml-[0.08em] mt-[0.28em] text-[0.3em] tracking-normal opacity-0">
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
