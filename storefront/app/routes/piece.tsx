import { useState } from "react";
import { Link } from "react-router";

import { PieceConfigurator, metalTone } from "~/components/PieceConfigurator";
import { PieceGallery } from "~/components/PieceGallery";
import { ProductTile } from "~/components/ProductTile";
import { Section } from "~/components/Section";
import { STORES, designBySlug, pieceByHandle, pieceRef, piecesForDesign, tierBySlug } from "~/lib/catalog/data";
import { PIECE_PHOTOS } from "~/lib/catalog/photos";
import type { Metal, Piece } from "~/lib/catalog/types";
import { METAL_LABEL, PIECE_TYPE_LABEL } from "~/lib/catalog/types";
import { modelFor } from "~/lib/models";
import { breadcrumbJsonLd, pageMeta, productJsonLd } from "~/lib/seo";

import type { Route } from "./+types/piece";

export function loader({ params }: Route.LoaderArgs) {
  const piece = pieceByHandle(params.handle);
  if (!piece) throw new Response("Not found", { status: 404 });
  return { handle: piece.handle };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const p = pieceByHandle(data?.handle ?? "")!;
  const tier = tierBySlug(p.tier);
  const design = designBySlug(p.design);
  const manMade = p.versions.some((v) => v.origin === "man-made");
  return pageMeta(
    { title: manMade ? `${p.name}, man-made diamond` : p.name, description: p.description, path: `/pieces/${p.handle}`, image: (PIECE_PHOTOS[p.handle] ?? ["hero-box"])[0] },
    [
      productJsonLd(p, design),
      breadcrumbJsonLd([{ name: tier.name, href: `/${tier.slug}` }, ...(design ? [{ name: design.name, href: `/designs/${design.slug}` }] : []), { name: p.name, href: `/pieces/${p.handle}` }]),
    ],
  );
};

/** One sentence that says what the piece is made of, the material words carried in ink. */
function madeOf(p: Piece): { text: string; key?: boolean }[] {
  const metals = Array.from(new Set(p.metals.map((m) => METAL_LABEL[m].replace(/1[48]k /, "").toLowerCase())));
  const metalText = metals.length === 1 ? METAL_LABEL[p.metals[0]] : metals.length === 2 ? `${metals[0]} or ${metals[1]}` : `${metals.slice(0, -1).join(", ")} or ${metals[metals.length - 1]}`;
  const manMade = p.versions.some((v) => v.origin === "man-made");
  const natural = p.versions.some((v) => v.key === "diamond" && v.origin === "natural");
  const gem = p.versions.some((v) => v.key === "gemstone");
  const single = p.pieceType === "solitaire" || p.pieceType === "signet";
  const stone = p.oneOfOne
    ? (p.versions[0].stones ?? "").toLowerCase()
    : manMade
      ? single ? "one man-made diamond" : "man-made diamonds"
      : natural && gem
        ? "a birthstone or natural diamonds"
        : natural
          ? single ? "a natural diamond" : "natural diamonds"
          : "";
  const type = PIECE_TYPE_LABEL[p.pieceType].toLowerCase();
  const parts: { text: string; key?: boolean }[] = [{ text: `${/^[aeiou]/.test(type) ? "An" : "A"} ${type} in ` }, { text: metalText, key: true }];
  if (stone) parts.push({ text: ", set with " }, { text: stone, key: true });
  parts.push({ text: ", finished at our bench." });
  return parts;
}

export default function PiecePage({ loaderData }: Route.ComponentProps) {
  const piece = pieceByHandle(loaderData.handle)!;
  const tier = tierBySlug(piece.tier);
  const design = designBySlug(piece.design);
  const siblings = piecesForDesign(piece.design).filter((p) => p.handle !== piece.handle).slice(0, 4);
  const royal = piece.tier === "royal-american";
  const manMade = piece.versions.some((v) => v.origin === "man-made");
  const salon = STORES[0];
  const [metal, setMetal] = useState<Metal>(piece.metals[0]);

  return (
    <>
      <Section className="pt-6 md:pt-8">
        <nav className="label flex flex-wrap gap-x-2" aria-label="Breadcrumb">
          <Link to={`/${tier.slug}`} className="hover:text-ink">
            {tier.name}
          </Link>
          {design && (
            <>
              <span aria-hidden>/</span>
              <Link to={`/designs/${design.slug}`} className="hover:text-ink">
                {design.name}
              </Link>
            </>
          )}
        </nav>
      </Section>

      <Section className="pt-6 md:pt-8">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <PieceGallery photos={PIECE_PHOTOS[piece.handle] ?? ["hero-box"]} title={piece.name} model={royal ? undefined : modelFor(piece.handle)} metal={metalTone(metal)} />
          </div>

          <div className="flex flex-col gap-8 lg:sticky lg:top-32 lg:col-span-5">
            <div className="flex flex-col gap-3">
              <h1 className="h-section text-[2.25rem] md:text-[2.75rem]">{royal ? piece.name.replace(/^No\. \d+ · /, "") : piece.name}</h1>
              <p className="label">
                Ref. {pieceRef(piece)}
                {royal ? `, Royal American No. ${piece.oneOfOne?.number}` : `, ${tier.name}`}
              </p>
              <p className="font-text text-[1.0625rem] text-ink-2">{piece.description}</p>
            </div>

            <PieceConfigurator piece={piece} onMetal={setMetal} />

            <table className="spec">
              <tbody>
                {piece.specs.map((s) => (
                  <tr key={s.label}>
                    <th scope="row">{s.label}</th>
                    <td className="font-text">{s.value}</td>
                  </tr>
                ))}
                <tr>
                  <th scope="row">Made</th>
                  <td className="font-text">Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported.</td>
                </tr>
              </tbody>
            </table>

            <div>
              <details className="acc border-b border-hair">
                <summary>{manMade ? "The stone and its report" : "The stones"}</summary>
                <div className="font-text flex flex-col gap-3 pb-5 text-[0.9375rem] text-ink-2">
                  {manMade ? (
                    <>
                      <p>D to F color, VVS1 or VVS2, Ideal cut, grown by chemical vapor deposition and sold as grown. Not mined.</p>
                      <p>
                        Stones from 0.30 ct carry an IGI report, laser inscribed on the girdle, verifiable at{" "}
                        <a href="https://www.igi.org/verify-your-report/" className="link-quiet" target="_blank" rel="noreferrer">
                          igi.org
                        </a>
                        .
                      </p>
                    </>
                  ) : (
                    <>
                      <p>Natural diamonds are F to G color, VS1, Excellent cut. Center stones carry a GIA report; any treatment is disclosed before purchase.</p>
                      <p>Birthstone versions take one natural gemstone of your choosing. We will tell you which stones suit daily wear.</p>
                    </>
                  )}
                </div>
              </details>
              <details className="acc border-b border-hair">
                <summary>Care and warranty</summary>
                <p className="font-text pb-5 text-[0.9375rem] text-ink-2">
                  Cleaning and inspection, free, for life, at either store. Defects in materials and workmanship covered for the original owner. The center stone is insured separately. Terms on the{" "}
                  <Link to="/policies#warranty" className="link-quiet">
                    policies page
                  </Link>
                  .
                </p>
              </details>
              <details className="acc border-b border-hair">
                <summary>Delivery and returns</summary>
                <p className="font-text pb-5 text-[0.9375rem] text-ink-2">
                  Insured, signature required, in the house box, or collected in either store. Ready-to-ship pieces may be returned within 30 days. Made-to-order, engraved and sized pieces are exchangeable once the design is approved.
                </p>
              </details>
              <details className="acc border-b border-hair">
                <summary>A question about this piece</summary>
                <p className="font-text pb-5 text-[0.9375rem] text-ink-2">
                  Call Brentwood at{" "}
                  <a href={`tel:${salon.phone.replace(/\D/g, "")}`} className="link-quiet num">
                    {salon.phone}
                  </a>{" "}
                  and ask for the bench, or{" "}
                  <Link to={`/appointments?piece=${piece.handle}`} className="link-quiet">
                    book an hour
                  </Link>
                  .
                </p>
              </details>
            </div>
          </div>
        </div>
      </Section>

      <Section screen width="text">
        <p className="h-display mx-auto max-w-5xl text-center text-[2rem] text-ink-2 md:text-[3rem] lg:text-[3.5rem]">
          {madeOf(piece).map((part, i) => (
            <span key={i} className={part.key ? "text-ink" : ""}>
              {part.text}
            </span>
          ))}
        </p>
      </Section>

      {siblings.length > 0 && design && (
        <Section className="pb-8">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="h-section text-[1.75rem] md:text-[2.25rem]">Complete the set</h2>
            <Link to={`/designs/${design.slug}`} className="link">
              The {design.name} design
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:gap-x-8 lg:grid-cols-4">
            {siblings.map((p) => (
              <ProductTile key={p.handle} piece={p} showLine={false} />
            ))}
          </div>
        </Section>
      )}

      {royal && (
        <Section className="pb-8" width="text">
          <div className="grid gap-8 md:grid-cols-2 md:gap-16">
            <h2 className="h-section text-[1.75rem] md:text-[2rem]">One of one</h2>
            <div className="font-text flex flex-col gap-4 text-ink-2">
              <p>Made once, numbered, and entered in the house registry under the name of its owner. Never made again.</p>
              <Link to="/royal-american" className="link self-start">
                The registry
              </Link>
            </div>
          </div>
        </Section>
      )}
    </>
  );
}
