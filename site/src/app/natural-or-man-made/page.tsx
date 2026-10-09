import type { Metadata } from "next";
import Link from "next/link";
import { Section, Heading } from "@/components/Section";

export const metadata: Metadata = {
  title: "Natural or man made",
  description: "An honest comparison of natural and man made (laboratory-grown) diamonds, from a house that sells both.",
};

const ROWS: [string, string, string][] = [
  ["What it is", "Carbon crystallized in the earth over a billion years or more.", "Carbon crystallized in a reactor over weeks. Same crystal, same hardness, same fire."],
  ["How to tell", "Only with laboratory instruments. Not by eye, not by loupe.", "Only with laboratory instruments. Every one of ours is inscribed and reported."],
  ["Price", "Set by rarity. A 2 ct D-flawless is a serious sum.", "Set by the making. The same grade costs a fraction, and the price keeps falling."],
  ["Resale", "Holds value in proportion to its rarity.", "Little resale value. Buy it for the piece, not as a store of value."],
  ["Where it belongs", "Americana and Royal American.", "New American, and bridal settings when you choose it."],
  ["What we call it", "Natural diamond.", "Man made diamond, every time, on every tag and listing."],
];

export default function Page() {
  return (
    <>
      <Section className="pt-20 pb-14" width="5xl">
        <Heading
          eyebrow="Plainly"
          title="Natural or man made?"
          lede="We sell both, and we would rather you choose with the facts than with a sales pitch. Here is the whole comparison, without a side."
          size="xl"
        />
      </Section>
      <Section width="5xl" className="pb-16">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-t border-navy text-left">
            <thead>
              <tr className="label text-muted">
                <th className="py-4 pr-6 font-medium w-40"></th>
                <th className="py-4 pr-6 font-medium">Natural diamond</th>
                <th className="py-4 font-medium">Man made diamond</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([k, a, b]) => (
                <tr key={k} className="border-t border-line align-top">
                  <th className="py-5 pr-6 font-display text-xl text-navy font-normal">{k}</th>
                  <td className="py-5 pr-6 text-ink/85 leading-relaxed">{a}</td>
                  <td className="py-5 text-ink/85 leading-relaxed">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section width="5xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-line bg-paper p-8 flex flex-col gap-3">
            <span className="eyebrow">If you want the natural stone</span>
            <p className="text-ink/85 leading-relaxed">
              Start in Americana, or bring us a budget and we will find the stone in the salon. Every natural center stone comes
              with a GIA report.
            </p>
            <Link href="/americana" className="label text-navy hover:text-gilt">
              Americana →
            </Link>
          </div>
          <div className="border border-line bg-paper p-8 flex flex-col gap-3">
            <span className="eyebrow">If you want the bigger, cleaner stone</span>
            <p className="text-ink/85 leading-relaxed">
              Start in New American. Every man made diamond is D–F, VVS, Ideal cut, with an IGI report and a laser inscription.
              The price is in the design and the gold, never the carat.
            </p>
            <Link href="/new-american" className="label text-navy hover:text-gilt">
              New American →
            </Link>
          </div>
        </div>
        <p className="text-xs text-muted mt-8 max-w-3xl leading-relaxed">
          Disclosure: &ldquo;man made diamond&rdquo; on this site means a laboratory-grown diamond. Man made diamonds are not mined.
          Growth method and any post-growth treatment are stated on each piece.
        </p>
      </Section>
    </>
  );
}
