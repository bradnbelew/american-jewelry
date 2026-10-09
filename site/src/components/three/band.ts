import * as THREE from "three";
import type { Profile } from "@/lib/builder/model";

/** Scene unit = 10 mm. */
export const MM = 0.1;

/** Cross-section of the band, in mm: x = radial (outward from the inside surface), y = along the finger. */
export function profilePoints(profile: Profile, width: number, thickness: number): [number, number][] {
  const w = width / 2;
  const t = thickness;
  if (profile === "knife") {
    return [
      [0, -w],
      [0, w],
      [t * 0.5, w * 0.42],
      [t, 0],
      [t * 0.5, -w * 0.42],
    ];
  }
  if (profile === "court") {
    const pts: [number, number][] = [
      [0, -w * 0.92],
      [0, w * 0.92],
    ];
    const n = 10;
    for (let i = 0; i <= n; i++) {
      const a = Math.PI / 2 - (i / n) * Math.PI; // top to bottom
      pts.push([t * Math.cos(a), w * Math.sin(a)]);
    }
    return pts;
  }
  return [
    [0, -w],
    [0, w],
    [t * 0.88, w],
    [t, w * 0.8],
    [t, -w * 0.8],
    [t * 0.88, -w],
  ];
}

/**
 * Sweep a profile around the finger axis. The ring lies in the XY plane (finger axis = Z) with the head at +Y.
 * `taper` thins the band toward the bottom; `facets` lowers the segment count for a faceted (Prism) band.
 */
export function bandGeometry(opts: {
  innerRadius: number; // scene units
  profile: Profile;
  widthMm: number;
  thicknessMm: number;
  taper: boolean;
  facets?: boolean;
}): THREE.BufferGeometry {
  const { innerRadius, profile, widthMm, thicknessMm, taper, facets } = opts;
  const N = facets ? 28 : 112;
  const prof = profilePoints(profile, widthMm, thicknessMm);
  const M = prof.length;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= N; i++) {
    const th = (i / N) * Math.PI * 2;
    const s = taper ? 1 - 0.3 * ((1 - Math.sin(th)) / 2) : 1;
    for (let j = 0; j < M; j++) {
      const [x, y] = prof[j];
      const radial = innerRadius + x * MM * s;
      positions.push(radial * Math.cos(th), radial * Math.sin(th), y * MM * s);
      uvs.push(i / N, j / (M - 1));
    }
  }
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      const a = i * M + j;
      const b = i * M + ((j + 1) % M);
      const c = (i + 1) * M + ((j + 1) % M);
      const d = (i + 1) * M + j;
      indices.push(a, b, c, a, c, d);
    }
  }
  let g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  g.setIndex(indices);
  if (facets) g = g.toNonIndexed();
  g.computeVertexNormals();
  return g;
}

/** Five-point star outline (mm) for the Shooting Star plate. */
export function starShape(outerMm: number, innerMm: number) {
  const s = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr = (i % 2 === 0 ? outerMm : innerMm) * MM;
    const x = rr * Math.cos(a);
    const y = rr * Math.sin(a);
    if (i === 0) s.moveTo(x, y);
    else s.lineTo(x, y);
  }
  s.closePath();
  return s;
}
