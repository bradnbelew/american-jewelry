import { useEffect, useState } from "react";
import { Link, useLocation, useRouteLoaderData } from "react-router";

import { useCart } from "~/lib/cart";
import { CART_DRAWER_ID, SAVED_DRAWER_ID, openDialogFromLinkClick } from "~/lib/cart-drawer";
import { NAV, type NavPanel } from "~/lib/nav";
import type { loader as rootLoader } from "~/root";

import { Logo } from "./Logo";
import { Pic } from "./Pic";
import { SearchDialog } from "./SearchDialog";
import { useSaved } from "./saved/SavedProvider";

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d={d} />
    </svg>
  );
}

const ICONS = {
  search: "M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15ZM16 16l5 5",
  pin: "M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z M12 12.5a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4Z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20a7.5 7.5 0 0 1 15 0",
  bag: "M6 8h12l-1 12H7L6 8Z M9 8a3 3 0 0 1 6 0",
  menu: "M4 7h16M4 12h16M4 17h16",
};

export function Header() {
  const location = useLocation();
  const root = useRouteLoaderData<typeof rootLoader>("root");
  const live = root?.live === true;
  const nav = NAV.filter((item) => (live ? item.label !== "High Jewelry" : true));
  const home = location.pathname === "/";
  const [solid, setSolid] = useState(!home);
  const [util, setUtil] = useState(true);
  const [menu, setMenu] = useState(false);
  const [sub, setSub] = useState<string | null>(null);
  const [panel, setPanel] = useState<string | null>(null);
  const [search, setSearch] = useState(false);
  const totalQuantity = useCart((state) => state.data.totalQuantity);
  const { count: saved } = useSaved();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(!home || y > 8);
      setUtil(y < 200);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [home]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setMenu(false);
      setSub(null);
      setPanel(null);
    });
    return () => cancelAnimationFrame(id);
  }, [location.pathname, location.search]);

  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    const block = util ? (window.innerWidth >= 1024 ? "152px" : "92px") : window.innerWidth >= 1024 ? "120px" : "60px";
    document.documentElement.style.setProperty("--header-block", block);
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu, util]);

  const overlay = home && !solid && !menu;
  const open = nav.find((item) => item.label === panel) ?? null;

  return (
    <header
      className={`site-header ${overlay ? "is-overlay" : "is-solid"}`}
      onMouseLeave={() => setPanel(null)}
    >
      {util ? (
        <div className="util-bar caps-sm">
          <p className="hidden md:block">Brentwood · Mt. Juliet, Tennessee</p>
          <p className="ml-auto hidden items-center gap-6 md:flex">
            <a href="tel:6154572089">Call or text (615) 457-2089</a>
            <Link to="/appointments">Contact us</Link>
            <Link to="/appointments">Book an appointment</Link>
          </p>
          <p className="w-full text-center md:hidden">
            <Link to="/appointments">Book an appointment</Link>
          </p>
        </div>
      ) : null}

      <div className="main-bar">
        <div className="bar-side">
          <button type="button" className="icon-btn menu-toggle caps" aria-expanded={menu} onClick={() => { setMenu(true); setSub(null); }}>
            <Icon d={ICONS.menu} /> Menu
          </button>
          <button type="button" className="icon-btn caps" aria-haspopup="dialog" aria-expanded={search} onClick={() => setSearch(true)}>
            <Icon d={ICONS.search} /> <span className="hidden sm:inline">Search</span>
          </button>
        </div>
        <Link to="/" className="logo-link" aria-label="American Jewelry, home">
          <Logo tone={overlay ? "paper" : "ink"} />
        </Link>
        <div className="bar-side right">
          <Link to="/stores" className="icon-btn" aria-label="Stores"><Icon d={ICONS.pin} /></Link>
          <Link to="/account" className="icon-btn" aria-label="Account"><Icon d={ICONS.user} /></Link>
          <a href={`#${SAVED_DRAWER_ID}`} className="icon-btn" aria-label={saved ? `Saved, ${saved} items` : "Saved"} onClick={(event) => openDialogFromLinkClick(event, SAVED_DRAWER_ID)}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 19.4 4.8 12.6a4.2 4.2 0 0 1 5.9-6 4.2 4.2 0 0 1 5.9 6L12 19.4Z" /></svg>
          </a>
          <a href={`#${CART_DRAWER_ID}`} className="icon-btn" aria-label={totalQuantity ? `Bag, ${totalQuantity} items` : "Bag"} onClick={(event) => openDialogFromLinkClick(event, CART_DRAWER_ID)}>
            <Icon d={ICONS.bag} />
            {totalQuantity > 0 ? <span className="price">{totalQuantity}</span> : null}
          </a>
        </div>
      </div>

      <nav className="primary-nav caps" aria-label="Primary">
        {nav.map((item) => (
          <div key={item.label} className="nav-item" onMouseEnter={() => setPanel(item.label)}>
            <Link to={item.href} className="nav-name" aria-expanded={panel === item.label} aria-current={location.pathname === item.href ? "page" : undefined} onFocus={() => setPanel(item.label)}>
              {item.label}
            </Link>
          </div>
        ))}
      </nav>

      {open ? <Mega panel={open} onClose={() => setPanel(null)} /> : null}
      {menu ? <MobileMenu nav={nav} sub={sub} setSub={setSub} onClose={() => setMenu(false)} /> : null}
      <SearchDialog open={search} onClose={() => setSearch(false)} />
    </header>
  );
}

function Mega({ panel, onClose }: { panel: NavPanel; onClose: () => void }) {
  return (
    <div className="mega" onMouseEnter={() => undefined}>
      <div className="mega-grid">
        {panel.columns.map((column) => (
          <div key={column.title}>
            <p className="caps-sm mute" style={{ marginBottom: 8 }}>{column.title}</p>
            {column.links.map((link) => (
              <Link key={link.href + link.label} to={link.href} className="mega-link" onClick={onClose}>{link.label}</Link>
            ))}
          </div>
        ))}
        {panel.photo ? (
          <Link to={panel.photo.href} onClick={onClose}>
            <span className="mega-photo">
              <Pic k={panel.photo.key} position={panel.photo.position} sizes="280px" />
            </span>
            <span className="caps">{panel.photo.caption}</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

function MobileMenu({ nav, sub, setSub, onClose }: { nav: NavPanel[]; sub: string | null; setSub: (value: string | null) => void; onClose: () => void }) {
  const current = nav.find((item) => item.label === sub);
  return (
    <div className="mobile-menu" role="dialog" aria-label="Menu">
      <div className="flex items-center justify-between">
        {current ? (
          <button type="button" className="icon-btn caps" onClick={() => setSub(null)}>Back</button>
        ) : <span />}
        <button type="button" className="icon-btn caps" onClick={onClose}>Close</button>
      </div>
      {current ? (
        <div className="mobile-sub">
          <p className="h3" style={{ margin: "24px 0 8px" }}>{current.label}</p>
          {current.columns.flatMap((column) => column.links).map((link) => (
            <Link key={link.href + link.label} to={link.href} onClick={onClose}>{link.label}</Link>
          ))}
        </div>
      ) : (
        nav.map((item) => (
          <button key={item.label} type="button" className="mobile-link" onClick={() => setSub(item.label)}>{item.label}</button>
        ))
      )}
      <div style={{ marginTop: 32 }} className="grid gap-2">
        <a className="price" href="tel:6154572089">Brentwood (615) 457-2089</a>
        <a className="price" href="tel:6157546046">Mt. Juliet (615) 754-6046</a>
        <Link to="/appointments" className="link" onClick={onClose}>Book an appointment</Link>
      </div>
    </div>
  );
}
