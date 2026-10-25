import { redirect } from "react-router";

import { RoyalCollection } from "~/components/RoyalCollection";
import { TIERS, piecesForTier } from "~/lib/catalog/data";
import { TIER_PHOTO } from "~/lib/catalog/photos";
import { envContext } from "~/lib/env";
import { isLive } from "~/lib/site";
import type { TierSlug } from "~/lib/catalog/types";
import { breadcrumbJsonLd, itemListJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/line";

export function loader({ request, context }: Route.LoaderArgs) {
  const slug = new URL(request.url).pathname.replace(/^\/+|\/+$/g, "") as TierSlug;
  if (slug === "americana") throw redirect("/jewelry?stone=natural", 301);
  if (slug === "new-american") throw redirect("/jewelry?stone=lab-grown", 301);
  if (!TIERS.some((tier) => tier.slug === slug)) throw new Response("Not found", { status: 404 });
  if (slug === "royal-american" && isLive(context.get(envContext))) throw new Response("Not found", { status: 404 });
  return { slug };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const tier = TIERS.find((item) => item.slug === data?.slug);
  if (!tier) return [];
  return pageMeta(
    {
      title: "Royal American",
      description: "One-of-a-kind pieces, shown privately in either store.",
      path: `/${tier.slug}`,
      image: TIER_PHOTO[tier.slug],
    },
    [breadcrumbJsonLd([{ name: tier.name, href: `/${tier.slug}` }]), itemListJsonLd(tier.name, piecesForTier(tier.slug))],
  );
};

export default function LinePage({ loaderData }: Route.ComponentProps) {
  if (loaderData.slug !== "royal-american") return null;
  return <RoyalCollection />;
}
