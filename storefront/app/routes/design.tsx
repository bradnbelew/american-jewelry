import { Link } from "react-router";

import { Pic } from "~/components/Pic";
import { PieceLedger } from "~/components/Catalog";
import { Section } from "~/components/Section";
import { StoneIsSet } from "~/components/three/StoneIsSet";
import { DEFAULT_CONFIG, SETTINGS, normalize, type SettingKey } from "~/lib/builder/model";
import { designBySlug, piecesForDesign, tierBySlug } from "~/lib/catalog/data";
import { DESIGN_PHOTO } from "~/lib/catalog/photos";
import { breadcrumbJsonLd, itemListJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/design";

export function loader({ params }: Route.LoaderArgs) {
  const d = designBySlug(params.slug);
  if (!d) throw new Response("Not found", { status: 404 });
  return { slug: d.slug };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const d = designBySlug(data?.slug ?? "")!;
  const tier = tierBySlug(d.tier);
  return pageMeta(
    { title: `${d.name}, a house design`, description: `${d.motif} ${d.story}`, path: `/designs/${d.slug}`, og: `designs/${d.slug}`, image: DESIGN_PHOTO[d.slug] },
    [
      breadcrumbJsonLd([
        { name: tier.name, href: `/${tier.slug}` },
        { name: d.name, href: `/designs/${d.slug}` },
      ]),
      itemListJsonLd(`${d.name} design`, piecesForDesign(d.slug)),
    ],
  );
};

/** Designs that have their ring built in the house renderer; the others show a still. */
const ASSEMBLED: readonly string[] = ["signal"];

/**
 * The design page: the name, then the signature ("the stone is set") where the ring exists in
 * the renderer, three parts of the design, every piece, and the hand-off to the builder.
 * docs/briefs/site/pages/design.md.
 */
export default function DesignPage({ loaderData }: Route.ComponentProps) {
  const d = designBySlug(loaderData.slug)!;
  const tier = tierBySlug(d.tier);
  const pieces = piecesForDesign(d.slug);
  const drawable = (SETTINGS as readonly string[]).includes(d.slug) ? (d.slug as SettingKey) : null;
  const assembled = drawable && ASSEMBLED.includes(drawable) ? drawable : null;

  return (
    <>
      <Section className="pt-10 md:pt-20">
        <div className="flex flex-col gap-5">
          <Link to={`/${tier.slug}`} className="label inline-flex min-h-11 items-center self-start hover:text-ink">
            {tier.name}
          </Link>
          <h1 className="h-display measure-display text-[3.5rem] md:text-[6rem] lg:text-[8rem]">{d.name}</h1>
          <p className="lede max-w-xl">{d.motif}</p>
        </div>
      </Section>

      {assembled ? (
        <Section className="pt-12 md:pt-20">
          <StoneIsSet config={normalize({ ...DEFAULT_CONFIG, setting: assembled })} poster={`/3d/posters/ring-${assembled}.webp`} alt={`The ${d.name} ring, assembled: band, head, stone and four claws`} />
        </Section>
      ) : (
        <div className="settle relative mt-12 aspect-[4/5] overflow-hidden md:mt-20 md:aspect-[2.2/1]">
          <Pic k={DESIGN_PHOTO[d.slug]} sizes="100vw" position="50% 50%" priority />
        </div>
      )}

      {/* A line: the signature of the design, alone. */}
      <Section screen width="text">
        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          <span className="label md:col-span-3">The signature</span>
          <p className="h-section text-[1.75rem] md:col-span-9 md:text-[2.5rem]">{d.signature}</p>
        </div>
      </Section>

      {/* The ledger: every piece in the design, one photograph per row. */}
      <Section className="pb-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-10">
          <div className="flex flex-col gap-4 lg:col-span-4">
            <h2 className="h-section text-[2rem] md:text-[2.5rem]">Every {d.name} piece</h2>
            <p className="font-text text-ink-2">{d.story}</p>
          </div>
          <div className="lg:col-span-8">
            {pieces.length > 0 ? <PieceLedger pieces={pieces} /> : <p className="font-text text-ink-2">No {d.name} piece is listed yet.</p>}
            <p className="label mt-6">Price before sales tax.</p>
          </div>
        </div>
      </Section>

      <Section screen width="text">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="font-text max-w-xl text-[1.0625rem] text-ink-2">
            {drawable ? `Every ${d.name} setting takes a natural or a lab-grown diamond. The name on the box follows the stone.` : `${d.name} belongs to ${tier.name}.`}
          </p>
          {drawable ? (
            <Link to={`/build/ring?setting=${drawable}`} className="btn">
              Build on {d.name}
            </Link>
          ) : (
            <Link to={`/${tier.slug}`} className="link">
              All of {tier.name}
            </Link>
          )}
        </div>
      </Section>
    </>
  );
}
