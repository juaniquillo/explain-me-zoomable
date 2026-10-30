import './style.css';
import { initZoomable } from './zoomable.js';

const image = document.getElementById('photo') as HTMLImageElement;
const viewport = document.getElementById('viewport') as HTMLElement;
const scaleEl = document.getElementById('scale') as HTMLElement;

const zoom = initZoomable(image, viewport);

const readScale = (): void => {
    const m = /scale\(([^)]+)\)/.exec(image.style.transform || '');
    scaleEl.textContent = m ? Number(m[1]).toFixed(2) : '1.00';
};

// Buttons drive the same zoomCentered() path as the keyboard would.
(document.getElementById('in') as HTMLButtonElement).addEventListener('click', () => { zoom.zoomIn(); readScale(); });
(document.getElementById('out') as HTMLButtonElement).addEventListener('click', () => { zoom.zoomOut(); readScale(); });
(document.getElementById('full') as HTMLButtonElement).addEventListener('click', () => { zoom.toggleFullSize(); readScale(); });
(document.getElementById('reset') as HTMLButtonElement).addEventListener('click', () => { zoom.reset(); readScale(); });

// Pointer/wheel paths update the transform internally; reflect it here.
for (const type of ['wheel', 'pointermove', 'dblclick']) {
    viewport.addEventListener(type, () => requestAnimationFrame(readScale), { passive: true });
}

// Theme toggle: explicit choice wins and persists; with no stored choice
// the inline head script already applied the OS preference.
(document.getElementById('theme-toggle') as HTMLButtonElement).addEventListener('click', () => {
    const dark = document.documentElement.classList.toggle('dark');
    try {
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch { /* private mode: theme just won't persist */ }
});
