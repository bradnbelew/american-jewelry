import Link from "next/link";
import { STORES } from "@/lib/catalog/data";
import { Year } from "./Year";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-hair">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 grid gap-12 md:grid-cols-4">
        <div className="flex flex-col gap-4">
          <span className="font-display text-xl tracking-[0.26em] uppercase">American Jewelry</span>
          <p className="text-sm text-ink-2 max-w-xs leading-relaxed">
            Designed in Tennessee. Set and finished in our own workshop. Two stores, one bench, since the family opened the
            first door.
          </p>
          <Link href="/appointments" className="link self-start">
            Book an appointment
          </Link>
        </div>
        <Col
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
        <Col
          title="Services"
          links={[
            ["/build/ring", "Build a ring"],
            ["/build/band", "Build a band"],
            ["/commission", "Commission a piece"],
            ["/care", "Lifetime Care Program"],
            ["/natural-or-man-made", "Natural or man-made"],
            ["/policies", "Shipping and returns"],
          ]}
        />
        <div className="flex flex-col gap-5">
          <span className="caps-sm text-muted">Stores</span>
          {STORES.map((s) => (
            <div key={s.slug} className="text-sm leading-relaxed">
              <Link href={`/stores/${s.slug}`} className="font-display text-lg hover:text-muted transition-colors">
                {s.name}
              </Link>
              <div className="text-ink-2">
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
      <div className="border-t border-hair">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-5 flex flex-wrap gap-x-8 gap-y-2 text-[0.75rem] text-muted">
          <span>
            © <Year /> American Jewelry
          </span>
          <Link href="/policies#disclosures" className="hover:text-ink">
            Diamond and metal disclosures
          </Link>
          <Link href="/policies#privacy" className="hover:text-ink">
            Privacy
          </Link>
          <Link href="/policies" className="hover:text-ink">
            Accessibility
          </Link>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="caps-sm text-muted">{title}</span>
      {links.map(([href, label]) => (
        <Link key={href} href={href} className="text-sm text-ink hover:text-muted transition-colors">
          {label}
        </Link>
      ))}
    </div>
  );
}
