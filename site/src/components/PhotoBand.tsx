import { Pic } from "./Pic";

/** Full-width photograph under a page title. */
export function PhotoBand({ k, position, className = "" }: { k: string; position?: string; className?: string }) {
  return (
    <div className={`relative aspect-[4/3] md:aspect-[2.4/1] overflow-hidden bg-ivory ${className}`}>
      <Pic k={k} sizes="100vw" position={position} />
    </div>
  );
}
