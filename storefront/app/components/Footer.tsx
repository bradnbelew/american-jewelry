import { Link } from "react-router";

import { STORES } from "~/lib/catalog/data";

const HOUSE: [string, string][] = [
  ["/royal-american", "Royal American"],
  ["/americana", "Americana"],
  ["/new-american", "New American"],
  ["/collections/bridal", "Bridal"],
  ["/house", "The House"],
  ["/journal", "Journal"],
];

const SERVICES: [string, string][] = [
  ["/build/ring", "Build a ring"],
  ["/commission", "Commission a piece"],
  ["/services", "Repair and restoration"],
  ["/care", "Lifetime care"],
  ["/natural-or-man-made", "Natural or man-made"],
  ["/saved", "Kept"],
];

const LEGAL: [string, string][] = [
  ["/policies#shipping", "Shipping"],
  ["/policies#returns", "Returns"],
  ["/policies#warranty", "Warranty"],
  ["/policies#disclosures", "Disclosures"],
  ["/policies#privacy", "Privacy"],
  ["/policies#accessibility", "Accessibility"],
];

/** A sitemap in small Caslon, the two addresses, the legal line. Nothing promotional, no capture. */
export function Footer({ year }: { year: number }) {
  return (
    <footer className="mt-32 border-t border-hair">
      <div className="wrap grid gap-12 py-16 md:grid-cols-12">
        <div className="flex flex-col gap-5 md:col-span-4">
          <span className="font-display text-xl uppercase tracking-[0.28em]">American Jewelry</span>
          <p className="font-text max-w-xs text-[0.9375rem] leading-relaxed text-ink-2">
            Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported.
          </p>
        </div>
        <Col className="md:col-span-2" title="The House" links={HOUSE} />
        <Col className="md:col-span-2" title="Services" links={SERVICES} />
        <div className="grid gap-8 sm:grid-cols-2 md:col-span-4">
          {STORES.map((s) => (
            <div key={s.slug} className="flex flex-col gap-1 text-sm leading-relaxed">
              <Link to={`/stores/${s.slug}`} className="font-display text-lg hover:text-muted">
                {s.name}
              </Link>
              <address className="font-text not-italic text-ink-2">
                {s.address1}
                <br />
                {s.city}, {s.state} {s.zip}
                <br />
                <a href={`tel:${s.phone.replace(/\D/g, "")}`} className="num hover:text-ink">
                  {s.phone}
                </a>
              </address>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-hair">
        <div className="wrap flex flex-wrap gap-x-8 gap-y-2 py-5 text-[0.75rem] text-muted">
          <span>© {year} American Jewelry</span>
          {LEGAL.map(([href, label]) => (
            <Link key={href} to={href} className="hover:text-ink">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

function Col({ title, links, className = "" }: { title: string; links: [string, string][]; className?: string }) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <span className="caps-sm text-muted">{title}</span>
      {links.map(([href, label]) => (
        <Link key={href} to={href} className="font-text text-[0.9375rem] text-ink hover:text-muted">
          {label}
        </Link>
      ))}
    </div>
  );
}
