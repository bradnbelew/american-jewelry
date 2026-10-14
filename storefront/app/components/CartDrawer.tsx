import { useEffect, useMemo, useState, type SubmitEvent } from "react";
import { Link } from "react-router";

import { useCart, useCartForm } from "~/lib/cart";
import { closeCartDrawer, configureOpenCartAction, CART_DRAWER_ID } from "~/lib/cart-drawer";
import { formatPriceRound } from "~/lib/money";
import { PIECE_PHOTOS } from "~/lib/catalog/photos";
import { bagLineLeadTime, bagLineName } from "~/lib/product";

import { publishCartViewed } from "./AnalyticsTrackers";
import { Pic } from "./Pic";

/*
 * The bag. Navy velvet, the only other navy surface besides Royal American. Each line carries the
 * stone qualifier and its attributes; "What arrives" says when and how; one honesty line; Checkout
 * hands off to Shopify. No discount field, no note, no upsell. docs/briefs/site/pages/utility.md.
 */

function CartErrorBanner() {
  const errors = useCart((state) => state.errors);
  const [dismissedAt, setDismissedAt] = useState(0);
  const messages = useMemo(() => {
    const lines = [...errors.lines.values()].flatMap((group) => group.userErrors);
    return [...errors.network, ...errors.cart.userErrors, ...lines].map((error) => error.message);
  }, [errors]);

  if (messages.length === 0 || errors.lastUpdatedAt <= dismissedAt) return null;

  return (
    <div className="mx-6 mb-2 border border-paper/30 p-3 text-sm" role="alert">
      <div className="flex items-start justify-between gap-3">
        <div className="font-text grid gap-1">
          {messages.map((message) => (
            <p key={message}>{message}</p>
          ))}
        </div>
        <button type="button" className="caps shrink-0 px-2 py-1 hover:text-paper/70" onClick={() => setDismissedAt(errors.lastUpdatedAt)}>
          Dismiss
        </button>
      </div>
    </div>
  );
}

function hasPendingCost(pending: { cost?: boolean; discountCodes: Set<string>; lines: Set<string> }): boolean {
  return pending.cost ?? (pending.lines.size > 0 || pending.discountCodes.size > 0);
}

function useCartStatusMessage(): string {
  const pending = useCart((state) => state.pending);
  const revalidating = useCart((state) => "revalidating" in state && state.revalidating === true);
  const networkErrors = useCart((state) => state.errors.network);
  const isPending = hasPendingCost(pending) || revalidating;
  const [sawPending, setSawPending] = useState(false);

  useEffect(() => {
    if (isPending) setSawPending(true);
  }, [isPending]);

  if (isPending) return "Updating the bag";
  if (sawPending && networkErrors.length === 0) return "Bag updated";
  return "";
}

type CartLineView = {
  id: string;
  quantity: number;
  cost: { totalAmount: { amount: string; currencyCode: string } };
  attributes?: Array<{ key: string; value: string | null }>;
  merchandise?: {
    title?: string | null;
    selectedOptions?: Array<{ name: string; value: string }> | null;
    image?: { url: string; altText?: string | null } | null;
    product?: { title?: string | null; handle?: string | null } | null;
  } | null;
};

export function CartLineItem({ line, emptyCartFocusId }: { line: CartLineView; emptyCartFocusId: string }) {
  const { formProps, register } = useCartForm();
  const pendingLines = useCart((state) => state.pending.lines);
  const lineError = useCart((state) => state.errors.lines.get(line.id));
  const merchandise = line.merchandise;
  const product = merchandise?.product;
  const pending = pendingLines.has(line.id);
  const name = bagLineName(product?.handle, product?.title ?? merchandise?.title ?? "Piece", merchandise?.selectedOptions, merchandise?.title);
  const attributes = (line.attributes ?? []).filter((a) => !a.key.startsWith("_") && a.value != null);
  const photo = product?.handle ? PIECE_PHOTOS[product.handle]?.[0] : undefined;
  const selection = new URLSearchParams((merchandise?.selectedOptions ?? []).map(({name, value}) => [name, value]));
  for (const attribute of attributes) {
    if (attribute.key === "Size") selection.set("size", attribute.value!);
    if (attribute.key === "Engraving") selection.set("engraving", attribute.value!);
  }
  const errorId = `bag-line-error-${line.id.replace(/[^a-zA-Z0-9_-]/g, "-")}`;

  // Removing a line unmounts the control that holds focus. Move it to a neighbouring line first.
  const moveFocusBeforeRemoval = (event: SubmitEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (!form.contains(document.activeElement)) return;
    const intent = event.nativeEvent.submitter?.getAttribute("value");
    const quantity = new FormData(form).get("quantity");
    const removesLine = intent === "remove" || (intent === "decrease" && line.quantity <= 1) || (intent === "set" && Number(quantity) <= 0);
    if (!removesLine) return;
    const item = form.closest("li");
    const neighbour = item?.nextElementSibling ?? item?.previousElementSibling;
    const selector = intent === "set" ? 'input[name="quantity"]' : `button[value="${intent}"]`;
    const target = neighbour?.querySelector<HTMLElement>(selector) ?? document.getElementById(emptyCartFocusId);
    target?.focus();
  };

  return (
    <li className={`flex gap-4 py-5 transition-opacity ${pending ? "opacity-60" : ""}`} data-testid="cart-line" {...(pending ? { "aria-busy": "true" } : {})}>
      <div className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden bg-paper">
        {photo ? <Pic k={photo} sizes="80px" fit="contain" /> : merchandise?.image ? <img src={merchandise.image.url} alt={merchandise.image.altText ?? ""} className="absolute inset-0 h-full w-full object-contain" loading="lazy" /> : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="font-display text-[1.0625rem] leading-snug">
          {product?.handle ? (
            <Link to={`/pieces/${product.handle}?${selection}`} className="hover:text-paper/70" onClick={() => closeCartDrawer()}>
              {name}
            </Link>
          ) : (
            name
          )}
        </p>
        {attributes.length > 0 ? (
          <dl className="label flex flex-wrap gap-x-4 gap-y-0.5">
            {attributes.map((attr) => (
              <div key={attr.key} className="flex gap-1.5">
                <dt>{attr.key}</dt>
                <dd className="text-paper">{attr.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        <p className={`num text-[0.9375rem] ${pending ? "opacity-50" : ""}`}>{formatPriceRound(line.cost.totalAmount)}</p>
        <form {...formProps({ beforeSubmit: moveFocusBeforeRemoval })} className="flex items-center gap-3">
          <button {...register("set")} />
          <input type="hidden" {...register("lineId", { value: line.id })} />
          <div className="inline-flex h-10 items-center border border-paper/30">
            <button type="submit" {...register("decrease")} className="inline-flex h-10 w-10 items-center justify-center hover:bg-navy-2" aria-label={`One fewer ${name}`}>
              <span aria-hidden>&minus;</span>
            </button>
            <input
              {...register("quantity", { value: line.quantity, interactive: true })}
              className={`num h-10 w-10 border-0 bg-transparent p-0 text-center text-[1rem] text-paper ${pending ? "opacity-50" : ""}`}
              aria-label="Quantity"
              aria-describedby={lineError?.userErrors.length ? errorId : undefined}
              aria-invalid={lineError?.userErrors.length ? true : undefined}
            />
            <button type="submit" {...register("increase")} className="inline-flex h-10 w-10 items-center justify-center hover:bg-navy-2" aria-label={`One more ${name}`}>
              <span aria-hidden>+</span>
            </button>
          </div>
          <button type="submit" {...register("remove")} className="caps inline-flex h-10 items-center px-2 text-paper/70 hover:text-paper" aria-label={`Remove ${name}`}>
            Remove
          </button>
        </form>
        {lineError?.userErrors.length ? (
          <p id={errorId} className="font-text text-sm" role="alert">
            {lineError.userErrors[0]?.message}
          </p>
        ) : null}
      </div>
    </li>
  );
}

export function CartLines({ emptyCartFocusId }: { emptyCartFocusId: string }) {
  const loading = useCart((state) => state.loading);
  const lines = useCart((state) => state.data.lines.nodes);

  if (loading) return <p className="label flex min-h-[6rem] items-center">Opening the bag</p>;

  if (lines.length === 0) {
    return (
      <div className="flex h-full flex-col items-start justify-center gap-5">
        <p className="font-display text-[1.5rem]">Your bag is empty.</p>
        <Link to="/jewelry" className="link link-light" onClick={() => closeCartDrawer()}>
          Browse jewelry
        </Link>
      </div>
    );
  }

  return (
    <ul role="list" className="-mt-5 divide-y divide-paper/20">
      {lines.map((line) => (
        <CartLineItem key={line.id} line={line} emptyCartFocusId={emptyCartFocusId} />
      ))}
    </ul>
  );
}

/** What arrives, the subtotal, the one honesty line, the handoff to checkout. */
export function CartSummary() {
  const cart = useCart((state) => state.data);
  const pending = useCart((state) => state.pending);
  const revalidating = useCart((state) => "revalidating" in state && state.revalidating === true);
  const hasLines = cart.lines.nodes.length > 0;
  const isPending = hasPendingCost(pending) || revalidating;
  const leadTimes = Array.from(new Set(cart.lines.nodes.map((l) => bagLineLeadTime(l.merchandise?.product?.handle)).filter((x): x is string => !!x)));

  if (!hasLines) return null;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-baseline justify-between" aria-busy={isPending}>
        <span className="font-text">Subtotal</span>
        <span className={`num text-[1.125rem] ${isPending ? "opacity-50" : ""}`}>{formatPriceRound(cart.cost.subtotalAmount ?? cart.cost.totalAmount)}</span>
      </div>
      <p className="label">Tax and delivery calculated at checkout.</p>
      {cart.checkoutUrl ? (
        <div className="flex flex-col gap-3">
          <a href={cart.checkoutUrl} className="btn btn-light" aria-disabled={isPending} onClick={(event) => { if (isPending) event.preventDefault(); }}>
            {isPending ? "Updating total…" : "Checkout"}
          </a>
        </div>
      ) : null}
      <details className="border-t border-paper/20 pt-3">
        <summary className="cursor-pointer text-sm">Packaging and delivery</summary>
        <div className="mt-3 flex items-start gap-3">
          <span className="relative block aspect-square w-20 shrink-0 overflow-hidden"><Pic k="comp-the-box" sizes="80px" /></span>
          <p className="font-text text-sm text-paper/85">{leadTimes.length ? `${leadTimes.join('. ')}. ` : ''}Packaging and delivery details are confirmed with your order. Ask about collection at either store and the report for your selected stone.</p>
        </div>
      </details>
    </div>
  );
}

export function CartDrawer() {
  const cart = useCart((state) => state.data);
  const statusMessage = useCartStatusMessage();

  useEffect(() => {
    configureOpenCartAction();
    const dialog = document.getElementById(CART_DRAWER_ID);
    if (!(dialog instanceof HTMLDialogElement)) return;
    const handleToggle = () => {
      if (dialog.open) publishCartViewed(cart);
    };
    dialog.addEventListener("toggle", handleToggle);
    return () => dialog.removeEventListener("toggle", handleToggle);
  }, [cart]);

  return (
    <>
      <span role="status" className="sr-only" aria-live="polite" aria-atomic="true" data-cart-status>
        {statusMessage}
      </span>
      <dialog id={CART_DRAWER_ID} className="drawer-right velvet" aria-labelledby="cart-drawer-title" data-testid="cart-drawer" closedby="any">
        <div className="flex h-full flex-col">
          <div className="flex shrink-0 items-center justify-between py-5 pl-6 pr-3">
            <h2 id="cart-drawer-title" tabIndex={-1} className="font-display text-[1.375rem]">
              Your bag
            </h2>
            <button type="button" commandfor={CART_DRAWER_ID} command="close" className="caps inline-flex h-11 items-center px-3 hover:text-paper/70" onClick={() => closeCartDrawer()}>
              Close
            </button>
          </div>
          <CartErrorBanner />
          <div className="flex-1 overflow-y-auto px-6">
            <CartLines emptyCartFocusId="cart-drawer-title" />
          </div>
          <div className="shrink-0 border-t border-paper/20 px-6 py-6">
            <CartSummary />
          </div>
        </div>
      </dialog>
    </>
  );
}
