import { Link } from "react-router";

import { STORES } from "~/lib/catalog/data";

import { Logo } from "./Logo";
import { ServicesStrip } from "./HouseBlocks";

const COLS: { title: string; links: [string, string][] }[] = [
  {
    title: "Jewelry",
    links: [
      ["/collections/bridal", "Bridal"],
      ["/jewelry", "Jewelry"],
      ["/custom-design", "Custom design"],
      ["/services#watch-service", "Watches"],
    ],
  },
  {
    title: "Services",
    links: [
      ["/services#repairs", "Repairs"],
      ["/services#engraving", "Engraving"],
      ["/services#appraisals", "Appraisals"],
      ["/services#care", "Lifetime care"],
    ],
  },
  {
    title: "Our story",
    links: [
      ["/our-story", "The family"],
      ["/our-story#workshop", "The workshop"],
      ["/journal", "Journal"],
    ],
  },
  {
    title: "Client care",
    links: [
      ["/appointments", "Contact us"],
      ["/policies#shipping", "Shipping"],
      ["/policies#returns", "Returns and exchanges"],
      ["/policies#warranty", "Warranty"],
      ["/policies", "FAQs"],
    ],
  },
];

const SOCIAL: [string, string][] = [
  ["https://www.instagram.com/americanjewelryco/", "Instagram"],
  ["https://www.tiktok.com/@americanjewelryco", "TikTok"],
  ["https://www.facebook.com/americanjewelryco", "Facebook"],
];

export function Footer({ year }: { year: number }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <ServicesStrip />
        <nav className="foot-links" aria-label="Footer">
          {COLS.map((col) => (
            <div key={col.title}>
              <h2 className="caps-sm">{col.title}</h2>
              {col.links.map(([href, label]) => (
                <Link key={href} to={href}>{label}</Link>
              ))}
            </div>
          ))}
        </nav>
        <div className="foot-stores">
          {STORES.map((store) => (
            <address key={store.slug} className="not-italic">
              <h3>
                <Link to={`/stores/${store.slug}`}>{store.name}</Link>
              </h3>
              <p className="small">
                {store.address1}
                <br />
                {store.city}, {store.state} {store.zip}
              </p>
              <p>
                <a className="price" href={`tel:${store.phone.replace(/\D/g, "")}`}>{store.phone}</a>
              </p>
            </address>
          ))}
          <div>
            <h2 className="caps-sm">Social</h2>
            {SOCIAL.map(([href, label]) => (
              <a key={label} href={href} className="flex min-h-9 items-center" target="_blank" rel="noreferrer">{label}</a>
            ))}
            <p className="small mute">@americanjewelryco</p>
          </div>
        </div>
        <div className="foot-base">
          <Logo className="h-7 w-auto" />
          <span className="small">© {year} American Jewelry</span>
          <Link to="/policies#privacy">Privacy</Link>
          <Link to="/policies">Terms</Link>
          <Link to="/policies#accessibility">Accessibility</Link>
          <Link to="/policies#disclosures">Disclosures</Link>
        </div>
      </div>
    </footer>
  );
}
