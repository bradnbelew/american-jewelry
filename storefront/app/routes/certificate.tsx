import { Link } from "react-router";

import { Section } from "~/components/Section";
import { certificateNumber, decodeCode } from "~/lib/builder/code";
import { BIRTHSTONES, HAND_LABEL, METAL_LABEL, PROFILE_LABEL, PRONG_LABEL, STONE_STANDARD, leadTimeWeeks, ringName, stoneDiameterMm } from "~/lib/builder/model";
import { DESIGN_NOTES } from "~/lib/builder/notes";
import { metalGrams } from "~/lib/builder/pricing";
import { pageMeta } from "~/lib/seo";

import type { Route } from "./+types/certificate";

export function loader({ params }: Route.LoaderArgs) {
  const code = decodeURIComponent(params.code);
  const config = decodeCode(code);
  if (!config) throw new Response("Not found", { status: 404 });
  return { code, config };
}

export const meta: Route.MetaFunction = ({ data }) =>
  pageMeta({ title: "Certificate of making", description: data ? ringName(data.config) : "A ring in the making", path: `/design/${data?.code ?? ""}/certificate`, noindex: true });

/**
 * The certificate of making, as a preview. The issued one carries the report number, the drawing
 * and the names of the hands. Prints clean: header and footer are hidden by house.css.
 */
export default function CertificatePage({ loaderData }: Route.ComponentProps) {
  const { code, config: c } = loaderData;
  const note = DESIGN_NOTES[c.setting];
  const number = certificateNumber(code);
  const std = STONE_STANDARD[c.origin];

  const rows: [string, string][] = [
    ["Design", `${note.name}, drawn by the house.`],
    ["Band", `${c.setting === "prism" ? "Faceted" : PROFILE_LABEL[c.profile]}, ${c.width.toFixed(1)} mm${c.taper ? ", tapered shank" : ""}.`],
    ...(c.setting !== "prism" ? ([["Head", `${c.prongs} ${PRONG_LABEL[c.prongStyle].toLowerCase()} prongs${c.halo ? ", hidden halo of twelve stones" : ""}.`]] as [string, string][]) : []),
    ...(c.setting === "shooting-star" ? ([["Tail", `${c.tail === "long" ? "Five" : "Three"} graduated stones${c.birthstone ? `, ${BIRTHSTONES[c.birthstone - 1].stone} (${BIRTHSTONES[c.birthstone - 1].name})` : ""}.`]] as [string, string][]) : []),
    ["Center stone", `${c.carat.toFixed(2)} ct round brilliant, ${stoneDiameterMm(c.carat).toFixed(1)} mm, ${std.short.toLowerCase()}.`],
    ["Grade", `${std.grade}.`],
    ["Report", `${std.report}. No. ________`],
    ["Origin", c.origin === "man-made" ? "Lab-grown diamond (laboratory-grown). Growth method and any post-growth treatment are printed on the IGI report. Not mined." : "Natural, mined. Treatment, if any, stated on the report."],
    ["Metal", `${METAL_LABEL[c.metal]}, about ${metalGrams(c).toFixed(1)} g, karat-marked.`],
    ["Size", c.size],
    ...(c.engraving ? ([["Engraving", `"${c.engraving}", ${HAND_LABEL[c.hand].toLowerCase()}.`]] as [string, string][]) : []),
    ["Made", `Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported. About ${leadTimeWeeks(c)} weeks.`],
    ["Care", "Cleaning, prong checks and polishing at either store, for as long as it is yours."],
  ];

  return (
    <Section width="narrow" className="pt-12 pb-24 md:pt-20 print:pt-0 print:pb-0">
      <article className="flex flex-col gap-10 border border-ink p-8 md:p-12 print:border-0 print:p-0">
        <header className="flex flex-col items-center gap-3 text-center">
          <span className="font-display text-[1.25rem] uppercase tracking-[0.26em]">American Jewelry</span>
          <span className="label">Certificate of making</span>
          <h1 className="h-display text-[2rem] md:text-[2.5rem]">{ringName(c)}</h1>
          <span className="num label">No. {number}</span>
        </header>

        <div className="grid items-start gap-10 md:grid-cols-[12rem_1fr]">
          <div className="flex flex-col gap-3">
            <span className="label">The design</span>
            <p className="font-text text-[1.125rem] italic text-ink-2">{note.line}</p>
            <span className="label">The drawing is printed here on the issued certificate.</span>
          </div>
          <table className="spec">
            <tbody>
              {rows.map(([k, v]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td className="font-text">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="hair grid gap-8 pt-8 sm:grid-cols-3">
          {["Designed by", "Set by", "Finished by"].map((k) => (
            <div key={k} className="flex flex-col gap-6">
              <span className="label">{k}</span>
              <span className="h-6 border-b border-ink" />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <span className="num label">Design code {code}</span>
          <span className="label">A preview. Issued with the finished piece, with the report number and the hands that made it.</span>
        </div>
      </article>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <Link to={`/design/${encodeURIComponent(code)}`} className="link">
          The ring
        </Link>
        <span className="label">Use the browser's print command for a copy.</span>
      </div>
    </Section>
  );
}
