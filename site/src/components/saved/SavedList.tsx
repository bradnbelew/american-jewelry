"use client";

import Link from "next/link";
import { Pic } from "../Pic";
import { useSaved } from "./SavedProvider";

export function SavedList() {
  const { items, remove, ready } = useSaved();
  if (!ready) return <div className="hair pt-10 min-h-[12rem]" aria-busy="true" />;
  if (items.length === 0) {
    return (
      <div className="hair pt-10 flex flex-col gap-4 max-w-xl">
        <p className="text-ink-2 leading-relaxed">Nothing saved yet. On any piece, or at the end of the ring builder, choose Save and it will wait for you here.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/americana" className="btn">
            The designs
          </Link>
          <Link href="/build/ring" className="btn btn-outline">
            Build a ring
          </Link>
        </div>
      </div>
    );
  }
  return (
    <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 md:gap-x-8 hair pt-10">
      {items.map((it) => (
        <li key={it.id} className="flex flex-col gap-3 min-w-0">
          <Link href={it.href} className="relative aspect-square overflow-hidden bg-paper img-hover block">
            <Pic k={it.photo} sizes="(min-width: 1024px) 25vw, 50vw" />
          </Link>
          <div className="flex flex-col gap-1 min-w-0">
            <Link href={it.href} className="h-item text-[1.125rem] hover:text-muted transition-colors">
              {it.name}
            </Link>
            <span className="text-[0.8125rem] text-ink-2">{it.detail}</span>
            <button type="button" onClick={() => remove(it.id)} className="caps-sm text-muted hover:text-ink self-start mt-1 h-6">
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
