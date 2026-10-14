import { useEffect, useMemo, useRef, useState } from "react";
import { Form, Link, useLocation } from "react-router";

import { searchCatalog, searchSuggestion } from "~/lib/catalog/browse";
import { PIECE_PHOTOS } from "~/lib/catalog/photos";

import { Pic } from "./Pic";

export const SEARCH_DIALOG_ID = "search";

/**
 * Search: a paper sheet under the header with one field and the catalog's answers as they are typed.
 * Pieces, designs, lines, collections, kinds and pages. Enter opens /search with the same words.
 */
export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState("");
  const location = useLocation();
  const hits = useMemo(() => searchCatalog(q, 8), [q]);
  const suggestion = useMemo(() => searchSuggestion(q), [q]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      requestAnimationFrame(() => input.current?.focus());
    }
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    // Close on navigation without an effect-time state write on first render.
    const id = requestAnimationFrame(() => {
      if (dialog.current?.open) onClose();
    });
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search]);

  return (
    <dialog
      ref={dialog}
      id={SEARCH_DIALOG_ID}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialog.current) onClose();
      }}
      className="m-0 h-auto max-h-[100dvh] w-screen max-w-none border-0 border-b border-hair bg-paper p-0 text-ink backdrop:bg-ink/40"
      aria-label="Search the house"
    >
      <div className="wrap py-6 md:py-8">
        <Form method="get" action="/search" className="flex items-end gap-4" onSubmit={() => onClose()}>
          <label className="flex min-w-0 flex-1 flex-col gap-2">
            <span className="label">Search</span>
            <input ref={input} name="q" value={q} onChange={(e) => setQ(e.target.value)} className="field font-text text-[1.125rem]" placeholder="A piece, a design, a stone, a store" autoComplete="off" aria-controls="search-results" />
          </label>
          <button type="submit" className="btn btn-outline">
            Search
          </button>
          <button type="button" className="link ml-2" onClick={onClose}>
            Close
          </button>
        </Form>
        <div id="search-results" aria-live="polite" className="mt-2">
          {q.trim() && hits.length === 0 && <p className="font-text py-6 text-ink-2">No results for “{q}”. {suggestion ? <Link className="link" to={`/search?q=${encodeURIComponent(suggestion)}`}>Did you mean {suggestion}?</Link> : 'Try a design, a kind of piece or a stone.'}</p>}
          {hits.length > 0 && (
            <ul className="grid gap-x-10 md:grid-cols-2">
              {hits.map((h) => {
                const photo = h.piece ? (PIECE_PHOTOS[h.piece.handle] ?? ["hero-box"])[0] : null;
                return (
                  <li key={h.href + h.name} className="border-b border-hair">
                    <Link to={h.href} className="group grid min-h-[3.5rem] grid-cols-[3rem_1fr] items-center gap-4 py-2">
                      <span className="relative block aspect-square overflow-hidden">{photo ? <Pic k={photo} sizes="48px" className="float" /> : <span className="label flex h-full items-center">{h.kind === "page" ? "Page" : h.kind === "design" ? "Design" : h.kind === "line" ? "Line" : h.kind === "collection" ? "Set" : "Kind"}</span>}</span>
                      <span className="flex min-w-0 flex-col">
                        <span className="font-text text-[1.0625rem] group-hover:text-muted">{h.name}</span>
                        <span className="label truncate">{h.line}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
          {!q.trim() && (
            <div className="grid gap-x-10 gap-y-6 pt-6 md:grid-cols-3">
              <Column title="By kind" links={[["/jewelry/rings", "Rings"], ["/jewelry/necklaces", "Necklaces"], ["/jewelry/earrings", "Earrings"], ["/jewelry/bracelets", "Bracelets"]]} />
              <Column title="By design" links={[["/designs/shooting-star", "Shooting Star"], ["/designs/prism", "Prism"], ["/designs/signal", "Signal"], ["/designs/grid", "Grid"]]} />
              <Column title="Often looked for" links={[["/royal-american", "High Jewelry · Royal American"], ["/new-american", "Lab-grown diamonds"], ["/build/ring", "Build a ring"], ["/stores", "Stores and hours"]]} />
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}

function Column({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="label mb-1">{title}</span>
      {links.map(([href, label]) => (
        <Link key={href} to={href} className="panel-link">
          {label}
        </Link>
      ))}
    </div>
  );
}
