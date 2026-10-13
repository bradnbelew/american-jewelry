import { Link } from "react-router";

import { Pic } from "~/components/Pic";
import { Section } from "~/components/Section";
import { DESIGNS, piecesForDesign, tierBySlug } from "~/lib/catalog/data";
import { DESIGN_PHOTO } from "~/lib/catalog/photos";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/designs";

export const meta: Route.MetaFunction = () =>
  pageMeta({ title: "The designs", description: "The house designs, each drawn by one designer: Shooting Star, Prism, Signal and Grid, and every piece made in them.", path: "/designs", image: "comp-americana-ground" }, [breadcrumbJsonLd([{ name: "The designs", href: "/designs" }])]);

/** The designs as an index: name, line, motif, how many pieces. One photograph per row, alternating sides so no two rows match. */
export default function DesignsPage() {
  return (
    <>
      <Section className="pt-10 md:pt-16">
        <div className="flex max-w-3xl flex-col gap-4">
          <h1 className="h-display text-[3rem] md:text-[4.5rem]">The designs</h1>
          <p className="lede measure">Each design is a motif drawn once and carried across the pieces of its line. Designs never cross from one line to another.</p>
        </div>
      </Section>
      <Section className="pt-12 md:pt-20">
        <ol className="flex flex-col gap-16 md:gap-24">
          {DESIGNS.map((d, i) => {
            const tier = tierBySlug(d.tier);
            const n = piecesForDesign(d.slug).length;
            const flip = i % 2 === 1;
            return (
              <li key={d.slug}>
                <Link to={`/designs/${d.slug}`} viewTransition className="group grid items-end gap-6 md:grid-cols-12 md:gap-10">
                  <span className={`settle relative block overflow-hidden ${flip ? "aspect-[4/5] md:order-2 md:col-span-5 md:col-start-8" : "aspect-[4/3] md:col-span-7"}`}>
                    <Pic k={DESIGN_PHOTO[d.slug]} sizes={flip ? "(min-width: 768px) 40vw, 100vw" : "(min-width: 768px) 58vw, 100vw"} />
                  </span>
                  <span className={`flex flex-col gap-3 ${flip ? "md:order-1 md:col-span-6" : "md:col-span-4 md:col-start-9"}`}>
                    <span className="label">{tier.name}</span>
                    <span className="h-display text-[2.5rem] group-hover:text-muted md:text-[3.5rem]">{d.name}</span>
                    <span className="lede">{d.motif}</span>
                    <span className="num label">
                      {n} {n === 1 ? "piece" : "pieces"}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </Section>
    </>
  );
}
