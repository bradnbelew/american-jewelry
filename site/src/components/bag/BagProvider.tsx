"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface BagItem {
  id: string; // handle + options
  handle: string;
  name: string;
  detail: string;
  priceCents: number;
  photo: string; // PHOTO key
  qty: number;
}

interface BagState {
  items: BagItem[];
  count: number;
  totalCents: number;
  isOpen: boolean;
  add: (item: Omit<BagItem, "qty">) => void;
  remove: (id: string) => void;
  openBag: () => void;
  closeBag: () => void;
}

const Ctx = createContext<BagState | null>(null);
const KEY = "aj-bag-v1";

export function BagProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = useCallback((item: Omit<BagItem, "qty">) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.id === item.id);
      if (i >= 0) return prev.map((x, j) => (j === i ? { ...x, qty: x.qty + 1 } : x));
      return [...prev, { ...item, qty: 1 }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((id: string) => setItems((prev) => prev.filter((x) => x.id !== id)), []);

  const value = useMemo<BagState>(
    () => ({
      items,
      count: items.reduce((n, x) => n + x.qty, 0),
      totalCents: items.reduce((n, x) => n + x.qty * x.priceCents, 0),
      isOpen,
      add,
      remove,
      openBag: () => setOpen(true),
      closeBag: () => setOpen(false),
    }),
    [items, isOpen, add, remove],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBag() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useBag outside BagProvider");
  return v;
}
