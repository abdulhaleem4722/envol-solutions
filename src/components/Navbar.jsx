import { useEffect, useState } from "react";
import { brand, navLinks } from "../data";
import { btn } from "../ui";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition duration-200 ${
        scrolled
          ? "border-line bg-white/90 shadow-[0_4px_20px_rgba(7,48,90,0.06)]"
          : "border-transparent bg-white/80"
      }`}
    >
     <div className="mx-auto flex h-[70px] w-full max-w-[1760px] items-center justify-between gap-6 px-6 sm:px-10 lg:px-16">
        <a
          href="#home"
          className="inline-flex items-center gap-2.5 text-lg font-extrabold text-navy"
          onClick={() => setOpen(false)}
        >
          <img src={brand.logo} alt="" width="38" height="38" />
          <span>{brand.name}</span>
        </a>

        <nav
          className={`${
            open ? "flex" : "hidden"
          } absolute left-0 right-0 top-[70px] flex-col border-b border-line bg-white px-5 pb-5 pt-2 text-[0.95rem] font-medium text-muted md:static md:flex md:flex-row md:gap-8 md:border-0 md:bg-transparent md:p-0`}
        >
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="py-3 hover:text-brand md:py-0"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className={`${btn("primary")} mt-2.5 md:hidden`}
            onClick={() => setOpen(false)}
          >
            Book a Free Call
          </a>
        </nav>

        <a href="#contact" className={`${btn("primary")} max-md:hidden`}>
          Book a Free Call
        </a>

        <button
          className="flex size-10 flex-col items-center justify-center gap-[5px] md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="h-0.5 w-[22px] rounded bg-navy" />
          <span className="h-0.5 w-[22px] rounded bg-navy" />
          <span className="h-0.5 w-[22px] rounded bg-navy" />
        </button>
      </div>
    </header>
  );
}