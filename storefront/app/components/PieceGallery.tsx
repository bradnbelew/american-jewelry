import { useEffect, useRef, useState } from "react";

import type { RingConfig } from "~/lib/builder/model";
import type { PieceModel } from "~/lib/models";

import { IJewelEmbed } from "./IJewelEmbed";
import { PHOTO } from "~/lib/catalog/photos";

import { Pic } from "./Pic";
import { ModelTile } from "./three/ModelTile";
import type { ViewingSpec } from "./three/viewing/pieces";
import { ViewingRoom, useWebGL } from "./three/viewing/Viewing";

/**
 * The gallery: the first photograph large, the rest beneath in pairs.
 * When the piece has a model, the first frame carries the "Turn it in 3D" control:
 * an iJewel embed if one exists, otherwise our own viewer on the cast file.
 * A piece with a stone may instead carry "See it in the light": the viewing room over the page.
 */
export function PieceGallery({
  photos,
  title,
  model,
  metal,
  open3d = false,
  viewing,
  caption,
}: {
  photos: string[];
  title: string;
  caption?: string;
  model?: PieceModel;
  metal?: "yellow" | "white" | "rose";
  open3d?: boolean;
  viewing?: { spec: ViewingSpec; metal?: RingConfig["metal"]; carat?: number };
}) {
  const [first] = photos;
  const [active, setActive] = useState(0);
  const [inLight, setInLight] = useState(false);
  const [zoom, setZoom] = useState(false);
  const zoomDialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (zoom) zoomDialog.current?.showModal();
    else zoomDialog.current?.close();
  }, [zoom]);
  // Under reduced motion or without WebGL the room is never offered: the photograph stays (brief; canon Motion).
  const gl = useWebGL();
  // The first frame: the whole object on the page's own ground (contain), never a tile (22-art-direction §2, §3).
  const poster = <Pic k={first} sizes="(min-width: 1024px) 55vw, 100vw" priority fit={PHOTO[first]?.contain ? "contain" : "cover"} />;
  const frame = PHOTO[first]?.contain ? "relative aspect-square overflow-hidden md:aspect-[4/5]" : "relative aspect-[4/5] overflow-hidden";
  const firstFrame = viewing ? (
    <div className={frame}>
      {poster}
      {gl && (
        <button type="button" className="btn btn-light absolute bottom-4 left-4" onClick={() => setInLight(true)}>
          See it in the light
        </button>
      )}
      {gl && <ViewingRoom spec={viewing.spec} metal={viewing.metal} carat={viewing.carat} title={title} open={inLight} onClose={() => setInLight(false)} />}
    </div>
  ) : model?.embed ? (
    <IJewelEmbed src={model.embed} title={title} poster={poster} />
  ) : model?.glb ? (
    <ModelTile slug={model.glb} title={title} poster={poster} metal={metal} initialOpen={open3d} />
  ) : (
    <div className={frame}>{poster}</div>
  );

  return (
    <div className="piece-gallery flex flex-col gap-4">
      <div className={`piece-gallery-stage ${first.includes("no-00") ? "is-royal" : ""}`}>{active === 0 ? firstFrame : <div className={frame}><Pic k={photos[active]} sizes="(min-width: 1024px) 55vw, 100vw" fit={PHOTO[photos[active]]?.contain ? 'contain' : 'cover'} /></div>}</div>
      {photos.length > 1 && <div className="flex flex-wrap gap-3" role="group" aria-label={`${title} images`}>{photos.map((key, i) => <button key={key} type="button" className="gallery-thumb relative h-16 w-16 overflow-hidden border-2 border-transparent" aria-pressed={active === i} aria-label={`View ${i + 1}: ${PHOTO[key]?.alt ?? title}`} onClick={() => setActive(i)}><Pic k={key} sizes="64px" /></button>)}</div>}
      <p className="label" aria-live="polite">{photos.length > 1 ? `Image ${active + 1} of ${photos.length}. ` : ""}{caption}</p>
      <button type="button" className="link self-start" onClick={() => setZoom(true)}>View photograph</button>
      <dialog ref={zoomDialog} className="photo-dialog" aria-label={`${title} photograph`} onCancel={() => setZoom(false)} onClose={() => setZoom(false)} onKeyDown={(event) => {
        if (event.key === "ArrowRight") setActive((value) => (value + 1) % photos.length);
        if (event.key === "ArrowLeft") setActive((value) => (value + photos.length - 1) % photos.length);
      }}>
        <div className="photo-dialog-top"><span>{title}</span><button type="button" onClick={() => setZoom(false)} autoFocus>Close</button></div>
        <div className={`photo-dialog-image ${first.includes("no-00") ? "is-royal" : ""}`}><Pic k={photos[active]} fit="contain" sizes="100vw" /></div>
        <div className="photo-dialog-bottom">{photos.length > 1 && <button type="button" onClick={() => setActive((value) => (value + photos.length - 1) % photos.length)}>Previous</button>}<span aria-live="polite">{active + 1} / {photos.length}</span>{photos.length > 1 && <button type="button" onClick={() => setActive((value) => (value + 1) % photos.length)}>Next</button>}</div>
      </dialog>
    </div>
  );
}
