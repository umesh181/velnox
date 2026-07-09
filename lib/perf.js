/** Shared checks for mobile performance mode (native scroll, lighter effects). */
export function isTouchDevice() {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(max-width: 900px)').matches ||
    window.matchMedia('(pointer: coarse)').matches
  );
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function useLiteExperience() {
  return isTouchDevice() || prefersReducedMotion();
}
