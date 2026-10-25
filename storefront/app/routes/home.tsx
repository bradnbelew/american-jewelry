import { HomeHouse } from "~/components/HouseExperience";
import { pageMeta } from "~/lib/seo";
import type { Route } from "./+types/home";

export const meta: Route.MetaFunction = () => pageMeta({description: "American Jewelry. Original designs in gold, natural and lab-grown diamonds. Discover Shooting Star, Prism, Signal and Grid, and Royal American high jewelry.", path: "/", og: "pages/home"});

export default function Home() {
  return <HomeHouse />;
}
