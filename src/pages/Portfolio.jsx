import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { portfolioCategories } from "../data";
import { container } from "../ui";
import Icon from "../components/Icon";
import Reveal from "../components/Reveal";

// This page uses its own colours, taken from the client's reference (teal, orange, light grey):
//   teal #0b707c   heading blue #1196b6   orange #f56b47   page grey #f4f4f4
/* ---------- picture or branded placeholder ---------- */
function Thumb({ item, className = "" }) {
  return item.image ? (
    <img src={item.image} alt={item.title} loading="lazy" className={`size-full object-cover ${className}`} />
  ) : (
    <div
      aria-hidden="true"
      className={`grid size-full place-items-center bg-linear-to-br from-[#d9eef0] via-[#7cc3cc] to-[#0b707c] ${className}`}
    >
      <img src="/logo.png" alt="" className="w-[18%] min-w-[34px] max-w-[72px] opacity-90" />
    </div>
  );
}

/* ---------- click a picture to see it bigger ---------- */
function Lightbox({ item, onClose }) {
  useEffect(() => {
    const key = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", key);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
      className="fixed inset-0 z-[100] grid place-items-center bg-[#06323a]/85 p-4 backdrop-blur-sm"
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-[860px] overflow-hidden rounded-[18px] bg-white shadow-2xl">
        <div className="aspect-[4/3] max-h-[70vh] w-full">
          <Thumb item={item} />
        </div>
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <div>
            <h3 className="font-bold text-[#0b3b44]">{item.title}</h3>
            <p className="text-[0.82rem] text-muted">{item.sub}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full bg-[#f56b47] px-5 py-2 text-[0.85rem] font-bold text-white transition hover:bg-[#e25a37]">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

const tabIcon = { web: "globe", app: "phone", design: "brush" };

/* ---------- tabs + picture grid (one category shown at a time) ---------- */
function PortfolioTabs({ onOpen }) {
  const [active, setActive] = useState(portfolioCategories[0].id);
  const [sub, setSub] = useState("All");
  const cat = portfolioCategories.find((c) => c.id === active);
  const subs = cat.subs.length > 1 ? ["All", ...cat.subs] : [];
  const shown = sub === "All" ? cat.items : cat.items.filter((x) => x.sub === sub);

  const pick = (id) => {
    setActive(id);
    setSub("All");
  };

  return (
    <section className="bg-[#f4f4f4] pb-[88px] pt-[80px]">
      <div className={container}>
        <div className="mx-auto max-w-[900px] text-center">
          <h2 className="text-[length:clamp(1.7rem,4vw,3rem)] font-extrabold uppercase leading-tight tracking-wide text-[#1196b6]">
            Every Obstacle Sparks Innovation
          </h2>
          <hr className="mx-auto mt-5 border-t border-[#313131]" />
          <p className="mt-6 text-[1.02rem] text-[#1b1b1b]">
            A glimpse into our world of innovative projects that bring ideas to life with excellence.
          </p>
        </div>

        {/* the three tabs */}
        <div role="tablist" aria-label="Portfolio categories" className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-6">
          {portfolioCategories.map((c) => {
            const on = c.id === active;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => pick(c.id)}
                className={`inline-flex items-center gap-3 rounded-l-[40px] px-6 py-3.5 text-[0.9rem] font-medium uppercase tracking-[0.1em] transition sm:px-8 sm:text-[1rem] ${
                  on ? "bg-[#f56b47] text-white" : "bg-transparent text-[#1b1b1b] hover:text-[#f56b47]"
                }`}
              >
                <Icon name={tabIcon[c.id] || "star"} size={22} />
                {c.label}
              </button>
            );
          })}
        </div>

        {subs.length > 0 && (
          <div className="mt-7 flex flex-wrap justify-center gap-2.5" role="group" aria-label={`${cat.label} types`}>
            {subs.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSub(s)}
                aria-pressed={s === sub}
                className={`rounded-full border px-4 py-1.5 text-[0.82rem] font-semibold transition ${
                  s === sub
                    ? "border-[#f56b47] bg-[#f56b47] text-white"
                    : "border-[#d5d5d5] bg-white text-[#555] hover:border-[#f56b47] hover:text-[#f56b47]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div role="tabpanel" className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((item, i) => (
            <Reveal key={`${active}-${sub}-${i}`} delay={(i % 3) * 90}>
              <button
                type="button"
                onClick={() => onOpen(item)}
                aria-label={`View ${item.title}`}
                className="group relative block w-full overflow-hidden bg-white p-3 shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.15)] sm:p-4"
              >
                <div className="relative aspect-[4/3] overflow-hidden ">
                  <Thumb item={item} className="transition duration-500 group-hover:scale-105" />
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-[#06323a]/85 to-transparent px-3.5 pb-3 pt-10 text-left text-[0.85rem] font-semibold text-white opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    {item.title}
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [open, setOpen] = useState(null);

  return (
    <>
      {/* title banner */}
      <section className="bg-[#0b707c] pb-[80px] pt-[150px] text-center text-white">
        <div className={container}>
          <h1 className="text-[length:clamp(2.6rem,8vw,5.2rem)] font-medium uppercase leading-none tracking-wide">
            Portfolio
          </h1>
        </div>
      </section>

      <PortfolioTabs onOpen={setOpen} />

      {/* call to action */}
      <section className="bg-[#0b707c] py-[72px] text-center text-white">
        <Reveal className={container}>
          <p className="mb-2 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-white/75">Make Your First Move</p>
          <h2 className="text-[length:clamp(1.8rem,3.6vw,2.6rem)] font-bold uppercase tracking-wide">Share Your Idea With Us</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-full bg-[#f56b47] px-8 py-3.5 text-[0.9rem] font-bold uppercase tracking-[0.1em] text-white transition hover:-translate-y-0.5 hover:bg-[#fc751b]"
            >
              Select Package
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-3 text-[0.9rem] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-white hover:text-[#0b707c]"
            >
              Request a Quote
            </Link>
          </div>
        </Reveal>
      </section>

      {open && <Lightbox item={open} onClose={() => setOpen(null)} />}
    </>
  );
}