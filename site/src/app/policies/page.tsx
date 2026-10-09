import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageTitle } from "@/components/Section";
import { STORES } from "@/lib/catalog/data";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Policies and disclosures",
  description: "Shipping and insurance, returns and exchanges, resizing, the Limited Lifetime Warranty, the Lifetime Care Program, custom and made-to-order terms, diamond and metal disclosures, financing, privacy and accessibility at American Jewelry.",
  alternates: { canonical: "/policies" },
};

const SECTIONS: { id: string; title: string; body: string[] }[] = [
  {
    id: "shipping",
    title: "Shipping and insurance",
    body: [
      "Every order ships fully insured, double-boxed, with an adult signature required on delivery, in the house box. Nothing on the label says what is inside. Ready-to-ship pieces leave within two business days. Made-to-order pieces ship when the bench finishes them; the lead time on the piece is our estimate, and if it moves we tell you promptly and you may cancel for a full refund before the piece ships.",
      "We do not ship to P.O. boxes. You may also collect in either store, where we size and fit the piece with you. Title and risk pass when the carrier records your signature. If a package arrives damaged, photograph it before opening and call us within 48 hours.",
    ],
  },
  {
    id: "returns",
    title: "Returns and exchanges",
    body: [
      "Ready-to-ship pieces may be returned within 30 days of delivery or collection, unworn and in original condition, with their reports, certificate and box, for a refund to the original payment. We provide an insured return label. Refunds are issued within five business days of inspection; financed orders refund to the lender.",
      "Made-to-order, engraved, personalized and resized-after-purchase pieces are made for you and are exchangeable but not refundable once the design is approved. Royal American and commissioned pieces are final. Pre-owned watches are final sale after our authentication has been re-checked at handover.",
    ],
  },
  {
    id: "sizing",
    title: "Ring sizing and resizing",
    body: [
      "One resize within 60 days of delivery is included on every ring we make, up to one size up or down. After that, resizing is done at cost for as long as you own the ring. Full eternity bands and some patterned bands cannot be resized; we remake them. A resized ring becomes non-returnable. Sizing in store is free, always.",
    ],
  },
  {
    id: "warranty",
    title: "Limited Lifetime Warranty",
    body: [
      "American Jewelry warrants every piece it makes against defects in materials and workmanship for as long as the original owner owns it. If a defect appears, bring the piece to either store or ship it to us insured; we will repair it, or if we cannot, replace it with an equivalent piece, at no charge.",
      "This warranty does not cover loss or theft; normal wear, including scratching, thinning of the band and wearing of prongs and of rhodium plating on white gold; damage from accident, misuse or improper care; loss of a stone where the setting was not inspected within the previous twelve months; or damage caused by work done by anyone other than American Jewelry. Pre-owned watches carry a separate written warranty issued with the watch.",
      "This is a limited warranty. It gives you specific legal rights, and you may also have other rights which vary from state to state. The full text is provided with every piece and on request from either store.",
    ],
  },
  {
    id: "care",
    title: "Lifetime Care Program",
    body: [
      "Separate from the warranty, every piece we make comes with the Lifetime Care Program: cleaning, inspection under the loupe, prong tightening and polishing at either store, at no charge, for as long as you own it. We recommend an inspection every six months; each one is recorded. Rhodium re-plating of white gold is a normal maintenance item and is done at cost. Damage from wear, accident or outside repair is repaired at cost.",
    ],
  },
  {
    id: "custom",
    title: "Custom and made-to-order terms",
    body: [
      "A commission begins with a conversation and a quote. A deposit of one third of the quoted price starts the drawings and the model; it is refundable until you approve the final render. Once the render is approved the design is frozen, the deposit is no longer refundable, and production begins. Design changes after approval are quoted separately. The balance is due before delivery. Design rights in house drawings remain with American Jewelry unless agreed otherwise in writing. A piece entered in the Royal American registry will not be made again by the house.",
    ],
  },
  {
    id: "disclosures",
    title: "Diamond and metal disclosures",
    body: [
      "On this site, man-made diamond means a laboratory-grown diamond: a diamond grown in a laboratory rather than mined, with the same chemical composition, crystal structure and physical properties as a natural diamond. Each man-made diamond is identified as such on its listing, tag, receipt and certificate, with its growth method and any post-growth treatment. Natural diamond means a mined diamond; any treatment is disclosed before purchase. Carat weights given as total weight are the total of several stones.",
      "All gold is solid and marked with its karat. White gold is rhodium-plated, which wears and is re-applied as maintenance. Nothing is gold-plated, gold-filled or vermeil unless stated. Pieces are designed in Tennessee and set and finished in our workshop; diamonds and gold are imported. We make no claims about the resale or investment value of any stone, and no general environmental claims about either kind.",
      "Pre-owned Rolex watches are authenticated by our watchmaker and sold with our own written warranty. American Jewelry is an independent jeweler and is not affiliated with or authorized by Rolex SA.",
    ],
  },
  {
    id: "financing",
    title: "Financing",
    body: [
      "Financing through Affirm is available at checkout. Rates from 0 to 36% APR; payment options depend on your purchase amount, and a down payment may be required. Subject to an eligibility check. Not all customers will be eligible. Affirm loans are made by Celtic Bank or Affirm's other lending partners. Any monthly amount shown on this site is an example and is accompanied by its APR and term.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    body: [
      "We collect only what it takes to make and deliver your piece and to keep in touch about it: your name, contact details, the piece or design you asked about, and payment handled by our payment processor, which we never see in full. We do not sell personal information. We use analytics to understand how the site is used; the full privacy policy, naming every service we use, is published before launch. Marketing messages are sent only with your consent, which you can withdraw at any time.",
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility",
    body: [
      "This site is built to WCAG 2.2 AA: every control works from a keyboard, every image has a description, text meets contrast minimums, and the 3D viewer has a photograph beside it. If anything here is hard to use, call either store and we will help you directly, or write to us and we will fix it.",
    ],
  },
];

export default function PoliciesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Policies and disclosures", href: "/policies" }])} />
      <Section className="pt-16 md:pt-24 pb-12 md:pb-16">
        <PageTitle title="Policies and disclosures" lede="The terms, in plain words. These are the house's draft terms for launch and will be reviewed by counsel before they apply to a sale." />
      </Section>
      <Section width="text">
        <div className="grid md:grid-cols-12 gap-10 hair pt-10">
          <nav className="md:col-span-3 flex flex-col gap-2 text-[0.875rem] md:sticky md:top-32 self-start" aria-label="Sections">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="text-ink-2 hover:text-ink">
                {s.title}
              </a>
            ))}
          </nav>
          <div className="md:col-span-8 md:col-start-5 flex flex-col gap-14 text-ink-2 leading-relaxed">
            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id} className="flex flex-col gap-4 scroll-mt-32">
                <h2 className="h-section text-[1.75rem] text-ink">{s.title}</h2>
                {s.body.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </section>
            ))}
            <p className="text-[0.8125rem] text-muted hair pt-6">
              Questions about any of this: {STORES.map((s) => `${s.name} ${s.phone}`).join(", ")}. Or{" "}
              <Link href="/appointments" className="link-quiet">
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
