import { lazy, Suspense, useEffect, useRef, useState } from "react";

import type { RingConfig } from "~/lib/builder/model";

/**
 * The paper frame for "the stone is set". The poster is in the server HTML (it is the LCP
 * candidate and the whole experience under reduced motion or without WebGL); the scene
 * mounts behind it after hydration and the poster fades out after the first rendered frame.
 * The frame is 4:5 on phone and 5:4 on desktop, never full-bleed, and is the element that pins.
 */
const Scene = lazy(() => import("./StoneIsSet.client").then((m) => ({ default: m.StoneIsSetScene })));

export function StoneIsSet({ config, poster, alt }: { config: RingConfig; poster: string; alt: string }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"poster" | "scene">("poster");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const probe = document.createElement("canvas");
    const gl = probe.getContext("webgl2") ?? probe.getContext("webgl");
    if (!gl) return;
    setMode("scene");
  }, []);

  return (
    <div ref={pinRef} className="flex items-center justify-center md:min-h-[calc(100svh-5rem)]">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone md:aspect-[5/4] md:h-[calc(100svh-7rem)] md:w-auto md:max-w-full" aria-label="The stone is set: the house ring assembling" role="img">
        {mode === "scene" && (
          <Suspense fallback={null}>
            <Scene config={config} pinRef={pinRef} onFirstFrame={() => setReady(true)} />
          </Suspense>
        )}
        <img
          src={poster}
          alt={alt}
          width={1200}
          height={960}
          fetchPriority="high"
          decoding="sync"
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-[var(--ease-house)] ${ready ? "opacity-0" : "opacity-100"}`}
        />
      </div>
    </div>
  );
}
