import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Pic } from "@/components/Pic";
import { ARTICLES } from "@/lib/journal";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Journal",
  description: "Plain, specific writing from American Jewelry about stones, making and the words we use: grading reports, ring size, how a ring is made, and what Designed in Tennessee means.",
  alternates: { canonical: "/journal" },
};

const dateLabel = (iso: string) => new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

export default function JournalPage() {
  const [first, ...rest] = ARTICLES;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Journal", href: "/journal" }])} />
      <Section className="pt-12 md:pt-20 pb-12 md:pb-16">
        <div className="flex flex-col gap-5 max-w-3xl">
          <h1 className="h-display text-[3rem] md:text-[4.5rem]">Journal</h1>
          <p className="lede measure">Plain writing about stones, making and words, from the people who do the work. Useful on its own, we hope, whether or not you buy anything.</p>
        </div>
      </Section>

      <Section reveal>
        <Link href={`/journal/${first.slug}`} className="group grid md:grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="md:col-span-7 relative aspect-[4/3] md:aspect-[3/2] overflow-hidden bg-paper img-hover">
            <Pic k={first.photo} sizes="(min-width: 768px) 58vw, 100vw" priority />
          </div>
          <div className="md:col-span-5 flex flex-col gap-4 md:pb-4">
            <span className="text-[0.8125rem] text-muted">
              {dateLabel(first.published)}, {first.minutes} minutes
            </span>
            <h2 className="h-section text-[2rem] md:text-[2.75rem] group-hover:text-muted transition-colors">{first.title}</h2>
            <p className="text-ink-2 leading-relaxed">{first.summary}</p>
          </div>
        </Link>
      </Section>

      <Section className="pt-20 md:pt-28" reveal>
        <ul className="grid md:grid-cols-3 gap-x-8 gap-y-12 hair pt-10">
          {rest.map((a) => (
            <li key={a.slug}>
              <Link href={`/journal/${a.slug}`} className="group flex flex-col gap-4">
                <div className="relative aspect-[4/3] overflow-hidden bg-paper img-hover">
                  <Pic k={a.photo} sizes="(min-width: 768px) 33vw, 100vw" />
                </div>
                <span className="text-[0.8125rem] text-muted">
                  {dateLabel(a.published)}, {a.minutes} minutes
                </span>
                <h2 className="h-section text-[1.5rem] group-hover:text-muted transition-colors">{a.title}</h2>
                <p className="text-ink-2 leading-relaxed text-[0.9375rem]">{a.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
