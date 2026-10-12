import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";

import { useCart } from "~/lib/cart";
import { CART_DRAWER_ID, SAVED_DRAWER_ID, openDialogFromLinkClick } from "~/lib/cart-drawer";

import { useSaved } from "./saved/SavedProvider";

export const NAV: { href: string; label: string }[] = [
  { href: "/royal-american", label: "Royal American" },
  { href: "/americana", label: "Americana" },
  { href: "/new-american", label: "New American" },
  { href: "/collections/bridal", label: "Bridal" },
  { href: "/build/ring", label: "Build a ring" },
  { href: "/house", label: "The House" },
  { href: "/services", label: "Services" },
  { href: "/stores", label: "Stores" },
];

/** The wordmark line. Nothing above it. Eight names beneath it on desktop. */
export function Header() {
  const [open, setOpen] = useState(false);
  const totalQuantity = useCart((state) => state.data.totalQuantity);
  const { count: saved, ready } = useSaved();
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    // Close the menu on navigation without an effect-time state write on first render.
    const id = requestAnimationFrame(() => setOpen(false));
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-hair bg-paper">
      <div className="wrap">
        <div className="grid h-[4.25rem] grid-cols-[auto_1fr_auto] items-center gap-3 md:h-20 md:grid-cols-[1fr_auto_1fr]">
          <div className="flex items-center gap-5">
            <button
              type="button"
              className="caps -ml-1 inline-flex h-10 w-14 items-center px-1 lg:hidden"
              aria-expanded={open}
              aria-controls="menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>

          <Link
            to="/"
            className="font-display justify-self-center text-[1rem] uppercase tracking-[0.22em] whitespace-nowrap sm:text-[1.25rem] md:text-[1.625rem] md:tracking-[0.28em]"
            aria-label="American Jewelry home"
          >
            American Jewelry
          </Link>

          <div className="flex items-center justify-end gap-6">
            <Link to="/appointments" className="caps hidden hover:text-muted md:inline">
              Appointment
            </Link>
            <Link
              to="/saved"
              className="caps hidden h-10 items-center gap-2 hover:text-muted sm:inline-flex"
              aria-label={`Kept, ${saved} items`}
              aria-controls={SAVED_DRAWER_ID}
              aria-haspopup="dialog"
              onClick={(event) => openDialogFromLinkClick(event, SAVED_DRAWER_ID)}
            >
              Kept
              <span className="num inline-flex h-5 w-5 items-center justify-center text-[0.625rem] text-muted">{ready && saved > 0 ? saved : ""}</span>
            </Link>
            <Link
              to="/bag"
              className="caps inline-flex h-10 items-center gap-2 hover:text-muted"
              aria-label={`Bag, ${totalQuantity} items`}
              aria-controls={CART_DRAWER_ID}
              aria-haspopup="dialog"
              onClick={(event) => openDialogFromLinkClick(event, CART_DRAWER_ID)}
            >
              Bag
              <span className="num inline-flex h-5 w-5 items-center justify-center text-[0.625rem] text-muted">{totalQuantity > 0 ? totalQuantity : ""}</span>
            </Link>
          </div>
        </div>

        <nav className="hidden h-11 items-center justify-center gap-9 border-t border-hair lg:flex" aria-label="Primary">
          {NAV.map((l) => (
            <NavLink
              key={l.href}
              to={l.href}
              viewTransition
              className={({ isActive }) =>
                `caps-sm inline-flex h-full items-center border-b hover:border-ink ${isActive ? "border-ink" : "border-transparent"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div id="menu" hidden={!open} className="fixed inset-x-0 top-[4.25rem] bottom-0 overflow-y-auto bg-paper lg:hidden">
        <nav className="flex flex-col px-4 py-6" aria-label="Mobile">
          {NAV.map((l) => (
            <Link key={l.href} to={l.href} className="font-display border-b border-hair py-3.5 text-3xl">
              {l.label}
            </Link>
          ))}
          <Link to="/saved" className="font-display border-b border-hair py-3.5 text-3xl sm:hidden">
            Kept
          </Link>
          <Link to="/appointments" className="btn mt-8">
            Book an appointment
          </Link>
          <p className="mt-8 text-sm text-muted">Brentwood and Mt. Juliet, Tennessee</p>
        </nav>
      </div>
    </header>
  );
}
