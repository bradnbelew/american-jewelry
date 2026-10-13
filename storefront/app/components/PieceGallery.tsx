import { useState } from "react";

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
}: {
  photos: string[];
  title: string;
  model?: PieceModel;
  metal?: "yellow" | "white" | "rose";
  open3d?: boolean;
  viewing?: { spec: ViewingSpec; metal?: RingConfig["metal"]; carat?: number };
}) {
  const [first, ...rest] = photos;
  const [inLight, setInLight] = useState(false);
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
    <div className="flex flex-col gap-4 md:gap-6">
      {firstFrame}
      {/* The second frame shows scale (the hand) across the whole column; the rest follow in pairs. */}
      {rest.length > 0 && (
        <div className="relative aspect-[4/5] overflow-hidden md:aspect-[4/3]">
          <Pic k={rest[0]} sizes="(min-width: 1024px) 55vw, 100vw" position="55% 45%" />
        </div>
      )}
      {rest.length > 1 && (
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {rest.slice(1).map((k, i, all) => {
            const alone = all.length % 2 === 1 && i === all.length - 1;
            return (
              <div key={k} className={`relative overflow-hidden ${alone ? "col-span-2 aspect-[4/5] md:aspect-[4/3]" : "aspect-[4/5]"}`}>
                <Pic k={k} sizes={alone ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 27vw, 50vw"} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
