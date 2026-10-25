import { useEffect, useState } from "react";
import { Link } from "react-router";

import { STORES } from "~/lib/catalog/data";
import { FIGURES_AS_OF } from "~/lib/site";

import { Pic } from "./Pic";

const MAP = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export function StoreCards({ dated = false }: { dated?: boolean }) {
  return (
    <div className="store-grid">
      {STORES.map((store) => {
        const photo = store.slug === "mt-juliet" ? "aj-salon-cases" : "ed-bridal";
        const tel = store.phone.replace(/\D/g, "");
        return (
          <article key={store.slug}>
            <Link to={`/stores/${store.slug}`} className="frame-32 block" tabIndex={-1} aria-hidden="true">
              <Pic k={photo} sizes="(min-width: 768px) 46vw, 100vw" position={store.slug === "brentwood" ? "50% 60%" : "50% 45%"} />
            </Link>
            <h3 className="mt-4">{store.name}</h3>
            <p className="small">
              {store.address1}
              <br />
              {store.city}, {store.state} {store.zip}
            </p>
            <p>
              <a className="price" href={`tel:${tel}`}>{store.phone}</a>
            </p>
            {dated ? (
              <p className="small mute">
                Rated {store.rating.toFixed(1)} on Google from {store.reviews.toLocaleString("en-US")} reviews, as of {FIGURES_AS_OF}.
              </p>
            ) : null}
            <p className="mt-3 flex flex-wrap gap-x-6">
              <Link className="link" to={`/appointments?store=${store.slug}`}>Book an appointment</Link>
              <a className="link" href={MAP(store.mapQuery)} target="_blank" rel="noreferrer">Directions</a>
            </p>
          </article>
        );
      })}
    </div>
  );
}

export function ServicesStrip() {
  return (
    <div className="service-strip">
      <div>
        <h2 className="caps">Book an appointment</h2>
        <p className="small mt-2">Meet with us in Brentwood or Mt. Juliet, for bridal, custom design or a repair.</p>
        <Link className="link" to="/appointments">Book an appointment</Link>
      </div>
      <div>
        <h2 className="caps">Lifetime care</h2>
        <p className="small mt-2">Cleaning and inspection at no charge, for as long as you own the piece.</p>
        <Link className="link" to="/services">Our services</Link>
      </div>
      <div>
        <h2 className="caps">Speak with us</h2>
        <p className="small mt-2">Call or text either store, or write to info@american.jewelry.</p>
        <a className="link" href="mailto:info@american.jewelry">Contact us</a>
      </div>
    </div>
  );
}

/** A bottom bar, not a modal. The choice stays in this browser. */
export function CookieBar() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try {
      if (!localStorage.getItem("aj-cookies")) setOpen(true);
    } catch {
      setOpen(false);
    }
  }, []);
  if (!open) return null;
  const accept = () => {
    try { localStorage.setItem("aj-cookies", "accept"); } catch { /* private mode */ }
    setOpen(false);
  };
  return (
    <div className="cookie-bar" role="region" aria-label="Cookies">
      <p className="small">We use cookies to understand how the site is used.</p>
      <p className="flex gap-6">
        <button type="button" className="link" onClick={accept}>Accept</button>
        <Link className="link" to="/policies#privacy">Settings</Link>
      </p>
    </div>
  );
}
