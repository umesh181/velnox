'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);





const TESTIMONIALS = [
  {
    avatar: '/images/star_test.webp',
    quote:
      '"Great experience working with the Velnox team. They did a solid job building my website - the code is clean, the site is functional, and they were easy to communicate with throughout the development process. Very happy with the outcome and would work with them again."',
    name: 'Dr. Manjunatha Reddy',
    title: 'Orthodontist & Aligner Expert',
    avatarPosition: 'center 20%',
    bgPosition: 'center 20%',
  },
  {
    avatar: '/images/pratej_test.webp',
    quote:
      '"A wonderful experience working with the Velnox team. They were attentive to every detail I mentioned, communicated clearly throughout the project, and delivered a professional, well-designed website that exceeded my expectations. I highly recommend their services."',
    name: 'Dr. K Pratej Kiran',
    title: 'Pediatric Dentist & Root Canal Specialist',
    avatarPosition: 'center top',
    bgPosition: 'center top',
  },
  {
    avatar: '/images/sphoorthi_test.jpeg',
    quote:
      '"Highly impressed with the Velnox team! They built a stunning, high-performance portfolio website for Sphoorthi Interiors. The layout is elegant, it presents our design work beautifully, and it has already started converting enquiries. Very professional, responsive, and highly recommended!"',
    name: 'Venkateshwarlu Kompelli',
    title: 'Interior Designer · Sphoorthi Interiors',
    avatarPosition: 'center top',
    bgPosition: 'center top',
  },
  {
    avatar: '/images/gowri_test.webp',
    quote:
      '"Excellent service by the Velnox team! The whole team was very professional, responsive, and delivered a clean, modern website exactly as requested. They understood my requirements well, completed the project on time, and provided great support throughout. Highly recommended for anyone looking for reliable and quality website development."',
    name: 'Dr. N Sri Gowri',
    title: 'Prosthodontist & TMJ Specialist',
    avatarPosition: 'center 20%',
    bgPosition: 'center 20%',
  },
];

export default function Testimonials() {
  const rootRef = useRef(null);

  useEffect(() => {
    // No animations for now to guarantee rendering
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;600&display=swap');
        .cursive { font-family: 'Dancing Script', cursive; }

        .testi-grid {
          display: flex;
          gap: 20px;
          width: 100%;
        }

        .testi-card {
          position: relative;
          overflow: hidden;
          flex: 1;
          min-width: 0;
          background-color: #ffffff;
          border-radius: 20px;
          padding: 32px 32px 20px 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 310px;
          transition: all 0.5s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .testi-card__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          opacity: 0;
          transition: opacity 0.5s cubic-bezier(0.65, 0, 0.35, 1);
          z-index: 0;
        }
        .testi-card__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.1) 60%, transparent 100%);
          opacity: 0;
          transition: opacity 0.5s cubic-bezier(0.65, 0, 0.35, 1);
          z-index: 1;
        }
        .testi-card__quote {
          position: relative;
          z-index: 2;
          transition: opacity 0.35s ease, transform 0.4s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .testi-card__avatar {
          position: relative;
          z-index: 2;
          transition: opacity 0.35s ease, transform 0.4s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .testi-card__bottom {
          position: relative;
          z-index: 2;
        }
        .testi-card__name {
          transition: color 0.4s ease;
        }
        .testi-card__role {
          transition: color 0.4s ease;
        }

        /* Hover */
        .testi-card:hover .testi-card__img {
          opacity: 1;
        }
        .testi-card:hover .testi-card__overlay {
          opacity: 1;
        }
        .testi-card:hover .testi-card__quote {
          opacity: 0;
          transform: translateY(-12px);
        }
        .testi-card:hover .testi-card__avatar {
          opacity: 0;
          transform: translateY(-8px);
        }
        .testi-card:hover .testi-card__name {
          color: #ffffff !important;
        }
        .testi-card:hover .testi-card__role {
          color: rgba(255,255,255,0.65) !important;
        }

        @media (max-width: 768px) {
          .testi-grid {
            flex-direction: column;
          }
          .testi-card {
            width: 100%;
          }
          .testi-card__img {
            object-fit: contain !important;
            background-color: #141412;
          }
        }
      `}</style>

      <section
        ref={rootRef}
        id="testimonials"
        className="w-full px-gutter pt-[clamp(60px,9vh,120px)] pb-[clamp(80px,12vh,160px)] max-[900px]:pt-[40px] max-[900px]:pb-[48px]"
      >
        {/* Header */}
        <div className="mb-[clamp(40px,6vh,72px)] max-[900px]:mb-8">
          <p className="testimonials__eyebrow eyebrow mb-5">Testimonials</p>
          <h2 className="testimonials__heading text-[clamp(32px,5vw,76px)] font-medium leading-[1.08] tracking-[-0.03em]">
            Don&rsquo;t take our word for it!
            <br />
            Hear it from our partners.
          </h2>
        </div>

        {/* Single row — full width, no scroll */}
        <div className="testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="testi-card flex-1 min-w-0 bg-white rounded-[20px] pt-8 px-8 pb-5 flex flex-col justify-between"
              style={{ minHeight: '310px' }}
            >
              {/* Hover bg image */}
              <img src={t.avatar} alt="" aria-hidden="true" className="testi-card__img" style={{ objectPosition: t.bgPosition || 'center top' }} />
              {/* Hover overlay */}
              <div className="testi-card__overlay" />

              {/* Top */}
              <div>
                <div className="testi-card__avatar w-11 h-11 rounded-full overflow-hidden mb-7 border border-black/10" style={{ flexShrink: 0 }}>
                  <img src={t.avatar} alt={t.name} className="w-full h-full" style={{ objectFit: 'cover', objectPosition: t.avatarPosition || 'center top' }} />
                </div>
                <p className="testi-card__quote text-[13px] leading-[1.62]" style={{ color: 'rgba(20,20,18,0.72)' }}>
                  {t.quote}
                </p>
              </div>

              {/* Bottom — stays on hover, turns white */}
              <div className="testi-card__bottom mt-6">
                <p
                  className="testi-card__name cursive leading-tight mb-[4px] whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ fontSize: 'clamp(17px,1.4vw,22px)', color: '#141412' }}
                  title={t.name}
                >
                  {t.name}
                </p>
                <p 
                  className="testi-card__role text-[12px] leading-snug min-h-[32px] line-clamp-2" 
                  style={{ color: 'rgba(20,20,18,0.48)' }}
                  title={t.title}
                >
                  {t.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
