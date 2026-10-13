import { Link } from "react-router";

import { PieceLedger } from "~/components/Catalog";
import { Pic } from "~/components/Pic";
import { PhotoOpener, Plate, Section } from "~/components/Section";
import { VIEWING } from "~/components/three/viewing/pieces";
import { ViewingFrame } from "~/components/three/viewing/Viewing";
import { TIERS, designsForTier, piecesForDesign, piecesForTier } from "~/lib/catalog/data";
import { TIER_PHOTO } from "~/lib/catalog/photos";
import type { TierSlug } from "~/lib/catalog/types";
import { breadcrumbJsonLd, itemListJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/line";

/** The stone standard, as the label over the name. */
const STANDARD: Record<TierSlug, string> = {
  "royal-american": "One of one. Price on request.",
  americana: "Natural diamonds, F to G, VS1, GIA.",
  "new-american": "Man-made diamonds (laboratory-grown), D to F, VVS, IGI.",
};

/** One sentence under the name, at most sixteen words. */
const LINE: Record<TierSlug, string> = {
  "royal-american": "Made once, numbered, and entered in the house registry under the name of its owner.",
  americana: "The designs of the house, in solid gold, birthstone and natural diamond.",
  "new-american": "Man-made diamonds to one published standard, set by the same hands.",
};

/** Where the opener's subject sits in the frame, so the words find empty ground. */
const POSITION: Record<TierSlug, string> = {
  "royal-american": "62% 50%",
  americana: "60% 50%",
  "new-american": "75% 50%",
};

export function loader({ request }: Route.LoaderArgs) {
  const slug = new URL(request.url).pathname.replace(/^\/+|\/+$/g, "") as TierSlug;
  if (!TIERS.some((t) => t.slug === slug)) throw new Response("Not found", { status: 404 });
  return { slug };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const tier = TIERS.find((t) => t.slug === data?.slug)!;
  return pageMeta(
    { title: tier.name, description: `${tier.tagline} ${tier.stones}`, path: `/${tier.slug}`, og: `lines/${tier.slug}`, image: TIER_PHOTO[tier.slug] },
    [breadcrumbJsonLd([{ name: tier.name, href: `/${tier.slug}` }]), itemListJsonLd(tier.name, piecesForTier(tier.slug))],
  );
};

/**
 * Americana: opener (the ring on green leather) / ledger (the pieces, by design) / beside (the hand) / line (bridal).
 * New American: opener (Signal on limestone) / ledger (the standard) / ledger (the pieces, by design) / plate (the hand) / line (bridal).
 * No two screens share a composition. docs/briefs/site/pages/line.md; 22-art-direction §5.
 */
export default function LinePage({ loaderData }: Route.ComponentProps) {
  const slug = loaderData.slug;
  const tier = TIERS.find((t) => t.slug === slug)!;
  if (slug === "royal-american") return <RoyalAmerican />;
  const designs = designsForTier(slug);
  const newAmerican = slug === "new-american";

  return (
    <>
      <PhotoOpener photo={TIER_PHOTO[slug]} position={POSITION[slug]} eyebrow={STANDARD[slug]} title={tier.name} lede={LINE[slug]} height="aspect-[4/5] md:aspect-auto md:h-[78vh] md:min-h-[520px] md:max-h-[900px]" />

      {newAmerican && <Standard />}

      {/* The pieces, by design: each design's name set large, its pieces as a ledger beneath. */}
      <Section screen>
        <div className="flex flex-col gap-20 md:gap-28">
          {designs.map((d) => {
            const pieces = piecesForDesign(d.slug);
            return (
              <section key={d.slug} aria-labelledby={`design-${d.slug}`} className="grid gap-8 lg:grid-cols-12 lg:gap-x-10">
                <div className="flex flex-col gap-4 lg:col-span-4 lg:sticky lg:top-36 lg:self-start">
                  <h2 id={`design-${d.slug}`} className="h-display text-[2.5rem] md:text-[3.5rem]">
                    {d.name}
                  </h2>
                  <p className="lede">{d.motif}</p>
                  <Link to={`/designs/${d.slug}`} viewTransition className="link self-start">
                    The {d.name} design
                  </Link>
                </div>
                <div className="lg:col-span-8">
                  {pieces.length > 0 ? <PieceLedger pieces={pieces} /> : <p className="font-text text-ink-2">No {d.name} piece is listed yet.</p>}
                </div>
              </section>
            );
          })}
        </div>
        <p className="label mt-10">Price before sales tax.</p>
      </Section>

      {newAmerican ? (
        <Plate photo="comp-signal-hand" position="55% 45%" caption="Signal Solitaire, on the hand. Platinum, one man-made diamond (laboratory-grown)." />
      ) : (
        <Section>
          <div className="grid items-start gap-8 md:grid-cols-12 md:gap-10">
            <div className="settle relative aspect-[4/5] overflow-hidden md:col-span-8 md:-ml-10 md:aspect-[4/3]">
              <Pic k="comp-home-hand" tall="comp-home-hand-tall" sizes="(min-width: 768px) 66vw, 100vw" position="62% 45%" />
            </div>
            <div className="flex flex-col gap-5 md:col-span-4 md:pt-2">
              <p className="h-section text-[1.75rem] md:text-[2.25rem]">Drawn to be worn every day and handed down.</p>
              <Link to="/jewelry?line=americana" className="link self-start">
                Every Americana piece
              </Link>
            </div>
          </div>
        </Section>
      )}

      <Section screen width="text">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="font-text max-w-xl text-[1.0625rem] text-ink-2">Every setting takes a natural or a man-made stone. The name on the box follows the stone.</p>
          <Link to="/build/ring" className="btn">
            Build a ring
          </Link>
        </div>
      </Section>
    </>
  );
}

function Standard() {
  const rows: [string, string][] = [
    ["Color", "D, E or F. Every stone, including the small ones."],
    ["Clarity", "VVS1 or VVS2."],
    ["Cut", "Excellent or Ideal. Hearts and Arrows on round centers."],
    ["Report", "IGI, on every center stone from 0.30 ct, laser inscribed."],
    ["Growth", "Growth method and any treatment disclosed on the report."],
    ["Metal", "Solid 14k or 18k gold or platinum. Never plated, never hollow."],
    ["Made", "Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported."],
  ];
  return (
    <Section screen width="text" id="standard">
      <div className="grid gap-8 md:grid-cols-12 md:gap-16">
        <h2 className="h-section text-[2rem] md:col-span-4 md:text-[2.5rem]">The New American Standard</h2>
        <table className="spec md:col-span-7 md:col-start-6">
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
    </Section>
  );
}

/**
 * Royal American, on velvet throughout: opener (the piece on its tray) / viewing (The Cumberland in the light,
 * the live room, its frame dissolved into the navy) / ledger (the registry) / line (by appointment).
 */
function RoyalAmerican() {
  const pieces = piecesForTier("royal-american");
  const cumberland = VIEWING["no-001-the-cumberland"];
  return (
    <div className="velvet -mb-32 pb-32">
      <PhotoOpener photo={TIER_PHOTO["royal-american"]} position={POSITION["royal-american"]} eyebrow={STANDARD["royal-american"]} title="Royal American" lede={LINE["royal-american"]} height="aspect-[4/5] md:aspect-auto md:h-[78vh] md:min-h-[520px] md:max-h-[900px]" />

      <Section screen>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-16">
          <ViewingFrame
            spec={cumberland}
            poster="/3d/posters/viewing-cumberland.webp"
            posterTall="/3d/posters/viewing-cumberland-tall.webp"
            alt="The Cumberland, Royal American No. 001, on navy velvet under one light"
            className="aspect-[4/5] md:aspect-[4/3] lg:col-span-8 lg:-ml-10"
          />
          <div className="flex flex-col gap-5 lg:col-span-4 lg:self-end lg:pb-10">
            <span className="label">In the light</span>
            <h2 className="h-section text-[2rem] md:text-[2.5rem]">The Cumberland, as we draw it.</h2>
            <p className="lede">No. 001. The light in your hand: move the pointer, or tilt the phone, and the stone answers.</p>
          </div>
        </div>
      </Section>

      <Section screen width="text">
        <h2 className="h-section mb-8 text-[2rem] md:text-[2.5rem]">The registry</h2>
        <table className="spec registry">
          <thead>
            <tr>
              <th scope="col" className="w-[6rem]">
                No.
              </th>
              <th scope="col">Piece</th>
              <th scope="col" className="hidden md:table-cell">
                Stones
              </th>
              <th scope="col">State</th>
            </tr>
          </thead>
          <tbody>
            {pieces.map((p) => (
              <tr key={p.handle}>
                <td>
                  <span className="gold-numeral">{p.oneOfOne?.number}</span>
                </td>
                <td>
                  <Link to={`/pieces/${p.handle}`} className="font-display text-[1.125rem] hover:text-paper/70">
                    {p.name}
                  </Link>
                </td>
                <td className="font-text hidden text-paper/80 md:table-cell">{p.versions[0].stones}</td>
                <td className="font-text text-paper/80">{p.leadTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="font-text mt-8 max-w-xl text-paper/80">Numbered in the order it was finished. Entered with its owner, its drawing and the reports on its stones. Never made again.</p>
      </Section>

      <Section className="pb-8" width="text">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="h-section max-w-[24ch] text-[1.75rem] md:text-[2.25rem]">Shown by appointment, in the store.</p>
          <Link to="/appointments?tier=royal-american" className="btn btn-light">
            Request a private viewing
          </Link>
        </div>
      </Section>
    </div>
  );
}
