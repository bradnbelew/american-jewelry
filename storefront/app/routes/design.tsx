import { Link } from "react-router";

import { Pic } from "~/components/Pic";
import { TileGrid } from "~/components/ProductTile";
import { Section } from "~/components/Section";
import { SETTINGS, type SettingKey } from "~/lib/builder/model";
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
    { title: `${d.name}, a house design`, description: `${d.motif} ${d.story}`, path: `/designs/${d.slug}`, image: DESIGN_PHOTO[d.slug] },
    [
      breadcrumbJsonLd([
        { name: tier.name, href: `/${tier.slug}` },
        { name: d.name, href: `/designs/${d.slug}` },
      ]),
      itemListJsonLd(`${d.name} design`, piecesForDesign(d.slug)),
    ],
  );
};

/**
 * The design page. The second screen is reserved for the signature ("the stone is set", phase 3);
 * until then a still of the setting holds the place.
 */
export default function DesignPage({ loaderData }: Route.ComponentProps) {
  const d = designBySlug(loaderData.slug)!;
  const tier = tierBySlug(d.tier);
  const pieces = piecesForDesign(d.slug);
  const drawable = (SETTINGS as readonly string[]).includes(d.slug) ? (d.slug as SettingKey) : null;
  const features = pieces.slice(0, 3);

  return (
    <>
      <Section className="pt-10 md:pt-20">
        <div className="flex flex-col gap-5">
          <Link to={`/${tier.slug}`} className="label hover:text-ink">
            {tier.name}
          </Link>
          <h1 className="h-display measure-display text-[3.5rem] md:text-[6rem] lg:text-[8rem]">{d.name}</h1>
          <p className="lede max-w-xl">{d.motif}</p>
        </div>
      </Section>

      <Section className="pt-12 md:pt-20">
        <div className="settle relative aspect-[4/5] overflow-hidden bg-stone md:aspect-[2.2/1]">
          <Pic k={drawable ? SETTING_PHOTO[drawable] : DESIGN_PHOTO[d.slug]} sizes="100vw" position="50% 45%" priority />
        </div>
      </Section>

      {features.map((p, i) => {
        const photo = (PIECE_PHOTOS[p.handle] ?? ["hero-box"])[0];
        const caption = i === 0 ? d.signature : i === 1 ? (p.specs[0]?.value ?? p.description) : "The AJ mark, struck inside.";
        const label = i === 2 ? "The mark" : (p.specs[0]?.label ?? "The detail");
        const flip = i % 2 === 1;
        return (
          <Section key={p.handle} screen>
            <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
              <div className={`settle relative aspect-[4/5] overflow-hidden bg-white md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`}>
                <Pic k={photo} sizes="(min-width: 768px) 58vw, 100vw" />
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
        <div className="mb-12 flex items-end justify-between gap-6">
          <h2 className="h-section text-[2rem] md:text-[2.5rem]">Every {d.name} piece</h2>
          <span className="num label">{pieces.length}</span>
        </div>
        <TileGrid pieces={pieces} showLine={false} />
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
