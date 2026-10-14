import { useState } from "react";
import { Link } from "react-router";
import { DESIGNS, PIECES, STORES, tierBySlug, piecesForTier } from "~/lib/catalog/data";
import { DESIGN_PHOTO, TIER_PHOTO } from "~/lib/catalog/photos";
import type { TierSlug } from "~/lib/catalog/types";
import type { DesignMode } from "~/lib/design-preview";
import { PieceIndex } from "./Catalog";
import { Pic } from "./Pic";
import { Section } from "./Section";

export function MotifStudy() {
  return (
    <figure className="motif-study">
      <svg viewBox="0 0 600 370" role="img" aria-label="Shooting Star motif study: five points and a graduated trail">
        <defs>
          <pattern id="study-grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M30 0H0V30" fill="none" stroke="currentColor" strokeOpacity=".12" />
          </pattern>
        </defs>
        <rect width="600" height="370" fill="url(#study-grid)" />
        <g fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m195 92 25 66 71 3-56 44 19 70-59-40-60 40 20-70-57-44 72-3z" />
          <path d="m293 201 62 24m-79-52 108 8m-104-40 151-27" strokeWidth="7" strokeLinecap="round" />
          <path d="M158 82V43H70m345 155 72 55h65" strokeWidth="1" />
        </g>
        <g fill="currentColor" fontFamily="sans-serif" fontSize="15">
          <text x="38" y="31">
            Five-point form
          </text>
          <text x="390" y="280">
            A graduated trail
          </text>
        </g>
      </svg>
      <figcaption>Concept motif study. Original designer’s drawing to follow; this is not a production drawing.</figcaption>
    </figure>
  );
}

export function LightStudy() {
  const [light, setLight] = useState("day");
  return (
    <div className="light-study" data-light={light}>
      <div className="light-object">
        <img
          src="/photos/comp-signal-packshot.webp"
          width={1374}
          height={1145}
          alt="Signal ring, generated photography stand-in for the private design study"
        />
      </div>
      <div className="light-controls" role="group" aria-label="Illustrative lighting">
        {[
          ["day", "Daylight"],
          ["warm", "Warm light"],
          ["evening", "Evening"],
        ].map(([id, name]) => (
          <button type="button" key={id} aria-pressed={light === id} onClick={() => setLight(id)}>
            {name}
          </button>
        ))}
      </div>
      <p className="preview-fine">Interface lighting simulation on a concept render. Not a calibrated comparison of diamond appearance.</p>
    </div>
  );
}

function DesignIndex() {
  return (
    <Section className="direction-section">
      <div className="direction-section-heading">
        <h2>Find your form.</h2>
        <Link to="/designs" className="link">
          Explore the four designs
        </Link>
      </div>
      <div className="direction-designs">
        {DESIGNS.map((d, i) => (
          <Link key={d.slug} to={`/designs/${d.slug}`}>
            <div className="direction-image">
              <Pic k={DESIGN_PHOTO[d.slug]} sizes="(min-width: 900px) 24vw, 50vw" />
            </div>
            <span className="direction-number">0{i + 1}</span>
            <h3>{d.name}</h3>
            <p>{d.motif}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}

function Visit() {
  return (
    <Section className="direction-visit direction-section">
      <div>
        <h2>
          Come as you are.
          <br />
          Bring what you love.
        </h2>
        <p>Try on a piece, see the working shop, or talk through a commission. Both locations have shops visible to customers.</p>
      </div>
      <div>
        {STORES.map((s) => (
          <div key={s.slug} className="direction-address">
            <h3>{s.name}</h3>
            <p>
              {s.address1}
              <br />
              {s.city}
            </p>
            <a className="link" href={`tel:${s.phone.replace(/[^\d+]/g, "")}`}>
              {s.phone}
            </a>
            <Link className="link" to={`/stores/${s.slug}`}>
              Plan a visit
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function DirectionHome({ mode }: { mode: Exclude<DesignMode, "classic"> }) {
  return (
    <div className={`direction direction-${mode}`}>
      {mode === "working" ? (
        <>
          <Section className="working-hero">
            <div className="working-hero-copy">
              <p className="direction-location">American Jewelry · Tennessee</p>
              <h1>
                Good design.
                <br />
                Close to home.
              </h1>
              <p>Original designs, in-house casting, and a working shop you can see in either Tennessee store.</p>
              <div className="direction-actions">
                <Link className="btn" to="/jewelry">
                  Explore the jewelry
                </Link>
                <Link className="link" to="/commission">
                  Talk about a commission
                </Link>
              </div>
            </div>
            <figure>
              <div className="direction-image">
                <Pic k="comp-americana-ground" priority sizes="(min-width: 900px) 48vw, 100vw" />
              </div>
              <figcaption>Shooting Star · An exploration of the five-point form</figcaption>
            </figure>
          </Section>
          <DesignIndex />
          <Section className="direction-story direction-section">
            <MotifStudy />
            <div>
              <p className="direction-location">From a form to a family</p>
              <h2>A star with somewhere to go.</h2>
              <p>Five points. A trail that changes scale. The same idea, worked through a ring, a pendant and a band.</p>
              <Link className="btn" to="/designs/shooting-star">
                Meet Shooting Star
              </Link>
            </div>
          </Section>
        </>
      ) : mode === "company" ? (
        <>
          <Section className="company-hero">
            <p className="direction-location">Brentwood & Mt. Juliet</p>
            <h1>
              For all the life
              <br />
              <em>you put into it.</em>
            </h1>
            <div className="company-pictures">
              <div className="direction-image">
                <Pic k="comp-home-hand" priority sizes="(min-width: 900px) 60vw, 100vw" />
              </div>
              <div className="company-side">
                <div className="direction-image">
                  <Pic k="comp-the-box" sizes="38vw" />
                </div>
                <p>The first piece. The next chapter. The thing that becomes yours.</p>
                <Link className="btn" to="/collections">
                  Find something to live in
                </Link>
              </div>
            </div>
          </Section>
          <Section className="direction-section company-collections">
            <h2>
              Different days.
              <br />
              Pieces that stay.
            </h2>
            <div>
              {[
                ["The everyday", "/americana", "Gold, birthstone and natural diamond."],
                ["The yes", "/collections/bridal", "Settings for the next chapter."],
                ["The extraordinary", "/royal-american", "Royal American high jewelry."],
              ].map(([name, href, line]) => (
                <Link key={name} to={href}>
                  <h3>{name}</h3>
                  <p>{line}</p>
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </Section>
          <DesignIndex />
        </>
      ) : (
        <>
          <Section className="full-light-hero">
            <div className="full-light-title">
              <h1>
                Nothing
                <br />
                between you
                <br />
                <em>and the light.</em>
              </h1>
              <div>
                <p>New American. Lab-grown diamond jewelry, with the details in plain sight.</p>
                <Link className="btn" to="/new-american">
                  Meet New American
                </Link>
              </div>
            </div>
            <LightStudy />
            <div className="light-stage-caption">
              <span>Signal / An open four-prong setting</span>
              <Link className="link" to="/pieces/signal-solitaire">
                Configure Signal
              </Link>
            </div>
          </Section>
          <Section className="direction-section stone-decision">
            <h2>
              Start with the stone.
              <br />
              Keep your point of view.
            </h2>
            <div>
              <Link to="/new-american">
                <h3>Lab-grown diamonds</h3>
                <p>Explore New American and its published specification.</p>
              </Link>
              <Link to="/americana">
                <h3>Natural diamonds</h3>
                <p>Explore Americana in natural diamond, gemstone and gold versions.</p>
              </Link>
              <Link className="link" to="/natural-or-man-made">
                Understand the difference
              </Link>
            </div>
          </Section>
        </>
      )}
      <Section className="direction-section">
        <div className="direction-section-heading">
          <h2>{mode === "company" ? "Make room for a favorite." : "A closer look."}</h2>
          <Link to="/jewelry" className="link">
            Shop all jewelry
          </Link>
        </div>
        <PieceIndex pieces={PIECES.filter((p) => ["signal-solitaire", "shooting-star-ring", "prism-signet"].includes(p.handle))} showLine />
      </Section>
      <Section className="direction-high direction-section">
        <div className="direction-image">
          <Pic k="comp-cumberland-velvet" sizes="(min-width: 900px) 50vw, 100vw" />
        </div>
        <div>
          <p className="direction-location">High Jewelry</p>
          <h2>Royal American</h2>
          <p>Explore the one-of-one collection. Speak with us about a piece and arrange a private viewing.</p>
          <Link className="btn" to="/royal-american">
            Discover Royal American
          </Link>
        </div>
      </Section>
      <Visit />
    </div>
  );
}

export function DirectionLine({ slug, mode }: { slug: TierSlug; mode: Exclude<DesignMode, "classic"> }) {
  const tier = tierBySlug(slug);
  return (
    <div className={`direction direction-${mode}`}>
      <Section className={`direction-line-hero ${slug === "royal-american" ? "direction-royal" : ""}`}>
        <div>
          <p className="direction-location">
            {slug === "royal-american" ? "High Jewelry" : slug === "new-american" ? "Lab-grown diamond jewelry" : "Gold, gemstone & natural diamond"}
          </p>
          <h1>{tier.name}</h1>
          <p>{tier.intro}</p>
          <a className="btn" href="#line-pieces">
            Explore the pieces
          </a>
        </div>
        <div className="direction-image">
          <Pic k={TIER_PHOTO[slug]} priority sizes="(min-width: 900px) 55vw, 100vw" />
        </div>
      </Section>
      <Section className="direction-section" id="line-pieces">
        <div className="direction-section-heading">
          <h2>{slug === "royal-american" ? "The collection" : "Choose your form."}</h2>
          <Link to={`/jewelry?line=${slug}`} className="link">
            Filter by stone, metal or price
          </Link>
        </div>
        <PieceIndex pieces={piecesForTier(slug)} />
      </Section>
      {slug === "new-american" && (
        <Section className="direction-section direction-standard" id="standard">
          <h2>The New American Standard</h2>
          <p>
            Lab-grown diamonds are diamonds grown in a laboratory. Our catalog specifies D–F color, VVS clarity and IGI reports for qualifying center stones.
            Check the individual piece and its report for the exact specification.
          </p>
          <Link className="link" to="/natural-or-man-made">
            Natural and lab-grown, explained
          </Link>
        </Section>
      )}
      <Visit />
    </div>
  );
}
