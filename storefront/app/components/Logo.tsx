/** The script logotype, traced from the american.jewelry mark. Not re-typeset. */
export function Logo({ tone = "ink", className = "" }: { tone?: "ink" | "paper"; className?: string }) {
  const src = tone === "paper" ? "/photos/logo-white.png" : "/photos/logo.png";
  return <img className={className} src={src} alt="American Jewelry Co." width={1173} height={325} />;
}
