import { Link } from "react-router";

import { Pic } from "~/components/Pic";
import { Section } from "~/components/Section";
import { ARTICLES, articleBySlug } from "~/lib/journal";
import { articleJsonLd, breadcrumbJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/article";

export function loader({ params }: Route.LoaderArgs) {
  const a = articleBySlug(params.slug);
  if (!a) throw new Response("Not found", { status: 404 });
  return { slug: a.slug };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const a = articleBySlug(data?.slug ?? "")!;
  return pageMeta({ title: a.title, description: a.summary, path: `/journal/${a.slug}`, og: `journal/${a.slug}`, image: a.photo, type: "article" }, [articleJsonLd(a), breadcrumbJsonLd([{ name: "Journal", href: "/journal" }, { name: a.title, href: `/journal/${a.slug}` }])]);
};

const dateLabel = (iso: string) => new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function ArticlePage({ loaderData }: Route.ComponentProps) {
  const a = articleBySlug(loaderData.slug)!;
  const others = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <Section className="pt-12 md:pt-20" width="text">
        <div className="flex max-w-3xl flex-col gap-5">
          <Link to="/journal" className="label self-start hover:text-ink">
            Journal, {dateLabel(a.published)}
          </Link>
          <h1 className="h-display text-[2.5rem] md:text-[3.75rem]">{a.title}</h1>
          <p className="lede">{a.summary}</p>
        </div>
      </Section>
      <Section className="pt-10 md:pt-14" width="text">
        <div className="settle relative aspect-[16/9] overflow-hidden bg-paper">
          <Pic k={a.photo} sizes="(min-width: 1024px) 1024px, 100vw" priority />
        </div>
      </Section>
      <Section className="pt-12 md:pt-16" width="narrow">
        <article className="letter flex flex-col gap-6">
          {a.body.map((b, i) => {
            if ("h" in b)
              return (
                <h2 key={i} className="h-section pt-6 text-[1.75rem] text-ink">
                  {b.h}
                </h2>
              );
            if ("p" in b) return <p key={i}>{b.p}</p>;
            if ("list" in b)
              return (
                <ul key={i} className="flex list-disc flex-col gap-3 pl-5 marker:text-muted">
                  {b.list.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              );
            return (
              <div key={i}>
                <table className="spec text-[0.9375rem]">
                  <thead>
                    <tr>
                      {b.table.head.map((h) => (
                        <th key={h} scope="col" className="!w-auto">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.table.rows.map((r) => (
                      <tr key={r[0]}>
                        {r.map((c, j) => (
                          <td key={j} className={j === 0 ? "text-ink" : ""}>
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
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-hair pt-6">
          <p className="font-text text-ink-2">A question this did not answer?</p>
          <Link to="/appointments" className="link">
            Ask in person
          </Link>
        </div>
      </Section>
      <Section screen width="text">
        <ul className="flex flex-col">
          {others.map((o) => (
            <li key={o.slug} className="border-t border-hair">
              <Link to={`/journal/${o.slug}`} viewTransition className="group grid gap-2 py-6 md:grid-cols-12 md:gap-8">
                <span className="label md:col-span-3">{dateLabel(o.published)}</span>
                <span className="h-item text-[1.375rem] group-hover:text-muted md:col-span-9">{o.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
