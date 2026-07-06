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
  { label: 'Sphoorthi', gradient: 'linear-gradient(135deg, #9ea09e, #8c8e8c)' },
  { label: 'Sri Gowri', gradient: 'linear-gradient(135deg, #9a9da0, #838689)' },
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

  const heading =
    'mb-[18px] text-[12px] font-semibold uppercase tracking-[0.18em] text-cream-40';
  const link =
    "relative block w-fit py-[5px] text-[15px] text-[rgba(242,239,233,0.85)] after:absolute after:bottom-[2px] after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-bg after:transition-transform after:duration-[400ms] after:ease-brand after:content-[''] hover:after:origin-left hover:after:scale-x-100";

  return (
    <footer
      className="relative overflow-hidden rounded-t-[clamp(24px,4vw,48px)] bg-ink px-gutter pt-[clamp(64px,10vh,120px)] text-bg"
      ref={rootRef}
    >
      <div className="relative z-[1] grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 pb-[clamp(48px,8vh,90px)] max-[900px]:grid-cols-2">
        <div>
          <p className="max-w-[300px] text-[15px] leading-[1.6] text-[rgba(242,239,233,0.6)]">
            Velnox is a digital agency crafting websites, brands and products
            with precision - for teams that refuse to blend in.
          </p>
        </div>
        <div>
          <h5 className={heading}>Sitemap</h5>
          <a href="#top" className={link}>Home</a>
          <a href="#work" className={link}>Work</a>
          <a href="#services" className={link}>Services</a>
          <a href="#studio" className={link}>Studio</a>
          <a href="#process" className={link}>Process</a>
        </div>
        <div>
          <h5 className={heading}>Socials</h5>
          <a href="#" target="_blank" rel="noreferrer" className={link}>Instagram</a>
          <a href="#" target="_blank" rel="noreferrer" className={link}>LinkedIn</a>
          <a href="#" target="_blank" rel="noreferrer" className={link}>Twitter / X</a>
          <a href="#" target="_blank" rel="noreferrer" className={link}>Dribbble</a>
        </div>
        <div>
          <h5 className={heading}>Contact</h5>
          <a href="mailto:hello@velnox.studio" className={link}>hello@velnox.studio</a>
          <a href="#contact" className={link}>Start a project</a>
        </div>
      </div>

      <div className="relative z-[1] flex flex-wrap justify-between gap-4 border-t border-[rgba(242,239,233,0.15)] py-[22px] text-[13px] text-cream-45">
        <span>© 2026 Velnox. All rights reserved.</span>
        <span>Designed & built by Velnox</span>
      </div>

      {/* footer__mark is a GSAP parallax hook */}
      <div
        className="footer__mark relative z-[1] mb-[-0.08em] whitespace-nowrap text-center text-[clamp(80px,17.5vw,300px)] font-bold uppercase leading-[0.76] tracking-[-0.04em] text-bg select-none"
        aria-hidden="true"
      >
        Velnox<span className="align-super text-[0.18em]">®</span>
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {POP_CARDS.map((c) => (
          <div
            key={c.id}
            className="footer__pop-card absolute bottom-[-240px] grid aspect-[3/2] w-[clamp(130px,13vw,210px)] place-items-center rounded-[12px] shadow-[0_18px_50px_rgba(0,0,0,0.45)] will-change-transform"
            style={{ background: c.gradient, left: c.left }}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgba(255,255,255,0.9)]">
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </footer>
  );
}
