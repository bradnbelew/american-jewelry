import { getSelectedProductOptions } from "@shopify/hydrogen";
import { useState } from "react";
import { Link, useLocation, useNavigate, useRouteLoaderData } from "react-router";

import { PieceConfigurator, metalTone } from "~/components/PieceConfigurator";
import { PieceForm } from "~/components/PieceForm";
import { PieceGallery } from "~/components/PieceGallery";
import { ProductTile } from "~/components/ProductTile";
import { Section } from "~/components/Section";
import { STORES, designBySlug, pieceByHandle, pieceRef, piecesForDesign, tierBySlug } from "~/lib/catalog/data";
import { PIECE_PHOTOS } from "~/lib/catalog/photos";
import type { Metal, Piece } from "~/lib/catalog/types";
import { METAL_LABEL, PIECE_TYPE_LABEL } from "~/lib/catalog/types";
import { modelFor } from "~/lib/models";
import { PIECE_OPTION_NAMES, PIECE_QUERY, type PieceProduct } from "~/lib/piece-query";
import { ProductProvider, metalKeyFromLabel, pieceUrl } from "~/lib/product";
import { breadcrumbJsonLd, pageMeta, productJsonLd, productJsonLdFromStorefront } from "~/lib/seo";
import { storefrontClientContext } from "~/lib/storefront";
import type { loader as rootLoader } from "../root";

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
    { title: manMade ? `${name}, man-made diamond` : name, description: p?.description ?? "", path: `/pieces/${handle}`, og: `pieces/${handle}`, image: (PIECE_PHOTOS[handle] ?? ["hero-box"])[0] },
    [
      product ? productJsonLdFromStorefront(product, p, design) : p ? productJsonLd(p, design) : {},
      breadcrumbJsonLd([...(tier ? [{ name: tier.name, href: `/${tier.slug}` }] : []), ...(design ? [{ name: design.name, href: `/designs/${design.slug}` }] : []), { name, href: `/pieces/${handle}` }]),
    ],
  );
};

/** One sentence that says what the piece is made of, the material words carried in ink. */
function madeOf(p: Piece): { text: string; key?: boolean }[] {
  const metals = Array.from(new Set(p.metals.map((m) => METAL_LABEL[m].replace(/1[48]k /, "").toLowerCase())));
  const metalText = metals.length === 1 ? METAL_LABEL[p.metals[0]] : metals.length === 2 ? `${metals[0]} or ${metals[1]}` : `${metals.slice(0, -1).join(", ")} or ${metals[metals.length - 1]}`;
  const manMade = p.versions.some((v) => v.origin === "man-made");
  const natural = p.versions.some((v) => v.key === "diamond" && v.origin === "natural");
  const gem = p.versions.some((v) => v.key === "gemstone");
  const single = p.pieceType === "solitaire" || p.pieceType === "signet";
  const stone = p.oneOfOne
    ? (p.versions[0].stones ?? "").toLowerCase()
    : manMade
      ? single ? "one man\u2011made diamond" : "man\u2011made diamonds"
      : natural && gem
        ? "a birthstone or natural diamonds"
        : natural
          ? single ? "a natural diamond" : "natural diamonds"
          : "";
  const type = PIECE_TYPE_LABEL[p.pieceType].toLowerCase();
  const parts: { text: string; key?: boolean }[] = [{ text: `${/^[aeiou]/.test(type) ? "An" : "A"} ${type} in ` }, { text: metalText, key: true }];
  if (stone) parts.push({ text: ", set with " }, { text: stone, key: true });
  parts.push({ text: ", finished at our bench." });
  return parts;
}

export default function PiecePage({ loaderData }: Route.ComponentProps) {
  const { product, handle, open3d } = loaderData;
  const piece = pieceByHandle(handle);
  const navigate = useNavigate();
  const location = useLocation();
  const rootData = useRouteLoaderData<typeof rootLoader>("root");
  const layout = rootData?.explore.v ?? "c0";
  const initialMetal = product ? (metalKeyFromLabel(product.selectedOrFirstAvailableVariant?.selectedOptions.find((o) => o.name === "Metal")?.value ?? "") ?? piece?.metals[0] ?? "14k-yellow") : (piece?.metals[0] ?? "14k-yellow");
  const [metal, setMetal] = useState<Metal>(initialMetal);

  const tier = piece ? tierBySlug(piece.tier) : null;
  const design = piece ? designBySlug(piece.design) : undefined;
  const royal = piece?.tier === "royal-american";
  const title = product?.title ?? piece?.name ?? "";
  const embed = product?.modelEmbed?.value ?? undefined;
  const model = royal ? undefined : (modelFor(handle) ?? (embed ? { embed } : undefined));
  const galleryModel = model && embed ? { ...model, embed } : model;

  const buyColumn = product ? (
    <ProductProvider
      product={product}
      onSelect={(result) => {
        void navigate(pieceUrl(product, result.selectedOptions, result.selectedVariant?.product?.handle, new URLSearchParams(location.search)), { replace: true, preventScrollReset: true });
      }}
    >
      <PieceForm product={product} piece={piece} onMetal={setMetal} phoneBar={layout === "c2" || layout === "c3"} />
    </ProductProvider>
  ) : piece ? (
    <PieceConfigurator piece={piece} onMetal={setMetal} />
  ) : null;

  return (
    <>
      <Section className="pt-6 md:pt-8">
        <nav className="label flex flex-wrap gap-x-2" aria-label="Breadcrumb">
          {tier && (
            <Link to={`/${tier.slug}`} className="hover:text-ink">
              {tier.name}
            </Link>
          )}
          {design && (
            <>
              <span aria-hidden>/</span>
              <Link to={`/designs/${design.slug}`} className="hover:text-ink">
                {design.name}
              </Link>
            </>
          )}
        </nav>
      </Section>

      <Section className={`pt-6 md:pt-8 ${layout === "c2" || layout === "c3" ? "pb-24 md:pb-0" : ""}`}>
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className={layout === "c1" || layout === "c3" ? "lg:order-2 lg:col-span-7" : layout === "c2" ? "lg:col-span-8" : "lg:col-span-7"}>
            <PieceGallery photos={PIECE_PHOTOS[handle] ?? ["hero-box"]} title={title} model={galleryModel} metal={metalTone(metal)} open3d={open3d} layout={layout === "c1" || layout === "c3" ? "stage" : layout === "c2" ? "stack" : "grid"} />
          </div>

          <div className={`flex flex-col gap-8 lg:sticky lg:top-32 ${layout === "c1" || layout === "c3" ? "lg:order-1 lg:col-span-5" : layout === "c2" ? "lg:col-span-4" : "lg:col-span-5"}`}>
            <div className="flex flex-col gap-3">
              <h1 className="h-section text-[2.25rem] md:text-[2.75rem]">{title}</h1>
              {piece && (
                <p className="label">
                  Ref. {pieceRef(piece)}
                  {royal ? `, Royal American No. ${piece.oneOfOne?.number}` : tier ? `, ${tier.name}` : ""}
                </p>
              )}
              {piece && <p className="font-text text-[1.0625rem] text-ink-2">{piece.description}</p>}
            </div>

            {buyColumn}

            {piece && <Details piece={piece} />}
          </div>
        </div>
      </Section>

      {piece && (
        <Section screen width="text">
          <p className="h-display measure-display mx-auto text-center text-[2rem] md:text-[3rem] lg:text-[3.5rem]">
            {madeOf(piece).map((part, i) => (
              <span key={i}>
                {part.text}
              </span>
            ))}
          </p>
        </Section>
      )}

      {piece && design && <Siblings piece={piece} designSlug={design.slug} designName={design.name} />}

      {royal && (
        <Section className="pb-8" width="text">
          <div className="grid gap-8 md:grid-cols-2 md:gap-16">
            <h2 className="h-section text-[1.75rem] md:text-[2rem]">One of one</h2>
            <div className="font-text flex flex-col gap-4 text-ink-2">
              <p>Made once, numbered, and entered in the house registry under the name of its owner. Never made again.</p>
              <Link to="/royal-american" className="link self-start">
                The registry
              </Link>
            </div>
          </div>
        </Section>
      )}
    </>
  );
}

/** The spec table and the four folded answers. */
function Details({ piece }: { piece: Piece }) {
  const manMade = piece.versions.some((v) => v.origin === "man-made");
  const salon = STORES[1];
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
          <tr>
            <th scope="row">Made</th>
            <td className="font-text">Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported.</td>
          </tr>
        </tbody>
      </table>

      <div>
        <details className="acc border-b border-hair">
          <summary>{manMade ? "The stone and its report" : "The stones"}</summary>
          <div className="font-text flex flex-col gap-3 pb-5 text-[0.9375rem] text-ink-2">
            {manMade ? (
              <>
                <p>D to F color, VVS1 or VVS2, Ideal cut, grown by chemical vapor deposition and sold as grown. Not mined.</p>
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
          <p className="font-text pb-5 text-[0.9375rem] text-ink-2">
            Cleaning and inspection at either store, at no charge, for life. Defects in materials and workmanship covered for the original owner. The center stone is insured separately. Terms on the{" "}
            <Link to="/policies#warranty" className="link-quiet">
              policies page
            </Link>
            .
          </p>
        </details>
        <details className="acc border-b border-hair">
          <summary>Delivery and returns</summary>
          <p className="font-text pb-5 text-[0.9375rem] text-ink-2">
            Insured, signature required, in the house box, or collected in either store. Ready-to-ship pieces may be returned within 30 days. Made-to-order, engraved and sized pieces are exchangeable once the design is approved.
          </p>
        </details>
        <details className="acc border-b border-hair">
          <summary>A question about this piece</summary>
          <p className="font-text pb-5 text-[0.9375rem] text-ink-2">
            Call Mt. Juliet at{" "}
            <a href={`tel:${salon.phone.replace(/\D/g, "")}`} className="link-quiet num">
              {salon.phone}
            </a>{" "}
            and ask for the bench, or{" "}
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

function Siblings({ piece, designSlug, designName }: { piece: Piece; designSlug: string; designName: string }) {
  const siblings = piecesForDesign(piece.design).filter((p) => p.handle !== piece.handle).slice(0, 4);
  if (siblings.length === 0) return null;
  return (
    <Section className="pb-8">
      <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-6">
        <h2 className="h-section text-[1.75rem] md:text-[2.25rem]">Complete the set</h2>
        <Link to={`/designs/${designSlug}`} className="link">
          The {designName} design
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:gap-x-10 lg:max-w-4xl">
        {siblings.map((p) => (
          <ProductTile key={p.handle} piece={p} showLine={false} />
        ))}
      </div>
    </Section>
  );
}
