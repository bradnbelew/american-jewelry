import { useState } from "react";
import { Link, useLocation, useNavigate, useRouteLoaderData } from "react-router";
import { DESIGN_MODES, type DesignMode } from "~/lib/design-preview";
import type { loader } from "~/root";

export function useDesign(): DesignMode {
  return useRouteLoaderData<typeof loader>("root")?.design ?? "classic";
}
export function DesignPicker() {
  const root = useRouteLoaderData<typeof loader>("root");
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  if (!root || root.live) return null;
  const selected = DESIGN_MODES.find((m) => m.id === root.design)!;
  return (
    <details className="design-picker">
      <summary>
        Preview: {selected.name}
        <span aria-hidden="true"> +</span>
      </summary>
      <div className="design-picker-body">
        <label htmlFor="design-direction">View this page in</label>
        <select
          id="design-direction"
          value={root.design}
          onChange={(e) => {
            const query = new URLSearchParams(location.search);
            query.set("preview", e.target.value);
            setCopied(false);
            void navigate(`${location.pathname}?${query}${location.hash}`, { preventScrollReset: true });
          }}
        >
          {DESIGN_MODES.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
        <p>{selected.description}</p>
        <div className="flex flex-wrap gap-4">
          <Link className="link" to="/preview">
            Preview desk
          </Link>
          <Link className="link" to="/compare">
            Set out three pieces
          </Link>
          <button
            type="button"
            className="link"
            onClick={async () => {
              const url = new URL(window.location.href);
              url.searchParams.set("preview", root.design);
              try {
                await navigator.clipboard.writeText(url.href);
                setCopied(true);
              } catch {
                setCopied(false);
                void navigate(`${url.pathname}${url.search}${url.hash}`);
              }
            }}
          >
            {copied ? "Link copied" : "Share this view"}
          </button>
        </div>
        <p className="preview-fine">
          Private design study. Current photography and catalog include stand-ins. This picker is hidden when public-live mode is enabled.
        </p>
      </div>
    </details>
  );
}
