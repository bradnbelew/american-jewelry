import type { Metadata } from "next";
import Link from "next/link";
import { Section, PageTitle } from "@/components/Section";

export const metadata: Metadata = {
  title: "Natural or man-made",
  description: "An honest comparison of natural and man-made (laboratory-grown) diamonds, from a house that sells both.",
};

const ROWS: [string, string, string][] = [
  ["What it is", "Carbon crystallized in the earth over a billion years or more.", "Carbon crystallized in a reactor over weeks. Same crystal, same hardness, same fire."],
  ["How to tell", "Only with laboratory instruments. Not by eye, not by loupe.", "Only with laboratory instruments. Every one of ours is inscribed and reported."],
  ["Price", "Set by rarity. A 2 ct D-flawless is a serious sum.", "Set by the making. The same grade costs a fraction, and the price keeps falling."],
  ["Resale", "Holds value in proportion to its rarity.", "Little resale value. Buy it for the piece, not as a store of value."],
  ["Where it belongs", "Americana and Royal American.", "New American, and bridal settings when you choose it."],
  ["What we call it", "Natural diamond.", "Man-made diamond, every time, on every tag and listing."],
];

export default function Page() {
  return (
    <>
      <Section className="pt-16 md:pt-24 pb-12 md:pb-16">
        <PageTitle eyebrow="Plainly" title="Natural or man-made?" lede="We sell both, and we would rather you choose with the facts than with a sales pitch. Here is the whole comparison, without a side." />
      </Section>
      <Section width="text">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] hair text-left">
            <thead>
              <tr>
                <th className="py-4 pr-6 w-40"></th>
                <th className="py-4 pr-6 caps-sm text-muted font-medium">Natural diamond</th>
                <th className="py-4 caps-sm text-muted font-medium">Man-made diamond</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([k, a, b]) => (
                <tr key={k} className="border-t border-hair align-top">
                  <th className="py-5 pr-6 font-display text-[1.25rem] font-normal">{k}</th>
                  <td className="py-5 pr-6 text-ink-2 leading-relaxed">{a}</td>
                  <td className="py-5 text-ink-2 leading-relaxed">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section width="text" className="pt-16">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-3 hair pt-6">
            <span className="caps-sm text-muted">If you want the natural stone</span>
            <p className="text-ink-2 leading-relaxed">Start in Americana, or bring us a budget and we will find the stone in the salon. Every natural center stone comes with a GIA report.</p>
            <Link href="/americana" className="link self-start">
              Americana
            </Link>
          </div>
          <div className="flex flex-col gap-3 hair pt-6">
            <span className="caps-sm text-muted">If you want the bigger, cleaner stone</span>
            <p className="text-ink-2 leading-relaxed">Start in New American. Every man-made diamond is D–F, VVS, Ideal cut, with an IGI report and a laser inscription. The price is in the design and the gold, never the carat.</p>
            <Link href="/new-american" className="link self-start">
              New American
            </Link>
          </div>
        </div>
        <p className="text-[0.75rem] text-muted mt-10 leading-relaxed">
          Disclosure: &ldquo;man-made diamond&rdquo; on this site means a laboratory-grown diamond. Man-made diamonds are not mined. Growth method and any post-growth treatment are stated on each piece.
        </p>
      </Section>
    </>
  );
}
