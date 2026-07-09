'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onSectionGoto, revealElements } from '@/lib/sectionReveal';

gsap.registerPlugin(ScrollTrigger);

const CAL_EMBED_SCRIPT = 'https://app.cal.com/embed/embed.js';

function initCalEmbed() {
  const w = window;

  (function (C, A, L) {
    const p = function (a, ar) {
      a.q.push(ar);
    };
    const d = C.document;
    C.Cal =
      C.Cal ||
      function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement('script')).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () {
            p(api, arguments);
          };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === 'string') {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ['initNamespace', namespace]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      };
  })(w, CAL_EMBED_SCRIPT, 'init');

  w.Cal('init', '30min', { origin: 'https://app.cal.com' });
  w.Cal.config = w.Cal.config || {};
  w.Cal.config.forwardQueryParams = true;

  w.Cal.ns['30min']('inline', {
    elementOrSelector: '#my-cal-inline-30min',
    config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
    calLink: 'velnox-agency-mwyqji/30min',
  });

  w.Cal.ns['30min']('ui', {
    hideEventTypeDetails: false,
    layout: 'month_view',
  });
}

export default function CTA() {
  const rootRef = useRef(null);
  const calInitialized = useRef(false);

  useEffect(() => {
    if (calInitialized.current) return;
    calInitialized.current = true;
    initCalEmbed();
  }, []);

  useEffect(() => {
    const calRoot = document.getElementById('my-cal-inline-30min');
    if (!calRoot) return;

    const isolateCalScroll = () => {
      calRoot.setAttribute('data-lenis-prevent', 'true');
      calRoot.style.overscrollBehavior = 'contain';

      const iframe = calRoot.querySelector('iframe');
      if (iframe) {
        iframe.setAttribute('data-lenis-prevent', 'true');
      }
    };

    isolateCalScroll();
    const observer = new MutationObserver(isolateCalScroll);
    observer.observe(calRoot, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const wrap = document.querySelector('.cta__cal-wrap');
    if (!wrap) return;

    const pausePageScroll = () => window.__lenis?.stop();
    const resumePageScroll = () => window.__lenis?.start();

    wrap.addEventListener('touchstart', pausePageScroll, { passive: true });
    wrap.addEventListener('touchend', resumePageScroll, { passive: true });
    wrap.addEventListener('touchcancel', resumePageScroll, { passive: true });

    return () => {
      wrap.removeEventListener('touchstart', pausePageScroll);
      wrap.removeEventListener('touchend', resumePageScroll);
      wrap.removeEventListener('touchcancel', resumePageScroll);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const off = onSectionGoto('contact', () => {
      revealElements([
        root.querySelector('.cta__cal'),
        root.querySelector('.cta__actions'),
      ]);
    });

    const ctx = gsap.context(() => {
      gsap.from(root.querySelector('.cta__cal'), {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 70%' },
      });
      gsap.from(root.querySelector('.cta__actions'), {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 70%' },
      });
    }, root);

    return () => {
      off();
      ctx.revert();
    };
  }, []);

  return (
    <section
      className="relative mx-auto w-full overflow-hidden px-gutter pt-[clamp(40px,6vh,72px)] pb-[clamp(20px,3vh,40px)] max-[900px]:pt-8 max-[900px]:pb-6 text-center"
      id="contact"
      ref={rootRef}
    >
      <p className="eyebrow mb-5 justify-center">Your move</p>
      <div
        className="cta__cal-wrap mx-auto w-full max-w-4xl"
        data-lenis-prevent="true"
      >
        <div
          id="my-cal-inline-30min"
          className="cta__cal w-full min-h-[480px] overscroll-contain [touch-action:pan-y]"
          data-lenis-prevent="true"
        />
      </div>
      <div className="cta__actions mt-[clamp(24px,4vh,40px)] flex flex-wrap items-center justify-center gap-[18px]">
        <a href="#work" className="btn-outline">
          <span>Browse work first</span>
        </a>
      </div>
    </section>
  );
}
