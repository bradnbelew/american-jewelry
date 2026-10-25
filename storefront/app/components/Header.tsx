import { useCallback, useEffect, useRef, useState } from "react";
import { Form, Link, useLocation } from "react-router";

import { useCart } from "~/lib/cart";
import { CART_DRAWER_ID, SAVED_DRAWER_ID, openDialogFromLinkClick } from "~/lib/cart-drawer";
import { STORES, pieceByHandle } from "~/lib/catalog/data";
import { NAV, type NavPanel } from "~/lib/nav";

import { Pic } from "./Pic";
import { SearchDialog } from "./SearchDialog";
import { useSaved } from "./saved/SavedProvider";

/**
 * The header: the wordmark line with search and the utilities, then five primary destinations,
 * each opening a full-width panel of plain links (by kind, by design, by line, by place).
 * No promotion in a panel, one photograph at most. The phone carries the same depth as a menu
 * of accordions. The current section is marked with the 1px rule under its name.
 */
export function Header() {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [panel, setPanel] = useState<string | null>(null);
  const totalQuantity = useCart((state) => state.data.totalQuantity);
  const { count: saved, ready } = useSaved();
  const location = useLocation();
  const header = useRef<HTMLElement>(null);
  const timer = useRef<number | null>(null);

  const clearTimer = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
  };
  const closeSoon = useCallback(() => {
    clearTimer();
    timer.current = window.setTimeout(() => setPanel(null), 160);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  useEffect(() => {
    // Close everything on navigation without an effect-time state write on first render.
    const id = requestAnimationFrame(() => {
      setMenu(false);
      setPanel(null);
    });
    return () => cancelAnimationFrame(id);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!panel && !menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setPanel(null); setMenu(false); }
    };
    const onDown = (e: PointerEvent) => {
      if (header.current && !header.current.contains(e.target as Node)) setPanel(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [panel, menu]);

  const current = (p: NavPanel) => {
    const path = location.pathname;
    const royalPiece = path.startsWith("/pieces/") && pieceByHandle(path.split("/").pop() ?? "")?.tier === "royal-american";
    if (p.href === "/royal-american") return path === "/royal-american" || royalPiece;
    if (p.href === "/jewelry") return path.startsWith("/jewelry") || path.startsWith("/designs") || (path.startsWith("/pieces") && !royalPiece) || path === "/americana" || path === "/new-american";
    if (p.href === "/collections") return path.startsWith("/collections") && !path.endsWith("/bridal");
    if (p.href === "/collections/bridal") return path === "/collections/bridal" || path.startsWith("/build");
    if (p.href === "/services") return ["/services", "/commission", "/care"].includes(path);
    if (p.href === "/house") return path === "/house" || path.startsWith("/stores") || ["/services", "/commission", "/care", "/appointments"].includes(path) || path.startsWith("/journal") || path === "/policies" || path === "/natural-or-man-made";
    return path === p.href || path.startsWith(`${p.href}/`);
  };
  const open = NAV.find((p) => p.label === panel) ?? null;

  return (
    <header
      ref={header}
      className="house-header sticky top-0 z-40 border-b border-hair bg-paper"
      onMouseLeave={() => {
        if (panel) closeSoon();
      }}
      onBlur={(e) => {
        if (panel && !e.currentTarget.contains(e.relatedTarget as Node)) setPanel(null);
      }}
    >
      <div className="service-bar">
        <div className="wrap service-bar-inner">
          <Link to="/appointments" className="caps">Book a visit</Link>
          <div className="service-bar-stores">
            {STORES.map((s) => (
              <a key={s.slug} className="caps" href={`tel:${s.phone.replace(/\D/g, "")}`}>
                <span>{s.name}</span>
                <span className="service-bar-phone num">{s.phone}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="wrap">
        <div className="grid h-[4.25rem] grid-cols-[1fr_auto_1fr] items-center gap-3 md:h-20">
          <div className="flex items-center gap-2 md:gap-5">
            <button type="button" className="caps -ml-1 inline-flex h-11 w-14 items-center px-1 lg:hidden" aria-expanded={menu} aria-controls="menu" onClick={() => setMenu((v) => !v)}>
              {menu ? "Close" : "Menu"}
            </button>
            <button type="button" className="caps hidden h-11 items-center hover:text-muted lg:inline-flex" aria-haspopup="dialog" aria-expanded={search} onClick={() => setSearch(true)}>
              Search
            </button>
          </div>

          <Link to="/" className="font-display inline-flex h-11 items-center justify-self-center text-[0.95rem] uppercase tracking-[0.16em] whitespace-nowrap sm:text-[1.15rem] md:text-[1.35rem] md:tracking-[0.2em]" aria-label="American Jewelry home">
            American Jewelry
          </Link>

          <div className="flex items-center justify-end gap-5 md:gap-6">
            <Link to="/stores" className="caps hidden h-11 items-center hover:text-muted lg:inline-flex">
              Visit us
            </Link>
            <Link
              to="/saved"
              className="caps hidden h-11 items-center gap-2 hover:text-muted sm:inline-flex"
              aria-label={`Kept, ${saved} items`}
              aria-controls={SAVED_DRAWER_ID}
              aria-haspopup="dialog"
              onClick={(event) => openDialogFromLinkClick(event, SAVED_DRAWER_ID)}
            >
              Kept
              <span className="num inline-flex h-5 w-5 items-center justify-center text-[0.8125rem] text-muted">{ready && saved > 0 ? saved : ""}</span>
            </Link>
            <Link
              to="/bag"
              className="caps inline-flex h-11 items-center gap-2 hover:text-muted"
              aria-label={`Bag, ${totalQuantity} items`}
              aria-controls={CART_DRAWER_ID}
              aria-haspopup="dialog"
              onClick={(event) => openDialogFromLinkClick(event, CART_DRAWER_ID)}
            >
              Bag
              <span className="num inline-flex h-5 w-5 items-center justify-center text-[0.8125rem] text-muted">{totalQuantity > 0 ? totalQuantity : ""}</span>
            </Link>
            <Link to="/account" className="caps hidden h-11 items-center hover:text-muted lg:inline-flex">
              Account
            </Link>
          </div>
        </div>

        <nav className="hidden h-[2.8125rem] items-center justify-center gap-8 border-t border-hair lg:flex xl:gap-10" aria-label="Primary">
          {NAV.map((p) => (
            <button
              key={p.label}
              type="button"
              className="nav-item caps"
              aria-expanded={panel === p.label}
              aria-controls={`panel-${p.label.replace(/\s+/g, "-").toLowerCase()}`}
              data-current={current(p) ? "true" : undefined}
              onMouseEnter={() => { clearTimer(); timer.current = window.setTimeout(() => setPanel(p.label), 140); }}
              onClick={() => {
                clearTimer();
                setPanel((current) => current === p.label ? null : p.label);
              }}
            >
              {p.label}
            </button>
          ))}
        </nav>
      </div>

      {open && (
        <div id={`panel-${open.label.replace(/\s+/g, "-").toLowerCase()}`} className="panel hidden lg:block" onMouseEnter={clearTimer} onMouseLeave={closeSoon}>
          <Panel panel={open} />
        </div>
      )}

      <div id="menu" hidden={!menu} className="fixed inset-x-0 top-[var(--header-h)] bottom-0 overflow-y-auto bg-paper lg:hidden">
        <MobileMenu saved={ready ? saved : 0} />
      </div>

      <SearchDialog open={search} onClose={() => setSearch(false)} />
    </header>
  );
}

/** One panel: the lead link, columns of names, one photograph, one sentence. */
function Panel({ panel }: { panel: NavPanel }) {
  const cols = panel.columns.length;
  return (
    <div className="wrap grid grid-cols-12 gap-x-10 py-10">
      <div className="col-span-8 grid gap-x-8 gap-y-8" style={{ gridTemplateColumns: `repeat(${Math.max(cols, 3)}, minmax(0, 1fr))` }}>
        {panel.columns.map((c) => (
          <div key={c.title} className="flex flex-col">
            <span className="label mb-2">{c.title}</span>
            {c.links.map((l) => (
              <Link key={l.href + l.label} to={l.href} className="panel-link flex-col !items-start py-1">
                <span>{l.label}</span>
                {l.note && <span className="label -mt-0.5 block">{l.note}</span>}
              </Link>
            ))}
          </div>
        ))}
        {!panel.columns.some(c => c.links.some(l => l.href === panel.href)) && <Link to={panel.href} className="link col-span-full self-start justify-self-start">
          {panel.label === "The House" ? "Meet the house" : panel.label === "Bridal" ? "Explore bridal" : `Explore ${panel.label.toLowerCase()}`}
        </Link>}
      </div>
      {panel.photo && (
        <Link to={panel.photo.href} className="group col-span-4 flex flex-col gap-3">
          <span className="relative block aspect-[4/3] overflow-hidden">
            <Pic k={panel.photo.key} sizes="30vw" position={panel.photo.position} />
          </span>
          <span className="font-text text-[1rem] group-hover:text-muted">{panel.photo.caption}</span>
        </Link>
      )}
    </div>
  );
}

/** The phone menu carries the same five destinations and utility links. */
function MobileMenu({ saved }: { saved: number }) {
  return (
    <nav className="flex flex-col px-4 pt-4 pb-10" aria-label="Menu">
      <Form method="get" action="/search" className="flex gap-3 pb-4">
        <input name="q" className="field font-text" placeholder="Search the house" aria-label="Search" autoComplete="off" />
        <button type="submit" className="btn btn-outline">
          Go
        </button>
      </Form>
      {NAV.map((p) => (
        <details key={p.label} className="menu-group border-t border-hair">
          <summary>{p.label}</summary>
          <div className="flex flex-col gap-6 pb-6">
            <Link to={p.href} className="link self-start">
              {p.label === "The House" ? "Meet the house" : p.label === "Bridal" ? "Explore bridal" : `Explore ${p.label.toLowerCase()}`}
            </Link>
            {p.columns.map((c) => (
              <div key={c.title} className="flex flex-col">
                <span className="label mb-1">{c.title}</span>
                {c.links.map((l) => (
                  <Link key={l.href + l.label} to={l.href} className="menu-link">
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </details>
      ))}
      <div className="flex flex-col border-t border-hair pt-4">
        <Link to="/saved" className="menu-link">
          Kept{saved > 0 ? ` (${saved})` : ""}
        </Link>
        <Link to="/bag" className="menu-link">
          Bag
        </Link>
        <Link to="/account" className="menu-link">
          Account
        </Link>
        <Link to="/appointments" className="btn mt-6 self-start">
          Book a visit
        </Link>
      </div>
      <p className="label mt-10">Brentwood and Mt. Juliet, Tennessee</p>
    </nav>
  );
}
