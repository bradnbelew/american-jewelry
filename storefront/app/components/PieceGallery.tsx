import { useState } from "react";

import type { RingConfig } from "~/lib/builder/model";
import type { PieceModel } from "~/lib/models";

import { IJewelEmbed } from "./IJewelEmbed";
import { Pic } from "./Pic";
import { ModelTile } from "./three/ModelTile";
import type { ViewingSpec } from "./three/viewing/pieces";
import { ViewingRoom } from "./three/viewing/Viewing";

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
  viewing?: { spec: ViewingSpec; metal?: RingConfig["metal"] };
}) {
  const [first, ...rest] = photos;
  const [inLight, setInLight] = useState(false);
  const poster = <Pic k={first} sizes="(min-width: 1024px) 55vw, 100vw" priority />;
  const firstFrame = viewing ? (
    <div className="relative aspect-[4/5] overflow-hidden bg-white">
      {poster}
      <button type="button" className="btn btn-light absolute bottom-4 left-4" onClick={() => setInLight(true)}>
        See it in the light
      </button>
      <ViewingRoom spec={viewing.spec} metal={viewing.metal} title={title} open={inLight} onClose={() => setInLight(false)} />
    </div>
  ) : model?.embed ? (
    <IJewelEmbed src={model.embed} title={title} poster={poster} />
  ) : model?.glb ? (
    <ModelTile slug={model.glb} title={title} poster={poster} metal={metal} initialOpen={open3d} />
  ) : (
    <div className="relative aspect-[4/5] overflow-hidden bg-white">{poster}</div>
  );

  return (
    <div className="flex flex-col gap-3 md:gap-5">
      {firstFrame}
      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-3 md:gap-5">
          {rest.map((k) => (
            <div key={k} className="relative aspect-[4/5] overflow-hidden bg-white">
              <Pic k={k} sizes="(min-width: 1024px) 27vw, 50vw" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
