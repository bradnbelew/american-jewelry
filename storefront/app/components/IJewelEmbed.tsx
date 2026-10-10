import { useState, type ReactNode } from "react";

/**
 * The "3D" tile on a product page. iJewel's documented Shopify integration is an
 * iframe whose src is the embed URL stored in the product metafield
 * `custom.model_source_embed`. The iframe is a facade: the photograph renders on
 * the server, the viewer loads only when asked, so the page's LCP is never the viewer.
 *
 * Free plan shows iJewel's attribution inside the frame; the Professional plan removes it.
 */
export function IJewelEmbed({ src, title, poster }: { src: string | null | undefined; title: string; poster: ReactNode }) {
  const [open, setOpen] = useState(false);
  if (!src) return <>{poster}</>;

  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-stone">
      {open ? (
        <iframe
          src={src}
          title={`${title}, interactive 3D view`}
          loading="lazy"
          allow="autoplay; fullscreen; xr-spatial-tracking; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <>
          {poster}
          <button type="button" className="btn btn-light absolute bottom-4 left-4" onClick={() => setOpen(true)}>
            Turn it in 3D
          </button>
        </>
      )}
      {open ? (
        <button type="button" className="btn btn-light absolute bottom-4 left-4" onClick={() => setOpen(false)}>
          Photograph
        </button>
      ) : null}
    </div>
  );
}
