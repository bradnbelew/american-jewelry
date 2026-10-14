import { Link } from "react-router";

import { PhotoOpener, Section } from "~/components/Section";
import { LETTER } from "~/lib/catalog/letter";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/house";

export const meta: Route.MetaFunction = () =>
  pageMeta(
    { title: "The family, the designs and the bench", description: "Meet American Jewelry, a family jeweler in Brentwood and Mt. Juliet, Tennessee, with one designer, shops visible to customers at both stores, and in-house casting.", path: "/house", og: "pages/house", image: "bench" },
    [breadcrumbJsonLd([{ name: "The House", href: "/house" }])],
  );

/** Four steps. TODO: the family confirms where casting happens (open-questions A5) and which operations are manual. */
const MAKING: [string, string][] = [
  ["Design", "One designer, the owner's brother, draws the pieces. Start with the form that feels like you."],
  ["Custom CAD", "Discuss a new idea and the model that will help you understand its proportions."],
  ["Casting and setting", "We cast in-house. Both stores have working shops visible to customers, with setting and engraving among the work we do."],
  ["Repair", "Bring a piece for assessment. We will discuss the work and its timing with you."],
];

/** The letter, the making, the type, the bench. docs/briefs/site/pages/house.md. */
export default function HousePage() {
  return (
    <>
      <PhotoOpener photo="comp-bench-hands" position="50% 40%" title="A family. A designer. Two working shops." lede="American Jewelry, Brentwood and Mt. Juliet, Tennessee." height="aspect-[4/5] md:aspect-auto md:h-[72vh] md:min-h-[480px] md:max-h-[860px]" />

      <Section screen width="text">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <h2 className="h-section text-[2rem] md:col-span-4 md:text-[2.5rem]">Meet American Jewelry</h2>
          <div className="letter md:col-span-8">
            {LETTER.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section screen id="making">
        <div className="grid items-start gap-10 md:grid-cols-12 md:gap-12">
          <div className="flex flex-col gap-10 md:col-span-7">
            <h2 className="h-section text-[2rem] md:text-[2.75rem]">Design and the bench</h2>
            <ol className="flex flex-col divide-y divide-hair border-y border-hair">
              {MAKING.map(([k, v]) => (
                <li key={k} className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <h3 className="h-item text-[1.25rem]">{k}</h3>
                  <p className="font-text text-ink-2">{v}</p>
                </li>
              ))}
            </ol>
            <p className="label">Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported.</p>
          </div>
        </div>
      </Section>

      <Section screen width="text">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <h2 className="h-section text-[2rem] md:col-span-4 md:text-[2.5rem]">Know what you are choosing.</h2>
          <div className="letter md:col-span-8 !text-[1.0625rem]">
            <p>
              Natural and lab-grown diamonds are identified throughout the catalog. A piece’s specification and its individual stone report should answer the material questions before you order.
            </p>
            <Link to="/natural-or-man-made" className="link mt-2 inline-block">
              Natural and lab-grown diamonds
            </Link>
          </div>
        </div>
      </Section>

      <Section className="pb-8" width="text">
        <div className="grid gap-8 md:grid-cols-12 md:gap-16">
          <h2 className="h-section text-[2rem] md:col-span-6 md:text-[2.75rem]">Let’s put it on the table.</h2>
          <div className="flex flex-col gap-6 md:col-span-5 md:col-start-8">
            <p className="font-text text-[1.0625rem] text-ink-2">Visit either store to try on jewelry, discuss a commission or ask about a repair. Call ahead for a particular piece or a private viewing.</p>
            <Link to="/stores" className="btn self-start">
              The stores
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
