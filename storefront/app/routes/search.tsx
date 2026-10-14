import { Form, Link } from "react-router";

import { PieceIndex } from "~/components/Catalog";
import { Section } from "~/components/Section";
import { searchCatalog, searchSuggestion } from "~/lib/catalog/browse";
import { pageMeta } from "~/lib/seo";

import type { Route } from "./+types/search";

/** /search?q=: the catalog's answer on a page of its own (the dialog's Enter key, and the no-script path). */
export function loader({ request }: Route.LoaderArgs) {
  const q = (new URL(request.url).searchParams.get("q") ?? "").trim().slice(0, 80);
  return { q, hits: searchCatalog(q, 40), suggestion: searchSuggestion(q) };
}

export const meta: Route.MetaFunction = ({ data }) => pageMeta({ title: data?.q ? `Search: ${data.q}` : "Search", description: "Search the house by piece, design, line, stone or store.", path: "/search", noindex: true });

export default function SearchPage({ loaderData }: Route.ComponentProps) {
  const { q, hits, suggestion } = loaderData;
  const pieces = hits.filter((h) => h.piece).map((h) => h.piece!);
  const others = hits.filter((h) => !h.piece);
  return (
    <>
      <Section className="utility-heading">
        <div className="flex max-w-3xl flex-col gap-6">
          <h1 className="h-display text-[3rem] md:text-[4.5rem]">Search</h1>
          <Form method="get" className="flex gap-3">
            <input key={q} name="q" defaultValue={q} className="field font-text text-[1.125rem]" placeholder="A piece, a design, a stone, a store" aria-label="Search" autoComplete="off" />
            <button type="submit" className="btn btn-outline">
              Search
            </button>
          </Form>
          {q && (
            <p className="label">
              <span className="num text-ink">{hits.length}</span> {hits.length === 1 ? "answer" : "answers"} for {q}
            </p>
          )}
        </div>
      </Section>

      {q && hits.length === 0 && (
        <Section screen>
          <p className="h-section max-w-[28ch] text-[1.75rem] md:text-[2.25rem]">No matching pieces.</p>
          {suggestion && <p className="mt-6"><Link className="link" to={`/search?q=${encodeURIComponent(suggestion)}`}>Did you mean {suggestion}?</Link></p>}
          <Link to="/jewelry" className="link mt-6">
            Browse jewelry
          </Link>
        </Section>
      )}

      {others.length > 0 && (
        <Section className="pt-10">
          <ul className="grid gap-x-10 md:grid-cols-2">
            {others.map((h) => (
              <li key={h.href + h.name} className="border-b border-hair">
                <Link to={h.href} className="group flex min-h-14 flex-col justify-center py-3">
                  <span className="font-text text-[1.125rem] group-hover:text-muted">{h.name}</span>
                  <span className="label">{h.line}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {pieces.length > 0 && (
        <Section className="pt-14 pb-8">
          <PieceIndex pieces={pieces} showLine />
          <p className="label mt-10">Price before sales tax.</p>
        </Section>
      )}
    </>
  );
}
