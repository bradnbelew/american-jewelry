import { Link } from "react-router";

import { Pic } from "~/components/Pic";
import { Section, SplitOpener } from "~/components/Section";
import { STORES } from "~/lib/catalog/data";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";
import { LETTER, LETTER_SIGNATURE } from "~/lib/catalog/letter";

import type { Route } from "./+types/house";

export const meta: Route.MetaFunction = () =>
  pageMeta(
    { title: "The House", description: "Why American Jewelry is a house and not a store: one designer, one bench in Tennessee, one mark, and what we will and will not say about where things come from.", path: "/house", image: "bench" },
    [breadcrumbJsonLd([{ name: "The House", href: "/house" }])],
  );

const MAKING: [string, string][] = [
  ["Drawn", "Every design begins as a drawing by our designer."],
  ["Modeled", "The drawing becomes a model: proportions, weight in the hand, the seat for each stone."],
  ["Cast", "Solid 14k or 18k gold or platinum, karat-marked. Never plated, never hollow."],
  ["Set and finished", "Stones set by hand at the bench, the piece polished, the mark struck inside."],
];

/** The letter, the making, the mark, the bench. About 300 words. */
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
        <h2 className="h-section mb-12 text-[2rem] md:mb-16 md:text-[2.75rem]">How a piece is made here</h2>
        <ol className="grid gap-x-10 gap-y-12 md:grid-cols-2">
          {MAKING.map(([k, v], i) => (
            <li key={k} className={`flex flex-col gap-3 ${i % 2 === 1 ? "md:pt-16" : ""}`}>
              <div className="settle relative aspect-[4/3] overflow-hidden bg-bone">
                <Pic k={i === 3 ? "bench" : i === 0 ? "ring-radiant" : i === 1 ? "ring-halo" : "hero-box"} sizes="(min-width: 768px) 45vw, 100vw" />
              </div>
              <h3 className="h-item text-[1.375rem]">{k}</h3>
              <p className="font-text text-ink-2">{v}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section screen width="text">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <h2 className="h-section text-[2rem] md:col-span-4 md:text-[2.5rem]">The mark</h2>
          <div className="letter md:col-span-8 !text-[1.0625rem]">
            <p>Every piece carries the AJ mark inside, with a small mark beside it for its line: a crown, a star or a line.</p>
            <p>
              We say &ldquo;Designed in Tennessee. Set and finished in our workshop.&rdquo; We do not say &ldquo;Made in America,&rdquo; because our diamonds and gold are imported, and we do not say &ldquo;handmade,&rdquo; because a cast piece is not. We say &ldquo;man-made diamond&rdquo; every time we mean one.
            </p>
            <Link to="/journal/what-designed-in-tennessee-means" className="link mt-2 inline-block">
              What the words mean
            </Link>
          </div>
        </div>
      </Section>

      <Section className="pb-8">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
          <div className="settle relative aspect-[4/3] overflow-hidden bg-bone md:col-span-7">
            <Pic k={STORES[1].photo} sizes="(min-width: 768px) 58vw, 100vw" />
          </div>
          <div className="flex flex-col gap-6 md:col-span-4 md:col-start-9">
            <h2 className="h-section text-[2rem] md:text-[2.75rem]">Come and see the bench.</h2>
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
