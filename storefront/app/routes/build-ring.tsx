import { Link } from "react-router";

import { RingBuilder } from "~/components/builder/RingBuilder";
import { Pic } from "~/components/Pic";
import { Section } from "~/components/Section";
import { decodeCode } from "~/lib/builder/code";
import { SETTINGS, STONE_STANDARD, type RingConfig, type SettingKey } from "~/lib/builder/model";
import { DESIGN_NOTES, SETTING_PHOTO } from "~/lib/builder/notes";
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
  if (!initial && setting && (SETTINGS as readonly string[]).includes(setting)) initial = { setting: setting as SettingKey };
  return { initial };
}
clientLoader.hydrate = true as const;

export function HydrateFallback() {
  return (
    <>
      <Opener />
      <Section>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="aspect-[4/3] bg-paper sm:aspect-square lg:col-span-7 lg:aspect-[5/4]" aria-busy="true" />
        </div>
      </Section>
      <Settings />
    </>
  );
}

export default function BuildRingPage({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Opener />
      <Section>
        <RingBuilder initial={loaderData.initial} />
      </Section>
      <Settings />
    </>
  );
}

function Opener() {
  return (
    <Section className="pt-12 pb-10 md:pt-20 md:pb-14">
      <div className="flex max-w-3xl flex-col gap-5">
        <h1 className="h-display text-[3rem] md:text-[4.5rem]">Build a ring</h1>
        <p className="lede measure">The stone, the metal and the fit are yours. The rest is decided the way we would decide it.</p>
      </div>
    </Section>
  );
}

function Settings() {
  return (
    <>
      <Section screen width="text">
        <h2 className="h-section mb-12 text-[2rem] md:text-[2.75rem]">The three settings</h2>
        <div className="flex flex-col gap-16">
          {SETTINGS.map((s) => {
            const n = DESIGN_NOTES[s];
            return (
              <article key={s} className="grid gap-6 md:grid-cols-12 md:gap-10">
                <div className="relative aspect-square overflow-hidden bg-white md:col-span-3">
                  <Pic k={SETTING_PHOTO[s]} sizes="(min-width: 768px) 20vw, 100vw" />
                </div>
                <div className="flex flex-col gap-4 md:col-span-9">
                  <h3 className="h-section text-[1.75rem]">
                    {n.name}
                    <span className="font-text mt-1 block text-[1.125rem] italic text-ink-2">{n.line}</span>
                  </h3>
                  <p className="font-text measure text-ink-2">{n.why}</p>
                  <Link to={`/build/ring?setting=${s}`} className="link mt-2 self-start">
                    Build on {n.name}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section className="pb-8" width="text">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-4">
            <h2 className="h-section text-[1.75rem]">One quality for each stone</h2>
            <p className="font-text text-ink-2">
              Natural diamonds: {STONE_STANDARD.natural.grade}, with a {STONE_STANDARD.natural.report}. Lab-grown diamonds: {STONE_STANDARD["man-made"].grade}, with an {STONE_STANDARD["man-made"].report}. You choose the size.
            </p>
            <Link to="/natural-or-man-made" className="link self-start">
              Natural or lab-grown
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="h-section text-[1.75rem]">Where the price comes from</h2>
            <p className="font-text text-ink-2">The metal at your size and width, the bench work the setting needs, and the stone at its set quality. Three rows, under the ring.</p>
            <Link to="/appointments?build=ring" className="link self-start">
              See it in store first
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
