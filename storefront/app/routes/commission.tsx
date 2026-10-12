import { Link } from "react-router";

import { Pic } from "~/components/Pic";
import { PageTitle, Section } from "~/components/Section";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/commission";

const STEPS: [string, string][] = [
  ["Conversation", "An hour in the salon. What it is for, who it is for, what you already own."],
  ["Drawing", "Our designer draws it. Two or three directions, by hand, within a week. You keep the drawings."],
  ["Model", "A render you approve by email, and a wax you can hold. Changes are free until you approve."],
  ["Casting and setting", "Cast in the metal you chose, set by hand, struck with the AJ mark."],
  ["Delivery", "Collected in store or delivered insured, with the numbered certificate and the drawing it came from."],
];

export const meta: Route.MetaFunction = () =>
  pageMeta({ title: "Commission a piece", description: "How a custom piece is made at American Jewelry: conversation, drawing, model, casting, setting. About four to six weeks.", path: "/commission", image: "ring-halo", og: "pages/journal" }, [breadcrumbJsonLd([{ name: "Commission a piece", href: "/commission" }])]);

export default function CommissionPage() {
  return (
    <>
      <Section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <PageTitle title="Commission a piece" lede="Something that exists nowhere yet, made here. About four to six weeks from the first conversation. A deposit of a third begins the drawings, refundable until you approve the render." />
      </Section>
      <Section>
        <div className="settle relative aspect-[4/3] overflow-hidden bg-bone md:aspect-[2.4/1]">
          <Pic k="ring-halo" sizes="100vw" priority />
        </div>
      </Section>
      <Section screen width="text">
        <ol className="flex flex-col gap-10">
          {STEPS.map(([k, v]) => (
            <li key={k} className="grid gap-2 md:grid-cols-[12rem_1fr] md:gap-8">
              <span className="font-display text-[1.5rem]">{k}</span>
              <p className="font-text text-[1.0625rem] text-ink-2">{v}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section className="pb-8" width="text">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h2 className="h-item text-[1.25rem]">Heirlooms</h2>
            <p className="font-text text-ink-2">Bring the stones you have. We draw to the stone.</p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="h-item text-[1.25rem]">Royal American</h2>
            <p className="font-text text-ink-2">A commission can be entered in the registry as a numbered one-of-one, never repeated.</p>
          </div>
        </div>
        <Link to="/appointments?kind=commission" className="btn mt-12">
          Start the conversation
        </Link>
      </Section>
    </>
  );
}
