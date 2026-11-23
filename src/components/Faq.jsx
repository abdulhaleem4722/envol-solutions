import { useState } from "react";
import { Link } from "react-router-dom";
import { container, btn, sectionPad } from "../ui";
import Icon from "./Icon";
import Reveal from "./Reveal";

// FAQ block: eyebrow + heading, accordion questions, closing text and a button.
// Content comes from src/faqData.js.
//   tone = "white" | "faint"  -> background of the section (pick the one that differs from the section above it)
export function Faq({ eyebrow = "Got Questions?", heading, items, closing, button, tone = "white" }) {
  const [open, setOpen] = useState(0); // first question starts open; click again to close

  return (
    <section className={`${sectionPad} ${tone === "faint" ? "bg-sky-faint" : "bg-white"}`}>
      <div className={container}>
        <Reveal className="mx-auto mb-12 max-w-[760px] text-center">
          <span className="mb-2.5 inline-block text-xs font-bold uppercase tracking-[0.16em] text-brand">
            {eyebrow}
          </span>
          <h2 className="text-[length:clamp(1.8rem,3.6vw,2.5rem)] font-bold leading-tight tracking-tight text-navy">
            {heading}
          </h2>
        </Reveal>

        <Reveal className="mx-auto max-w-[860px]">
          <ul className="grid gap-3">
            {items.map((it, i) => {
              const on = open === i;
              return (
                <li
                  key={it.q}
                  className={`overflow-hidden rounded-[16px] border bg-white transition-colors duration-300 ${
                    on ? "border-brand shadow-[0_12px_32px_rgba(7,48,90,0.10)]" : "border-line hover:border-[#b9def0]"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(on ? -1 : i)}
                      aria-expanded={on}
                      aria-controls={`faq-${i}`}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                    >
                      <span className={`text-[1rem] font-bold sm:text-[1.05rem] ${on ? "text-brand" : "text-navy"}`}>
                        <span className="mr-2 text-muted">{String(i + 1).padStart(2, "0")}.</span>
                        {it.q}
                      </span>
                      <span
                        className={`grid size-8 shrink-0 place-items-center rounded-full transition duration-300 ${
                          on ? "rotate-45 bg-brand text-white" : "bg-sky-soft text-brand"
                        }`}
                      >
                        <Icon name="plus" size={16} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-${i}`}
                    role="region"
                    className={`grid transition-[grid-template-rows] duration-300 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-[0.96rem] leading-relaxed text-muted sm:px-6 sm:pb-6">{it.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>

        {(closing || button) && (
          <Reveal className="mx-auto mt-12 max-w-[640px] text-center">
            {closing && <p className="text-[1.05rem] text-ink">{closing}</p>}
            {button && (
              <Link to={button.to} className={`${btn("primary", true)} mt-6`}>
                {button.label} <Icon name="arrow" size={18} />
              </Link>
            )}
          </Reveal>
        )}
      </div>
    </section>
  );
}

export default Faq;
