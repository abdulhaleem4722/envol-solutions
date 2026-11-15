import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { brand, navLinks } from "../data";
import { btn } from "../ui";

const SCROLL_AT = 90; // px scrolled before the navigation bar appears

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
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_AT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);
  const isActive = (href) => href === pathname + hash || (href === "/" && pathname === "/" && !hash);

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
          <Link to="/#contact" className={`${btn("primary")} max-md:hidden`}>
            Book a Free Call
          </Link>
          <Burger open={open} onClick={() => setOpen((o) => !o)} />
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
            {navLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className={`transition hover:text-brand ${isActive(l.href) ? "text-brand" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link to="/#contact" className={`${btn("primary")} max-md:hidden`}>
            Book a Free Call
          </Link>
          <Burger open={open} onClick={() => setOpen((o) => !o)} />
        </div>
      </div>

      {/* mobile menu */}
      <nav
        className={`fixed inset-x-3 top-[84px] z-40 flex-col rounded-3xl border border-line bg-white p-4 text-[0.98rem] font-medium text-muted shadow-[0_18px_45px_rgba(7,48,90,0.18)] md:hidden ${
          open ? "flex" : "hidden"
        }`}
      >
        {navLinks.map((l) => (
          <Link
            key={l.href}
            to={l.href}
            onClick={close}
            className={`rounded-xl px-3 py-3 hover:bg-sky-faint hover:text-brand ${isActive(l.href) ? "text-brand" : ""}`}
          >
            {l.label}
          </Link>
        ))}
        <Link to="/#contact" onClick={close} className={`${btn("primary")} mt-2`}>
          Book a Free Call
        </Link>
      </nav>
    </header>
  );
}