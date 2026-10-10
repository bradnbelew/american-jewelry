import { createContext } from "react-router";

export type Env = {
  MOCK_SHOP?: string;
  PRIVATE_STOREFRONT_API_TOKEN?: string;
  PUBLIC_CHECKOUT_DOMAIN?: string;
  PUBLIC_STORE_DOMAIN?: string;
  PUBLIC_STOREFRONT_ID?: string;
  PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID?: string;
  SESSION_SECRET?: string;
  SHOP_ID?: string;
  /** "true" only on the custom domain; previews stay noindexed. */
  PUBLIC_SITE_LIVE?: string;
  /** Admin API token of the custom app with write_draft_orders; read only inside route actions. */
  ADMIN_API_TOKEN?: string;
};

export const envContext = createContext<Env>();
