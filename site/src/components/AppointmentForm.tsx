"use client";

import { useState } from "react";
import { STORES } from "@/lib/catalog/data";

const KINDS = [
  ["bridal", "Engagement or wedding"],
  ["viewing", "Private viewing · Royal American"],
  ["commission", "Commission a piece"],
  ["fitting", "Fitting for a piece I've chosen"],
  ["care", "Care, resizing or repair"],
] as const;

export function AppointmentForm({ prefill }: { prefill: Record<string, string> }) {
  const [sent, setSent] = useState(false);
  const context = Object.entries(prefill)
    .filter(([k]) => !["store"].includes(k))
    .map(([k, v]) => `${k}: ${v}`)
    .join(" · ");
  const defaultKind = prefill.tier === "royal-american" ? "viewing" : prefill.build || prefill.piece ? "fitting" : "bridal";

  if (sent) {
    return (
      <div className="border border-line bg-paper p-10 flex flex-col gap-3 max-w-2xl">
        <span className="eyebrow">Received</span>
        <p className="font-display text-3xl text-navy">Thank you. We&apos;ll confirm by text or email within one business day.</p>
        <p className="text-sm text-muted">In this preview nothing is sent yet. At launch this reaches the store team and your calendar.</p>
      </div>
    );
  }

  return (
    <form
      className="grid md:grid-cols-2 gap-x-10 gap-y-7 border-t border-navy pt-10"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      {context && (
        <div className="md:col-span-2 text-sm text-muted border border-line bg-paper px-4 py-3">
          We&apos;ll have this ready: <span className="text-navy">{context}</span>
        </div>
      )}
      <Field label="Store">
        <select id="store" name="store" defaultValue={prefill.store ?? "brentwood"} className={input}>
          {STORES.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name} · {s.role.split(".")[0]}
            </option>
          ))}
        </select>
      </Field>
      <Field label="What for">
        <select id="kind" name="kind" defaultValue={defaultKind} className={input}>
          {KINDS.map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Name">
        <input id="name" name="name" required className={input} autoComplete="name" />
      </Field>
      <Field label="Phone or email">
        <input id="contact" name="contact" required className={input} autoComplete="tel" />
      </Field>
      <Field label="Preferred day and time">
        <input id="when" name="when" placeholder="Saturday morning, any weekday after 4" className={input} />
      </Field>
      <Field label="Anything we should know">
        <input id="notes" name="notes" placeholder="Budget, ring size, an heirloom you're bringing" className={input} />
      </Field>
      <div className="md:col-span-2 flex flex-wrap items-center gap-6 pt-2">
        <button type="submit" className="btn">
          Request the appointment
        </button>
        <span className="text-xs text-muted">We never share your details. Walk-ins are always welcome, too.</span>
      </div>
    </form>
  );
}

const input =
  "w-full bg-paper border border-line px-4 py-3 text-navy placeholder:text-muted/60 focus:outline-none focus:border-gilt";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="label text-navy">{label}</span>
      {children}
    </label>
  );
}
