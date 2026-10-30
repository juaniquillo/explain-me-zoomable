# Topic — pointer-anchored image pan/zoom (`src/zoomable.ts`)

## What I worked on

An image viewer for the resume landing page (original: [resume/resources/js/landing/zoomable.ts](https://github.com/juaniquillo/resume/blob/main/resources/js/landing/zoomable.ts)): wheel-to-zoom, drag-to-pan, pinch, double-click / button zoom, capped at the image's natural (1:1) size. Code in `src/zoomable.ts`, demo in `src/index.html`.

## What I think happens

`scale` + `translateX/Y` rendered as `translate() scale()` about the image center. Zooming adjusts translate so the pixel under the cursor stays under the cursor; panning is clamped so you can't drag past the zoomed edge.

## What confuses me / what I need

- The anchor correction `translate += (cursor - center) * (1 - ratio)` — why that exact form?
- Why clamp against the viewport *content box* (minus padding) and not the border box?
- Pinch: why anchor zoom at `lastMidpoint` then shift by `middle - anchor`, instead of just zooming at the current midpoint?
- Why cap at `naturalWidth / clientWidth`, and why `transformOrigin: 50% 50%` matters.
