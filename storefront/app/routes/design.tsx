import { Link } from "react-router";

import { Pic } from "~/components/Pic";
import { TileGrid } from "~/components/ProductTile";
import { Section } from "~/components/Section";
import { StoneIsSet } from "~/components/three/StoneIsSet";
import { DEFAULT_CONFIG, SETTINGS, normalize, type SettingKey } from "~/lib/builder/model";
import { SETTING_PHOTO } from "~/lib/builder/notes";
import { designBySlug, piecesForDesign, tierBySlug } from "~/lib/catalog/data";
import { DESIGN_PHOTO, PIECE_PHOTOS } from "~/lib/catalog/photos";
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
  const features = pieces.slice(0, 3);

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
        <Section className="pt-12 md:pt-20">
          <div className="settle relative aspect-[4/5] overflow-hidden bg-stone md:aspect-[5/4] lg:aspect-[2/1]">
            <Pic k={drawable ? SETTING_PHOTO[drawable] : DESIGN_PHOTO[d.slug]} sizes="100vw" position="50% 45%" priority />
          </div>
        </Section>
      )}

      {features.map((p, i) => {
        const photo = (PIECE_PHOTOS[p.handle] ?? ["hero-box"])[0];
        const spec = p.specs[i === 2 ? 1 : 0];
        const caption = i === 0 ? d.signature : (spec?.value ?? p.description);
        const label = i === 0 ? "The design" : (spec?.label ?? "The detail");
        const render = i === 0 && assembled ? `/3d/posters/ring-${assembled}.webp` : null;
        const flip = i % 2 === 1;
        return (
          <Section key={p.handle} screen>
            <div className="grid items-start gap-8 md:grid-cols-12 md:gap-12">
              <div className={`settle relative aspect-[4/5] overflow-hidden ${render ? "bg-stone" : "bg-white"} md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`}>
                {render ? <img src={render} alt={`The ${d.name} head, rendered from the house drawing`} width={1200} height={960} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" /> : <Pic k={photo} sizes="(min-width: 768px) 58vw, 100vw" />}
              </div>
              <div className={`flex flex-col gap-3 md:col-span-4 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}>
                <span className="label">{label}</span>
                <p className="font-text text-[1.125rem] text-ink-2">{caption}</p>
              </div>
            </div>
          </Section>
        );
      })}

      <Section className="pb-8">
        <h2 className="h-section mb-12 text-[2rem] md:text-[2.5rem]">Every {d.name} piece</h2>
        <TileGrid pieces={pieces} showLine={false} />
        <p className="label mt-10">Price before sales tax.</p>
      </Section>

      <Section screen width="text">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="font-text max-w-xl text-[1.0625rem] text-ink-2">
            {drawable ? `Every ${d.name} setting takes a natural or a man-made stone. The name on the box follows the stone.` : d.story}
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
