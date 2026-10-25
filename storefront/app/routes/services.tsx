import { Pic } from "~/components/Pic";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/services";

const SECTIONS: { id: string; name: string; body: string }[] = [
  { id: "repairs", name: "Repairs and sizing", body: "Retipping, soldering, chain and clasp repair, stone replacement and ring sizing. Many repairs are finished while you wait. We look at the piece before any work begins." },
  { id: "sizing", name: "Ring sizing", body: "Bring the ring in and we will size it in the workshop. Full eternity bands may need to be remade. We will tell you which applies before we start." },
  { id: "engraving", name: "Engraving", body: "Initials, dates and a short line, engraved in our workshop." },
  { id: "appraisals", name: "Appraisals", body: "A written insurance appraisal with photographs, metal and stone details, and report numbers. By appointment." },
  { id: "watch-service", name: "Watch service", body: "Batteries, straps and service for watches you already own. Bring the watch to either store and we will tell you what it needs." },
  { id: "care", name: "Lifetime care", body: "Cleaning and inspection at no charge, for as long as you own the piece." },
  { id: "cleaning", name: "Cleaning and inspection", body: "A cleaning and a check of the setting, in either store." },
];

export const meta: Route.MetaFunction = () =>
  pageMeta(
    {
      title: "Services",
      description: "Repairs, sizing, engraving, appraisals and watch service, done in-house at American Jewelry in Brentwood and Mt. Juliet.",
      path: "/services",
      image: "ed-workshop",
    },
    [breadcrumbJsonLd([{ name: "Services", href: "/services" }])],
  );

export default function ServicesPage() {
  return (
    <div className="wrap" style={{ paddingBottom: "var(--section-y)" }}>
      <header className="page-intro">
        <h1>Services</h1>
        <p className="body center-copy">Repairs, sizing and care, done in-house in both stores. Many are finished while you wait.</p>
      </header>
      <div className="frame-45" style={{ maxWidth: 720, margin: "48px auto" }}>
        <Pic k="ed-watches" sizes="(min-width: 768px) 720px, 100vw" position="50% 40%" />
      </div>
      <div className="flex flex-col gap-16">
        {SECTIONS.map((section) => (
          <article key={section.id} id={section.id} className="grid gap-4 md:grid-cols-12">
            <h2 className="md:col-span-4">{section.name}</h2>
            <p className="body md:col-span-7">{section.body}</p>
          </article>
        ))}
      </div>
      <p className="body" style={{ marginTop: 64 }}>
        Call or text either store with any question. Brentwood, <a href="tel:6154572089">(615) 457-2089</a>. Mt. Juliet, <a href="tel:6157546046">(615) 754-6046</a>.
      </p>
    </div>
  );
}
