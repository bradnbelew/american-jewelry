import { canAddToCart } from "@shopify/hydrogen";
import { ShopPayButton } from "@shopify/hydrogen/react";
import { useMemo, useState, type MouseEvent, type ReactNode } from "react";
import { Link, useLocation } from "react-router";

import { openCartDrawer } from "~/lib/cart-drawer";
import { PIECE_PHOTOS } from "~/lib/catalog/photos";
import type { Metal, Piece } from "~/lib/catalog/types";
import { formatPriceRound } from "~/lib/money";
import { metalKeyFromLabel, pieceUrl, useProductForm } from "~/lib/product";
import type { PieceProduct } from "~/lib/piece-query";
import { explicitSize, sizeIsReady } from "~/lib/piece-selection";

import { SaveButton } from "./saved/SaveButton";

const METAL_SWATCH: Record<Metal, string> = {
  "14k-yellow": "#d6b25e",
  "18k-yellow": "#dcb04c",
  "14k-rose": "#d9a083",
  "14k-white": "#e3e4e6",
  platinum: "#cfd2d6",
};

/**
 * The buy column on Storefront data. Price once; one control per decision; Version and Metal
 * are variant options (GET links, so they work before JavaScript), size and engraving ride
 * along as line attributes. Nothing shifts when a choice changes.
 */
export function PieceForm({ product, piece, onMetal, onSelectionQuery }: { product: PieceProduct; piece: Piece | undefined; onMetal?: (m: Metal) => void; onSelectionQuery?: (query: URLSearchParams) => void }) {
  const { options, selectedVariant, register, formProps, errors, pending } = useProductForm();
  const location = useLocation();
  const base = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const [size, setSize] = useState(() => explicitSize(piece?.sizes, base.get("size")));
  const sizeReady = sizeIsReady(piece?.sizes, size);
  const chooseSize = () => document.getElementById(`size-${product.handle}`)?.focus();
  const [engrave, setEngrave] = useState(() => (base.get("engraving") ?? "").slice(0, 20));

  const addable = canAddToCart(product, options);
  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice;
  const priceText = selectedVariant ? formatPriceRound(price) : `From ${formatPriceRound(price)}`;
  const metalValue = selectedVariant?.selectedOptions.find((o) => o.name === "Metal")?.value;
  const versionValue = selectedVariant?.selectedOptions.find((o) => o.name === "Version")?.value;
  const version = piece?.versions.find((v) => v.name === versionValue);
  const manMade = version?.origin === "man-made";
  const stoneLine = manMade
    ? "Lab-grown diamond (laboratory-grown), D to F, VVS, IGI report."
    : (version?.stones ?? metalValue ?? "");
  const photo = (PIECE_PHOTOS[product.handle] ?? ["hero-box"])[0];
  const storeQuery = new URLSearchParams({ piece: product.handle, ...(versionValue ? { version: versionValue } : {}), ...(metalValue ? { metal: metalValue } : {}), ...(size ? { size } : {}), ...(engrave ? { engraving: engrave } : {}) }).toString();
  const savedParams = new URLSearchParams(base);
  if (size) savedParams.set("size", size);
  else savedParams.delete("size");
  if (engrave) savedParams.set("engraving", engrave);
  else savedParams.delete("engraving");
  const savedHref = pieceUrl(product, selectedVariant?.selectedOptions ?? [], product.handle, savedParams);
  // A Shop Pay permalink cannot carry line attributes, so it only appears where there is nothing to carry.
  const shopPayHere = !piece?.sizes && !engrave;
  const firstError = errors.userErrors[0]?.message ?? errors.networkErrors[0]?.message ?? null;

  const linkClick = (onClick: () => void) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey || (event.currentTarget.target && event.currentTarget.target !== "_self")) return;
    event.preventDefault();
    onClick();
  };

  return (
    <div className="piece-choice-form flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <span className="num inline-block min-w-[9ch] text-[2rem] leading-none">{priceText}</span>
        <span className="piece-stone-description font-text text-ink-2">{stoneLine}</span>
        <span className="label">
          {piece?.leadTime ?? "Made to order"}. Price before sales tax.
        </span>
      </div>

      {options.map((option) => {
        if (option.values.length <= 1) return null;
        const isMetal = option.name === "Metal";
        return (
          <Field key={option.name} label={isMetal ? "Metal" : "Stone"} hint={isMetal ? metalValue : undefined}>
            <div className={isMetal ? "metal-options" : "grid gap-2"} style={!isMetal ? {gridTemplateColumns:`repeat(${Math.min(option.values.length,3)},minmax(0,1fr))`} : undefined} role="group" aria-label={option.name}>
              {option.values.map((value) => {
                const registered = register("optionValue", { optionName: option.name, value: value.name });
                const metalKey = isMetal ? metalKeyFromLabel(value.name) : null;
                const label = !isMetal && piece?.versions.find((v) => v.name === value.name)?.key === "gold" ? "No stones" : value.name;
                const content: ReactNode = isMetal ? (
                  <>
                    <span className="swatch-dot" style={{ background: metalKey ? METAL_SWATCH[metalKey] : "#ccc" }} />
                    <span className="metal-option-label">{value.name.replace(" gold", "")}</span>
                  </>
                ) : (
                  <>
                    <span>{label}</span>
                    {!value.available ? <span className="label text-[0.8125rem]">Sold out</span> : null}
                  </>
                );
                if (!value.exists) {
                  return (
                    <button key={value.name} type="button" disabled className={isMetal ? "metal-option opacity-40" : "opt !justify-center opacity-40"} aria-pressed={value.selected} aria-label={isMetal ? value.name : undefined} title={value.name}>
                      {content}
                    </button>
                  );
                }
                const to = pieceUrl(product, value.selectedOptions, value.handle, savedParams);
                return (
                  <Link
                    key={value.name}
                    to={to}
                    replace
                    preventScrollReset
                    className={isMetal ? "metal-option" : "opt !justify-center"}
                    aria-current={value.selected ? "true" : undefined}
                    aria-pressed={value.selected}
                    aria-label={isMetal ? value.name : undefined}
                    title={label}
                    data-available={value.available ? "true" : "false"}
                    onClick={linkClick(() => {
                      onSelectionQuery?.(savedParams);
                      registered.onClick();
                      if (metalKey) onMetal?.(metalKey);
                    })}
                  >
                    {content}
                    {!value.available ? <span className="sr-only"> (Sold out)</span> : null}
                  </Link>
                );
              })}
            </div>
          </Field>
        );
      })}

      {(piece?.sizes || piece?.engraving) && (
        <div className="piece-size-engraving">
          {piece?.sizes && (
            <Field label="Size" hint={<Link to="/care#sizing" className="link-quiet">Sizing help</Link>}>
              <select id={`size-${product.handle}`} form={`order-${product.handle}`} required className="field" value={size} onChange={(e) => setSize(e.target.value)} aria-label="Ring size">
                <option value="" disabled>Choose your size</option>
                {piece.sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
          )}
          {piece?.engraving && (
            <details className="engraving-option" open={Boolean(base.get("engraving"))}><summary>Add engraving <span className="label">Optional</span></summary><Field label="Engraving" hint="20 characters">
              <input id={`engrave-${product.handle}`} value={engrave} onChange={(e) => setEngrave(e.target.value.slice(0, 20))} maxLength={20} aria-label="Engraving" placeholder="Initials, a date, a word" className="field font-text text-base" autoComplete="off" />
            </Field></details>
          )}
        </div>
      )}

      <form id={`order-${product.handle}`} {...formProps({ beforeSubmit: (event) => {
        if (!sizeReady) { event.preventDefault(); chooseSize(); return; }
        openCartDrawer();
      } })} className="flex flex-col gap-3 pt-1">
        <input type="hidden" {...register("merchandiseId", {})} />
        <input type="hidden" {...register("quantity", { value: 1 })} />
        {size ? <input type="hidden" {...register("attributeValue", { key: "Size", value: size })} /> : null}
        {engrave ? <input type="hidden" {...register("attributeValue", { key: "Engraving", value: engrave })} /> : null}
        <button {...register("addToCart", {})} id={`add-${product.handle}`} className="btn" disabled={!addable || pending || !sizeReady} aria-busy={pending}>
          {!sizeReady ? "Choose size" : selectedVariant ? (addable ? "Add to bag" : "Not available") : "Choose the version"}
        </button>
        {firstError ? (
          <p className="font-text text-[0.9375rem] text-ink-2" role="alert">
            {firstError}
          </p>
        ) : null}
        {selectedVariant && shopPayHere ? <ShopPayButton variants={[{ id: selectedVariant.id, quantity: 1 }]} disabled={!addable || pending} width="100%" borderRadius="0px" /> : null}
        <div className="purchase-secondary">
          <Link to={`/appointments?${storeQuery}`} className="link">
            See it in store
          </Link>
          <SaveButton className="quiet-save" item={{ id: product.handle, href: savedHref, name: product.title, detail: [versionValue, metalValue, size ? `Size ${size}` : null].filter(Boolean).join(", "), photo }} />
        </div>
      </form>

      {/* Below 1024 the photograph fills the first screen, so the price and the action stay with it (council P1). */}
      <div className="buy-bar fixed inset-x-0 bottom-0 z-30 border-t border-hair bg-paper lg:hidden">
        <div className="wrap flex h-[4.5rem] items-center justify-between gap-4">
          <span className="flex flex-col gap-1"><span className="num text-[1.25rem] leading-none">{priceText}</span><span className="label">{piece?.sizes ? sizeReady ? `Size ${size}` : 'Size not selected' : versionValue}</span></span>
          <button
            type="button"
            className="btn"
            disabled={pending}
            onClick={() => {
              if (!sizeReady) { chooseSize(); return; }
              const real = document.getElementById(`add-${product.handle}`) as HTMLButtonElement | null;
              if (real && !real.disabled) real.click();
              else real?.closest("form")?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? "auto" : "smooth", block: "center" });
            }}
          >
            {!sizeReady ? "Choose size" : addable && selectedVariant ? "Add to bag" : "Choose the version"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex min-h-5 items-baseline justify-between gap-4 text-[0.8125rem]">
        <span className="text-ink">{label}</span>
        {hint && <span className="min-h-5 text-muted">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
