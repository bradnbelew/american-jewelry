import { Link } from "react-router";

import { PageTitle, Section } from "~/components/Section";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/care";

export const meta: Route.MetaFunction = () =>
  pageMeta({ title: "Lifetime care", description: "Cleaning, inspection, resizing and repair at American Jewelry. Contact our Brentwood or Mt. Juliet store to discuss your piece.", path: "/care" }, [breadcrumbJsonLd([{ name: "Lifetime care", href: "/care" }])]);

export default function CarePage() {
  return (
    <>
      <Section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <PageTitle title="Lifetime care" lede="Bring your jewelry in for assessment. We can discuss cleaning, inspection, resizing and repair, including the right care for its stones and setting." />
      </Section>
      <Section width="text">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            ["Clean and check", "Cleaning methods depend on the stones and setting. Ask us to inspect the piece and recommend suitable care."],
            ["Resize", "We assess the design before recommending a new size. Some settings, including full eternity bands, may need to be remade. Ask for timing and a quote."],
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
            Fingers change size with the weather and the hour. Come in and we size you properly, free. If you must measure at home, use a ring that already fits and measure its inside diameter in millimeters. Bands over 4 mm usually need a half size up.
          </p>
          <Link to="/appointments?kind=care" className="link self-start">
            Book a care visit
          </Link>
        </div>
      </Section>
    </>
  );
}
