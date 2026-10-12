import { Link } from "react-router";

import { Pic } from "~/components/Pic";
import { Section } from "~/components/Section";
import { STORES } from "~/lib/catalog/data";
import { breadcrumbJsonLd, pageMeta, storeJsonLd } from "~/lib/seo";

import type { Route } from "./+types/stores";

export const meta: Route.MetaFunction = () =>
  pageMeta(
    {
      title: "Stores in Brentwood and Mt. Juliet, Tennessee",
      description: "American Jewelry has two stores in Middle Tennessee: Franklin Road in Brentwood and Providence Marketplace in Mt. Juliet. Hours, phone numbers and appointments.",
      path: "/stores",
    },
    [breadcrumbJsonLd([{ name: "Stores", href: "/stores" }]), ...STORES.map(storeJsonLd)],
  );

export default function StoresPage() {
  return (
    <>
      <Section className="pt-12 pb-12 md:pt-20 md:pb-16">
        <div className="flex max-w-3xl flex-col gap-5">
          <h1 className="h-display text-[3rem] md:text-[4.5rem]">Two stores. One bench.</h1>
          <p className="lede measure">Brentwood shows the pieces. Mt. Juliet makes them and cares for them.</p>
        </div>
      </Section>

      <div className="flex flex-col gap-24 md:gap-32">
        {STORES.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <Section key={s.slug}>
              <div className="grid items-start gap-8 md:grid-cols-12 md:gap-12">
                <Link to={`/stores/${s.slug}`} className={`settle relative block aspect-[4/3] overflow-hidden bg-bone md:col-span-7 md:aspect-[3/2] ${flip ? "md:order-2 md:col-start-6" : ""}`}>
                  <Pic k={s.photo} sizes="(min-width: 768px) 58vw, 100vw" priority={i === 0} />
                </Link>
                <div className={`flex flex-col gap-6 md:col-span-5 ${flip ? "md:order-1 md:col-start-1" : ""}`}>
                  <h2 className="h-section text-[2.5rem] md:text-[3.25rem]">{s.name}</h2>
                  <address className="font-text not-italic text-ink-2">
                    {s.address1}
                    <br />
                    {s.city}, {s.state} {s.zip}
                    <br />
                    <a href={`tel:${s.phone.replace(/\D/g, "")}`} className="link-quiet num">
                      {s.phone}
                    </a>
                  </address>
                  <table className="spec max-w-xs">
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
                    <Link to={`/stores/${s.slug}`} className="btn btn-outline">
                      The store
                    </Link>
                  </div>
                </div>
              </div>
            </Section>
          );
        })}
      </div>

      <Section screen width="text">
        <p className="font-text max-w-xl text-ink-2">
          Walk in for cleaning, inspection and repairs. For bridal, a commission or a Royal American viewing, book an hour.
        </p>
      </Section>
    </>
  );
}
