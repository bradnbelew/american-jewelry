import { Link } from "react-router";

import { PhotoOpener, Section } from "~/components/Section";
import { LETTER, LETTER_SIGNATURE } from "~/lib/catalog/letter";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/house";

export const meta: Route.MetaFunction = () =>
  pageMeta(
    { title: "The House", description: "Why American Jewelry is a house and not a store: one designer, one bench in Tennessee, and what we will and will not say about where things come from.", path: "/house", og: "pages/house", image: "bench" },
    [breadcrumbJsonLd([{ name: "The House", href: "/house" }])],
  );

/** Four steps. TODO: the family confirms where casting happens (open-questions A5) and which operations are manual. */
const MAKING: [string, string][] = [
  ["Drawn", "Every design begins as a drawing by our designer."],
  ["Modeled", "The drawing becomes a model: proportions, weight in the hand, the seat for each stone."],
  ["Cast", "Solid 14k or 18k gold or platinum, karat-marked. Never hollow."],
  ["Set and finished", "Stones set at the bench, the piece polished, the mark struck inside."],
];

/** The letter, the making, the type, the bench. docs/briefs/site/pages/house.md. */
export default function HousePage() {
  return (
    <>
      <PhotoOpener photo="comp-bench-hands" position="50% 40%" title="The House" lede="A store sells what vendors make. A house draws its own designs, makes them, marks them, and stands behind them for life." height="aspect-[4/5] md:aspect-auto md:h-[72vh] md:min-h-[480px] md:max-h-[860px]" />

      <Section screen width="text">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <h2 className="h-section text-[2rem] md:col-span-4 md:text-[2.5rem]">A letter from the family</h2>
          <div className="letter md:col-span-8">
            {LETTER.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <p className="font-text mt-2 text-[1.125rem] text-ink">{LETTER_SIGNATURE}</p>
          </div>
        </div>
      </Section>

      <Section screen id="making">
        <div className="grid items-start gap-10 md:grid-cols-12 md:gap-12">
          <div className="flex flex-col gap-10 md:col-span-7">
            <h2 className="h-section text-[2rem] md:text-[2.75rem]">How a piece is made here</h2>
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
          <h2 className="h-section text-[2rem] md:col-span-4 md:text-[2.5rem]">The type</h2>
          <div className="letter md:col-span-8 !text-[1.0625rem]">
            <p>
              The names and the reading on this site are set in Source Serif, drawn at Adobe in California after the eighteenth-century types of Pierre-Simon Fournier. The numbers and the controls are set in Public Sans, the United States government&apos;s own typeface, drawn from Franklin Gothic.
            </p>
            <p>Both are open typefaces, anyone's to use, and both were made to be read rather than noticed. We did not need a typeface of our own. We needed the right ones.</p>
            <Link to="/journal/what-designed-in-tennessee-means" className="link mt-2 inline-block">
              What the words mean
            </Link>
          </div>
        </div>
      </Section>

      <Section className="pb-8" width="text">
        <div className="grid gap-8 md:grid-cols-12 md:gap-16">
          <h2 className="h-section text-[2rem] md:col-span-6 md:text-[2.75rem]">Come and see the bench.</h2>
          <div className="flex flex-col gap-6 md:col-span-5 md:col-start-8">
            <p className="font-text text-[1.0625rem] text-ink-2">In Mt. Juliet the bench is behind glass. In Brentwood, Royal American is shown by appointment.</p>
            <Link to="/stores" className="btn self-start">
              The stores
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
