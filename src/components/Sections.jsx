import { services, stats, reasons, steps } from "../data";
import { container, card, gradBg, gradText, sectionPad } from "../ui";
import Icon from "./Icon";

export function SectionHead({ eyebrow, title, accent, text }) {
  return (
    <div className="mx-auto mb-12 max-w-[640px] text-center">
      <span className="mb-2.5 inline-block text-xs font-bold uppercase tracking-[0.16em] text-brand">
        {eyebrow}
      </span>
      <h2 className="text-[length:clamp(1.8rem,3.6vw,2.5rem)] font-bold leading-tight tracking-tight text-navy">
        {title} {accent && <span className={gradText}>{accent}</span>}
      </h2>
      {text && <p className="mt-3 text-muted">{text}</p>}
    </div>
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
          {services.map((s) => (
            <article key={s.title} className={card}>
              <div className="mb-[18px] grid size-[52px] place-items-center rounded-[14px] bg-sky-soft text-brand">
                <Icon name={s.icon} />
              </div>
              <h3 className="mb-2 text-[1.15rem] font-bold text-navy">{s.title}</h3>
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
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-navy"
              >
                Learn More <Icon name="arrow" size={16} />
              </a>
            </article>
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
          {stats.map((s) => (
            <li key={s.label}>
              <strong className="block text-[2.4rem] font-extrabold leading-tight text-white">
                {s.value}
              </strong>
              <span className="text-[0.85rem] text-[#d3f1fb]">{s.label}</span>
            </li>
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
          eyebrow="Why Choose Us"
          title="Why"
          accent="Envol Solutions?"
          text="We are not just another agency. Here is what sets us apart."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <article key={r.title} className={card}>
              <div className="mb-[18px] grid size-11 place-items-center rounded-xl bg-sky-soft text-brand">
                <Icon name={r.icon} size={20} />
              </div>
              <h3 className="mb-2 text-[1.15rem] font-bold text-navy">{r.title}</h3>
              <p className="text-[0.95rem] text-muted">{r.text}</p>
            </article>
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
          eyebrow="Our Process"
          title="How It"
          accent="Works"
          text="A simple 4-step process that turns your idea into a product that earns."
        />
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-9 hidden h-0.5 bg-linear-to-r from-line via-aqua to-line lg:block"
          />
          <ol className="relative grid gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => (
              <li key={s.title} className="text-center">
                <div className="relative z-10 mx-auto mb-[18px] grid size-[72px] place-items-center rounded-full border-2 border-aqua bg-white text-brand shadow-[0_10px_30px_rgba(7,48,90,0.08)]">
                  <Icon name={s.icon} size={26} />
                  <span className="absolute -right-1.5 -top-1.5 grid size-[26px] place-items-center rounded-full bg-navy text-[0.7rem] font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mb-1.5 text-[1.15rem] font-bold text-navy">{s.title}</h3>
                <p className="text-[0.92rem] text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}