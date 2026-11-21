import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projectFilters, projects, testimonials } from "../data";
import { container, card, gradBg, sectionPad } from "../ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { SectionHead } from "./Sections";

// How long each testimonial stays on screen before the next one slides in (milliseconds).
const SLIDE_MS = 2000;

export function Projects() {
  const [active, setActive] = useState("All");
  const visible = projects.filter((p) => active === "All" || p.category === active);

  return (
    <section id="projects" className={`${sectionPad} bg-sky-faint`}>
      <div className={container}>
        <div className="relative">
          <SectionHead eyebrow="Our Work" title="Featured" accent="Projects" />
       <Link
  to="/portfolio"
  className="-mt-6 mb-6 flex items-center justify-center gap-1.5 text-sm font-bold text-brand hover:text-navy md:absolute md:right-0 md:top-2 md:m-0"
>
  View All Projects <Icon name="arrow" size={16} />
</Link>
        </div>

        <Reveal
          className="mb-8 flex flex-wrap justify-center gap-2.5"
          role="tablist"
          aria-label="Project categories"
        >
          {projectFilters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={active === f}
              onClick={() => setActive(f)}
              className={`rounded-full border px-5 py-2 text-[0.88rem] font-semibold transition ${
                active === f
                  ? `${gradBg} border-transparent text-white`
                  : "border-line bg-white text-muted hover:border-brand hover:text-brand"
              }`}
            >
              {f}
            </button>
          ))}
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <Reveal key={p.title} from="zoom" delay={(i % 3) * 110} className="h-full">
              <article className="h-full overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_10px_30px_rgba(7,48,90,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(7,48,90,0.14)]">
                <div
                  aria-hidden="true"
                  className="relative grid h-[190px] place-items-center bg-linear-to-br from-[#d6effa] via-[#8fd3ee] to-[#3aa7da]"
                >
                  <img src="/logo.png" alt="" className="w-[70px] animate-float opacity-90" />
                  <span className="absolute left-3.5 top-3.5 rounded-full bg-white px-3 py-[3px] text-[0.72rem] font-bold text-brand">
                    {p.category}
                  </span>
                </div>
                <div className="px-[22px] pb-6 pt-5">
                  <h3 className="mb-1.5 text-[1.05rem] font-bold text-navy">{p.title}</h3>
                  <p className="text-[0.9rem] text-muted">{p.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- testimonials: one review at a time, changes by itself every SLIDE_MS ---------- */
// Pauses while the mouse is over it (or a dot has keyboard focus). The dots below let people jump to a review.
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // runs again after every change, so clicking a dot also restarts the 2 second wait
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), SLIDE_MS);
    return () => clearTimeout(id);
  }, [index, paused, count]);

  return (
    <section className={sectionPad}>
      <div className={container}>
        <SectionHead
          eyebrow="Testimonials"
          title="What Our Clients"
          accent="Say"
          text="Real feedback from the teams we have worked with will appear here."
        />

        <Reveal>
          <div
            className="mx-auto max-w-[760px]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className="overflow-hidden px-1 py-5">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {testimonials.map((t, i) => (
                  <div key={i} className="w-full shrink-0 px-2" aria-hidden={i !== index}>
                    <figure className={`${card} flex flex-col`}>
                      <div className="mb-3.5 flex gap-[3px] text-[#f5b301] [&_svg]:fill-current" aria-hidden="true">
                        {[...Array(5)].map((_, k) => (
                          <Icon key={k} name="star" size={16} />
                        ))}
                      </div>
                      <blockquote className="mb-[22px] text-[0.98rem] text-ink">{t.quote}</blockquote>
                      <figcaption className="mt-auto flex items-center gap-3">
                        <span className={`${gradBg} grid size-[42px] place-items-center rounded-full font-bold text-white`}>
                          {t.name.charAt(0)}
                        </span>
                        <span>
                          <strong className="block text-[0.92rem] text-navy">{t.name}</strong>
                          <small className="text-[0.8rem] text-muted">{t.role}</small>
                        </span>
                      </figcaption>
                    </figure>
                  </div>
                ))}
              </div>
            </div>

            {count > 1 && (
              <div className="mt-4 flex justify-center gap-2.5" role="group" aria-label="Choose testimonial">
                {testimonials.map((t, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show testimonial ${i + 1}`}
                    aria-current={i === index}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      i === index ? "w-7 bg-brand" : "w-3 bg-line hover:bg-brand/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
