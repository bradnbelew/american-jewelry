import { SavedList } from "~/components/saved/SavedList";
import { PageTitle, Section } from "~/components/Section";
import { pageMeta } from "~/lib/seo";
import { Link, useRouteLoaderData } from "react-router";
import { useSaved } from "~/components/saved/SavedProvider";
import { pieceByHandle } from "~/lib/catalog/data";
import type { loader } from "~/root";

import type { Route } from "./+types/saved";

export const meta: Route.MetaFunction = () => pageMeta({ title: "Kept", description: "Pieces and ring designs you have saved, kept in this browser.", path: "/saved", noindex: true });

export default function SavedPage() {
  const root = useRouteLoaderData<typeof loader>("root");
  const {items} = useSaved();
  const shortlist = new URLSearchParams(items.filter((item)=>pieceByHandle(item.id)).slice(0,3).map((item,i)=>[`piece${i+1}`,item.id]));
  return (
    <>
      <Section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <PageTitle title="Kept" lede="Pieces and ring designs you set aside. Bring the list to either store; call ahead to confirm availability." />
        {root && !root.live && <div className="mt-6 text-center"><Link className="btn btn-outline" to={`/compare?${shortlist}`}>Compare up to three pieces</Link></div>}
      </Section>
      <Section className="pb-8">
        <SavedList />
      </Section>
    </>
  );
}
