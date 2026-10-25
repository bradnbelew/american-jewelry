import { getSelectedProductOptions } from "@shopify/hydrogen";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { PieceConfigurator, metalTone } from "~/components/PieceConfigurator";
import { PieceForm } from "~/components/PieceForm";
import { StoreChoice } from "~/components/StoreChoice";
import { PieceGallery } from "~/components/PieceGallery";
import { PieceLedger } from "~/components/Catalog";
import { Section } from "~/components/Section";
import { viewingFor } from "~/components/three/viewing/pieces";
import { STORES, designBySlug, pieceByHandle, pieceRef, piecesForDesign, tierBySlug } from "~/lib/catalog/data";
import { PIECE_PHOTOS } from "~/lib/catalog/photos";
import type { Metal, Piece } from "~/lib/catalog/types";
import { METAL_LABEL } from "~/lib/catalog/types";
import { modelFor } from "~/lib/models";
import { PIECE_OPTION_NAMES, PIECE_QUERY, type PieceProduct } from "~/lib/piece-query";
import { ProductProvider, metalKeyFromLabel, pieceUrl } from "~/lib/product";
import { breadcrumbJsonLd, pageMeta, productJsonLd, productJsonLdFromStorefront } from "~/lib/seo";
import { storefrontClientContext } from "~/lib/storefront";

import type { Route } from "./+types/piece";

/**
 * Price, variants, availability and the bag come from the Storefront API; the words come from
 * the local catalog by handle. Royal American pieces are drafts in Shopify (price on request),
 * so they render from the catalog alone; so does every piece when the store is not reachable.
 */
export async function loader({ params, request, context }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const local = pieceByHandle(params.handle);
  const open3d = url.searchParams.get("view") === "3d";
  if (local?.concept || local?.oneOfOne) return { handle: params.handle, open3d: false, product: null };
  let product: PieceProduct | null = null;
  try {
    const sf = context.get(storefrontClientContext);
    const selectedOptions = getSelectedProductOptions({ searchParams: url.searchParams, allowedOptionNames: [...PIECE_OPTION_NAMES] });
    const { data, errors } = await sf.graphql(PIECE_QUERY, { variables: { handle: params.handle, selectedOptions } });
    if (errors) console.error(`Piece query failed: ${errors.map((e) => e.message).join("; ")}`);
    product = data?.product ?? null;
  } catch (e) {
    console.error("Piece query threw", e);
  }
  if (!product && !local) throw new Response("Not found", { status: 404 });
  return { handle: params.handle, open3d, product };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const p = pieceByHandle(data?.handle ?? "");
  const product = data?.product ?? null;
  const manMade = p?.versions.some((v) => v.origin === "man-made") ?? false;
  const name = product?.title ?? p?.name ?? "A piece";
  const tier = p ? tierBySlug(p.tier) : null;
  const design = p ? designBySlug(p.design) : undefined;
  const handle = data?.handle ?? "";
  return pageMeta(
    { title: manMade ? `${name}, lab-grown diamond` : name, description: p?.description ?? "", path: `/pieces/${handle}`, og: `pieces/${handle}`, image: (PIECE_PHOTOS[handle] ?? ["hero-box"])[0] },
    [
      product ? productJsonLdFromStorefront(product, p, design) : p ? productJsonLd(p, design) : {},
      breadcrumbJsonLd([...(tier ? [{ name: tier.name, href: `/${tier.slug}` }] : []), ...(design ? [{ name: design.name, href: `/designs/${design.slug}` }] : []), { name, href: `/pieces/${handle}` }]),
    ],
  );
};

export default function PiecePage({ loaderData }: Route.ComponentProps) {
  const { product, handle, open3d } = loaderData;
  const piece = pieceByHandle(handle);
  const navigate = useNavigate();
  const location = useLocation();
  const selectionQuery = useRef<URLSearchParams | null>(null);
  const requestedMetal = new URLSearchParams(location.search).get("Metal");
  const initialMetal = product ? (metalKeyFromLabel(product.selectedOrFirstAvailableVariant?.selectedOptions.find((o) => o.name === "Metal")?.value ?? "") ?? piece?.metals[0] ?? "14k-yellow") : (piece?.metals.find((m) => METAL_LABEL[m] === requestedMetal) ?? piece?.metals[0] ?? "14k-yellow");
  const [metal, setMetal] = useState<Metal>(initialMetal);
  useEffect(() => setMetal(initialMetal), [initialMetal, handle]);

  const tier = piece ? tierBySlug(piece.tier) : null;
  const design = piece ? designBySlug(piece.design) : undefined;
  const royal = piece?.tier === "royal-american";
  const title = product?.title ?? piece?.name ?? "";
  const embed = product?.modelEmbed?.value ?? undefined;
  const model = royal ? undefined : (modelFor(handle) ?? (embed ? { embed } : undefined));
  const galleryModel = model && embed ? { ...model, embed } : model;
  // "See it in the light": the default on pieces with a stone, behind the first photograph (council 2026-10-13).
  // Royal American is seen in the light on its own page, not here. The stone drawn is the selected version's carat.
  const viewingSpec = royal ? undefined : viewingFor(handle);
  const versionLabel = product?.selectedOrFirstAvailableVariant?.selectedOptions.find((o) => o.name === "Version")?.value ?? piece?.versions[0]?.name ?? "";
  const caratMatch = /(\d+(?:\.\d+)?)\s*ct/.exec(versionLabel) ?? /(\d+(?:\.\d+)?)\s*ct/.exec(piece?.versions.find((v) => v.name === versionLabel)?.stones ?? "");
  const carat = caratMatch ? Number(caratMatch[1]) : undefined;

  const buyColumn = royal && piece ? (
    <div className="royal-enquiry"><p className="label">One of one</p><p className="font-display text-[1.75rem]">Price on request</p><Link className="btn mt-6" to={`/appointments?tier=royal-american&piece=${piece.handle}`}>Request a private viewing</Link><StoreChoice storeQuery={`tier=royal-american&piece=${piece.handle}`} /></div>
  ) : piece?.concept ? (
    <div className="concept-enquiry"><p className="label">Design concept</p><p className="font-text">Materials, dimensions and price confirmed at consultation.</p><Link className="btn" to={`/appointments?piece=${piece.handle}`}>Discuss this design</Link><StoreChoice storeQuery={`piece=${piece.handle}`} /></div>
  ) : product ? (
    <ProductProvider
      product={product}
      onSelect={(result) => {
        const query = selectionQuery.current ?? new URLSearchParams(location.search);
        selectionQuery.current = null;
        void navigate(pieceUrl(product, result.selectedOptions, result.selectedVariant?.product?.handle, query), { replace: true, preventScrollReset: true });
      }}
    >
      <PieceForm key={handle} product={product} piece={piece} onMetal={setMetal} onSelectionQuery={(query) => { selectionQuery.current = query; }} />
    </ProductProvider>
  ) : piece ? (
    <PieceConfigurator key={`${handle}:${location.search}`} piece={piece} onMetal={setMetal} />
  ) : null;

  return (
    <>
      <Section className="pdp-breadcrumb pt-3 md:pt-4">
        <nav className="label flex flex-wrap items-center gap-x-2" aria-label="Breadcrumb">
          {tier && (
            <Link to={`/${tier.slug}`} className="inline-flex min-h-11 items-center hover:text-ink">
              {tier.name}
            </Link>
          )}
          {design && (
            <>
              <span aria-hidden>/</span>
              <Link to={`/designs/${design.slug}`} className="inline-flex min-h-11 items-center hover:text-ink">
                {design.name}
              </Link>
            </>
          )}
        </nav>
      </Section>

      <Section className="pdp-main">
        <div className={`piece-layout ${royal ? "royal-piece" : ""}`}>
          <div className="pdp-heading">
            <h1>{title}</h1>
            {piece && !piece.concept && <p className="label">Ref. {pieceRef(piece)}{royal ? `, Royal American No. ${piece.oneOfOne?.number}` : tier ? `, ${tier.name}` : ""}</p>}
          </div>
          <div className="pdp-gallery">
            <PieceGallery
              photos={PIECE_PHOTOS[handle] ?? ["hero-box"]}
              title={title}
              caption={handle === "shooting-star-ring" ? "Natural diamond version shown. Concept photograph." : handle === "prism-band" ? "Solid gold version shown. Concept photograph." : "Concept photograph. Selected options may differ."}
              model={galleryModel}
              metal={metalTone(metal)}
              open3d={open3d}
              viewing={viewingSpec ? { spec: viewingSpec, metal, carat } : undefined}
            />
          </div>

          <div className="pdp-buy flex flex-col gap-6">
            {buyColumn}

            {piece && <p className="pdp-description">{piece.description}</p>}
            {piece && !piece.concept && <Details piece={piece} />}
            {piece?.concept && <table className="spec"><tbody>{piece.specs.map((s) => <tr key={s.label}><th scope="row">{s.label}</th><td>{s.value}</td></tr>)}</tbody></table>}
          </div>
        </div>
      </Section>

      {piece && design && <Siblings piece={piece} designSlug={design.slug} designName={design.name} />}

    </>
  );
}

/** The spec table and the four folded answers. */
function Details({ piece }: { piece: Piece }) {
  const manMade = piece.versions.some((v) => v.origin === "man-made");
  if (piece.oneOfOne) return <div className="font-text flex flex-col gap-5"><p>This registry entry is an illustrative design concept. Availability, stone weights, origin, treatment and reports must be confirmed with the house.</p></div>;
  return (
    <>
      <table className="spec">
        <tbody>
          {piece.specs.map((s) => (
            <tr key={s.label}>
              <th scope="row">{s.label}</th>
              <td className="font-text">{s.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <details className="acc border-b border-hair">
          <summary>{manMade ? "The stone and its report" : "The stones"}</summary>
          <div className="font-text flex flex-col gap-3 pb-6 text-[1rem] text-ink-2">
            {manMade ? (
              <>
                <p>D to F color, VVS1 or VVS2, Ideal cut. Growth method and any post-growth treatment are printed on the IGI report. Not mined.</p>
                <p>
                  Stones from 0.30 ct carry an IGI report, laser inscribed on the girdle, verifiable at{" "}
                  <a href="https://www.igi.org/verify-your-report/" className="link-quiet" target="_blank" rel="noreferrer">
                    igi.org
                  </a>
                  .
                </p>
              </>
            ) : (
              <>
                <p>Natural diamonds are F to G color, VS1, Excellent cut. Center stones carry a GIA report; any treatment is disclosed before purchase.</p>
                <p>Birthstone versions take one natural gemstone of your choosing. We will tell you which stones suit daily wear.</p>
              </>
            )}
          </div>
        </details>
        <details className="acc border-b border-hair">
          <summary>Care and warranty</summary>
          <p className="font-text pb-6 text-[1rem] text-ink-2">
            Cleaning and inspection at either store, at no charge, for life. Defects in materials and workmanship covered for the life of the piece. The center stone is not covered; insure it separately. Terms on the{" "}
            <Link to="/policies#warranty" className="link-quiet">
              policies page
            </Link>
            .
          </p>
        </details>
        <details className="acc border-b border-hair">
          <summary>Delivery and returns</summary>
          <p className="font-text pb-6 text-[1rem] text-ink-2">
            Insured, signature required, in the house box, or collected in either store. Confirm the return and exchange terms for your selected configuration before ordering. See the policies page or contact the store.
          </p>
        </details>
        <details className="acc border-b border-hair">
          <summary>A question about this piece</summary>
          <p className="font-text pb-6 text-[1rem] text-ink-2">
            Call{" "}
            {STORES.map((s, i) => (
              <span key={s.slug}>
                {i ? " or " : ""}
                {s.name} at{" "}
                <a href={`tel:${s.phone.replace(/\D/g, "")}`} className="link-quiet num">{s.phone}</a>
              </span>
            ))}{" "}
            to discuss the piece, or{" "}
            <Link to={`/appointments?piece=${piece.handle}`} className="link-quiet">
              book an hour
            </Link>
            .
          </p>
        </details>
      </div>
    </>
  );
}

/** The siblings in the design, as a ledger of names: one photograph per row, the price aligned. */
function Siblings({ piece, designSlug, designName }: { piece: Piece; designSlug: string; designName: string }) {
  const siblings = piecesForDesign(piece.design).filter((p) => p.handle !== piece.handle && p.tier === piece.tier && !p.oneOfOne).slice(0, 4);
  if (siblings.length === 0) return null;
  return (
    <Section className="related-pieces">
        <div className="house-heading">
          <h2 className="h-section text-[1.75rem] md:text-[2.25rem]">More in this design</h2>
          <Link to={`/designs/${designSlug}`} className="link self-start">
            The {designName} design
          </Link>
        </div>
          <PieceLedger pieces={siblings} />
    </Section>
  );
}
