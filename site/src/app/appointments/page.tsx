import type { Metadata } from "next";
import { Suspense } from "react";
import { Section, Heading } from "@/components/Section";
import { AppointmentForm } from "@/components/AppointmentForm";

export const metadata: Metadata = {
  title: "Book an appointment",
  description: "Private viewings, bridal fittings and custom commissions in Brentwood and Mt. Juliet, Tennessee.",
};

export default function AppointmentsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return (
    <>
      <Section className="pt-20 pb-12" width="5xl">
        <Heading
          eyebrow="By appointment"
          title="Come and see it in your hand."
          lede="An hour with a member of the house, in the salon or at the bench. No cost, no obligation, and we will have what you asked about ready on the table."
          size="xl"
        />
      </Section>
      <Section width="5xl">
        <Suspense fallback={<div className="border-t border-navy pt-10 text-muted label">Loading…</div>}>
          <Prefilled searchParams={searchParams} />
        </Suspense>
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
