import { Link } from "react-router";

import { Section } from "~/components/Section";
import { STORES } from "~/lib/catalog/data";
import { breadcrumbJsonLd, pageMeta, storeJsonLd } from "~/lib/seo";

import type { Route } from "./+types/stores";

export const meta: Route.MetaFunction = () =>
  pageMeta(
    {
      title: "Stores in Brentwood and Mt. Juliet, Tennessee",
      description: "American Jewelry has two stores in Middle Tennessee: Franklin Road in Brentwood and Providence Marketplace in Mt. Juliet. Hours, phone numbers and appointments.",
      path: "/stores", og: "pages/stores",
    },
    [breadcrumbJsonLd([{ name: "Stores", href: "/stores" }]), ...STORES.map(storeJsonLd)],
  );

export default function StoresPage() {
  return (
    <>
      <Section className="pt-12 pb-12 md:pt-20 md:pb-16">
        <div className="flex max-w-3xl flex-col gap-5">
          <h1 className="h-display text-[3rem] md:text-[4.5rem]">Two stores. Two working shops.</h1>
          <p className="lede measure">Both our Brentwood and Mt. Juliet stores have shops visible to customers. We cast in-house. Call, get directions or arrange a visit.</p>
        </div>
      </Section>

      {/* A ledger: both stores, side by side, every fact in a row. */}
      <Section screen>
        <div className="grid gap-16 md:grid-cols-2 md:gap-10 lg:gap-20">
          {STORES.map((s) => (
            <article key={s.slug} className="flex flex-col gap-6">
              <Link to={`/stores/${s.slug}`} className="group flex flex-col gap-2">
                <h2 className="h-section text-[2.5rem] group-hover:text-muted md:text-[3.25rem]">{s.name}</h2>
                <span className="label">{s.role}</span>
              </Link>
              <address className="font-text not-italic text-ink-2">
                {s.address1}
                <br />
                {s.city}, {s.state} {s.zip}
                <br />
                <a href={`tel:${s.phone.replace(/\D/g, "")}`} className="link-quiet num">
                  {s.phone}
                </a>
              </address>
              <table className="spec max-w-sm">
                <tbody>
                  {s.hours.map((h) => (
                    <tr key={h.days}>
                      <th scope="row">{h.days}</th>
                      <td className="num">{h.open}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!s.hoursConfirmed && <p className="label">Hours are provisional; call before a long drive.</p>}
              <div className="flex flex-wrap gap-3 pt-2">
                <Link to={`/appointments?store=${s.slug}`} className="btn">
                  Book {s.name}
                </Link>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.mapQuery)}`} target="_blank" rel="noreferrer" className="btn btn-outline">Directions</a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section screen width="text">
        <p className="font-text max-w-xl text-ink-2">
          Walk in for cleaning, inspection and repairs. For bridal, a commission or a Royal American viewing, book an hour.
        </p>
      </Section>
    </>
  );
}
