import { Link } from "react-router";

import { Pic } from "~/components/Pic";
import { PhotoOpener, Section } from "~/components/Section";
import { CATEGORIES } from "~/lib/catalog/browse";
import { PIECES, STORES, TIERS, designBySlug } from "~/lib/catalog/data";
import { LETTER } from "~/lib/catalog/letter";
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
 * The home, paced by scale and never by one repeated split (22-art-direction §5):
 * opener (the hand) / ledger (the names as type) / plate (the design of the season) /
 * velvet (the registry, with the piece on its velvet) / index (the kinds, with counts) /
 * beside (build a ring) / line (the letter's last paragraph) / ledger (the two addresses).
 * docs/briefs/site/pages/home.md.
 */
export default function Home() {
  const featured = designBySlug("shooting-star")!;
  const registry = PIECES.filter((p) => p.oneOfOne);

  return (
    <>
      {/* 1. Opener: the hand in window light, the words lower left. */}
      <PhotoOpener photo="comp-home-hand" tall="comp-home-hand-tall" position="62% 45%" eyebrow="Brentwood and Mt. Juliet, Tennessee" title="An American house of fine jewelry.">
        <Link to="/designs" className="btn btn-light mt-1">
          The designs
        </Link>
      </PhotoOpener>

      {/* 2. Ledger: the names, set as type. Never counted. */}
      <Section screen>
        <h2 className="sr-only">Royal American, Americana and New American</h2>
        <ol>
          {TIERS.map((t) => (
            <li key={t.slug} className="border-b border-hair first:border-t">
              <Link to={`/${t.slug}`} viewTransition className="group relative grid items-center gap-x-8 gap-y-3 py-8 md:grid-cols-12 md:py-10">
                <span className="h-display text-[2.5rem] group-hover:text-muted md:col-span-6 md:text-[3rem] lg:text-[4rem]">{t.name}</span>
                <span className="font-text text-[1.0625rem] text-ink-2 md:col-span-4">{t.tagline}</span>
                <span className="absolute right-0 top-1/2 hidden aspect-[4/3] w-[14vw] max-w-[13rem] -translate-y-1/2 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:block">
                  <Pic k={TIER_PHOTO[t.slug]} sizes="16vw" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </Section>

      {/* 3. Plate: the design of the season, one picture across the page, the name beneath it. */}
      <Section className="pb-[var(--section-y)]">
        <Link to={`/designs/${featured.slug}`} viewTransition className="group block">
          <div className="settle relative aspect-[4/5] overflow-hidden md:aspect-[2.2/1]">
            <Pic k={DESIGN_PHOTO[featured.slug]} sizes="100vw" position="50% 55%" />
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

      {/* 4. Velvet: Royal American by number, on the velvet it owns, with the piece on its tray. */}
      <section className="velvet">
        <div className="wrap screen grid gap-10 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-10">
          <div className="flex flex-col gap-5 lg:col-span-5 lg:self-end">
            <span className="label">Royal American</span>
            <h2 className="h-section text-[2.25rem] md:text-[3rem]">The registry</h2>
            <p className="lede">Each piece is made once, given a number and named for a place in Tennessee.</p>
          </div>
          <div className="dissolve relative aspect-[4/5] overflow-hidden md:aspect-[4/3] lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <Pic k="comp-cumberland-velvet" sizes="(min-width: 1024px) 58vw, 100vw" position="60% 50%" />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-5">
            <ol>
              {registry.map((p) => (
                <li key={p.handle} className="border-b border-paper/20 first:border-t">
                  <Link to={`/pieces/${p.handle}`} className="group grid grid-cols-[6.5rem_1fr] items-baseline gap-x-6 py-5">
                    <span className="gold-numeral whitespace-nowrap">No. {p.oneOfOne?.number}</span>
                    <span className="h-section text-[1.5rem] group-hover:text-paper/70">{p.name}</span>
                  </Link>
                </li>
              ))}
            </ol>
            <Link to="/royal-american" className="link link-light self-start">
              Every piece in the registry
            </Link>
          </div>
        </div>
      </section>

      {/* 5. The index: the kinds, with their counts, as one row of names. */}
      <Section screen>
        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <h2 className="label md:col-span-3">The index</h2>
          <nav aria-label="By kind" className="flex flex-wrap gap-x-12 gap-y-4 md:col-span-9">
            {CATEGORIES.map((c) => {
              const n = PIECES.filter((p) => c.types.includes(p.pieceType)).length;
              return (
                <Link key={c.slug} to={`/jewelry/${c.slug}`} viewTransition className="group inline-flex items-baseline gap-3">
                  <span className="h-display text-[2.25rem] group-hover:text-muted md:text-[3rem]">{c.name}</span>
                  <span className="num label">{n}</span>
                </Link>
              );
            })}
            <Link to="/jewelry" className="link self-end">
              Every piece
            </Link>
          </nav>
        </div>
      </Section>

      {/* 6. Beside: the Signal ring as the builder draws it, on the paper. */}
      <Section className="pb-[var(--section-y)]">
        <div className="grid items-start gap-10 md:grid-cols-12">
          <figure className="md:col-span-7 md:-ml-10">
            <div className="settle relative aspect-[4/3] overflow-hidden">
              <img src="/3d/posters/ring-signal.webp" alt="The Signal solitaire as the ring builder draws it" width={1200} height={960} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            <figcaption className="label mt-3">Signal, as the builder draws it.</figcaption>
          </figure>
          <div className="flex flex-col gap-6 md:col-span-4 md:col-start-9">
            <h2 className="h-section text-[2.25rem] md:text-[3rem]">Build a ring.</h2>
            <p className="lede">Three settings we drew. The stone, the metal and the fit are yours.</p>
            <Link to="/build/ring?setting=signal" className="btn self-start">
              Build on Signal
            </Link>
          </div>
        </div>
      </Section>

      {/* 7. Line: the letter's last paragraph here, the whole letter on the House page. */}
      <Section screen width="text">
        <div className="flex flex-col gap-6">
          <p className="letter">{LETTER[LETTER.length - 1]}</p>
          <Link to="/house" className="link self-start">
            The whole letter
          </Link>
        </div>
      </Section>

      {/* 8. Ledger: the two addresses. */}
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
