import { Link } from "react-router";
import { DESIGN_MODES } from "~/lib/design-preview";
import { envContext } from "~/lib/env";
import { isLive } from "~/lib/site";
import { Section } from "~/components/Section";
import { useDesign } from "~/components/DesignPreview";
import type { Route } from "./+types/preview";
export function loader({ context }: Route.LoaderArgs) {
  if (isLive(context.get(envContext))) throw new Response("Not found", { status: 404 });
  return null;
}
export const meta: Route.MetaFunction = () => [{ title: "Design preview desk | American Jewelry" }, { name: "robots", content: "noindex, nofollow" }];
export default function PreviewDesk() {
  const mode = useDesign();
  return (
    <Section className="preview-desk py-12 md:py-20">
      <p>American Jewelry / Private working preview</p>
      <h1>Four ways forward.</h1>
      <p className="lede">Choose a direction, then use the site. The picker stays with you, so you can compare the same page in each design.</p>
      <div className="preview-options">
        {DESIGN_MODES.map((m, i) => (
          <article key={m.id} data-sample={m.id}>
            <span>
              0{i + 1}
              {mode === m.id ? " · Viewing now" : ""}
            </span>
            <h2>{m.name}</h2>
            <p>{m.description}</p>
            <Link className="btn" to={`/?preview=${m.id}`}>
              Open this direction
            </Link>
            <div className="flex flex-wrap gap-4">
              <Link to={`/new-american?preview=${m.id}`} className="link">
                Line page
              </Link>
              <Link to={`/pieces/signal-solitaire?preview=${m.id}`} className="link">
                Product page
              </Link>
              <Link to={`/jewelry?preview=${m.id}`} className="link">
                Browse
              </Link>
            </div>
          </article>
        ))}
      </div>
      <div className="preview-notes">
        <section>
          <h2>Fixed across all four</h2>
          <ul>
            <li>High Jewelry navigation; Royal American keeps its name and address.</li>
            <li>Lab-grown search synonyms, typo suggestions and qualified product wording.</li>
            <li>Explicit ring size, compact galleries and practical phone filters.</li>
            <li>Stone and production separated; price matches the selected version.</li>
            <li>Order totals and checkout appear before packaging information.</li>
          </ul>
        </section>
        <section>
          <h2>The next evidence to add</h2>
          <ul>
            <li>The designer’s original drawing and one account of a design decision.</li>
            <li>Real family and bench photographs, with names and permission.</li>
            <li>One documented repair: before, after and what changed.</li>
            <li>Consistent front, side, on-hand and scale views of each actual piece.</li>
            <li>Confirmed opening hours, final policies and actual Royal inventory and reports.</li>
          </ul>
          <p>These are asset requests, not invented histories. Current images and catalog details remain private mockup material.</p>
        </section>
      </div>
      <section className="preview-recommendation">
        <h2>My recommended direction</h2>
        <p>
          Start with The Working Jeweler’s clarity and visual design index. Borrow In Good Company’s warmth and Full Light’s product stage. Keep the refined
          original available until the new photographs and designer’s account can make the choice real.
        </p>
        <p>
          The homepage and line pages have distinct compositions. Product and browse pages share the repaired buying flow, with direction-specific typography,
          color and gallery treatment. This is a review environment, not a public launch.
        </p>
      </section>
    </Section>
  );
}
