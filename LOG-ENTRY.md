# LOG-ENTRY.md

Copy this row into your central log (set location here: <!-- e.g. `explain-me-log/README.md` -->). One row per lesson.

| Date | Repo | Topic | Summary |
| ---- | ---- | ----- | ------- |
| 2026-10-30 | `explain-me-zoomable` | Pointer-anchored image pan/zoom | Zoom keeps the pixel under the cursor fixed via `translate += (cursor-center)*(1-ratio)`, pan clamps to half-overflow of the viewport content box, pinch = zoom-at-last-midpoint plus finger-shift, scale capped at natural 1:1. Demo: Vite, `npm run build` → servable `dist/`. |
