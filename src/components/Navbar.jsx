import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { brand, navLinks, servicePages } from "../data";
import { btn } from "../ui";
import Icon from "./Icon";
import TopMenu from "./TopMenu";

const SCROLL_AT = 90; // px scrolled before the navigation bar appears
const SERVICES_HREF = "/services"; // this link gets a drop-down with the service pages

function Burger({ open, onClick }) {
  return (
    <button
      className="flex size-10 shrink-0 flex-col items-center justify-center gap-[5px] rounded-full md:hidden"
      aria-label="Toggle menu"
      aria-expanded={open}
      onClick={onClick}
    >
      <span className={`h-0.5 w-[22px] rounded bg-navy transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
      <span className={`h-0.5 w-[22px] rounded bg-navy transition ${open ? "opacity-0" : ""}`} />
      <span className={`h-0.5 w-[22px] rounded bg-navy transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false); // mobile: services list expanded
  const [menu, setMenu] = useState(false); // desktop: services drop-down open
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_AT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => {
    setOpen(false);
    setSubOpen(false);
    setMenu(false);
  };

  // the drop-down always closes when a new page opens
  useEffect(() => {
    setMenu(false);
  }, [pathname]);
  const isActive = (href) =>
    href === SERVICES_HREF
      ? pathname.startsWith(SERVICES_HREF)
      : href === pathname + hash || (href === "/" && pathname === "/" && !hash);

  const logo = (size, text) => (
    <Link to="/" className={`inline-flex shrink-0 items-center gap-2.5 font-extrabold text-navy ${text}`} onClick={close}>
      <img src={brand.logo} alt="" width={size} height={size} />
      <span>{brand.name}</span>
    </Link>
  );

  return (
    <header>
      {/* 1) At the very top: just the logo (left) and the call button (right) */}
          <div
        className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
          scrolled ? "pointer-events-none -translate-y-full opacity-0" : ""
        }`}
      >
        <div className="mx-auto flex h-[78px] w-full max-w-[1760px] items-center justify-between gap-4 px-6 sm:px-10 lg:px-16">
          {logo(38, "text-lg")}
          <div className="flex items-center gap-3">
          <Link to="/contact" className={`${btn("primary")} max-md:hidden`}>
  Book a Call
</Link>
            <TopMenu className="max-md:hidden" />
            <Burger open={open} onClick={() => setOpen((o) => !o)} />
          </div>
        </div>
      </div>
      {/* 2) After a little scrolling: a floating navigation bar with everything in it */}
      <div
        className={`fixed inset-x-0 top-3 z-50 flex justify-center px-3 transition duration-300 ${
          scrolled ? "" : "pointer-events-none -translate-y-6 opacity-0"
        }`}
      >
        <div className="flex w-full items-center justify-between gap-4 rounded-full border border-line bg-white/85 py-2 pl-5 pr-2 shadow-[0_10px_30px_rgba(7,48,90,0.12)] backdrop-blur-md md:w-auto md:gap-6 lg:gap-9">
          {logo(30, "text-base")}
          <nav className="hidden items-center gap-5 text-[0.92rem] font-medium text-muted md:flex lg:gap-7">
            {navLinks.map((l) =>
              l.href === SERVICES_HREF ? (
                <div
                  key={l.href}
                  className="relative"
                  onMouseEnter={() => setMenu(true)}
                  onMouseLeave={() => setMenu(false)}
                  onFocus={() => setMenu(true)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) setMenu(false);
                  }}
                  onKeyDown={(e) => e.key === "Escape" && setMenu(false)}
                >
                  <Link
                    to={l.href}
                    onClick={close}
                    className={`inline-flex items-center gap-1 transition hover:text-brand ${isActive(l.href) ? "text-brand" : ""}`}
                  >
                    {l.label}
                    <span className={`transition ${menu ? "rotate-180" : ""}`}>
                      <Icon name="chevron" size={14} />
                    </span>
                  </Link>
                  {/* drop-down: opens on hover or keyboard focus */}
                  <div
                    className={`absolute left-1/2 top-full z-50 w-[270px] -translate-x-1/2 pt-4 transition duration-200 ${
                      menu ? "visible opacity-100" : "invisible opacity-0"
                    }`}
                  >
                    <div className="rounded-2xl border border-line bg-white p-2 shadow-[0_18px_45px_rgba(7,48,90,0.18)]">
                      {servicePages.map((s) => (
                        <Link
                          key={s.slug}
                          to={`/services/${s.slug}`}
                          onClick={close}
                          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-sky-faint hover:text-brand ${
                            pathname === `/services/${s.slug}` ? "bg-sky-faint text-brand" : ""
                          }`}
                        >
                          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-sky-soft text-brand">
                            <Icon name={s.icon} size={16} />
                          </span>
                          {s.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={l.href}
                  to={l.href}
                  className={`transition hover:text-brand ${isActive(l.href) ? "text-brand" : ""}`}
                >
                  {l.label}
                </Link>
              )
            )}
          </nav>
          <Link to="/#contact" className={`${btn("primary")} max-md:hidden`}>
            Book a Free Call
          </Link>
          <Burger open={open} onClick={() => setOpen((o) => !o)} />
        </div>
      </div>

      {/* mobile menu */}
      <nav
        className={`fixed inset-x-3 top-[84px] z-40 max-h-[calc(100svh-100px)] flex-col overflow-y-auto rounded-3xl border border-line bg-white p-4 text-[0.98rem] font-medium text-muted shadow-[0_18px_45px_rgba(7,48,90,0.18)] md:hidden ${
          open ? "flex" : "hidden"
        }`}
      >
        {navLinks.map((l) =>
          l.href === SERVICES_HREF ? (
            <div key={l.href}>
              <div className="flex items-center">
                <Link
                  to={l.href}
                  onClick={close}
                  className={`flex-1 rounded-xl px-3 py-3 hover:bg-sky-faint hover:text-brand ${isActive(l.href) ? "text-brand" : ""}`}
                >
                  {l.label}
                </Link>
                <button
                  type="button"
                  aria-label="Show service pages"
                  aria-expanded={subOpen}
                  onClick={() => setSubOpen((o) => !o)}
                  className="grid size-10 place-items-center rounded-full hover:bg-sky-faint"
                >
                  <span className={`transition ${subOpen ? "rotate-180" : ""}`}>
                    <Icon name="chevron" size={18} />
                  </span>
                </button>
              </div>
              {subOpen && (
                <div className="mb-1 ml-3 border-l border-line pl-2">
                  {servicePages.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/services/${s.slug}`}
                      onClick={close}
                      className={`block rounded-xl px-3 py-2.5 text-[0.93rem] hover:bg-sky-faint hover:text-brand ${
                        pathname === `/services/${s.slug}` ? "text-brand" : ""
                      }`}
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={l.href}
              to={l.href}
              onClick={close}
              className={`rounded-xl px-3 py-3 hover:bg-sky-faint hover:text-brand ${isActive(l.href) ? "text-brand" : ""}`}
            >
              {l.label}
            </Link>
          )
        )}
        <Link to="/#contact" onClick={close} className={`${btn("primary")} mt-2`}>
          Book a Free Call
        </Link>
      </nav>
    </header>
  );
}