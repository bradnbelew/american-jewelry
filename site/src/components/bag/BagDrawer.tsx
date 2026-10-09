"use client";

import Link from "next/link";
import { useEffect } from "react";
import { formatPrice } from "@/lib/catalog/data";
import { Pic } from "../Pic";
import { useBag } from "./BagProvider";

export function BagDrawer() {
  const { items, isOpen, closeBag, remove, totalCents } = useBag();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeBag();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeBag]);

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`} aria-hidden={!isOpen}>
      <button
        type="button"
        aria-label="Close bag"
        onClick={closeBag}
        className={`absolute inset-0 bg-ink/30 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-label="Your bag"
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white flex flex-col transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 h-[4.25rem] border-b border-hair">
          <span className="caps">Your bag</span>
          <button type="button" onClick={closeBag} className="caps text-muted hover:text-ink">
            Close
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <p className="text-sm text-ink-2">Your bag is empty.</p>
          ) : (
            items.map((it) => (
              <div key={it.id} className="grid grid-cols-[5rem_1fr_auto] gap-4 items-start">
                <div className="relative aspect-square bg-ivory overflow-hidden">
                  <Pic k={it.photo} sizes="80px" />
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                  <Link href={`/pieces/${it.handle}`} className="font-display text-lg leading-snug hover:text-muted">
                    {it.name}
                  </Link>
                  <span className="text-xs text-ink-2 leading-relaxed">{it.detail}</span>
                  {it.qty > 1 && <span className="text-xs text-muted">Qty {it.qty}</span>}
                  <button type="button" onClick={() => remove(it.id)} className="caps-sm text-muted hover:text-ink self-start mt-1">
                    Remove
                  </button>
                </div>
                <span className="text-sm tabular-nums">{formatPrice(it.priceCents * it.qty)}</span>
              </div>
            ))
          )}
        </div>
        <div className="border-t border-hair px-6 py-6 flex flex-col gap-4">
          <div className="flex items-baseline justify-between">
            <span className="caps-sm text-muted">Subtotal</span>
            <span className="font-display text-2xl tabular-nums">{formatPrice(totalCents)}</span>
          </div>
          <button type="button" className="btn" disabled={items.length === 0}>
            Checkout
          </button>
          <Link href="/appointments" className="btn btn-outline" onClick={closeBag}>
            See it in store first
          </Link>
          <p className="text-[0.75rem] text-muted leading-relaxed">
            Preview. Checkout connects to Shopify at launch; your selections are saved in this browser.
          </p>
        </div>
      </aside>
    </div>
  );
}
