import { IJewelEmbed } from "./IJewelEmbed";
import { Pic } from "./Pic";
import { ModelTile } from "./three/ModelTile";
import type { PieceModel } from "~/lib/models";

export type GalleryLayout = "grid" | "stack" | "stage";

/**
 * The gallery. `grid` (current): the first photograph large, the rest beneath in pairs.
 * `stack` (exploration c2): one frame per view, full width, in order. `stage` (exploration c1):
 * the first frame wide at 4:3 as the object on its ground, the rest stacked beneath.
 * When the piece has a model, the first frame carries the "Turn it in 3D" control:
 * an iJewel embed if one exists, otherwise our own viewer on the cast file.
 */
export function PieceGallery({ photos, title, model, metal, open3d = false, layout = "grid" }: { photos: string[]; title: string; model?: PieceModel; metal?: "yellow" | "white" | "rose"; open3d?: boolean; layout?: GalleryLayout }) {
  const [first, ...rest] = photos;
  const wide = layout === "stage";
  const poster = <Pic k={first} sizes={wide ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 55vw, 100vw"} priority position={wide ? "50% 50%" : undefined} />;
  const firstFrame = model?.embed ? (
    <IJewelEmbed src={model.embed} title={title} poster={poster} />
  ) : model?.glb ? (
    <ModelTile slug={model.glb} title={title} poster={poster} metal={metal} initialOpen={open3d} />
  ) : (
    <div className={`relative overflow-hidden bg-white ${wide ? "aspect-[4/5] md:aspect-[4/3]" : "aspect-[4/5]"}`}>{poster}</div>
  );

  if (layout === "grid") {
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

  return (
    <div className={`flex flex-col ${wide ? "gap-5 md:gap-8" : "gap-3 md:gap-5"}`}>
      <div className={wide ? "[&>div]:md:aspect-[4/3]" : ""}>{firstFrame}</div>
      {rest.map((k) => (
        <div key={k} className={`relative overflow-hidden bg-white ${wide ? "aspect-[4/5] md:aspect-[4/3]" : "aspect-[4/5]"}`}>
          <Pic k={k} sizes={wide ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 55vw, 100vw"} />
        </div>
      ))}
    </div>
  );
}
