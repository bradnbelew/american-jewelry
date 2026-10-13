import { Environment, Lightformer, MeshRefractionMaterial } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, ToneMapping, Vignette } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { BIRTHSTONES, DEFAULT_CONFIG, sizeToInnerDiameterMm, stoneDiameterMm, type RingConfig } from "~/lib/builder/model";
import { bandThicknessMm } from "~/lib/builder/pricing";

import { bandGeometry, MM, starShape } from "../band";
import { brilliantGeometry } from "../brilliant";
import { liningNormal, sparkleMap } from "./maps";
import { LININGS, type ViewingSpec } from "./pieces";
import { listenPointer, tilt } from "./tilt";

/**
 * The viewing: one piece resting on its lining under one light, in the dark.
 * The light is the visitor's: the pointer carries it on a computer, tilting carries it on a phone.
 * Stand-in pieces from the builder's own geometry until the iJewel models arrive.
 */
export interface ViewingSceneProps {
  spec: ViewingSpec;
  metal?: RingConfig["metal"];
  /** false while the frame is off screen: nothing draws */
  active: boolean;
  /** the camera moves in on the stone */
  closer?: boolean;
  /** where the piece sits across a landscape frame: 0 is centered, 0.2 is a fifth of the width to the right */
  offset?: number;
  /** in a portrait frame with words beneath, raise the piece (0 to 1) */
  lift?: number;
  onFirstFrame?: () => void;
}

const GROUND = -1.05;

export function ViewingScene(props: ViewingSceneProps) {
  useEffect(() => listenPointer(), []);
  const ground = LININGS[props.spec.lining].ground;
  return (
    <Canvas
      className="!absolute inset-0"
      shadows="percentage"
      frameloop={props.active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.6, 11], fov: 26, near: 0.1, far: 60 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={[ground]} />
      <Room {...props} />
      <EffectComposer multisampling={4}>
        <Bloom luminanceThreshold={1.05} luminanceSmoothing={0.15} intensity={0.85} radius={0.62} mipmapBlur />
        <Vignette offset={0.32} darkness={0.5} />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    </Canvas>
  );
}

function damp(current: number, target: number, rate: number, dt: number) {
  return current + (target - current) * (1 - Math.exp(-rate * dt));
}

function Room({ spec, metal, closer = false, offset = 0, lift = 0, onFirstFrame }: ViewingSceneProps) {
  const { camera, size, scene } = useThree();
  const lining = LININGS[spec.lining];
  const reduced = useMemo(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);
  const spot = useRef<THREE.SpotLight>(null);
  const rim = useRef<THREE.PointLight>(null);
  const turn = useRef<THREE.Group>(null);
  const target = useMemo(() => new THREE.Object3D(), []);
  const fog = useMemo(() => new THREE.Fog(lining.ground, 8, 17), [lining.ground]);
  const cloth = useMemo(() => liningNormal("cloth"), []);
  const env = useMemo(() => sparkleMap(spec.lining), [spec.lining]);
  const look = useRef(new THREE.Vector3(0, 0.1, 0));
  const stoneHeight = useRef(1.6);
  const born = useRef<number | null>(null);
  const first = useRef(false);

  useEffect(() => {
    scene.fog = fog;
    return () => {
      scene.fog = null;
    };
  }, [scene, fog]);

  useFrame((frame, dtRaw) => {
    const dt = Math.min(dtRaw, 1 / 20);
    const t = frame.clock.elapsedTime;
    if (born.current === null) born.current = t;
    const aspect = size.width / Math.max(1, size.height);

    // frame the ring: about half the height, never wider than two thirds of the width
    const dist = Math.max(10.2, 7.2 / aspect);
    const visibleW = 2 * dist * Math.tan(THREE.MathUtils.degToRad(13)) * aspect;
    const x = aspect > 1 ? offset * visibleW : 0;

    // the light comes up when the frame first opens
    const rise = reduced ? 1 : Math.min(1, Math.max(0, (t - born.current - 0.15) / 1.6));
    const eased = rise * rise * (3 - 2 * rise);

    // the hand: pointer or tilt; with nobody holding it, the light breathes
    const idle = tilt.source === "idle" || performance.now() - tilt.lastInput > 4000;
    const tx = idle && !reduced ? 0.42 * Math.sin(t * 0.45) : tilt.tx;
    const ty = idle && !reduced ? 0.22 * Math.sin(t * 0.31 + 1.2) : tilt.ty;
    tilt.x = damp(tilt.x, reduced ? 0 : tx, 5, dt);
    tilt.y = damp(tilt.y, reduced ? 0 : ty, 5, dt);

    if (spot.current) {
      spot.current.intensity = 420 * lining.power * eased;
      spot.current.position.set(x + 0.9 + 3 * tilt.x, 8.4, 1.6 + 2 * tilt.y);
      target.position.set(x, GROUND + 0.6, 0);
      target.updateMatrixWorld();
    }
    if (rim.current) {
      rim.current.intensity = 6 * lining.power * eased;
      rim.current.position.set(x - 2.6 - tilt.x, 2.2, -2.4);
    }
    if (turn.current) {
      turn.current.position.x = x;
      turn.current.rotation.y = -0.55 + 0.34 * tilt.x;
      turn.current.rotation.x = 0.1 * tilt.y;
    }

    const camPos = new THREE.Vector3(0, 1.6, dist);
    const lookAt = new THREE.Vector3(0, aspect < 0.9 ? 0.1 - lift * 1.6 : 0.1, 0);
    if (closer) {
      const sy = GROUND + stoneHeight.current;
      // in on the stone, a little above it, the stone held in the upper middle of the frame
      camPos.set(x + 0.3, sy + 1.1, aspect < 0.9 ? 5.6 : 4.2);
      lookAt.set(x, sy - (aspect < 0.9 ? 0.55 : 0.25), 0);
    }
    const d = camPos.distanceTo(lookAt);
    fog.near = d * 0.72;
    fog.far = d * 1.45;
    const k = reduced || !first.current ? 1 : 1 - Math.exp(-3.2 * dt);
    camera.position.lerp(camPos, k);
    look.current.lerp(lookAt, k);
    camera.lookAt(look.current);

    if (!first.current) {
      first.current = true;
      onFirstFrame?.();
    }
  });

  return (
    <>
      <primitive object={target} />
      <spotLight ref={spot} color={lining.light} target={target} angle={0.24} penumbra={0.75} decay={2} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.0004} shadow-normalBias={0.02} />
      <pointLight ref={rim} color={lining.light} decay={2} />
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.6} color="#fff3e2" position={[0, 6, 1]} rotation-x={Math.PI / 2} scale={[10, 6, 1]} />
        <Lightformer intensity={3.2} color="#ffffff" position={[-6, 1.5, 1]} rotation-y={Math.PI / 2} scale={[12, 2.2, 1]} />
        <Lightformer intensity={2.4} color="#ffffff" position={[6, 1.2, -1]} rotation-y={-Math.PI / 2} scale={[12, 1.6, 1]} />
        <Lightformer intensity={1.5} color="#ffffff" position={[0, 1.5, 8]} scale={[16, 4, 1]} />
        <Lightformer intensity={0.7} color="#ffffff" position={[0, 2, -8]} scale={[16, 3, 1]} />
      </Environment>
      <mesh rotation-x={-Math.PI / 2} position={[0, GROUND, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshPhysicalMaterial
          color={lining.cloth}
          roughness={1}
          sheen={lining.sheen}
          sheenColor={lining.sheenColor}
          sheenRoughness={lining.sheenRoughness}
          normalMap={cloth}
          normalScale={new THREE.Vector2(0.32, 0.32)}
          envMapIntensity={0.04}
        />
      </mesh>
      <group position={[0, GROUND, 0]}>
        <group ref={turn} rotation-y={-0.55}>
          {spec.jewel.kind === "ring" ? (
            <Ring partial={{ ...spec.jewel.config, ...(metal ? { metal } : {}) }} carat={spec.jewel.carat} env={env} onStoneHeight={(y) => void (stoneHeight.current = y)} />
          ) : (
            <Eternity metal={metal ?? spec.jewel.metal} count={spec.jewel.stones} env={env} onStoneHeight={(y) => void (stoneHeight.current = y)} />
          )}
        </group>
      </group>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Stand-in pieces, drawn from the builder's geometry                  */
/* ------------------------------------------------------------------ */

const METAL: Record<RingConfig["metal"], string> = {
  "14k-yellow": "#f0c878",
  "18k-yellow": "#f4c463",
  "14k-rose": "#efb293",
  "14k-white": "#e9eaec",
  platinum: "#e2e4e8",
};
const WHITE = new THREE.Color(1.15, 1.15, 1.15);

function metalMaterial(metal: RingConfig["metal"]) {
  return new THREE.MeshPhysicalMaterial({ color: METAL[metal], metalness: 1, roughness: 0.11, envMapIntensity: 1.6 });
}

function Stone({ geometry, env, position, quaternion, tint, chroma = true }: { geometry: THREE.BufferGeometry; env: THREE.Texture; position: [number, number, number]; quaternion?: THREE.Quaternion; tint?: THREE.Color; chroma?: boolean }) {
  return (
    <mesh geometry={geometry} position={position} quaternion={quaternion} castShadow>
      <MeshRefractionMaterial envMap={env} bounces={3} ior={2.42} fresnel={0.1} aberrationStrength={chroma ? 0.024 : 0.012} fastChroma={!chroma} color={tint ?? WHITE} toneMapped={false} />
    </mesh>
  );
}

function Ring({ partial, carat, env, onStoneHeight }: { partial: Partial<RingConfig>; carat?: number; env: THREE.Texture; onStoneHeight: (y: number) => void }) {
  const c: RingConfig = { ...DEFAULT_CONFIG, ...partial };
  const gold = useMemo(() => metalMaterial(c.metal), [c.metal]);
  const goldTwoSided = useMemo(() => {
    const m = gold.clone();
    m.side = THREE.DoubleSide;
    return m;
  }, [gold]);

  const innerR = (sizeToInnerDiameterMm(c.size) / 2) * MM;
  const tMm = bandThicknessMm(c.profile, c.width);
  const outerR = innerR + tMm * MM;
  const r = (stoneDiameterMm(carat ?? c.carat) / 2) * MM;
  const headY = outerR + r * 0.55;
  const isPrism = c.setting === "prism";

  const bandGeo = useMemo(
    () => bandGeometry({ innerRadius: innerR, profile: isPrism ? "flat" : c.profile, widthMm: c.width, thicknessMm: tMm, taper: c.taper, facets: isPrism }),
    [innerR, isPrism, c.profile, c.width, tMm, c.taper],
  );
  const stoneGeo = useMemo(() => brilliantGeometry(r), [r]);
  const starGeo = useMemo(() => new THREE.ExtrudeGeometry(starShape(2.3, 1.0), { depth: 0.7 * MM, bevelEnabled: true, bevelThickness: 0.08 * MM, bevelSize: 0.08 * MM, bevelSegments: 1 }), []);
  const accentGeo = useMemo(() => brilliantGeometry(0.032), []);

  useLayoutEffect(() => {
    onStoneHeight(outerR + headY + r * 0.2);
  }, [onStoneHeight, outerR, headY, r]);

  const prongCount = isPrism ? 0 : c.prongs;
  const prongR = c.prongStyle === "double" ? 0.021 : c.prongs === 6 ? 0.026 : 0.03;
  const prongs = useMemo(() => {
    const out: { pos: [number, number, number]; rot: [number, number, number] }[] = [];
    for (let i = 0; i < prongCount; i++) {
      const a = ((i + 0.5) / prongCount) * Math.PI * 2;
      const spread = r * 0.88;
      out.push({ pos: [Math.cos(a) * spread, headY - r * 0.1, Math.sin(a) * spread], rot: [0.12 * Math.sin(a), 0, -0.12 * Math.cos(a)] });
    }
    return out;
  }, [prongCount, r, headY]);

  const star = useMemo(() => {
    const phi = Math.PI / 2 + 0.36;
    const radial = new THREE.Vector3(Math.cos(phi), Math.sin(phi), 0);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), radial);
    const p = radial.clone().multiplyScalar(outerR - 0.006);
    return { pos: [p.x, p.y, p.z - 0.035] as [number, number, number], quat: q };
  }, [outerR]);
  const tail = useMemo(() => {
    const n = c.tail === "long" ? 5 : 3;
    return Array.from({ length: n }, (_, i) => {
      const phi = Math.PI / 2 + 0.66 + i * 0.21;
      const rr = (1.0 - i * 0.14) * MM;
      const radial = new THREE.Vector3(Math.cos(phi), Math.sin(phi), 0);
      const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), radial);
      const p = radial.clone().multiplyScalar(outerR + rr * 0.2);
      return { pos: [p.x, p.y, p.z] as [number, number, number], quat: q, r: rr };
    });
  }, [c.tail, outerR]);
  const tailGeos = useMemo(() => tail.map((t) => brilliantGeometry(t.r)), [tail]);
  const birth = BIRTHSTONES.find((b) => b.month === c.birthstone);
  const birthTint = useMemo(() => {
    if (!birth) return undefined;
    const col = new THREE.Color(birth.hex);
    return new THREE.Color(col.r * 1.6, col.g * 1.6, col.b * 1.6);
  }, [birth]);

  return (
    <group position={[0, outerR, 0]}>
      <mesh geometry={bandGeo} material={gold} castShadow />
      {c.setting === "shooting-star" && (
        <>
          <mesh geometry={starGeo} material={goldTwoSided} position={star.pos} quaternion={star.quat} castShadow />
          {tail.map((t, i) => (
            <Stone key={i} geometry={tailGeos[i]} env={env} position={t.pos} quaternion={t.quat} tint={i === 0 ? birthTint : undefined} chroma={false} />
          ))}
        </>
      )}
      {isPrism ? (
        <>
          <mesh material={gold} position={[0, headY - r * 0.3, 0]} castShadow>
            <cylinderGeometry args={[r * 1.14, r * 0.92, r * 0.74, 6, 1]} />
          </mesh>
          <mesh material={gold} position={[0, outerR + (headY - r * 0.66 - outerR) / 2, 0]}>
            <cylinderGeometry args={[r * 0.5, r * 0.62, Math.max(0.02, headY - r * 0.66 - outerR), 6, 1]} />
          </mesh>
        </>
      ) : (
        <>
          {prongs.map((p, i) => (
            <mesh key={i} material={gold} position={p.pos} rotation={p.rot} castShadow>
              <cylinderGeometry args={[c.prongStyle === "claw" ? prongR * 0.45 : prongR, prongR * 1.15, r * 1.25, 14]} />
              {c.prongStyle === "round" && (
                <mesh position={[0, r * 0.62, 0]} material={gold}>
                  <sphereGeometry args={[prongR * 1.05, 14, 14]} />
                </mesh>
              )}
            </mesh>
          ))}
          <mesh material={gold} position={[0, headY - r * 0.42, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[r * 0.84, 0.024, 10, 56]} />
          </mesh>
          <mesh material={gold} position={[0, headY - r * 0.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[r * 0.5, 0.026, 10, 44]} />
          </mesh>
          <Stone geometry={accentGeo} env={env} position={[0, outerR + 0.022, 0]} chroma={false} />
        </>
      )}
      <Stone geometry={stoneGeo} env={env} position={[0, headY + r * 0.02, 0]} />
    </group>
  );
}

function Eternity({ metal, count, env, onStoneHeight }: { metal: RingConfig["metal"]; count: number; env: THREE.Texture; onStoneHeight: (y: number) => void }) {
  const gold = useMemo(() => metalMaterial(metal), [metal]);
  const innerR = (sizeToInnerDiameterMm("6.5") / 2) * MM;
  const tMm = 1.6;
  const outerR = innerR + tMm * MM;
  const sr = 0.092;
  const bandGeo = useMemo(() => bandGeometry({ innerRadius: innerR, profile: "court", widthMm: 2.6, thicknessMm: tMm, taper: false }), [innerR]);
  const stoneGeo = useMemo(() => brilliantGeometry(sr), []);
  const stones = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const phi = (i / count) * Math.PI * 2 + Math.PI / 2;
        const radial = new THREE.Vector3(Math.cos(phi), Math.sin(phi), 0);
        const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), radial);
        const p = radial.clone().multiplyScalar(outerR + sr * 0.05);
        return { pos: [p.x, p.y, p.z] as [number, number, number], quat: q };
      }),
    [count, outerR],
  );
  useLayoutEffect(() => {
    onStoneHeight(outerR * 2);
  }, [onStoneHeight, outerR]);
  return (
    <group position={[0, outerR + sr * 0.4, 0]}>
      <mesh geometry={bandGeo} material={gold} castShadow />
      {[-1, 1].map((s) => (
        <mesh key={s} material={gold} position={[0, 0, s * (sr + 0.012)]}>
          <torusGeometry args={[outerR + 0.035, 0.016, 10, 120]} />
        </mesh>
      ))}
      {stones.map((s, i) => (
        <Stone key={i} geometry={stoneGeo} env={env} position={s.pos} quaternion={s.quat} chroma={false} />
      ))}
    </group>
  );
}
