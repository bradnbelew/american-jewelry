import { useState, type ReactNode } from "react";
import { Form, Link, useLocation, useSearchParams, useSubmit } from "react-router";

import { CATEGORIES, SORTS, activeCount, applyQuery, filterGroups, readQuery, whatItIs, matchingVersion, matchingVersions, type BrowseQuery, type FilterGroup } from "~/lib/catalog/browse";
import { formatPrice, startingPrice } from "~/lib/catalog/data";
import { PIECE_PHOTOS } from "~/lib/catalog/photos";
import type { Piece } from "~/lib/catalog/types";
import { METAL_LABEL, PIECE_TYPE_LABEL } from "~/lib/catalog/types";

import { Pic } from "./Pic";
import { Section } from "./Section";
import { useDesign } from "./DesignPreview";

/** The price line on a card or a row: fixed, "From $" when the stone varies, "Price on request" for one-of-ones. */
export const priceLine = (p: Piece, q?: BrowseQuery) => {
  const price = q ? matchingVersion(p, q)?.priceCents ?? null : startingPrice(p);
  const count = q ? matchingVersions(p, q).length : p.versions.length;
  return price === null ? "Price on request" : count > 1 ? `From ${formatPrice(price)}` : formatPrice(price);
};

/** One piece in the index: the photograph on the page's ground, the name, what it is, the price. Nothing else. */
export function PieceCard({ piece, showLine = false, sizes = "(min-width: 1024px) 28vw, 50vw", priority = false, query }: { piece: Piece; showLine?: boolean; sizes?: string; priority?: boolean; query?: BrowseQuery }) {
  const key = (PIECE_PHOTOS[piece.handle] ?? ["hero-box"])[0];
  const version = query && (query.stone.length || query.price.length) ? matchingVersion(piece, query) : undefined;
  const selected = new URLSearchParams();
  if (version) selected.set("Version", version.name);
  const metal = query?.metal.find((m) => piece.metals.includes(m));
  if (metal) selected.set("Metal", METAL_LABEL[metal]);
  return (
    <Link to={`/pieces/${piece.handle}${selected.size ? `?${selected}` : ''}`} viewTransition className="group flex min-w-0 flex-col gap-3">
      <span className="settle relative block aspect-[4/5] overflow-hidden">
        <Pic k={key} sizes={sizes} priority={priority} />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="h-item text-[1.125rem] group-hover:text-muted md:text-[1.25rem]">{piece.name}</span>
        <span className="label">
          {showLine ? `${piece.tier === "royal-american" ? "Royal American" : piece.tier === "americana" ? "Americana" : "New American"}. ` : ""}
          {version ? version.origin === "man-made" ? "Lab-grown diamond" : version.name : whatItIs(piece)}
        </span>
        <span className="num text-[0.9375rem] text-ink-2">{priceLine(piece, query)}</span>
      </span>
    </Link>
  );
}

/** The index grid: three across on a desk, two in the hand, the middle column set lower so no row reads as a row of tiles. */
export function PieceIndex({ pieces, showLine = false, query }: { pieces: Piece[]; showLine?: boolean; query?: BrowseQuery }) {
  return (
    <ul className="piece-grid grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-8 lg:grid-cols-3 lg:gap-y-14">
      {pieces.map((p, i) => (
        <li key={p.handle}>
          <PieceCard piece={p} showLine={showLine} priority={i < 3} query={query} />
        </li>
      ))}
    </ul>
  );
}

/** The row's second line in a ledger: the piece's own facts (what it is, which metals), never the line's refrain. */
export const pieceLine = (p: Piece) => {
  const metals = Array.from(new Set(p.metals.map((m) => METAL_LABEL[m].replace(/^1[48]k /, "").toLowerCase())));
  const list = metals.length === 1 ? metals[0] : metals.length === 2 ? `${metals[0]} or ${metals[1]}` : `${metals.slice(0, -1).join(", ")} or ${metals[metals.length - 1]}`;
  return `${PIECE_TYPE_LABEL[p.pieceType]}. ${list.charAt(0).toUpperCase()}${list.slice(1)}.`;
};

/** A line's pieces as a ledger: one row per piece, one photograph per row, names and prices on one line. */
export function PieceLedger({ pieces, showLine = false }: { pieces: Piece[]; showLine?: boolean }) {
  const mode = useDesign();
  if (mode !== "classic") return <PieceIndex pieces={pieces} showLine={showLine} />;
  return (
    <ol className="border-t border-hair">
      {pieces.map((p) => {
        const key = (PIECE_PHOTOS[p.handle] ?? ["hero-box"])[0];
        return (
          <li key={p.handle} className="border-b border-hair">
            <Link to={`/pieces/${p.handle}`} viewTransition className="group grid grid-cols-[5rem_1fr_auto] items-start gap-x-6 py-4 md:grid-cols-[7.5rem_1fr_auto] md:gap-x-8 md:py-6">
              <span className="relative block aspect-square overflow-hidden">
                <Pic k={key} sizes="120px" />
              </span>
              <span className="flex min-w-0 flex-col gap-1 pt-1">
                <span className="h-item text-[1.25rem] leading-none group-hover:text-muted md:text-[1.5rem]">{p.name}</span>
                <span className="label">
                  {showLine ? `${p.tier === "royal-american" ? "Royal American" : p.tier === "americana" ? "Americana" : "New American"}. ` : ""}
                  {pieceLine(p)}
                </span>
              </span>
              <span className="num pt-1 text-right text-[0.9375rem] leading-none text-ink-2 md:text-[1rem]">{priceLine(p)}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

/** The kinds, as a row of names with their counts: the index of the house. */
export function KindsRow({ current, pieces }: { current?: string; pieces?: Piece[] }) {
  return (
    <nav aria-label="By kind" className="flex flex-wrap gap-x-8 gap-y-2">
      {CATEGORIES.map((c) => {
        const n = (pieces ?? []).filter((p) => c.types.includes(p.pieceType)).length;
        return (
          <Link key={c.slug} to={`/jewelry/${c.slug}`} className={`inline-flex min-h-11 items-baseline gap-2 border-b ${current === c.slug ? "border-ink" : "border-transparent hover:border-hair"}`} aria-current={current === c.slug ? "page" : undefined}>
            <span className="h-item text-[1.25rem] md:text-[1.5rem]">{c.name}</span>
            {pieces && <span className="num label">{n}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

/**
 * A browse page: the name, one sentence, the kinds, then the filters beside the index.
 * Filters are a GET form (they work before JavaScript); with JavaScript each change submits itself.
 * Built for a catalog of thousands; honest when there are twenty-one.
 */
export function Browse({
  title,
  line,
  base,
  kind,
  hide = [],
  children,
  emptyLine = "Nothing is listed here yet.",
}: {
  title: string;
  line?: string;
  base: Piece[];
  /** the current category, to mark it in the kinds row */
  kind?: string;
  hide?: FilterGroup["key"][];
  /** what comes before the index (an opener, a plate) */
  children?: ReactNode;
  emptyLine?: string;
}) {
  const [params] = useSearchParams();
  const q = readQuery(params);
  const pieces = applyQuery(base, q);
  const groups = filterGroups(base, q, hide);
  const active = activeCount(q);
  const submit = useSubmit();
  const clearHref = useLocation().pathname;

  return (
    <>
      <Section className="pt-10 md:pt-16">
        <div className="grid gap-6 md:grid-cols-12 md:gap-10">
          <div className="flex flex-col gap-4 md:col-span-7">
            <h1 className="h-display text-[3rem] md:text-[4.5rem]">{title}</h1>
            {line && <p className="lede measure">{line}</p>}
          </div>
          <div className="md:col-span-5 md:self-end md:justify-self-end">
            <KindsRow current={kind} />
          </div>
        </div>
      </Section>

      {children}

      <Section className="pt-10 md:pt-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-10">
          <aside className="lg:col-span-3" aria-label="Filter and sort">
            <details className="lg:hidden" key={params.toString()}>
              <summary className="caps inline-flex h-11 cursor-pointer list-none items-center gap-2 border-b border-ink">
                Filter and sort{active > 0 ? <span className="num">({active})</span> : null}
              </summary>
              <div className="mobile-filters">
                <Filters groups={groups} q={q} active={active} clearHref={clearHref} submit={() => undefined} mobile base={base} />
              </div>
            </details>
            <div className="hidden lg:sticky lg:top-36 lg:block">
              <Filters key={params.toString()} groups={groups} q={q} active={active} clearHref={clearHref} submit={(form) => submit(form, { method: "get", preventScrollReset: true, replace: true })} />
            </div>
          </aside>

          <div className="lg:col-span-9">
            {active > 0 && <div className="filter-chips" aria-label="Selected filters">{groups.flatMap((g) => g.options.filter((o) => (q[g.key] as string[]).includes(o.value)).map((o) => {
              const next = new URLSearchParams(params);
              next.delete(g.key);
              (q[g.key] as string[]).filter((value) => value !== o.value).forEach((value) => next.append(g.key, value));
              if (g.key === 'production') { next.delete('stone'); q.stone.forEach((s) => next.append('stone', s)); }
              return <Link key={`${g.key}-${o.value}`} to={`${clearHref}?${next}`} preventScrollReset aria-label={`Remove ${o.label} filter`}>{o.label} <span aria-hidden="true">×</span></Link>;
            }))}<Link to={clearHref} preventScrollReset>Clear all</Link></div>}
            <div className="mb-8 flex items-baseline justify-between gap-6 border-b border-hair pb-3">
              <p className="label">
                <span className="num text-ink">{pieces.length}</span> {pieces.length === 1 ? "piece" : "pieces"}
                {active > 0 && base.length !== pieces.length ? <span className="num"> of {base.length}</span> : null}
              </p>
              <p className="label">Price before sales tax.</p>
            </div>
            {base.length === 0 ? (
              <Empty line={emptyLine} />
            ) : pieces.length === 0 ? (
              <Empty line="No piece matches these choices.">
                <Link to={clearHref} className="link">
                  Clear the filters
                </Link>
              </Empty>
            ) : (
              <PieceIndex pieces={pieces} query={q} showLine={!q.line.length && !hide.includes("line")} />
            )}
          </div>
        </div>
      </Section>
    </>
  );
}

function Empty({ line, children }: { line: string; children?: ReactNode }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-start justify-center gap-6">
      <p className="h-section max-w-[28ch] text-[1.75rem] md:text-[2.25rem]">{line}</p>
      {children ?? (
        <Link to="/jewelry" className="link">
          Every piece in the house
        </Link>
      )}
    </div>
  );
}

function Filters({ groups, q, active, clearHref, submit, mobile = false, base = [] }: { groups: FilterGroup[]; q: ReturnType<typeof readQuery>; active: number; clearHref: string; submit: (form: HTMLFormElement) => void; mobile?: boolean; base?: Piece[] }) {
  const [count, setCount] = useState(() => applyQuery(base, q).length);
  return (
    <Form method="get" preventScrollReset replace className="flex flex-col gap-5" onChange={(e) => {
      if (mobile) { const next = new URLSearchParams(); new FormData(e.currentTarget).forEach((v, k) => { if (typeof v === 'string') next.append(k, v); }); setCount(applyQuery(base, readQuery(next)).length); }
      else submit(e.currentTarget);
    }}>
      <label className="flex flex-col gap-2">
        <span className="label">Sort</span>
        <select name="sort" defaultValue={q.sort} className="field" aria-label="Sort">
          {SORTS.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>
      </label>
      {groups.map((g) => (
        <details key={g.key} className="border-t border-hair" open={mobile ? undefined : true}>
          <summary className="label py-3">{g.label}{q[g.key].length ? ` (${q[g.key].length})` : ''}</summary>
          <fieldset><legend className="sr-only">{g.label}</legend>
          {g.options.map((o) => (
            <label key={o.value} className="check">
              <input type="checkbox" name={g.key} value={o.value} defaultChecked={(q[g.key] as string[]).includes(o.value)} />
              <span className="flex-1">{o.label}</span>
              <span className="num label">{o.count}</span>
            </label>
          ))}
          </fieldset>
        </details>
      ))}
      <div className="filter-actions flex items-center gap-6 border-t border-hair pt-4">
        <button type="submit" className="btn btn-outline">
          {mobile ? `Show ${count} ${count === 1 ? 'piece' : 'pieces'}` : 'Apply'}
        </button>
        {active > 0 && (
          <Link to={clearHref} className="link" preventScrollReset>
            Clear
          </Link>
        )}
      </div>
    </Form>
  );
}
