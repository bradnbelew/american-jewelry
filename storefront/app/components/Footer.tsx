import { Link } from "react-router";

import { STORES } from "~/lib/catalog/data";

const HOUSE: [string, string][] = [
  ["/jewelry", "Jewelry"],
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
  ["/natural-or-man-made", "Natural or lab-grown"],
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

/** A sitemap in the small serif, the two addresses, the legal line. Nothing promotional, no capture. */
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
              <Link to={`/stores/${s.slug}`} className="font-display inline-flex min-h-11 items-center self-start text-lg hover:text-muted">
                {s.name}
              </Link>
              <address className="font-text not-italic text-ink-2">
                {s.address1}
                <br />
                {s.city}, {s.state} {s.zip}
                <br />
                <a href={`tel:${s.phone.replace(/\D/g, "")}`} className="num inline-flex min-h-11 items-center hover:text-ink">
                  {s.phone}
                </a>
              </address>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-hair">
        <div className="wrap flex flex-wrap items-center gap-x-8 py-2 text-[0.8125rem] text-muted">
          <span>© {year} American Jewelry</span>
          {LEGAL.map(([href, label]) => (
            <Link key={href} to={href} className="inline-flex min-h-11 items-center hover:text-ink">
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
    <div className={`flex flex-col ${className}`}>
      <span className="label mb-2">{title}</span>
      {links.map(([href, label]) => (
        <Link key={href} to={href} className="font-text inline-flex min-h-11 items-center self-start text-[0.9375rem] text-ink hover:text-muted">
          {label}
        </Link>
      ))}
    </div>
  );
}
