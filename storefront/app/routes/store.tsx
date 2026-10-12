import { Link } from "react-router";

import { Section, SplitOpener } from "~/components/Section";
import { STORES, storeBySlug } from "~/lib/catalog/data";
import { breadcrumbJsonLd, pageMeta, storeJsonLd } from "~/lib/seo";
import { FIGURES_AS_OF } from "~/lib/site";

import type { Route } from "./+types/store";

export function loader({ params }: Route.LoaderArgs) {
  const s = storeBySlug(params.slug);
  if (!s) throw new Response("Not found", { status: 404 });
  return { slug: s.slug };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const s = storeBySlug(data?.slug ?? "")!;
  return pageMeta(
    { title: `American Jewelry, ${s.city}, Tennessee`, description: `${s.address1}, ${s.city}, TN ${s.zip}. ${s.phone}. ${s.role}`, path: `/stores/${s.slug}`, og: `stores/${s.slug}`, image: s.photo },
    [storeJsonLd(s), breadcrumbJsonLd([{ name: "Stores", href: "/stores" }, { name: s.name, href: `/stores/${s.slug}` }])],
  );
};

export default function StorePage({ loaderData }: Route.ComponentProps) {
  const s = storeBySlug(loaderData.slug)!;
  const other = STORES.find((x) => x.slug !== s.slug)!;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mapQuery)}`;

  return (
    <>
      <SplitOpener eyebrow={`${s.address1}, ${s.city}, Tennessee`} title={s.name} lede={s.role} photo={s.photo}>
        <div className="flex flex-wrap gap-3">
          <Link to={`/appointments?store=${s.slug}`} className="btn">
            Book {s.name}
          </Link>
          <a href={maps} target="_blank" rel="noreferrer" className="btn btn-outline">
            Directions
          </a>
        </div>
      </SplitOpener>

      <Section screen>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="flex flex-col gap-6 md:col-span-4">
            <table className="spec">
              <tbody>
                <tr>
                  <th scope="row">Address</th>
                  <td className="font-text">
                    {s.address1}
                    <br />
                    {s.city}, {s.state} {s.zip}
                    <br />
                    <span className="text-muted">{s.place}</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Phone</th>
                  <td>
                    <a href={`tel:${s.phone.replace(/\D/g, "")}`} className="link-quiet num">
                      {s.phone}
                    </a>
                  </td>
                </tr>
                {s.hours.map((h) => (
                  <tr key={h.days}>
                    <th scope="row">{h.days}</th>
                    <td className="num">{h.open}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!s.hoursConfirmed && <p className="label">Hours are provisional; call before a long drive.</p>}
          </div>

          <div className="flex flex-col gap-3 md:col-span-4">
            <h2 className="h-item text-[1.125rem]">What happens here</h2>
            <p className="font-text text-ink-2">{s.expect}</p>
            <p className="label">
              {s.reviews.toLocaleString()} Google reviews, {s.rating.toFixed(1)}, as of {FIGURES_AS_OF}.{" "}
              <a href={maps} target="_blank" rel="noreferrer" className="link-quiet">
                Read them on Google
              </a>
              .
            </p>
          </div>

          <div className="flex flex-col gap-3 md:col-span-4">
            <h2 className="h-item text-[1.125rem]">At this store</h2>
            <ul className="font-text flex flex-col text-[0.9375rem] text-ink-2">
              {s.services.map((x) => (
                <li key={x} className="border-b border-hair py-2">
                  {x}
                </li>
              ))}
            </ul>
            <Link to="/services" className="link self-start">
              All services
            </Link>
          </div>
        </div>
      </Section>

      <Section className="pb-8" width="text">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="font-text max-w-xl text-ink-2">
            {s.slug === "brentwood" ? "Repairs and resizing happen at the bench in Mt. Juliet. Bring a piece here and we carry it over." : "Royal American and most bridal fittings are shown in Brentwood by appointment."}
          </p>
          <Link to={`/stores/${other.slug}`} className="link">
            {other.name}
          </Link>
        </div>
      </Section>
    </>
  );
}
