import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { FiTarget, FiGlobe } from "react-icons/fi";
import { SiBehance, SiDribbble, SiYelp } from "react-icons/si";
import { faqs, servicePages, servicesOffices, servicesStats, servicesTestimonials, trustedBrands } from "../data";
import { container, card, btn, gradBg, gradText, sectionPad } from "../ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { SectionHead } from "./Sections";

/* =====================================================================
   ServicesPage.jsx: everything for the Services pages lives in this file.
     1. Marquee             (endless side-scrolling strip, used twice below)
     2. Main /services page (hero, trusted-by strip, services rows, testimonials)
     3. Inner service pages (hero, offerings, portfolio, packages)
   The pages in src/pages/ only put these sections together.
   ===================================================================== */

/* ---------- 1. Marquee ---------- */
// Endless side-scrolling strip. Pauses when the mouse is over it.
//   reverse  = scroll the other way (use it for the second row)
//   duration = seconds for one full loop (bigger = slower)
//   repeat   = how many times the items are repeated per half, so the strip is always wider than the screen
function Marquee({ children, reverse = false, duration = 40, repeat = 1, gap = "gap-6", className = "" }) {
  const half = (hidden) => (
    <div aria-hidden={hidden || undefined} className={`flex shrink-0 items-stretch pr-6 ${gap}`}>
      {Array.from({ length: repeat }, (_, i) => (
        <Fragment key={i}>{children}</Fragment>
      ))}
    </div>
  );

  return (
    <div
      className={`group overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] ${className}`}
    >
      <div
        className={`flex w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"} group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${duration}s` }}
      >
        {half(false)}
        {half(true)}
      </div>
    </div>
  );
}

/* ---------- 2/3. Page sections ---------- */
/* ---------- shared banner background (same look as AboutHero) ---------- */
function Backdrop() {
  return (
    <>
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
    </>
  );
}

const heroBg =
  "relative overflow-hidden bg-[linear-gradient(to_bottom,#bfe8f8_0%,#d3effb_60%,#ffffff_100%)] pb-16 pt-[134px] text-center sm:pt-[166px]";

/* ---------- main services page: top banner ---------- */
export function ServicesHero() {
  return (
    <section className={heroBg}>
      <Backdrop />
      <div className="relative mx-auto max-w-[880px] px-6">
        <span className="mb-6 inline-block animate-fade-up rounded-full border border-line bg-white px-4 py-1.5 text-[0.82rem] font-semibold text-brand">
          Our Services
        </span>
        <h1 className="animate-fade-up text-[length:clamp(2.4rem,5vw,4.4rem)] font-extrabold leading-[1.1] tracking-tight text-navy [animation-delay:120ms]">
          Services That <br className="hidden sm:block" />
          <span className={gradText}>Drive Growth</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[680px] animate-fade-up text-[1.1rem] text-muted [animation-delay:240ms]">
          End-to-end digital solutions for businesses that are ready to scale.
          Pick a service to see what is included, the work we have done and the
          packages we offer.
        </p>
      </div>
    </section>
  );
}

/* ---------- main services page: the four services, two per row ---------- */
export function ServicesOverview() {
  return (
    <section id="services" className={sectionPad}>
      <div className={container}>
        <SectionHead
          eyebrow="What We Do"
          title="Everything You Need To"
          accent="Grow Online"
          text="End-to-end digital solutions for businesses that are ready to scale."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {servicePages.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 120} className="h-full">
              <article className={card}>
                <div className="mb-[18px] grid size-[52px] place-items-center rounded-[14px] bg-sky-soft text-brand">
                  <Icon name={s.icon} />
                </div>
                <h3 className="mb-2 text-[1.15rem] font-bold text-navy">{s.title}</h3>
                <p className="text-[0.95rem] text-muted">{s.text}</p>
                <ul className="my-[18px] flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li key={t} className="rounded-full bg-sky-soft px-3 py-1 text-[0.78rem] font-semibold text-navy">
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

/* ---------- main services page: numbers strip ---------- */
export function ServicesStats() {
  return (
    <section className={`${gradBg} py-14`}>
      <div className={container}>
        <ul className="grid grid-cols-2 gap-5 text-center md:grid-cols-4">
          {servicesStats.map((s, i) => (
            <Reveal as="li" key={s.label} from="zoom" delay={i * 110}>
              <strong className="block text-[2.4rem] font-extrabold leading-tight text-white">{s.value}</strong>
              <span className="text-[0.85rem] text-[#d3f1fb]">{s.label}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- inner page: top banner ---------- */
export function ServiceHero({ service }) {
  return (
    <section className={heroBg}>
      <Backdrop />
      <div className="relative mx-auto max-w-[880px] px-6">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex animate-fade-up flex-wrap items-center justify-center gap-2 text-[0.85rem] text-muted"
        >
          <Link to="/" className="hover:text-brand">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/services" className="hover:text-brand">Services</Link>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-brand">{service.title}</span>
        </nav>

        <h1 className="animate-fade-up text-[length:clamp(2.4rem,5vw,4.4rem)] font-extrabold leading-[1.1] tracking-tight text-navy [animation-delay:120ms]">
          {service.hero.title} <br className="hidden sm:block" />
          <span className={gradText}>{service.hero.accent}</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[680px] animate-fade-up text-[1.1rem] text-muted [animation-delay:240ms]">
          {service.intro}
        </p>

        <ul className="mt-6 flex animate-fade-up flex-wrap justify-center gap-2 [animation-delay:300ms]">
          {service.tags.map((t) => (
            <li key={t} className="rounded-full border border-line bg-white px-3 py-1 text-[0.78rem] font-semibold text-navy">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex animate-fade-up flex-wrap justify-center gap-3.5 [animation-delay:360ms]">
          <Link to="/#contact" className={btn("primary", true)}>
            Get a Free Quote
          </Link>
          <a href="#packages" className={btn("ghost", true)}>
            View Packages
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- inner page: what is included ---------- */
export function Offerings({ service }) {
  return (
    <section className={sectionPad}>
      <div className={container}>
        <SectionHead
          eyebrow="What You Get"
          title={`What's Included in Our ${service.short}`}
          accent="Service"
          text={service.text}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {service.offerings.map((o, i) => (
            <Reveal key={o.title} delay={(i % 3) * 110} className="h-full">
              <article className={card}>
                <div className="mb-[18px] grid size-12 place-items-center rounded-[14px] bg-sky-soft text-brand">
                  <Icon name={o.icon} size={22} />
                </div>
                <h3 className="mb-2 text-[1.12rem] font-bold text-navy">{o.title}</h3>
                <p className="text-[0.93rem] text-muted">{o.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- inner page: small portfolio for this service ---------- */
export function ServicePortfolio({ service }) {
  return (
    <section className={`${sectionPad} bg-sky-faint`}>
      <div className={container}>
        <SectionHead eyebrow="Our Work" title={`Recent ${service.short}`} accent="Projects" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {service.portfolio.map((p, i) => (
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
        <div className="mt-10 text-center">
          <Link to="/#projects" className={btn("ghost")}>
            View All Projects <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

// brand name (from data.js) -> icon
const brandIcons = {
  Clutch: FiTarget,
  Bark: FiGlobe,
  Behance: SiBehance,
  Dribbble: SiDribbble,
  Yelp: SiYelp,
};

/* ---------- "Trusted by" logo strip, scrolls by itself ---------- */
export function TrustedBy() {
  return (
    <section className="border-y border-line bg-white py-10">
      <p className="mb-7 px-6 text-center text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-muted">
        Trusted by innovative brands worldwide
      </p>
      <Marquee duration={30} repeat={2}>
        {trustedBrands.map((name) => {
          const Logo = brandIcons[name] ?? FiGlobe;
          return (
            <div
              key={name}
              className="grid h-[100px] w-[150px] shrink-0 place-items-center rounded-2xl border border-line bg-sky-faint text-navy"
            >
              <div className="grid place-items-center gap-2 text-center">
                <Logo className="size-7 text-brand" aria-hidden="true" />
                <span className="text-[0.82rem] font-semibold text-muted">{name}</span>
              </div>
            </div>
          );
        })}
      </Marquee>
    </section>
  );
}

function TestimonialCard({ t }) {
  return (
    <figure className={`${card} w-[320px] shrink-0 sm:w-[380px]`}>
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
  );
}

/* ---------- "What our clients say": two rows scrolling in opposite directions ---------- */
export function TestimonialsMarquee() {
  const rowOne = servicesTestimonials.slice(0, 4);
  const rowTwo = servicesTestimonials.slice(4);
  return (
    <section className={`${sectionPad} bg-sky-faint`}>
      <div className={container}>
        <SectionHead
          eyebrow="Testimonials"
          title="What Our Clients"
          accent="Say"
          text="Hear from the teams who turned their ideas into reality with us."
        />
      </div>
      <Reveal className="grid gap-6">
        <Marquee duration={60} repeat={2}>
          {rowOne.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </Marquee>
        <Marquee reverse duration={60} repeat={2}>
          {rowTwo.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}

/* ---------- main services page: offices ---------- */
export function Offices() {
  return (
    <section className={sectionPad}>
      <div className={container}>
        <SectionHead
          eyebrow="Our Offices"
          title="2 Offices,"
          accent="One Global Team"
          text="We work across time zones so your project never sleeps."
        />
        <div className="mx-auto grid max-w-[820px] gap-6 sm:grid-cols-2">
          {servicesOffices.map((o, i) => (
            <Reveal key={o.code} delay={i * 120} className="h-full">
              <article className={`${card} text-center`}>
                <p className={`${gradText} text-[2.2rem] font-extrabold leading-none`}>{o.code}</p>
                <h3 className="mt-3 text-[1.15rem] font-bold text-navy">{o.city}</h3>
                <p className="mb-5 text-[0.9rem] text-muted">{o.country}</p>
                <ul className="grid gap-2.5 text-[0.9rem] text-ink">
                  {[
                    ["pin", o.address],
                    ["call", o.phone],
                    ["clock", o.hours],
                  ].map(([icon, text]) => (
                    <li key={icon} className="flex items-start justify-center gap-2.5">
                      <span className="mt-0.5 shrink-0 text-brand">
                        <Icon name={icon} size={16} />
                      </span>
                      {text}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- main services page: FAQ accordion (one answer open at a time) ---------- */
export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className={`${sectionPad} bg-sky-faint`}>
      <div className={container}>
        <SectionHead eyebrow="FAQ" title="Frequently Asked" accent="Questions" />
        <div className="mx-auto grid max-w-[820px] gap-3.5">
          {faqs.map((f, i) => {
            const on = i === open;
            return (
              <Reveal key={f.q} delay={i * 70}>
                <div
                  className={`rounded-2xl border bg-white transition-colors duration-300 ${
                    on ? "border-brand shadow-[0_10px_30px_rgba(7,48,90,0.08)]" : "border-line"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      id={`faq-button-${i}`}
                      aria-expanded={on}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpen(on ? -1 : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-navy"
                    >
                      {f.q}
                      <span className={`shrink-0 text-brand transition-transform duration-300 ${on ? "rotate-180" : ""}`}>
                        <Icon name="chevron" size={18} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    className={`grid transition-[grid-template-rows] duration-300 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-[0.95rem] text-muted">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- inner page: pricing packages ---------- */
export function Packages({ service }) {
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
                    {p.period && <span className="text-[0.85rem] font-medium text-white/80">{p.period}</span>}
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