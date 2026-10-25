import { useState } from "react";
import { Link } from "react-router";
import { DESIGNS, STORES, tierBySlug, pieceByHandle, piecesForDesign } from "~/lib/catalog/data";
import { SHOP_LINES, type ShopLine } from "~/lib/catalog/lines";
import { DESIGN_PHOTO, PIECE_PHOTOS, STORE_PHOTO } from "~/lib/catalog/photos";
import { priceLine } from "./Catalog";
import { Pic } from "./Pic";

/** A photograph, then the name on paper. Type never sits on the picture. */
export function Campaign({photo, title, line, href, action, className = "", label}: {photo: string; tall?: string; title: string; line?: string; href: string; action: string; className?: string; label?: string; position?: string}) {
  return <section className={`house-opener ${className}`}>
    <div className="house-opener-media"><Pic k={photo} priority sizes="100vw" /></div>
    <div className="house-opener-copy house-wrap">
      {label && <p className="label">{label}</p>}
      <div className="house-opener-row">
        <h1>{title}</h1>
        <Link to={href} className="campaign-link">{action}</Link>
      </div>
      {line && <p className="campaign-line">{line}</p>}
    </div>
  </section>;
}
const SIGNATURE_WORDS: Record<string, string> = {
  "shooting-star": "A five-point star. A trail of graduated stones.",
  prism: "Light finds a different edge with every movement.",
  signal: "An open setting. Nothing between the stone and the light.",
  grid: "A continuous line, composed one stone at a time.",
};

/** Open a style family, then select its forms. Proposals are explicitly labeled. */
export function SignatureCabinet({initial = "shooting-star"}: {initial?: string}) {
  const [line, setLine] = useState<ShopLine>("americana");
  const [slug, setSlug] = useState(initial);
  const [selected, setSelected] = useState(0);
  const d = DESIGNS.find((design) => design.slug === slug)!;
  const pieces = piecesForDesign(slug);
  const focus = pieces[selected] ?? pieces[0];
  return <section className="signature-cabinet house-wrap" aria-label="Explore the house signatures">
    <div className="house-heading"><h2>The house signatures</h2><Link to={`/designs?line=${line}`} className="link">All designs</Link></div>
    <div className="line-nav signature-line-nav" role="group" aria-label="Signature line">{SHOP_LINES.map(l => <button type="button" key={l} aria-pressed={line===l} onClick={() => {setLine(l); setSlug(l==="americana" ? "shooting-star" : "signal"); setSelected(0);}}>{tierBySlug(l).name}</button>)}</div>
    <div className="signature-tabs" role="group" aria-label="Choose a design">{DESIGNS.filter(design => design.tier===line).map((design) => <button key={design.slug} type="button" aria-pressed={slug === design.slug} onClick={() => {setSlug(design.slug); setSelected(0);}}>{design.name}</button>)}</div>
    <div className="signature-room" key={slug}>
      <div className="signature-story">
        <h3><Link to={`/designs/${slug}`}>{d.name}</Link></h3>
        <p>{SIGNATURE_WORDS[slug] ?? d.motif}</p>
        <div className="signature-detail"><Pic k={DESIGN_PHOTO[slug]} sizes="25vw" /></div>
      </div>
      <div className="signature-object">
        <Link to={`/pieces/${focus.handle}`} className="signature-object-image" aria-label={`Discover ${focus.name}`}><Pic k={PIECE_PHOTOS[focus.handle][0]} /></Link>
        <div className="signature-object-caption" aria-live="polite"><Link to={`/pieces/${focus.handle}`}>{focus.name}</Link><span>{priceLine(focus)}</span></div>
        <div className="signature-forms" role="group" aria-label={`${d.name} forms`}>{pieces.map((p, i) => <button type="button" key={p.handle} aria-label={`Show ${p.name}`} aria-pressed={i === selected} onClick={() => setSelected(i)}><span className="signature-form-image"><Pic k={PIECE_PHOTOS[p.handle][0]} /></span><span>{p.name.replace(d.name, "").replace("Link ", "").trim()}</span></button>)}</div>
      </div>
    </div>
    {null}
  </section>;
}
export function RoyalPreview() {
  return <section className="royal-invitation"><div className="royal-invitation-image"><Pic k="comp-cumberland-velvet" /></div><div className="royal-invitation-copy"><h2>Royal American</h2><Link className="link" to="/royal-american">Royal American</Link></div></section>;
}
export function BridalPortrait() {
  return <section className="bridal-portrait house-wrap">
    <div className="bridal-image"><Pic k="comp-signal-hand" position="50% 48%" sizes="66vw" /></div>
    <div className="bridal-copy"><h2>Bridal</h2><p>A ring, considered from every side.</p><div className="bridal-actions"><Link to="/collections/bridal" className="link">Explore bridal</Link></div></div>
  </section>;
}
export function CollectionEdit() {
  const edits = [
    {slug:"family", name:"Family", line:"For the people you carry with you.", photo:"campaign-07-family-collection-editorial"},
    {slug:"color", name:"In Color", line:"A stone. A shade. A personal meaning.", photo:"comp-object-petal-ring"},
    {slug:"everyday", name:"Every Day", line:"The pieces you reach for first.", photo:"comp-object-meridian-pendant"},
  ];
  return <section className="collection-edit house-wrap"><div className="house-heading"><h2>Collections</h2><Link to="/collections" className="link">All collections</Link></div><div className="collection-edit-grid">{edits.map(edit => <Link key={edit.slug} to={`/collections/${edit.slug}`}><div className="collection-edit-image"><Pic k={edit.photo} /></div><h3>{edit.name}</h3></Link>)}</div></section>;
}
export function VisitInvitation() {
  return <section className="salon-pair house-wrap">
    <div className="salon-pair-head">
      <h2>The stores</h2>
      <p>A working shop, visible to you, in Brentwood and in Mt. Juliet.</p>
      <Link to="/appointments" className="link">Book an appointment</Link>
    </div>
    <div className="salon-pair-grid">
      {STORES.map((store) => (
        <Link key={store.slug} to={`/stores/${store.slug}`} className="salon-card">
          <span className="salon-card-image"><Pic k={STORE_PHOTO[store.slug]} sizes="(min-width: 768px) 36vw, 100vw" /></span>
          <span className="salon-card-name">{store.name}</span>
          <small>{store.address1}</small>
          <small className="num">{store.phone}</small>
        </Link>
      ))}
    </div>
  </section>;
}

const CODES: [string, string, string][] = [
  ["shooting-star", "Shooting Star", "A five-point star. A trail of graduated stones."],
  ["prism", "Prism", "Light finds a different edge with every movement."],
  ["signal", "Signal", "An open setting. Nothing between the stone and the light."],
  ["grid", "Grid", "A continuous line, one stone at a time."],
];

/** The front page: one object, the claim, Royal American, the four codes, bridal, the two stores. */
export function HomeHouse() {
  return <>
    <section className="home-opener">
      <div className="home-opener-media"><Pic k="aj-solitaire-hand" priority sizes="100vw" /></div>
      <div className="home-opener-copy house-wrap">
        <p className="label">Brentwood and Mt. Juliet</p>
        <div className="home-opener-row">
          <h1>A solitaire</h1>
          <Link to="/collections/bridal" className="campaign-link">Explore bridal</Link>
        </div>
        <p>Yellow gold, with a band. Seen in either store.</p>
      </div>
    </section>

    <section className="home-claim house-wrap">
      <div className="home-claim-photo"><Pic k="aj-bench-hands" sizes="(min-width: 900px) 54vw, 100vw" /></div>
      <div className="home-claim-copy">
        <h2>Designed in Tennessee.</h2>
        <p>Original designs, set and finished in our workshop.</p>
        <Link to="/our-story" className="link">Our story</Link>
      </div>
    </section>

    <section className="home-royal">
      <div className="house-wrap home-royal-grid">
        <div className="home-royal-copy">
          <h2>Royal American</h2>
          <p>Price on request. A private viewing, in either store.</p>
          <Link to="/royal-american" className="campaign-link">The collection</Link>
        </div>
        <div className="home-royal-photo"><Pic k="aj-round-brilliant" sizes="(min-width: 900px) 42vw, 100vw" /></div>
      </div>
    </section>

    <section className="home-codes house-wrap">
      <div>
        <h2>The signatures</h2>
        <ul className="home-code-list">
          {CODES.map(([slug, name, line]) => (
            <li key={slug}>
              <Link to={`/designs/${slug}`}>{name}</Link>
              <p>{line}</p>
            </li>
          ))}
        </ul>
      </div>
      <figure className="home-codes-figure">
        <div className="home-codes-photo"><Pic k="aj-signet-worn" sizes="(min-width: 900px) 42vw, 100vw" /></div>
        <figcaption className="label">A gold signet, engraved in our workshop.</figcaption>
      </figure>
    </section>

    <section className="home-bridal house-wrap">
      <div className="home-bridal-photo"><Pic k="aj-wedding-bands" sizes="(min-width: 900px) 48vw, 100vw" /></div>
      <div className="home-bridal-copy">
        <h2>Bridal</h2>
        <p>Natural diamonds, or lab-grown diamonds. The design is the same.</p>
        <div className="home-bridal-actions">
          <Link to="/collections/bridal" className="campaign-link">Choose a stone</Link>
          <Link to="/appointments?kind=bridal" className="link">Book an appointment</Link>
        </div>
      </div>
    </section>

    <VisitInvitation />
  </>;
}
export function ObjectEdit({handles, title}: {handles: string[]; title: string}) {
  return <section className="object-edit house-wrap"><h2>{title}</h2><div className="object-edit-grid">{handles.map((handle) => {const p = pieceByHandle(handle); if (!p || p.oneOfOne) return null; return <Link key={handle} to={`/pieces/${handle}`}><span className="object-edit-image"><Pic k={PIECE_PHOTOS[handle][0]} /></span><span className="object-edit-name">{p.name}</span><span className="label">{priceLine(p)}</span></Link>;})}</div></section>;
}
