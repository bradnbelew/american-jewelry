import { Link, data } from "react-router";

import { PageTitle, Section } from "~/components/Section";
import { pageMeta } from "~/lib/seo";

import type { Route } from "./+types/catchall";

/** A true 404, rendered inside the house: the status is 404, the header and footer stay. */
export function loader() {
  return data(null, { status: 404 });
}

export const meta: Route.MetaFunction = () => pageMeta({ title: "Not in the registry", description: "This page is not in the registry.", path: "/404", noindex: true });

export default function CatchAll() {
  return (
    <Section className="pt-24 pb-16 md:pt-32">
      <PageTitle title="This page is not in the registry." lede="It may have moved when the house did." />
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn">
          The house
        </Link>
        <Link to="/stores" className="btn btn-outline">
          The stores
        </Link>
      </div>
    </Section>
  );
}
