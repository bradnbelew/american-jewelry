import Link from "next/link";
import { Mark } from "./Mark";

const LINKS: { href: string; label: string }[] = [
  { href: "/royal-american", label: "Royal American" },
  { href: "/americana", label: "Americana" },
  { href: "/new-american", label: "New American" },
  { href: "/collections/bridal", label: "Bridal" },
  { href: "/build/ring", label: "Build a ring" },
  { href: "/house", label: "The House" },
  { href: "/stores", label: "Stores" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3" aria-label="American Jewelry home">
            <Mark className="h-7 w-7 text-navy" />
            <span className="font-display text-[1.35rem] md:text-2xl tracking-[0.12em] uppercase text-navy">
              American Jewelry
            </span>
          </Link>
          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="label text-navy hover:text-gilt transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/appointments" className="btn btn-ghost !py-2.5 !px-4 hidden sm:inline-flex">
              Book an appointment
            </Link>
            <details className="lg:hidden relative">
              <summary className="list-none cursor-pointer label text-navy px-2 py-2">Menu</summary>
              <div className="absolute right-0 mt-2 w-64 bg-paper border border-line shadow-lg p-4 flex flex-col gap-3">
                {LINKS.map((l) => (
                  <Link key={l.href} href={l.href} className="label text-navy">
                    {l.label}
                  </Link>
                ))}
                <Link href="/appointments" className="label text-gilt">
                  Book an appointment
                </Link>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
