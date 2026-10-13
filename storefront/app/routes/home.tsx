import { Link, useSearchParams } from "react-router";

import { Pic } from "~/components/Pic";
import { VIEWING } from "~/components/three/viewing/pieces";
import { ViewingFrame } from "~/components/three/viewing/Viewing";
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
  // Variants for the council (2026-10-12): where "the viewing" belongs on the home, if anywhere.
  // none (default): no live 3D on the home. ?viewing=registry: the registry on velvet becomes the viewing.
  // ?viewing=hero: the viewing replaces the hand as the first screen.
  const [params] = useSearchParams();
  const variant = params.get("viewing");
  const cumberland = VIEWING["no-001-the-cumberland"];

  return (
    <>
      {/* 1. The hand: the family's own daylight frame. */}
      {variant === "hero" ? (
        <section className="photo-overlay relative h-[100svh] max-h-[1000px] min-h-[560px] overflow-hidden bg-navy md:h-[86vh]">
          <ViewingFrame spec={cumberland} poster="/3d/posters/viewing-hero.webp" posterTall="/3d/posters/viewing-hero-tall.webp" alt="The Cumberland, Royal American No. 001, on navy velvet under one light" offset={0.17} lift={0.55} eager fill />
          <div className="absolute inset-x-0 bottom-0 z-10">
            <div className="on-photo mx-auto flex max-w-[96rem] flex-col items-start gap-5 px-4 pb-12 text-paper md:px-10 md:pb-20">
              <span className="label !text-paper">Brentwood and Mt. Juliet, Tennessee</span>
              <h1 className="h-display measure-display text-[2.75rem] md:text-[4.5rem] lg:text-[5.5rem]">An American house of fine jewelry.</h1>
              <Link to="/americana" className="btn btn-light mt-1">
                The designs
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <PhotoOpener photo="hero-hand" position="70% 40%" eyebrow="Brentwood and Mt. Juliet, Tennessee" title="An American house of fine jewelry.">
          <Link to="/americana" className="btn btn-light mt-1">
            The designs
          </Link>
        </PhotoOpener>
      )}

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
      {variant === "registry" ? (
        <section className="velvet">
          <div className="wrap screen grid gap-8 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-10">
            <div className="flex flex-col gap-5 lg:col-span-5 lg:self-end">
              <span className="label">Royal American</span>
              <h2 className="h-section text-[2.25rem] md:text-[3rem]">The registry</h2>
              <p className="lede">Each piece is made once, given a number and named for a place in Tennessee.</p>
            </div>
            <ViewingFrame
              spec={cumberland}
              poster="/3d/posters/viewing-cumberland.webp"
              posterTall="/3d/posters/viewing-cumberland-tall.webp"
              alt="The Cumberland, Royal American No. 001, on navy velvet under one light"
              className="aspect-[4/5] md:aspect-[5/4] lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1"
            />
            <div className="flex flex-col gap-6 lg:col-span-5">
              <ol>
                {registry.map((p) => (
                  <li key={p.handle} className="border-b border-paper/20 first:border-t">
                    <Link to={`/pieces/${p.handle}`} className="group grid grid-cols-[6.5rem_1fr] items-baseline gap-x-6 py-5">
                      <span className="gold-numeral whitespace-nowrap" style={{ fontSize: "1.5rem" }}>No. {p.oneOfOne?.number}</span>
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
      ) : (
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
      )}

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
