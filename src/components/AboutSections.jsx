import { useState } from "react";
import { aboutStats, timeline, values, principles } from "../data";
import { container, card, cardFx, iconFx, gradText, sectionPad } from "../ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { SectionHead } from "./Sections";

/* ---------- top banner ---------- */
export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(to_bottom,#bfe8f8_0%,#d3effb_60%,#ffffff_100%)] pb-16 pt-[134px] text-center sm:pt-[166px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-[150px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(0,180,224,0.30),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/3 size-72 animate-drift rounded-full bg-aqua/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 size-80 animate-drift rounded-full bg-brand/20 blur-3xl [animation-delay:-8s]"
      />
      <div className="relative mx-auto max-w-[880px] px-6">
        <span className="mb-6 inline-block animate-fade-up rounded-full border border-line bg-white px-4 py-1.5 text-[0.82rem] font-semibold text-brand">
          About Us
        </span>
        <h1 className="animate-fade-up text-[length:clamp(2.4rem,5vw,4.4rem)] font-extrabold leading-[1.1] tracking-tight text-navy [animation-delay:120ms]">
          The Story Behind <br className="hidden sm:block" /><span className={gradText}>Envol Solutions</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[680px] animate-fade-up text-[1.1rem] text-muted [animation-delay:240ms]">
          We are a global digital agency on a mission to help businesses grow
          through technology, design and strategy. From day one, our focus has
          been simple: deliver real results.
        </p>
      </div>
    </section>
  );
}

/* ---------- our story: stats + year timeline (click a year to see its story) ---------- */
export function Story() {
  const [active, setActive] = useState(0);

  return (
    <section id="story" className={sectionPad}>
      <div className={container}>
        <SectionHead eyebrow="Our Journey" title="Our" accent="Story" />

        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {aboutStats.map((s, i) => (
            <Reveal as="li" key={s.label} from="zoom" delay={i * 100}>
              <div className="rounded-2xl border border-line bg-sky-faint px-4 py-6 text-center shadow-[0_10px_30px_rgba(7,48,90,0.06)]">
                <strong className={`${gradText} block text-[2.2rem] font-extrabold leading-tight`}>
                  {s.value}
                </strong>
                <span className="text-[0.9rem] text-muted">{s.label}</span>
              </div>
            </Reveal>
          ))}
        </ul>

        <hr className="my-12 border-line" />

        <Reveal className="grid items-center gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* big year */}
          <div className="text-center lg:text-left">
            <p className="mb-2 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand">
              Our Achievements
            </p>
            <div
              key={timeline[active].year}
              className={`${gradText} animate-fade-up text-[length:clamp(4.5rem,11vw,9.5rem)] font-extrabold leading-none tracking-tight`}
              aria-live="polite"
            >
              {timeline[active].year}
            </div>
            <div className="mx-auto mt-4 h-1 w-24 rounded bg-linear-to-r from-brand to-aqua lg:mx-0" />
          </div>

          {/* year list */}
          <ol>
            {timeline.map((t, i) => {
              const on = i === active;
              return (
                <li key={t.year}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={on}
                    className={`block w-full border-l-[3px] px-6 py-3.5 text-left transition-colors duration-300 ${
                      on
                        ? "border-brand bg-sky-soft"
                        : "border-line text-muted hover:border-aqua hover:text-navy"
                    }`}
                  >
                    <span className={`block font-bold ${on ? "text-brand" : ""}`}>{t.year}</span>
                    {on && (
                      <span className="mt-1 block animate-fade-up text-[1.02rem] text-ink">
                        {t.text}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </Reveal>

        <p className="mt-8 text-center text-sm text-muted">Click a year to see what happened.</p>
      </div>
    </section>
  );
}

/* ---------- core values ---------- */
export function Values() {
  return (
    <section className={`${sectionPad} bg-sky-faint`}>
      <div className={container}>
        <SectionHead eyebrow="What Drives Us" title="Our Core" accent="Values" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 110} className="h-full">
              <article className={`${card} ${cardFx}`}>
                <div
                  className={`mb-[18px] grid size-12 animate-float place-items-center rounded-[14px] bg-sky-soft text-brand ${iconFx}`}
                  style={{ animationDelay: `${i * -1.3}s` }}
                >
                  <Icon name={v.icon} size={22} />
                </div>
                <h3 className="mb-2 text-[1.12rem] font-bold text-navy transition-colors duration-300 group-hover:text-brand">{v.title}</h3>
                <p className="text-[0.93rem] text-muted">{v.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- six things we won't compromise on ---------- */
export function Principles() {
  return (
    <section className={sectionPad}>
      <div className={`${container} grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20`}>
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <span className="mb-5 inline-flex items-center gap-2 border border-line bg-sky-faint px-2.5 py-1 text-[0.75rem] font-medium text-muted">
            <span className="size-1.5 bg-aqua" /> What makes us different
          </span>
          <h2 className="text-[length:clamp(2.2rem,4.4vw,3.6rem)] font-bold leading-[1.1] tracking-tight text-navy">
            Six things we won&apos;t <span className={gradText}>compromise on.</span>
          </h2>
        </Reveal>

        <ol className="border-t border-line">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} className="grid grid-cols-[3rem_1fr] gap-x-4 border-b border-line py-8 sm:grid-cols-[4.5rem_1fr]">
              <span className="text-[1.7rem] font-light leading-none text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="mb-2.5 text-[1.3rem] font-semibold text-navy">{p.title}</h3>
                <p className="max-w-[560px] text-[0.97rem] text-muted">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
