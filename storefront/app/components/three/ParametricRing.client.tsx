import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, MeshRefractionMaterial, OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, type ComponentRef, type RefObject } from "react";
import * as THREE from "three";
import { BIRTHSTONES, sizeToInnerDiameterMm, stoneDiameterMm, type RingConfig } from "~/lib/builder/model";
import { bandThicknessMm } from "~/lib/builder/pricing";
import { brilliantGeometry } from "./brilliant";
import { bandGeometry, starShape, MM } from "./band";
import { studioEquirect } from "./studio";

export type View = "hero" | "stone" | "side" | "inside" | "review" | "set";

const METAL_COLOR: Record<RingConfig["metal"], string> = {
  "14k-yellow": "#d4b060",
  "18k-yellow": "#d9ad4a",
  "14k-rose": "#d79f84",
  "14k-white": "#e6e7e9",
  platinum: "#dcdee1",
};

const VIEWS: Record<View, { pos: [number, number, number]; target: [number, number, number] }> = {
  hero: { pos: [0.6, 1.3, 6.4], target: [0, 0.15, 0] },
  review: { pos: [-0.7, 1.5, 6.4], target: [0, 0.15, 0] },
  stone: { pos: [0.2, 3.6, 2.4], target: [0, 1.0, 0] },
  side: { pos: [4.6, 1.2, 2.6], target: [0, 0.4, 0] },
  inside: { pos: [0, 0.9, 2.6], target: [0, -0.95, 0] },
  /* where the setter's eye sits: three-quarter face, about 20 degrees above the band */
  set: { pos: [3.7, 3.0, 6.3], target: [0, 0.4, 0] },
};

/** The 3D ground token (house.css --stone). */
const STONE = "#e9e7e2";

export interface ParametricRingProps {
  config: RingConfig;
  view?: View;
  autoRotate?: boolean;
  className?: string;
  onGroup?: (g: THREE.Group | null) => void;
  /** 0 = parts apart, 1 = the stone is set. Read every frame; undefined means assembled. */
  progressRef?: RefObject<number>;
  /** Drag to turn. Off while the assembly is pinned to scroll. */
  interactive?: boolean;
  /** The key light and a 3 degree tilt follow the pointer. Off on touch and under reduced motion. */
  pointerLight?: boolean;
  /** Fires once, after the first rendered frame, so a poster can cross-fade out. */
  onFirstFrame?: () => void;
}

export function ParametricRing({ config, view = "hero", autoRotate = false, className = "", onGroup, progressRef, interactive = true, pointerLight = true, onFirstFrame }: ParametricRingProps) {
  const pointer = useRef(new THREE.Vector2(0, 0));
  const pointerOn = useRef(false);
  useEffect(() => {
    if (!pointerLight || typeof window === "undefined") return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    pointerOn.current = !coarse && !reduced;
  }, [pointerLight]);

  return (
    <div
      className={className}
      onPointerMove={(e) => {
        if (!pointerOn.current) return;
        const r = e.currentTarget.getBoundingClientRect();
        pointer.current.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
      }}
      onPointerLeave={() => pointer.current.set(0, 0)}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0.6, 1.4, 5.6], fov: 26 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <color attach="background" args={[STONE]} />
        <ambientLight intensity={0.12} />
        <Scene config={config} onGroup={onGroup} progressRef={progressRef} pointer={pointer} onFirstFrame={onFirstFrame} />
        <ContactShadows position={[0, -1.25, 0]} opacity={0.28} scale={6} blur={2.6} far={2} />
        <Environment resolution={256}>
          <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, 0]} scale={[10, 10, 1]} />
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, 0]} scale={[8, 3, 1]} />
          <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[5, 1, 0]} scale={[8, 3, 1]} />
          <Lightformer intensity={1.2} position={[0, 1, -6]} scale={[10, 4, 1]} color="#fff4e0" />
          <Lightformer intensity={0.8} position={[0, -1, 6]} scale={[10, 2, 1]} />
        </Environment>
        <Rig view={view} autoRotate={autoRotate} interactive={interactive} />
      </Canvas>
    </div>
  );
}

/** Eases the camera to the preset for the current step. */
function Rig({ view, autoRotate, interactive }: { view: View; autoRotate: boolean; interactive: boolean }) {
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null);
  const { camera } = useThree();
  const goal = useRef({ pos: new THREE.Vector3(...VIEWS[view].pos), target: new THREE.Vector3(...VIEWS[view].target), active: true });

  useEffect(() => {
    goal.current.pos.set(...VIEWS[view].pos);
    goal.current.target.set(...VIEWS[view].target);
    goal.current.active = true;
  }, [view]);

  useFrame((_, dt) => {
    if (!goal.current.active || !controls.current) return;
    const k = 1 - Math.pow(0.001, dt);
    camera.position.lerp(goal.current.pos, k);
    controls.current.target.lerp(goal.current.target, k);
    controls.current.update();
    if (camera.position.distanceTo(goal.current.pos) < 0.01) goal.current.active = false;
  });

  return (
    <OrbitControls
      ref={controls}
      enablePan={false}
      enableZoom={interactive}
      enableRotate={interactive}
      minDistance={2.2}
      maxDistance={8}
      autoRotate={autoRotate && interactive}
      autoRotateSpeed={0.6}
      onStart={() => {
        goal.current.active = false;
      }}
    />
  );
}

/** Linear segment of t between a and b, 0..1, with a smooth ease. */
function seg(t: number, a: number, b: number) {
  const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
  return x * x * (3 - 2 * x);
}

/**
 * The key light, the pointer tilt and the assembly, all read per frame from refs so that
 * neither GSAP nor React touches the render loop.
 */
function Scene({ config, onGroup, progressRef, pointer, onFirstFrame }: { config: RingConfig; onGroup?: (g: THREE.Group | null) => void; progressRef?: RefObject<number>; pointer: RefObject<THREE.Vector2>; onFirstFrame?: () => void }) {
  const tilt = useRef<THREE.Group>(null);
  const key = useRef<THREE.DirectionalLight>(null);
  const parts = useRef<RingParts>({ band: null, head: null, stone: null, prongs: [] });
  const first = useRef(false);

  useFrame((_, dt) => {
    const k = 1 - Math.pow(0.002, dt);
    const p = pointer.current;
    // the key light follows the hand; the ring leans at most 3 degrees toward it
    if (key.current) {
      key.current.position.x += (3 + 2 * p.x - key.current.position.x) * k;
      key.current.position.y += (6 + 1.5 * p.y - key.current.position.y) * k;
    }
    if (tilt.current) {
      tilt.current.rotation.y += (0.052 * p.x - tilt.current.rotation.y) * k;
      tilt.current.rotation.x += (-0.035 * p.y - tilt.current.rotation.x) * k;
    }
    // the stone is set: band arrives, head rises, stone lowers, claws close, one sweep of light
    const t = progressRef ? Math.min(1, Math.max(0, progressRef.current ?? 1)) : 1;
    const { band, head, stone, prongs } = parts.current;
    if (band) band.position.y = -0.55 * (1 - seg(t, 0, 0.3));
    if (head) head.position.y = 0.55 * (1 - seg(t, 0.2, 0.55));
    if (stone) stone.position.y = 0.7 * (1 - seg(t, 0.5, 0.8));
    const open = 1 - seg(t, 0.75, 0.95);
    for (const pr of prongs) {
      pr.mesh.rotation.x = pr.base[0] * (1 + 3 * open);
      pr.mesh.rotation.z = pr.base[2] * (1 + 3 * open);
    }
    if (key.current) {
      const s = progressRef ? seg(t, 0.85, 1) : 1;
      key.current.intensity = progressRef ? 1.1 + 1.4 * Math.sin(Math.PI * s) : 1.1;
      if (progressRef && s > 0 && s < 1) key.current.position.x = -3 + 6 * s;
    }
    if (!first.current) {
      first.current = true;
      onFirstFrame?.();
    }
  });

  return (
    <>
      <directionalLight ref={key} position={[3, 6, 4]} intensity={1.1} />
      <group ref={tilt}>
        <Ring config={config} onGroup={onGroup} parts={parts} />
      </group>
    </>
  );
}

interface RingParts {
  band: THREE.Group | null;
  head: THREE.Group | null;
  stone: THREE.Group | null;
  prongs: { mesh: THREE.Mesh; base: [number, number, number] }[];
}

function Ring({ config: c, onGroup, parts }: { config: RingConfig; onGroup?: (g: THREE.Group | null) => void; parts: RefObject<RingParts> }) {
  const group = useRef<THREE.Group>(null);
  useEffect(() => {
    onGroup?.(group.current);
    return () => onGroup?.(null);
  }, [onGroup]);

  const gold = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: METAL_COLOR[c.metal], metalness: 1, roughness: 0.16, clearcoat: 0.35, clearcoatRoughness: 0.15, envMapIntensity: 1.4 }),
    [c.metal],
  );
  const diamond = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#ffffff",
        metalness: 0,
        roughness: 0,
        transmission: 1,
        ior: 2.42,
        thickness: 0.3,
        specularIntensity: 1,
        clearcoat: 1,
        envMapIntensity: 2.6,
        flatShading: true,
        side: THREE.DoubleSide,
      }),
    [],
  );
  const goldPlate = useMemo(() => {
    const m = gold.clone();
    m.side = THREE.DoubleSide;
    return m;
  }, [gold]);
  const studio = useMemo(() => studioEquirect(), []);
  const birth = BIRTHSTONES.find((b) => b.month === c.birthstone);
  const birthMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: birth?.hex ?? "#ffffff",
        metalness: 0,
        roughness: 0.05,
        transmission: birth?.stone === "Pearl" ? 0 : 0.6,
        ior: 1.75,
        thickness: 0.3,
        clearcoat: 1,
        envMapIntensity: 2,
      }),
    [birth],
  );

  // Geometry from the configuration, in scene units (10 mm)
  const innerD = sizeToInnerDiameterMm(c.size);
  const innerR = (innerD / 2) * MM;
  const tMm = bandThicknessMm(c.profile, c.width);
  const outerR = innerR + tMm * MM;
  const r = (stoneDiameterMm(c.carat) / 2) * MM; // stone radius
  const headY = outerR + r * 0.55; // stone center height
  const isPrism = c.setting === "prism";

  const bandGeo = useMemo(
    () => bandGeometry({ innerRadius: innerR, profile: isPrism ? "flat" : c.profile, widthMm: c.width, thicknessMm: tMm, taper: c.taper, facets: isPrism }),
    [innerR, isPrism, c.profile, c.width, tMm, c.taper],
  );
  const stoneGeo = useMemo(() => brilliantGeometry(r), [r]);
  const starGeo = useMemo(() => new THREE.ExtrudeGeometry(starShape(2.1, 0.9), { depth: 0.6 * MM, bevelEnabled: false }), []);

  // Engraving as a canvas texture on the inside of the band, in the house's own faces
  const engravingTex = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = METAL_COLOR[c.metal];
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (c.engraving) {
      const fam = getComputedStyle(document.documentElement).getPropertyValue(c.hand === "script" ? "--font-text" : "--font-sans").trim() || (c.hand === "script" ? "Georgia" : "sans-serif");
      ctx.fillStyle = c.metal === "14k-white" || c.metal === "platinum" ? "#5a5c60" : "#5a4318";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(-1, 1);
      ctx.font = c.hand === "script" ? `italic 400 62px ${fam}` : `500 46px ${fam}`;
      if (c.hand === "roman") (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = "8px";
      ctx.fillText(c.hand === "roman" ? c.engraving.toUpperCase() : c.engraving, 0, 2);
      ctx.restore();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, [c.engraving, c.hand, c.metal]);
  const innerMat = useMemo(
    () => new THREE.MeshPhysicalMaterial({ map: engravingTex ?? undefined, color: engravingTex ? "#ffffff" : METAL_COLOR[c.metal], metalness: 1, roughness: 0.28, side: THREE.BackSide, envMapIntensity: 1.1 }),
    [engravingTex, c.metal],
  );

  // Prongs
  const prongCount = isPrism ? 0 : c.prongs;
  const prongs = useMemo(() => {
    const out: { pos: [number, number, number]; rot: [number, number, number] }[] = [];
    for (let i = 0; i < prongCount; i++) {
      const a = ((i + 0.5) / prongCount) * Math.PI * 2;
      const spread = r * 0.86;
      const pos: [number, number, number] = [Math.cos(a) * spread, headY - r * 0.1, Math.sin(a) * spread];
      out.push({ pos, rot: [0.12 * Math.sin(a), 0, -0.12 * Math.cos(a)] });
      if (c.prongStyle === "double") {
        const da = 0.09;
        out.push({ pos: [Math.cos(a + da) * spread, headY - r * 0.1, Math.sin(a + da) * spread], rot: [0.12 * Math.sin(a + da), 0, -0.12 * Math.cos(a + da)] });
        out[out.length - 2].pos = [Math.cos(a - da) * spread, headY - r * 0.1, Math.sin(a - da) * spread];
      }
    }
    return out;
  }, [prongCount, r, headY, c.prongStyle]);
  const prongR = c.prongStyle === "double" ? 0.021 : 0.03;
  // the prong meshes are registered by index so the assembly can open and close the claws
  useEffect(() => {
    parts.current.prongs = parts.current.prongs.filter((p) => p.mesh.parent);
  }, [prongs, parts]);

  // Shooting Star placement on the left shoulder
  const star = useMemo(() => {
    const phi = Math.PI / 2 + 0.34;
    const radial = new THREE.Vector3(Math.cos(phi), Math.sin(phi), 0);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), radial);
    const p = radial.clone().multiplyScalar(outerR - 0.004);
    return { pos: [p.x, p.y, p.z] as [number, number, number], quat: q };
  }, [outerR]);
  const tail = useMemo(() => {
    const n = c.tail === "long" ? 5 : 3;
    return Array.from({ length: n }, (_, i) => {
      const phi = Math.PI / 2 + 0.62 + i * 0.2;
      const rr = (0.9 - i * 0.12) * MM;
      return { pos: [Math.cos(phi) * (outerR + rr * 0.35), Math.sin(phi) * (outerR + rr * 0.35), 0] as [number, number, number], r: rr };
    });
  }, [c.tail, outerR]);

  // Hidden halo under the stone
  const halo = useMemo(() => {
    if (!c.halo) return [];
    const n = 12;
    return Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2;
      return [Math.cos(a) * r * 0.8, headY - r * 0.62, Math.sin(a) * r * 0.8] as [number, number, number];
    });
  }, [c.halo, r, headY]);

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      {/* band, with the engraved inner surface and the shooting star on its shoulder */}
      <group ref={(g) => void (parts.current.band = g)}>
        <mesh geometry={bandGeo} material={gold} />
        <mesh material={innerMat} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <cylinderGeometry args={[innerR - 0.004, innerR - 0.004, c.width * MM * 0.92, 128, 1, true]} />
        </mesh>
        {c.setting === "shooting-star" && (
          <>
            <mesh geometry={starGeo} material={goldPlate} position={star.pos} quaternion={star.quat} />
            {tail.map((t, i) => (
              <mesh key={i} material={i === 0 && c.birthstone ? birthMat : diamond} position={t.pos}>
                <sphereGeometry args={[t.r, 12, 12]} />
              </mesh>
            ))}
          </>
        )}
      </group>

      {/* head: the gallery, the claws and the hidden halo */}
      <group ref={(g) => void (parts.current.head = g)}>
        {isPrism ? (
          <mesh material={gold} position={[0, headY - r * 0.28, 0]}>
            <cylinderGeometry args={[r * 1.16, r * 1.02, r * 0.72, 6, 1]} />
          </mesh>
        ) : (
          <>
            {prongs.map((p, i) => (
              <mesh
                key={i}
                material={gold}
                position={p.pos}
                rotation={p.rot}
                ref={(m) => {
                  if (!m) return;
                  const list = parts.current.prongs;
                  const found = list.find((x) => x.mesh === m);
                  if (!found) list.push({ mesh: m, base: p.rot });
                }}
              >
                <cylinderGeometry args={[c.prongStyle === "claw" ? prongR * 0.45 : prongR, prongR * 1.15, r * 1.25, 14]} />
                {c.prongStyle === "round" && (
                  <mesh position={[0, r * 0.62, 0]}>
                    <sphereGeometry args={[prongR * 1.05, 14, 14]} />
                  </mesh>
                )}
              </mesh>
            ))}
            <mesh material={gold} position={[0, headY - r * 0.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[r * 0.82, 0.026, 10, 48]} />
            </mesh>
            <mesh material={gold} position={[0, headY - r * 0.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[r * 0.5, 0.028, 10, 40]} />
            </mesh>
            {/* flush accent at the base of the head */}
            <mesh material={diamond} position={[0, outerR + 0.02, 0]}>
              <sphereGeometry args={[0.028, 10, 10]} />
            </mesh>
          </>
        )}
        {halo.map((p, i) => (
          <mesh key={i} material={diamond} position={p}>
            <sphereGeometry args={[r * 0.085, 10, 10]} />
          </mesh>
        ))}
      </group>

      {/* center stone: a real cut geometry traced against the studio environment */}
      <group ref={(g) => void (parts.current.stone = g)}>
        <mesh geometry={stoneGeo} position={[0, headY + r * 0.02, 0]}>
          {studio ? <MeshRefractionMaterial envMap={studio} bounces={3} ior={2.42} fresnel={1} aberrationStrength={0.012} color="#ffffff" toneMapped={false} /> : <primitive object={diamond} attach="material" />}
        </mesh>
      </group>
    </group>
  );
}
