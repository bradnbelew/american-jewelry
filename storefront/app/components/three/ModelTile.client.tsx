import { Bounds, Center, Environment, PresentationControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { STUDIO_HDR, glbUrl } from "~/lib/models";

/**
 * A cast piece on the stone-grey tray. One GLB, the house studio HDRI, a gentle drag,
 * and a key light that follows the pointer (off on touch and under reduced motion).
 * Client-only: imported through ModelTile.tsx after mount.
 */
export function ModelTileScene({ slug, metal = "yellow" }: { slug: string; metal?: "yellow" | "white" | "rose" }) {
  const pointer = useRef(new THREE.Vector2(0, 0));
  const pointerOn = useRef(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(prefersReduced);
    pointerOn.current = !window.matchMedia("(pointer: coarse)").matches && !prefersReduced;
  }, []);
  return (
    <div
      className="absolute inset-0"
      onPointerMove={(e) => {
        if (!pointerOn.current) return;
        const r = e.currentTarget.getBoundingClientRect();
        pointer.current.set(((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1));
      }}
      onPointerLeave={() => pointer.current.set(0, 0)}
    >
      <Canvas dpr={[1, 2]} camera={{ position: [0, 18, 46], fov: 28 }} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
        <color attach="background" args={["#f6f5f2"]} />
        <KeyLight pointer={pointer} />
        <Suspense fallback={null}>
          <Environment files={STUDIO_HDR} />
          <PresentationControls global snap={!reduced} speed={1.2} polar={[-0.2, 0.5]} azimuth={[-1.2, 1.2]} rotation={[0.25, -0.6, 0]}>
            <Bounds fit clip observe margin={1.15}>
              <Center>
                <Piece slug={slug} metal={metal} />
              </Center>
            </Bounds>
          </PresentationControls>
        </Suspense>
      </Canvas>
    </div>
  );
}

function KeyLight({ pointer }: { pointer: React.RefObject<THREE.Vector2> }) {
  const light = useRef<THREE.DirectionalLight>(null);
  useFrame((_, dt) => {
    if (!light.current) return;
    const k = 1 - Math.pow(0.002, dt);
    const p = pointer.current;
    light.current.position.x += (20 + 18 * p.x - light.current.position.x) * k;
    light.current.position.y += (40 + 12 * p.y - light.current.position.y) * k;
  });
  return <directionalLight ref={light} position={[20, 40, 30]} intensity={1.2} />;
}

const GOLD: Record<"yellow" | "white" | "rose", string> = { yellow: "#f3c56a", white: "#e8e8ea", rose: "#e7a98a" };

function Piece({ slug, metal }: { slug: string; metal: "yellow" | "white" | "rose" }) {
  const { scene } = useGLTF(glbUrl(slug), "/3d/draco/");
  useEffect(() => {
    scene.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        const m = o as THREE.Mesh;
        m.material = new THREE.MeshPhysicalMaterial({ color: GOLD[metal], metalness: 1, roughness: 0.14, clearcoat: 0.2, clearcoatRoughness: 0.2 });
        m.castShadow = true;
      }
    });
  }, [scene, metal]);
  // Cast files come in millimeters; the camera is set for a ring about 25 mm across.
  return <primitive object={scene} />;
}
