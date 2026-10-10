import { Link } from "react-router";

import { DesignView } from "~/components/builder/DesignView";
import { PageTitle, Section } from "~/components/Section";
import { decodeCode } from "~/lib/builder/code";
import { ringName } from "~/lib/builder/model";
import { pageMeta } from "~/lib/seo";

import type { Route } from "./+types/design-code";

export function loader({ params, request }: Route.LoaderArgs) {
  const code = decodeURIComponent(params.code);
  const config = decodeCode(code);
  if (!config) throw new Response("Not found", { status: 404 });
  return { code, config, hint: new URL(request.url).searchParams.get("hint") === "1" };
}

export const meta: Route.MetaFunction = ({ data }) =>
  pageMeta({ title: `Design ${data?.code ?? ""}`, description: data ? ringName(data.config) : "A ring in the making", path: `/design/${data?.code ?? ""}`, noindex: true });

export default function DesignCodePage({ loaderData }: Route.ComponentProps) {
  const { code, config, hint } = loaderData;
  return (
    <>
      <Section className="pt-16 pb-10 md:pt-24 md:pb-14">
        <PageTitle
          eyebrow={hint ? "Someone has a ring in mind" : "A ring in the making"}
          title={hint ? "A hint, from someone who knows you." : ringName(config)}
          lede={hint ? "This is the ring they built for you. Its price is theirs to know." : "Built in the ring builder. Bring the code to either store, or make it yours."}
        />
      </Section>
      <Section>
        <DesignView config={config} code={code} hint={hint} />
      </Section>
      {!hint && (
        <Section className="pt-16 pb-8" width="text">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-text text-ink-2">Want to change something?</span>
            <Link to={`/build/ring?code=${encodeURIComponent(code)}`} className="link">
              Open in the builder
            </Link>
          </div>
        </Section>
      )}
    </>
  );
}
