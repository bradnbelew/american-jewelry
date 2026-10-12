import { ModelTile } from "./ModelTile";

/**
 * A cast file from the bench, rendered, with its caption. Stands in the bench slot on the
 * home page until the 12-second bench loop is shot (docs/briefs/PHOTOS-TODO.md). The frame is
 * sized for the video that will replace it, and the render opens into the 3D view on request.
 */
export function CastPoster({ slug, caption, interactive = true }: { slug: string; caption: string; interactive?: boolean }) {
  const poster = <img src={`/3d/posters/${slug}.webp`} alt={caption} width={1200} height={1500} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />;
  return (
    <figure className="flex flex-col gap-3">
      {interactive ? <ModelTile slug={slug} title={caption} poster={poster} /> : <div className="relative aspect-[4/5] overflow-hidden bg-stone">{poster}</div>}
      <figcaption className="label">{caption}</figcaption>
    </figure>
  );
}
