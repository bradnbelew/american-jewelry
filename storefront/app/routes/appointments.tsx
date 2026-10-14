import { AppointmentForm, CONTEXT_KEYS, KIND_LABEL, STORE_LABEL } from "~/components/AppointmentForm";
import { PageTitle, Section } from "~/components/Section";
import { deliverAppointment } from "~/lib/appointments.server";
import { STORES } from "~/lib/catalog/data";
import { envContext } from "~/lib/env";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/appointments";

export const meta: Route.MetaFunction = () =>
  pageMeta({
    title: "Book an appointment",
    description: "An hour with a member of the house in Brentwood or Mt. Juliet, Tennessee, or by video. Bridal, private viewings, commissions, fittings, care and repair.",
    path: "/appointments", og: "pages/appointments",
  }, [breadcrumbJsonLd([{ name: "Book an appointment", href: "/appointments" }])]);

export function loader({ request }: Route.LoaderArgs) {
  const prefill: Record<string, string> = {};
  for (const [k, v] of new URL(request.url).searchParams) prefill[k] = v;
  return { prefill };
}

/** Two clicks to a human. The request is delivered by appointments.server.ts; the reply is a letter. */
export async function action({ request, context }: Route.ActionArgs) {
  const form = await request.formData();
  const get = (k: string) => String(form.get(k) ?? "").trim();
  const name = get("name").slice(0, 120);
  const contact = get("contact").slice(0, 160);
  const store = get("store") || "brentwood";
  const kind = get("kind") || "bridal";
  if (!name || !contact) return { sent: false as const, error: "A name and a phone or email, so a person can reply." };
  const ctx: Record<string, string> = {};
  for (const k of CONTEXT_KEYS) {
    const v = get(k);
    if (v) ctx[k] = v.slice(0, 120);
  }
  const delivered = await deliverAppointment(context.get(envContext), {
    store: STORE_LABEL[store] ?? store,
    kind: KIND_LABEL[kind] ?? kind,
    name,
    contact,
    when: get("when").slice(0, 200),
    notes: get("notes").slice(0, 600),
    consentEmail: form.get("consentEmail") === "on",
    consentSms: form.get("consentSms") === "on",
    context: ctx,
    receivedAt: new Date().toISOString(),
    page: request.headers.get("referer") ?? "/appointments",
  });
  return { sent: true as const, delivered, name, store, kind };
}

export default function AppointmentsPage({ loaderData, actionData }: Route.ComponentProps) {
  return (
    <>
      <Section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <PageTitle title="Come and see it in your hand." lede="Tell us what you would like to explore. We will confirm a time, the location and the availability of any pieces you request." />
      </Section>
      <Section width="text">
        <AppointmentForm prefill={loaderData.prefill} result={actionData} />
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
