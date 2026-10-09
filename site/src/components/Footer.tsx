import Link from "next/link";
import { STORES } from "@/lib/catalog/data";
import { Year } from "./Year";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-hair">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4 flex flex-col gap-5">
          <span className="font-display text-xl tracking-[0.26em] uppercase">American Jewelry</span>
          <p className="text-sm text-ink-2 max-w-xs leading-relaxed">
            A house of fine jewelry in Tennessee. Designed in Tennessee. Set and finished in our workshop. Diamonds and gold are imported.
          </p>
          <Link href="/appointments" className="link self-start">
            Book an appointment
          </Link>
        </div>
        <Col
          className="md:col-span-2"
          title="The House"
          links={[
            ["/royal-american", "Royal American"],
            ["/americana", "Americana"],
            ["/new-american", "New American"],
            ["/collections/bridal", "Bridal"],
            ["/house", "Our story"],
            ["/journal", "Journal"],
          ]}
        />
        <Col
          className="md:col-span-2"
          title="Services"
          links={[
            ["/build/ring", "Build a ring"],
            ["/commission", "Commission a piece"],
            ["/services", "Repair and restoration"],
            ["/care", "Lifetime Care Program"],
            ["/natural-or-man-made", "Natural or man-made"],
            ["/saved", "Saved pieces"],
          ]}
        />
        <div className="md:col-span-4 grid sm:grid-cols-2 gap-8">
          {STORES.map((s) => (
            <div key={s.slug} className="text-sm leading-relaxed flex flex-col gap-1">
              <Link href={`/stores/${s.slug}`} className="font-display text-lg hover:text-muted transition-colors">
                {s.name}
              </Link>
              <address className="not-italic text-ink-2">
                {s.address1}
                <br />
                {s.city}, {s.state} {s.zip}
                <br />
                <a href={`tel:${s.phone.replace(/\D/g, "")}`} className="hover:text-ink">
                  {s.phone}
                </a>
              </address>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-hair">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-5 flex flex-wrap gap-x-8 gap-y-2 text-[0.75rem] text-muted">
          <span>
            © <Year /> American Jewelry
          </span>
          <Link href="/policies#shipping" className="hover:text-ink">
            Shipping and insurance
          </Link>
          <Link href="/policies#returns" className="hover:text-ink">
            Returns
          </Link>
          <Link href="/policies#warranty" className="hover:text-ink">
            Warranty and care
          </Link>
          <Link href="/policies#disclosures" className="hover:text-ink">
            Diamond and metal disclosures
          </Link>
          <Link href="/policies#privacy" className="hover:text-ink">
            Privacy
          </Link>
          <Link href="/policies#accessibility" className="hover:text-ink">
            Accessibility
          </Link>
        </div>
      </div>
    </footer>
  );
}

function Col({ title, links, className = "" }: { title: string; links: [string, string][]; className?: string }) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <span className="caps-sm text-muted">{title}</span>
      {links.map(([href, label]) => (
        <Link key={href} href={href} className="text-sm text-ink hover:text-muted transition-colors">
          {label}
        </Link>
      ))}
    </div>
  );
}
