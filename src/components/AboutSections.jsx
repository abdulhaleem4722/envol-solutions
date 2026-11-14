import { useEffect, useRef, useState } from "react";
import { aboutStats, timeline, values, principles } from "../data";
import { container, card, gradText, sectionPad } from "../ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { SectionHead } from "./Sections";

/* ---------- top banner ---------- */
export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(to_bottom,#bfe8f8_0%,#d3effb_60%,#ffffff_100%)] pb-16 pt-16 text-center sm:pt-24">
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

/* ---------- our story: stats + year timeline ---------- */
const NAV_H = 70;
const STEP_VH = 55; // how much scrolling each year takes (in screen heights)

export function Story() {
  const [active, setActive] = useState(0);
  const wrap = useRef(null);
  const n = timeline.length;

  // On large screens the timeline stays pinned while scrolling and the year advances.
  useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth < 1024 || !wrap.current) return;
      const r = wrap.current.getBoundingClientRect();
      const total = r.height - (window.innerHeight - NAV_H);
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, (NAV_H - r.top) / total));
      setActive(Math.min(n - 1, Math.floor(p * n)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [n]);

  const pick = (i) => {
    if (window.innerWidth >= 1024 && wrap.current) {
      // jump to the matching scroll position; the scroll handler then updates the year
      const rect = wrap.current.getBoundingClientRect();
      const total = rect.height - (window.innerHeight - NAV_H);
      const y = window.scrollY + rect.top - NAV_H + ((i + 0.5) / n) * total;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setActive(i);
  };

  return (
    <section id="story" className={`${sectionPad} pb-0 sm:pb-0`}>
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

        <hr className="mb-2 mt-12 border-line" />

        <div
          ref={wrap}
          className="lg:h-[var(--story-h)]"
          style={{ "--story-h": `calc(100vh - ${NAV_H}px + ${n * STEP_VH}vh)` }}
        >
          <div className="py-10 lg:sticky lg:top-[70px] lg:flex lg:h-[calc(100vh-70px)] lg:items-center lg:py-0">
            <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
              {/* big year */}
              <div className="text-center lg:text-left">
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
                        onClick={() => pick(i)}
                        aria-current={on}
                        className={`block w-full border-l-[3px] px-6 py-3.5 text-left transition-colors duration-300 ${
                          on
                            ? "border-brand bg-sky-soft"
                            : "border-line text-muted hover:border-aqua hover:text-navy"
                        }`}
                      >
                        <span className={`block font-bold ${on ? "text-brand" : ""}`}>
                          {t.year}
                        </span>
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
            </div>
          </div>
        </div>

        <p className="pb-14 text-center text-sm text-muted">
          Click a year, or just keep scrolling.
        </p>
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
              <article className={card}>
                <div
                  className="mb-[18px] grid size-12 animate-float place-items-center rounded-[14px] bg-sky-soft text-brand"
                  style={{ animationDelay: `${i * -1.3}s` }}
                >
                  <Icon name={v.icon} size={22} />
                </div>
                <h3 className="mb-2 text-[1.12rem] font-bold text-navy">{v.title}</h3>
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