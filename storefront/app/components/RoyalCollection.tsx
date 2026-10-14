import { Link } from "react-router";
import { pieceByHandle } from "~/lib/catalog/data";
import { PIECE_PHOTOS } from "~/lib/catalog/photos";
import { Pic } from "./Pic";

const COLLECTION = [
  { handle: "no-001-the-cumberland", detail: "Diamond and platinum" },
  { handle: "no-002-tennessee-star", detail: "Sapphire and diamond" },
  { handle: "no-003-the-harpeth", detail: "Diamond and gold" },
];

/** An open photographic collection; every piece is visible without a selector. */
export function RoyalCollection() {
  return <div className="royal-collection">
    <header className="royal-intro house-wrap">
      <h1>Royal American</h1>
      <p>One of one.</p>
    </header>
    <div className="royal-gallery house-wrap">
      {COLLECTION.map(({ handle, detail }, index) => {
        const piece = pieceByHandle(handle)!;
        return <article key={handle} className={`royal-work${index === 0 ? " royal-work-feature" : ""}`}>
          <Link to={`/pieces/${handle}`} aria-labelledby={`royal-${handle}`}>
            <div className="royal-work-image">
              <Pic k={index === 0 ? "comp-cumberland-velvet" : PIECE_PHOTOS[handle][0]} priority={index === 0} sizes={index === 0 ? "(min-width: 1440px) 1200px, 90vw" : "(min-width: 768px) 42vw, 100vw"} position={index === 0 ? "90% 50%" : undefined} />
            </div>
            <div className="royal-work-caption">
              <h2 id={`royal-${handle}`}>{piece.name}</h2>
              <p>{detail}</p>
            </div>
          </Link>
        </article>;
      })}
    </div>
    <section className="royal-viewing house-wrap" aria-labelledby="royal-viewing-title">
      <h2 id="royal-viewing-title">A private viewing</h2>
      <p>Discover the pieces with the house, by appointment.</p>
      <Link className="campaign-link" to="/appointments?tier=royal-american">Arrange a viewing</Link>
      <p className="royal-disclosure">Concept pieces shown. Availability and stone details confirmed by the house.</p>
    </section>
  </div>;
}
