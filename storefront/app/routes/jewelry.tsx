import { Link, redirect, useRouteLoaderData } from "react-router";

import { ProductResults } from "~/components/Catalog";
import { Pic } from "~/components/Pic";
import { categoryBySlug, categoryOf } from "~/lib/catalog/browse";
import { publicPieces } from "~/lib/catalog/data";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";

import type { loader as rootLoader } from "~/root";
import type { Route } from "./+types/jewelry";

export function loader({ params, request }: Route.LoaderArgs) {
  if (params.category && !categoryBySlug(params.category)) throw new Response("Not found", { status: 404 });
  const paramsUrl = new URL(request.url).searchParams;
  if (paramsUrl.get("line") === "royal-american" || paramsUrl.get("production") === "one-of-one" || paramsUrl.get("stone") === "one-of-one") {
    throw redirect("/royal-american");
  }
  return { category: params.category ?? null };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const category = categoryBySlug(data?.category ?? undefined);
  const title = category?.name ?? "Jewelry";
  const path = category ? `/jewelry/${category.slug}` : "/jewelry";
  return pageMeta(
    {
      title,
      description: category?.line ?? "Rings, necklaces, earrings and bracelets from American Jewelry in Brentwood and Mt. Juliet.",
      path,
      image: category?.slug === "rings" ? "ed-radiant" : "ed-names",
    },
    [breadcrumbJsonLd([{ name: "Jewelry", href: "/jewelry" }, ...(category ? [{ name: category.name, href: path }] : [])])],
  );
};

export default function JewelryPage({ loaderData }: Route.ComponentProps) {
  const root = useRouteLoaderData<typeof rootLoader>("root");
  const category = categoryBySlug(loaderData.category ?? undefined);
  const base = publicPieces(root?.live === true).filter((piece) => piece.tier !== "royal-american" && !piece.oneOfOne && (!category || categoryOf(piece)?.slug === category.slug));
  const interrupt = category?.slug === "rings" ? (
    <Link to="/build/ring" className="block">
      <span className="frame-45 block">
        <Pic k="ed-radiant" sizes="(min-width: 1024px) 40vw, 100vw" position="50% 40%" />
      </span>
      <span className="product-name mt-4 block text-center">Design your ring</span>
      <span className="link">Design your ring</span>
    </Link>
  ) : undefined;

  return (
    <div className="wrap" style={{ paddingBottom: "var(--section-y)" }}>
      <header className="page-intro">
        {category ? <p className="crumb">Jewelry / {category.name}</p> : null}
        <h1>{category?.name ?? "Jewelry"}</h1>
        <p className="body center-copy">{category?.line ?? "Rings, necklaces, earrings and bracelets."}</p>
      </header>
      <ProductResults base={base} hide={["line", "production", "design"]} interrupt={interrupt} emptyLine="No pieces match these filters." />
    </div>
  );
}
