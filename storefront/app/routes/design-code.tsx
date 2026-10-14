import { redirect } from "react-router";

import { DesignView } from "~/components/builder/DesignView";
import { PageTitle, Section } from "~/components/Section";
import { DRAFT_ORDER_CREATE, adminConfigured, adminGraphql, type DraftOrderCreateData } from "~/lib/admin.server";
import { decodeCode } from "~/lib/builder/code";
import { HAND_LABEL, ringName } from "~/lib/builder/model";
import { price } from "~/lib/builder/pricing";
import { envContext } from "~/lib/env";
import { pageMeta } from "~/lib/seo";

import type { Route } from "./+types/design-code";

export function loader({ params, request }: Route.LoaderArgs) {
  const code = decodeURIComponent(params.code);
  const config = decodeCode(code);
  if (!config) throw new Response("Not found", { status: 404 });
  return { code, config, hint: new URL(request.url).searchParams.get("hint") === "1" };
}

/**
 * "Request this ring." With an Admin token, a draft order with the price recomputed here from the
 * code (the client's number is never trusted) and a redirect to its invoice. Without one, the
 * request becomes an appointment with the code on the table (open-questions A).
 */
export async function action({ params, request, context }: Route.ActionArgs) {
  const form = await request.formData();
  const code = String(form.get("code") ?? decodeURIComponent(params.code)).trim();
  const config = decodeCode(code);
  if (!config) throw new Response("Not found", { status: 404 });
  const toAppointment = `/appointments?build=ring&code=${encodeURIComponent(code)}&kind=fitting`;
  const env = context.get(envContext);
  if (!adminConfigured(env)) return redirect(toAppointment);

  const p = price(config);
  try {
    const data = await adminGraphql<DraftOrderCreateData>(env, DRAFT_ORDER_CREATE, {
      input: {
        lineItems: [
          {
            title: ringName(config),
            quantity: 1,
            requiresShipping: true,
            taxable: true,
            originalUnitPriceWithCurrency: { amount: p.total.toFixed(2), currencyCode: "USD" },
            customAttributes: [
              { key: "Design code", value: code },
              { key: "Size", value: config.size },
              ...(config.engraving ? [{ key: "Engraving", value: config.engraving }, { key: "Hand", value: HAND_LABEL[config.hand] }] : []),
            ],
          },
        ],
        tags: ["builder"],
        note: `Designed on the website. Code ${code}. Price recomputed on the server.`,
      },
    });
    const err = data.draftOrderCreate.userErrors[0];
    const url = data.draftOrderCreate.draftOrder?.invoiceUrl;
    if (err || !url) {
      console.error("draftOrderCreate", err?.message ?? "no invoice URL");
      return redirect(toAppointment);
    }
    return redirect(url);
  } catch (e) {
    console.error("draftOrderCreate threw", e);
    return redirect(toAppointment);
  }
}

export const meta: Route.MetaFunction = ({ data }) =>
  pageMeta({ title: `Design ${data?.code ?? ""}`, description: data ? ringName(data.config) : "A ring in the making", path: `/design/${data?.code ?? ""}`, noindex: true });

export default function DesignCodePage({ loaderData }: Route.ComponentProps) {
  const { code, config, hint } = loaderData;
  return (
    <>
      <Section className="pt-16 pb-10 md:pt-24 md:pb-14">
        <PageTitle
          title={hint ? "A ring for you" : "Your ring"}
        />
      </Section>
      <Section>
        <DesignView config={config} code={code} hint={hint} />
      </Section>
    </>
  );
}
