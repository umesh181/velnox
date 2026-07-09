'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '@/data/projects';
import WorkProjectModal from '@/components/sections/WorkProjectModal';
import { onSectionGoto, revealElements } from '@/lib/sectionReveal';

gsap.registerPlugin(ScrollTrigger);

/* Bento grid placement — grid-column / grid-row per project's `size` key
   (see data/projects.js). Same 6-slot layout/order as main; only the first
   3 slots (b1, s1, s2) are filled with real projects for now — s3/b2/s4
   stay reserved as empty placeholders until more work is added. */
const SPAN = {
  b1: 'col-[1/8] row-[1/3]',
  s1: 'col-[8/13] row-[1/2]',
  s2: 'col-[8/13] row-[2/3]',
  s3: 'col-[1/6] row-[3/4]',
  b2: 'col-[6/13] row-[3/5]',
  s4: 'col-[1/6] row-[4/5]',
};

const PLACEHOLDER_SLOTS = ['s3', 'b2', 's4'];

function WorkCardVisual({ project }) {
  const { mockups, gradient } = project;

  if (mockups?.laptop) {
    return (
      <div
        className="relative h-full w-full overflow-hidden rounded-card"
        style={{ background: gradient }}
      >
        <div className="absolute inset-[4%] sm:inset-[5%]">
          <img
            src={mockups.laptop}
            alt={`${project.name} laptop mockup`}
            loading="lazy"
            decoding="async"
            className="work-card__img absolute left-0 top-[4%] h-auto w-[68%] object-contain drop-shadow-[0_32px_64px_rgba(17,56,47,0.14)]"
          />
          <img
            src={mockups.mobile}
            alt={`${project.name} mobile mockup`}
            loading="lazy"
            decoding="async"
            className="work-card__img work-card__img--mobile absolute bottom-[2%] right-0 z-[2] h-auto w-[25%] object-contain drop-shadow-[0_36px_48px_rgba(17,56,47,0.18)]"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-card bg-ink" style={{ background: gradient }}>
      <img
        src={mockups.single}
        alt={`${project.name} mockup`}
        loading="lazy"
        decoding="async"
        className={`work-card__img absolute inset-0 h-full w-full ${
          mockups.cover
            ? 'object-cover object-center'
            : 'object-contain object-top p-5 sm:p-8'
        }`}
      />
    </div>
  );
}

function WorkPlaceholderCard({ size }) {
  return (
    <div
      aria-hidden="true"
      className={`work-card__placeholder rounded-card border border-dashed border-line/60 bg-ink/[0.03] ${SPAN[size]} max-[900px]:hidden`}
    />
  );
}

function WorkGridCard({ project, index, onCardClick }) {
  const isExternal = !!project.url;
  const hasMultipleOptions = project.mockups && project.url && project.designUrl;
  const badgePathId = `work-badge-path-${index}`;

  const handleClick = (e) => {
    if (hasMultipleOptions && onCardClick) {
      e.preventDefault();
      onCardClick(project);
    }
  };

  return (
    <a
      href={project.url || '#contact'}
      target={isExternal && !hasMultipleOptions ? '_blank' : undefined}
      rel={isExternal && !hasMultipleOptions ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      className={`work-card group block [perspective:1000px] ${SPAN[project.size]} max-[900px]:col-[1/-1] max-[900px]:row-auto`}
    >
      {/* Rounding + clipping live on this static frame, never the transformed
          layer below — clip-masking a 3D-rotated element flashes square
          corners for a frame before the mask catches up. */}
      <div className="work-card__frame relative h-full overflow-hidden rounded-card max-[900px]:aspect-[4/3] max-[900px]:h-auto">
        <div className="work-card__media absolute inset-0 will-change-transform [transform-style:preserve-3d]">
          <div className="absolute inset-0 transition-transform duration-700 [transition-timing-function:cubic-bezier(0.25,1,0.3,1)] group-hover:scale-[1.04]">
            <WorkCardVisual project={project} />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-black/80 via-black/30 to-transparent px-[22px] pb-[18px] pt-16">
          <div className="flex items-end justify-between gap-4 text-white">
            <span className="text-[clamp(18px,1.8vw,26px)] font-bold tracking-[-0.02em]">
              {project.name}
            </span>
            <span className="text-right text-[12px] text-[rgba(255,255,255,0.75)]">
              {project.tags}
            </span>
          </div>
        </div>

        {/* center badge — spinning "VIEW PROJECT" ring + arrow, fixed in place */}
        <div className="work-card__badge pointer-events-none absolute inset-0 z-[3] grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-[900px]:hidden [@media(hover:none)]:hidden">
          <div className="relative grid h-[104px] w-[104px] place-items-center">
            <div className="absolute inset-0 rounded-full bg-black/70 backdrop-blur-[2px]" />
            <svg viewBox="0 0 100 100" className="work-card__badge-spin absolute inset-0 h-full w-full">
              <defs>
                <path id={badgePathId} d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
              </defs>
              <text fontSize="8.2" fill="white" letterSpacing="2.5" className="font-semibold uppercase">
                <textPath href={`#${badgePathId}`}>View Project • View Project •</textPath>
              </text>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="white"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="relative"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function Work() {
  const rootRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const [viewingDesign, setViewingDesign] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const off = onSectionGoto('work', () => {
      revealElements([
        root.querySelector('.section__title'),
        root.querySelectorAll('.work-card'),
      ]);
    });

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

    // ---- 3D tilt on hover (bento-card bend, desktop only) ----
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
      off();
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

  const handleCardClick = (project) => {
    setActiveProject(project);
    setViewingDesign(false);
  };

  return (
    <section
      className="mx-auto w-full px-gutter pt-[clamp(90px,14vh,180px)] pb-[clamp(24px,4vh,40px)] max-[900px]:pt-[48px] max-[900px]:pb-6"
      id="work"
      ref={rootRef}
    >
      <div className="mb-[clamp(28px,4vh,48px)] max-[900px]:mb-6 flex items-end justify-between gap-6">
        <div>
          <h2 className="section__title mb-6 max-w-[18ch] text-[clamp(32px,5vw,76px)] font-medium leading-[1.08] tracking-[-0.03em]">
            Projects with proof
          </h2>
          <p className="eyebrow">Projects</p>
        </div>
        <span className="text-[13px] tabular-nums text-ink-40 whitespace-nowrap">
          (03)
        </span>
      </div>

      {/* work__grid + work-card + work-card__media are GSAP reveal / 3D-tilt hooks */}
      <div className="work__grid mx-auto grid max-w-[min(1280px,100%)] grid-cols-12 auto-rows-[clamp(170px,26vh,260px)] gap-[clamp(14px,1.6vw,24px)] max-[900px]:auto-rows-auto">
        {PROJECTS.map((project, index) => (
          <WorkGridCard
            key={project.name}
            project={project}
            index={index}
            onCardClick={handleCardClick}
          />
        ))}
        {/* Reserved bento slots (s3, b2, s4) for future projects — commented
            out for now since they're empty; uncomment when more work lands.
        {PLACEHOLDER_SLOTS.map((size) => (
          <WorkPlaceholderCard key={size} size={size} />
        ))}
        */}
      </div>

      <div className="mt-[clamp(40px,6vh,64px)] flex justify-center">
        <a href="#contact" className="btn-outline">
          <span>Start a project ↗</span>
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
