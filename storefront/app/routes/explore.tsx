import { Link } from "react-router";

import { Section } from "~/components/Section";
import { LAYOUT_CANDIDATES, PALETTE_CANDIDATES, TYPE_CANDIDATES, readExplore } from "~/lib/explore";
import { pageMeta } from "~/lib/seo";

import type { Route } from "./+types/explore";

export function loader({ request }: Route.LoaderArgs) {
  return { explore: readExplore(request).explore };
}

export const meta: Route.MetaFunction = () => pageMeta({ title: "Explorations", description: "Type, palette and product-page candidates for the owner's decision.", path: "/__explore", noindex: true });

/** The owner's switchboard. Each link sets one flag and remembers it in a cookie; the rest of the site follows. */
export default function ExplorePage({ loaderData }: Route.ComponentProps) {
  const e = loaderData.explore;
  const groups: [string, string, Record<string, string>, string][] = [
    ["A. Type", "t", TYPE_CANDIDATES, e.t],
    ["B. Palette", "p", PALETTE_CANDIDATES, e.p],
    ["C. Product page", "v", LAYOUT_CANDIDATES, e.v],
  ];
  return (
    <Section className="pt-16 pb-24 md:pt-24" width="text">
      <h1 className="h-display text-[2.5rem] md:text-[3.5rem]">Three explorations</h1>
      <p className="lede mt-5 max-w-xl">Pick one from each. The choice is remembered in this browser; walk the site, then come back and pick another. Nothing here is decided.</p>
      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {groups.map(([title, key, opts, current]) => (
          <div key={key} className="flex flex-col gap-3">
            <h2 className="h-section text-[1.5rem]">{title}</h2>
            <ul className="flex flex-col gap-2">
              {Object.entries(opts).map(([k, label]) => (
                <li key={k}>
                  <Link to={`/__explore?${key}=${k}`} className="opt" data-active={current === k ? "true" : "false"} reloadDocument>
                    <span>{label}</span>
                    <span className="num label">{k}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 flex flex-col gap-4" aria-label="The palette on paper">
        <h2 className="h-section text-[1.5rem]">The accent on paper</h2>
        <p className="label">The registry numeral at 40px in this palette&apos;s text accent, then its hairline. On velvet the numerals stay gold in every palette.</p>
        <p className="gold-numeral text-[2.5rem] leading-none">No. 003</p>
        <div className="hair-gold border-t" />
        <p className="num text-[1.5rem]">$3,200</p>
      </div>
      <div className="mt-12 flex flex-wrap gap-3">
        <Link to="/" className="btn" reloadDocument>
          The home page
        </Link>
        <Link to="/pieces/signal-solitaire" className="btn btn-outline" reloadDocument>
          A product page
        </Link>
        <Link to="/royal-american" className="btn btn-outline" reloadDocument>
          Royal American
        </Link>
      </div>
      <p className="label mt-10">Rationale, screenshots and the critic's findings: docs/briefs/refs/explorations/README.md.</p>
    </Section>
  );
}
