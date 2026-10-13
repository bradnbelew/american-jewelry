import { Link } from "react-router";

import { Section } from "~/components/Section";
import { COLLECTIONS, piecesForCollection } from "~/lib/catalog/data";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/collections";

export const meta: Route.MetaFunction = () =>
  pageMeta({ title: "Collections", description: "Family, Bridal, Signets and The Stack: the house pieces gathered by the life they are for.", path: "/collections" }, [breadcrumbJsonLd([{ name: "Collections", href: "/collections" }])]);

/** The collections as a ledger: name, one sentence, the count. Words alone; the photographs wait on each collection's page. */
export default function CollectionsPage() {
  return (
    <>
      <Section className="pt-10 md:pt-16">
        <div className="flex max-w-3xl flex-col gap-4">
          <h1 className="h-display text-[3rem] md:text-[4.5rem]">Collections</h1>
          <p className="lede measure">Pieces gathered by the life they are for, across the designs of the house.</p>
        </div>
      </Section>
      <Section className="pt-12 md:pt-20">
        <ol className="border-t border-hair">
          {COLLECTIONS.map((c) => {
            const n = piecesForCollection(c.slug).length;
            return (
              <li key={c.slug} className="border-b border-hair">
                <Link to={`/collections/${c.slug}`} viewTransition className="group grid items-baseline gap-x-8 gap-y-2 py-8 md:grid-cols-12 md:py-10">
                  <span className="h-display text-[2.25rem] group-hover:text-muted md:col-span-5 md:text-[3rem]">{c.name}</span>
                  <span className="lede md:col-span-5">{c.intro}</span>
                  <span className="num label md:col-span-2 md:text-right">
                    {n} {n === 1 ? "piece" : "pieces"}
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
