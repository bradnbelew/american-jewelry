"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useBag } from "./bag/BagProvider";

const LINKS: { href: string; label: string }[] = [
  { href: "/royal-american", label: "Royal American" },
  { href: "/americana", label: "Americana" },
  { href: "/new-american", label: "New American" },
  { href: "/collections/bridal", label: "Bridal" },
  { href: "/build/ring", label: "Build a ring" },
  { href: "/house", label: "The House" },
  { href: "/stores", label: "Stores" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count, openBag } = useBag();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-hair">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-[4.25rem] md:h-20">
          <div className="flex items-center gap-5">
            <button
              type="button"
              className="lg:hidden caps -ml-1 px-1 h-10 inline-flex items-center"
              aria-expanded={open}
              aria-controls="menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
            <span className="hidden lg:inline caps-sm text-muted">Brentwood · Mt. Juliet, Tennessee</span>
          </div>

          <Link href="/" className="font-display text-[1.35rem] md:text-[1.6rem] tracking-[0.26em] uppercase whitespace-nowrap" aria-label="American Jewelry home">
            American Jewelry
          </Link>

          <div className="flex items-center justify-end gap-6">
            <Link href="/appointments" className="hidden md:inline caps hover:text-muted transition-colors">
              Appointment
            </Link>
            <button type="button" onClick={openBag} className="caps h-10 inline-flex items-center gap-2 hover:text-muted transition-colors" aria-label={`Bag, ${count} items`}>
              Bag
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 text-[0.625rem] border border-ink rounded-full tabular-nums">{count}</span>
            </button>
          </div>
        </div>

        <nav className="hidden lg:flex items-center justify-center gap-9 h-11 border-t border-hair" aria-label="Primary">
          {LINKS.map((l) => {
            const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href + "/"));
            return (
              <Link key={l.href} href={l.href} className={`caps-sm h-full inline-flex items-center border-b ${active ? "border-ink" : "border-transparent"} hover:border-ink transition-colors`}>
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div id="menu" hidden={!open} className="lg:hidden fixed inset-x-0 top-[4.25rem] bottom-0 bg-white overflow-y-auto">
        <nav className="px-5 py-6 flex flex-col" aria-label="Mobile">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="font-display text-3xl py-3.5 border-b border-hair">
              {l.label}
            </Link>
          ))}
          <Link href="/appointments" className="btn mt-8">
            Book an appointment
          </Link>
          <p className="caps-sm text-muted mt-8">Brentwood · Mt. Juliet, Tennessee</p>
        </nav>
      </div>
    </header>
  );
}
