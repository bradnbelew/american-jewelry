import { createShopifyRouteTemplates } from "@shopify/hydrogen";

/** Where Shopify-owned things live on this site: pieces, not products; the bag, not the cart. */
export const routeTemplates = createShopifyRouteTemplates({
  product: "/pieces/:productHandle",
  productInCollection: "/pieces/:productHandle",
  collection: "/collections/:collectionHandle",
  cart: "/bag",
});
