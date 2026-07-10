'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onSectionGoto, revealElements } from '@/lib/sectionReveal';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: 'Web Development',
    tags: 'ERP Solutions · CRM · Web Apps · Landing Pages',
    gradient: 'linear-gradient(135deg, #3440f0 0%, #8f9bff 60%, #d8dcff 100%)',
    image: '/images/webdev_ser.webp',
  },
  {
    title: 'Mobile Applications',
    tags: 'Android · iOS · Cross-Platform · Business Apps',
    gradient: 'linear-gradient(135deg, #14231c 0%, #3f6b4f 60%, #a8c8a0 100%)',
    image: '/images/mob_ser.webp',
  },
  {
    title: 'UI/UX Design',
    tags: 'Wireframes · Prototypes · Design Systems · User Experience',
    gradient: 'linear-gradient(135deg, #c2410c 0%, #f97316 60%, #fed7aa 100%)',
    image: '/images/uiux_ser.webp',
  },
  {
    title: 'AI & Automations',
    tags: 'AI Chatbots · AI Agents · Custom AI Apps',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a52 60%, #b9b9c4 100%)',
    image: '/images/ai_ser.webp',
  },
  {
    title: 'Digital Marketing',
    tags: 'SEO · Social Media · Google Ads · Performance Marketing',
    gradient: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 60%, #ddd6fe 100%)',
    image: '/images/digi_ser.webp',
  },
];

export default function Services() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const off = onSectionGoto('services', () => {
      revealElements([
        root.querySelector('.section__title'),
        root.querySelectorAll('.service-row'),
      ]);
    });

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
      off();
      ctx.revert();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section
      className="services mx-[clamp(8px,1.2vw,20px)] rounded-[clamp(24px,4vw,48px)] bg-ink text-bg"
      id="services"
      ref={rootRef}
    >
      <div className="mx-auto w-full px-gutter py-[clamp(90px,14vh,180px)] max-[900px]:py-[48px]">
        <div className="mb-[clamp(48px,8vh,96px)] max-[900px]:mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-6 text-cream-55">Expertise</p>
            <h2 className="section__title max-w-[18ch] text-[clamp(32px,5vw,76px)] font-medium leading-[1.08] tracking-[-0.03em]">
              Every service your brand needs
            </h2>
          </div>
          <span className="text-[13px] tabular-nums text-cream-40 whitespace-nowrap">
            (02)
          </span>
        </div>

        {/* services__list + service-row* are GSAP reveal / cursor-preview hooks */}
        <div className="services__list">
          {SERVICES.map((s, i) => (
            <a
              href="#contact"
              className="service-row group relative z-0 hover:z-30 grid grid-cols-[80px_1fr_auto] items-center gap-6 border-t border-[rgba(242,239,233,0.16)] py-[clamp(28px,4vh,44px)] last:border-b last:border-[rgba(242,239,233,0.16)] max-[900px]:grid-cols-[44px_1fr_auto] max-[900px]:gap-[14px]"
              key={s.title}
            >
              <div className="service-row__bg absolute inset-0 origin-top scale-y-0 bg-accent" />
              <div
                className="service-row__media pointer-events-none absolute left-0 top-1/2 z-[2] grid w-[clamp(190px,15vw,250px)] place-items-center rounded-[14px] opacity-0 will-change-transform max-[900px]:hidden [@media(hover:none)]:hidden"
                style={s.image ? undefined : { background: s.gradient, aspectRatio: '4 / 3' }}
                aria-hidden="true"
              >
                {s.image ? (
                  <img
                    src={s.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="block w-full h-auto object-contain rounded-[14px]"
                  />
                ) : (
                  <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[rgba(255,255,255,0.92)]">
                    {s.title}
                  </span>
                )}
              </div>
              <span className="relative z-[1] text-[14px] tabular-nums text-cream-40 transition-colors duration-[400ms] group-hover:text-[rgba(255,255,255,0.85)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="relative z-[1] flex flex-col gap-[10px]">
                <span className="text-[clamp(24px,3.6vw,44px)] font-semibold uppercase leading-none tracking-[-0.03em] transition-transform duration-500 ease-brand group-hover:translate-x-4">
                  {s.title}
                </span>
                <span className="text-[13px] tracking-[0.06em] text-[rgba(242,239,233,0.5)] transition-colors duration-[400ms] group-hover:text-[rgba(255,255,255,0.85)]">
                  {s.tags}
                </span>
              </span>

            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
