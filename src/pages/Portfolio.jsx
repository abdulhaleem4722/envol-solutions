import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { portfolioCategories } from "../data";
import { container, btn, gradBg, gradText, sectionPad } from "../ui";
import Icon from "../components/Icon";
import Reveal from "../components/Reveal";

/* ---------- picture or branded placeholder ---------- */
// Types whose pictures are shown whole (not cropped). The empty sides are filled with a soft blurred copy of the same picture.
// Add more names from data.js if needed.
const CONTAIN_SUBS = ["Other Graphic Work"];

function Thumb({ item, className = "" }) {
  if (item.image && CONTAIN_SUBS.includes(item.sub)) {
    return (
      <div className={`relative size-full overflow-hidden bg-sky-faint ${className}`}>
        <img src={item.image} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 size-full scale-125 object-cover opacity-80 blur-2xl" />
        <img src={item.image} alt={item.title} loading="lazy" className="relative size-full object-contain" />
      </div>
    );
  }
  return item.image ? (
    <img src={item.image} alt={item.title} loading="lazy" className={`size-full object-cover object-top ${className}`} />
  ) : (
    <div
      aria-hidden="true"
      className={`grid size-full place-items-center bg-linear-to-br from-[#d6effa] via-[#8fd3ee] to-[#3aa7da] ${className}`}
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
      className="fixed inset-0 z-[100] grid place-items-center bg-navy-deep/80 p-4 backdrop-blur-sm"
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-[860px] overflow-hidden rounded-[18px] bg-white shadow-2xl">
        <div className={`${item.url ? "aspect-video" : "aspect-[4/3]"} max-h-[70vh] w-full`}>
          <Thumb item={item} />
        </div>
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <div>
            <h3 className="font-bold text-navy">{item.title}</h3>
            <p className="text-[0.82rem] text-muted">{item.sub}</p>
          </div>
          <div className="flex gap-2.5">
            {item.url && (
              <a href={item.url} target="_blank" rel="noopener noreferrer" className={btn("primary")}>
                Visit Website
              </a>
            )}
            <button type="button" onClick={onClose} className={btn("ghost")}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const tabIcon = { web: "globe", app: "phone", design: "brush" };

// Names shown on the filter buttons (the key is the `sub` name used in data.js). Others show as written.
const subLabel = { Business: "Business Websites", "Web Portal": "Web Portals" };

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
    <section className={`${sectionPad} pt-4`}>
      <div className={container}>
        <div className="mx-auto max-w-[900px] text-center">
          <h2 className="text-[length:clamp(1.7rem,4vw,3rem)] font-extrabold uppercase leading-tight tracking-wide">
            <span className={gradText}>Real Projects. Thoughtful Solutions. Lasting Impact.</span>
          </h2>
          <hr className="mx-auto mt-5 border-t border-line" />
          <p className="mt-6 text-[1.02rem] text-muted">
            Explore our selected projects across web development, mobile applications, and branding. Every project reflects our commitment to understanding business needs and turning ideas into practical digital solutions.
          </p>
        </div>

        {/* the three tabs */}
        <div role="tablist" aria-label="Portfolio categories" className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-5">
          {portfolioCategories.map((c) => {
            const on = c.id === active;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => pick(c.id)}
                className={`inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-[0.85rem] font-bold uppercase tracking-[0.08em] transition sm:px-8 sm:text-[0.95rem] ${
                  on
                    ? `${gradBg} text-white shadow-[0_10px_24px_rgba(10,111,174,0.3)]`
                    : "bg-white text-navy shadow-[0_4px_14px_rgba(7,48,90,0.08)] hover:text-brand"
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
                    ? "border-brand bg-sky-soft text-brand"
                    : "border-line bg-white text-muted hover:border-brand hover:text-brand"
                }`}
              >
                {subLabel[s] || s}
              </button>
            ))}
          </div>
        )}

        <div role="tabpanel" className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((item, i) => (
            <Reveal key={`${active}-${sub}-${i}`} delay={(i % 3) * 90} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-[14px] border border-line bg-white p-3 shadow-[0_10px_28px_rgba(7,48,90,0.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(7,48,90,0.16)] sm:p-4">
                <button
                  type="button"
                  onClick={() => onOpen(item)}
                  aria-label={`View ${item.title}`}
                  className={`group relative block w-full overflow-hidden rounded-[8px] ${item.url ? "aspect-video" : "aspect-[4/3]"}`}
                >
                  <Thumb item={item} className="transition duration-500 group-hover:scale-105" />
                  {!item.url && (
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-navy-deep/85 to-transparent px-3.5 pb-3 pt-10 text-left text-[0.85rem] font-semibold text-white opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      {item.title}
                    </span>
                  )}
                </button>

                {/* websites get a button to the live site */}
                {item.url && (
                  <div className="mt-3.5 flex items-center justify-between gap-3 px-1">
                    <h3 className="truncate text-[0.98rem] font-bold text-navy">{item.title}</h3>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${item.title} (opens in a new tab)`}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-linear-to-r from-navy to-aqua px-4 py-2 text-[0.78rem] font-bold text-white shadow-[0_6px_16px_rgba(10,111,174,0.25)] transition hover:-translate-y-0.5"
                    >
                      Visit Website <Icon name="arrow" size={14} />
                    </a>
                  </div>
                )}
              </article>
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
      <section className="bg-linear-to-b from-[#bfe8f8] via-[#d3effb] to-white pb-12 pt-[150px] text-center">
        <div className={container}>
          <h1 className="text-[length:clamp(2.6rem,8vw,5rem)] font-extrabold uppercase leading-none tracking-wide text-navy">
            Our Portfolio
          </h1>
        </div>
      </section>

      <PortfolioTabs onOpen={setOpen} />

      {/* call to action */}
      <section className={`${gradBg} py-[72px] text-center text-white`}>
        <Reveal className={container}>
          <p className="mb-2 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-white/80">Your idea could be next</p>
          <h2 className="text-[length:clamp(1.8rem,3.6vw,2.6rem)] font-extrabold">Inspired by What You've Seen?</h2>
          <p className="mx-auto mt-3.5 max-w-[560px] text-[#cfe6f5]">Let's build something that moves your business forward</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-navy transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Select Package
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-7 py-3 font-bold text-white transition hover:bg-white hover:text-navy"
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