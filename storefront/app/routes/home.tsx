import { Link } from "react-router";

import { Pic } from "~/components/Pic";
import { PhotoOpener, Section } from "~/components/Section";
import { SETTING_PHOTO } from "~/lib/builder/notes";
import { STORES, TIERS, designBySlug } from "~/lib/catalog/data";
import { DESIGN_PHOTO, TIER_PHOTO } from "~/lib/catalog/photos";
import { pageMeta } from "~/lib/seo";

import type { Route } from "./+types/home";

export const meta: Route.MetaFunction = () =>
  pageMeta({
    description:
      "American Jewelry designs, sets and finishes its own fine jewelry in Tennessee: one-of-one pieces, signature designs in gold and natural diamond, and man-made diamond pieces to one published standard. Brentwood and Mt. Juliet.",
    path: "/",
  });

/** Six screens, one subject each. About 120 words. */
export default function Home() {
  const featured = designBySlug("shooting-star")!;

  return (
    <>
      <PhotoOpener photo="hero-box" position="50% 45%" eyebrow="Brentwood and Mt. Juliet, Tennessee" title="An American house of fine jewelry.">
        <Link to="/americana" className="btn btn-light mt-1">
          The designs
        </Link>
      </PhotoOpener>

      <Section screen>
        <Link to={`/designs/${featured.slug}`} viewTransition className="group block">
          <div className="settle relative aspect-[4/5] overflow-hidden bg-bone md:aspect-[2.2/1]">
            <Pic k={DESIGN_PHOTO[featured.slug]} sizes="100vw" position="50% 45%" />
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-12 md:gap-10">
            <h2 className="h-display text-[3rem] group-hover:text-muted md:col-span-6 md:text-[5rem]">{featured.name}</h2>
            <div className="flex flex-col gap-4 md:col-span-5 md:col-start-8 md:pt-3">
              <p className="lede">{featured.motif}</p>
              <span className="link self-start">The design</span>
            </div>
          </div>
        </Link>
      </Section>

      <Section screen>
        <h2 className="sr-only">Royal American, Americana and New American</h2>
        <ol>
          {TIERS.map((t) => (
            <li key={t.slug} className="border-b border-hair first:border-t">
              <Link to={`/${t.slug}`} viewTransition className="group grid items-center gap-x-8 gap-y-3 py-8 md:grid-cols-12 md:py-10">
                <span className="h-display text-[2.5rem] group-hover:text-muted md:col-span-6 md:text-[4rem]">{t.name}</span>
                <span className="font-text text-[1.0625rem] text-ink-2 md:col-span-4">{t.tagline}</span>
                <span className="relative hidden aspect-square overflow-hidden bg-bone opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:col-span-2 md:block">
                  <Pic k={TIER_PHOTO[t.slug]} sizes="16vw" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      <Section screen>
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="settle relative aspect-[4/5] overflow-hidden bg-stone md:col-span-7">
            <Pic k={SETTING_PHOTO.signal} sizes="(min-width: 768px) 58vw, 100vw" />
          </div>
          <div className="flex flex-col gap-6 md:col-span-4 md:col-start-9">
            <h2 className="h-section text-[2.25rem] md:text-[3rem]">Build a ring.</h2>
            <p className="lede">Three settings we drew. The stone, the metal and the fit are yours.</p>
            <Link to="/build/ring?setting=signal" className="btn self-start">
              Build on Signal
            </Link>
          </div>
        </div>
      </Section>

      <Section screen>
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="flex flex-col gap-6 md:col-span-4">
            <h2 className="h-section text-[2.25rem] md:text-[3rem]">The bench is on the floor.</h2>
            <p className="lede">In Mt. Juliet you can watch your stone being set.</p>
            <Link to="/house" className="link self-start">
              The House
            </Link>
          </div>
          <div className="settle relative aspect-[4/3] overflow-hidden bg-bone md:col-span-7 md:col-start-6">
            <Pic k="bench" sizes="(min-width: 768px) 58vw, 100vw" />
          </div>
        </div>
      </Section>

      <Section screen>
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          {STORES.map((s) => (
            <Link key={s.slug} to={`/stores/${s.slug}`} className="group flex flex-col gap-2">
              <span className="h-section text-[2rem] group-hover:text-muted md:text-[2.75rem]">{s.name}</span>
              <span className="font-text text-ink-2">
                {s.address1}, {s.city}
              </span>
              <span className="num label">{s.phone}</span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
