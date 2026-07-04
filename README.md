# Velnox® — Digital Agency Landing Page

Minimal, editorial, awwwards-style landing page. Next.js 15 (App Router) + GSAP + Three.js + Lenis smooth scroll.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → ./out (deploy anywhere)
```

## What's inside

- **Preloader** — VELNOX® letter reveal + 0–100% counter, curtain exit
- **Hero** — masked line reveals, serif italic accents, WebGL morphing blob (custom simplex-noise shader, mouse parallax, respects `prefers-reduced-motion`)
- **Marquee** — infinite services ticker
- **Studio** — word-by-word scroll-scrub statement + animated stat counters
- **Services** — dark rounded panel, directional hover fill, in-row cursor-following preview
- **Work** — bento grid (2 big + 4 small tiles), 3D tilt on hover (CSS gradients — swap in real project images)
- **Footer** — surprise pop-up cards that fan out from the bottom when you reach the end
- **Process** — pinned horizontal scroll on desktop, stacked cards on mobile
- **CTA** — magnetic email button, scaling ring
- **Footer** — oversized clipped wordmark
- Plus: Lenis smooth scroll, custom cursor (desktop only), grain overlay, full mobile menu overlay

## Customizing

- Colors/typography: CSS variables at the top of `app/globals.css`
- Copy & data: each section component in `components/` has its content in a const at the top (SERVICES, PROJECTS, STEPS, STATS…)
- Fonts: Archivo + Instrument Serif via Google Fonts (`app/layout.js`)

## Notes

- `velnox-preview/` (sibling folder) is a pre-built static export you can open by double-clicking `index.html` — no install needed. It uses relative asset paths for file:// viewing; always deploy from `npm run build` output instead.
