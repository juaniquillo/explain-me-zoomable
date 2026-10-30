// Embeds highlighted src/zoomable.ts into the source-viewer <pre> in
// src/index.html (the one with max-h-[480px]), and highlights every
// walkthrough snippet (<pre class="shiki ...">). zoomable.ts and the
// hand-written snippets stay the sources of truth; shiki spans are
// build output. Re-run after editing index.html, then rebuild:
// node tools/inject-source.mjs && npm run build
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { codeToHtml } from 'shiki';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = fs.readFileSync(path.join(root, 'src/zoomable.ts'), 'utf8');
const htmlPath = path.join(root, 'src/index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const themes = { light: 'github-light', dark: 'github-dark' };

// Keep shiki's inner spans; our own <pre><code> wrappers provide layout,
// and style.css switches the dual-theme variables.
async function highlight(code) {
    const out = await codeToHtml(code, { lang: 'typescript', themes });
    return out.replace(/^[\s\S]*?<code>/, '').replace(/<\/code><\/pre>\s*$/, '');
}

function decodeEntities(s) {
    return s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
}

// 1. Full-file source viewer.
const viewer = /(<pre class="[^"]*max-h-\[480px\][^"]*"><code class="shiki">)[\s\S]*?(<\/code><\/pre>)/;
if (!viewer.test(html)) {
    throw new Error('source-viewer <pre> not found in src/index.html');
}
const viewerHtml = await highlight(src);
html = html.replace(viewer, (_, open, close) => open + viewerHtml + close);

// 2. Walkthrough snippets. Skip blocks that already contain spans so the
// script stays idempotent.
const blocks = [...html.matchAll(/<pre class="shiki ([^"]*)">([\s\S]*?)<\/pre>/g)];
let walkCount = 0;
for (const [, cls, inner] of blocks) {
    if (inner.includes('<span')) {
        continue;
    }
    const done = await highlight(decodeEntities(inner).replace(/\s+$/, ''));
    html = html.replace(
        `<pre class="shiki ${cls}">${inner}</pre>`,
        () => `<pre class="shiki ${cls}">${done}</pre>`,
    );
    walkCount += 1;
}

fs.writeFileSync(htmlPath, html);
console.log(`injected highlighted source (${src.split('\n').length} lines) + ${walkCount} walkthrough blocks`);
