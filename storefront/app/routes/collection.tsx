import { Link } from "react-router";

import { Pic } from "~/components/Pic";
import { TileGrid } from "~/components/ProductTile";
import { Section, SplitOpener } from "~/components/Section";
import { SETTINGS } from "~/lib/builder/model";
import { DESIGN_NOTES, SETTING_PHOTO } from "~/lib/builder/notes";
import { collectionBySlug, piecesForCollection } from "~/lib/catalog/data";
import { COLLECTION_PHOTO } from "~/lib/catalog/photos";
import { breadcrumbJsonLd, itemListJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/collection";

export function loader({ params }: Route.LoaderArgs) {
  const c = collectionBySlug(params.slug);
  if (!c) throw new Response("Not found", { status: 404 });
  return { slug: c.slug };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const c = collectionBySlug(data?.slug ?? "")!;
  return pageMeta(
    { title: `${c.name} collection`, description: c.intro, path: `/collections/${c.slug}`, image: COLLECTION_PHOTO[c.slug] },
    [breadcrumbJsonLd([{ name: `${c.name} collection`, href: `/collections/${c.slug}` }]), itemListJsonLd(`${c.name} collection`, piecesForCollection(c.slug))],
  );
};

export default function CollectionPage({ loaderData }: Route.ComponentProps) {
  const c = collectionBySlug(loaderData.slug)!;
  const pieces = piecesForCollection(c.slug);
  const bridal = c.slug === "bridal";

  return (
    <>
      <SplitOpener eyebrow="A collection" title={c.name} lede={c.intro} photo={COLLECTION_PHOTO[c.slug]}>
        {bridal && (
          <Link to="/build/ring" className="btn self-start">
            Build a ring
          </Link>
        )}
      </SplitOpener>

      <Section screen width="text">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <p className="h-section measure text-[1.75rem] md:col-span-7 md:text-[2.25rem]">{c.story}</p>
          <p className="font-text text-ink-2 md:col-span-4 md:col-start-9">
            {bridal
              ? "A natural diamond places the ring in Americana; a man-made diamond places it in New American. The builder prices both and labels each plainly."
              : "Made for you after you order it. Two to five weeks, and a note from the bench when it is cast."}
          </p>
        </div>
      </Section>

      {bridal && (
        <Section className="pb-8">
          <h2 className="h-section mb-10 text-[2rem] md:text-[2.5rem]">Three settings</h2>
          <ul className="grid grid-cols-3 gap-4 md:gap-8">
            {SETTINGS.map((s) => (
              <li key={s}>
                <Link to={`/build/ring?setting=${s}`} className="group flex flex-col gap-3">
                  <span className="settle relative block aspect-[4/5] overflow-hidden bg-white">
                    <Pic k={SETTING_PHOTO[s]} sizes="30vw" />
                  </span>
                  <span className="h-item text-[1.25rem] group-hover:text-muted md:text-[1.5rem]">{DESIGN_NOTES[s].name}</span>
                  <span className="font-text hidden text-[0.9375rem] text-muted sm:block">{DESIGN_NOTES[s].line}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section screen>
        <div className="mb-12 flex items-end justify-between gap-6">
          <h2 className="h-section text-[2rem] md:text-[2.5rem]">{bridal ? "Bands and settings" : `The ${c.name} pieces`}</h2>
          <span className="num label">{pieces.length}</span>
        </div>
        <TileGrid pieces={pieces} />
      </Section>
    </>
  );
}
