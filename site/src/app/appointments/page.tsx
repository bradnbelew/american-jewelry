import type { Metadata } from "next";
import { Suspense } from "react";
import { Section, PageTitle } from "@/components/Section";
import { AppointmentForm } from "@/components/AppointmentForm";
import { STORES } from "@/lib/catalog/data";

export const metadata: Metadata = {
  title: "Book an appointment",
  description: "An hour with a member of the house in Brentwood or Mt. Juliet, Tennessee, or by video. Bridal, private viewings, commissions, fittings, care and repair. Same-day by phone.",
  alternates: { canonical: "/appointments" },
};

export default function AppointmentsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return (
    <>
      <Section className="pt-16 md:pt-24 pb-12 md:pb-16">
        <PageTitle
          title="Come and see it in your hand."
          lede="An hour with a member of the house, in the salon, at the bench, or by video. No cost, no obligation, and whatever you asked about is already on the table."
        />
      </Section>
      <Section width="text">
        <Suspense fallback={<div className="hair pt-10 min-h-[24rem]" aria-busy="true" />}>
          <Prefilled searchParams={searchParams} />
        </Suspense>
      </Section>
      <Section width="text" className="pt-16 md:pt-20">
        <div className="hair pt-8 grid sm:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="h-item text-[1.125rem]">Today</h2>
            <p className="text-ink-2 leading-relaxed">Same-day visits are welcome. Call the store you are nearest and ask; we will tell you honestly who is at the bench.</p>
          </div>
          <div className="flex flex-col gap-3">
            {STORES.map((s) => (
              <p key={s.slug} className="text-ink-2 leading-relaxed">
                <span className="text-ink">{s.name}</span>
                <br />
                <a href={`tel:${s.phone.replace(/\D/g, "")}`} className="link-quiet">
                  {s.phone}
                </a>
              </p>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

async function Prefilled({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const flat: Record<string, string> = {};
  for (const [k, v] of Object.entries(sp)) if (typeof v === "string") flat[k] = v;
  return <AppointmentForm prefill={flat} />;
}
