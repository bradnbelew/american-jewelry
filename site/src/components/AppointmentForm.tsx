"use client";

import { useState } from "react";
import { STORES } from "@/lib/catalog/data";

const KINDS = [
  ["bridal", "Engagement or wedding"],
  ["viewing", "Private viewing, Royal American"],
  ["commission", "Commission a piece"],
  ["fitting", "Fitting for a piece or a design code"],
  ["care", "Care, resizing or repair"],
  ["other", "Something else"],
] as const;

const LABELS: Record<string, string> = { piece: "Piece", code: "Design code", build: "Builder", version: "Version", metal: "Metal", size: "Size", tier: "Tier" };

export function AppointmentForm({ prefill }: { prefill: Record<string, string> }) {
  const [sent, setSent] = useState(false);
  const context = Object.entries(prefill)
    .filter(([k]) => !["store", "kind"].includes(k))
    .map(([k, v]) => `${LABELS[k] ?? k}: ${v}`)
    .join(", ");
  const defaultKind = prefill.kind ?? (prefill.tier === "royal-american" ? "viewing" : prefill.build || prefill.piece || prefill.code ? "fitting" : "bridal");

  if (sent) {
    return (
      <div className="hair pt-10 flex flex-col gap-3 max-w-2xl min-h-[20rem]">
        <p className="h-section text-[1.75rem] md:text-[2.25rem]">Thank you. We will confirm by text or email within one business day.</p>
        <p className="text-ink-2 leading-relaxed">If it is for today, call the store and we will do our best.</p>
        <p className="text-[0.8125rem] text-muted">In this preview nothing is sent yet. At launch this reaches the store team and your calendar.</p>
      </div>
    );
  }

  return (
    <form
      className="grid md:grid-cols-2 gap-x-8 gap-y-6 hair pt-10"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      {context && (
        <p className="md:col-span-2 text-[0.875rem] text-ink-2 bg-paper px-4 py-3">
          We will have this ready: <span className="text-ink">{context}</span>
        </p>
      )}
      <Field label="Where">
        <select id="store" name="store" defaultValue={prefill.store ?? "brentwood"} className="field">
          {STORES.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}, {s.role.split(".")[0].toLowerCase()}
            </option>
          ))}
          <option value="virtual">By video, from wherever you are</option>
        </select>
      </Field>
      <Field label="What for">
        <select id="kind" name="kind" defaultValue={defaultKind} className="field">
          {KINDS.map(([v, l]) => (
            <option key={v} value={v}>
              {l}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Name">
        <input id="name" name="name" required className="field" autoComplete="name" />
      </Field>
      <Field label="Phone or email">
        <input id="contact" name="contact" required className="field" autoComplete="tel" />
      </Field>
      <Field label="When suits you">
        <input id="when" name="when" placeholder="Saturday morning, any weekday after 4" className="field" />
      </Field>
      <Field label="Anything we should know" hint="optional">
        <input id="notes" name="notes" placeholder="A budget, a ring size, an heirloom you are bringing" className="field" />
      </Field>
      <div className="md:col-span-2 flex flex-wrap items-center gap-6 pt-2">
        <button type="submit" className="btn">
          Request the appointment
        </button>
        <span className="text-[0.8125rem] text-muted">No cost, no obligation. We never share your details.</span>
      </div>
    </form>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-baseline justify-between text-[0.8125rem]">
        <span className="text-ink">{label}</span>
        {hint && <span className="text-muted">{hint}</span>}
      </span>
      {children}
    </label>
  );
}
