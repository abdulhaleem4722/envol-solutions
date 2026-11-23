import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { brand, servicePages } from "../data";
import Icon from "./Icon";

// The round "3 lines" button + a slide-in menu with every page of the website.
// Put <TopMenu /> next to the "Book a Free Call" button in the top bar of Navbar.jsx.

const pages = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services", sub: true },
  { label: "Pricing", to: "/pricing" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Contact", to: "/contact" },
];

export default function TopMenu({ className = "" }) {
  const [open, setOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false); // services drop-down inside the menu
  const { pathname } = useLocation();

  // close when the page changes
  useEffect(() => setOpen(false), [pathname]);

  // the services drop-down is always closed again when the menu closes
  useEffect(() => {
    if (!open) setSubOpen(false);
  }, [open]);

  // Esc closes it, and the page behind does not scroll while it is open
  useEffect(() => {
    if (!open) return;
    const key = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", key);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (to) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-haspopup="dialog"
        className={`grid size-[46px] shrink-0 place-items-center rounded-full bg-linear-to-r from-navy to-aqua text-white shadow-[0_8px_20px_rgba(10,111,174,0.28)] transition hover:scale-105 ${className}`}
      >
        <span className="grid gap-[5px]" aria-hidden="true">
          <span className="block h-[2px] w-[22px] rounded bg-white" />
          <span className="ml-auto block h-[2px] w-[16px] rounded bg-white" />
          <span className="block h-[2px] w-[22px] rounded bg-white" />
        </span>
      </button>

      {/* backdrop + panel */}
      <div
        className={`fixed inset-0 z-[90] transition duration-300 ${open ? "visible opacity-100" : "invisible opacity-0"}`}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-navy-deep/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={`absolute right-0 top-0 flex h-full w-[min(420px,100%)] flex-col overflow-y-auto bg-white px-8 pb-8 pt-6 shadow-[-20px_0_60px_rgba(7,48,90,0.25)] transition-transform duration-300 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mb-8 flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2.5 font-extrabold text-navy">
              <img src={brand.logo} alt="" width={32} height={32} />
              {brand.name}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="grid size-[44px] place-items-center rounded-full bg-linear-to-r from-navy to-aqua text-white shadow-[0_8px_20px_rgba(10,111,174,0.28)] transition hover:scale-105"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M5 5l14 14M19 5 5 19" />
              </svg>
            </button>
          </div>

          <nav aria-label="All pages" className="flex-1">
            <ul className="grid gap-1">
              {pages.map((p) => (
                <li key={p.to}>
                  <div className="flex items-center">
                    <Link
                      to={p.to}
                      className={`block flex-1 rounded-xl px-3 py-3 text-[1.5rem] font-bold transition hover:bg-sky-faint hover:text-brand ${
                        isActive(p.to) ? "text-brand" : "text-navy"
                      }`}
                    >
                      {p.label}
                    </Link>
                    {p.sub && (
                      <button
                        type="button"
                        aria-label="Show service pages"
                        aria-expanded={subOpen}
                        onClick={() => setSubOpen((o) => !o)}
                        className="grid size-11 shrink-0 place-items-center rounded-full text-navy transition hover:bg-sky-faint hover:text-brand"
                      >
                        <span className={`transition duration-300 ${subOpen ? "rotate-180" : ""}`}>
                          <Icon name="chevron" size={22} />
                        </span>
                      </button>
                    )}
                  </div>

                  {/* services drop-down */}
                  {p.sub && (
                    <div
                      inert={!subOpen}
                      className={`grid transition-[grid-template-rows] duration-300 ${
                        subOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <ul className="ml-3 grid gap-0.5 overflow-hidden border-l-2 border-line pl-4">
                        {servicePages.map((s) => (
                          <li key={s.slug}>
                            <Link
                              to={`/services/${s.slug}`}
                              className={`block rounded-lg px-3 py-1.5 text-[0.98rem] font-medium transition hover:text-brand ${
                                pathname === `/services/${s.slug}` ? "text-brand" : "text-muted"
                              }`}
                            >
                              {s.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-8 border-t border-line pt-6">
            <Link
              to="/contact"
              className="flex w-full items-center justify-center rounded-full bg-linear-to-r from-navy to-aqua px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Book a Call
            </Link>
            <a href={`mailto:${brand.email}`} className="mt-4 block text-center text-[0.9rem] text-muted hover:text-brand">
              {brand.email}
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
