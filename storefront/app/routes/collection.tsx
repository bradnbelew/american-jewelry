import { useRouteLoaderData } from "react-router";

import { ProductResults } from "~/components/Catalog";
import { Pic } from "~/components/Pic";
import { collectionBySlug, publicPieces } from "~/lib/catalog/data";
import { COLLECTION_PHOTO } from "~/lib/catalog/photos";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";

import type { loader as rootLoader } from "~/root";
import type { Route } from "./+types/collection";

const EDITORIAL: Record<string, { photo: string; intro: string; description: string }> = {
  bridal: {
    photo: "ed-bridal",
    intro: "Engagement rings and wedding bands, chosen with you and set by our jewelers.",
    description: "Engagement rings and wedding bands with natural or lab-grown diamonds, at American Jewelry in Brentwood and Mt. Juliet, TN.",
  },
  personalized: {
    photo: "ed-names",
    intro: "Names, initials and dates, in solid gold.",
    description: "Name necklaces, name rings and initials in solid gold, made in our workshop.",
  },
  "american-classic": {
    photo: "ed-signets",
    intro: "Signets, huggies and the gold pieces clients come back for.",
    description: "The American Classic signet, diamond huggies, studs and gold charms.",
  },
  "wedding-bands": {
    photo: "ed-bands",
    intro: "Wedding bands and eternity bands, chosen with you and set by our jewelers.",
    description: "Wedding bands and eternity bands in gold, and with diamonds.",
  },
};

export function loader({ params }: Route.LoaderArgs) {
  const collection = collectionBySlug(params.slug);
  if (!collection) throw new Response("Not found", { status: 404 });
  return { slug: collection.slug };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const collection = collectionBySlug(data?.slug ?? "");
  if (!collection) return [];
  const editorial = EDITORIAL[collection.slug];
  return pageMeta(
    {
      title: collection.name,
      description: editorial?.description ?? collection.intro,
      path: `/collections/${collection.slug}`,
      image: editorial?.photo ?? COLLECTION_PHOTO[collection.slug],
    },
    [breadcrumbJsonLd([{ name: collection.name, href: `/collections/${collection.slug}` }])],
  );
};

export default function CollectionPage({ loaderData }: Route.ComponentProps) {
  const root = useRouteLoaderData<typeof rootLoader>("root");
  const collection = collectionBySlug(loaderData.slug)!;
  const editorial = EDITORIAL[collection.slug];
  const base = publicPieces(root?.live === true).filter((piece) => !piece.oneOfOne && piece.tier !== "royal-american" && piece.collections.includes(collection.slug));

  return (
    <>
      {editorial ? (
        <header className="editorial-hero">
          <Pic k={editorial.photo} priority sizes="100vw" position="50% 45%" />
          <div className="hero-scrim" />
          <div className="hero-copy">
            <h1 className="display">{collection.name}</h1>
            <p className="body-lg">{editorial.intro}</p>
          </div>
        </header>
      ) : (
        <header className="page-intro wrap">
          <p className="crumb">Jewelry / {collection.name}</p>
          <h1>{collection.name}</h1>
          <p className="body center-copy">{collection.intro}</p>
        </header>
      )}
      <div className="wrap" style={{ paddingBottom: "var(--section-y)" }}>
        <ProductResults base={base} hide={["line", "production", "design"]} emptyLine={`No ${collection.name.toLowerCase()} pieces match these filters.`} />
      </div>
    </>
  );
}
