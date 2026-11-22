import { useEffect, useRef, useState } from "react";
import { services, stats, reasons, steps } from "../data";
import { container, card, cardFx, iconFx, iconPop, gradBg, gradText, sectionPad } from "../ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import ProcessTimeline from "./ProcessTimeline";
import { Link } from "react-router-dom";

export function SectionHead({ eyebrow, title, accent, text }) {
  return (
    <Reveal className="mx-auto mb-12 max-w-[640px] text-center">
      <span className="mb-2.5 inline-block text-xs font-bold uppercase tracking-[0.16em] text-brand">
        {eyebrow}
      </span>
      <h2 className="text-[length:clamp(1.8rem,3.6vw,2.5rem)] font-bold leading-tight tracking-tight text-navy">
        {title} {accent && <span className={gradText}>{accent}</span>}
      </h2>
      {text && <p className="mt-3 text-muted">{text}</p>}
    </Reveal>
  );
}

export function Services() {
  return (
    <section id="services" className={sectionPad}>
      <div className={container}>
        <SectionHead
          eyebrow="What We Do"
          title="Services That"
          accent="Drive Growth"
          text="End-to-end digital solutions for businesses that are ready to scale."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 120} className="h-full">
              <article className={`${card} ${cardFx}`}>
                <div className={`mb-[18px] grid size-[52px] place-items-center rounded-[14px] bg-sky-soft text-brand ${iconFx} ${iconPop}`}>
                  <Icon name={s.icon} />
                </div>
                <h3 className="mb-2 text-[1.15rem] font-bold text-navy transition-colors duration-300 group-hover:text-brand">{s.title}</h3>
                <p className="text-[0.95rem] text-muted">{s.text}</p>
                <ul className="my-[18px] flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-sky-soft px-3 py-1 text-[0.78rem] font-semibold text-navy"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/services/${s.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-navy"
                >
                  Learn More <Icon name="arrow" size={16} />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className={`${gradBg} py-14`}>
      <div className={container}>
        <ul className="grid grid-cols-2 gap-5 text-center md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal as="li" key={s.label} from="zoom" delay={i * 110}>
              <strong className="block text-[2.4rem] font-extrabold leading-tight text-white">
                {s.value}
              </strong>
              <span className="text-[0.85rem] text-[#d3f1fb]">{s.label}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section id="why" className={`${sectionPad} bg-sky-faint`}>
      <div className={container}>
        <SectionHead
          eyebrow="What Makes Us Different"
          title="Built Around Your Business."
          accent="Driven by Results."
          text="Great digital experiences start with the right people, the right strategy, and a clear understanding of where your business wants to go."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 120} className="h-full">
              <article className={`${card} ${cardFx}`}>
                <div className={`mb-[18px] grid size-11 place-items-center rounded-xl bg-sky-soft text-brand ${iconFx} ${iconPop}`}>
                  <Icon name={r.icon} size={20} />
                </div>
                <h3 className="mb-2 text-[1.15rem] font-bold text-navy transition-colors duration-300 group-hover:text-brand">{r.title}</h3>
                <p className="text-[0.95rem] text-muted">{r.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className={sectionPad}>
      <div className={container}>
        <SectionHead
          eyebrow="From Idea to Impact"
          title="Your Vision,"
          accent="Our Execution."
          text="Every successful project starts with an idea. Here's how we turn yours into something real."
        />
        <ProcessTimeline />
      </div>
    </section>
  );
}