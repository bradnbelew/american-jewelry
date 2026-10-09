import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageTitle } from "@/components/Section";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Natural or man-made diamond",
  description: "An honest comparison of natural and man-made (laboratory-grown) diamonds from a house that sells both: what each is, how to tell, how each is graded, and where each belongs.",
  alternates: { canonical: "/natural-or-man-made" },
};

const ROWS: [string, string, string][] = [
  ["What it is", "Carbon crystallized in the earth over a billion years or more.", "Carbon crystallized in a reactor over weeks. The same crystal, the same hardness, the same fire."],
  ["How to tell", "Only with laboratory instruments. Not by eye, not by loupe.", "Only with laboratory instruments. Every one of ours is inscribed with its report number."],
  ["How it is graded", "GIA Diamond Grading Report. Ours are F to G color, VS1 clarity, Excellent cut.", "IGI Laboratory Grown Diamond Report. Ours are D to F color, VVS1 to VVS2 clarity, Ideal cut."],
  ["What it costs", "Set by rarity. The same grade costs several times more.", "Set by the making. Larger and cleaner for the same money."],
  ["Where it belongs", "Americana and Royal American.", "New American, and any bridal setting when you choose it."],
  ["What we call it", "Natural diamond.", "Man-made diamond, every time, on every tag and listing, with laboratory-grown on the spec line."],
];

const FAQ: [string, string][] = [
  ["Is a man-made diamond a real diamond?", "It is a diamond: the same carbon crystal, hardness and optical properties as a mined one, grown in a laboratory instead of the earth. Under the FTC's jewelry guides it may not be called simply a diamond, so we call it a man-made diamond every time, and we do not call either kind real or fake."],
  ["Can anyone tell the difference?", "Not by eye and not with a jeweler's loupe. A gemological laboratory can tell with instruments, which is why every man-made diamond we sell at 0.30 ct and above carries an IGI report and a laser inscription."],
  ["Why do you grade them with different laboratories?", "GIA stopped issuing letter grades for laboratory-grown diamonds in October 2025 and now issues a Premium or Standard designation instead. IGI still grades them with the full color and clarity scales, so a D-F, VVS promise is an IGI promise. Natural diamonds carry a GIA report."],
  ["Which should I choose?", "If the rarity of a stone from the earth matters to you, choose natural and we will find it. If a larger, cleaner stone for the same money matters more, choose man-made. The design, the gold and the hands that set it are the same, and the ring is labeled plainly either way."],
];

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Natural or man-made", href: "/natural-or-man-made" }])} />
      <JsonLd data={faqJsonLd(FAQ)} />
      <Section className="pt-16 md:pt-24 pb-12 md:pb-16">
        <PageTitle title="Natural or man-made?" lede="We sell both, and we would rather you choose with the facts than with a sales pitch. Here is the whole comparison, without a side." />
      </Section>
      <Section width="text">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] hair text-left">
            <thead>
              <tr>
                <th className="py-4 pr-6 w-40" />
                <th className="py-4 pr-6 h-item text-[1.25rem] font-normal">Natural diamond</th>
                <th className="py-4 h-item text-[1.25rem] font-normal">Man-made diamond</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([k, a, b]) => (
                <tr key={k} className="border-t border-hair align-top">
                  <th className="py-5 pr-6 text-[0.875rem] text-muted font-normal">{k}</th>
                  <td className="py-5 pr-6 text-ink-2 leading-relaxed">{a}</td>
                  <td className="py-5 text-ink-2 leading-relaxed">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section width="text" className="pt-16 md:pt-24">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-3 hair pt-6">
            <h2 className="h-item text-[1.25rem]">If you want the stone from the earth</h2>
            <p className="text-ink-2 leading-relaxed">Start in Americana, or bring us a budget and we will find the stone in the salon. Every natural center stone comes with a GIA report, and any treatment is disclosed before you buy.</p>
            <Link href="/americana" className="link self-start">
              Americana
            </Link>
          </div>
          <div className="flex flex-col gap-3 hair pt-6">
            <h2 className="h-item text-[1.25rem]">If you want the larger, cleaner stone</h2>
            <p className="text-ink-2 leading-relaxed">Start in New American. Every man-made diamond is D to F, VVS, Ideal cut, with an IGI report and a laser inscription. The price is in the design and the gold, never the carat.</p>
            <Link href="/new-american" className="link self-start">
              New American
            </Link>
          </div>
        </div>
      </Section>
      <Section width="text" className="pt-20 md:pt-28">
        <h2 className="h-section text-[1.75rem] md:text-[2.25rem] mb-8">Questions we are asked</h2>
        <dl className="flex flex-col divide-y divide-hair hair">
          {FAQ.map(([q, a]) => (
            <div key={q} className="grid md:grid-cols-12 gap-3 md:gap-10 py-7">
              <dt className="md:col-span-5 h-item text-[1.25rem]">{q}</dt>
              <dd className="md:col-span-7 text-ink-2 leading-relaxed">{a}</dd>
            </div>
          ))}
        </dl>
        <p className="text-[0.75rem] text-muted mt-12 leading-relaxed">
          Disclosure: on this site, man-made diamond means a laboratory-grown diamond. Man-made diamonds are not mined. The growth method and any post-growth treatment are stated on each piece. We make no claims about the resale value of either kind of stone.
        </p>
      </Section>
    </>
  );
}
