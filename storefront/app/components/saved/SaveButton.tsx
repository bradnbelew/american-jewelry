import { useSaved, type SavedItem } from "./SavedProvider";

/** A heart. The word Saved lives in the accessible name, not on the control. */
export function SaveButton({ item, className = "" }: { item: SavedItem; className?: string }) {
  const { has, toggle, ready } = useSaved();
  const on = ready && has(item.id);
  return (
    <button
      type="button"
      className={`save-heart ${className}`}
      aria-pressed={on}
      aria-label={on ? "Saved" : "Save"}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(item);
      }}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          d="M12 19.4 4.8 12.6a4.2 4.2 0 0 1 5.9-6 4.2 4.2 0 0 1 5.9 6L12 19.4Z"
          fill={on ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </svg>
    </button>
  );
}
