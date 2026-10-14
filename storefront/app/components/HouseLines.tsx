import { Link, useSearchParams } from "react-router";
import { tierBySlug } from "~/lib/catalog/data";
import { LINE_DESCRIPTION, LINE_ORDER, SHOP_LINES, lineHref } from "~/lib/catalog/lines";
import { TIER_PHOTO } from "~/lib/catalog/photos";
import type { TierSlug } from "~/lib/catalog/types";
import { Pic } from "./Pic";

/** Quiet, persistent context: products below always belong to the underlined line. */
export function LineNav({current, path = "/jewelry", lines = LINE_ORDER}: {current?: TierSlug; path?: string; lines?: readonly TierSlug[]}) {
  const [params] = useSearchParams();
  return <nav className="line-nav" aria-label="Jewelry lines">{lines.map(line => <Link key={line} to={lineHref(path,line,params)} aria-current={current === line ? "page" : undefined}>{tierBySlug(line).name}</Link>)}</nav>;
}

export function LineChoice({title = "Jewelry", bridal = false, path = "/jewelry", includeRoyal = true}: {title?: string; bridal?: boolean; path?: string; includeRoyal?: boolean}) {
  const lines = includeRoyal && !bridal ? LINE_ORDER : SHOP_LINES;
  return <section className={`line-choice house-wrap ${bridal ? "bridal-choice" : ""}`}>
    <header className="line-choice-heading"><h1>{title}</h1><p>{bridal ? "Choose your diamond." : "Choose your line."}</p></header>
    <div className={`line-choice-grid ${lines.length === 3 ? "three-lines" : "two-lines"}`}>{lines.map(line => {
      const photo = bridal ? line === "americana" ? "campaign-09-shooting-star-hero-mobile" : "campaign-03-signal-bridal-hand" : TIER_PHOTO[line];
      const href = path === "/jewelry" && !bridal ? `/${line}` : lineHref(path,line);
      return <Link key={line} to={href} className={`line-choice-link choice-${line}`}>
        <div className="line-choice-photo"><Pic k={photo} priority sizes={lines.length === 3 ? "(min-width: 768px) 32vw, 100vw" : "(min-width: 768px) 48vw, 100vw"} position={bridal ? line === "americana" ? "50% 48%" : "50% 46%" : line === "royal-american" ? "82% 50%" : line === "new-american" ? "72% 50%" : "50% 50%"} /></div>
        <div className="line-choice-caption"><div><h2>{tierBySlug(line).name}</h2><p>{bridal && line === "americana" ? "Natural diamonds" : LINE_DESCRIPTION[line]}</p></div><span aria-hidden="true">↗</span></div>
      </Link>;
    })}</div>
    {bridal && <p className="line-choice-help"><Link className="link" to="/natural-or-man-made">Natural or lab-grown?</Link></p>}
  </section>;
}
