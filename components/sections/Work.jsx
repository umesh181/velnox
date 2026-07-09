'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '@/data/projects';
import WorkProjectModal from '@/components/sections/WorkProjectModal';
import { onSectionGoto, revealElements } from '@/lib/sectionReveal';

gsap.registerPlugin(ScrollTrigger);

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
    <div
      className="relative h-full w-full overflow-hidden rounded-card bg-ink"
      style={{ background: gradient }}
    >
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

function WorkShowcaseItem({ project, index, imageRight, onCardClick }) {
  const isExternal = !!project.url;
  const hasMultipleOptions = project.mockups && project.url && project.designUrl;
  const indexLabel = String(index + 1).padStart(2, '0');

  const handleClick = (e) => {
    if (hasMultipleOptions && onCardClick) {
      e.preventDefault();
      onCardClick(project);
    }
  };

  return (
    <article className="work-card group mb-[clamp(72px,10vh,112px)] max-[900px]:mb-10 last:mb-0">
      <a
        href={project.url || '#contact'}
        target={isExternal && !hasMultipleOptions ? '_blank' : undefined}
        rel={isExternal && !hasMultipleOptions ? 'noopener noreferrer' : undefined}
        onClick={handleClick}
        className="block"
      >
        <div className="grid items-center gap-[clamp(28px,4vw,48px)] md:grid-cols-12">
          <div
            className={`relative md:col-span-7 ${
              imageRight ? 'md:order-2 md:col-start-6' : 'md:col-start-1'
            }`}
          >
            <div
              className="work-card__frame relative aspect-[16/10] overflow-hidden rounded-card shadow-[0_18px_48px_rgba(20,20,18,0.06)]"
              style={
                project.theme === 'light'
                  ? { background: project.gradient }
                  : undefined
              }
            >
              <div className="absolute inset-0 overflow-hidden rounded-card transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]">
                <WorkCardVisual project={project} />
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col justify-center md:col-span-5 ${
              imageRight ? 'md:order-1 md:col-start-1' : 'md:col-start-8'
            }`}
          >
            <div className="mb-6 flex items-end justify-between gap-6">
              <span className="text-[clamp(52px,6vw,88px)] font-bold tracking-[-0.05em] text-ink/[0.16] leading-none">
                {indexLabel}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-40">
                {project.year || '2025'}
              </span>
            </div>

            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              {project.tags}
            </p>

            <h3 className="mb-5 text-[clamp(28px,3.6vw,48px)] font-bold uppercase leading-[1.02] tracking-[-0.035em]">
              {project.name}
            </h3>

            <p className="mb-8 max-w-[38ch] text-[clamp(15px,1.25vw,17px)] leading-[1.7] text-ink-60">
              {project.description}
            </p>

            <span className="inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em]">
              <span className="relative">
                View project
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-0" />
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              </span>
              <span
                className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              >
                ↗
              </span>
            </span>
          </div>
        </div>
      </a>
    </article>
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
        y: 80,
        opacity: 0,
        duration: 1.1,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.querySelector('.work__list'),
          start: 'top 82%',
        },
      });

      gsap.from(root.querySelector('.section__title'), {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 78%' },
      });


      root.querySelectorAll('.work-card__frame').forEach((frame) => {
        gsap.fromTo(
          frame,
          { y: 24 },
          {
            y: -24,
            ease: 'none',
            scrollTrigger: {
              trigger: frame,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      });
    }, root);

    return () => {
      off();
      ctx.revert();
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

      <div className="work__list mx-auto max-w-[min(1280px,100%)] px-[clamp(12px,3vw,48px)]">
        {PROJECTS.map((project, index) => (
          <WorkShowcaseItem
            key={project.name}
            project={project}
            index={index}
            imageRight={index % 2 === 1}
            onCardClick={handleCardClick}
          />
        ))}
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
