import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  SiWordpress, SiShopify, SiWix, SiWebflow, SiSquarespace, SiWoocommerce, SiBigcommerce, SiFigma,
  SiAndroid, SiIos, SiFlutter, SiReact, SiSwift, SiKotlin,
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiNextdotjs, SiVuedotjs, SiAngular, SiNodedotjs,
  SiPhp, SiLaravel, SiPython, SiDjango, SiOpenjdk, SiDotnet, SiGo, SiRuby, SiMysql, SiMongodb, SiFirebase,
} from "react-icons/si";
import { projects, servicePages, servicesStats, servicesTestimonials } from "../data";
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
            {isQuote(service) ? "Custom Quote" : "View Packages"}
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
  if (service.caseStudies) return <CaseStudies service={service} />;
  return (
    <section className={`${sectionPad} bg-sky-faint`}>
      <div className={container}>
        <SectionHead eyebrow="Our Work" title={`Recent ${service.short}`} accent="Projects" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {service.portfolio.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to={PORTFOLIO_LINK} className={btn("ghost")}>
            View All Projects <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- inner page: client case studies (used instead of a portfolio, e.g. SEO and social media) ---------- */
// One case study at a time: picture on the left, white card on top of it with the story and 3 numbers.
// Click the arrow or the dots to change. No auto-sliding.
function CaseStudies({ service }) {
  const list = service.caseStudies;
  const [i, setI] = useState(0);
  const c = list[i];
  const next = () => setI((n) => (n + 1) % list.length);

  return (
    <section className={`${sectionPad} bg-white`}>
      <div className={container}>
        <SectionHead eyebrow="Results" title="Client" accent="Case Studies" />

        <Reveal>
          <div key={i} className="animate-fade-up">
            <div className="relative mx-auto max-w-[1080px] md:min-h-[420px]">
              {/* picture (put a real screenshot in `image` in data.js; until then a branded placeholder shows) */}
              <div className="relative h-[220px] overflow-hidden rounded-[14px] md:absolute md:left-0 md:top-0 md:h-[400px] md:w-[46%]">
                {c.image ? (
                  <img src={c.image} alt={`${c.client} project`} className="size-full object-cover" />
                ) : (
                  <div
                    aria-hidden="true"
                    className="grid size-full place-items-center bg-linear-to-br from-[#d6effa] via-[#8fd3ee] to-[#3aa7da]"
                  >
                    <img src="/logo.png" alt="" className="w-[72px] opacity-90" />
                  </div>
                )}
                <span className="absolute left-3.5 top-3.5 rounded-full bg-white px-3 py-[3px] text-[0.72rem] font-bold text-brand">
                  {c.tag}
                </span>
              </div>

              {/* white card over the picture */}
              <div className="relative mt-4 rounded-[14px] bg-sky-faint px-6 pb-16 pt-8 shadow-[0_10px_30px_rgba(7,48,90,0.06)] md:ml-[38%] md:mt-8 md:min-h-[340px] md:px-10 md:pb-12 md:pt-10">
                <h3 className="text-[1.15rem] font-bold text-navy">{c.client}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{c.quote}</p>

                <dl className="mt-9 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-4">
                  {c.metrics.map((m) => (
                    <div key={m.label} className="relative border border-line px-3 pb-5 pt-7 text-center">
                      <dd className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[58%] bg-sky-faint px-3 text-[1.9rem] font-light leading-none text-navy">
                        {m.value}
                      </dd>
                      <dt className="text-[0.9rem] leading-snug text-muted">{m.label}</dt>
                    </div>
                  ))}
                </dl>

                <button
                  type="button"
                  onClick={next}
                  aria-label="Next case study"
                  className="absolute bottom-4 right-4 grid size-12 place-items-center rounded-full text-brand transition hover:scale-110 hover:text-navy"
                >
                  <svg viewBox="0 0 48 48" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M8 34c-2-14 8-22 26-20" />
                    <path d="M28 6l8 8-8 8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-2.5" role="group" aria-label="Choose case study">
            {list.map((x, k) => (
              <button
                key={x.client + k}
                type="button"
                onClick={() => setI(k)}
                aria-label={`Show case study ${k + 1}: ${x.client}`}
                aria-current={k === i}
                className={`size-3 rounded-full transition ${k === i ? "bg-brand" : "bg-line hover:bg-brand/50"}`}
              />
            ))}
          </div>
        </Reveal>

        <p className="mx-auto mt-8 max-w-[640px] text-center text-[0.8rem] text-muted">
          Case studies are real but exemplary. Figures and details may differ from your project.
        </p>
      </div>
    </section>
  );
}

/* ---------- one project card (same look as the home page projects) ---------- */
function ProjectCard({ p, i }) {
  return (
    <Reveal from="zoom" delay={(i % 3) * 110} className="h-full">
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
  );
}

// Where the "View Full Portfolio" button goes. Change to "/portfolio" once that page exists.
const PORTFOLIO_LINK = "/#projects";
// How many projects to show on the Services page.
const PREVIEW_COUNT = 3;

/* ---------- main services page: a few projects + button to the full portfolio ---------- */
export function PortfolioPreview() {
  return (
    <section className={`${sectionPad} bg-sky-faint`}>
      <div className={container}>
        <SectionHead
          eyebrow="Our Work"
          title="Featured"
          accent="Projects"
          text="A small selection of the websites, apps and campaigns we have delivered."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, PREVIEW_COUNT).map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to={PORTFOLIO_LINK} className={btn("primary", true)}>
            View Full Portfolio <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- "We specialize in": platforms and languages, two strips scrolling by themselves ---------- */
// To add or remove something, just edit these two lists: [name, icon].
// Row 1: website platforms and mobile apps.
const platforms = [
  ["WordPress", SiWordpress],
  ["Shopify", SiShopify],
  ["Wix", SiWix],
  ["Webflow", SiWebflow],
  ["Squarespace", SiSquarespace],
  ["WooCommerce", SiWoocommerce],
  ["BigCommerce", SiBigcommerce],
  ["Figma", SiFigma],
  ["Android", SiAndroid],
  ["iOS", SiIos],
  ["Flutter", SiFlutter],
  ["React Native", SiReact],
  ["Swift", SiSwift],
  ["Kotlin", SiKotlin],
];
// Row 2: languages and frameworks.
const languages = [
  ["HTML5", SiHtml5],
  ["CSS", SiCss],
  ["JavaScript", SiJavascript],
  ["TypeScript", SiTypescript],
  ["React", SiReact],
  ["Next.js", SiNextdotjs],
  ["Vue.js", SiVuedotjs],
  ["Angular", SiAngular],
  ["Node.js", SiNodedotjs],
  ["PHP", SiPhp],
  ["Laravel", SiLaravel],
  ["Python", SiPython],
  ["Django", SiDjango],
  ["Java", SiOpenjdk],
  [".NET", SiDotnet],
  ["Go", SiGo],
  ["Ruby", SiRuby],
  ["MySQL", SiMysql],
  ["MongoDB", SiMongodb],
  ["Firebase", SiFirebase],
];

function TechPill({ name, Logo }) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-line bg-sky-faint px-5 py-3.5 text-navy transition-colors duration-300 hover:border-brand hover:bg-white">
      <Logo className="size-6 text-brand" aria-hidden="true" />
      <span className="text-[0.92rem] font-semibold">{name}</span>
    </div>
  );
}

export function TechStack() {
  return (
    <section className="border-y border-line bg-white py-12">
      <div className="mb-8 px-6 text-center">
        <span className="mb-2.5 inline-block text-xs font-bold uppercase tracking-[0.16em] text-brand">
          We specialize in
        </span>
        <h2 className="text-[length:clamp(1.5rem,3vw,2.1rem)] font-bold leading-tight tracking-tight text-navy">
          Websites, Mobile Apps and <span className={gradText}>Every Major Language</span>
        </h2>
      </div>
      <div className="grid gap-4">
        <Marquee duration={50} repeat={2} gap="gap-4">
          {platforms.map(([name, Logo]) => (
            <TechPill key={name} name={name} Logo={Logo} />
          ))}
        </Marquee>
        <Marquee reverse duration={60} repeat={2} gap="gap-4">
          {languages.map(([name, Logo]) => (
            <TechPill key={name} name={name} Logo={Logo} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

// How many testimonials to show on the Services page.
const TESTIMONIAL_COUNT = 6;

function TestimonialCard({ t }) {
  return (
    <figure className={card}>
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

/* ---------- "What our clients say": a simple grid of cards ---------- */
export function TestimonialsGrid() {
  return (
    <section className={`${sectionPad} bg-sky-faint`}>
      <div className={container}>
        <SectionHead
          eyebrow="Testimonials"
          title="What Our Clients"
          accent="Say"
          text="Hear from the teams who turned their ideas into reality with us."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesTestimonials.slice(0, TESTIMONIAL_COUNT).map((t, i) => (
            <Reveal key={i} delay={(i % 3) * 120} className="h-full">
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- inner page: pricing packages (slider) ---------- */
// Services without fixed packages (Mobile App) show a "Custom Quote" block instead of pricing.
const isQuote = (service) => service.customQuote || service.slug === "app" || !service.packages?.length;
const money = (v) => parseFloat(String(v ?? "").replace(/[^0-9.]/g, "")) || 0;
// Show this many features, the rest open with "More features".
const FEATURES_SHOWN = 6;

// Every card has the same size. The feature list scrolls inside a fixed-height box.
const FEATURES_VISIBLE = 7;

function PackageCard({ p }) {
  const save = money(p.was) - money(p.price);
  const scrolls = p.features.length > FEATURES_VISIBLE;
  return (
    <article className="flex h-full w-full flex-col overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_10px_30px_rgba(7,48,90,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(7,48,90,0.14)]">
      <header className={`${gradBg} flex h-[150px] shrink-0 flex-col items-center justify-center px-6 text-center text-white`}>
        <h3 className="text-[1.15rem] font-bold">{p.name}</h3>
        <p className="mt-2 flex items-baseline justify-center gap-2">
          <strong className="text-[2rem] font-extrabold leading-none">{p.price}</strong>
          {p.period && <span className="text-[0.85rem] font-medium text-white/80">{p.period}</span>}
          {p.was && <s className="text-[0.95rem] text-white/60">{p.was}</s>}
        </p>
        {save > 0 && (
          <p className="mt-2 inline-block rounded-full bg-white/20 px-3 py-0.5 text-[0.75rem] font-bold tracking-wide">
            YOU SAVE ${Math.round(save).toLocaleString()}
          </p>
        )}
      </header>

      <div className="relative">
        <ul
          tabIndex={scrolls ? 0 : undefined}
          aria-label={`${p.name} features`}
          className="h-[340px] overflow-y-auto px-6 py-3 [scrollbar-color:#07305a_#dff1fa] [scrollbar-width:thin]"
        >
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
      </div>

      <div className="mt-auto border-t border-line bg-sky-faint p-5 text-center">
        <p className="mb-3 h-4 text-[0.72rem] font-bold uppercase tracking-wider text-muted">
          {p.was ? "Final price for limited time" : ""}
        </p>
        <Link to="/#contact" className={`${btn("primary")} w-full`}>
          Order Now <Icon name="arrow" size={16} />
        </Link>
      </div>
    </article>
  );
}

/* ---------- inner page: "Custom Quote" block (replaces pricing when a service has no fixed packages) ---------- */
function CustomQuote({ service }) {
  return (
    <section id="packages" className={sectionPad}>
      <div className={container}>
        <Reveal>
          <div className={`${gradBg} mx-auto max-w-[860px] rounded-[24px] px-6 py-12 text-center text-white shadow-[0_18px_45px_rgba(7,48,90,0.18)] sm:px-12`}>
            <p className="mb-3 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-white/80">Pricing</p>
            <h2 className="text-[length:clamp(1.7rem,3.4vw,2.5rem)] font-extrabold leading-tight">
              Every {service.short} Project Is Different
            </h2>
            <p className="mx-auto mt-4 max-w-[560px] text-white/85">
              Tell us what you want to build and we will send a clear, fixed quote made for your idea, scope and timeline. No obligation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3.5">
              <Link to="/#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-navy transition hover:-translate-y-0.5 hover:shadow-lg">
                Get a Custom Quote <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Packages({ service }) {
  if (isQuote(service)) return <CustomQuote service={service} />;
  return <PackagesSlider service={service} />;
}

function PackagesSlider({ service }) {
  const track = useRef(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  const measure = () => {
    const el = track.current;
    if (!el) return;
    const total = Math.max(1, Math.round(el.scrollWidth / el.clientWidth));
    setPages(total);
    const max = el.scrollWidth - el.clientWidth;
    setPage(max <= 0 ? 0 : Math.min(total - 1, Math.round((el.scrollLeft / max) * (total - 1))));
  };

  useEffect(() => {
    measure();
    const el = track.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [service.packages.length]);

  const go = (dir) => {
    const el = track.current;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };
  const goTo = (i) => {
    const el = track.current;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: pages > 1 ? (max / (pages - 1)) * i : 0, behavior: "smooth" });
  };

  const arrow =
    "grid size-11 place-items-center rounded-full border border-line bg-white text-brand shadow-[0_6px_18px_rgba(7,48,90,0.12)] transition hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-40";

  return (
    <section id="packages" className={sectionPad}>
      <div className={container}>
        <SectionHead
          eyebrow="Pricing"
          title="Affordable Packages For"
          accent="Every Business"
          text={`Clear ${service.short.toLowerCase()} packages with upfront pricing, so you know what you are paying for before we start.`}
        />

        <Reveal>
          <div
            ref={track}
            onScroll={measure}
            role="region"
            aria-label={`${service.short} packages`}
            tabIndex={0}
            className="-my-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {service.packages.map((p) => (
              <div
                key={p.name}
                className="flex w-full shrink-0 snap-start md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              >
                <PackageCard p={p} />
              </div>
            ))}
          </div>

          {pages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-5">
              <button type="button" aria-label="Previous packages" onClick={() => go(-1)} disabled={page === 0} className={arrow}>
                <span className="rotate-180"><Icon name="arrow" size={18} /></span>
              </button>
              <div className="flex gap-2">
                {Array.from({ length: pages }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to packages page ${i + 1}`}
                    aria-current={i === page}
                    onClick={() => goTo(i)}
                    className={`h-2.5 rounded-full transition-all ${i === page ? "w-7 bg-brand" : "w-2.5 bg-line hover:bg-brand/50"}`}
                  />
                ))}
              </div>
              <button type="button" aria-label="Next packages" onClick={() => go(1)} disabled={page === pages - 1} className={arrow}>
                <Icon name="arrow" size={18} />
              </button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}