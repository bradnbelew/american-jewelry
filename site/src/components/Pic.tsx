import Image from "next/image";
import { PHOTO } from "@/lib/catalog/photos";

/** A photo from the house library, by key. Always `fill` inside a sized, relative parent. */
export function Pic({
  k,
  sizes = "100vw",
  priority = false,
  className = "object-cover",
  position,
}: {
  k: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  position?: string;
}) {
  const p = PHOTO[k] ?? PHOTO["hero-box"];
  return <Image src={p.src} alt={p.alt} fill sizes={sizes} priority={priority} className={className} style={position ? { objectPosition: position } : undefined} />;
}
