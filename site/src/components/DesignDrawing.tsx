import type { SettingKey } from "@/lib/builder/model";

/** The designer's drawing of each setting, as a line sketch. Stands in for the hand drawings until they are scanned. */
export function DesignDrawing({ setting, className = "" }: { setting: SettingKey; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {setting === "signal" && (
        <>
          <path d="M44 122 A56 56 0 1 0 156 122" />
          <path d="M44 122 L52 92 M156 122 L148 92" />
          <path d="M74 96 L68 70 M126 96 L132 70 M88 92 L84 66 M112 92 L116 66" strokeWidth="1.8" />
          <path d="M66 70 L134 70 L100 112 Z" />
          <path d="M76 56 L124 56 L134 70 L66 70 Z" />
          <path d="M76 56 L100 112 M124 56 L100 112 M88 70 L100 56 M112 70 L100 56" strokeWidth="1.2" />
          <path d="M70 160 Q100 150 130 160" strokeWidth="1" strokeDasharray="2 4" />
        </>
      )}
      {setting === "shooting-star" && (
        <>
          <path d="M44 122 A56 56 0 1 0 156 122" />
          <path d="M44 122 L54 92 M156 122 L148 90" />
          <path d="M82 92 L78 68 M118 92 L122 68" strokeWidth="1.8" />
          <path d="M72 68 L128 68 L100 108 Z" />
          <path d="M80 56 L120 56 L128 68 L72 68 Z" />
          <path d="M80 56 L100 108 M120 56 L100 108" strokeWidth="1.2" />
          <polygon points="58,74 61.5,81.5 69.5,82.5 63.5,88 65,96 58,92 51,96 52.5,88 46.5,82.5 54.5,81.5" fill="currentColor" stroke="none" />
          <circle cx="45" cy="106" r="3.2" />
          <circle cx="41" cy="120" r="2.6" />
          <circle cx="41.5" cy="134" r="2" />
        </>
      )}
      {setting === "prism" && (
        <>
          <path d="M46 124 L50 100 L62 80 L80 68 L100 64 L120 68 L138 80 L150 100 L154 124 L150 148 L138 166 L120 178 L100 182 L80 178 L62 166 L50 148 Z" />
          <path d="M56 124 L60 104 L70 88 L84 78 L100 75 L116 78 L130 88 L140 104 L144 124 L140 144 L130 160 L116 170 L100 173 L84 170 L70 160 L60 144 Z" strokeWidth="1.2" />
          <path d="M46 124 L56 124 M50 100 L60 104 M62 80 L70 88 M80 68 L84 78 M120 68 L116 78 M138 80 L130 88 M150 100 L140 104 M154 124 L144 124 M150 148 L140 144 M138 166 L130 160 M120 178 L116 170 M80 178 L84 170 M62 166 L70 160 M50 148 L60 144 M100 64 L100 75 M100 182 L100 173" strokeWidth="1" />
          <path d="M76 52 L124 52 L132 62 L124 70 L76 70 L68 62 Z" />
          <path d="M82 34 L118 34 L124 52 L76 52 Z" />
          <path d="M82 34 L100 70 M118 34 L100 70" strokeWidth="1.2" />
        </>
      )}
    </svg>
  );
}
