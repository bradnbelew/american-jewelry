import { Link } from "react-router";

import { Pic } from "~/components/Pic";
import { PhotoOpener, Section } from "~/components/Section";
import { PIECES, STORES, TIERS, designBySlug } from "~/lib/catalog/data";
import { LETTER, LETTER_SIGNATURE } from "~/lib/catalog/letter";
import { DESIGN_PHOTO, TIER_PHOTO } from "~/lib/catalog/photos";
import { pageMeta } from "~/lib/seo";

import type { Route } from "./+types/home";

export const meta: Route.MetaFunction = () =>
  pageMeta({
    description:
      "American Jewelry designs, sets and finishes its own fine jewelry in Tennessee: one-of-one pieces, signature designs in gold and natural diamond, and man-made diamond pieces to one published standard. Brentwood and Mt. Juliet.",
    path: "/", og: "pages/home",
  });

/**
 * The home, paced by scale rather than by one repeated split (research/17 §1, pacing):
 * the hand, the house's names as type, one macro, the registry on velvet, one ring,
 * the letter's last paragraph, the two addresses. docs/briefs/site/pages/home.md.
 */
export default function Home() {
  const featured = designBySlug("shooting-star")!;
  const registry = PIECES.filter((p) => p.oneOfOne);

  return (
    <>
      {/* 1. The hand: the family's own daylight frame. */}
      <PhotoOpener photo="hero-hand" position="70% 40%" eyebrow="Brentwood and Mt. Juliet, Tennessee" title="An American house of fine jewelry.">
        <Link to="/americana" className="btn btn-light mt-1">
          The designs
        </Link>
      </PhotoOpener>

      {/* 2. The names, set as type. Never counted. */}
      <Section screen>
        <h2 className="sr-only">Royal American, Americana and New American</h2>
        <ol>
          {TIERS.map((t) => (
            <li key={t.slug} className="border-b border-hair first:border-t">
              <Link to={`/${t.slug}`} viewTransition className="group relative grid items-center gap-x-8 gap-y-3 py-8 md:grid-cols-12 md:py-10">
                <span className="h-display text-[2.5rem] group-hover:text-muted md:col-span-6 md:text-[3rem] lg:text-[4rem]">{t.name}</span>
                <span className="font-text text-[1.0625rem] text-ink-2 md:col-span-4">{t.tagline}</span>
                <span className="absolute right-0 top-1/2 hidden aspect-square w-[12vw] max-w-[11rem] -translate-y-1/2 overflow-hidden bg-bone opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:block">
                  <Pic k={TIER_PHOTO[t.slug]} sizes="16vw" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      {/* 3. The design of the season: one macro across the page, then the name beneath it. */}
      <Section className="pb-[var(--section-y)]">
        <Link to={`/designs/${featured.slug}`} viewTransition className="group block">
          <div className="settle relative aspect-[4/5] overflow-hidden bg-white md:aspect-[2.2/1]">
            <Pic k={DESIGN_PHOTO[featured.slug]} sizes="100vw" position="50% 58%" />
          </div>
          <div className="mt-8 grid gap-4 md:mt-10 md:grid-cols-12 md:gap-10">
            <div className="flex flex-col gap-3 md:col-span-6">
              <span className="label">The design of the season</span>
              <h2 className="h-display text-[2.5rem] group-hover:text-muted md:text-[3rem] lg:text-[4rem]">{featured.name}</h2>
            </div>
            <div className="flex flex-col gap-5 md:col-span-5 md:col-start-8 md:self-end md:pb-3">
              <p className="lede">{featured.motif}</p>
              <span className="link self-start">The {featured.name} design</span>
            </div>
          </div>
        </Link>
      </Section>

      {/* 4. The registry: Royal American by number, on the velvet it owns. */}
      <section className="velvet">
        <div className="wrap screen grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-5 lg:col-span-4">
            <span className="label">Royal American</span>
            <h2 className="h-section text-[2.25rem] md:text-[3rem]">The registry</h2>
            <p className="lede">Each piece is made once, given a number and named for a place in Tennessee.</p>
            <Link to="/royal-american" className="link link-light mt-2 self-start">
              Every piece in the registry
            </Link>
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {registry.map((p) => (
              <li key={p.handle} className="border-b border-paper/20 first:border-t">
                <Link to={`/pieces/${p.handle}`} className="group grid grid-cols-[7rem_1fr] items-baseline gap-x-6 py-6 md:grid-cols-[9.5rem_1fr] md:py-8">
                  <span className="gold-numeral whitespace-nowrap" style={{ fontSize: "clamp(1.5rem, 2.2vw, 2rem)" }}>No. {p.oneOfOne?.number}</span>
                  <span className="h-section text-[1.5rem] group-hover:text-paper/70 md:text-[2rem]">{p.name}</span>
                                  </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. Build a ring: the Signal ring as the builder draws it, on the stone ground. */}
      <Section screen>
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="flex flex-col gap-6 md:col-span-4">
            <h2 className="h-section text-[2.25rem] md:text-[3rem]">Build a ring.</h2>
            <p className="lede">Three settings we drew. The stone, the metal and the fit are yours.</p>
            <Link to="/build/ring?setting=signal" className="btn self-start">
              Build on Signal
            </Link>
          </div>
          <figure className="md:col-span-7 md:col-start-6">
            <div className="settle relative aspect-[4/3] overflow-hidden bg-stone">
              <img src="/3d/posters/ring-signal.webp" alt="The Signal solitaire as the ring builder draws it" width={1200} height={960} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <figcaption className="label mt-3">Signal, as the builder draws it.</figcaption>
          </figure>
        </div>
      </Section>

      {/* 6. The letter: its last paragraph here, the whole letter on the House page. */}
      <Section screen width="text">
        <div className="flex flex-col gap-6">
          <p className="letter">{LETTER[LETTER.length - 1]}</p>
          <p className="font-text text-[1.125rem] italic text-ink">{LETTER_SIGNATURE}</p>
          <Link to="/house" className="link self-start">
            The whole letter
          </Link>
        </div>
      </Section>

      {/* 7. The ending: the two addresses. */}
      <Section screen>
        <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
          {STORES.map((s) => (
            <Link key={s.slug} to={`/stores/${s.slug}`} className="group flex flex-col gap-2">
              <span className="h-section text-[2.25rem] group-hover:text-muted md:text-[3rem]">{s.name}</span>
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
