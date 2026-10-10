import { PHOTO } from "~/lib/catalog/photos";

/**
 * A photograph from the house library, by key, filling a sized relative parent.
 * Local stand-ins today; when photography moves to Shopify Files this becomes a CDN srcset.
 */
export function Pic({
  k,
  sizes = "100vw",
  priority = false,
  className = "",
  position,
}: {
  k: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  position?: string;
}) {
  const p = PHOTO[k] ?? PHOTO["hero-box"];
  return (
    <img
      src={p.src}
      alt={p.alt}
      width={p.w}
      height={p.h}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding={priority ? "sync" : "async"}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
