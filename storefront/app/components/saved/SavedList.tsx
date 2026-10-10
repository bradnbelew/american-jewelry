import { Link } from "react-router";

import { Pic } from "../Pic";
import { useSaved } from "./SavedProvider";

export function SavedList() {
  const { items, remove, ready } = useSaved();
  if (!ready) return <div className="hair min-h-[12rem] pt-10" aria-busy="true" />;
  if (items.length === 0) {
    return (
      <div className="hair flex max-w-xl flex-col gap-4 pt-10">
        <p className="text-ink-2">Nothing saved yet.</p>
        <div className="flex flex-wrap gap-3">
          <Link to="/americana" className="btn">
            The designs
          </Link>
          <Link to="/build/ring" className="btn btn-outline">
            Build a ring
          </Link>
        </div>
      </div>
    );
  }
  return (
    <ul className="hair grid grid-cols-2 gap-x-5 gap-y-10 pt-10 md:gap-x-8 lg:grid-cols-4">
      {items.map((it) => (
        <li key={it.id} className="flex min-w-0 flex-col gap-3">
          <Link to={it.href} className="relative block aspect-[4/5] overflow-hidden bg-white">
            <Pic k={it.photo} sizes="(min-width: 1024px) 25vw, 50vw" />
          </Link>
          <div className="flex min-w-0 flex-col gap-1">
            <Link to={it.href} className="h-item text-[1.125rem] hover:text-muted">
              {it.name}
            </Link>
            <span className="text-[0.8125rem] text-ink-2">{it.detail}</span>
            <button type="button" onClick={() => remove(it.id)} className="caps-sm mt-1 h-6 self-start text-muted hover:text-ink">
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
