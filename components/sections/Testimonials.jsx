'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);





const TESTIMONIALS = [
  {
    avatar: '/images/star_test.webp',
    quote:
      '"Specialized in Orthodontics & Comprehensive Dental Care. With 18+ years of clinical & academic experience, we are dedicated to crafting perfect smiles, providing advanced orthodontic treatments and personalized clinical care with the highest standards of safety and comfort for all our patients."',
    name: 'Dr. Manjunath Reddy',
    title: 'Orthodontist & Comprehensive Dental Care',
    avatarPosition: 'center 20%',
    bgPosition: 'center 20%',
  },
  {
    avatar: '/images/pratej_test.webp',
    quote:
      '"Pediatric Dentist, Root canal specialist, Aligners provider. BDS, MDS (Paediatric Dentistry) providing gentle dental care. We specialize in child-friendly dentistry, advanced orthodontic aligners, and painless root canal treatments, ensuring your child\'s dental journey is positive, comfortable, and stress-free."',
    name: 'Dr. K Pratej Kiran',
    title: 'Pediatric Dentist & Root Canal Specialist',
    avatarPosition: 'center top',
    bgPosition: 'center top',
  },
  {
    avatar: '/images/sphoorthi_test.jpeg',
    quote:
      '"Specialized in premium interior design, crafting bespoke and functional spatial layouts for modern living. We combine clean aesthetics, premium materials, and smart spacing solutions to design and transform your residential and commercial environments into stunning, personalized works of art."',
    name: 'Venkateshwarlu Kompelli',
    title: 'Interior Designer',
    avatarPosition: 'center top',
    bgPosition: 'center top',
  },
  {
    avatar: '/images/gowri_test.webp',
    quote:
      '"Prosthodontist and Implantologist, BPS Provider and TMJ Specialist. BDS, MDS restoring confident smiles with top precision. We focus on advanced dental implants, highly cosmetic BPS dentures, and therapeutic management of complex TMJ disorders, bringing back fully functional and beautiful smiles."',
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
          padding: 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 340px;
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
        }
      `}</style>

      <section
        ref={rootRef}
        id="testimonials"
        className="w-full px-gutter pt-[clamp(60px,9vh,120px)] pb-[clamp(80px,12vh,160px)]"
      >
        {/* Header */}
        <div className="mb-[clamp(40px,6vh,72px)]">
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
              className="testi-card flex-1 min-w-0 bg-white rounded-[20px] p-8 flex flex-col justify-between"
              style={{ minHeight: '340px' }}
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
                <p className="testi-card__quote text-[14px] leading-[1.68]" style={{ color: 'rgba(20,20,18,0.72)' }}>
                  {t.quote}
                </p>
              </div>

              {/* Bottom — stays on hover, turns white */}
              <div className="testi-card__bottom mt-6">
                <p
                  className="testi-card__name cursive leading-tight mb-[5px]"
                  style={{ fontSize: 'clamp(18px,1.6vw,24px)', color: '#141412' }}
                >
                  {t.name}
                </p>
                <p className="testi-card__role text-[13px]" style={{ color: 'rgba(20,20,18,0.48)' }}>
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
