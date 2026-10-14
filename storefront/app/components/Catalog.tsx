import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Form, Link, useLocation, useNavigation, useSearchParams, useSubmit } from "react-router";

import { CATEGORIES, SORTS, activeCount, applyQuery, filterGroups, readQuery, matchingVersion, matchingVersions, type BrowseQuery, type FilterGroup } from "~/lib/catalog/browse";
import { formatPrice, startingPrice } from "~/lib/catalog/data";
import { PIECE_PHOTOS } from "~/lib/catalog/photos";
import type { Piece } from "~/lib/catalog/types";
import { METAL_LABEL, PIECE_TYPE_LABEL } from "~/lib/catalog/types";

import { Pic } from "./Pic";
import { Section } from "./Section";

/** The price line on a card or a row: fixed, "From $" when the stone varies, "Price on request" for one-of-ones. */
export const priceLine = (p: Piece, q?: BrowseQuery) => {
  if (p.concept) return "Design concept";
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
    <Link to={`/pieces/${piece.handle}${selected.size ? `?${selected}` : ''}`} viewTransition className="group flex min-w-0 flex-col gap-4">
      <span className={`piece-card-image relative block aspect-[4/5] overflow-hidden ${piece.oneOfOne ? "is-royal" : ""}`}>
        <Pic k={key} sizes={sizes} priority={priority} />
      </span>
      <span className="piece-card-copy flex min-w-0 flex-col gap-0.5">
        <span className="h-item text-[1.125rem] group-hover:text-muted md:text-[1.25rem]">{piece.name}</span>
        {!piece.concept && (showLine || version || piece.tier === "new-american") && <span className="label">
          {showLine ? `${piece.tier === "royal-american" ? "Royal American" : piece.tier === "americana" ? "Americana" : "New American"}. ` : ""}
          {version ? version.origin === "man-made" ? "Lab-grown diamond" : version.name : piece.tier === "new-american" ? "Lab-grown diamond" : ""}
        </span>}
        <span className="num text-[0.9375rem] text-ink-2">{priceLine(piece, query)}</span>
      </span>
    </Link>
  );
}

/** Aligned product rows: three across on desktop and two on phone. */
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
  return <PieceIndex pieces={pieces} showLine={showLine} />;
}

/** The kinds, as a row of names with their counts: the index of the house. */
export function KindsRow({ current, pieces, line }: { current?: string; pieces?: Piece[]; line?: string }) {
  const [params] = useSearchParams();
  const context = new URLSearchParams(params);
  if (line) context.set("line",line);
  const query = context.size ? "?" + context : "";
  return (
    <nav aria-label="By kind" className="browse-kinds">
      <Link to={"/jewelry"+query} className={`inline-flex min-h-11 items-baseline border-b ${!current ? "border-ink" : "border-transparent hover:border-hair"}`} aria-current={!current ? "page" : undefined}><span className="h-item">All</span></Link>
      {CATEGORIES.map((c) => {
        const n = (pieces ?? []).filter((p) => c.types.includes(p.pieceType)).length;
        return (
          <Link key={c.slug} to={`/jewelry/${c.slug}${query}`} className={`inline-flex min-h-11 items-baseline gap-2 border-b ${current === c.slug ? "border-ink" : "border-transparent hover:border-hair"}`} aria-current={current === c.slug ? "page" : undefined}>
            <span className="h-item text-[1.25rem] md:text-[1.5rem]">{c.name}</span>
            {pieces && <span className="num label">{n}</span>}
          </Link>
        );
      })}
    </nav>
  );
}

/** Every browse surface shares the same reversible filter and sorting model. */
export function Browse({title, base, kind, hide = [], children, emptyLine}: {
  title:string; line?:string; base:Piece[]; kind?:string; hide?:FilterGroup["key"][]; children?:ReactNode; emptyLine?:string;
}) {
  return <>
    <Section className="browse-heading"><div className="browse-title-row"><h1>{title}</h1><KindsRow current={kind} /></div></Section>
    {children}
    <Section className="browse-layout"><ProductResults base={base} hide={hide} emptyLine={emptyLine} /></Section>
  </>;
}

export function ProductResults({base, hide = [], emptyLine = "No pieces match these filters."}: {
  base:Piece[]; hide?:FilterGroup["key"][]; emptyLine?:string;
}) {
  const [params] = useSearchParams();
  const selectedQuery = readQuery(params);
  // The parent chooses the line. Stale URLs must never override that context.
  if (hide.includes("line")) selectedQuery.line = [];
  const hasPrices = base.some(piece => !piece.concept && piece.versions.some(version => version.priceCents !== null));
  const sorts = hasPrices ? SORTS : SORTS.filter(sort => !sort.key.startsWith("price"));
  const q: BrowseQuery = {...selectedQuery, sort: sorts.some(sort => sort.key === selectedQuery.sort) ? selectedQuery.sort : "house"};
  const pieces = applyQuery(base, q);
  const active = activeCount(q);
  const navigation = useNavigation();
  const submit = useSubmit();
  const pathname = useLocation().pathname;
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const id = useId();
  const titleId = id + "-filter-title";
  const groups = filterGroups(base, q, hide);
  const close = () => { dialog.current?.close(); setOpen(false); };
  useEffect(() => { close(); }, [params.toString(), pathname]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  const clearParams = new URLSearchParams();
  if (q.sort !== "house") clearParams.set("sort",q.sort);
  if (hide.includes("line") && params.has("line")) clearParams.set("line",params.get("line")!);
  const clearHref = pathname + (clearParams.size ? "?" + clearParams : "");
  return <div className="product-results" aria-busy={navigation.state !== "idle"}>
    <div className="results-toolbar">
      <p className="label" role="status">{pieces.length} {pieces.length === 1 ? "piece" : "pieces"}</p>
      <div className="results-controls">
        <Form method="get" onChange={e => submit(e.currentTarget,{method:"get",preventScrollReset:true,replace:true})}>
          {[...params].filter(([key]) => key !== "sort").map(([key,value],i) => <input key={key+i} type="hidden" name={key} value={value} />)}
          <label className="sort-control"><span>Sort</span><select name="sort" aria-label="Sort pieces" value={q.sort} onChange={() => undefined}>{sorts.map(sort => <option key={sort.key} value={sort.key}>{sort.label}</option>)}</select></label>
          <noscript><button type="submit" className="link">Sort pieces</button></noscript>
        </Form>
        {groups.length > 0 && <button type="button" className="filter-trigger" aria-haspopup="dialog" onClick={() => { setOpen(true); dialog.current?.showModal(); }}>Filter{active ? " ("+active+")" : ""}<span aria-hidden="true">+</span></button>}
      </div>
    </div>
    {active > 0 && <div className="filter-chips" aria-label="Selected filters">{groups.flatMap(g => g.options.filter(o => (q[g.key] as string[]).includes(o.value)).map(o => {
      const next = new URLSearchParams(params);
      next.delete(g.key);
      (q[g.key] as string[]).filter(value => value !== o.value).forEach(value => next.append(g.key,value));
      return <Link key={g.key+o.value} to={pathname+(next.size ? "?"+next : "")} preventScrollReset replace aria-label={"Remove "+o.label+" filter"}>{o.label}<span aria-hidden="true">×</span></Link>;
    }))}<Link to={clearHref} preventScrollReset replace>Clear all</Link></div>}
    {pieces.length ? <PieceIndex pieces={pieces} query={q} /> : <div className="browse-empty"><p>{emptyLine}</p><Link className="link" to={clearHref} preventScrollReset>Clear filters</Link></div>}
    <dialog ref={dialog} className="filter-dialog" aria-labelledby={titleId} onClose={() => setOpen(false)} onClick={e => { if(e.target === e.currentTarget) close(); }}>
      <div className="filter-dialog-shell">
        <div className="filter-dialog-heading"><h2 id={titleId}>Filter</h2><button type="button" onClick={close}>Close</button></div>
        {open && <FilterForm key={params.toString()} base={base} hide={hide} q={q} contextLine={hide.includes("line") ? params.get("line") : null} close={close} />}
      </div>
    </dialog>
    <noscript><details><summary>Filter pieces</summary><FilterForm base={base} hide={hide} q={q} contextLine={hide.includes("line") ? params.get("line") : null} close={() => undefined} /></details></noscript>
  </div>;
}

function FilterForm({base,hide,q,contextLine,close}: {base:Piece[]; hide:FilterGroup["key"][]; q:BrowseQuery; contextLine?: string | null; close:()=>void}) {
  const [draft,setDraft] = useState(q);
  const empty = readQuery(new URLSearchParams());
  const groups = filterGroups(base,empty,hide);
  const count = applyQuery(base,draft).length;
  const toggle = (key:FilterGroup["key"],value:string) => setDraft(previous => ({...previous,[key]:(previous[key] as string[]).includes(value) ? (previous[key] as string[]).filter(v => v!==value) : [...previous[key],value]}));
  return <Form method="get" preventScrollReset replace className="filter-form" onSubmit={close}>
    <input type="hidden" name="sort" value={q.sort} />
    {contextLine && <input type="hidden" name="line" value={contextLine} />}
    {(["design","metal","stone","price","production","line"] as FilterGroup["key"][]).filter(key => !groups.some(group => group.key === key)).flatMap(key => (draft[key] as string[]).map(value => <input key={key+value} type="hidden" name={key} value={value} />))}
    <div className="filter-dialog-options">{groups.map((group,index) => <details key={group.key} open={index === 0 || draft[group.key].length > 0}>
      <summary>{group.label}{draft[group.key].length ? " ("+draft[group.key].length+")" : ""}</summary>
      <fieldset><legend className="sr-only">{group.label}</legend>{group.options.map(option => {
        const selected = (draft[group.key] as string[]).includes(option.value);
        const n = applyQuery(base,{...draft,[group.key]:[option.value]}).length;
        return <label key={option.value} className="check"><input type="checkbox" name={group.key} value={option.value} checked={selected} disabled={!selected && n===0} onChange={() => toggle(group.key,option.value)} /><span>{option.label}</span><span className="label num">{n}</span></label>;
      })}</fieldset>
    </details>)}</div>
    <div className="filter-dialog-actions"><button type="button" className="link" onClick={() => setDraft({...empty,sort:q.sort})}>Clear all</button><button className="btn" type="submit">Show {count} {count===1 ? "piece" : "pieces"}</button></div>
  </Form>;
}
