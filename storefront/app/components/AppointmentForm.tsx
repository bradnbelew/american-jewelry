import { useState, type ReactNode } from "react";

import { STORES } from "~/lib/catalog/data";

const KINDS = [
  ["bridal", "Engagement or wedding"],
  ["viewing", "Private viewing, Royal American"],
  ["commission", "Commission a piece"],
  ["fitting", "Fitting for a piece or a design code"],
  ["care", "Care, resizing or repair"],
  ["other", "Something else"],
] as const;

const LABELS: Record<string, string> = { piece: "Piece", code: "Design code", build: "Builder", version: "Version", metal: "Metal", size: "Size", tier: "Tier" };

/** One form, four decisions. Sends nowhere until Resend is connected (phase 2). */
export function AppointmentForm({ prefill }: { prefill: Record<string, string> }) {
  const [sent, setSent] = useState(false);
  const context = Object.entries(prefill)
    .filter(([k]) => !["store", "kind"].includes(k))
    .map(([k, v]) => `${LABELS[k] ?? k}: ${v}`)
    .join(", ");
  const defaultKind = prefill.kind ?? (prefill.tier === "royal-american" ? "viewing" : prefill.build || prefill.piece || prefill.code ? "fitting" : "bridal");

  if (sent) {
    return (
      <div className="flex min-h-[20rem] max-w-2xl flex-col gap-3 pt-10">
        <p className="h-section text-[1.75rem] md:text-[2.25rem]">Thank you. We will confirm within one business day.</p>
        <p className="font-text text-ink-2">If it is for today, call the store.</p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-x-8 gap-y-6 pt-10 md:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      {context && (
        <p className="font-text bg-bone px-4 py-3 text-[0.9375rem] text-ink-2 md:col-span-2">
          We will have this ready: <span className="text-ink">{context}</span>
        </p>
      )}
      <Field label="Where">
        <select id="store" name="store" defaultValue={prefill.store ?? "brentwood"} className="field">
          {STORES.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
          <option value="virtual">By video</option>
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
      <div className="flex flex-wrap items-center gap-6 pt-2 md:col-span-2">
        <button type="submit" className="btn">
          Request the appointment
        </button>
        <span className="label">No cost, no obligation.</span>
      </div>
    </form>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
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
