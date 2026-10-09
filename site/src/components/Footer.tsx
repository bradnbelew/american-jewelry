import Link from "next/link";
import { STORES, TOTAL_REVIEWS } from "@/lib/catalog/data";
import { Mark } from "./Mark";
import { Year } from "./Year";

export function Footer() {
  return (
    <footer className="bg-navy text-cream mt-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Mark className="h-8 w-8 text-gilt-2" />
            <span className="font-display text-2xl tracking-[0.12em] uppercase">American Jewelry</span>
          </div>
          <p className="text-cream/75 max-w-sm leading-relaxed">
            Designed and made in Tennessee. Two stores, one workshop, {TOTAL_REVIEWS.toLocaleString()} reviews, and a
            promise that every piece was drawn by us, cast by us and set by us.
          </p>
          <Link href="/appointments" className="btn !bg-gilt !border-gilt !text-navy self-start">
            Book an appointment
          </Link>
        </div>

        <FooterCol
          title="The House"
          links={[
            ["/royal-american", "Royal American"],
            ["/americana", "Americana"],
            ["/new-american", "New American"],
            ["/collections/bridal", "Bridal"],
            ["/collections/family", "Family"],
            ["/house", "Our story"],
          ]}
        />
        <FooterCol
          title="Services"
          links={[
            ["/build/ring", "Build a ring"],
            ["/build/band", "Build a band"],
            ["/commission", "Commission a piece"],
            ["/care", "Lifetime care"],
            ["/natural-or-man-made", "Natural or man made"],
            ["/appointments", "Appointments"],
          ]}
        />
        <div className="flex flex-col gap-4">
          <span className="eyebrow !text-gilt-2">Stores</span>
          {STORES.map((s) => (
            <div key={s.slug} className="text-sm leading-relaxed">
              <Link href={`/stores/${s.slug}`} className="font-display text-lg">
                {s.name}
              </Link>
              <div className="text-cream/70">
                {s.address1}
                <br />
                {s.city}, {s.state} {s.zip}
                <br />
                <span className="select-all">{s.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-cream/15">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-6 flex flex-wrap gap-x-8 gap-y-2 text-xs text-cream/60">
          <span>
            © <Year /> American Jewelry. Brentwood and Mt. Juliet, Tennessee.
          </span>
          <Link href="/policies">Shipping, returns and care</Link>
          <Link href="/policies#disclosures">Diamond disclosures</Link>
          <Link href="/policies#privacy">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="eyebrow !text-gilt-2">{title}</span>
      {links.map(([href, label]) => (
        <Link key={href} href={href} className="text-sm text-cream/80 hover:text-cream">
          {label}
        </Link>
      ))}
    </div>
  );
}
