import { IJewelEmbed } from "./IJewelEmbed";
import { Pic } from "./Pic";
import { ModelTile } from "./three/ModelTile";
import type { PieceModel } from "~/lib/models";

/**
 * The gallery: the first photograph large, the rest beneath in pairs.
 * When the piece has a model, the first frame carries the "Turn it in 3D" control:
 * an iJewel embed if one exists, otherwise our own viewer on the cast file.
 */
export function PieceGallery({ photos, title, model, metal }: { photos: string[]; title: string; model?: PieceModel; metal?: "yellow" | "white" | "rose" }) {
  const [first, ...rest] = photos;
  const poster = <Pic k={first} sizes="(min-width: 1024px) 55vw, 100vw" priority />;

  return (
    <div className="flex flex-col gap-3 md:gap-5">
      {model?.embed ? (
        <IJewelEmbed src={model.embed} title={title} poster={poster} />
      ) : model?.glb ? (
        <ModelTile slug={model.glb} title={title} poster={poster} metal={metal} />
      ) : (
        <div className="relative aspect-[4/5] overflow-hidden bg-white">{poster}</div>
      )}
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
