import { useState } from "react";
import { projectFilters, projects, testimonials } from "../data";
import { container, card, gradBg, sectionPad } from "../ui";
import Icon from "./Icon";
import { SectionHead } from "./Sections";

export function Projects() {
  const [active, setActive] = useState("All");
  const visible = projects.filter((p) => active === "All" || p.category === active);

  return (
    <section id="projects" className={`${sectionPad} bg-sky-faint`}>
      <div className={container}>
        <div className="relative">
          <SectionHead eyebrow="Our Work" title="Featured" accent="Projects" />
          <a
            href="#contact"
            className="-mt-6 mb-6 flex items-center justify-center gap-1.5 text-sm font-bold text-brand hover:text-navy md:absolute md:right-0 md:top-2 md:m-0"
          >
            View All Projects <Icon name="arrow" size={16} />
          </a>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2.5" role="tablist" aria-label="Project categories">
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
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <article
              key={p.title}
              className="overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_10px_30px_rgba(7,48,90,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(7,48,90,0.14)]"
            >
              <div
                aria-hidden="true"
                className="relative grid h-[190px] place-items-center bg-linear-to-br from-[#d6effa] via-[#8fd3ee] to-[#3aa7da]"
              >
                <img src="/logo.png" alt="" className="w-[70px] opacity-90" />
                <span className="absolute left-3.5 top-3.5 rounded-full bg-white px-3 py-[3px] text-[0.72rem] font-bold text-brand">
                  {p.category}
                </span>
              </div>
              <div className="px-[22px] pb-6 pt-5">
                <h3 className="mb-1.5 text-[1.05rem] font-bold text-navy">{p.title}</h3>
                <p className="text-[0.9rem] text-muted">{p.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className={sectionPad}>
      <div className={container}>
        <SectionHead
          eyebrow="Testimonials"
          title="What Our Clients"
          accent="Say"
          text="Real feedback from the teams we have worked with will appear here."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure key={i} className={card}>
              <div className="mb-3.5 flex gap-[3px] text-[#f5b301] [&_svg]:fill-current" aria-hidden="true">
                {[...Array(5)].map((_, k) => (
                  <Icon key={k} name="star" size={16} />
                ))}
              </div>
              <blockquote className="mb-[22px] text-[0.98rem] text-ink">{t.quote}</blockquote>
              <figcaption className="flex items-center gap-3">
                <span className={`${gradBg} grid size-[42px] place-items-center rounded-full font-bold text-white`}>
                  {t.name.charAt(0)}
                </span>
                <span>
                  <strong className="block text-[0.92rem] text-navy">{t.name}</strong>
                  <small className="text-[0.8rem] text-muted">{t.role}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}