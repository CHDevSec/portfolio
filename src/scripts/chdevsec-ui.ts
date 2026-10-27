/**
 * Client behaviour for the CHDEVSEC design system, ported from the React
 * components on the institutional site to plain DOM code for Astro.
 *
 * Source of truth for the visuals: site/src/components/sites/chdevsec/
 *   - AsciiScanField.tsx -> initScanField
 *   - AsciiNoise.tsx     -> initNoise
 *   - ScrollContext.tsx  -> initSectionScroll
 */
import { fbm, glyphForValue } from './ascii-field';

const FONT_FAMILY = '"Monogram Extended", monospace';

const PAPER: [number, number, number] = [242, 242, 236];

/** Accent used by the canvases, read from CSS so the theme owns the palette. */
function signalRgb(): [number, number, number] {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--chd-signal-rgb')
    .trim();
  const parts = raw.split(/[\s,]+/).map(Number).filter((n) => Number.isFinite(n));
  return parts.length === 3 ? (parts as [number, number, number]) : [30, 107, 255];
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function mix(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function prefersReducedMotion(): boolean {
  return Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches);
}

/**
 * Drives a canvas through a resize/visibility-aware animation loop, or a single
 * static frame when the viewer asked for reduced motion. Returns a teardown.
 */
function runCanvas(
  canvas: HTMLCanvasElement,
  frameMs: number,
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, clock: number) => void
): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const reduced = prefersReducedMotion();
  let raf = 0;
  let last = 0;
  let since = 0;
  let clock = 0;
  let visible = true;
  let width = 0;
  let height = 0;

  const paint = () => {
    if (width && height) draw(ctx, width, height, clock);
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const nextW = Math.max(1, Math.round(rect.width));
    const nextH = Math.max(1, Math.round(rect.height));
    if (nextW === width && nextH === height) return;
    width = nextW;
    height = nextH;
    // Assigning width/height clears the bitmap, so only touch it on a real
    // size change — otherwise every observer tick wipes the frame.
    canvas.width = width;
    canvas.height = height;
    paint();
  };

  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();

  const io = new IntersectionObserver(
    (entries) => {
      visible = entries[0]?.isIntersecting ?? true;
    },
    { threshold: 0.01 }
  );
  io.observe(canvas);

  // Monogram loads async; glyph metrics are wrong until it lands.
  document.fonts?.ready.then(paint).catch(() => {});

  if (reduced) {
    return () => {
      observer.disconnect();
      io.disconnect();
    };
  }

  const loop = (now: number) => {
    raf = requestAnimationFrame(loop);
    const delta = last ? now - last : 0;
    last = now;
    if (!visible) return;
    since += delta;
    if (since < frameMs) return;
    clock += Math.min(0.1, since / 1000);
    since = 0;
    paint();
  };
  raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    io.disconnect();
  };
}

/* ------------------------------------------------------------------ *
 * Scan field — the hero backdrop.
 * ------------------------------------------------------------------ */

const SCAN_CELL = 15;
const PERIOD = 7.5;
const TRAVEL = 0.68;
const BEAM_AHEAD = 1.2;
const BEAM_BEHIND = 4.5;
const FLARE = 0.55;
const SETTLE = 1.9;

/** Stable per-cell pseudo-random value in [0, 1). */
function cellHash(col: number, row: number): number {
  const h = Math.sin(col * 12.9898 + row * 78.233) * 43758.5453;
  return h - Math.floor(h);
}

export function initScanField(root: HTMLElement): () => void {
  const canvas = root.querySelector<HTMLCanvasElement>('canvas');
  if (!canvas) return () => {};
  const SIGNAL = signalRgb();

  const stop = runCanvas(canvas, 1000 / 30, (ctx, width, height, clock) => {
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${SCAN_CELL}px ${FONT_FAMILY}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';

    const cols = Math.ceil(width / SCAN_CELL);
    const rows = Math.ceil(height / SCAN_CELL);

    const travel = PERIOD * TRAVEL;
    const t = clock % PERIOD;
    const beamRow = (t / travel) * (rows + BEAM_BEHIND);

    for (let row = 0; row < rows; row++) {
      const reachedAt = (row / (rows + BEAM_BEHIND)) * travel;
      const age = t - reachedAt;
      const delta = row - beamRow;
      const beam =
        delta > 0
          ? smoothstep(BEAM_AHEAD, 0, delta)
          : smoothstep(BEAM_BEHIND, 0, -delta);

      for (let col = 0; col < cols; col++) {
        const noise = fbm(col * 0.045, row * 0.085, 7, 3);
        let level = Math.min(0.74, Math.max(0, (noise - 0.34) * 2.1));

        const cluster = fbm(col * 0.09, row * 0.11, 41, 2);
        const isFinding =
          cluster > 0.56 && cellHash(col, row) > 0.93 && level > 0.04;

        let heat = 0;
        if (isFinding && age >= 0) {
          if (age < FLARE) {
            heat = 1;
            level = Math.max(level, 0.82);
          } else if (age < FLARE + SETTLE) {
            const k = (age - FLARE) / SETTLE;
            heat = 1 - k;
            level = Math.max(level, mix(0.82, 0.46, k));
          } else {
            level = Math.max(level, 0.42);
          }
        }

        level = Math.min(1, level + beam * 0.45);
        const glyph = glyphForValue(level, 'CLASSIC', false);
        if (glyph === ' ') continue;

        const base = 56 + level * 30;
        const r = Math.round(mix(base, SIGNAL[0], heat));
        const g = Math.round(mix(base, SIGNAL[1], heat));
        const b = Math.round(mix(base - 2, SIGNAL[2], heat));
        const lift = beam * 0.85;
        ctx.fillStyle = `rgb(${Math.round(mix(r, PAPER[0], lift))}, ${Math.round(
          mix(g, PAPER[1], lift)
        )}, ${Math.round(mix(b, PAPER[2], lift))})`;
        ctx.fillText(glyph, col * SCAN_CELL, row * SCAN_CELL + SCAN_CELL * 0.86);
      }
    }
    root.dataset.rendered = 'true';
  });

  return stop;
}

/* ------------------------------------------------------------------ *
 * Static ASCII texture, used behind the closing CTA.
 * ------------------------------------------------------------------ */

const NOISE_CELL = 15;

export function initNoise(root: HTMLElement): () => void {
  const canvas = root.querySelector<HTMLCanvasElement>('canvas');
  if (!canvas) return () => {};
  const tone = root.dataset.tone === 'light' ? 'light' : 'dark';

  // The source field is static: one frame per size is all it needs.
  return runCanvas(canvas, 1000, (ctx, width, height) => {
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${NOISE_CELL}px ${FONT_FAMILY}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';

    const cols = Math.ceil(width / NOISE_CELL);
    const rows = Math.ceil(height / NOISE_CELL);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const v = fbm(col * 0.045, row * 0.085, 7, 3);
        const level = Math.min(0.74, Math.max(0, (v - 0.34) * 2.1));
        const glyph = glyphForValue(level, 'CLASSIC', false);
        if (glyph === ' ') continue;
        const shade = Math.round(
          tone === 'light' ? 196 - level * 54 : 56 + level * 26
        );
        ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade - 2})`;
        ctx.fillText(glyph, col * NOISE_CELL, row * NOISE_CELL + NOISE_CELL * 0.86);
      }
    }
    root.dataset.rendered = 'true';
  });
}

/* ------------------------------------------------------------------ *
 * Scroll spy: marks the active section and drives the rail.
 * ------------------------------------------------------------------ */

interface RailLabel {
  id: string;
  label: string;
  n: string;
}

export function initSectionScroll(lightIds: string[]): () => void {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>('[data-section-id]')
  );
  if (!sections.length) return () => {};

  const rail = document.querySelector<HTMLElement>('.section-rail');
  const railLinks = new Map<string, HTMLAnchorElement>();
  rail?.querySelectorAll<HTMLAnchorElement>('a[data-rail-id]').forEach((a) => {
    railLinks.set(a.dataset.railId as string, a);
  });
  const pager = document.querySelector<HTMLElement>('.mobile-pager');
  const light = new Set(lightIds);

  const headerRem = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue(
      '--chd-header-height'
    )
  );
  const headerPx = Number.isFinite(headerRem) ? headerRem * 16 : 60;

  let current = '';

  const apply = (id: string) => {
    if (id === current) return;
    current = id;

    for (const el of sections) {
      el.classList.toggle('is-active', el.dataset.sectionId === id);
    }
    for (const [railId, link] of railLinks) {
      if (railId === id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    if (rail) {
      const isLight = light.has(id);
      rail.classList.toggle('section-rail--light', isLight);
      rail.classList.toggle('section-rail--dark', !isLight);
    }
    if (pager) {
      const meta = (window as unknown as { __chdRailLabels?: RailLabel[] })
        .__chdRailLabels;
      const index = sections.findIndex((el) => el.dataset.sectionId === id);
      const i = index < 0 ? 0 : index;
      pager.classList.toggle('mobile-pager--light', light.has(id));
      pager.classList.toggle('mobile-pager--dark', !light.has(id));
      if (meta) {
        const prev = meta[i - 1];
        const next = meta[i + 1];
        const prevEl = pager.querySelector<HTMLElement>('[data-pager-prev]');
        const nextEl = pager.querySelector<HTMLElement>('[data-pager-next]');
        const status = pager.querySelector<HTMLElement>('[data-pager-status]');
        if (status) status.textContent = `${meta[i].n} ${meta[i].label}`;
        // Ends of the list keep the arrow but stop being a link.
        if (prevEl) {
          prevEl.textContent = prev ? `↑ ${prev.label}` : '↑';
          if (prev) prevEl.setAttribute('href', `#${prev.id}`);
          else prevEl.removeAttribute('href');
        }
        if (nextEl) {
          nextEl.textContent = next ? `${next.label} ↓` : '↓';
          if (next) nextEl.setAttribute('href', `#${next.id}`);
          else nextEl.removeAttribute('href');
        }
      }
    }
  };

  // Topmost section still below the header wins, matching the site.
  const pick = () => {
    let best: HTMLElement | null = null;
    let bestTop = Infinity;
    for (const el of sections) {
      const { top, bottom } = el.getBoundingClientRect();
      if (bottom <= headerPx + 4) continue;
      if (top < bestTop) {
        bestTop = top;
        best = el;
      }
    }
    if (best?.dataset.sectionId) apply(best.dataset.sectionId);
  };

  pick();
  const onScroll = () => requestAnimationFrame(pick);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
  };
}

/* ------------------------------------------------------------------ *
 * ASCII portrait.
 * ------------------------------------------------------------------ */

/* Monogram is a pixel font: it only rasterises fully opaque at exactly 16px.
   At any other size every glyph pixel is a half-covered antialiased edge and
   the portrait greys out. So the backing store is supersampled and drawn at
   the font's native size, then scaled down by CSS. */
const PORTRAIT_CELL = 16;
const PORTRAIT_SCALE = 2;
/** Fraction of the source image kept, cropping in on the head and shoulders. */
const CROP = { x: 0.16, y: 0.02, w: 0.68, h: 0.7 };

export function initPortrait(root: HTMLElement): () => void {
  const canvas = root.querySelector<HTMLCanvasElement>('canvas');
  const src = root.dataset.src;
  if (!canvas || !src) return () => {};

  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  const SIGNAL = signalRgb();

  const image = new Image();
  image.crossOrigin = 'anonymous';

  // Offscreen buffer holding one luminance sample per glyph cell.
  const sampler = document.createElement('canvas');
  const sctx = sampler.getContext('2d', { willReadFrequently: true });

  let ready = false;
  let width = 0;
  let height = 0;

  const draw = () => {
    if (!ready || !sctx || !width || !height) return;

    const cols = Math.max(1, Math.floor(width / PORTRAIT_CELL));
    const rows = Math.max(1, Math.floor(height / PORTRAIT_CELL));
    if (sampler.width !== cols || sampler.height !== rows) {
      sampler.width = cols;
      sampler.height = rows;
    }

    // Downscale the cropped region straight onto the cell grid.
    sctx.clearRect(0, 0, cols, rows);
    sctx.drawImage(
      image,
      image.naturalWidth * CROP.x,
      image.naturalHeight * CROP.y,
      image.naturalWidth * CROP.w,
      image.naturalHeight * CROP.h,
      0,
      0,
      cols,
      rows
    );
    const pixels = sctx.getImageData(0, 0, cols, rows).data;

    ctx.clearRect(0, 0, width, height);
    ctx.font = `${PORTRAIT_CELL}px ${FONT_FAMILY}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const i = (row * cols + col) * 4;
        const luma =
          (pixels[i] * 0.299 + pixels[i + 1] * 0.587 + pixels[i + 2] * 0.114) / 255;

        // Measured on the source: hair sits at luma 0.04, the forehead at 0.75
        // — and the office background behind him at 0.70. Subject and backdrop
        // overlap, so no luminance cut can separate them; the vignette does
        // that geometrically while luma is free to carry facial modelling
        // across its full range.
        const nx = (col / (cols - 1)) * 2 - 1;
        const ny = ((row / (rows - 1)) * 2 - 1) + 0.08;
        const vignette = smoothstep(0.98, 0.34, Math.hypot(nx * 1.12, ny * 0.86));
        // Gamma lift keeps mid-tones (most of the face) on the dense half of
        // the ramp instead of thin punctuation glyphs.
        const level = Math.pow(smoothstep(0.03, 0.8, luma), 0.68) * vignette;
        if (level < 0.1) continue;

        const glyph = glyphForValue(level, 'CLASSIC', false);
        if (glyph === ' ') continue;

        // Paper carries the likeness; the accent only tints the faint edge
        // glyphs, so the face stays readable instead of turning monochrome blue.
        const heat = (1 - smoothstep(0.15, 0.42, level)) * 0.45;
        const r = mix(PAPER[0], SIGNAL[0], heat);
        const g = mix(PAPER[1], SIGNAL[1], heat);
        const b = mix(PAPER[2], SIGNAL[2], heat);
        // Density is carried by the glyph itself, so the ink stays at full
        // strength — modulating alpha too just greyed the whole portrait out.
        ctx.globalAlpha = 1;
        ctx.fillStyle = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
        ctx.fillText(glyph, col * PORTRAIT_CELL, row * PORTRAIT_CELL + PORTRAIT_CELL * 0.86);
      }
    }
    ctx.globalAlpha = 1;
    root.dataset.rendered = 'true';
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const nextW = Math.max(1, Math.round(rect.width) * PORTRAIT_SCALE);
    const nextH = Math.max(1, Math.round(rect.height) * PORTRAIT_SCALE);
    if (nextW === width && nextH === height) return;
    width = nextW;
    height = nextH;
    canvas.width = width;
    canvas.height = height;
    draw();
  };

  const observer = new ResizeObserver(resize);
  observer.observe(canvas);

  image.onload = () => {
    ready = true;
    resize();
    draw();
  };
  image.src = src;

  document.fonts?.ready.then(draw).catch(() => {});

  return () => observer.disconnect();
}

/* ------------------------------------------------------------------ *
 * Indexed tabs: one list, one panel at a time.
 * ------------------------------------------------------------------ */

export function initTabs(root: HTMLElement): () => void {
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  if (!tabs.length) return () => {};

  const panelFor = (tab: HTMLButtonElement) =>
    root.querySelector<HTMLElement>(`#${tab.getAttribute('aria-controls')}`);

  const select = (next: HTMLButtonElement, focus = true) => {
    for (const tab of tabs) {
      const active = tab === next;
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.tabIndex = active ? 0 : -1;
      const panel = panelFor(tab);
      if (panel) panel.hidden = !active;
    }
    if (focus) next.focus();
  };

  const onClick = (event: Event) => {
    const tab = (event.currentTarget as HTMLButtonElement);
    select(tab, false);
  };

  // Roving focus, per the APG tabs pattern.
  const onKey = (event: KeyboardEvent) => {
    const index = tabs.indexOf(event.currentTarget as HTMLButtonElement);
    let next = -1;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    if (next < 0) return;
    event.preventDefault();
    select(tabs[next]);
  };

  for (const tab of tabs) {
    tab.addEventListener('click', onClick);
    tab.addEventListener('keydown', onKey);
  }

  return () => {
    for (const tab of tabs) {
      tab.removeEventListener('click', onClick);
      tab.removeEventListener('keydown', onKey);
    }
  };
}

/* ------------------------------------------------------------------ *
 * Cover art: the project wallpaper, re-rendered as ASCII.
 * ------------------------------------------------------------------ */

/* Monogram only rasterises fully opaque at 16px (see PORTRAIT_CELL), so the
   backing store is supersampled and the canvas scaled down by CSS. */
const COVER_CELL = 16;
const COVER_SCALE = 2;

export function initCover(root: HTMLElement): () => void {
  const canvas = root.querySelector<HTMLCanvasElement>('canvas');
  const src = root.dataset.src;
  if (!canvas || !src) return () => {};

  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};
  const SIGNAL = signalRgb();

  const sampler = document.createElement('canvas');
  const sctx = sampler.getContext('2d', { willReadFrequently: true });
  const image = new Image();

  let ready = false;
  let width = 0;
  let height = 0;

  const draw = () => {
    if (!ready || !sctx || !width || !height) return;

    const cols = Math.max(1, Math.floor(width / COVER_CELL));
    const rows = Math.max(1, Math.floor(height / COVER_CELL));
    if (sampler.width !== cols || sampler.height !== rows) {
      sampler.width = cols;
      sampler.height = rows;
    }

    // Cover the box rather than stretch it, so the art keeps its proportions.
    const scale = Math.max(cols / image.naturalWidth, rows / image.naturalHeight);
    const dw = image.naturalWidth * scale;
    const dh = image.naturalHeight * scale;
    sctx.clearRect(0, 0, cols, rows);
    sctx.drawImage(image, (cols - dw) / 2, (rows - dh) / 2, dw, dh);
    const pixels = sctx.getImageData(0, 0, cols, rows).data;

    ctx.clearRect(0, 0, width, height);
    ctx.font = `${COVER_CELL}px ${FONT_FAMILY}`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const i = (row * cols + col) * 4;
        const luma =
          (pixels[i] * 0.299 + pixels[i + 1] * 0.587 + pixels[i + 2] * 0.114) / 255;
        const level = Math.pow(smoothstep(0.05, 0.85, luma), 0.8);
        if (level < 0.12) continue;

        const glyph = glyphForValue(level, 'CLASSIC', false);
        if (glyph === ' ') continue;

        // Keep the source hue as a wash, pulled toward the brand accent so
        // twelve different wallpapers still read as one family.
        const heat = 0.55;
        const r = mix(pixels[i], SIGNAL[0], heat);
        const g = mix(pixels[i + 1], SIGNAL[1], heat);
        const b = mix(pixels[i + 2], SIGNAL[2], heat);
        ctx.fillStyle = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
        ctx.fillText(glyph, col * COVER_CELL, row * COVER_CELL + COVER_CELL * 0.86);
      }
    }
    root.dataset.rendered = 'true';
  };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const nextW = Math.max(1, Math.round(rect.width) * COVER_SCALE);
    const nextH = Math.max(1, Math.round(rect.height) * COVER_SCALE);
    if (nextW === width && nextH === height) return;
    width = nextW;
    height = nextH;
    canvas.width = width;
    canvas.height = height;
    draw();
  };

  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  // Size the backing store up front rather than waiting on an observer tick —
  // the draw itself is still gated on the image.
  resize();

  image.onload = () => {
    ready = true;
    resize();
    draw();
  };
  image.src = src;

  document.fonts?.ready.then(draw).catch(() => {});

  return () => observer.disconnect();
}
