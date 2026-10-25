import { Link } from "react-router";

import { StoreCards } from "~/components/HouseBlocks";
import { Pic } from "~/components/Pic";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/our-story";

export const meta: Route.MetaFunction = () =>
  pageMeta(
    {
      title: "Our story",
      description: "American Jewelry is family owned, with three generations working in Brentwood and Mt. Juliet, Tennessee. Repairs and custom pieces are made in an open workshop.",
      path: "/our-story",
      image: "ed-workshop",
    },
    [breadcrumbJsonLd([{ name: "Our story", href: "/our-story" }])],
  );

export default function OurStory() {
  return (
    <>
      <section className="editorial-hero" aria-label="Our story">
        <Pic k="ed-workshop" priority position="50% 42%" sizes="100vw" />
        <div className="hero-scrim" />
        <div className="hero-copy">
          <p className="caps">Our story</p>
          <h1 className="display">A family jeweler in Middle Tennessee</h1>
        </div>
      </section>

      <section className="band-loose">
        <p className="body-lg center-copy">
          American Jewelry is family owned and operated, with three generations working in our stores. We welcome clients in Brentwood and Mt. Juliet.
        </p>
      </section>

      <section className="wrap" id="family" style={{ paddingBottom: "var(--section-y)" }}>
        <div className="workshop">
          <div className="narrow">
            <h2>A family business</h2>
            <p className="body">The people who greet you are often family. They know the pieces in the case because many of them were designed here, and they will still be here when your ring needs a new prong in twenty years.</p>
          </div>
          <div className="frame-45">
            <Pic k="ed-names" sizes="(min-width: 1024px) 55vw, 100vw" />
          </div>
        </div>
      </section>

      <section className="wrap" id="workshop" style={{ paddingBottom: "var(--section-y)" }}>
        <div className="workshop">
          <div className="frame-45">
            <Pic k="ed-workshop" sizes="(min-width: 1024px) 55vw, 100vw" position="50% 42%" />
          </div>
          <div className="narrow">
            <h2>The open workshop</h2>
            <p className="body">Our workshop is built so you can watch your jewelry being made or repaired. Custom design runs on CAD, with a rendering sent for your approval, and our master jewelers do the setting, sizing and laser welding in-house.</p>
            <Link className="link" to="/services">Our services</Link>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: "var(--section-y)" }}>
        <div className="center-copy" style={{ marginBottom: 48 }}>
          <h2>Visit us</h2>
          <p className="body">Two stores in Middle Tennessee, each with its own jewelers on site.</p>
        </div>
        <StoreCards />
      </section>
    </>
  );
}
