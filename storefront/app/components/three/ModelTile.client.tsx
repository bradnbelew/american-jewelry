import { Center, Environment, PresentationControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import * as THREE from "three";

import { STUDIO_HDR, glbUrl } from "~/lib/models";

/**
 * A cast piece on the stone-grey tray. One GLB, the house studio HDRI, a gentle drag.
 * Client-only: imported through ModelTile.tsx after mount.
 */
export function ModelTileScene({ slug, metal = "yellow" }: { slug: string; metal?: "yellow" | "white" | "rose" }) {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 18, 46], fov: 28 }} gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}>
      <color attach="background" args={["#e9e7e2"]} />
      <Suspense fallback={null}>
        <Environment files={STUDIO_HDR} />
        <PresentationControls global snap speed={1.2} polar={[-0.2, 0.5]} azimuth={[-1.2, 1.2]} rotation={[0.25, -0.6, 0]}>
          <Center>
            <Piece slug={slug} metal={metal} />
          </Center>
        </PresentationControls>
      </Suspense>
    </Canvas>
  );
}

const GOLD: Record<"yellow" | "white" | "rose", string> = { yellow: "#f3c56a", white: "#e8e8ea", rose: "#e7a98a" };

function Piece({ slug, metal }: { slug: string; metal: "yellow" | "white" | "rose" }) {
  const { scene } = useGLTF(glbUrl(slug), true);
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
