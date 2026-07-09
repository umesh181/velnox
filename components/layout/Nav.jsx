'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const LINKS = [
  { label: 'Projects', href: '#work' },
  { label: 'Expertise', href: '#services' },
  { label: 'About', href: '#studio' },
  { label: 'Approach', href: '#process' },
];

export default function Nav() {
  const navRef = useRef(null);
  const overlayRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // slide nav in after preloader
  useEffect(() => {
    const show = () => {
      gsap.to(navRef.current, {
        y: 0,
        duration: 1,
        ease: 'power4.out',
        delay: 0.1,
      });
    };
    window.addEventListener('velnox:loaded', show, { once: true });
    const fallback = setTimeout(show, 4500);
    return () => {
      window.removeEventListener('velnox:loaded', show);
      clearTimeout(fallback);
    };
  }, []);

  // scrolled state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // mobile overlay
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const links = overlay.querySelectorAll('.menu-overlay__link a');
    if (open) {
      window.__lenis?.stop();
      gsap.set(overlay, { visibility: 'visible' });
      gsap.to(overlay, {
        clipPath: 'inset(0% 0 0% 0)',
        duration: 0.7,
        ease: 'power4.inOut',
      });
      gsap.fromTo(
        links,
        { y: '110%' },
        { y: 0, duration: 0.8, stagger: 0.07, delay: 0.25, ease: 'power4.out' }
      );
    } else {
      window.__lenis?.start();
      gsap.to(overlay, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.6,
        ease: 'power4.inOut',
        onComplete: () => gsap.set(overlay, { visibility: 'hidden' }),
      });
    }
  }, [open]);

  // hamburger bars morph into an X when the menu is open
  const bar =
    'absolute left-[10px] right-[10px] h-[2px] transition-[transform,top,background] duration-[400ms] ease-brand';

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-[100] flex h-nav -translate-y-full items-center justify-between px-gutter transition-[background,backdrop-filter] duration-[400ms] ${
          scrolled
            ? 'border-b border-line bg-[rgba(242,239,233,0.75)] backdrop-blur-[14px]'
            : ''
        }`}
        ref={navRef}
      >
        <a
          href="#top"
          className="z-[102] text-[20px] font-bold uppercase tracking-[-0.03em]"
          aria-label="Velnox home"
        >
          Velnox<sup className="text-[10px]">®</sup>
        </a>
        <nav
          className="flex gap-9 max-[900px]:hidden"
          aria-label="Primary"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative py-1 text-[14px] font-medium after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-right after:scale-x-0 after:bg-ink after:transition-transform after:duration-[400ms] after:ease-brand after:content-[''] hover:after:origin-left hover:after:scale-x-100"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn-pill max-[900px]:hidden">
          <span>Start a project</span>
        </a>
        <button
          className="relative z-[102] hidden h-11 w-11 max-[900px]:block"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <i
            className={`${bar} ${
              open ? 'top-[21px] rotate-45 bg-bg' : 'top-[17px] bg-ink'
            }`}
          />
          <i
            className={`${bar} ${
              open ? 'top-[21px] -rotate-45 bg-bg' : 'top-[25px] bg-ink'
            }`}
          />
        </button>
      </header>

      {/* menu-overlay__link stays as a GSAP selector hook for the link reveal */}
      <div
        className="menu-overlay fixed inset-0 z-[101] flex flex-col justify-center bg-ink px-gutter text-bg [clip-path:inset(0_0_100%_0)] invisible"
        ref={overlayRef}
      >
        <button
          className="absolute right-gutter top-4 grid h-12 w-12 place-items-center rounded-full border border-[rgba(242,239,233,0.35)] text-[18px] leading-none text-bg active:bg-[rgba(242,239,233,0.15)]"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
        <ul>
          {[...LINKS, { label: 'Contact', href: '#contact' }].map((l) => (
            <li className="menu-overlay__link block overflow-hidden" key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="inline-block text-[clamp(44px,10vw,80px)] font-bold uppercase leading-[1.15] tracking-[-0.03em] active:text-accent-soft"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="absolute bottom-8 left-gutter right-gutter flex justify-between text-[13px] text-cream-55">
          <a href="mailto:agencyvelnox@gmail.com">agencyvelnox@gmail.com</a>
          <span>© 2026 Velnox</span>
        </div>
      </div>
    </>
  );
}
