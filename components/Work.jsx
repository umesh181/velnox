'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Bento layout: 2 big + 4 small tiles (noteworthy-style).
   Covers are CSS gradients — swap in real project imagery later. */
const PROJECTS = [
  {
    name: 'Auralis',
    mark: 'AU',
    tags: 'Brand · Web · Development',
    size: 'b1',
    gradient: 'linear-gradient(135deg, #3440f0 0%, #8f9bff 55%, #d8dcff 100%)',
  },
  {
    name: 'Fernhaus',
    mark: 'FH',
    tags: 'E-commerce · Art direction',
    size: 's1',
    gradient: 'linear-gradient(135deg, #14231c 0%, #3f6b4f 60%, #a8c8a0 100%)',
  },
  {
    name: 'Kinetiq',
    mark: 'KQ',
    tags: 'Product · UI/UX · Motion',
    size: 's2',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a52 55%, #b9b9c4 100%)',
  },
  {
    name: 'Solace',
    mark: 'SO',
    tags: 'Brand identity · Website',
    size: 's3',
    gradient: 'linear-gradient(135deg, #c2410c 0%, #f97316 55%, #fed7aa 100%)',
  },
  {
    name: 'Nimbus',
    mark: 'NB',
    tags: 'SaaS · Web app · Design system',
    size: 'b2',
    gradient: 'linear-gradient(135deg, #0c4a6e 0%, #0ea5e9 55%, #bae6fd 100%)',
  },
  {
    name: 'Oreum',
    mark: 'OR',
    tags: 'Hospitality · Website · SEO',
    size: 's4',
    gradient: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 55%, #ddd6fe 100%)',
  },
];

export default function Work() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll('.work-card'), {
        y: 70,
        opacity: 0,
        duration: 1,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.querySelector('.work__grid'),
          start: 'top 85%',
        },
      });
      gsap.from(root.querySelector('.section__title'), {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 78%' },
      });
    }, root);

    // ---- 3D tilt on hover (noteworthy-style card bend, desktop only) ----
    const canHover =
      window.matchMedia('(hover: hover)').matches && window.innerWidth > 900;
    const cleanups = [];

    if (canHover) {
      root.querySelectorAll('.work-card').forEach((card) => {
        const media = card.querySelector('.work-card__media');
        gsap.set(media, { transformPerspective: 900 });
        const rxTo = gsap.quickTo(media, 'rotationX', {
          duration: 0.5,
          ease: 'power2',
        });
        const ryTo = gsap.quickTo(media, 'rotationY', {
          duration: 0.5,
          ease: 'power2',
        });

        const onMove = (e) => {
          const r = media.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          rxTo((0.5 - py) * 10);
          ryTo((px - 0.5) * 12);
        };
        const onLeave = () => {
          rxTo(0);
          ryTo(0);
        };

        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
        cleanups.push(() => {
          card.removeEventListener('mousemove', onMove);
          card.removeEventListener('mouseleave', onLeave);
        });
      });
    }

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section className="section container" id="work" ref={rootRef}>
      <div className="section__head">
        <div>
          <p className="eyebrow" style={{ marginBottom: 24 }}>
            Selected work
          </p>
          <h2 className="section__title">
            Projects with proof
          </h2>
        </div>
        <span className="section__count">(03)</span>
      </div>

      <div className="work__grid">
        {PROJECTS.map((p) => (
          <a
            href="#contact"
            className={`work-card work-card--${p.size}`}
            key={p.name}
          >
            <div className="work-card__media">
              <div
                className="work-card__cover"
                style={{ background: p.gradient }}
              >
                <span className="work-card__mark">{p.mark}</span>
              </div>
              <div className="work-card__meta">
                <span className="work-card__name">{p.name}</span>
                <span className="work-card__tags">{p.tags}</span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="work__all">
        <a href="#contact" className="btn-outline">
          <span>View all projects ↗</span>
        </a>
      </div>
    </section>
  );
}
