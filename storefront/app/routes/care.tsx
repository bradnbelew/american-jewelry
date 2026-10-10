import { Link } from "react-router";

import { PageTitle, Section } from "~/components/Section";
import { pageMeta } from "~/lib/seo";

import type { Route } from "./+types/care";

export const meta: Route.MetaFunction = () =>
  pageMeta({ title: "Lifetime care", description: "Cleaning, prong checks, polishing, resizing and repair at American Jewelry's bench in Mt. Juliet, free for as long as you own the piece.", path: "/care" });

export default function CarePage() {
  return (
    <>
      <Section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <PageTitle title="Lifetime care" lede="Bring it in two or three times a year. We clean it, check every prong and polish it while you wait. No charge, for as long as you own it." />
      </Section>
      <Section width="text">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            ["Clean and check", "Ultrasonic and steam, a loupe over every setting. Fifteen minutes, free."],
            ["Resize", "One free resize within 60 days on rings we made; after that, at cost. Full eternity bands are remade."],
            ["Repair", "Retipping, re-shanking, chains, clasps, stones and laser welding at the bench in Mt. Juliet."],
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
