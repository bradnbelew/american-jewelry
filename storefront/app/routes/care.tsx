import { Link } from "react-router";

import { Pic } from "~/components/Pic";
import { Section } from "~/components/Section";
import { STORES } from "~/lib/catalog/data";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/care";

const CARE: [string, string][] = [
  ["Clean and check", "We inspect the stones and the setting, then recommend the care."],
  ["Resize", "Some designs, including full eternity bands, need remaking. We assess the fit and quote first."],
  ["Repair", "Retipping, re-shanking, chains, clasps, stones and laser welding, at our bench."],
];

export const meta: Route.MetaFunction = () =>
  pageMeta({ title: "Lifetime care", description: "Cleaning, inspection, resizing and repair at American Jewelry. Contact our Brentwood or Mt. Juliet store to discuss your piece.", path: "/care" }, [breadcrumbJsonLd([{ name: "Lifetime care", href: "/care" }])]);

export default function CarePage() {
  return (
    <>
      <Section className="care-open pt-16 pb-8 md:pt-24">
        <div className="care-open-grid">
          <div>
            <h1 className="h-display">Lifetime care</h1>
            <p className="lede">Cleaning and inspection at either store, for as long as you own a piece we made.</p>
            <Link to="/appointments?kind=care" className="campaign-link">Book a visit</Link>
          </div>
          <div className="care-open-photo"><Pic k="aj-gemstone-rings" sizes="(min-width: 768px) 46vw, 100vw" /></div>
        </div>
      </Section>
      <Section>
        <dl className="care-ledger">
          {CARE.map(([name, line]) => (
            <div key={name}>
              <dt>{name}</dt>
              <dd>{line}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <Section id="sizing" className="pt-8 pb-16">
        <div className="care-size">
          <h2>Sizing</h2>
          <p>Visit either store for a fitting. Bring a ring that fits, if you have one.</p>
          <p>
            {STORES.map((s, i) => (
              <span key={s.slug}>
                {i ? " or " : ""}
                {s.name} at <a className="num link-quiet" href={`tel:${s.phone.replace(/\D/g, "")}`}>{s.phone}</a>
              </span>
            ))}
            .
          </p>
        </div>
      </Section>
    </>
  );
}
