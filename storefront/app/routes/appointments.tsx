import { AppointmentForm } from "~/components/AppointmentForm";
import { PageTitle, Section } from "~/components/Section";
import { STORES } from "~/lib/catalog/data";
import { pageMeta } from "~/lib/seo";

import type { Route } from "./+types/appointments";

export const meta: Route.MetaFunction = () =>
  pageMeta({
    title: "Book an appointment",
    description: "An hour with a member of the house in Brentwood or Mt. Juliet, Tennessee, or by video. Bridal, private viewings, commissions, fittings, care and repair.",
    path: "/appointments",
  });

export function loader({ request }: Route.LoaderArgs) {
  const prefill: Record<string, string> = {};
  for (const [k, v] of new URL(request.url).searchParams) prefill[k] = v;
  return { prefill };
}

export default function AppointmentsPage({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <Section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <PageTitle title="Come and see it in your hand." lede="An hour with a member of the house, in the salon, at the bench, or by video. Whatever you asked about is already on the table." />
      </Section>
      <Section width="text">
        <AppointmentForm prefill={loaderData.prefill} />
      </Section>
      <Section width="text" className="pt-16 pb-8 md:pt-20">
        <div className="grid gap-8 sm:grid-cols-2">
          <p className="font-text text-ink-2">Same-day visits are welcome. Call the store you are nearest.</p>
          <div className="flex flex-col gap-3">
            {STORES.map((s) => (
              <p key={s.slug} className="font-text text-ink-2">
                <span className="text-ink">{s.name}</span>
                <br />
                <a href={`tel:${s.phone.replace(/\D/g, "")}`} className="link-quiet num">
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
