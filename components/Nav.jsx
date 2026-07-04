'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Studio', href: '#studio' },
  { label: 'Process', href: '#process' },
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

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`} ref={navRef}>
        <a href="#top" className="nav__logo" aria-label="Velnox home">
          Velnox<sup>®</sup>
        </a>
        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn-pill">
          <span>Start a project</span>
        </a>
        <button
          className={`nav__burger ${open ? 'is-open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <i />
          <i />
        </button>
      </header>

      <div className="menu-overlay" ref={overlayRef}>
        <button
          className="menu-overlay__close"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
        <ul>
          {[...LINKS, { label: 'Contact', href: '#contact' }].map((l) => (
            <li className="menu-overlay__link" key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="menu-overlay__foot">
          <span>hello@velnox.studio</span>
          <span>© 2026 Velnox</span>
        </div>
      </div>
    </>
  );
}
