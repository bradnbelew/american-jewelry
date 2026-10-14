import { useState, type ReactNode } from "react";
import { Form, useNavigation } from "react-router";

import { STORES } from "~/lib/catalog/data";

export const KINDS = [
  ["bridal", "Engagement or wedding"],
  ["viewing", "Private viewing, Royal American"],
  ["commission", "Commission a piece"],
  ["fitting", "Fitting"],
  ["care", "Care, resizing or repair"],
  ["other", "Something else"],
] as const;

export const KIND_LABEL: Record<string, string> = Object.fromEntries(KINDS);
export const STORE_LABEL: Record<string, string> = { ...Object.fromEntries(STORES.map((s) => [s.slug, s.name])), virtual: "By video" };

/** Query params that ride along as hidden fields so the request arrives with the piece on the table. */
export const CONTEXT_KEYS = ["piece", "pieces", "code", "build", "version", "metal", "size", "engraving", "tier"] as const;
const LABELS: Record<string, string> = { piece: "Piece", pieces: "Shortlist", code: "Design code", build: "Builder", version: "Version", metal: "Metal", size: "Size", engraving: "Engraving", tier: "Line" };

export type AppointmentResult = { sent: true; delivered: "email" | "webhook" | "log"; name: string; store: string; kind: string } | { sent: false; error: string } | undefined;

/** One form, four decisions, two unchecked consents. The reply is a letter, not a receipt. */
export function AppointmentForm({ prefill, result }: { prefill: Record<string, string>; result: AppointmentResult }) {
  const navigation = useNavigation();
  const pending = navigation.state !== "idle" && navigation.formMethod === "POST";
  const [store, setStore] = useState(prefill.store && STORE_LABEL[prefill.store] ? prefill.store : "brentwood");
  const defaultKind = prefill.kind && KIND_LABEL[prefill.kind] ? prefill.kind : prefill.tier === "royal-american" ? "viewing" : prefill.build || prefill.piece || prefill.code ? "fitting" : "bridal";
  const [kind, setKind] = useState(defaultKind);
  const context = CONTEXT_KEYS.filter((k) => prefill[k]).map((k) => `${LABELS[k]}: ${prefill[k]}`);

  if (result?.sent) {
    const first = result.name.split(/\s+/)[0];
    const storeName = STORE_LABEL[result.store] ?? result.store;
    return (
      <div className="letter flex min-h-[20rem] flex-col gap-5 pt-10">
        <p>Dear {first},</p>
        <p>
          {result.delivered === "log" ? "This preview did not send your request to the store. Please call either location to arrange your visit." : `We have your request: ${storeName}, ${KIND_LABEL[result.kind]?.toLowerCase() ?? result.kind}. Someone from the house will write or call to confirm a time. For a visit today, please call the store.`}
        </p>
        <p className="font-text italic">The family, Brentwood and Mt. Juliet, Tennessee</p>
      </div>
    );
  }

  return (
    <Form method="post" className="appointment-form grid gap-x-8 gap-y-6 md:grid-cols-2" aria-busy={pending}>
      {CONTEXT_KEYS.map((k) => (prefill[k] ? <input key={k} type="hidden" name={k} value={prefill[k]} /> : null))}
      {context.length > 0 && (
        <p className="font-text bg-paper px-4 py-3 text-[0.9375rem] text-ink-2 md:col-span-2">
          Your request includes: <span className="text-ink">{context.join(", ")}</span>
        </p>
      )}

      <fieldset className="flex flex-col gap-3 md:col-span-2">
        <legend className="mb-3 text-[0.8125rem] text-ink">Where</legend>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(STORE_LABEL).map(([v, l]) => (
            <label key={v} className="opt cursor-pointer !px-3" data-active={store === v ? "true" : "false"}>
              <input type="radio" name="store" value={v} checked={store === v} onChange={() => setStore(v)} className="sr-only" />
              <span>{l}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-2 md:col-span-2">
        <span className="text-[0.8125rem] text-ink">What for</span>
        <select name="kind" className="field" value={kind} onChange={event => setKind(event.target.value)}>
          {KINDS.map(([value,label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </label>

      <Field label="Name">
        <input id="name" name="name" required className="field" autoComplete="name" />
      </Field>
      <Field label="Phone or email">
        <input id="contact" name="contact" required className="field" autoComplete="tel" />
      </Field>
      <Field label="Preferred time">
        <input id="when" name="when" placeholder="Saturday morning, any weekday after 4" className="field" />
      </Field>
      <Field label="Notes" hint="optional">
        <input id="notes" name="notes" placeholder="A budget, a ring size, an heirloom you are bringing" className="field" />
      </Field>

      <div className="flex flex-col gap-3 md:col-span-2">
        <label className="flex min-h-11 items-start gap-3 text-[0.9375rem] text-ink-2">
          <input type="checkbox" name="consentEmail" className="mt-1 h-4 w-4 accent-[var(--ink)]" />
          <span>You may write to me by email about this request.</span>
        </label>
        <label className="flex min-h-11 items-start gap-3 text-[0.9375rem] text-ink-2">
          <input type="checkbox" name="consentSms" className="mt-1 h-4 w-4 accent-[var(--ink)]" />
          <span>You may text me about this request. Message rates may apply; reply STOP to end.</span>
        </label>
      </div>

      {result && !result.sent ? (
        <p className="font-text text-ink-2 md:col-span-2" role="alert">
          {result.error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-6 pt-2 md:col-span-2">
        <button type="submit" className="btn" disabled={pending}>
          Request a visit
        </button>
      </div>
    </Form>
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
