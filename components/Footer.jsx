'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GRADIENTS = [
  { label: 'Auralis', gradient: 'linear-gradient(135deg, #3440f0, #8f9bff)' },
  { label: 'Fernhaus', gradient: 'linear-gradient(135deg, #14231c, #3f6b4f)' },
  { label: 'Kinetiq', gradient: 'linear-gradient(135deg, #1a1a1a, #4a4a52)' },
  { label: 'Solace', gradient: 'linear-gradient(135deg, #c2410c, #f97316)' },
  { label: 'Nimbus', gradient: 'linear-gradient(135deg, #0c4a6e, #0ea5e9)' },
  { label: 'Oreum', gradient: 'linear-gradient(135deg, #4c1d95, #7c3aed)' },
];

/* 12 confetti cards spread across the footer width */
const POP_CARDS = Array.from({ length: 12 }, (_, i) => ({
  ...GRADIENTS[i % GRADIENTS.length],
  left: `${4 + (i * 88) / 11}%`,
  id: i,
}));

export default function Footer() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelector('.footer__mark'), {
        yPercent: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 65%' },
      });

      // confetti burst: cards launch upward inside the footer (behind the
      // text), arc like confetti, and fall back below the bottom edge
      const cards = root.querySelectorAll('.footer__pop-card');
      const rand = gsap.utils.random;

      const buildBurst = () => {
        const h = root.offsetHeight;
        const tl = gsap.timeline();
        cards.forEach((card, i) => {
          const delay = rand(0, 0.35);
          // every third card is a "big pop" that reaches the top of the footer;
          // the rest fill the middle — like natural confetti
          const peak =
            i % 3 === 0
              ? rand(h * 1.0, h * 1.25)
              : rand(h * 0.45, h * 0.95);
          // higher pops travel a bit longer — feels physical
          const up = 0.45 + (peak / h) * 0.4;
          const down = up * rand(1.15, 1.35);
          const drift = rand(-180, 180);
          const spin = rand(-360, 360);

          tl.set(card, { y: 0, x: 0, rotation: rand(-30, 30) }, 0)
            .to(
              card,
              { y: -peak, duration: up, ease: 'power2.out' },
              delay
            )
            .to(
              card,
              { y: 60, duration: down, ease: 'power2.in' },
              delay + up
            )
            .to(
              card,
              { x: drift, rotation: `+=${spin}`, duration: up + down, ease: 'none' },
              delay
            );
        });
        return tl;
      };

      let burst;
      ScrollTrigger.create({
        trigger: root,
        start: 'top 55%', // fires as the footer fills the viewport
        onEnter: () => {
          burst?.kill();
          burst = buildBurst(); // fresh randomness every entry
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="footer" ref={rootRef}>
      <div className="footer__top">
        <div>
          <p className="footer__blurb">
            Velnox is a digital agency crafting websites, brands and products
            with precision — for teams that refuse to blend in.
          </p>
        </div>
        <div className="footer__col">
          <h5>Sitemap</h5>
          <a href="#top">Home</a>
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#studio">Studio</a>
          <a href="#process">Process</a>
        </div>
        <div className="footer__col">
          <h5>Socials</h5>
          <a href="#" target="_blank" rel="noreferrer">Instagram</a>
          <a href="#" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="#" target="_blank" rel="noreferrer">Twitter / X</a>
          <a href="#" target="_blank" rel="noreferrer">Dribbble</a>
        </div>
        <div className="footer__col">
          <h5>Contact</h5>
          <a href="mailto:hello@velnox.studio">hello@velnox.studio</a>
          <a href="#contact">Start a project</a>
        </div>
      </div>

      <div className="footer__bar">
        <span>© 2026 Velnox. All rights reserved.</span>
        <span>Designed & built by Velnox</span>
      </div>

      <div className="footer__mark" aria-hidden="true">
        Velnox<span className="reg">®</span>
      </div>

      <div className="footer__pop" aria-hidden="true">
        {POP_CARDS.map((c) => (
          <div
            key={c.id}
            className="footer__pop-card"
            style={{ background: c.gradient, left: c.left }}
          >
            <span>{c.label}</span>
          </div>
        ))}
      </div>
    </footer>
  );
}
