'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS, PROJECT_GRID_SPAN } from '@/data/projects';
import WorkProjectModal from '@/components/sections/WorkProjectModal';

gsap.registerPlugin(ScrollTrigger);

function WorkCardMedia({ project }) {
  const { mockups, gradient, mark, name, tags, size } = project;

  if (mockups?.single && size === 'b2') {
    return (
      <>
        <div
          className="absolute inset-x-0 top-0 bottom-[clamp(72px,18%,88px)] overflow-hidden"
          style={{ background: gradient }}
        >
          <img
            src={mockups.single}
            alt={`${name} Mockup`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain object-top px-3 pt-3 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 flex h-[clamp(72px,18%,88px)] flex-col justify-end bg-gradient-to-t from-black via-black/95 to-black/55 px-[22px] pb-[18px] pt-5">
          <div className="flex items-end justify-between gap-4 text-white">
            <span className="text-[clamp(16px,1.6vw,24px)] font-bold leading-tight tracking-[-0.02em]">
              {name}
            </span>
            <span className="max-w-[46%] text-right text-[11px] leading-snug text-white/75">
              {tags}
            </span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className="absolute inset-[-8%] grid place-items-center will-change-transform transition-transform duration-700 [transition-timing-function:cubic-bezier(0.25,1,0.3,1)] group-hover:scale-[1.04]"
        style={{ background: gradient }}
      >
        {mockups?.single ? (
          <img
            src={mockups.single}
            alt={`${name} Mockup`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : mockups?.laptop ? (
          <div className="absolute inset-[8%] overflow-hidden">
            <img
              src={mockups.laptop}
              alt={`${name} Laptop Mockup`}
              className="absolute left-[4%] top-[10%] w-[68%] max-sm:w-[75%] max-sm:left-[2%] max-sm:top-[12%] h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03] group-hover:-translate-y-1 drop-shadow-[0_15px_20px_rgba(0,0,0,0.15)]"
            />
            <img
              src={mockups.mobile}
              alt={`${name} Mobile Mockup`}
              className="absolute right-[6%] bottom-[12%] max-sm:right-[4%] max-sm:bottom-[10%] w-[24%] max-sm:w-[28%] h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.05] group-hover:-translate-y-2 z-[2] drop-shadow-[0_20px_25px_rgba(0,0,0,0.3)]"
            />
          </div>
        ) : (
          <span className="text-[clamp(56px,7.5vw,130px)] font-bold uppercase tracking-[-0.05em] text-[rgba(255,255,255,0.9)] mix-blend-overlay">
            {mark}
          </span>
        )}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[40%] bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
      <div className="absolute bottom-[18px] left-[22px] right-[22px] z-[2] flex items-baseline justify-between gap-4 text-white">
        <span className="text-[clamp(18px,1.8vw,26px)] font-bold tracking-[-0.02em]">
          {name}
        </span>
        <span className="text-right text-[12px] text-[rgba(255,255,255,0.75)]">
          {tags}
        </span>
      </div>
    </>
  );
}

export default function Work() {
  const rootRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const [viewingDesign, setViewingDesign] = useState(false);

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

  const handleViewDesign = () => {
    if (!activeProject) return;
    if (activeProject.designUrl) {
      window.open(activeProject.designUrl, '_blank');
      setActiveProject(null);
    } else {
      setViewingDesign(true);
    }
  };

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

      <div className="work__grid grid grid-cols-12 auto-rows-[clamp(170px,26vh,260px)] gap-[clamp(14px,1.6vw,24px)] max-[780px]:auto-rows-auto">
        {PROJECTS.map((p) => {
          const isExternal = !!p.url;
          const hasMultipleOptions = p.mockups && p.url;

          const handleCardClick = (e) => {
            if (hasMultipleOptions) {
              e.preventDefault();
              setActiveProject(p);
              setViewingDesign(false);
            }
          };

          return (
            <a
              href={p.url || '#contact'}
              target={isExternal && !hasMultipleOptions ? '_blank' : undefined}
              rel={isExternal && !hasMultipleOptions ? 'noopener noreferrer' : undefined}
              onClick={handleCardClick}
              className={`work-card group block [perspective:1000px] ${PROJECT_GRID_SPAN[p.size]} max-[780px]:col-[1/-1] max-[780px]:row-auto`}
              key={p.name}
            >
              <div className="work-card__media relative h-full overflow-hidden rounded-card will-change-transform [transform-style:preserve-3d] max-[780px]:aspect-[4/3] max-[780px]:h-auto">
                <WorkCardMedia project={p} />
              </div>
            </a>
          );
        })}
      </div>

      <div className="mt-[clamp(56px,8vh,100px)] flex justify-center">
        <a href="#contact" className="btn-outline">
          <span>View all projects ↗</span>
        </a>
      </div>

      <WorkProjectModal
        project={activeProject}
        viewingDesign={viewingDesign}
        onClose={() => setActiveProject(null)}
        onViewDesign={handleViewDesign}
        onBackToOptions={() => setViewingDesign(false)}
      />
    </section>
  );
}
