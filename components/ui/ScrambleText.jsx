'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

export function runScrambleAnimation(element, finalText, onComplete) {
  if (!element) return () => {};

  const final = finalText;
  const length = final.length;
  let frame = 0;
  const totalFrames = 32;
  let rafId = 0;

  const tick = () => {
    frame += 1;
    const progress = frame / totalFrames;
    let output = '';

    for (let i = 0; i < length; i += 1) {
      const char = final[i];
      if (char === ' ') {
        output += ' ';
        continue;
      }

      const revealAt = i / length;
      if (progress >= revealAt + 0.22) {
        output += char;
      } else {
        output += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
    }

    element.textContent = output;

    if (frame < totalFrames) {
      rafId = requestAnimationFrame(tick);
      return;
    }

    element.textContent = final;
    onComplete?.();
  };

  rafId = requestAnimationFrame(tick);

  return () => cancelAnimationFrame(rafId);
}

export default function ScrambleText({ text, className, as: Tag = 'span' }) {
  const ref = useRef(null);
  const playedRef = useRef(false);
  const cleanupRef = useRef(() => {});

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const play = () => {
      if (playedRef.current) return;
      playedRef.current = true;
      cleanupRef.current = runScrambleAnimation(el, text);
    };

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: play,
    });

    if (ScrollTrigger.isInViewport(el)) {
      play();
    }

    const onGoto = (e) => {
      if (e.detail?.id === 'work') play();
    };
    window.addEventListener('velnox:goto-section', onGoto);

    return () => {
      st.kill();
      cleanupRef.current();
      window.removeEventListener('velnox:goto-section', onGoto);
    };
  }, [text]);

  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  );
}
