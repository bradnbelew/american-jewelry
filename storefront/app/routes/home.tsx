import { Link, useRouteLoaderData } from "react-router";

import { StoreCards } from "~/components/HouseBlocks";
import { Pic } from "~/components/Pic";
import { PieceCard } from "~/components/Catalog";
import { piecesForCollection, publicPieces } from "~/lib/catalog/data";
import { pageMeta } from "~/lib/seo";

import type { loader as rootLoader } from "~/root";
import type { Route } from "./+types/home";

const CATEGORIES: { label: string; href: string; photo: string; position?: string }[] = [
  { label: "Engagement rings", href: "/collections/bridal", photo: "ed-bridal", position: "50% 55%" },
  { label: "Wedding bands", href: "/collections/wedding-bands", photo: "ed-bands", position: "50% 40%" },
  { label: "Diamond jewelry", href: "/jewelry?stone=natural", photo: "ed-tennis" },
  { label: "Gemstone jewelry", href: "/jewelry?stone=gemstone", photo: "ed-opal" },
  { label: "Personalized", href: "/collections/personalized", photo: "ed-names" },
  { label: "Men's", href: "/collections/mens", photo: "ed-mens" },
  { label: "Earrings", href: "/jewelry/earrings", photo: "ed-peach", position: "50% 45%" },
  { label: "Estate and vintage", href: "/appointments?interest=estate", photo: "ed-cluster" },
];

export const meta: Route.MetaFunction = () =>
  pageMeta({
    description: "American Jewelry, a family jeweler in Brentwood and Mt. Juliet, Tennessee. Engagement rings, wedding bands, custom design and in-house repairs.",
    path: "/",
    image: "hero-hands",
  });

export default function Home() {
  const root = useRouteLoaderData<typeof rootLoader>("root");
  const live = root?.live === true;
  const classics = piecesForCollection("american-classic").filter((piece) => publicPieces(live).some((item) => item.handle === piece.handle) && piece.realPhoto);
  const showClassics = classics.length >= 4;

  return (
    <>
      <section className="home-hero" aria-label="Bridal">
        <Pic k="hero-hands" tall="hero-hands-tall" priority position="60% 40%" sizes="100vw" />
        <div className="hero-scrim" />
        <div className="hero-copy">
          <p className="caps">Bridal</p>
          <h1 className="display">Forever starts here</h1>
          <p className="body-lg">Engagement rings and wedding bands, chosen with you and set by our jewelers.</p>
          <Link className="link link-on-photo" to="/collections/bridal">Discover bridal</Link>
        </div>
      </section>

      <section className="band-loose">
        <div className="center-copy">
          <h2>American Jewelry</h2>
          <p className="body-lg">A family jeweler in Middle Tennessee, with three generations at the counter and at the bench. Every repair and every custom piece is made in-house, in an open workshop you can watch.</p>
          <Link className="link" to="/our-story">Our story</Link>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: "var(--section-y)" }}>
        <h2 className="center-copy" style={{ marginBottom: 48 }}>Shop by category</h2>
        <div className="cat-grid">
          {CATEGORIES.map((item) => (
            <Link key={item.href} to={item.href} className="cat-tile">
              <span className="frame">
                <Pic k={item.photo} sizes="(min-width: 768px) 22vw, 46vw" position={item.position} />
              </span>
              <span className="caps">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="band" style={{ background: "var(--ivory)", paddingBlock: "var(--section-y)" }}>
        <div className="wrap">
          <div className="center-copy" style={{ marginBottom: 48 }}>
            <h2>Our signatures</h2>
            <p className="body">Two pieces our clients come back for, made to carry a name.</p>
          </div>
          <div className="sig-grid">
            <article>
              <Link to="/collections/personalized" className="frame-45 block">
                <Pic k="ed-names" sizes="(min-width: 768px) 46vw, 100vw" />
              </Link>
              <h3 className="mt-4">Personalized</h3>
              <p className="small">Names, initials and dates, in solid gold.</p>
              <Link className="link" to="/collections/personalized">Discover</Link>
            </article>
            <article>
              <Link to="/pieces/american-classic-signet" className="frame-45 block">
                <Pic k="ed-signets" sizes="(min-width: 768px) 46vw, 100vw" position="50% 40%" />
              </Link>
              <h3 className="mt-4">The American Classic Signet</h3>
              <p className="small">A gold signet, engraved in our workshop.</p>
              <Link className="link" to="/collections/signets">Discover</Link>
            </article>
          </div>
        </div>
      </section>

      {showClassics ? (
        <section className="wrap" style={{ paddingBlock: "var(--section-y)" }}>
          <div className="section-head">
            <h2>American Classics</h2>
            <Link className="link" to="/collections/american-classic">View all</Link>
          </div>
          <div className="rail">
            {classics.slice(0, 8).map((piece) => (
              <PieceCard key={piece.handle} piece={piece} sizes="(min-width: 1024px) 22vw, 70vw" />
            ))}
          </div>
        </section>
      ) : null}

      <section className="band-blue">
        <div className="blue-split">
          <div className="frame-45" style={{ minHeight: 420 }}>
            <Pic k="ed-opal" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div className="copy">
            <p className="caps eyebrow">Custom design</p>
            <h2>Made for you, from the first sketch</h2>
            <p>Bring an idea, a photo you saved, or a family stone. Our designers draw it with you, send a CAD rendering for approval, and our jewelers make it in about four to six weeks.</p>
            <p className="flex flex-wrap gap-x-8">
              <Link className="link" to="/custom-design">Begin a custom piece</Link>
              <Link className="link" to="/custom-design#heirloom">Remake an heirloom</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBlock: "var(--section-y)" }}>
        <div className="workshop">
          <div className="narrow">
            <p className="caps">The workshop</p>
            <h2>Nothing behind a closed door</h2>
            <p className="body">Our jewelers work in plain view. Sizing, soldering, prong work and laser welding happen in-house, and many repairs are finished while you wait.</p>
            <Link className="link" to="/services">Our services</Link>
          </div>
          <div className="frame-45">
            <Pic k="ed-workshop" sizes="(min-width: 1024px) 55vw, 100vw" position="50% 42%" />
          </div>
        </div>
      </section>

      {live ? null : (
        <section className="royal-band" style={{ paddingBlock: "var(--section-y)" }}>
          <div className="wrap">
            <p className="caps eyebrow">High jewelry</p>
            <div className="royal-piece">
              <div className="frame-45">
                <Pic k="comp-cumberland-velvet" sizes="(min-width: 768px) 720px, 100vw" position="50% 45%" />
              </div>
            </div>
            <h2>Royal American</h2>
            <p className="center-copy">One-of-a-kind pieces, shown privately in either store.</p>
            <Link className="link link-on-photo" to="/appointments?tier=royal-american">Request a private viewing</Link>
          </div>
        </section>
      )}

      <section className="wrap" style={{ paddingBlock: "var(--section-y)" }}>
        <div className="center-copy" style={{ marginBottom: 48 }}>
          <h2>Visit us</h2>
          <p className="body">Two stores in Middle Tennessee, each with its own jewelers on site.</p>
        </div>
        <StoreCards />
      </section>
    </>
  );
}
