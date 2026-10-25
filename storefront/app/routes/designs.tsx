import { Link, useRouteLoaderData } from "react-router";

import { Pic } from "~/components/Pic";
import { DESIGNS, publicPieces } from "~/lib/catalog/data";
import { DESIGN_PHOTO } from "~/lib/catalog/photos";
import { pageMeta } from "~/lib/seo";

import type { loader as rootLoader } from "~/root";
import type { Route } from "./+types/designs";

export const meta: Route.MetaFunction = () =>
  pageMeta({
    title: "Designs",
    description: "Shooting Star, Prism, Signal, Grid, Meridian, Ribbon, Horizon and Petal.",
    path: "/designs",
    image: "ed-names",
  });

export default function DesignsPage() {
  const root = useRouteLoaderData<typeof rootLoader>("root");
  const live = root?.live === true;
  const designs = DESIGNS.filter((design) => publicPieces(live).some((piece) => piece.design === design.slug && piece.tier !== "royal-american"));
  return (
    <div className="wrap" style={{ paddingBottom: "var(--section-y)" }}>
      <header className="page-intro">
        <h1>Designs</h1>
      </header>
      <div className="port-grid">
        {designs.map((design) => (
          <Link key={design.slug} to={`/designs/${design.slug}`} className="cat-tile">
            <span className="frame-45">
              <Pic k={DESIGN_PHOTO[design.slug] ?? "ed-names"} sizes="(min-width: 768px) 30vw, 46vw" fit="contain" />
            </span>
            <span className="product-name mt-3 block">{design.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
