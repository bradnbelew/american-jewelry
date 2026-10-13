import { Link } from "react-router";

import { Pic } from "~/components/Pic";
import { PieceIndex } from "~/components/Catalog";
import { PhotoOpener, Section } from "~/components/Section";
import { SETTINGS } from "~/lib/builder/model";
import { DESIGN_NOTES } from "~/lib/builder/notes";
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
      {bridal ? (
        <PhotoOpener photo={COLLECTION_PHOTO[c.slug]} position="60% 45%" eyebrow="A collection" title={c.name} lede={c.intro} height="aspect-[4/5] md:aspect-auto md:h-[72vh] md:min-h-[480px] md:max-h-[860px]">
          <Link to="/build/ring" className="btn btn-light mt-1">
            Build a ring
          </Link>
        </PhotoOpener>
      ) : (
        <Section className="pt-10 md:pt-16">
          <div className="grid gap-8 md:grid-cols-12 md:gap-10">
            <div className="flex flex-col gap-4 md:col-span-7">
              <span className="label">A collection</span>
              <h1 className="h-display text-[3rem] md:text-[4.5rem]">{c.name}</h1>
              <p className="lede measure">{c.intro}</p>
            </div>
            <div className="settle relative aspect-[4/5] overflow-hidden md:col-span-4 md:col-start-9">
              <Pic k={COLLECTION_PHOTO[c.slug]} sizes="(min-width: 768px) 33vw, 100vw" priority />
            </div>
          </div>
        </Section>
      )}

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
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-10">
            <h2 className="h-section text-[2rem] md:text-[2.5rem] lg:col-span-4">The settings</h2>
            <ol className="border-t border-hair lg:col-span-8">
              {SETTINGS.map((s) => (
                <li key={s} className="border-b border-hair">
                  <Link to={`/build/ring?setting=${s}`} className="group grid items-baseline gap-x-8 gap-y-1 py-5 md:grid-cols-[12rem_1fr_auto]">
                    <span className="h-item text-[1.5rem] group-hover:text-muted md:text-[1.75rem]">{DESIGN_NOTES[s].name}</span>
                    <span className="font-text text-[1.0625rem] text-ink-2">{DESIGN_NOTES[s].line}</span>
                    <span className="link">Build on {DESIGN_NOTES[s].name}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </Section>
      )}

      <Section screen>
        <div className="mb-12 flex items-baseline justify-between gap-6 border-b border-hair pb-3">
          <h2 className="h-section text-[2rem] md:text-[2.5rem]">{bridal ? "Rings and bands" : `The ${c.name} pieces`}</h2>
          <span className="label">
            <span className="num text-ink">{pieces.length}</span> {pieces.length === 1 ? "piece" : "pieces"}
          </span>
        </div>
        {pieces.length > 0 ? <PieceIndex pieces={pieces} showLine /> : <p className="font-text text-ink-2">Nothing is listed in {c.name} yet.</p>}
        <p className="label mt-10">Price before sales tax.</p>
      </Section>
    </>
  );
}
