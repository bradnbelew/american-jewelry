import { useEffect, useRef, useState } from "react";
import { Link, useNavigation, useSearchParams } from "react-router";
import { PieceCard, priceLine } from "~/components/Catalog";
import { Section } from "~/components/Section";
import { PIECES, pieceByHandle } from "~/lib/catalog/data";
import { whatItIs } from "~/lib/catalog/browse";
import { METAL_LABEL } from "~/lib/catalog/types";
import { envContext } from "~/lib/env";
import { isLive } from "~/lib/site";
import type { Route } from "./+types/compare";
export function loader({ context }: Route.LoaderArgs) {
  if (isLive(context.get(envContext))) throw new Response("Not found", { status: 404 });
  return null;
}
export const meta: Route.MetaFunction = () => [{ title: "Set out three pieces | American Jewelry" }, { name: "robots", content: "noindex, nofollow" }];
export default function ComparePage() {
  const [params, setParams] = useSearchParams();
  const navigation = useNavigation();
  const fromUrl = () => [0, 1, 2].map((i) => params.get(`piece${i + 1}`) ?? "");
  const [handles, setHandles] = useState(fromUrl);
  const pendingHandles = useRef(handles);
  useEffect(() => {
    if (navigation.state !== "idle") return;
    const next = [0, 1, 2].map((i) => params.get(`piece${i + 1}`) ?? "");
    pendingHandles.current = next;
    setHandles(next);
  }, [params, navigation.state]);
  const pieces = handles.map(pieceByHandle);
  const selected = pieces.filter((p) => p !== undefined);
  const appointment = new URLSearchParams({ kind: "fitting", pieces: selected.map((p) => p.handle).join(",") });
  return (
    <Section className="py-12">
      <p className="label">A preview of the in-store conversation</p>
      <h1 className="h-display mt-4 text-4xl md:text-6xl">Set out three pieces.</h1>
      <p className="lede mt-6 max-w-2xl">
        Compare the form, the material and the starting price. Choose up to three, then bring your shortlist into an appointment request.
      </p>
      <div className="compare-tray mt-10 grid gap-8 md:grid-cols-3">
        {pieces.map((p, i) => (
          <section key={i}>
            <label className="mb-6 block">
              <span className="mb-2 block">Piece {i + 1}</span>
              <select
                className="field"
                value={handles[i]}
                onChange={(e) => {
                  const next = new URLSearchParams(params);
                  const chosen = [...pendingHandles.current];
                  chosen[i] = e.target.value;
                  pendingHandles.current = chosen;
                  setHandles(chosen);
                  chosen.forEach((handle, index) => {
                    if (handle) next.set(`piece${index + 1}`, handle);
                    else next.delete(`piece${index + 1}`);
                  });
                  setParams(next, { replace: true, preventScrollReset: true });
                }}
              >
                <option value="">Choose a piece</option>
                {PIECES.filter((x) => x.handle === handles[i] || !handles.includes(x.handle)).map((x) => (
                  <option key={x.handle} value={x.handle}>
                    {x.name}
                  </option>
                ))}
              </select>
            </label>
            {p ? (
              <>
                <PieceCard piece={p} />
                <dl className="mt-6 space-y-4 border-t border-hair pt-5">
                  <div>
                    <dt className="label">Material</dt>
                    <dd>{whatItIs(p)}</dd>
                  </div>
                  <div>
                    <dt className="label">Metal options</dt>
                    <dd>{p.metals.map((m) => METAL_LABEL[m]).join(", ")}</dd>
                  </div>
                  <div>
                    <dt className="label">Price</dt>
                    <dd>{priceLine(p)}</dd>
                  </div>
                  <div>
                    <dt className="label">Timing</dt>
                    <dd>{p.leadTime}</dd>
                  </div>
                </dl>
              </>
            ) : (
              <div className="flex aspect-square items-center justify-center border border-hair text-muted">A place for your next choice.</div>
            )}
          </section>
        ))}
      </div>
      {selected.length > 0 && (
        <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-hair pt-6">
          <Link className="btn" to={`/appointments?${appointment}`}>
            Ask to see these pieces
          </Link>
          <p className="label">Availability is confirmed by the store. This opens a request; it does not book a visit.</p>
        </div>
      )}
    </Section>
  );
}
