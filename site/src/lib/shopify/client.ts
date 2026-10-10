import "server-only";

/**
 * Minimal typed client for the Shopify Storefront API.
 *
 * Env (Vercel project → Settings → Environment Variables):
 *   SHOPIFY_STORE_DOMAIN             e.g. american-jewelry.myshopify.com
 *   SHOPIFY_STOREFRONT_PRIVATE_TOKEN  Headless channel → storefront → private access token (server only)
 *   SHOPIFY_ADMIN_TOKEN              optional; Admin API token used only for draft orders (builder rings)
 *
 * When the domain or token is missing the site keeps working on the local
 * catalog and the bag stays a preview; nothing here throws at import time.
 */

export const STOREFRONT_API_VERSION = "2026-10";

export const shopifyConfigured = () =>
  Boolean(process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN);

export const adminConfigured = () => Boolean(process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_ADMIN_TOKEN);

interface GraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

export class ShopifyError extends Error {
  constructor(message: string, public readonly details?: unknown) {
    super(message);
    this.name = "ShopifyError";
  }
}

export async function storefront<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN;
  if (!domain || !token) throw new ShopifyError("Shopify is not configured");

  const res = await fetch(`https://${domain}/api/${STOREFRONT_API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Shopify-Storefront-Private-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  if (!res.ok) throw new ShopifyError(`Storefront API ${res.status}`);
  const json = (await res.json()) as GraphQLResponse<T>;
  if (json.errors?.length) throw new ShopifyError(json.errors.map((e) => e.message).join("; "), json.errors);
  if (!json.data) throw new ShopifyError("Empty Storefront response");
  return json.data;
}

export async function admin<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_ADMIN_TOKEN;
  if (!domain || !token) throw new ShopifyError("Shopify Admin is not configured");

  const res = await fetch(`https://${domain}/admin/api/${STOREFRONT_API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  if (!res.ok) throw new ShopifyError(`Admin API ${res.status}`);
  const json = (await res.json()) as GraphQLResponse<T>;
  if (json.errors?.length) throw new ShopifyError(json.errors.map((e) => e.message).join("; "), json.errors);
  if (!json.data) throw new ShopifyError("Empty Admin response");
  return json.data;
}
