import { SavedList } from "~/components/saved/SavedList";
import { PageTitle, Section } from "~/components/Section";
import { pageMeta } from "~/lib/seo";

import type { Route } from "./+types/saved";

export const meta: Route.MetaFunction = () => pageMeta({ title: "Kept", description: "Pieces and ring designs you have saved, kept in this browser.", path: "/saved", noindex: true });

export default function SavedPage() {
  return (
    <>
      <Section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <PageTitle title="Kept" lede="Pieces and ring designs you set aside. Bring the list to either store and we will have them on the table." />
      </Section>
      <Section className="pb-8">
        <SavedList />
      </Section>
    </>
  );
}
