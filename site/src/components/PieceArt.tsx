import type { ArtKey } from "@/lib/catalog/types";

/**
 * Line illustrations standing in for photography. One drawing per piece type, drawn on a 200×200 grid,
 * one stroke weight. Replace with product photography and 3D renders when they exist.
 */
export function PieceArt({ art, className = "", tone = "navy" }: { art: ArtKey; className?: string; tone?: "navy" | "gilt" }) {
  const color = tone === "gilt" ? "var(--gilt)" : "var(--navy)";
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {ART[art]}
    </svg>
  );
}

const stone = (cx: number, cy: number, r: number) => (
  <g key={`${cx}-${cy}`}>
    <polygon points={`${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`} />
    <path d={`M${cx - r},${cy} L${cx + r},${cy} M${cx},${cy - r} L${cx},${cy + r}`} strokeWidth="1.5" />
  </g>
);

const ART: Record<ArtKey, React.ReactNode> = {
  ring: (
    <>
      <ellipse cx="100" cy="118" rx="58" ry="58" />
      <ellipse cx="100" cy="118" rx="46" ry="46" />
      <polygon points="100,36 118,52 100,68 82,52" />
      <path d="M82,52 L118,52 M100,36 L100,68" strokeWidth="1.5" />
      <path d="M78,62 L84,72 M122,62 L116,72" />
    </>
  ),
  band: (
    <>
      <ellipse cx="100" cy="100" rx="62" ry="62" />
      <ellipse cx="100" cy="100" rx="48" ry="48" />
      <path d="M62,86 L48,96 M138,86 L152,96 M62,114 L48,104 M138,114 L152,104" strokeWidth="1.5" />
    </>
  ),
  pendant: (
    <>
      <path d="M40,20 C60,60 80,80 100,86 C120,80 140,60 160,20" />
      <circle cx="100" cy="92" r="5" />
      <polygon points="100,108 128,136 100,164 72,136" />
      <path d="M72,136 L128,136 M100,108 L100,164 M86,122 L114,150 M114,122 L86,150" strokeWidth="1.5" />
    </>
  ),
  necklace: (
    <>
      <path d="M24,30 C40,90 70,120 100,126 C130,120 160,90 176,30" />
      {stone(100, 136, 10)}
      {stone(74, 120, 7)}
      {stone(126, 120, 7)}
      {stone(52, 96, 5)}
      {stone(148, 96, 5)}
    </>
  ),
  bracelet: (
    <>
      <ellipse cx="100" cy="100" rx="70" ry="52" />
      <ellipse cx="100" cy="100" rx="56" ry="40" />
      {stone(100, 48, 7)}
      {stone(60, 60, 5)}
      {stone(140, 60, 5)}
    </>
  ),
  signet: (
    <>
      <ellipse cx="100" cy="122" rx="52" ry="52" />
      <ellipse cx="100" cy="122" rx="40" ry="40" />
      <ellipse cx="100" cy="62" rx="34" ry="26" />
      <ellipse cx="100" cy="62" rx="26" ry="19" strokeWidth="1.5" />
      <path d="M68,72 L62,84 M132,72 L138,84" />
    </>
  ),
  "dog-tag": (
    <>
      <path d="M50,20 C70,50 130,50 150,20" />
      <rect x="62" y="60" width="76" height="116" rx="14" />
      <circle cx="100" cy="74" r="4" />
      <polygon points="100,98 112,110 100,122 88,110" />
      <path d="M84,140 L116,140 M84,152 L116,152" strokeWidth="1.5" />
    </>
  ),
  studs: (
    <>
      {stone(62, 100, 22)}
      {stone(138, 100, 22)}
      <path d="M62,122 L62,150 M138,122 L138,150" />
    </>
  ),
  solitaire: (
    <>
      <ellipse cx="100" cy="124" rx="54" ry="54" />
      <ellipse cx="100" cy="124" rx="44" ry="44" />
      <path d="M70,52 L130,52 L100,88 Z" />
      <path d="M78,36 L122,36 L130,52 L70,52 Z" />
      <path d="M78,36 L100,88 M122,36 L100,88 M88,52 L100,36 M112,52 L100,36" strokeWidth="1.5" />
      <path d="M70,52 L62,80 M130,52 L138,80" />
    </>
  ),
  tennis: (
    <>
      <path d="M20,100 L180,100" strokeWidth="1.5" />
      {[28, 52, 76, 100, 124, 148, 172].map((x) => stone(x, 100, 11))}
    </>
  ),
  chain: (
    <>
      {[30, 65, 100, 135, 170].map((x, i) => (
        <polygon key={x} points={`${x},80 ${x + 16},100 ${x},120 ${x - 16},100`} transform={i % 2 ? "" : "translate(0,0)"} />
      ))}
    </>
  ),
};
