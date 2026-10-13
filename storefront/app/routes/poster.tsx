import { lazy, Suspense, useEffect, useState } from "react";

import { viewingFor } from "~/components/three/viewing/pieces";
import { DEFAULT_CONFIG, normalize, SETTINGS, type SettingKey } from "~/lib/builder/model";

import type { Route } from "./+types/poster";

/**
 * Development only: renders one 3D view full-frame so scripts/posters.mjs can photograph it
 * into public/3d/posters/<name>.webp. /__poster/ring/<setting>, /__poster/cast/<glb slug>, or
 * /__poster/viewing/<piece handle>?w=1600&h=1280&offset=0&lift=0 (scripts/viewing-posters.mjs).
 * Returns 404 outside `vite dev`.
 */
export function loader({ params, request }: Route.LoaderArgs) {
  if (!import.meta.env.DEV) throw new Response("Not found", { status: 404 });
  const q = new URL(request.url).searchParams;
  const num = (k: string, d: number) => (q.has(k) ? Number(q.get(k)) : d);
  return { kind: params.kind, slug: params.slug, w: num("w", 1600), h: num("h", 1280), offset: num("offset", 0), lift: num("lift", 0) };
}

export const meta: Route.MetaFunction = () => [{ title: "Poster" }, { name: "robots", content: "noindex" }];

const Ring = lazy(() => import("~/components/three/ParametricRing.client").then((m) => ({ default: m.ParametricRing })));
const Cast = lazy(() => import("~/components/three/ModelTile.client").then((m) => ({ default: m.ModelTileScene })));
const Viewing = lazy(() => import("~/components/three/viewing/ViewingScene.client").then((m) => ({ default: m.ViewingScene })));

export default function Poster({ loaderData }: Route.ComponentProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const { kind, slug, w, h, offset, lift } = loaderData;
  const spec = kind === "viewing" ? viewingFor(slug) : undefined;
  if (spec) {
    return (
      <div id="poster" className="relative" style={{ width: w, height: h }} data-ready="0">
        <Suspense fallback={null}>
          <Viewing spec={spec} active offset={offset} lift={lift} onFirstFrame={() => document.getElementById("poster")?.setAttribute("data-ready", "1")} />
        </Suspense>
      </div>
    );
  }
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
