import { useSaved, type SavedItem } from "./SavedProvider";

/** Fixed-size control; the label changes, the box does not. */
export function SaveButton({ item, className = "" }: { item: SavedItem; className?: string }) {
  const { has, toggle, ready } = useSaved();
  const on = ready && has(item.id);
  return (
    <button type="button" className={`btn btn-outline ${className}`} aria-pressed={on} onClick={() => toggle(item)}>
      {on ? "Saved" : "Save"}
    </button>
  );
}
