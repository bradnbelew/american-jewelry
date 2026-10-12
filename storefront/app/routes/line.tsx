import { Link } from "react-router";

import { Pic } from "~/components/Pic";
import { TileGrid } from "~/components/ProductTile";
import { Section, SplitOpener } from "~/components/Section";
import { TIERS, designsForTier, piecesForDesign, piecesForTier } from "~/lib/catalog/data";
import { DESIGN_PHOTO, PIECE_PHOTOS, TIER_PHOTO } from "~/lib/catalog/photos";
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

/** The hand frame after the opener: one sentence on a full screen, then the hand. */
const HAND: Record<Exclude<TierSlug, "royal-american">, { photo: string; sentence: string }> = {
  americana: { photo: "hero-hand", sentence: "Drawn to be worn every day and handed down." },
  "new-american": { photo: "hero-hand", sentence: "The same designs, the same bench, a man-made stone." },
};

export function loader({ request }: Route.LoaderArgs) {
  const slug = new URL(request.url).pathname.replace(/^\/+|\/+$/g, "") as TierSlug;
  if (!TIERS.some((t) => t.slug === slug)) throw new Response("Not found", { status: 404 });
  return { slug };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const tier = TIERS.find((t) => t.slug === data?.slug)!;
  return pageMeta(
    { title: tier.name, description: `${tier.tagline} ${tier.stones}`, path: `/${tier.slug}`, image: TIER_PHOTO[tier.slug] },
    [breadcrumbJsonLd([{ name: tier.name, href: `/${tier.slug}` }]), itemListJsonLd(tier.name, piecesForTier(tier.slug))],
  );
};

/** Americana and New American: opener, the hand, one photographic band per design with its pieces, the standard, the bridal sentence. */
export default function LinePage({ loaderData }: Route.ComponentProps) {
  const slug = loaderData.slug;
  const tier = TIERS.find((t) => t.slug === slug)!;
  if (slug === "royal-american") return <RoyalAmerican />;
  const designs = designsForTier(slug);
  const hand = HAND[slug];

  return (
    <>
      <SplitOpener eyebrow={STANDARD[slug]} title={tier.name} lede={LINE[slug]} photo={TIER_PHOTO[slug]} position="50% 40%" />

      <Section screen>
        <div className="grid items-start gap-8 md:grid-cols-12 md:gap-10">
          <p className="h-section text-[1.75rem] md:col-span-4 md:text-[2.25rem]">{hand.sentence}</p>
          <div className="settle relative aspect-[4/5] overflow-hidden bg-bone md:col-span-8 md:aspect-[2/1]">
            <Pic k={hand.photo} sizes="(min-width: 768px) 66vw, 100vw" position="70% 50%" />
          </div>
        </div>
      </Section>

      {designs.map((d) => {
        const pieces = piecesForDesign(d.slug);
        return (
          <section key={d.slug} aria-labelledby={`design-${d.slug}`}>
            <Link to={`/designs/${d.slug}`} viewTransition className="group block">
              <div className="settle relative aspect-[4/5] overflow-hidden bg-bone md:aspect-[2/1]">
                <Pic k={DESIGN_PHOTO[d.slug]} sizes="100vw" position="50% 45%" />
              </div>
              <div className="mx-auto grid max-w-[96rem] gap-3 px-4 pt-8 md:grid-cols-12 md:gap-10 md:px-10 md:pt-10">
                <h2 id={`design-${d.slug}`} className="h-display text-[2.5rem] group-hover:text-muted md:col-span-6 md:text-[4rem]">
                  {d.name}
                </h2>
                <p className="lede md:col-span-5 md:col-start-8 md:pt-3">{d.motif}</p>
              </div>
            </Link>
            <Section className="pt-10 pb-6 md:pt-16">
              <TileGrid pieces={pieces} showLine={false} />
            </Section>
          </section>
        );
      })}

      <Section>
        <p className="label">Price before sales tax.</p>
      </Section>

      {slug === "new-american" && <Standard />}

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
    <Section screen width="text">
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

/** Navy ground, each piece a chapter, the registry instead of a grid. */
function RoyalAmerican() {
  const pieces = piecesForTier("royal-american");
  return (
    <div className="velvet -mb-32 pb-32">
      <SplitOpener eyebrow={STANDARD["royal-american"]} title="Royal American" lede={LINE["royal-american"]} photo={TIER_PHOTO["royal-american"]} position="50% 45%" />

      <div className="flex flex-col gap-24 pt-24 md:gap-40 md:pt-40">
        {pieces.map((p, i) => {
          const photos = PIECE_PHOTOS[p.handle] ?? ["hero-box"];
          const flip = i % 2 === 1;
          return (
            <Section key={p.handle}>
              <article className="grid items-start gap-8 md:grid-cols-12 md:gap-12">
                <Link to={`/pieces/${p.handle}`} viewTransition className={`settle relative block aspect-[4/5] overflow-hidden bg-navy-2 md:col-span-7 md:aspect-[5/4] ${flip ? "md:order-2 md:col-start-6" : ""}`}>
                  <Pic k={photos[0]} sizes="(min-width: 768px) 58vw, 100vw" priority={i === 0} />
                </Link>
                <div className={`flex min-w-0 flex-col gap-4 md:col-span-5 lg:col-span-4 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-8 lg:col-start-9"}`}>
                  <span className="gold-numeral">No. {p.oneOfOne?.number}</span>
                  <h2 className="h-display text-[2.5rem] lg:text-[3.5rem]">{p.name}</h2>
                  <p className="font-text text-paper/80">{p.versions[0].stones}</p>
                  <Link to={`/pieces/${p.handle}`} className="link link-light self-start">
                    The piece
                  </Link>
                </div>
              </article>
            </Section>
          );
        })}
      </div>

      <Section screen width="text">
        <h2 className="h-section mb-8 text-[2rem] md:text-[2.5rem]">The registry</h2>
        <table className="spec registry">
          <thead>
            <tr>
              <th scope="col" className="w-[6rem]">No.</th>
              <th scope="col">Piece</th>
              <th scope="col">Stones</th>
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
                <td className="font-text text-paper/80">{p.versions[0].stones}</td>
                <td className="font-text text-paper/80">{p.leadTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="font-text mt-8 max-w-xl text-paper/80">Numbered in the order it was finished. Entered with its owner, its drawing and the reports on its stones. Never made again.</p>
        <Link to="/appointments?tier=royal-american" className="btn btn-light mt-8">
          Request a private viewing
        </Link>
      </Section>
    </div>
  );
}
