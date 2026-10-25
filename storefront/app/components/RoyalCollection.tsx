import { Link } from "react-router";

import { pieceByHandle } from "~/lib/catalog/data";
import { PIECE_PHOTOS } from "~/lib/catalog/photos";

import { Pic } from "./Pic";

const COLLECTION = [
  { handle: "no-001-the-cumberland", detail: "Diamond and platinum" },
  { handle: "no-002-tennessee-star", detail: "Sapphire and diamond" },
  { handle: "no-003-the-harpeth", detail: "Diamond and gold" },
];

export function RoyalCollection() {
  return (
    <div>
      <header className="royal-band" style={{ padding: "96px 0 64px" }}>
        <div className="wrap">
          <p className="caps eyebrow">High jewelry</p>
          <h1 className="display">Royal American</h1>
          <p className="center-copy">One-of-a-kind pieces, shown privately in either store.</p>
          <Link className="link link-on-photo" to="/appointments?tier=royal-american">Request a private viewing</Link>
        </div>
      </header>
      <div className="wrap" style={{ paddingBlock: "var(--section-y)" }}>
        <div className="port-grid">
          {COLLECTION.map(({ handle, detail }, index) => {
            const piece = pieceByHandle(handle);
            if (!piece) return null;
            const photo = index === 0 ? "comp-cumberland-velvet" : PIECE_PHOTOS[handle]?.[0];
            return (
              <article key={handle}>
                <Link to={`/pieces/${handle}`}>
                  <span className="frame-45 block">
                    <Pic k={photo} priority={index === 0} sizes="(min-width: 768px) 30vw, 100vw" position={index === 0 ? "50% 45%" : undefined} fit={index === 0 ? "cover" : "contain"} />
                  </span>
                  <h2 className="product-name mt-4">{piece.name}</h2>
                  <p className="small mute">{detail}</p>
                  <p className="price">Price on request</p>
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
