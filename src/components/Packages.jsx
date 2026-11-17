import { Link } from "react-router-dom";
import { container, btn, gradBg, sectionPad } from "../ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { SectionHead } from "./Sections";

/* ---------- pricing packages for one service ---------- */
export default function Packages({ service }) {
  return (
    <section id="packages" className={sectionPad}>
      <div className={container}>
        <SectionHead
          eyebrow="Pricing"
          title="Affordable Packages For"
          accent="Every Business"
          text={`Clear ${service.short.toLowerCase()} packages with upfront pricing, so you know what you are paying for before we start.`}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {service.packages.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 110} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_10px_30px_rgba(7,48,90,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(7,48,90,0.14)]">
                <header className={`${gradBg} flex items-center justify-between gap-3 px-6 py-4 text-white`}>
                  <h3 className="text-[1.1rem] font-bold">{p.name}</h3>
                  <p className="flex items-baseline gap-2">
                    <strong className="text-[1.5rem] font-extrabold leading-none">{p.price}</strong>
                    {p.was && <s className="text-[0.85rem] text-white/60">{p.was}</s>}
                  </p>
                </header>

                <ul className="flex-1 px-6 py-3">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 border-b border-line py-2.5 text-[0.93rem] text-ink last:border-b-0"
                    >
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-sky-soft text-brand">
                        <Icon name="check" size={12} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-line bg-sky-faint p-5">
                  <Link to="/#contact" className={`${btn("primary")} w-full`}>
                    Order Now <Icon name="arrow" size={16} />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}