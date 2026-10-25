import { Link } from "react-router";

import { SAVED_DRAWER_ID, closeDialog } from "~/lib/cart-drawer";

import { Pic } from "../Pic";
import { savedGroups, useSaved } from "./SavedProvider";

/**
 * What you have kept, as a drawer on paper. Opened from the header's Kept link after hydration;
 * /saved is the same list as a page for the no-script path.
 */
export function SavedDrawer() {
  const { items, remove, ready } = useSaved();
  const close = () => closeDialog(SAVED_DRAWER_ID);
  return (
    <dialog id={SAVED_DRAWER_ID} className="drawer-right bg-paper text-ink" aria-labelledby="saved-drawer-title" closedby="any">
      <div className="flex h-full flex-col">
        <div className="flex shrink-0 items-center justify-between py-5 pl-6 pr-3">
          <h2 id="saved-drawer-title" tabIndex={-1} className="font-display text-[1.375rem]">
            Saved
          </h2>
          <button type="button" commandfor={SAVED_DRAWER_ID} command="close" className="caps inline-flex h-11 items-center px-3 hover:text-muted" onClick={close}>
            Close
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {!ready ? (
            <p className="label flex min-h-[6rem] items-center">Opening</p>
          ) : items.length === 0 ? (
            <div className="flex h-full flex-col items-start justify-center gap-5">
              <p className="font-display text-[1.5rem]">Nothing saved yet. Tap the heart on any piece to keep it here.</p>
              <Link to="/jewelry" className="link" onClick={close}>
                View all jewelry
              </Link>
            </div>
          ) : (
            <div>{savedGroups(items).map(group=><section className="saved-line-group" key={group.name}><h3 className="label pt-5">{group.name}</h3><ul role="list" className="divide-y divide-hair">
              {group.items.map((it) => (
                <li key={it.id} className="flex gap-4 py-5">
                  <Link to={it.href} onClick={close} className="relative block aspect-[4/5] w-20 shrink-0 overflow-hidden bg-white">
                    <Pic k={it.photo} sizes="80px" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <Link to={it.href} onClick={close} className="font-display text-[1.0625rem] leading-snug hover:text-muted">
                      {it.name}
                    </Link>
                    <span className="label">{it.detail}</span>
                    <button type="button" onClick={() => remove(it.id)} className="caps mt-1 inline-flex h-8 items-center self-start text-muted hover:text-ink">
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul></section>)}</div>
          )}
        </div>
        {ready && items.length > 0 ? (
          <div className="shrink-0 border-t border-hair px-6 py-6">
            <Link to="/appointments" className="btn w-full" onClick={close}>
              See them in store
            </Link>
          </div>
        ) : null}
      </div>
    </dialog>
  );
}
