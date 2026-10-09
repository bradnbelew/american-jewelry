"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/**
 * Saved pieces and designs, kept in this browser. Works logged out (every house that gates a wish list behind
 * sign-in loses the intent). At launch this syncs to the customer account.
 */
export interface SavedItem {
  id: string; // piece handle, or "design:" + code
  href: string;
  name: string;
  detail: string;
  photo: string; // PHOTO key
}

interface SavedState {
  items: SavedItem[];
  has: (id: string) => boolean;
  toggle: (item: SavedItem) => void;
  remove: (id: string) => void;
  count: number;
  ready: boolean;
}

const Ctx = createContext<SavedState | null>(null);
const KEY = "aj-saved-v1";

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<SavedItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  const has = useCallback((id: string) => items.some((x) => x.id === id), [items]);
  const remove = useCallback((id: string) => setItems((prev) => prev.filter((x) => x.id !== id)), []);
  const toggle = useCallback((item: SavedItem) => {
    setItems((prev) => (prev.some((x) => x.id === item.id) ? prev.filter((x) => x.id !== item.id) : [item, ...prev]));
  }, []);

  const value = useMemo<SavedState>(() => ({ items, has, toggle, remove, count: items.length, ready }), [items, has, toggle, remove, ready]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSaved() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSaved outside SavedProvider");
  return v;
}
