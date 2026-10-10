import * as THREE from "three";

/**
 * A round brilliant cut as real facet geometry (57 facets: table, 8 star, 8 bezel, 16 upper girdle,
 * girdle, 16 lower girdle, 8 pavilion mains, culet). Proportions: table 57%, crown 15%, pavilion 43%.
 * Non-indexed so flat shading gives crisp facets; refraction needs real facets to look like a diamond.
 */
export function brilliantGeometry(r: number): THREE.BufferGeometry {
  const yT = 0.33 * r; // table
  const yB = 0.17 * r; // bezel break
  const yG = 0.03 * r; // half girdle thickness
  const yP = -0.5 * r; // pavilion break
  const yC = -0.89 * r; // culet
  const rT = 0.57 * r;
  const rB = 0.84 * r;
  const rP = 0.47 * r;

  const deg = (d: number) => (d * Math.PI) / 180;
  const pt = (radius: number, angleDeg: number, y: number): [number, number, number] => [radius * Math.cos(deg(angleDeg)), y, radius * Math.sin(deg(angleDeg))];

  const T = Array.from({ length: 8 }, (_, k) => pt(rT, k * 45 + 22.5, yT));
  const B = Array.from({ length: 8 }, (_, k) => pt(rB, k * 45, yB));
  const Gu = Array.from({ length: 16 }, (_, j) => pt(r, j * 22.5, yG));
  const Gl = Array.from({ length: 16 }, (_, j) => pt(r, j * 22.5, -yG));
  const P = Array.from({ length: 8 }, (_, k) => pt(rP, k * 45, yP));
  const C: [number, number, number] = [0, yC, 0];
  const center: [number, number, number] = [0, yT, 0];

  const tris: number[] = [];
  const tri = (a: number[], b: number[], c: number[]) => tris.push(...a, ...b, ...c);
  const m8 = (k: number) => ((k % 8) + 8) % 8;
  const m16 = (j: number) => ((j % 16) + 16) % 16;

  for (let k = 0; k < 8; k++) {
    // table
    tri(center, T[m8(k + 1)], T[k]);
    // star facet between T_k and T_{k+1}, pointing down to B_{k+1}
    tri(T[k], T[m8(k + 1)], B[m8(k + 1)]);
    // bezel kite: T_k, B_k, Gu_{2k+1}, B_{k+1}
    tri(T[k], B[k], Gu[m16(2 * k + 1)]);
    tri(T[k], Gu[m16(2 * k + 1)], B[m8(k + 1)]);
    // upper girdle facets around B_k
    tri(B[k], Gu[m16(2 * k - 1)], Gu[m16(2 * k)]);
    tri(B[k], Gu[m16(2 * k)], Gu[m16(2 * k + 1)]);
    // lower girdle facets around P_k
    tri(P[k], Gl[m16(2 * k)], Gl[m16(2 * k - 1)]);
    tri(P[k], Gl[m16(2 * k + 1)], Gl[m16(2 * k)]);
    // pavilion main kite: Gl_{2k+1}, P_k, C, P_{k+1}
    tri(Gl[m16(2 * k + 1)], C, P[k]);
    tri(Gl[m16(2 * k + 1)], P[m8(k + 1)], C);
  }
  for (let j = 0; j < 16; j++) {
    // girdle
    tri(Gu[j], Gl[j], Gl[m16(j + 1)]);
    tri(Gu[j], Gl[m16(j + 1)], Gu[m16(j + 1)]);
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(tris, 3));
  g.computeVertexNormals();
  return g;
}
