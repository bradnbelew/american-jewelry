import { Link } from "react-router";

import { PageTitle, Section } from "~/components/Section";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/care";

export const meta: Route.MetaFunction = () =>
  pageMeta({ title: "Lifetime care", description: "Cleaning, inspection, resizing and repair at American Jewelry. Contact our Brentwood or Mt. Juliet store to discuss your piece.", path: "/care" }, [breadcrumbJsonLd([{ name: "Lifetime care", href: "/care" }])]);

export default function CarePage() {
  return (
    <>
      <Section width="text" className="pt-16 pb-12 md:pt-24 md:pb-16">
        <PageTitle title="Lifetime care" lede="Cleaning, inspection, resizing and repair at either store." />
      </Section>
      <Section width="text">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            ["Clean and check", "We inspect the stones and setting before recommending care."],
            ["Resize", "Some designs, including full eternity bands, need remaking. We’ll assess the fit and quote first."],
            ["Repair", "Retipping, re-shanking, chains, clasps, stones and laser welding through our in-house bench."],
          ].map(([k, v]) => (
            <div key={k} className="flex flex-col gap-2">
              <span className="font-display text-[1.5rem]">{k}</span>
              <p className="font-text text-ink-2">{v}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section width="text" id="sizing" className="pt-16 pb-8">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 className="h-item text-[1.25rem]">Sizing</h2>
          <p className="font-text text-ink-2">
            Visit either store for a fitting. Bring a ring that fits if you have one.
          </p>
          <Link to="/appointments?kind=care" className="link self-start">
            Book a care visit
          </Link>
        </div>
      </Section>
    </>
  );
}
