import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  // The house
  route("royal-american", "routes/line.tsx", { id: "line-royal" }),
  route("americana", "routes/line.tsx", { id: "line-americana" }),
  route("new-american", "routes/line.tsx", { id: "line-new" }),
  route("designs/:slug", "routes/design.tsx"),
  route("collections/:slug", "routes/collection.tsx"),
  route("pieces/:handle", "routes/piece.tsx"),

  // The builder
  route("build/ring", "routes/build-ring.tsx"),
  route("design/:code", "routes/design-code.tsx"),

  // Places and people
  route("stores", "routes/stores.tsx"),
  route("stores/:slug", "routes/store.tsx"),
  route("appointments", "routes/appointments.tsx"),
  route("house", "routes/house.tsx"),
  route("services", "routes/services.tsx"),
  route("commission", "routes/commission.tsx"),
  route("care", "routes/care.tsx"),
  route("journal", "routes/journal.tsx"),
  route("journal/:slug", "routes/article.tsx"),
  route("natural-or-man-made", "routes/stones.tsx"),
  route("policies", "routes/policies.tsx"),
  route("saved", "routes/saved.tsx"),

  // Shopify-owned surfaces (template routes)
  route("bag", "routes/cart.tsx"),
  route("account", "routes/account.tsx"),

  // Development only: 3D poster frames for scripts/posters.mjs (404 in production)
  route("__poster/:kind/:slug", "routes/poster.tsx"),

  // Crawlers
  route("robots.txt", "routes/robots.ts"),
  route("sitemap.xml", "routes/sitemap.ts"),

  route("*", "routes/catchall.tsx"),
] satisfies RouteConfig;
