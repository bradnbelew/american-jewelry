import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";

/**
 * The "3D" tile for a cast piece. The photograph renders on the server; the viewer mounts
 * only in the browser and only after the visitor asks for it, so it never costs the page its LCP.
 */
const Scene = lazy(() => import("./ModelTile.client").then((m) => ({ default: m.ModelTileScene })));

export function ModelTile({ slug, title, poster, metal }: { slug: string; title: string; poster: ReactNode; metal?: "yellow" | "white" | "rose" }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-stone">
      {open && mounted ? (
        <div className="absolute inset-0" aria-label={`${title}, three-dimensional view. Drag to turn.`} role="img">
          <Suspense fallback={<div className="caps-sm absolute inset-0 flex items-center justify-center text-muted">Preparing the piece</div>}>
            <Scene slug={slug} metal={metal} />
          </Suspense>
        </div>
      ) : (
        poster
      )}
      <button type="button" className={`absolute bottom-4 left-4 ${open ? "btn btn-outline bg-stone" : "btn btn-light"}`} onClick={() => setOpen((v) => !v)}>
        {open ? "Photograph" : "Turn it in 3D"}
      </button>
    </div>
  );
}
