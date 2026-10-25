import { useRouteLoaderData } from "react-router";

import { ProductResults } from "~/components/Catalog";
import { Pic } from "~/components/Pic";
import { designBySlug, piecesForDesign, publicPieces } from "~/lib/catalog/data";
import { DESIGN_PHOTO } from "~/lib/catalog/photos";
import { envContext } from "~/lib/env";
import { isLive } from "~/lib/site";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";

import type { loader as rootLoader } from "~/root";
import type { Route } from "./+types/design";

export function loader({ params, context }: Route.LoaderArgs) {
  const design = designBySlug(params.slug);
  if (!design) throw new Response("Not found", { status: 404 });
  const live = isLive(context.get(envContext));
  const visible = publicPieces(live).filter((piece) => piece.design === design.slug);
  if (live && visible.length === 0) throw new Response("Not found", { status: 404 });
  return { slug: design.slug };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const design = designBySlug(data?.slug ?? "");
  if (!design) return [];
  return pageMeta(
    {
      title: design.name,
      description: design.motif,
      path: `/designs/${design.slug}`,
      image: DESIGN_PHOTO[design.slug],
    },
    [breadcrumbJsonLd([{ name: design.name, href: `/designs/${design.slug}` }])],
  );
};

export default function DesignPage({ loaderData }: Route.ComponentProps) {
  const root = useRouteLoaderData<typeof rootLoader>("root");
  const design = designBySlug(loaderData.slug)!;
  const base = publicPieces(root?.live === true).filter((piece) => piece.design === design.slug && piece.tier !== "royal-american" && !piece.oneOfOne);
  return (
    <>
      <header className="page-intro wrap">
        <h1>{design.name}</h1>
        <p className="body center-copy">{design.story}</p>
      </header>
      <div className="wrap" style={{ paddingBottom: 48 }}>
        <div className="frame-45" style={{ maxWidth: 640, margin: "0 auto 48px" }}>
          <Pic k={DESIGN_PHOTO[design.slug] ?? "ed-names"} priority sizes="(min-width: 768px) 640px, 100vw" fit="contain" />
        </div>
      </div>
      <div className="wrap" style={{ paddingBottom: "var(--section-y)" }}>
        <ProductResults base={base} hide={["design", "line", "production"]} emptyLine="No pieces match these filters." />
      </div>
    </>
  );
}
