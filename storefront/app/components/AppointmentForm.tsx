import { useMemo, useState, type ReactNode } from "react";
import { Form, useNavigation } from "react-router";

import { STORES, pieceByHandle } from "~/lib/catalog/data";

export const KINDS = [
  ["bridal", "Bridal"],
  ["commission", "Custom design"],
  ["care", "Repair or service"],
  ["appraisal", "Appraisal"],
  ["watches", "Pre-owned watches"],
  ["other", "Something else"],
  ["viewing", "Private viewing"],
] as const;

export const KIND_LABEL: Record<string, string> = Object.fromEntries(KINDS);
export const STORE_LABEL: Record<string, string> = {
  ...Object.fromEntries(STORES.map((store) => [store.slug, store.name])),
  either: "Either",
  virtual: "By video",
};

const KIND_ALIAS: Record<string, string> = {
  bridal: "bridal",
  commission: "commission",
  custom: "commission",
  care: "care",
  repair: "care",
  fitting: "bridal",
  appraisal: "appraisal",
  watches: "watches",
  viewing: "viewing",
  other: "other",
};

const INTEREST_ALIAS: Record<string, string> = {
  custom: "commission",
  estate: "other",
  bridal: "bridal",
  repair: "care",
  service: "care",
  appraisal: "appraisal",
  watches: "watches",
};

export const CONTEXT_KEYS = ["piece", "pieces", "code", "build", "version", "metal", "size", "engraving", "tier"] as const;

export type AppointmentResult =
  | { sent: true; delivered: "email" | "webhook" | "log"; name: string; store: string; kind: string }
  | { sent: false; error: string }
  | undefined;

const VISIBLE = KINDS.filter(([value]) => value !== "viewing");

export function AppointmentForm({ prefill, result }: { prefill: Record<string, string>; result: AppointmentResult }) {
  const navigation = useNavigation();
  const pending = navigation.state !== "idle" && navigation.formMethod === "POST";
  const initialKind = useMemo(() => {
    if (prefill.tier === "royal-american") return "viewing";
    if (prefill.kind && KIND_ALIAS[prefill.kind]) return KIND_ALIAS[prefill.kind];
    if (prefill.interest && INTEREST_ALIAS[prefill.interest]) return INTEREST_ALIAS[prefill.interest];
    return "bridal";
  }, [prefill]);
  const [kind, setKind] = useState(initialKind);
  const [store, setStore] = useState(prefill.store === "mt-juliet" || prefill.store === "brentwood" || prefill.store === "either" ? prefill.store : "brentwood");
  const [daypart, setDaypart] = useState(prefill.daypart === "Afternoon" ? "Afternoon" : "Morning");
  const pieceName = prefill.piece ? pieceByHandle(prefill.piece)?.name : undefined;
  const options = kind === "viewing" ? KINDS : VISIBLE;

  if (result?.sent) {
    const first = result.name.split(/\s+/)[0];
    return (
      <p className="body" role="status">
        {result.delivered === "log"
          ? `Thank you, ${first}. This preview could not send your request. Please call Brentwood at (615) 457-2089 or Mt. Juliet at (615) 754-6046.`
          : `Thank you, ${first}. We have your request and will be in touch shortly to confirm.`}
      </p>
    );
  }

  return (
    <Form method="post" className="appointment-form grid gap-8" aria-busy={pending}>
      {CONTEXT_KEYS.map((key) => (prefill[key] ? <input key={key} type="hidden" name={key} value={prefill[key]} /> : null))}
      {pieceName ? <p className="small">About: {pieceName}</p> : null}

      <fieldset className="radio-list">
        <legend className="caps-sm">What is it for?</legend>
        {options.map(([value, label]) => (
          <label key={value}>
            <input type="radio" name="kind" value={value} checked={kind === value} onChange={() => setKind(value)} />
            <span>{label}</span>
          </label>
        ))}
      </fieldset>

      <fieldset className="radio-list">
        <legend className="caps-sm">Which store?</legend>
        {(["brentwood", "mt-juliet", "either"] as const).map((value) => (
          <label key={value}>
            <input type="radio" name="store" value={value} checked={store === value} onChange={() => setStore(value)} />
            <span>{STORE_LABEL[value]}</span>
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend className="caps-sm">When suits you?</legend>
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Preferred date">
            <input className="field" type="date" name="date" defaultValue={prefill.date} />
          </Field>
          <div className="radio-list">
            <span className="caps-sm">Time of day</span>
            {(["Morning", "Afternoon"] as const).map((value) => (
              <label key={value}>
                <input type="radio" name="daypart" value={value} checked={daypart === value} onChange={() => setDaypart(value)} />
                <span>{value}</span>
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      <fieldset className="grid gap-6">
        <legend className="caps-sm">Your details</legend>
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="First name">
            <input className="field" name="first" required autoComplete="given-name" defaultValue={prefill.first} />
          </Field>
          <Field label="Last name">
            <input className="field" name="last" required autoComplete="family-name" defaultValue={prefill.last} />
          </Field>
        </div>
        <Field label="Phone">
          <input className="field" name="phone" type="tel" required autoComplete="tel" defaultValue={prefill.phone} />
        </Field>
        <Field label="Email">
          <input className="field" name="email" type="email" required autoComplete="email" defaultValue={prefill.email} />
        </Field>
        <Field label="Notes">
          <textarea className="field" name="notes" placeholder="Anything we should have ready?" defaultValue={prefill.notes} />
        </Field>
      </fieldset>

      <div className="flex flex-col gap-3">
        <label className="flex min-h-11 items-start gap-3 text-[15px]">
          <input type="checkbox" name="consentEmail" className="mt-1" />
          <span>You may write to me by email about this request.</span>
        </label>
        <label className="flex min-h-11 items-start gap-3 text-[15px]">
          <input type="checkbox" name="consentSms" className="mt-1" />
          <span>You may text me about this request. Message rates may apply. Reply STOP to end.</span>
        </label>
      </div>

      {result && !result.sent ? <p role="alert">{result.error}</p> : null}

      <button type="submit" className="btn" disabled={pending}>Request appointment</button>
    </Form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="caps-sm">{label}</span>
      {children}
    </label>
  );
}
