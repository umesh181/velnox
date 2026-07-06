'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Bento layout: 2 big + 4 small tiles (noteworthy-style).
   Covers are CSS gradients — swap in real project imagery later. */
const PROJECTS = [
  {
    name: 'Pratej Dental Care',
    mark: 'PD',
    tags: 'Website Development · UI/UX Design',
    size: 'b1',
    gradient: 'linear-gradient(135deg, #11382F 0%, #3DBC9E 60%, #E8F7F4 100%)',
    url: 'https://www.pratejdentalcare.com',
    designUrl: 'https://www.figma.com/design/ypOC4RlHSaATp7YSPYvGVg/Untitled?node-id=0-1&p=f&t=JnV8xrq9hbMJQRxr-0',
    mockups: {
      laptop: '/pratej_laptop_mockup.png',
      mobile: '/pratej_mobile_mockup.png',
    },
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
    name: 'Sphoorthi Interiors',
    mark: 'SI',
    tags: 'Website Development',
    size: 'b2',
    gradient: '#9ea09e',
    url: 'https://www.sphoorthiinteriors.com',
    mockups: {
      single: '/updated_sphoorthi.png',
    },
  },
  {
    name: 'Sri Gowri Dental Care',
    mark: 'SG',
    tags: 'Website Development',
    size: 's4',
    gradient: '#9a9da0',
    url: 'https://www.srigowridentalcare.com',
    mockups: {
      single: '/srigowri_mockup.jpg',
    },
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
              className={`work-card group block [perspective:1000px] ${SPAN[p.size]} max-[780px]:col-[1/-1] max-[780px]:row-auto`}
              key={p.name}
            >
              <div className="work-card__media relative h-full overflow-hidden rounded-card will-change-transform [transform-style:preserve-3d] max-[780px]:aspect-[4/3] max-[780px]:h-auto">
                <div
                  className={`absolute ${p.mockups?.single ? 'inset-0' : 'inset-[-8%]'} grid place-items-center will-change-transform transition-transform duration-700 [transition-timing-function:cubic-bezier(0.25,1,0.3,1)] group-hover:scale-[1.04]`}
                  style={{ background: p.gradient }}
                >
                  {p.mockups ? (
                    p.mockups.single ? (
                      <img
                        src={p.mockups.single}
                        alt={`${p.name} Mockup`}
                        className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="absolute inset-[8%] overflow-hidden">
                        {/* Laptop mockup */}
                        <img
                          src={p.mockups.laptop}
                          alt={`${p.name} Laptop Mockup`}
                          className="absolute left-[4%] top-[10%] w-[68%] max-sm:w-[75%] max-sm:left-[2%] max-sm:top-[12%] h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.03] group-hover:-translate-y-1 drop-shadow-[0_15px_20px_rgba(0,0,0,0.15)]"
                        />
                        {/* Mobile mockup */}
                        <img
                          src={p.mockups.mobile}
                          alt={`${p.name} Mobile Mockup`}
                          className="absolute right-[6%] bottom-[12%] max-sm:right-[4%] max-sm:bottom-[10%] w-[24%] max-sm:w-[28%] h-auto object-contain transition-transform duration-700 ease-out group-hover:scale-[1.05] group-hover:-translate-y-2 z-[2] drop-shadow-[0_20px_25px_rgba(0,0,0,0.3)]"
                        />
                      </div>
                    )
                  ) : (
                    <span className="text-[clamp(56px,7.5vw,130px)] font-bold uppercase tracking-[-0.05em] text-[rgba(255,255,255,0.9)] mix-blend-overlay">
                      {p.mark}
                    </span>
                  )}
                </div>
                {/* Vignette/Shadow overlay at the bottom for readability */}
                <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/75 via-black/35 to-transparent pointer-events-none z-[1]" />
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
          );
        })}
      </div>

      <div className="mt-[clamp(56px,8vh,100px)] flex justify-center">
        <a href="#contact" className="btn-outline">
          <span>View all projects ↗</span>
        </a>
      </div>
      {/* Premium Choice Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-gutter bg-black/60 backdrop-blur-md animate-modal-fade">
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes modal-fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes modal-scale-in {
              from { transform: scale(0.95); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
            .animate-modal-fade {
              animation: modal-fade-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            .animate-modal-scale {
              animation: modal-scale-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
          `}} />
          <div className="relative w-full max-w-lg overflow-hidden rounded-[24px] bg-[#fdfcfa] border border-line text-ink p-8 shadow-2xl animate-modal-scale">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-transparent hover:bg-ink hover:text-bg transition-colors duration-300 cursor-pointer"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            {!viewingDesign ? (
              <div className="flex flex-col gap-6 pt-4">
                <div>
                  <p className="eyebrow mb-2">Project Case Study</p>
                  <h3 className="text-3xl font-bold tracking-tight uppercase">{activeProject.name}</h3>
                  <p className="mt-3 text-ink-60 text-sm leading-relaxed">
                    We designed and developed the entire digital experience for {activeProject.name}. How would you like to explore this project?
                  </p>
                </div>

                <div className="flex flex-col gap-4 mt-2">
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setActiveProject(null)}
                    className="btn-pill justify-center text-center py-4 w-full"
                  >
                    <span>Visit Live Website ↗</span>
                  </a>

                  <button
                    onClick={() => {
                      if (activeProject.designUrl) {
                        window.open(activeProject.designUrl, '_blank');
                        setActiveProject(null);
                      } else {
                        setViewingDesign(true);
                      }
                    }}
                    className="btn-outline justify-center py-4 w-full cursor-pointer"
                  >
                    <span>View Design Presentation {activeProject.designUrl ? '↗' : ''}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6 pt-4">
                <div>
                  <button
                    onClick={() => setViewingDesign(false)}
                    className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-60 hover:text-ink transition-colors duration-200 mb-4 cursor-pointer"
                  >
                    ← Back to Options
                  </button>
                  <h3 className="text-2xl font-bold uppercase">{activeProject.name} - Design Work</h3>
                  <p className="text-ink-60 text-xs mt-1">High-fidelity web & mobile design mockups (Click to enlarge)</p>
                </div>

                {/* Gallery View */}
                {activeProject.mockups.single ? (
                  <div 
                    onClick={() => window.open(activeProject.mockups.single, '_blank')}
                    className="group relative overflow-hidden rounded-xl border border-line bg-bg-soft aspect-[3/2] flex items-center justify-center p-2 cursor-zoom-in"
                    title="Click to view full resolution"
                  >
                    <img
                      src={activeProject.mockups.single}
                      alt="Design Mockup"
                      className="max-h-full max-w-full object-contain rounded transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-2 left-2 bg-ink/75 text-[10px] text-bg font-semibold px-2 py-0.5 rounded">
                      Full View
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 mt-2 max-[500px]:grid-cols-1">
                    <div 
                      onClick={() => window.open(activeProject.mockups.laptop, '_blank')}
                      className="group relative overflow-hidden rounded-xl border border-line bg-bg-soft aspect-[3/2] flex items-center justify-center p-2 cursor-zoom-in"
                      title="Click to view full resolution"
                    >
                      <img
                        src={activeProject.mockups.laptop}
                        alt="Laptop Design View"
                        className="max-h-full max-w-full object-contain rounded transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute bottom-2 left-2 bg-ink/75 text-[10px] text-bg font-semibold px-2 py-0.5 rounded">
                        Desktop View
                      </div>
                    </div>
                    
                    <div 
                      onClick={() => window.open(activeProject.mockups.mobile, '_blank')}
                      className="group relative overflow-hidden rounded-xl border border-line bg-bg-soft aspect-[3/2] flex items-center justify-center p-2 cursor-zoom-in"
                      title="Click to view full resolution"
                    >
                      <img
                        src={activeProject.mockups.mobile}
                        alt="Mobile Design View"
                        className="max-h-full max-w-full object-contain rounded transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute bottom-2 left-2 bg-ink/75 text-[10px] text-bg font-semibold px-2 py-0.5 rounded">
                        Mobile View
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex justify-between gap-4">
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setActiveProject(null)}
                    className="btn-pill justify-center text-center text-xs py-3 px-6 flex-1"
                  >
                    <span>Launch Live Site ↗</span>
                  </a>
                  <button
                    onClick={() => setActiveProject(null)}
                    className="btn-outline justify-center text-xs py-3 px-6 flex-1 cursor-pointer"
                  >
                    <span>Close</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </section>
  );
}
