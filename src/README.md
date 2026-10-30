# src demo rules

- One concept only. If you need two concepts, make two repos.
- Single run command (e.g. `npx serve .`, `python -m http.server`, `cargo run`, `node demo.js`).
- No dependencies unless unavoidable. Prefer stdlib / single file.
- Demo must directly illustrate the confusion in `TOPIC.md`.
- Document the run command in the per-lesson `README.md` under `How demo works`.

## Run

From repo root: `npm install`, then `npm run dev` (dev server), `npm run build` (emits `dist/`), `npm run preview` (serves `dist/`).

`og:image` needs an absolute URL: copy `.env.example` to `.env` and set `VITE_SITE_URL` (any value works locally). On Cloudflare Pages, set `VITE_SITE_URL=https://your-domain` as a build environment variable instead — without it, the meta tags render a broken `%VITE_SITE_URL%` placeholder.

`tools/inject-source.mjs` Shiki-highlights the `<details>` source viewer and every walkthrough snippet (`<pre class="shiki">`) in `index.html`. `zoomable.ts` and the hand-written snippets stay the sources of truth. After editing `index.html`, re-run `node tools/inject-source.mjs` then `npm run build`.
