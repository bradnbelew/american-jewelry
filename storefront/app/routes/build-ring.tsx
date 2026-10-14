import { RingBuilder } from "~/components/builder/RingBuilder";
import { Section } from "~/components/Section";
import { decodeCode } from "~/lib/builder/code";
import { SETTINGS, type RingConfig, type SettingKey } from "~/lib/builder/model";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/build-ring";

export const meta: Route.MetaFunction = () =>
  pageMeta(
    {
      title: "Build a ring",
      description: "Three house settings, a natural or lab-grown diamond at a set quality, and the metal. Priced from its own geometry and made to order at our bench in Tennessee.",
      path: "/build/ring", og: "pages/build-ring",
    },
    [breadcrumbJsonLd([{ name: "Bridal", href: "/collections/bridal" }, { name: "Build a ring", href: "/build/ring" }])],
  );

/** The ring needs WebGL, so the page's data comes from a client loader and the builder renders only in the browser. */
export function clientLoader({ request }: Route.ClientLoaderArgs) {
  const sp = new URL(request.url).searchParams;
  let initial: Partial<RingConfig> | undefined;
  const code = sp.get("code");
  if (code) initial = decodeCode(code) ?? undefined;
  const setting = sp.get("setting");
  if (!initial) {
    initial = sp.get("line") === "americana" ? {origin:"natural",setting:"shooting-star"} : sp.get("line") === "new-american" ? {origin:"man-made",setting:"signal"} : {};
    if (setting && (SETTINGS as readonly string[]).includes(setting)) initial.setting = setting as SettingKey;
  }
  return { initial };
}
clientLoader.hydrate = true as const;

export function HydrateFallback() {
  return (
    <>
      <Opener />
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="aspect-[4/3] bg-paper lg:col-span-7 lg:aspect-[5/4]" aria-busy="true" />
        </div>
      </Section>
    </>
  );
}

export default function BuildRingPage({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Opener />
      <Section>
        <RingBuilder key={JSON.stringify(loaderData.initial)} initial={loaderData.initial} />
      </Section>
    </>
  );
}

function Opener() {
  return (
    <Section className="utility-heading builder-heading">
      <div className="flex max-w-3xl flex-col gap-5">
        <h1 className="h-display text-[3rem] md:text-[4.5rem]">Build a ring</h1>

      </div>
    </Section>
  );
}
