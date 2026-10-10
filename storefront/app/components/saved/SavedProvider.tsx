import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * Saved pieces and designs, kept in this browser so it works logged out.
 * Phase 2 syncs this to the customer account.
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

function readStored(): SavedItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SavedItem[]) : [];
  } catch {
    return [];
  }
}

export function SavedProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ items: SavedItem[]; ready: boolean }>({ items: [], ready: false });

  useEffect(() => {
    const items = readStored();
    const id = requestAnimationFrame(() => setState({ items, ready: true }));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!state.ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state.items));
    } catch {}
  }, [state]);

  const has = useCallback((id: string) => state.items.some((x) => x.id === id), [state.items]);
  const remove = useCallback((id: string) => setState((s) => ({ ...s, items: s.items.filter((x) => x.id !== id) })), []);
  const toggle = useCallback(
    (item: SavedItem) =>
      setState((s) => ({
        ...s,
        items: s.items.some((x) => x.id === item.id) ? s.items.filter((x) => x.id !== item.id) : [item, ...s.items],
      })),
    [],
  );

  const value = useMemo<SavedState>(
    () => ({ items: state.items, has, toggle, remove, count: state.items.length, ready: state.ready }),
    [state, has, toggle, remove],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSaved() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useSaved outside SavedProvider");
  return v;
}
