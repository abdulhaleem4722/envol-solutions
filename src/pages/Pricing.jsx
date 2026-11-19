import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { servicePages } from "../data";
import { container, btn, gradBg, gradText, sectionPad } from "../ui";
import Icon from "../components/Icon";
import { PackageGrid, TestimonialsGrid } from "../components/ServicesPage";
import { Cta } from "../components/Contact";

// One tab per service. /pricing#web, /pricing#marketing ... open that tab directly.
export default function Pricing() {
  const { hash } = useLocation();
  const first = servicePages.find((s) => `#${s.slug}` === hash)?.slug ?? servicePages[0].slug;
  const [active, setActive] = useState(first);
  const service = servicePages.find((s) => s.slug === active);

  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden bg-linear-to-b from-[#bfe8f8] via-[#d3effb] to-white pb-14 pt-[140px] text-center">
        <div className={container}>
          <p className="mb-3 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand">Pricing</p>
          <h1 className="mx-auto max-w-[820px] text-[length:clamp(2.1rem,5vw,3.6rem)] font-extrabold leading-[1.1] text-navy">
            Exclusive Packages Made For <span className={gradText}>Your Business</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[580px] text-[1.05rem] text-muted">
            Clear prices for every service, so you know exactly what you are paying for before we start.
          </p>
          <div className="mt-8">
            <Link to="/contact" className={btn("primary", true)}>
              Start Your Project <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* packages by service */}
      <section className={`${sectionPad} pt-6`}>
        <div className={container}>
          <div className="mx-auto mb-8 max-w-[700px] text-center">
            <h2 className="text-[length:clamp(1.7rem,3.6vw,2.6rem)] font-extrabold leading-tight text-navy">
              Affordable Packages <span className={gradText}>By Service</span>
            </h2>
            <p className="mt-3 text-muted">
              High quality design, development and marketing packages by experts, for businesses of every size.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Choose a service"
            className="mb-10 flex gap-2.5 overflow-x-auto pb-2 [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-visible [&::-webkit-scrollbar]:hidden"
          >
            {servicePages.map((s) => {
              const on = s.slug === active;
              return (
                <button
                  key={s.slug}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(s.slug)}
                  className={`shrink-0 rounded-full border px-5 py-2.5 text-[0.9rem] font-bold transition ${
                    on
                      ? `${gradBg} border-transparent text-white shadow-[0_8px_20px_rgba(10,111,174,0.28)]`
                      : "border-line bg-white text-navy hover:border-brand hover:text-brand"
                  }`}
                >
                  {s.short}
                </button>
              );
            })}
          </div>

          <h3 className="mb-8 text-center text-[1.3rem] font-bold text-navy">{service.title}</h3>

          <div key={active} role="tabpanel">
            <PackageGrid service={service} />
          </div>
        </div>
      </section>

      <TestimonialsGrid />
      <Cta />
    </>
  );
}