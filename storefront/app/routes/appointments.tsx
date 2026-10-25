import { AppointmentForm, CONTEXT_KEYS, KIND_LABEL, STORE_LABEL } from "~/components/AppointmentForm";
import { deliverAppointment } from "~/lib/appointments.server";
import { envContext } from "~/lib/env";
import { breadcrumbJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/appointments";

const SEND_ERROR = "Something went wrong sending your request. Please call Brentwood at (615) 457-2089 or Mt. Juliet at (615) 754-6046.";

export const meta: Route.MetaFunction = () =>
  pageMeta(
    {
      title: "Book an appointment",
      description: "Book an appointment at American Jewelry in Brentwood or Mt. Juliet for bridal, custom design, a repair, an appraisal, or pre-owned watches.",
      path: "/appointments",
      image: "ed-bridal",
    },
    [breadcrumbJsonLd([{ name: "Book an appointment", href: "/appointments" }])],
  );

export function loader({ request }: Route.LoaderArgs) {
  const prefill: Record<string, string> = {};
  for (const [key, value] of new URL(request.url).searchParams) prefill[key] = value;
  return { prefill };
}

export async function action({ request, context }: Route.ActionArgs) {
  const form = await request.formData();
  const get = (key: string) => String(form.get(key) ?? "").trim();
  const first = get("first").slice(0, 60);
  const last = get("last").slice(0, 60);
  const name = [first, last].filter(Boolean).join(" ").slice(0, 120) || get("name").slice(0, 120);
  const contact = [get("phone"), get("email")].filter(Boolean).join(", ").slice(0, 160) || get("contact").slice(0, 160);
  const store = get("store") || "brentwood";
  const kind = get("kind") || "bridal";
  if (!name || !contact) return { sent: false as const, error: SEND_ERROR };
  const when = [get("date"), get("daypart")].filter(Boolean).join(", ").slice(0, 200) || get("when").slice(0, 200);
  const ctx: Record<string, string> = {};
  for (const key of CONTEXT_KEYS) {
    const value = get(key);
    if (value) ctx[key] = value.slice(0, 120);
  }
  try {
    const delivered = await deliverAppointment(context.get(envContext), {
      store: STORE_LABEL[store] ?? store,
      kind: KIND_LABEL[kind] ?? kind,
      name,
      contact,
      when,
      notes: get("notes").slice(0, 600),
      consentEmail: form.get("consentEmail") === "on",
      consentSms: form.get("consentSms") === "on",
      context: ctx,
      receivedAt: new Date().toISOString(),
      page: request.headers.get("referer") ?? "/appointments",
    });
    return { sent: true as const, delivered, name, store, kind };
  } catch (error) {
    console.error(error);
    return { sent: false as const, error: SEND_ERROR };
  }
}

export default function AppointmentsPage({ loaderData, actionData }: Route.ComponentProps) {
  return (
    <div className="appointments wrap">
      <h1>Book an appointment</h1>
      <p className="body">Choose a store and what you would like to see. We will call or text to confirm a time.</p>
      <AppointmentForm prefill={loaderData.prefill} result={actionData} />
    </div>
  );
}
