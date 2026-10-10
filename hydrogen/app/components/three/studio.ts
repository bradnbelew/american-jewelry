import * as THREE from "three";

/**
 * A procedural studio environment as an equirectangular texture: a soft grey room with a few large softboxes.
 * Used by the refractive diamond material, which needs an explicit environment map to trace against.
 * Drawn once per session on a canvas; no network request, no HDR download.
 */
let cached: THREE.Texture | null = null;

export function studioEquirect(): THREE.Texture | null {
  if (typeof document === "undefined") return null;
  if (cached) return cached;
  const w = 1024;
  const h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  // The room: light above, mid grey at the horizon, darker floor.
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#f4f1ea");
  sky.addColorStop(0.42, "#b9b7b1");
  sky.addColorStop(0.55, "#8d8c89");
  sky.addColorStop(1, "#3a3936");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  const box = (x: number, y: number, bw: number, bh: number, alpha: number, warm = false) => {
    const g = ctx.createRadialGradient(x + bw / 2, y + bh / 2, Math.min(bw, bh) * 0.1, x + bw / 2, y + bh / 2, Math.max(bw, bh) * 0.6);
    g.addColorStop(0, `rgba(255,${warm ? 248 : 255},${warm ? 232 : 255},${alpha})`);
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(x - bw * 0.3, y - bh * 0.3, bw * 1.6, bh * 1.6);
    ctx.fillStyle = `rgba(255,255,255,${alpha * 0.9})`;
    ctx.fillRect(x, y, bw, bh);
  };
  // Key softbox high left, fill right, a thin strip light behind, and a warm kicker.
  box(120, 40, 260, 120, 1);
  box(620, 90, 300, 90, 0.85);
  box(380, 200, 140, 40, 0.6);
  box(880, 160, 90, 60, 0.7, true);
  // Dark bars give the facets something to contrast against.
  ctx.fillStyle = "rgba(20,20,22,0.55)";
  ctx.fillRect(0, 232, w, 10);
  ctx.fillRect(480, 60, 14, 160);

  const tex = new THREE.CanvasTexture(canvas);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  cached = tex;
  return tex;
}
