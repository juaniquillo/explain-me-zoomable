# AGENTS.md

Base instructions for explain-me repos. See `README.md` and `src/README.md` for workflow.

Template itself has no run command. Each lesson must define one single run command for its `src/` demo and document it in `README.md` under `How demo works`.

## Per-topic overrides

- Run: `npm run dev` (serve), `npm run build` → `dist/` (servable output), `npm run preview` (serve `dist/`)
- Method for this tech: visual / interactive (wheel-at-cursor + drag + pinch demo)
- Stack: Vite + TypeScript DOM + Tailwind v4 (`@tailwindcss/vite`; `src/zoomable.ts` source of truth, `src/main.ts` wires the demo, `src/style.css` is Tailwind + `.dark` variant + Shiki dual-theme CSS)
- Gitignore: `node_modules/`, `dist/`
