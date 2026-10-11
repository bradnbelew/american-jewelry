import { Link } from "react-router";

import { PageTitle, Section } from "~/components/Section";
import { breadcrumbJsonLd, faqJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/stones";

const ROWS: [string, string, string][] = [
  ["What it is", "Carbon crystallized in the earth over a billion years.", "Carbon crystallized in a reactor over weeks. The same crystal, hardness and fire."],
  ["How to tell", "Only with laboratory instruments.", "Only with laboratory instruments. Every one of ours is inscribed with its report number."],
  ["How it is graded", "GIA. Ours are F to G, VS1, Excellent cut.", "IGI. Ours are D to F, VVS1 to VVS2, Ideal cut."],
  ["What it costs", "Set by rarity.", "Set by the making. Larger and cleaner for the same money."],
  ["Where it belongs", "Americana and Royal American.", "New American, and any bridal setting when you choose it."],
  ["What we call it", "Natural diamond.", "Man-made diamond, every time, with laboratory-grown on the spec line."],
];

const FAQ: [string, string][] = [
  // house-lint: allow (the customer's own question; the answer never calls natural stones real)
  ["Is a man-made diamond a real diamond?", "It is a diamond: the same carbon crystal, hardness and optical properties as a mined one, grown in a laboratory instead of the earth. Under the FTC's jewelry guides it may not be called simply a diamond, so we call it a man-made diamond every time, and we do not call either kind real or fake."],
  ["Can anyone tell the difference?", "Not by eye and not with a jeweler's loupe. A gemological laboratory can, which is why every man-made diamond we sell at 0.30 ct and above carries an IGI report and a laser inscription."],
  ["Why two laboratories?", "GIA stopped issuing letter grades for laboratory-grown diamonds in October 2025. IGI still grades them with the full color and clarity scales, so a D to F, VVS promise is an IGI promise. Natural diamonds carry a GIA report."],
  ["Which should I choose?", "If the rarity of a stone from the earth matters to you, choose natural. If a larger, cleaner stone for the same money matters more, choose man-made. The design, the gold and the hands are the same, and the ring is labeled plainly either way."],
];

export const meta: Route.MetaFunction = () =>
  pageMeta(
    { title: "Natural or man-made diamond", description: "An honest comparison of natural and man-made (laboratory-grown) diamonds from a house that sells both: what each is, how to tell, how each is graded, and where each belongs.", path: "/natural-or-man-made" },
    [breadcrumbJsonLd([{ name: "Natural or man-made", href: "/natural-or-man-made" }]), faqJsonLd(FAQ)],
  );

export default function StonesPage() {
  return (
    <>
      <Section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <PageTitle title="Natural or man-made?" lede="We sell both. Here is the whole comparison, without a side." />
      </Section>
      <Section width="text">
        <div className="overflow-x-auto">
          <table className="spec min-w-[640px]">
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col" className="h-item !w-auto !normal-case !tracking-normal !text-ink !text-[1.25rem]">
                  Natural diamond
                </th>
                <th scope="col" className="h-item !w-auto !normal-case !tracking-normal !text-ink !text-[1.25rem]">
                  Man-made diamond
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([k, a, b]) => (
                <tr key={k}>
                  <th scope="row">{k}</th>
                  <td className="font-text pr-6">{a}</td>
                  <td className="font-text">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section screen width="text">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h2 className="h-item text-[1.25rem]">The stone from the earth</h2>
            <p className="font-text text-ink-2">Start in Americana, or bring us a budget and we find the stone. Every natural center stone comes with a GIA report.</p>
            <Link to="/americana" className="link self-start">
              Americana
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="h-item text-[1.25rem]">The larger, cleaner stone</h2>
            <p className="font-text text-ink-2">Start in New American. D to F, VVS, Ideal cut, IGI report, laser inscribed. The price is in the design and the gold.</p>
            <Link to="/new-american" className="link self-start">
              New American
            </Link>
          </div>
        </div>
      </Section>
      <Section className="pb-8" width="text">
        <h2 className="h-section mb-8 text-[1.75rem] md:text-[2.25rem]">Questions we are asked</h2>
        <dl className="flex flex-col">
          {FAQ.map(([q, a]) => (
            <div key={q} className="grid gap-3 border-t border-hair py-7 md:grid-cols-12 md:gap-10">
              <dt className="h-item text-[1.25rem] md:col-span-5">{q}</dt>
              <dd className="font-text text-ink-2 md:col-span-7">{a}</dd>
            </div>
          ))}
        </dl>
        <p className="label mt-12 leading-relaxed">
          On this site, man-made diamond means a laboratory-grown diamond. Man-made diamonds are not mined. The growth method and any post-growth treatment are stated on each piece. We make no claims about the resale value of either kind of stone.
        </p>
      </Section>
    </>
  );
}
