"use server";

import { admin, adminConfigured, shopifyConfigured, storefront, ShopifyError } from "./client";

/** What the bag remembers about a line, enough to find it again in Shopify. */
export type BagSelection =
  | {
      kind: "piece";
      handle: string; // Shopify product handle = catalog handle
      version: string; // option "Version" value, e.g. "Natural diamond"
      metal: string; // option "Metal" value, e.g. "14k yellow gold"
      size?: string;
      engraving?: string;
    }
  | {
      kind: "design"; // a ring from the builder: custom price, no variant
      code: string;
      title: string;
      priceCents: number;
      size: string;
      engraving?: string;
    };

export interface CheckoutLine {
  selection: BagSelection;
  quantity: number;
}

export type CheckoutResult = { url: string } | { error: string };

const NOT_READY = "Checkout is not open yet. Call either store or book an appointment and we will hold your selection.";

export async function startCheckout(lines: CheckoutLine[]): Promise<CheckoutResult> {
  if (!lines.length) return { error: "Your bag is empty." };
  if (!shopifyConfigured()) return { error: NOT_READY };

  try {
    const hasDesign = lines.some((l) => l.selection.kind === "design");
    if (hasDesign) {
      if (!adminConfigured()) return { error: "A designed ring is priced by the bench before checkout. Book an appointment or call and we will send an invoice." };
      return { url: await draftOrderCheckout(lines) };
    }
    return { url: await cartCheckout(lines) };
  } catch (e) {
    const message = e instanceof ShopifyError ? e.message : "Something went wrong starting checkout.";
    console.error("[checkout]", e);
    return { error: message };
  }
}

/* ------------------------------------------------------------------ */
/* Storefront cart (catalog pieces)                                    */
/* ------------------------------------------------------------------ */

const VARIANT_QUERY = /* GraphQL */ `
  query Variant($handle: String!, $options: [SelectedOptionInput!]!) {
    product(handle: $handle) {
      variantBySelectedOptions(selectedOptions: $options, ignoreUnknownOptions: true) {
        id
        availableForSale
      }
    }
  }
`;

const CART_CREATE = /* GraphQL */ `
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart { checkoutUrl }
      userErrors { field message }
    }
  }
`;

interface VariantData {
  product: { variantBySelectedOptions: { id: string; availableForSale: boolean } | null } | null;
}

interface CartData {
  cartCreate: { cart: { checkoutUrl: string } | null; userErrors: { message: string }[] };
}

const pieceAttributes = (s: Extract<BagSelection, { kind: "piece" }>) =>
  [
    s.size ? { key: "Size", value: s.size } : null,
    s.engraving ? { key: "Engraving", value: s.engraving } : null,
  ].filter((a): a is { key: string; value: string } => a !== null);

async function resolveVariant(s: Extract<BagSelection, { kind: "piece" }>): Promise<string> {
  const data = await storefront<VariantData>(VARIANT_QUERY, {
    handle: s.handle,
    options: [
      { name: "Version", value: s.version },
      { name: "Metal", value: s.metal },
    ],
  });
  const v = data.product?.variantBySelectedOptions;
  if (!v) throw new ShopifyError(`We could not find ${s.version} in ${s.metal} for this piece.`);
  return v.id;
}

async function cartCheckout(lines: CheckoutLine[]): Promise<string> {
  const cartLines = await Promise.all(
    lines.map(async (l) => {
      const s = l.selection as Extract<BagSelection, { kind: "piece" }>;
      return { merchandiseId: await resolveVariant(s), quantity: l.quantity, attributes: pieceAttributes(s) };
    }),
  );
  const data = await storefront<CartData>(CART_CREATE, { input: { lines: cartLines } });
  const err = data.cartCreate.userErrors[0];
  if (err) throw new ShopifyError(err.message);
  const url = data.cartCreate.cart?.checkoutUrl;
  if (!url) throw new ShopifyError("No checkout URL returned");
  return url;
}

/* ------------------------------------------------------------------ */
/* Draft order (bags that hold a designed ring with a custom price)    */
/* ------------------------------------------------------------------ */

const DRAFT_ORDER_CREATE = /* GraphQL */ `
  mutation DraftOrderCreate($input: DraftOrderInput!) {
    draftOrderCreate(input: $input) {
      draftOrder { id invoiceUrl }
      userErrors { field message }
    }
  }
`;

interface DraftOrderData {
  draftOrderCreate: { draftOrder: { id: string; invoiceUrl: string | null } | null; userErrors: { message: string }[] };
}

async function draftOrderCheckout(lines: CheckoutLine[]): Promise<string> {
  const lineItems = await Promise.all(
    lines.map(async (l) => {
      const s = l.selection;
      if (s.kind === "piece") {
        return { variantId: await resolveVariant(s), quantity: l.quantity, customAttributes: pieceAttributes(s) };
      }
      return {
        title: s.title,
        quantity: l.quantity,
        requiresShipping: true,
        taxable: true,
        originalUnitPriceWithCurrency: { amount: (s.priceCents / 100).toFixed(2), currencyCode: "USD" },
        customAttributes: [
          { key: "Design code", value: s.code },
          { key: "Size", value: s.size },
          ...(s.engraving ? [{ key: "Engraving", value: s.engraving }] : []),
        ],
      };
    }),
  );
  const data = await admin<DraftOrderData>(DRAFT_ORDER_CREATE, {
    input: { lineItems, tags: ["builder"], note: "Created from the ring builder on the website." },
  });
  const err = data.draftOrderCreate.userErrors[0];
  if (err) throw new ShopifyError(err.message);
  const url = data.draftOrderCreate.draftOrder?.invoiceUrl;
  if (!url) throw new ShopifyError("No invoice URL returned");
  return url;
}
