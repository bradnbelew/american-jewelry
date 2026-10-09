import type { Metadata } from "next";
import { Section, Heading } from "@/components/Section";

export const metadata: Metadata = {
  title: "Policies and disclosures",
  description: "Shipping, returns, made-to-order terms, diamond disclosures and privacy for American Jewelry.",
};

export default function PoliciesPage() {
  return (
    <>
      <Section className="pt-20 pb-12" width="3xl">
        <Heading eyebrow="Plainly" title="Policies and disclosures" lede="Draft terms for the launch. Each section will be reviewed by counsel before it goes live." />
      </Section>
      <Section width="3xl">
        <div className="flex flex-col gap-10 border-t border-navy pt-8 text-ink/85 leading-relaxed">
          <Block id="shipping" title="Shipping">
            Every order ships insured, signature required, in the house box. Ready-to-ship pieces leave within two business days.
            Made-to-order pieces ship when the bench finishes them; the lead time on the piece is our estimate and we tell you if it moves.
          </Block>
          <Block id="returns" title="Returns and exchanges">
            Ready-to-ship pieces may be returned within 30 days in unworn condition for a refund. Made-to-order, engraved and sized pieces
            are made for you and are exchangeable but not refundable. Royal American and commissioned pieces are final.
          </Block>
          <Block id="disclosures" title="Diamond and metal disclosures">
            On this site &ldquo;man made diamond&rdquo; means a laboratory-grown diamond: a diamond grown in a laboratory, not mined, with the same
            chemical composition, crystal structure and physical properties as a natural diamond. Each man made diamond is identified as such on
            its listing, tag and certificate, along with its growth method and any post-growth treatment. &ldquo;Natural diamond&rdquo; means a mined
            diamond. All gold is solid and marked with its karat; nothing is plated or filled unless stated. Pieces are designed and handcrafted
            in Tennessee; stones and raw metal are sourced from suppliers in and outside the United States.
          </Block>
          <Block id="care" title="Lifetime care">
            Cleaning, inspection and polishing of pieces we made are free for as long as you own them. One free resize within a year of purchase.
            Damage from wear, accident or outside repair is repaired at cost.
          </Block>
          <Block id="financing" title="Financing">
            Financing through Affirm is available at checkout. Rates from 0–36% APR; payment options depend on your purchase amount, and a down
            payment may be required. Subject to eligibility. Affirm loans are made by Celtic Bank or Affirm&apos;s other lending partners.
          </Block>
          <Block id="privacy" title="Privacy">
            We collect only what it takes to make and deliver your piece and to keep in touch about it. We do not sell personal information.
            Full privacy policy to follow before launch.
          </Block>
        </div>
      </Section>
    </>
  );
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex flex-col gap-3 scroll-mt-24">
      <h2 className="font-display text-3xl text-navy">{title}</h2>
      <p>{children}</p>
    </section>
  );
}
