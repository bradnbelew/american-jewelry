import { Link } from "react-router";
import { AppointmentForm, CONTEXT_KEYS, KIND_LABEL, STORE_LABEL } from "~/components/AppointmentForm";
import { Pic } from "~/components/Pic";
import { deliverAppointment } from "~/lib/appointments.server";
import { STORES } from "~/lib/catalog/data";
import { envContext } from "~/lib/env";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/appointments";

export const meta: Route.MetaFunction = () =>
  pageMeta({
    title: "Book a visit",
    description: "An hour with a member of the house in Brentwood or Mt. Juliet, Tennessee, or by video. Bridal, private viewings, commissions, fittings, care and repair.",
    path: "/appointments", og: "pages/appointments",
  }, [breadcrumbJsonLd([{ name: "Book a visit", href: "/appointments" }])]);

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
    <section className="salon-visit house-wrap">
      <div className="salon-visit-intro">
        <p className="label">Brentwood and Mt. Juliet</p>
        <h1>Book a visit</h1>
        <p className="lede">An hour with the house, in either store or by video. We will confirm the time, and what is in the case.</p>
        <ul className="salon-visit-stores">
          {STORES.map((s) => (
            <li key={s.slug}>
              <LinkPhoto slug={s.slug} />
              <div>
                <Link className="salon-visit-name" to={`/stores/${s.slug}`}>{s.name}</Link>
                <p>{s.address1}<br />{s.city}, {s.state} {s.zip}</p>
                <a className="num" href={`tel:${s.phone.replace(/\D/g, "")}`}>{s.phone}</a>
              </div>
            </li>
          ))}
        </ul>
        <p className="label">Call for hours.</p>
      </div>
      <AppointmentForm prefill={loaderData.prefill} result={actionData} />
    </section>
  );
}

function LinkPhoto({ slug }: { slug: string }) {
  const photo = slug === "mt-juliet" ? "aj-salon-cases" : "aj-consult-hands";
  return (
    <Link className="salon-visit-photo" to={`/stores/${slug}`} tabIndex={-1} aria-hidden="true">
      <Pic k={photo} sizes="160px" />
    </Link>
  );
}
