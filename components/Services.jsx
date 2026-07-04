'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: 'Web Design',
    tags: 'UI/UX · Art direction · Design systems · Prototyping',
    gradient: 'linear-gradient(135deg, #3440f0 0%, #8f9bff 60%, #d8dcff 100%)',
  },
  {
    title: 'Development',
    tags: 'Next.js · Headless CMS · Web apps · Performance',
    gradient: 'linear-gradient(135deg, #14231c 0%, #3f6b4f 60%, #a8c8a0 100%)',
  },
  {
    title: 'Branding',
    tags: 'Identity · Naming · Guidelines · Visual language',
    gradient: 'linear-gradient(135deg, #c2410c 0%, #f97316 60%, #fed7aa 100%)',
  },
  {
    title: 'E-Commerce',
    tags: 'Shopify · Conversion · Storefronts · Checkout UX',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a52 60%, #b9b9c4 100%)',
  },
  {
    title: 'SEO & Growth',
    tags: 'Technical SEO · Analytics · CRO · Content strategy',
    gradient: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 60%, #ddd6fe 100%)',
  },
];

export default function Services() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll('.service-row'), {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.querySelector('.services__list'),
          start: 'top 82%',
        },
      });
      gsap.from(root.querySelector('.section__title'), {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 75%' },
      });
    }, root);

    // ---- directional fill + in-row cursor-following preview (desktop) ----
    const canHover =
      window.matchMedia('(hover: hover)').matches && window.innerWidth > 900;
    const cleanups = [];

    if (canHover) {
      root.querySelectorAll('.service-row').forEach((row) => {
        const bg = row.querySelector('.service-row__bg');
        const media = row.querySelector('.service-row__media');

        // media is clipped by the row; xPercent/yPercent center it on the cursor
        gsap.set(media, { xPercent: -50, yPercent: -50, scale: 0.7 });
        const xTo = gsap.quickTo(media, 'x', { duration: 0.55, ease: 'power3' });
        const rotTo = gsap.quickTo(media, 'rotation', {
          duration: 0.6,
          ease: 'power3',
        });

        let lastX = 0;
        let rotTimer;

        const localX = (e) => e.clientX - row.getBoundingClientRect().left;
        const fromTop = (e) => {
          const r = row.getBoundingClientRect();
          return e.clientY < r.top + r.height / 2;
        };

        const onEnter = (e) => {
          const x = localX(e);
          lastX = x;
          gsap.set(media, { x });
          gsap.set(bg, {
            transformOrigin: fromTop(e) ? '50% 0%' : '50% 100%',
            scaleY: 0,
          });
          gsap.to(bg, {
            scaleY: 1,
            duration: 0.45,
            ease: 'power3.out',
            overwrite: true,
          });
          gsap.to(media, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.4,
            ease: 'back.out(1.4)',
            overwrite: 'auto',
          });
        };

        const onMove = (e) => {
          const x = localX(e);
          xTo(x);
          // slight swing based on cursor velocity, settles back to 0
          rotTo(gsap.utils.clamp(-10, 10, (x - lastX) * 0.55));
          lastX = x;
          clearTimeout(rotTimer);
          rotTimer = setTimeout(() => rotTo(0), 90);
        };

        const onLeave = (e) => {
          gsap.set(bg, {
            transformOrigin: fromTop(e) ? '50% 0%' : '50% 100%',
          });
          gsap.to(bg, {
            scaleY: 0,
            duration: 0.4,
            ease: 'power3.out',
            overwrite: true,
          });
          gsap.to(media, {
            autoAlpha: 0,
            scale: 0.7,
            duration: 0.3,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        };

        row.addEventListener('mouseenter', onEnter);
        row.addEventListener('mousemove', onMove);
        row.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          clearTimeout(rotTimer);
          row.removeEventListener('mouseenter', onEnter);
          row.removeEventListener('mousemove', onMove);
          row.removeEventListener('mouseleave', onLeave);
        });
      });
    }

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section className="services" id="services" ref={rootRef}>
      <div className="section container">
        <div className="section__head">
          <div>
            <p className="eyebrow" style={{ marginBottom: 24 }}>
              What we do
            </p>
            <h2 className="section__title">
              Every service your brand needs
            </h2>
          </div>
          <span className="section__count">(02)</span>
        </div>

        <div className="services__list">
          {SERVICES.map((s, i) => (
            <a href="#contact" className="service-row" key={s.title}>
              <div className="service-row__bg" />
              <div
                className="service-row__media"
                style={{ background: s.gradient }}
                aria-hidden="true"
              >
                <span>{s.title}</span>
              </div>
              <span className="service-row__idx">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="service-row__main">
                <span className="service-row__title">{s.title}</span>
                <span className="service-row__tags">{s.tags}</span>
              </span>
              <span className="service-row__arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
