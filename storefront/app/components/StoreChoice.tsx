import { Link } from "react-router";
import { STORES } from "~/lib/catalog/data";

/** Both stores, one tap each. Copy is the delivery and care lines already on the piece page. */
export function StoreChoice({ storeQuery }: { storeQuery: string }) {
  return (
    <section className="with-house" aria-labelledby="with-house-h">
      <h2 id="with-house-h" className="label">With the house</h2>
      <ul className="with-house-stores">
        {STORES.map((s) => (
          <li key={s.slug}>
            <Link to={`/appointments?store=${s.slug}&${storeQuery}`} className="link">
              See it in {s.name}
            </Link>
            <a href={`tel:${s.phone.replace(/\D/g, "")}`} className="link-quiet num">{s.phone}</a>
          </li>
        ))}
      </ul>
      <p className="font-text text-ink-2">
        Insured, signature required, or collected in either store. <Link to="/policies#returns" className="link-quiet">Returns</Link>
      </p>
      <p className="font-text text-ink-2">
        Cleaning and inspection at either store, at no charge, for life. <Link to="/policies#warranty" className="link-quiet">Warranty</Link>
      </p>
    </section>
  );
}
