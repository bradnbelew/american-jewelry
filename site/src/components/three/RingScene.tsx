"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Lightformer, OrbitControls } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

/**
 * Procedural ring built from primitives so the site has a live 3D piece before any CAD exports exist.
 * Later: swap <ProceduralRing> for a <Gltf> loaded from the designer's Matrix Gold exports.
 * The environment is built from light panels (no network fetch) so metal and stone have something to reflect.
 */

export type MetalKey = "14k-yellow" | "14k-white" | "14k-rose" | "18k-yellow" | "platinum";
export type SettingKey = "signal" | "shooting-star" | "prism";

const METAL_COLOR: Record<MetalKey, string> = {
  "14k-yellow": "#d4b060",
  "18k-yellow": "#d9ad4a",
  "14k-rose": "#d79f84",
  "14k-white": "#e6e7e9",
  platinum: "#dcdee1",
};

export interface RingSceneProps {
  metal: MetalKey;
  setting: SettingKey;
  carat: number; // 0.5 – 3
  stoneTint?: "white" | "blue" | "green" | "red";
  className?: string;
  autoRotate?: boolean;
}

export function RingScene({ metal, setting, carat, stoneTint = "white", className = "", autoRotate = true }: RingSceneProps) {
  return (
    <div className={className}>
      <Canvas dpr={[1, 2]} camera={{ position: [0, 1.3, 5.8], fov: 28 }} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
        <color attach="background" args={["#f7f5f0"]} />
        <ambientLight intensity={0.15} />
        <directionalLight position={[3, 6, 4]} intensity={1.2} />
        <Float speed={1} rotationIntensity={0.12} floatIntensity={0.2}>
          <ProceduralRing metal={metal} setting={setting} carat={carat} stoneTint={stoneTint} />
        </Float>
        <ContactShadows position={[0, -1.3, 0]} opacity={0.3} scale={6} blur={2.6} far={2} />
        <Environment resolution={256}>
          <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, 0]} scale={[10, 10, 1]} />
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, 0]} scale={[8, 3, 1]} />
          <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[5, 1, 0]} scale={[8, 3, 1]} />
          <Lightformer intensity={1.2} position={[0, 1, -6]} scale={[10, 4, 1]} color="#fff4e0" />
          <Lightformer intensity={0.8} position={[0, -1, 6]} scale={[10, 2, 1]} />
        </Environment>
        <OrbitControls enablePan={false} target={[0, 0.25, 0]} minDistance={4} maxDistance={8} autoRotate={autoRotate} autoRotateSpeed={0.7} />
      </Canvas>
    </div>
  );
}

function ProceduralRing({ metal, setting, carat, stoneTint }: Omit<RingSceneProps, "className" | "autoRotate">) {
  const gold = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: METAL_COLOR[metal], metalness: 1, roughness: 0.18, clearcoat: 0.4, clearcoatRoughness: 0.15, envMapIntensity: 1.4 }),
    [metal],
  );
  const stoneColor = { white: "#ffffff", blue: "#b9d3ff", green: "#b8ecd3", red: "#f3b2b8" }[stoneTint ?? "white"];
  const diamond = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: stoneColor,
        metalness: 0,
        roughness: 0,
        transmission: 1,
        ior: 2.42,
        thickness: 0.35,
        specularIntensity: 1,
        clearcoat: 1,
        envMapIntensity: 2.5,
        flatShading: true,
      }),
    [stoneColor],
  );

  // Stone radius from carat (round brilliant ≈ 6.5 mm at 1 ct; ring inner diameter ≈ 17 mm → scene units)
  const r = (6.5 * Math.cbrt(carat)) / 17 / 2 + 0.03;
  const bandR = 1;
  const tube = setting === "prism" ? 0.09 : 0.07;
  const headY = bandR + r * 0.6;
  const seg = 16;

  return (
    <group position={[0, -0.15, 0]}>
      {/* band */}
      <mesh material={gold}>
        {setting === "prism" ? <torusGeometry args={[bandR, tube, 4, 128]} /> : <torusGeometry args={[bandR, tube, 32, 128]} />}
      </mesh>

      {/* head */}
      {setting === "signal" && (
        <group position={[0, headY, 0]}>
          {[45, 135, 225, 315].map((deg) => {
            const a = (deg * Math.PI) / 180;
            return (
              <mesh key={deg} material={gold} position={[Math.cos(a) * r * 0.8, 0, Math.sin(a) * r * 0.8]} rotation={[0.16 * Math.sin(a), 0, -0.16 * Math.cos(a)]}>
                <cylinderGeometry args={[0.024, 0.034, r * 1.5, 16]} />
              </mesh>
            );
          })}
          <mesh material={gold} position={[0, -r * 0.5, 0]}>
            <torusGeometry args={[r * 0.74, 0.026, 12, 48]} />
          </mesh>
          <mesh material={gold} position={[0, -r * 0.95, 0]}>
            <torusGeometry args={[r * 0.5, 0.026, 12, 48]} />
          </mesh>
        </group>
      )}
      {setting === "shooting-star" && (
        <group position={[0, headY - r * 0.2, 0]}>
          <mesh material={gold} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[r * 1.05, r * 1.05, r * 0.45, 5]} />
          </mesh>
          {[0, 1, 2].map((i) => (
            <mesh key={i} material={gold} position={[-(i + 1) * r * 0.75, -r * 0.1 - i * 0.05, 0]}>
              <sphereGeometry args={[r * (0.28 - i * 0.05), 24, 24]} />
            </mesh>
          ))}
        </group>
      )}
      {setting === "prism" && (
        <mesh material={gold} position={[0, headY - r * 0.3, 0]}>
          <cylinderGeometry args={[r * 1.15, r * 0.9, r * 0.7, 6]} />
        </mesh>
      )}

      {/* stone: table + crown + pavilion, flat-shaded so facets read */}
      <group position={[0, headY + r * 0.1, 0]}>
        <mesh material={diamond} position={[0, r * 0.3, 0]}>
          <cylinderGeometry args={[r * 0.55, r, r * 0.42, seg, 1]} />
        </mesh>
        <mesh material={diamond} position={[0, r * 0.09, 0]}>
          <cylinderGeometry args={[r, r, r * 0.06, seg, 1]} />
        </mesh>
        <mesh material={diamond} position={[0, -r * 0.4, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[r, r * 0.92, seg, 1]} />
        </mesh>
      </group>
    </group>
  );
}
