import { Link } from "react-router";

import { Section, SplitOpener } from "~/components/Section";
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
      <SplitOpener title="The House" lede="A store sells what vendors make. A house draws its own designs, makes them, marks them, and stands behind them for life." photo="bench" />

      <Section screen width="text">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <h2 className="h-section text-[2rem] md:col-span-4 md:text-[2.5rem]">A letter from the family</h2>
          <div className="letter md:col-span-8">
            {LETTER.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <p className="font-text mt-2 text-[1.125rem] italic text-ink">{LETTER_SIGNATURE}</p>
          </div>
        </div>
      </Section>

      <Section screen>
        <div className="grid items-start gap-10 md:grid-cols-12 md:gap-12">
          <div className="relative aspect-[4/5] overflow-hidden bg-stone md:col-span-5">
            <img src="/3d/posters/solitaire-ring.webp" alt="A cast file from the bench, rendered before casting" width={1200} height={1500} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="flex flex-col gap-10 md:col-span-6 md:col-start-7">
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
              The names on this site are set in Caslon, the typeface the Dunlap broadside of the Declaration of Independence was printed in, in July 1776. The numbers and the controls are set in Public Sans, the United States government&apos;s own typeface, drawn from Franklin Gothic.
            </p>
            <p>Both are free, both are American, and both were here long before we were. We did not need a typeface of our own. We needed the right ones.</p>
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
