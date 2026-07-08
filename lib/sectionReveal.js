import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function revealElements(elements) {
  const list = Array.isArray(elements) ? elements : [elements];
  list.forEach((el) => {
    if (!el) return;
    if (el.length !== undefined && !el.nodeType) {
      [...el].forEach((node) => revealElements(node));
      return;
    }
    gsap.killTweensOf(el);
    gsap.set(el, { opacity: 1, y: 0, x: 0, clearProps: 'transform' });
  });
  ScrollTrigger.refresh();
}

export function onSectionGoto(sectionId, callback) {
  const handler = (e) => {
    if (e.detail?.id === sectionId) callback();
  };
  window.addEventListener('velnox:goto-section', handler);
  return () => window.removeEventListener('velnox:goto-section', handler);
}
