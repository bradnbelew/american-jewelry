import { useMemo } from "react";
import { Form, Link } from "react-router";

import { RingViewer } from "~/components/three/RingViewer";
import { BIRTHSTONES, HAND_LABEL, METAL_LABEL, PROFILE_LABEL, PRONG_LABEL, STONE_STANDARD, leadTimeWeeks, type RingConfig } from "~/lib/builder/model";
import { DESIGN_NOTES } from "~/lib/builder/notes";
import { price, usd } from "~/lib/builder/pricing";

/** A design code, read back: the ring and its facts, with the price withheld when it is a hint. */
export function DesignView({ config: c, code, hint }: { config: RingConfig; code: string; hint: boolean }) {
  const p = useMemo(() => price(c), [c]);
  const note = DESIGN_NOTES[c.setting];
  const rows: [string, string][] = [
    ["Band", `${c.setting === "prism" ? "Faceted" : PROFILE_LABEL[c.profile]}, ${c.width.toFixed(1)} mm${c.taper ? ", tapered" : ""}`],
    ...(c.setting !== "prism" ? [["Head", `${c.prongs} ${PRONG_LABEL[c.prongStyle].toLowerCase()} prongs${c.halo ? ", hidden halo" : ""}`] as [string, string]] : []),
    ...(c.setting === "shooting-star" ? [["Tail", `${c.tail === "long" ? "Five" : "Three"} stones${c.birthstone ? `, ${BIRTHSTONES[c.birthstone - 1].stone}` : ""}`] as [string, string]] : []),
    ["Stone", `${c.carat.toFixed(2)} ct ${STONE_STANDARD[c.origin].short.toLowerCase()}, ${STONE_STANDARD[c.origin].grade}`],
    ["Metal", `${METAL_LABEL[c.metal]}, size ${c.size}`],
    ...(c.engraving ? [["Engraving", `"${c.engraving}", ${HAND_LABEL[c.hand].toLowerCase()}`] as [string, string]] : []),
    ["Lead time", `About ${leadTimeWeeks(c)} weeks`],
  ];
  const encoded = encodeURIComponent(code);
  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <div className="relative aspect-square overflow-hidden bg-paper">
        <RingViewer config={c} view="review" autoRotate className="absolute inset-0" />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="label">{STONE_STANDARD[c.origin].tier}</span>
          <h2 className="font-display text-[1.75rem] leading-snug">{note.name}</h2>
          <p className="font-text text-ink-2">{note.line}</p>
        </div>
        <table className="spec">
          <tbody>
            {rows.map(([k, v]) => (
              <tr key={k}>
                <th scope="row">{k}</th>
                <td className="font-text">{v}</td>
              </tr>
            ))}
            <tr>
              <th scope="row">Code</th>
              <td className="num text-[1rem] tracking-[0.06em]">{code}</td>
            </tr>
            {!hint && (
              <tr>
                <th scope="row">Price</th>
                <td className="num text-[1.5rem]">{usd(p.total)}</td>
              </tr>
            )}
          </tbody>
        </table>
        {!hint && <p className="label">Price before sales tax.</p>}
        <div className="flex flex-col gap-3">
          {hint ? (
            <Link to={`/appointments?build=ring&code=${encoded}`} className="btn">
              See it in the store
            </Link>
          ) : (
            <>
              <Form method="post" action={`/design/${encoded}`}>
                <input type="hidden" name="intent" value="request" />
                <input type="hidden" name="code" value={code} />
                <button type="submit" className="btn w-full">
                  Request this ring
                </button>
              </Form>
              <div className="flex flex-wrap justify-between gap-6">
                <Link to={`/build/ring?code=${encoded}`} className="link inline-flex min-h-11 items-center">
                  Edit design
                </Link>
              </div>
              <Link to={`/design/${encoded}/certificate`} className="link-quiet self-start text-[0.875rem]">
                Certificate
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
