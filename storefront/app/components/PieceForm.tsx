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
export function PieceForm({ product, piece, onMetal }: { product: PieceProduct; piece: Piece | undefined; onMetal?: (m: Metal) => void }) {
  const { options, selectedVariant, register, formProps, errors, pending } = useProductForm();
  const location = useLocation();
  const base = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const [size, setSize] = useState<string>(piece?.sizes?.[6] ?? piece?.sizes?.[0] ?? "");
  const [engrave, setEngrave] = useState("");

  const addable = canAddToCart(product, options);
  const price = selectedVariant?.price ?? product.priceRange.minVariantPrice;
  const priceText = selectedVariant ? formatPriceRound(price) : `From ${formatPriceRound(price)}`;
  const metalValue = selectedVariant?.selectedOptions.find((o) => o.name === "Metal")?.value;
  const versionValue = selectedVariant?.selectedOptions.find((o) => o.name === "Version")?.value;
  const version = piece?.versions.find((v) => v.name === versionValue);
  const manMade = version?.origin === "man-made";
  const stoneLine = manMade
    ? "Man-made diamond (laboratory-grown), D to F, VVS, IGI report."
    : (version?.stones ?? (piece ? "Solid 14k or 18k gold, karat-marked." : ""));
  const photo = (PIECE_PHOTOS[product.handle] ?? ["hero-box"])[0];
  const storeQuery = new URLSearchParams({ piece: product.handle, ...(versionValue ? { version: versionValue } : {}), ...(metalValue ? { metal: metalValue } : {}), ...(size ? { size } : {}) }).toString();
  // A Shop Pay permalink cannot carry line attributes, so it only appears where there is nothing to carry.
  const shopPayHere = !piece?.sizes && !engrave;
  const firstError = errors.userErrors[0]?.message ?? errors.networkErrors[0]?.message ?? null;

  const linkClick = (onClick: () => void) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey || (event.currentTarget.target && event.currentTarget.target !== "_self")) return;
    event.preventDefault();
    onClick();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <span className="num inline-block min-w-[9ch] text-[2rem] leading-none">{priceText}</span>
        <span className="font-text min-h-[1.5rem] text-[0.9375rem] text-ink-2">{stoneLine}</span>
        <span className="label">
          {piece?.leadTime ?? "Made to order"}. Price before sales tax.
        </span>
      </div>

      {options.map((option) => {
        if (option.values.length <= 1) return null;
        const isMetal = option.name === "Metal";
        return (
          <Field key={option.name} label={option.name} hint={isMetal ? metalValue : undefined}>
            <div className={isMetal ? "flex flex-wrap gap-x-8 gap-y-2" : option.values.length <= 3 ? "grid grid-cols-3 gap-2" : "flex flex-col gap-2"} role="group" aria-label={option.name}>
              {option.values.map((value) => {
                const registered = register("optionValue", { optionName: option.name, value: value.name });
                const metalKey = isMetal ? metalKeyFromLabel(value.name) : null;
                const content: ReactNode = isMetal ? (
                  <>
                    <span className="swatch-dot" style={{ background: metalKey ? METAL_SWATCH[metalKey] : "#ccc" }} />
                    <span className="label absolute -bottom-5 left-1/2 w-max -translate-x-1/2 text-[0.6875rem]">{value.name.replace(" gold", "")}</span>
                  </>
                ) : (
                  <>
                    <span>{value.name}</span>
                    {!value.available ? <span className="label text-[0.6875rem]">Sold out</span> : null}
                  </>
                );
                if (!value.exists) {
                  return (
                    <button key={value.name} type="button" disabled className={isMetal ? "swatch relative mb-5 opacity-40" : "opt justify-center opacity-40"} aria-pressed={value.selected} aria-label={isMetal ? value.name : undefined} title={value.name}>
                      {content}
                    </button>
                  );
                }
                const to = pieceUrl(product, value.selectedOptions, value.handle, base);
                return (
                  <Link
                    key={value.name}
                    to={to}
                    replace
                    preventScrollReset
                    className={isMetal ? "swatch relative mb-5" : "opt justify-center"}
                    aria-current={value.selected ? "true" : undefined}
                    aria-pressed={value.selected}
                    aria-label={isMetal ? value.name : undefined}
                    title={value.name}
                    data-available={value.available ? "true" : "false"}
                    onClick={linkClick(() => {
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
        <div className={`grid gap-4 ${piece?.sizes && piece?.engraving ? "grid-cols-[minmax(0,2fr)_minmax(0,3fr)]" : "grid-cols-1"}`}>
          {piece?.sizes && (
            <Field label="Size" hint={<Link to="/care#sizing" className="link-quiet">Help</Link>}>
              <select id={`size-${product.handle}`} className="field" value={size} onChange={(e) => setSize(e.target.value)} aria-label="Ring size">
                {piece.sizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
          )}
          {piece?.engraving && (
            <Field label="Engraving" hint="20 characters">
              <input id={`engrave-${product.handle}`} value={engrave} onChange={(e) => setEngrave(e.target.value.slice(0, 20))} maxLength={20} placeholder="Initials, a date, a word" className="field font-text text-base" autoComplete="off" />
            </Field>
          )}
        </div>
      )}

      <form {...formProps({ beforeSubmit: () => openCartDrawer() })} className="flex flex-col gap-3 pt-1">
        <input type="hidden" {...register("merchandiseId", {})} />
        <input type="hidden" {...register("quantity", { value: 1 })} />
        {size ? <input type="hidden" {...register("attributeValue", { key: "Size", value: size })} /> : null}
        {engrave ? <input type="hidden" {...register("attributeValue", { key: "Engraving", value: engrave })} /> : null}
        <button {...register("addToCart", {})} className="btn" disabled={!addable || pending} aria-busy={pending}>
          {selectedVariant ? (addable ? "Add to bag" : "Not available") : "Choose the version"}
        </button>
        {firstError ? (
          <p className="font-text text-[0.9375rem] text-ink-2" role="alert">
            {firstError}
          </p>
        ) : null}
        {selectedVariant && shopPayHere ? <ShopPayButton variants={[{ id: selectedVariant.id, quantity: 1 }]} disabled={!addable || pending} width="100%" borderRadius="0px" /> : null}
        <div className="grid grid-cols-2 gap-3">
          <Link to={`/appointments?${storeQuery}`} className="btn btn-outline">
            See it in store
          </Link>
          <SaveButton item={{ id: product.handle, href: `/pieces/${product.handle}`, name: product.title, detail: versionValue ?? "", photo }} />
        </div>
      </form>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex h-5 items-baseline justify-between gap-4 text-[0.8125rem]">
        <span className="text-ink">{label}</span>
        {hint && <span className="min-h-5 text-muted">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
