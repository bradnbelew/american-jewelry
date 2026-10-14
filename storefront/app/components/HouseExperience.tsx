import { useState } from "react";
import { Link } from "react-router";
import { DESIGNS, STORES, pieceByHandle, piecesForDesign, piecesForTier } from "~/lib/catalog/data";
import { DESIGN_PHOTO, PIECE_PHOTOS } from "~/lib/catalog/photos";
import { priceLine } from "./Catalog";
import { Pic } from "./Pic";

/** Image-first campaign. Its title names the jewelry. */
export function Campaign({photo, tall, title, line, href, action, className = "", label, position}: {photo: string; tall?: string; title: string; line?: string; href: string; action: string; className?: string; label?: string; position?: string}) {
  return <section className={`house-campaign ${className}`}>
    <Pic k={photo} tall={tall} priority position={position} />
    <div className="campaign-shade" />
    <div className="campaign-copy">
      {label && <p className="campaign-label">{label}</p>}
      <h1>{title}</h1>
      {line && <p className="campaign-line">{line}</p>}
      <Link to={href} className="campaign-link">{action}</Link>
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
  const [slug, setSlug] = useState(initial);
  const [selected, setSelected] = useState(0);
  const d = DESIGNS.find((design) => design.slug === slug)!;
  const pieces = piecesForDesign(slug);
  const focus = pieces[selected] ?? pieces[0];
  return <section className="signature-cabinet house-wrap" aria-label="Explore the house signatures">
    <div className="house-heading"><h2>The house signatures</h2><Link to="/designs" className="link">All designs</Link></div>
    <div className="signature-tabs" role="group" aria-label="Choose a design">{DESIGNS.map((design) => <button key={design.slug} type="button" aria-pressed={slug === design.slug} onClick={() => {setSlug(design.slug); setSelected(0);}}>{design.name}</button>)}</div>
    <div className="signature-room" key={slug}>
      <div className="signature-story">
        {d.concept && <p className="label">Proposed design</p>}
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
    <p className="concept-note">Concept photographs. Confirm final details with the house.</p>
  </section>;
}
export function RoyalPreview({full = false}: {full?: boolean}) {
  const pieces = piecesForTier("royal-american");
  const [index, setIndex] = useState(0);
  const piece = pieces[index];
  return <section className={`royal-room ${full ? "royal-room-full" : ""}`} aria-label="Royal American high jewelry">
    <div className="royal-display house-wrap">
      <div className="royal-room-heading"><p className="label">High Jewelry</p>{full ? <h1>Royal American</h1> : <h2>Royal American</h2>}</div>
      <div className="royal-object"><Pic k={PIECE_PHOTOS[piece.handle][0]} /></div>
      <div className="royal-description"><h3>{piece.name}</h3><p>{index === 0 ? "A round brilliant held in a sculpted platinum setting." : index === 1 ? "A blue sapphire at the heart of a diamond star." : "Graduated diamonds in a flowing line of gold."}</p><Link className="campaign-link" to={`/pieces/${piece.handle}`}>Discover the piece</Link></div>
      <div className="royal-list" role="group" aria-label="Choose a registry concept">{pieces.map((p, i) => <button type="button" key={p.handle} onClick={() => setIndex(i)} aria-pressed={index === i}><span className="royal-entry-number">{p.oneOfOne?.number}</span><span>{p.name}</span></button>)}</div>
    </div>
    <div className="royal-foot house-wrap"><p>Registry concepts shown. Availability and individual stone reports by inquiry.</p><Link className="campaign-link" to={full ? "/appointments?tier=royal-american" : "/royal-american"}>{full ? "Arrange a private viewing" : "Enter Royal American"}</Link></div>
  </section>;
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
  return <section className="visit-invitation house-wrap"><div><h2>Visit us</h2></div><div className="visit-places">{STORES.map((store) => <Link key={store.slug} to={`/stores/${store.slug}`}><span>{store.name}</span><small>{store.address1}</small></Link>)}</div></section>;
}
export function ObjectEdit({handles, title}: {handles: string[]; title: string}) {
  return <section className="object-edit house-wrap"><h2>{title}</h2><div className="object-edit-grid">{handles.map((handle) => {const p = pieceByHandle(handle)!; return <Link key={handle} to={`/pieces/${handle}`}><span className="object-edit-image"><Pic k={PIECE_PHOTOS[handle][0]} /></span><span className="object-edit-name">{p.name}</span><span className="label">{priceLine(p)}</span></Link>;})}</div></section>;
}
