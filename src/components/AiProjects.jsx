import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { container, card, cardFx, iconFx, iconPop, btn, sectionPad } from "../ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { SectionHead } from "./Sections";

/* ---------- AI Automation page: "Our Work" ----------
   6 project cards. Click a card (or "View Details") to read the full story in a pop-up. */

function Detail({ p, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={p.title}
      onClick={onClose}
      className="fixed inset-0 z-[200] grid place-items-center bg-navy-deep/70 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[88vh] w-full max-w-[720px] overflow-y-auto rounded-[20px] bg-white p-6 shadow-2xl sm:p-9"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-sky-soft text-xl leading-none text-navy transition hover:bg-brand hover:text-white"
        >
          ×
        </button>

        <div className="mb-5 flex items-center gap-3.5 pr-10">
          <div className="grid size-[52px] shrink-0 place-items-center rounded-[14px] bg-sky-soft text-brand">
            <Icon name={p.icon} />
          </div>
          <div>
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-brand">{p.tag}</span>
            <h3 className="text-[1.4rem] font-bold leading-tight text-navy">{p.title}</h3>
          </div>
        </div>
        <p className="mb-6 font-semibold text-navy">{p.subtitle}</p>

        <h4 className="mb-1.5 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-brand">Overview</h4>
        <p className="mb-6 text-[0.95rem] text-muted">{p.overview}</p>

        <h4 className="mb-2 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-brand">The problem it solves</h4>
        <ul className="mb-6 grid gap-2">
          {p.problems.map((x) => (
            <li key={x} className="flex gap-2.5 text-[0.95rem] text-muted">
              <span className="mt-[3px] grid size-[18px] shrink-0 place-items-center rounded-full bg-sky-soft text-brand">
                <Icon name="check" size={11} />
              </span>
              {x}
            </li>
          ))}
        </ul>

        <h4 className="mb-1.5 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-brand">How the solution helps</h4>
        <p className="mb-6 text-[0.95rem] text-muted">{p.solution}</p>

        <div className="rounded-[14px] border border-line bg-sky-faint px-5 py-4">
          <span className="mb-1 block text-[0.72rem] font-bold uppercase tracking-[0.14em] text-brand">Business value</span>
          <p className="font-semibold text-navy">{p.value}</p>
        </div>
      </div>
    </div>
  );
}

export default function AiProjects({ service }) {
  const [open, setOpen] = useState(null);
  const list = service.aiProjects;

  return (
    <section className={`${sectionPad} bg-sky-faint`}>
      <div className={container}>
        <SectionHead
          eyebrow="Our Work"
          title="Recent AI Automation"
          accent="Projects"
          text="Practical AI solutions designed to save time, reduce repetitive work and keep your team in control."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.title} from="zoom" delay={(i % 3) * 110} className="h-full">
              <article
                onClick={() => setOpen(p)}
                className={`${card} ${cardFx} flex h-full cursor-pointer flex-col`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className={`grid size-[52px] place-items-center rounded-[14px] bg-sky-soft text-brand ${iconFx} ${iconPop}`}>
                    <Icon name={p.icon} />
                  </div>
                  <span className="text-[0.72rem] font-bold tracking-[0.14em] text-brand/70">
                    PROJECT {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <span className="mb-1 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-brand">{p.tag}</span>
                <h3 className="mb-2 text-[1.15rem] font-bold text-navy transition-colors duration-300 group-hover:text-brand">
                  {p.title}
                </h3>
                <p className="mb-4 text-[0.92rem] text-muted">{p.subtitle}</p>
                <p className="mb-5 border-t border-line pt-4 text-[0.85rem] text-muted">
                  <span className="font-bold text-navy">Business value: </span>
                  {p.value}
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(p);
                  }}
                  className="mt-auto inline-flex items-center gap-1.5 text-[0.9rem] font-bold text-brand"
                >
                  View Details <Icon name="arrow" size={15} />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/contact" className={btn("ghost")}>
            Discuss Your Automation Idea <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
      {open && <Detail p={open} onClose={() => setOpen(null)} />}
    </section>
  );
}