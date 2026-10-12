import type { Env } from "~/lib/env";

/**
 * The Admin API, used only inside route actions and only for draft orders of designed rings.
 * Needs ADMIN_API_TOKEN from a custom app with write_draft_orders. Never imported by client code.
 */
const ADMIN_API_VERSION = "2026-10";

export function adminConfigured(env: Env): boolean {
  return Boolean(env.ADMIN_API_TOKEN && env.PUBLIC_STORE_DOMAIN);
}

export async function adminGraphql<T>(env: Env, query: string, variables: Record<string, unknown> = {}): Promise<T> {
  if (!env.ADMIN_API_TOKEN || !env.PUBLIC_STORE_DOMAIN) throw new Error("Admin API is not configured");
  const res = await fetch(`https://${env.PUBLIC_STORE_DOMAIN}/admin/api/${ADMIN_API_VERSION}/graphql.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": env.ADMIN_API_TOKEN },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Admin API ${res.status}`);
  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join("; "));
  if (!json.data) throw new Error("Empty Admin response");
  return json.data;
}

export const DRAFT_ORDER_CREATE = /* GraphQL */ `
  mutation DraftOrderCreate($input: DraftOrderInput!) {
    draftOrderCreate(input: $input) {
      draftOrder { id invoiceUrl }
      userErrors { field message }
    }
  }
`;

export interface DraftOrderCreateData {
  draftOrderCreate: { draftOrder: { id: string; invoiceUrl: string | null } | null; userErrors: { message: string }[] };
}
