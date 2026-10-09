import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PageFallback } from "@/components/PageFallback";
import { Section } from "@/components/Section";
import { Pic } from "@/components/Pic";
import { ARTICLES, articleBySlug } from "@/lib/journal";
import { JsonLd, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = articleBySlug(slug);
  return a ? { title: a.title, description: a.summary, alternates: { canonical: `/journal/${a.slug}` }, openGraph: { type: "article", publishedTime: a.published } } : {};
}

const dateLabel = (iso: string) => new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<PageFallback />}>
      <Content params={params} />
    </Suspense>
  );
}

async function Content({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) notFound();
  const others = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={articleJsonLd(a)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Journal", href: "/journal" }, { name: a.title, href: `/journal/${a.slug}` }])} />
      <Section className="pt-12 md:pt-20" width="text">
        <div className="flex flex-col gap-5 max-w-3xl">
          <Link href="/journal" className="text-[0.8125rem] text-muted hover:text-ink self-start">
            Journal
          </Link>
          <h1 className="h-display text-[2.5rem] md:text-[3.75rem]">{a.title}</h1>
          <p className="lede">{a.summary}</p>
          <span className="text-[0.8125rem] text-muted">
            {dateLabel(a.published)}, {a.minutes} minutes. By the house.
          </span>
        </div>
      </Section>
      <Section className="pt-10 md:pt-14" width="text">
        <div className="relative aspect-[16/9] overflow-hidden bg-paper">
          <Pic k={a.photo} sizes="(min-width: 1024px) 1024px, 100vw" priority />
        </div>
      </Section>
      <Section className="pt-12 md:pt-16" width="narrow">
        <article className="flex flex-col gap-6 text-ink-2 leading-[1.75] text-[1.0625rem]">
          {a.body.map((b, i) => {
            if ("h" in b)
              return (
                <h2 key={i} className="h-section text-[1.75rem] text-ink pt-6">
                  {b.h}
                </h2>
              );
            if ("p" in b) return <p key={i}>{b.p}</p>;
            if ("list" in b)
              return (
                <ul key={i} className="flex flex-col gap-3 pl-5 list-disc marker:text-muted">
                  {b.list.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              );
            return (
              <div key={i} className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-[0.9375rem] hair">
                  <thead>
                    <tr>
                      {b.table.head.map((h) => (
                        <th key={h} className="text-left py-3 pr-6 h-item text-[1.0625rem] text-ink font-normal">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.table.rows.map((r) => (
                      <tr key={r[0]} className="border-t border-hair align-top">
                        {r.map((c, j) => (
                          <td key={j} className={`py-3 pr-6 ${j === 0 ? "text-ink" : ""}`}>
                            {c}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </article>
        <div className="hair mt-14 pt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-ink-2">A question this did not answer?</p>
          <Link href="/appointments" className="link">
            Ask in person
          </Link>
        </div>
      </Section>
      <Section className="pt-24 md:pt-32" reveal>
        <h2 className="h-section text-[1.75rem] md:text-[2.25rem] mb-10">More from the journal</h2>
        <ul className="grid md:grid-cols-3 gap-x-8 gap-y-12">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/journal/${o.slug}`} className="group flex flex-col gap-4">
                <div className="relative aspect-[4/3] overflow-hidden bg-paper img-hover">
                  <Pic k={o.photo} sizes="(min-width: 768px) 33vw, 100vw" />
                </div>
                <h3 className="h-section text-[1.375rem] group-hover:text-muted transition-colors">{o.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
