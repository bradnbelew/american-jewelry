import { Link } from "react-router";

import { Pic } from "~/components/Pic";
import { Section } from "~/components/Section";
import { ARTICLES } from "~/lib/journal";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/journal";

export const meta: Route.MetaFunction = () =>
  pageMeta(
    { title: "Journal", description: "Plain writing from American Jewelry about stones, making and the words we use: grading reports, ring size, how a ring is made, what Designed in Tennessee means.", path: "/journal", og: "pages/journal" },
    [breadcrumbJsonLd([{ name: "Journal", href: "/journal" }])],
  );

const dateLabel = (iso: string) => new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

/** A list: date, title, one line. One photograph, for the first entry only. */
export default function JournalPage() {
  const [first, ...rest] = ARTICLES;
  return (
    <>
      <Section className="pt-12 pb-12 md:pt-20 md:pb-16">
        <h1 className="h-display text-[3rem] md:text-[4.5rem]">Journal</h1>
      </Section>

      <Section>
        <Link to={`/journal/${first.slug}`} viewTransition className="group grid items-end gap-8 md:grid-cols-12 md:gap-12">
          <div className="settle relative aspect-[4/3] overflow-hidden bg-paper md:col-span-7 md:aspect-[3/2]">
            <Pic k={first.photo} sizes="(min-width: 768px) 58vw, 100vw" priority />
          </div>
          <div className="flex flex-col gap-4 md:col-span-5 md:pb-4">
            <span className="label">{dateLabel(first.published)}</span>
            <h2 className="h-section text-[2rem] group-hover:text-muted md:text-[2.75rem]">{first.title}</h2>
            <p className="font-text text-ink-2">{first.summary}</p>
          </div>
        </Link>
      </Section>

      <Section screen width="text">
        <ul className="flex flex-col">
          {rest.map((a) => (
            <li key={a.slug} className="border-t border-hair">
              <Link to={`/journal/${a.slug}`} viewTransition className="group grid gap-2 py-7 md:grid-cols-12 md:gap-8">
                <span className="label md:col-span-3">{dateLabel(a.published)}</span>
                <span className="flex flex-col gap-1 md:col-span-9">
                  <span className="h-item text-[1.5rem] group-hover:text-muted">{a.title}</span>
                  <span className="font-text text-[0.9375rem] text-ink-2">{a.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
