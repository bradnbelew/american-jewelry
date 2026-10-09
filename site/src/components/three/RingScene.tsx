"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, Float, OrbitControls } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

/**
 * Procedural ring built from primitives so the site has a live 3D piece before any CAD exports exist.
 * Later: swap <ProceduralRing> for a <Gltf> loaded from the designer's Matrix Gold exports.
 */

export type MetalKey = "14k-yellow" | "14k-white" | "14k-rose" | "18k-yellow" | "platinum";
export type SettingKey = "signal" | "shooting-star" | "prism";

const METAL_COLOR: Record<MetalKey, string> = {
  "14k-yellow": "#d6b25e",
  "18k-yellow": "#dcb04c",
  "14k-rose": "#d9a083",
  "14k-white": "#e3e4e6",
  platinum: "#dadcdf",
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
      <Canvas dpr={[1, 2]} camera={{ position: [0, 1.4, 4.2], fov: 32 }} gl={{ antialias: true }}>
        <color attach="background" args={["#f6f2ea"]} />
        <ambientLight intensity={0.25} />
        <directionalLight position={[3, 5, 4]} intensity={1.4} />
        <directionalLight position={[-4, 2, -3]} intensity={0.6} />
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
          <ProceduralRing metal={metal} setting={setting} carat={carat} stoneTint={stoneTint} />
        </Float>
        <ContactShadows position={[0, -1.25, 0]} opacity={0.35} scale={6} blur={2.4} far={2} />
        <Environment preset="studio" />
        <OrbitControls enablePan={false} minDistance={2.8} maxDistance={6} autoRotate={autoRotate} autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}

function ProceduralRing({ metal, setting, carat, stoneTint }: Omit<RingSceneProps, "className" | "autoRotate">) {
  const gold = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: METAL_COLOR[metal], metalness: 1, roughness: 0.22, clearcoat: 0.6, clearcoatRoughness: 0.2 }),
    [metal],
  );
  const stoneColor = { white: "#ffffff", blue: "#9fc5ff", green: "#9fe0c1", red: "#f0a0a8" }[stoneTint ?? "white"];
  const diamond = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: stoneColor,
        metalness: 0,
        roughness: 0.02,
        transmission: 0.96,
        ior: 2.4,
        thickness: 0.6,
        clearcoat: 1,
        envMapIntensity: 2.2,
      }),
    [stoneColor],
  );

  // Stone radius from carat (round brilliant ≈ 6.5 mm at 1 ct; ring inner diameter ≈ 17 mm → scene units)
  const r = (6.5 * Math.cbrt(carat)) / 17 / 2 + 0.03;
  const bandR = 1;
  const tube = setting === "prism" ? 0.085 : 0.065;
  const headY = bandR + r * 0.55;

  return (
    <group position={[0, -0.15, 0]}>
      {/* band */}
      <mesh material={gold} rotation={[0, 0, 0]}>
        {setting === "prism" ? <torusGeometry args={[bandR, tube, 4, 96]} /> : <torusGeometry args={[bandR, tube, 24, 96]} />}
      </mesh>

      {/* head */}
      {setting === "signal" && (
        <group position={[0, headY, 0]}>
          {[45, 135, 225, 315].map((deg) => {
            const a = (deg * Math.PI) / 180;
            return (
              <mesh key={deg} material={gold} position={[Math.cos(a) * r * 0.78, 0, Math.sin(a) * r * 0.78]} rotation={[0.18 * Math.sin(a), 0, -0.18 * Math.cos(a)]}>
                <cylinderGeometry args={[0.022, 0.03, r * 1.5, 12]} />
              </mesh>
            );
          })}
          <mesh material={gold} position={[0, -r * 0.55, 0]}>
            <torusGeometry args={[r * 0.72, 0.022, 10, 40]} />
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
              <sphereGeometry args={[r * (0.28 - i * 0.05), 16, 16]} />
            </mesh>
          ))}
        </group>
      )}
      {setting === "prism" && (
        <mesh material={gold} position={[0, headY - r * 0.3, 0]}>
          <cylinderGeometry args={[r * 1.15, r * 0.9, r * 0.7, 6]} />
        </mesh>
      )}

      {/* stone: a crown (cone) on a pavilion (inverted cone) */}
      <group position={[0, headY + r * 0.1, 0]}>
        <mesh material={diamond} position={[0, r * 0.25, 0]}>
          <cylinderGeometry args={[r * 0.55, r, r * 0.5, 8]} />
        </mesh>
        <mesh material={diamond} position={[0, -r * 0.35, 0]}>
          <coneGeometry args={[r, r * 0.9, 8]} />
          {/* the pavilion points down */}
        </mesh>
      </group>
    </group>
  );
}
