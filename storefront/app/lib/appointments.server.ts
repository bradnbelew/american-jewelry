import type { Env } from "~/lib/env";

/**
 * Where an appointment request goes. In order: Resend (RESEND_API_KEY + APPOINTMENTS_TO), a JSON
 * webhook (APPOINTMENTS_WEBHOOK_URL), or the Oxygen log. The owner switches delivery on with one
 * environment variable; until then nothing is silently lost, the page says so, and the phone is there.
 * Server-only. open-questions A17.
 */
export interface AppointmentRequest {
  store: string;
  kind: string;
  name: string;
  contact: string;
  when: string;
  notes: string;
  consentEmail: boolean;
  consentSms: boolean;
  context: Record<string, string>;
  receivedAt: string;
  page: string;
}

export type Delivery = "email" | "webhook" | "log";

function asText(r: AppointmentRequest): string {
  const ctx = Object.entries(r.context)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  return [
    `Appointment request, ${r.receivedAt}`,
    `Store: ${r.store}`,
    `Purpose: ${r.kind}`,
    `Name: ${r.name}`,
    `Contact: ${r.contact}`,
    `When: ${r.when || "(not given)"}`,
    `Notes: ${r.notes || "(none)"}`,
    `Consent: email ${r.consentEmail ? "yes" : "no"}, SMS ${r.consentSms ? "yes" : "no"}`,
    ctx ? `On the table:\n${ctx}` : "",
    `From: ${r.page}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function deliverAppointment(env: Env, r: AppointmentRequest): Promise<Delivery> {
  const text = asText(r);
  if (env.RESEND_API_KEY && env.APPOINTMENTS_TO) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.RESEND_API_KEY}` },
      body: JSON.stringify({
        from: env.APPOINTMENTS_FROM ?? "American Jewelry <appointments@americanjewelers.com>",
        to: env.APPOINTMENTS_TO.split(",").map((s) => s.trim()),
        reply_to: r.contact.includes("@") ? r.contact : undefined,
        subject: `Appointment: ${r.name}, ${r.store}, ${r.kind}`,
        text,
      }),
    });
    if (res.ok) return "email";
    console.error("appointments: Resend failed", res.status, await res.text().catch(() => ""));
  }
  if (env.APPOINTMENTS_WEBHOOK_URL) {
    const res = await fetch(env.APPOINTMENTS_WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...r, text }) });
    if (res.ok) return "webhook";
    console.error("appointments: webhook failed", res.status);
  }
  console.log(`[appointment]\n${text}`);
  return "log";
}
