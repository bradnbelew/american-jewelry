import { Link } from "react-router";

import { PageTitle, Section } from "~/components/Section";
import { STORES } from "~/lib/catalog/data";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/policies";

const SECTIONS: { id: string; title: string; body: string[] }[] = [
  {
    id: "shipping",
    title: "Shipping and insurance",
    body: [
      "Every order ships fully insured, with an adult signature required on delivery, in the house box. Nothing on the label says what is inside. Ready-to-ship pieces leave within two business days. Made-to-order pieces ship when the bench finishes them; if the lead time moves we tell you promptly and you may cancel for a full refund before the piece ships.",
      "We do not ship to P.O. boxes. You may also collect in either store, where we size and fit the piece with you. If a package arrives damaged, photograph it before opening and call us within 48 hours.",
    ],
  },
  {
    id: "returns",
    title: "Returns and exchanges",
    body: [
      "Ready-to-ship pieces may be returned within 30 days of delivery or collection, unworn and in original condition, with their reports, certificate and box, for a refund to the original payment. We provide an insured return label.",
      "Made-to-order, engraved, personalized and resized pieces are made for you and are exchangeable but not refundable once the design is approved. Royal American and commissioned pieces are final.",
    ],
  },
  {
    id: "sizing",
    title: "Ring sizing and resizing",
    body: ["One resize within 60 days of delivery is included on every ring we make. After that, resizing is done at cost for as long as you own the ring. Full eternity bands cannot be resized; we remake them. Sizing in store is free, always."],
  },
  {
    id: "warranty",
    title: "Lifetime warranty",
    body: [
      "American Jewelry warrants every piece it sells against defects in materials and workmanship for the life of the piece. Bring it to either store or ship it to us insured; we repair it, or if we cannot, replace it with an equivalent piece, at no charge.",
      "The warranty excludes the center or main stone, which should be separately insured; loss or theft; normal wear, including thinning of a band, wearing of prongs and of rhodium plating on white gold; and damage from accident, misuse or work done by anyone other than American Jewelry. Watches carry the maker's warranty for the maker's period.",
      "This is a limited warranty. It gives you specific legal rights, and you may also have other rights which vary from state to state.",
    ],
  },
  {
    id: "care",
    title: "Lifetime care",
    body: ["Separate from the warranty: cleaning, inspection under the loupe, prong tightening and polishing at either store, at no charge, for as long as you own the piece. We recommend an inspection every six months. Rhodium re-plating of white gold is maintenance and is done at cost."],
  },
  {
    id: "custom",
    title: "Custom and made-to-order terms",
    body: ["A commission begins with a conversation and a quote. A deposit of one third starts the drawings and the model; it is refundable until you approve the final render. Once approved, the design is frozen and production begins. The balance is due before delivery. A piece entered in the Royal American registry will not be made again by the house."],
  },
  {
    id: "disclosures",
    title: "Diamond and metal disclosures",
    body: [
      "On this site, lab-grown diamond means a laboratory-grown diamond: grown in a laboratory rather than mined, with the same chemical composition, crystal structure and physical properties as a natural diamond. Each is identified as such on its listing, tag, receipt and certificate, with its growth method and any post-growth treatment. Natural diamond means a mined diamond; any treatment is disclosed before purchase.",
      "All gold is solid and karat-marked. White gold is rhodium-plated, which wears and is re-applied as maintenance. Pieces are designed in Tennessee and set and finished in our workshop; diamonds and gold are imported. We make no claims about the resale or investment value of any stone.",
      "Pre-owned Rolex watches are authenticated by our watchmaker. American Jewelry is an independent jeweler and is not affiliated with or authorized by Rolex SA.",
    ],
  },
  {
    id: "financing",
    title: "Financing",
    body: ["Financing is available in store. Ask at either counter."],
  },
  {
    id: "privacy",
    title: "Privacy",
    body: ["We collect only what it takes to make and deliver your piece and to keep in touch about it. We do not sell personal information. Marketing messages are sent only with your consent, which you can withdraw at any time. The full policy, naming every service we use, is published before launch."],
  },
  {
    id: "accessibility",
    title: "Accessibility",
    body: ["This site is built to WCAG 2.2 AA: every control works from a keyboard, every image has a description, text meets contrast minimums, and the 3D viewer has a photograph beside it. If anything here is hard to use, call either store and we will help you directly."],
  },
];

export const meta: Route.MetaFunction = () =>
  pageMeta(
    { title: "Policies", description: "Shipping and insurance, returns and exchanges, resizing, the lifetime warranty, lifetime care, custom terms, diamond and metal disclosures, financing, privacy and accessibility at American Jewelry.", path: "/policies" },
    [breadcrumbJsonLd([{ name: "Policies", href: "/policies" }])],
  );

export default function PoliciesPage() {
  return (
    <>
      <Section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <PageTitle title="Policies" lede="The terms, in plain words. Draft terms for launch, to be reviewed by counsel before they apply to a sale." />
      </Section>
      <Section width="text" className="pb-8">
        <div className="grid gap-10 md:grid-cols-12">
          <nav className="flex flex-col gap-2 self-start text-[0.875rem] md:sticky md:top-32 md:col-span-3" aria-label="Sections">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="text-ink-2 hover:text-ink">
                {s.title}
              </a>
            ))}
          </nav>
          <div className="letter flex flex-col gap-14 !text-[1rem] md:col-span-8 md:col-start-5">
            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id} className="flex scroll-mt-32 flex-col gap-4">
                <h2 className="h-section text-[1.75rem] text-ink">{s.title}</h2>
                {s.body.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </section>
            ))}
            <p className="label pt-6">
              Questions: {STORES.map((s) => `${s.name} ${s.phone}`).join(", ")}. Or{" "}
              <Link to="/appointments" className="link-quiet">
                ask in person
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
