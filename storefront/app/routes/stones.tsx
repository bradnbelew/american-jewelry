import { Link } from "react-router";

import { PageTitle, Section } from "~/components/Section";
import { breadcrumbJsonLd, faqJsonLd, pageMeta } from "~/lib/seo";

import type { Route } from "./+types/stones";

const ROWS: [string, string, string][] = [
  ["What it is", "Carbon crystallized in the earth over a billion years.", "Carbon crystallized in a reactor over weeks. The same crystal, hardness and fire."],
  ["How to tell", "Only with laboratory instruments.", "Only with laboratory instruments. Check the inscription and report for the individual center stone."],
  ["How it is graded", "GIA. Ours are F to G, VS1, Excellent cut.", "IGI. Ours are D to F, VVS1 to VVS2, Ideal cut."],
  ["What sets the price", "Origin, rarity, size, quality, setting and market conditions.", "Production, grading, size, quality, setting and market conditions."],
  ["Where it belongs", "Bridal and high jewelry, when you choose a natural center stone.", "Bridal and any setting, when you choose a lab-grown diamond."],
  ["What we call it", "Natural diamond.", "Lab-grown diamond, every time, with laboratory-grown on the spec line."],
];

const FAQ: [string, string][] = [
  ["Where can I see lab-grown diamond jewelry in Middle Tennessee?", "At American Jewelry in Brentwood and Mt. Juliet. Book an appointment and the store will confirm which pieces are available to view."],
  // house-lint: allow (the customer's own question; the answer never calls natural stones real)
  ["Is a lab-grown diamond a real diamond?", "It is a diamond: the same carbon crystal, hardness and optical properties as a mined one, grown in a laboratory instead of the earth. We identify it as lab-grown, laboratory-grown or man-made diamond so its origin is clear."],
  ["Can anyone tell the difference?", "Not by eye and not with a jeweler's loupe. A gemological laboratory can, which is why every lab-grown diamond we sell at 0.30 ct and above carries an IGI report and a laser inscription."],
  ["Why two laboratories?", "GIA stopped issuing letter grades for laboratory-grown diamonds in October 2025. IGI still grades them with the full color and clarity scales, so a D to F, VVS promise is an IGI promise. Natural diamonds carry a GIA report."],
  ["Which should I choose?", "If the rarity of a stone from the earth matters to you, choose natural. If the stone itself, grown to the same crystal, is what matters, choose lab-grown. The design, the gold and the hands are the same, and the ring is labeled plainly either way."],
];

export const meta: Route.MetaFunction = () =>
  pageMeta(
    { title: "Natural or lab-grown diamond", description: "Compare natural and lab-grown diamonds at American Jewelry in Brentwood and Mt. Juliet, Tennessee. Origin, grading and what we call each stone.", path: "/natural-or-man-made" },
    [breadcrumbJsonLd([{ name: "Natural or lab-grown", href: "/natural-or-man-made" }]), faqJsonLd(FAQ)],
  );

export default function StonesPage() {
  return (
    <>
      <Section width="text" className="pt-16 pb-12 md:pt-24 md:pb-16">
        <PageTitle title="Natural or lab-grown?"  />
      </Section>
      <Section width="text">
        <div>
          <table className="spec stone-comparison">
            <thead>
              <tr>
                <th scope="col" />
                <th scope="col" className="h-item !w-auto !normal-case !tracking-normal !text-ink !text-[1.25rem]">
                  Natural diamond
                </th>
                <th scope="col" className="h-item !w-auto !normal-case !tracking-normal !text-ink !text-[1.25rem]">
                  Lab-grown diamond
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
      <Section screen width="text" className="stone-links">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h2 className="h-item text-[1.25rem]">The stone from the earth</h2>
            <p className="font-text text-ink-2">Bring us a budget and we find the stone. Every natural center stone comes with a GIA report.</p>
            <Link to="/jewelry?stone=natural" className="link self-start">
              Natural diamonds
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="h-item text-[1.25rem]">The lab-grown diamond</h2>
            <p className="font-text text-ink-2">D to F, VVS, Ideal cut, IGI report, laser inscribed. The price is in the design and the gold.</p>
            <Link to="/jewelry?stone=lab-grown" className="link self-start">
              Lab-grown diamonds
            </Link>
          </div>
        </div>
      </Section>
      <Section className="pb-8" width="text">
        <h2 className="h-section mb-8 text-[1.75rem] md:text-[2.25rem]">Questions</h2>
        <div className="flex flex-col">
          {FAQ.map(([q, a]) => (
            <details key={q} className="acc border-t border-hair">
              <summary className="h-item text-[1.25rem]">{q}</summary>
              <p className="font-text max-w-[62ch] pb-6 text-ink-2">{a}</p>
            </details>
          ))}
        </div>
        <p className="label mt-12 max-w-[70ch] leading-relaxed">
          On this site, lab-grown diamond means a laboratory-grown diamond. Lab-grown diamonds are not mined. The growth method and any post-growth treatment are stated on each piece. We make no claims about the resale value of either kind of stone.
        </p>
      </Section>
    </>
  );
}
