import { lazy, Suspense, useEffect, useState } from "react";

import { DEFAULT_CONFIG, normalize, SETTINGS, type SettingKey } from "~/lib/builder/model";

import type { Route } from "./+types/poster";

/**
 * Development only: renders one 3D view full-frame so scripts/posters.mjs can photograph it
 * into public/3d/posters/<name>.webp. /__poster/ring/<setting> or /__poster/cast/<glb slug>.
 * Returns 404 outside `vite dev`.
 */
export function loader({ params }: Route.LoaderArgs) {
  if (!import.meta.env.DEV) throw new Response("Not found", { status: 404 });
  return { kind: params.kind, slug: params.slug };
}

export const meta: Route.MetaFunction = () => [{ title: "Poster" }, { name: "robots", content: "noindex" }];

const Ring = lazy(() => import("~/components/three/ParametricRing.client").then((m) => ({ default: m.ParametricRing })));
const Cast = lazy(() => import("~/components/three/ModelTile.client").then((m) => ({ default: m.ModelTileScene })));

export default function Poster({ loaderData }: Route.ComponentProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const { kind, slug } = loaderData;
  return (
    <div id="poster" className={`relative mx-auto w-[1200px] bg-stone ${kind === "ring" ? "aspect-[5/4]" : "aspect-[4/5]"}`} data-ready="0">
      <Suspense fallback={null}>
        {kind === "ring" ? (
          <Ring
            config={normalize({ ...DEFAULT_CONFIG, setting: (SETTINGS as readonly string[]).includes(slug) ? (slug as SettingKey) : "signal" })}
            view="set"
            interactive={false}
            pointerLight={false}
            progressRef={{ current: 1 }}
            onFirstFrame={() => document.getElementById("poster")?.setAttribute("data-ready", "1")}
            className="absolute inset-0"
          />
        ) : (
          <Cast slug={slug} />
        )}
      </Suspense>
    </div>
  );
}
