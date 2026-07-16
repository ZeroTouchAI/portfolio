# Cinematic Portfolio Hero

Phase 3 of the AI-to-code cinematic workflow: a Next.js hero section with
a fullscreen talking-head video, a Three.js ambient particle layer, and
GSAP entrance animations.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Adding your video

Once your Phase 2 talking-head video is ready:

1. Name the file `hero.mp4`.
2. Drop it into `public/videos/hero.mp4`.
3. Refresh — the hero will pick it up automatically (foreground layer +
   blurred ambient background layer both use the same file).

Until a video is present, the hero falls back to a warm gradient
background so the layout still reads as finished.

## Editing your details

Open `app/page.js` and update the props passed to `<VideoIntro />`:

- `tagline` — small uppercase line above the name
- `firstName` / `lastName` — the large stacked name
- `subtitle` — role/description line below the name

## Structure

```
app/
  layout.js         Root layout, font loading (Fraunces / Inter / JetBrains Mono)
  page.js            Renders the hero + a placeholder next section
  globals.css        Design tokens (colors, fonts)
components/
  VideoIntro.jsx          Hero: video layers, controls, GSAP entrance timeline
  VideoIntro.module.css   Hero styling
  CinematicLayer.jsx      Three.js particle layer with mouse parallax
public/videos/       Drop hero.mp4 here
```

## Notes

- All Three.js resources (geometry, materials, textures, renderer) are
  disposed on unmount to avoid memory leaks.
- Respects `prefers-reduced-motion` for the scroll indicator pulse and
  other CSS animations.
- The particle layer uses `mix-blend-mode: screen` with additive-blended
  points, so it reads as glow rather than flat dots over the video.
