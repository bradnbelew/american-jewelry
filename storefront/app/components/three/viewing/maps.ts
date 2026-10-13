import * as THREE from "three";
import { LININGS, type Lining } from "./pieces";

/** Small seeded generator so every visit lights the stone the same way. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const hex = (c: string) => {
  const col = new THREE.Color(c); // linear
  return [col.r, col.g, col.b] as const;
};

/**
 * The stone's world, as a high-dynamic-range equirectangular map.
 * A jewelry counter makes diamonds flash because it is dark with many small, very bright lights overhead.
 * This is that room: the lining below, darkness at the horizon, one lamp, and a ceiling of pin lights.
 * Values go far above 1, so the bloom pass only catches the flashes.
 */
const cache = new Map<string, THREE.DataTexture>();

export function sparkleMap(lining: Lining): THREE.DataTexture {
  const hit = cache.get(lining);
  if (hit) return hit;
  const room = LININGS[lining];
  const w = 1024;
  const h = 512;
  const px = new Float32Array(w * h * 3);
  const cloth = hex(room.cloth);
  const lamp = hex(room.light);
  const dark = hex(room.ground);

  // ground and air
  for (let j = 0; j < h; j++) {
    const v = (j + 0.5) / h; // 0 = straight down, 1 = straight up
    for (let i = 0; i < w; i++) {
      const o = (j * w + i) * 3;
      if (v < 0.5) {
        // the lining, lit near the stone and falling off toward the horizon
        const k = 0.05 + 0.25 * Math.pow(1 - v / 0.5, 2);
        px[o] = cloth[0] * k;
        px[o + 1] = cloth[1] * k;
        px[o + 2] = cloth[2] * k;
      } else {
        // the room above: dim at the horizon, brighter toward the ceiling, warm or cool with the light
        const k = 0.04 + 0.5 * Math.pow((v - 0.5) / 0.5, 1.6);
        px[o] = dark[0] * 0.5 + lamp[0] * k;
        px[o + 1] = dark[1] * 0.5 + lamp[1] * k;
        px[o + 2] = dark[2] * 0.5 + lamp[2] * k;
      }
    }
  }

  const blob = (u: number, v: number, r: number, power: number, col: readonly [number, number, number], soft = false) => {
    const cx = u * w;
    const cy = v * h;
    const reach = Math.ceil(r * (soft ? 2.2 : 3.2));
    for (let y = Math.max(0, Math.floor(cy - reach)); y < Math.min(h, Math.ceil(cy + reach)); y++) {
      for (let x = Math.floor(cx - reach); x < Math.ceil(cx + reach); x++) {
        const xi = ((x % w) + w) % w;
        const dx = x - cx;
        const dy = y - cy;
        const d2 = (dx * dx + dy * dy) / (r * r);
        // a hard core with a short halo for pin lights, a broad falloff for soft sources
        const f = soft ? Math.exp(-d2 * 1.4) : Math.exp(-d2 * 3) + 0.04 * Math.exp(-d2 * 0.25);
        const o = (y * w + xi) * 3;
        px[o] += col[0] * power * f;
        px[o + 1] += col[1] * power * f;
        px[o + 2] += col[2] * power * f;
      }
    }
  };

  const R = rng(lining.length * 977 + 13);
  // u = 0.75 is toward the viewer; v near 1 is overhead
  {
    blob(0.72, 0.84, 110, 5, lamp, true); // the lamp over the counter
    blob(0.25, 0.8, 90, 2.2, lamp, true); // a second lamp across the room
    blob(0.75, 0.58, 160, 0.6, lamp, true); // its light bouncing off the person looking
  }
  const pins = 70;
  for (let k = 0; k < pins; k++) {
    const u = R();
    const v = 0.6 + 0.37 * Math.sqrt(R());
    const r = 1.6 + R() * 2.2;
    const p = 18 + R() * 40;
    const white: readonly [number, number, number] = [1, 0.94, 0.84];
    blob(u, v, r, p, white);
  }
  // the viewer's own shadow: the dark that gives the stone its contrast
  for (let j = Math.floor(h * 0.47); j < Math.floor(h * 0.62); j++) {
    for (let i = Math.floor(w * 0.68); i < Math.floor(w * 0.82); i++) {
      const o = (j * w + i) * 3;
      px[o] *= 0.25;
      px[o + 1] *= 0.25;
      px[o + 2] *= 0.25;
    }
  }

  const half = new Uint16Array(w * h * 4);
  for (let p = 0, q = 0; p < w * h; p++) {
    half[q++] = THREE.DataUtils.toHalfFloat(px[p * 3]);
    half[q++] = THREE.DataUtils.toHalfFloat(px[p * 3 + 1]);
    half[q++] = THREE.DataUtils.toHalfFloat(px[p * 3 + 2]);
    half[q++] = THREE.DataUtils.toHalfFloat(1);
  }
  const tex = new THREE.DataTexture(half, w, h, THREE.RGBAFormat, THREE.HalfFloatType);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  tex.colorSpace = THREE.LinearSRGBColorSpace;
  tex.needsUpdate = true;
  cache.set(lining, tex);
  return tex;
}

/**
 * The lining's surface as a tiling normal map: fine pile for cloth, a soft honed grain for slate.
 * One texture per kind, generated once.
 */
const normals = new Map<string, THREE.DataTexture>();

export function liningNormal(kind: "cloth" | "stone"): THREE.DataTexture {
  const hit = normals.get(kind);
  if (hit) return hit;
  const n = 256;
  const R = rng(kind === "cloth" ? 41 : 97);
  const height = new Float32Array(n * n);
  if (kind === "cloth") {
    // pile: per-fiber noise, slightly streaked along one direction
    for (let i = 0; i < n * n; i++) height[i] = R();
    const tmp = new Float32Array(n * n);
    for (let y = 0; y < n; y++)
      for (let x = 0; x < n; x++) {
        let s = 0;
        for (let k = -2; k <= 2; k++) s += height[y * n + ((x + k + n) % n)];
        tmp[y * n + x] = s / 5;
      }
    height.set(tmp);
  } else {
    // honed stone: a few octaves of smooth value noise
    const octave = (cells: number, amp: number) => {
      const g = new Float32Array((cells + 1) * (cells + 1)).map(() => R());
      for (let y = 0; y < n; y++)
        for (let x = 0; x < n; x++) {
          const fx = (x / n) * cells;
          const fy = (y / n) * cells;
          const x0 = Math.floor(fx);
          const y0 = Math.floor(fy);
          const tx = fx - x0;
          const ty = fy - y0;
          const at = (a: number, b: number) => g[(b % cells) * (cells + 1) + (a % cells)];
          const s = (t: number) => t * t * (3 - 2 * t);
          const top = at(x0, y0) + (at(x0 + 1, y0) - at(x0, y0)) * s(tx);
          const bot = at(x0, y0 + 1) + (at(x0 + 1, y0 + 1) - at(x0, y0 + 1)) * s(tx);
          height[y * n + x] += (top + (bot - top) * s(ty)) * amp;
        }
    };
    octave(8, 1);
    octave(32, 0.5);
    octave(64, 0.25);
  }
  const strength = kind === "cloth" ? 2.2 : 1.4;
  const data = new Uint8Array(n * n * 4);
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      const hL = height[y * n + ((x - 1 + n) % n)];
      const hR = height[y * n + ((x + 1) % n)];
      const hD = height[((y - 1 + n) % n) * n + x];
      const hU = height[((y + 1) % n) * n + x];
      const v = new THREE.Vector3((hL - hR) * strength, (hD - hU) * strength, 1).normalize();
      const o = (y * n + x) * 4;
      data[o] = Math.round((v.x * 0.5 + 0.5) * 255);
      data[o + 1] = Math.round((v.y * 0.5 + 0.5) * 255);
      data[o + 2] = Math.round((v.z * 0.5 + 0.5) * 255);
      data[o + 3] = 255;
    }
  const tex = new THREE.DataTexture(data, n, n, THREE.RGBAFormat);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(kind === "cloth" ? 140 : 6, kind === "cloth" ? 140 : 6);
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  normals.set(kind, tex);
  return tex;
}
