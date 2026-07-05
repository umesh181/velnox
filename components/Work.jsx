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

/* bento tile placement — grid-column / grid-row per size key */
const SPAN = {
  b1: 'col-[1/8] row-[1/3]',
  s1: 'col-[8/13] row-[1/2]',
  s2: 'col-[8/13] row-[2/3]',
  s3: 'col-[1/6] row-[3/4]',
  b2: 'col-[6/13] row-[3/5]',
  s4: 'col-[1/6] row-[4/5]',
};

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
    <section
      className="mx-auto w-full px-gutter py-[clamp(90px,14vh,180px)]"
      id="work"
      ref={rootRef}
    >
      <div className="mb-[clamp(48px,8vh,96px)] flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-6">Selected work</p>
          <h2 className="section__title max-w-[14ch] text-[clamp(38px,6vw,92px)] font-bold uppercase leading-[1.02] tracking-[-0.04em]">
            Projects with proof
          </h2>
        </div>
        <span className="text-[13px] tabular-nums text-ink-40 whitespace-nowrap">
          (03)
        </span>
      </div>

      {/* work__grid + work-card + work-card__media are GSAP reveal / 3D-tilt hooks */}
      <div className="work__grid grid grid-cols-12 auto-rows-[clamp(170px,26vh,260px)] gap-[clamp(14px,1.6vw,24px)] max-[780px]:auto-rows-auto">
        {PROJECTS.map((p) => (
          <a
            href="#contact"
            className={`work-card group block [perspective:1000px] ${SPAN[p.size]} max-[780px]:col-[1/-1] max-[780px]:row-auto`}
            key={p.name}
          >
            <div className="work-card__media relative h-full overflow-hidden rounded-card will-change-transform [transform-style:preserve-3d] max-[780px]:aspect-[4/3] max-[780px]:h-auto">
              <div
                className="absolute inset-[-8%] grid place-items-center will-change-transform transition-transform duration-700 [transition-timing-function:cubic-bezier(0.25,1,0.3,1)] group-hover:scale-[1.04]"
                style={{ background: p.gradient }}
              >
                <span className="text-[clamp(56px,7.5vw,130px)] font-bold uppercase tracking-[-0.05em] text-[rgba(255,255,255,0.9)] mix-blend-overlay">
                  {p.mark}
                </span>
              </div>
              <div className="absolute bottom-[18px] left-[22px] right-[22px] z-[2] flex items-baseline justify-between gap-4 text-white">
                <span className="text-[clamp(18px,1.8vw,26px)] font-bold tracking-[-0.02em]">
                  {p.name}
                </span>
                <span className="text-right text-[12px] text-[rgba(255,255,255,0.75)]">
                  {p.tags}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-[clamp(56px,8vh,100px)] flex justify-center">
        <a href="#contact" className="btn-outline">
          <span>View all projects ↗</span>
        </a>
      </div>
    </section>
  );
}
