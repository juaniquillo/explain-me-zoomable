# explain-me-zoomable

**Live demo:** https://explain-me-zoomable.pages.dev/

Starter for the weekly explain-me tradition.

Each week: pick one piece of tech you worked on but don't fully understand → create `explain-me-<topic>` from this template → learn it via a tiny demo.

## Use this template

1. GitHub → `Use this template` → name it `explain-me-<topic>`
2. Fill `TOPIC.md` (short or long, as needed)
3. Fill tech-specific `AGENTS.md` under `## Per-topic overrides`
4. Paste `prompt.md` as your first prompt to the model
5. Build the `src/` demo (one concept, single run command, no deps)
6. Fill `README.md` explanation sections below
7. Copy `LOG-ENTRY.md` row into your central log

## Explanation format (fill per-topic)

### What

`src/zoomable.ts` is a dependency-free pointer-anchored image pan/zoom controller: one `<img>` inside a viewport `<div>`. State is `scale` + `translateX/Y`, rendered as `translate() scale()` with `transformOrigin: 50% 50%`. It handles wheel-zoom at the cursor, drag pan, two-finger pinch (Pointer Events), double-click toggle, and button/center zoom — all capped at the image's 1:1 natural size.

### Why

Naive `scale()` zooms about the element center (or cursor, with a jump), so the content under your pointer slides away and panning escapes the image. This controller exists so (a) the pixel under the cursor/pinch stays put while zooming, (b) pan clamps to the zoomed overflow so edges never detach, and (c) zoom never exceeds real pixels (`naturalWidth / clientWidth`).

### How demo works

`src/index.html` shows a 1600×1200 inline-SVG grid (so `naturalWidth` is known with no asset files) inside a padded viewport, wired by `src/app.js` to `initZoomable()`. Wheel zooms at the cursor, drag pans when zoomed, double-click toggles 1:1, buttons drive center zoom, pinch works on touch. The viewport has deliberate padding to prove clamping uses the content box.

Run it (Vite; `dist/` is the servable build output):

```sh
npm install
npm run dev     # local dev server
npm run build   # emits dist/
npm run preview # serves dist/ locally
```

Any static server works too, e.g. `npx serve dist`.

### Gotchas

- Anchor math: `translate += (cursor - center) * (1 - ratio)` (`src/zoomable.ts:100-101`). Scaling about the center moves the point under the cursor by `(cursor-center)*(ratio-1)`; adding the negation keeps it stationary. Forgetting this is why naive zoom "drifts".
- Clamp uses the viewport *content box* (`getBoundingClientRect` minus computed padding, `src/zoomable.ts:43-56`) and half-overflow (`(clientSize*scale - viewSize)/2`, `src/zoomable.ts:69-70`). Border-box math shifts bounds on padded overlays; at `scale <= 1` pan snaps to 0.
- Pinch does zoom-at-`lastMidpoint` *plus* `middle - anchor` shift (`src/zoomable.ts:184-188`): the first term handles the scale change, the second tracks fingers sliding. Zooming at the live midpoint alone drops the pan component.
- Cap: `maxScale() = naturalWidth / clientWidth` (`src/zoomable.ts:59-65`) — no upscaling past real pixels. Guard `clientWidth === 0` / missing `naturalWidth` returns 1.
- Wheel needs `{ passive: false }` + `preventDefault()` (`src/zoomable.ts:122-130`) or the page scrolls. `dblclick` zoom uses `maxScale()` as the factor from scale 1 (`src/zoomable.ts:218`). No `setPointerCapture` — a fast drag leaving the viewport can stick until `pointerup`.
- `transform` order is `translate(...) scale(...)` with origin `50% 50%`: scale applies about the image center, so an unpanned image is always centered. Call `reset()` when the image src changes or the overlay opens/closes.

### Sources

- `src/zoomable.ts` (this repo — the thing being explained)
- Original use: landing-page image viewer — [resume/resources/js/landing/zoomable.ts](https://github.com/juaniquillo/resume/blob/main/resources/js/landing/zoomable.ts)
- MDN: `Pointer Events`, `Touch action`, `transform-origin`, `WheelEvent.deltaY`

### Template friction

- `src/README.md` from the template was deleted in the working tree (restored); the first version used a zero-dep Node stdlib server, then the lesson moved to Vite so `npm run build` produces a servable `dist/` — one serving story per lesson, not two.

## Files

- `prompt.md` — universal first prompt (does not change per-topic)
- `TOPIC.md` — variable part: what you worked on, what you think, what confuses you
- `AGENTS.md` — base instructions, plus tech-specific notes in each lesson
- `LOG-ENTRY.md` — table row snippet for central log
- `src/README.md` — demo rules

## Evolving this template

To make that easy:
- Keep this template minimal — don't add tech-specific stuff here
- When something feels missing in a lesson, note it in that lesson's README under `### Template friction`
- Every ~3 lessons, backport common fixes here
