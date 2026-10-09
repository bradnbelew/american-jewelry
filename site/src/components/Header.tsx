"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useBag } from "./bag/BagProvider";
import { useSaved } from "./saved/SavedProvider";

const LINKS: { href: string; label: string }[] = [
  { href: "/royal-american", label: "Royal American" },
  { href: "/americana", label: "Americana" },
  { href: "/new-american", label: "New American" },
  { href: "/collections/bridal", label: "Bridal" },
  { href: "/build/ring", label: "Build a ring" },
  { href: "/house", label: "The House" },
  { href: "/services", label: "Services" },
  { href: "/stores", label: "Stores" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { count, openBag } = useBag();
  const { count: saved, ready } = useSaved();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-hair">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center h-[4.25rem] md:h-20 gap-3">
          <div className="flex items-center gap-5">
            <button type="button" className="lg:hidden caps -ml-1 px-1 h-10 w-14 inline-flex items-center" aria-expanded={open} aria-controls="menu" onClick={() => setOpen((v) => !v)}>
              {open ? "Close" : "Menu"}
            </button>
            <Link href="/stores" className="hidden lg:inline caps-sm text-muted hover:text-ink transition-colors">
              Brentwood · Mt. Juliet, Tennessee
            </Link>
          </div>

          <Link
            href="/"
            className="font-display text-[1rem] sm:text-[1.25rem] md:text-[1.65rem] tracking-[0.2em] md:tracking-[0.26em] uppercase whitespace-nowrap justify-self-center"
            aria-label="American Jewelry home"
            onClick={() => setOpen(false)}
          >
            American Jewelry
          </Link>

          <div className="flex items-center justify-end gap-6">
            <Link href="/appointments" className="hidden md:inline caps hover:text-muted transition-colors">
              Appointment
            </Link>
            <Link href="/saved" className="hidden sm:inline-flex caps h-10 items-center gap-2 hover:text-muted transition-colors" aria-label={`Saved, ${saved} items`}>
              Saved
              <span className="inline-flex items-center justify-center w-5 h-5 text-[0.625rem] tabular-nums text-muted">{ready ? saved : ""}</span>
            </Link>
            <button type="button" onClick={openBag} className="caps h-10 inline-flex items-center gap-2 hover:text-muted transition-colors" aria-label={`Bag, ${count} items`}>
              Bag
              <span className="inline-flex items-center justify-center w-5 h-5 text-[0.625rem] tabular-nums text-muted">{count}</span>
            </button>
          </div>
        </div>

        <nav className="hidden lg:flex items-center justify-center gap-9 h-11 border-t border-hair" aria-label="Primary">
          <Suspense fallback={<NavLinks active={null} />}>
            <ActiveNavLinks />
          </Suspense>
        </nav>
      </div>

      <div id="menu" hidden={!open} className="lg:hidden fixed inset-x-0 top-[4.25rem] bottom-0 bg-white overflow-y-auto">
        <nav className="px-5 py-6 flex flex-col" aria-label="Mobile">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="font-display text-3xl py-3.5 border-b border-hair" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/saved" className="font-display text-3xl py-3.5 border-b border-hair sm:hidden" onClick={() => setOpen(false)}>
            Saved
          </Link>
          <Link href="/appointments" className="btn mt-8" onClick={() => setOpen(false)}>
            Book an appointment
          </Link>
          <p className="text-sm text-muted mt-8">Brentwood and Mt. Juliet, Tennessee</p>
        </nav>
      </div>
    </header>
  );
}

function ActiveNavLinks() {
  const pathname = usePathname();
  return <NavLinks active={pathname} />;
}

function NavLinks({ active }: { active: string | null }) {
  return (
    <>
      {LINKS.map((l) => {
        const on = active !== null && (active === l.href || active.startsWith(l.href + "/"));
        return (
          <Link key={l.href} href={l.href} className={`caps-sm h-full inline-flex items-center border-b ${on ? "border-ink" : "border-transparent"} hover:border-ink transition-colors`}>
            {l.label}
          </Link>
        );
      })}
    </>
  );
}
