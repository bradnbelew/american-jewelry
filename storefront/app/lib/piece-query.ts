import { gql, type StorefrontApi } from "@shopify/hydrogen";

/** Option names as pushed by site/scripts/shopify-catalog.ts. Size and engraving are line attributes, not options. */
export const PIECE_OPTION_NAMES = ["Version", "Metal"] as const;

const VARIANT = gql(`
  fragment PieceVariant on ProductVariant {
    id
    title
    availableForSale
    sku
    price { amount currencyCode }
    selectedOptions { name value }
    image { url width height altText }
    product { handle title }
  }
`);

/**
 * One piece from the Storefront API: the variant matrix the product form needs, the media,
 * and the house metafields. Editorial copy still comes from the local catalog by handle.
 */
export const PIECE_QUERY = gql(
  `
  query Piece($handle: String!, $selectedOptions: [SelectedOptionInput!]!, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      handle
      vendor
      descriptionHtml
      requiresSellingPlan
      encodedVariantExistence
      encodedVariantAvailability
      options {
        name
        optionValues {
          name
          firstSelectableVariant { ...PieceVariant }
        }
      }
      selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) { ...PieceVariant }
      adjacentVariants(selectedOptions: $selectedOptions) { ...PieceVariant }
      priceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
      media(first: 8) {
        nodes {
          __typename
          ... on MediaImage { id image { url width height altText } }
        }
      }
      tier: metafield(namespace: "house", key: "tier") { value }
      design: metafield(namespace: "house", key: "design") { value }
      houseRef: metafield(namespace: "house", key: "house_ref") { value }
      pieceType: metafield(namespace: "house", key: "piece_type") { value }
      engravable: metafield(namespace: "house", key: "engravable") { value }
      sizes: metafield(namespace: "house", key: "sizes") { value }
      specs: metafield(namespace: "house", key: "specs") { value }
      modelEmbed: metafield(namespace: "custom", key: "model_source_embed") { value }
    }
  }
`,
  [VARIANT],
);

export type PieceQueryResult = StorefrontApi.ResultOf<typeof PIECE_QUERY>;
export type PieceProduct = NonNullable<PieceQueryResult["product"]>;
export type PieceVariant = NonNullable<PieceProduct["selectedOrFirstAvailableVariant"]>;
