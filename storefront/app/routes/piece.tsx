import { getSelectedProductOptions } from "@shopify/hydrogen";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { PieceConfigurator, metalTone } from "~/components/PieceConfigurator";
import { PieceForm } from "~/components/PieceForm";
import { PieceGallery } from "~/components/PieceGallery";
import { PieceCard } from "~/components/Catalog";
import { Section } from "~/components/Section";
import { viewingFor } from "~/components/three/viewing/pieces";
import { categoryOf } from "~/lib/catalog/browse";
import { materialLine } from "~/lib/catalog/browse";
import { designBySlug, isPublicPiece, pieceByHandle, piecesForDesign } from "~/lib/catalog/data";
import { envContext } from "~/lib/env";
import { isLive } from "~/lib/site";
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
  if (local && !isPublicPiece(local, isLive(context.get(envContext)))) throw new Response("Not found", { status: 404 });
  if (local?.concept || local?.oneOfOne || local?.tier === "royal-american") return { handle: params.handle, open3d: false, product: null };
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
  const design = p ? designBySlug(p.design) : undefined;
  const handle = data?.handle ?? "";
  const crumbs = p ? crumbTrail(p) : [];
  return pageMeta(
    { title: manMade ? `${name}, lab-grown diamond` : name, description: p?.description ?? "", path: `/pieces/${handle}`, image: (PIECE_PHOTOS[handle] ?? ["hero-box"])[0] },
    [
      product ? productJsonLdFromStorefront(product, p, design) : p ? productJsonLd(p, design) : {},
      breadcrumbJsonLd([...crumbs, { name, href: `/pieces/${handle}` }]),
    ],
  );
};

function crumbTrail(piece: Piece) {
  if (piece.tier === "royal-american") return [{ name: "High Jewelry", href: "/royal-american" }];
  if (piece.collections.includes("bridal")) return [{ name: "Bridal", href: "/collections/bridal" }, { name: "Engagement rings", href: "/collections/bridal" }];
  const category = categoryOf(piece);
  return [{ name: "Jewelry", href: "/jewelry" }, ...(category ? [{ name: category.name, href: `/jewelry/${category.slug}` }] : [])];
}

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

  const design = piece ? designBySlug(piece.design) : undefined;
  const royal = piece?.tier === "royal-american";
  const crumbs = piece ? crumbTrail(piece) : [];
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

  const buyColumn = product ? (
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
      <Section className="pdp-main">
        <div className="piece-layout">
          <div className="pdp-gallery">
            <PieceGallery
              photos={PIECE_PHOTOS[handle] ?? ["hero-box"]}
              title={title}
              model={galleryModel}
              metal={metalTone(metal)}
              open3d={open3d}
              viewing={viewingSpec ? { spec: viewingSpec, metal, carat } : undefined}
            />
          </div>

          <div className="pdp-buy flex flex-col gap-6">
            <nav className="crumb" aria-label="Breadcrumb">
              {crumbs.map((crumb, index) => (
                <span key={crumb.href}>
                  {index > 0 ? " / " : null}
                  <Link to={crumb.href}>{crumb.name}</Link>
                </span>
              ))}
            </nav>
            <h1 className="pdp-name">{title}</h1>
            {piece ? <p className="body">{materialLine(piece)}</p> : null}
            {buyColumn}
            <ul className="pdp-services">
              <li className="small">Collect in Brentwood or Mt. Juliet.</li>
              <li className="small">30-day returns on unworn, unaltered pieces. <Link to="/policies#returns">Details</Link></li>
              <li className="small">Lifetime care: cleaning and inspection at no charge.</li>
              <li className="small">Questions? Call or text <a href="tel:6154572089">(615) 457-2089</a>.</li>
            </ul>
            {piece ? <Details piece={piece} /> : null}
          </div>
        </div>
      </Section>

      {piece && design ? <Siblings piece={piece} designName={design.name} /> : null}
    </>
  );
}

const HIDDEN_SPEC = /illustrative|unconfirmed|concept|proposed/i;

function Details({ piece }: { piece: Piece }) {
  const specs = piece.specs.filter((spec) => !HIDDEN_SPEC.test(`${spec.label} ${spec.value}`));
  const manMade = piece.versions.some((version) => version.origin === "man-made");
  return (
    <div>
      <details className="acc border-b border-hair">
        <summary className="caps">Details</summary>
        <div className="flex flex-col gap-3 pb-6">
          <p className="body">{piece.description}</p>
          {specs.length > 0 ? (
            <table className="spec">
              <tbody>
                {specs.map((spec) => (
                  <tr key={spec.label}>
                    <th scope="row">{spec.label}</th>
                    <td>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
      </details>
      <details className="acc border-b border-hair">
        <summary className="caps">Stones and certificate</summary>
        <div className="pb-6">
          {manMade ? (
            <p className="body">Lab-grown diamond, D to F color, VVS clarity, IGI report. Growth method and any treatment are on the report.</p>
          ) : (
            <p className="body">Natural diamonds are disclosed with their report before you buy. Gemstone versions use one natural stone, and we will tell you which stones suit daily wear.</p>
          )}
        </div>
      </details>
      <details className="acc border-b border-hair">
        <summary className="caps">Care and warranty</summary>
        <p className="body pb-6">Cleaning and inspection at either store, at no charge, for as long as you own the piece. <Link to="/policies#warranty">Warranty</Link></p>
      </details>
      <details className="acc border-b border-hair">
        <summary className="caps">Shipping and returns</summary>
        <p className="body pb-6">Collect in Brentwood or Mt. Juliet. 30-day returns on unworn, unaltered pieces. <Link to="/policies#returns">Details</Link></p>
      </details>
    </div>
  );
}

function Siblings({ piece, designName }: { piece: Piece; designName: string }) {
  const siblings = piecesForDesign(piece.design).filter((item) => item.handle !== piece.handle && !item.oneOfOne).slice(0, 4);
  if (siblings.length === 0) return null;
  return (
    <Section className="related-pieces">
      <h2>You may also like</h2>
      <p className="small mute">{designName}</p>
      <ul className="piece-grid">
        {siblings.map((item) => (
          <li key={item.handle}>
            <PieceCard piece={item} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
