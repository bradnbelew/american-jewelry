import { Link } from "react-router";

import { Pic } from "~/components/Pic";
import { pieceByHandle } from "~/lib/catalog/data";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/custom-design";

const PORTFOLIO = [
  "script-name-necklace",
  "diamond-name-necklace",
  "initial-station-necklace",
  "name-wrap-ring",
  "family-ring",
  "beaded-disc-pendant",
];

export const meta: Route.MetaFunction = () =>
  pageMeta(
    {
      title: "Custom design",
      description: "Custom jewelry designed with you and made in-house by our jewelers in Middle Tennessee. CAD rendering, about four to six weeks.",
      path: "/custom-design",
      image: "ed-opal",
    },
    [breadcrumbJsonLd([{ name: "Custom design", href: "/custom-design" }])],
  );

export default function CustomDesign() {
  const pieces = PORTFOLIO.map((handle) => pieceByHandle(handle)).filter((piece) => piece != null);

  return (
    <>
      <section className="band-blue">
        <div className="blue-split">
          <div className="frame-45" style={{ minHeight: 420 }}>
            <Pic k="ed-opal" priority sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
          <div className="copy">
            <h1 className="display">Custom design</h1>
            <p>One-of-a-kind pieces, designed with you and made by our jewelers.</p>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBlock: "var(--section-y)" }}>
        <h2 className="center-copy" style={{ marginBottom: 48 }}>How it works</h2>
        <ol className="steps">
          <li>
            <p className="step-num">1</p>
            <h3>Meet with us</h3>
            <p className="body">Stop in, or book a consultation, and bring your ideas, photos or a stone you love.</p>
          </li>
          <li>
            <p className="step-num">2</p>
            <h3>Approve the design</h3>
            <p className="body">We send a CAD rendering by email. We refine it with you until it is right.</p>
          </li>
          <li>
            <p className="step-num">3</p>
            <h3>We make it</h3>
            <p className="body">Our jewelers make the piece in-house. It is ready to collect or ship in about four to six weeks.</p>
          </li>
        </ol>
      </section>

      <section className="wrap" id="heirloom" style={{ paddingBottom: "var(--section-y)" }}>
        <div className="workshop">
          <div className="frame-45">
            <Pic k="ed-cluster" sizes="(min-width: 1024px) 55vw, 100vw" />
          </div>
          <div className="narrow">
            <h2>Remake an heirloom</h2>
            <p className="body">Unworn jewelry from someone you love can become something you wear every day. We can reset a family stone or rework the gold into a new design.</p>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: "var(--section-y)" }}>
        <h2 style={{ marginBottom: 32 }}>Pieces made with clients</h2>
        <div className="port-grid">
          {pieces.map((piece) => (
            <Link key={piece.handle} to={`/pieces/${piece.handle}`} className="cat-tile">
              <span className="frame-45">
                <Pic k={`pack-${photoKey(piece.handle)}`} sizes="(min-width: 768px) 30vw, 46vw" fit="contain" />
              </span>
              <span className="product-name mt-3 block">{piece.name}</span>
            </Link>
          ))}
        </div>
        <p className="body center-copy" style={{ marginTop: 64 }}>
          Seen something on Instagram or Pinterest you love? Bring it in. We can make it.
        </p>
        <p className="center-copy">
          <Link className="link" to="/appointments?interest=custom">Begin a custom piece</Link>
        </p>
      </section>
    </>
  );
}

function photoKey(handle: string) {
  const map: Record<string, string> = {
    "script-name-necklace": "name-gold",
    "diamond-name-necklace": "name-diamond",
    "initial-station-necklace": "initial",
    "name-wrap-ring": "name-wrap",
    "family-ring": "family-ring",
    "beaded-disc-pendant": "disc",
  };
  return map[handle] ?? "name-gold";
}
