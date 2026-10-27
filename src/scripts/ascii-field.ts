// Original, lightweight procedural fields used to drive the ASCII canvases.
// Not a reimplementation of the vendor's WebGL2 shader — just enough signal
// (smooth brightness) to feed a real glyph sampler.

export type GlyphRamp = "CLASSIC" | "MINIMAL" | "SOFT" | "DENSE";

export const RAMPS: Record<GlyphRamp, string> = {
  CLASSIC: " .:-=+*#%@",
  MINIMAL: " .:+#",
  SOFT: " .-+*",
  DENSE: " .,:;i1tfLCG08@",
};

function hash2(x: number, y: number, seed: number): number {
  const h = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453;
  return h - Math.floor(h);
}

function smooth(t: number): number {
  return t * t * (3 - 2 * t);
}

/** Smoothly interpolated value noise, 0..1. */
function valueNoise(x: number, y: number, seed: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = smooth(x - xi);
  const yf = smooth(y - yi);
  const a = hash2(xi, yi, seed);
  const b = hash2(xi + 1, yi, seed);
  const c = hash2(xi, yi + 1, seed);
  const d = hash2(xi + 1, yi + 1, seed);
  return (
    a * (1 - xf) * (1 - yf) +
    b * xf * (1 - yf) +
    c * (1 - xf) * yf +
    d * xf * yf
  );
}

/** Fractal brownian motion over value noise, 0..1. */
export function fbm(x: number, y: number, seed: number, octaves = 4): number {
  let value = 0;
  let amplitude = 0.5;
  let total = 0;
  let fx = x;
  let fy = y;
  for (let i = 0; i < octaves; i++) {
    value += valueNoise(fx, fy, seed + i * 13) * amplitude;
    total += amplitude;
    amplitude *= 0.5;
    fx *= 2.03;
    fy *= 2.03;
  }
  return value / total;
}

export function glyphForValue(
  value01: number,
  ramp: GlyphRamp,
  invert: boolean
): string {
  const chars = RAMPS[ramp];
  const v = invert ? 1 - value01 : value01;
  const idx = Math.min(
    chars.length - 1,
    Math.max(0, Math.floor(v * chars.length))
  );
  return chars[idx];
}
