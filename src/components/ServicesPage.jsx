import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  SiWordpress, SiShopify, SiWix, SiWebflow, SiSquarespace, SiWoocommerce, SiBigcommerce, SiFigma,
  SiAndroid, SiIos, SiFlutter, SiReact, SiSwift, SiKotlin,
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiNextdotjs, SiVuedotjs, SiAngular, SiNodedotjs,
  SiPhp, SiLaravel, SiPython, SiDjango, SiOpenjdk, SiDotnet, SiGo, SiRuby, SiMysql, SiMongodb, SiFirebase,
} from "react-icons/si";
import { projects, servicePages, servicesStats, servicesTestimonials, portfolioCategories } from "../data";
import { container, card, cardFx, iconFx, iconPop, btn, gradBg, gradText, sectionPad } from "../ui";
import Icon from "./Icon";
import Reveal from "./Reveal";
import FeaturedCard, { featured } from "./FeaturedCard";
import { SectionHead } from "./Sections";
import AiProjects from "./AiProjects";

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
          Digital Solutions Built Around <br className="hidden sm:block" />
          <span className={gradText}>Your Business Goals.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[680px] animate-fade-up text-[1.1rem] text-muted [animation-delay:240ms]">
          From websites and mobile applications to digital marketing, branding, and AI automation, we bring the right expertise together to help your business attract customers, operate smarter, and grow.
        </p>
      </div>
    </section>
  );
}

/* ---------- main services page: the four services, two per row ---------- */
// Services overview: one wide card per service, picture side alternates left / right.
// To use your own picture, save it in /public/services/ and write its path here (e.g. "/services/web.png").
// Without a picture a clean placeholder is shown.
const overviewExtras = {
  web: {
    cta: "Explore Web Solutions",
   image: "/services/web.png",
    text: "We build professional, responsive websites that strengthen your online presence, showcase your business, and turn visitors into potential customers.",
    offers: ["Custom Website Development", "E-Commerce Solutions", "Landing Page Design", "CMS Integration"],
  },
  app: {
    cta: "Explore Mobile Solutions",
    image: "/services/app.jpg",
    text: "We develop intuitive mobile applications that make it easier for customers to interact with your business, access your services, and stay connected on the go.",
    offers: ["iOS App Development", "Android App Development", "Cross-Platform Apps", "UI/UX Design"],
  },
  marketing: {
    cta: "Grow Your Online Presence",
    image: "/services/marketing.jpg",
    text: "We help your business reach the right audience through strategic marketing, search optimization, and targeted campaigns that increase visibility and generate qualified leads.",
    offers: ["Search Engine Optimization", "PPC Advertising", "Social Media Marketing", "Content Strategy"],
  },
  branding: {
    cta: "Build Your Brand",
    image: "/services/branding.jpg",
    text: "We create distinctive brand identities and compelling visuals that communicate your business values, build recognition, and help you stand out in a competitive market.",
    offers: ["Logo Design", "Brand Identity Development", "Marketing & Print Design", "Brand Style Guides"],
  },
  ai: {
    cta: "Automate Your Business",
    image: "/services/ai.jpg",
    text: "We help businesses work smarter by automating repetitive tasks, connecting intelligent tools, and streamlining workflows so your team can focus on what matters most.",
    offers: ["AI Chatbots & Assistants", "Workflow Automation", "AI-Powered Integrations", "Business Process Automation"],
  },
  hosting: {
    cta: "Explore Hosting Plans",
    image: "/services/hosting.jpg",
    text: "Keep your website accessible and performing reliably with secure hosting solutions, dependable infrastructure, and technical support when you need it.",
    offers: ["Managed Web Hosting", "Cloud Server Solutions", "SSL Certificates & Security", "Technical Support"],
  },
};

function OverviewArt({ s, image }) {
  if (image) {
    return <img src={image} alt={s.title} loading="lazy" className="size-full object-contain mix-blend-multiply" />;
  }
  return (
    <div aria-hidden="true" className="relative grid size-full min-h-[190px] place-items-center overflow-hidden rounded-[18px] bg-linear-to-br from-[#e3f4fc] via-[#bfe6f7] to-[#8fd3ee]">
      <span className="absolute -left-8 -top-10 size-40 rounded-full bg-white/40" />
      <span className="absolute -bottom-12 right-6 size-44 rounded-full bg-white/30" />
      <span className="relative grid size-24 place-items-center rounded-[26px] bg-white text-brand shadow-[0_14px_34px_rgba(10,111,174,0.25)] [&_svg]:size-11">
        <Icon name={s.icon} />
      </span>
    </div>
  );
}

export function ServicesOverview() {
  return (
    <section id="services" className={sectionPad}>
      <div className={container}>
        <SectionHead
          eyebrow="What We Do"
          title="The Right Expertise."
          accent="All Under One Roof."
          text="Explore our services to discover how we can help you build your digital presence, connect with customers, and create better business opportunities."
        />
        <div className="flex flex-col gap-6">
          {servicePages.map((s, i) => {
            const x = overviewExtras[s.slug] || {};
            return (
              <Reveal key={s.slug} delay={80}>
                <article
                  className={`group flex flex-col gap-6 overflow-hidden rounded-[22px] border border-line bg-linear-to-br from-white to-sky-faint p-5 shadow-[0_8px_26px_rgba(7,48,90,0.06)] transition duration-300 hover:border-brand hover:shadow-[0_18px_44px_rgba(7,48,90,0.14)] sm:p-7 md:items-center md:gap-10 ${i % 2 ? "md:flex-row-reverse" : "md:flex-row"
                    }`}
                >
                 <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:gap-5">
                    <span className="grid size-14 shrink-0 place-items-center rounded-[16px] bg-sky-soft text-brand transition group-hover:animate-float group-hover:bg-brand group-hover:text-white sm:size-16">
                      <Icon name={s.icon} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-[1.3rem] font-extrabold text-navy sm:text-[1.5rem]">{s.title}</h3>
                      <p className="mt-2 max-w-[46ch] text-[0.95rem] text-muted">{x.text || s.text}</p>
                      <p className="mt-5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-brand">What We Offer</p>
                      <ul className="mb-5 mt-2 flex flex-wrap gap-x-5 gap-y-2">
                        {(x.offers || s.tags).map((t) => (
                          <li key={t} className="inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-navy">
                            <span className="text-brand">
                              <Icon name="check" size={14} />
                            </span>
                            {t}
                          </li>
                        ))}
                      </ul>
                      <Link
                        to={`/services/${s.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-navy to-aqua px-6 py-3 text-[0.9rem] font-bold text-white shadow-[0_8px_20px_rgba(10,111,174,0.3)] transition hover:-translate-y-0.5"
                      >
                        {x.cta || "Learn More"} <Icon name="arrow" size={16} />
                      </Link>
                    </div>
                  </div>
                  <div className="h-[200px] w-full md:h-[230px] md:w-[44%] md:shrink-0">
                    <OverviewArt s={s} image={x.image} />
                  </div>
                </article>
              </Reveal>
            );
          })}
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
          <Link to="/contact" className={btn("primary", true)}>
            Get a Free Quote
          </Link>
          <a href="#packages" className={btn("ghost", true)}>
            {service.slug === "hosting" ? "View Hosting Plans" : isQuote(service) ? "Explore Solutions" : "View Packages"}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- inner page: what is included ---------- */
export function Offerings({ service }) {
  // Heading of the "What You Get" section for each service: [title, blue word]
  const offeringHeads = {
    app: ["Everything You Need to Build a Powerful", "Mobile App"],
    marketing: ["Everything You Need to Grow Your Business", "Online"],
    branding: ["Everything You Need to Build a Memorable", "Brand"],
    ai: ["Intelligent Automation for a More Efficient", "Business"],
    hosting: ["Everything Your Website Needs to", "Stay Online"],
  };
  const [offerTitle, offerAccent] = offeringHeads[service.slug] || ["Everything Your Business Needs to Succeed", "Online"];

  return (
    <>
    <section className={sectionPad}>
      <div className={container}>
        <SectionHead
          eyebrow="What You Get"
          title={offerTitle}
          accent={offerAccent}
          text={service.text}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {service.offerings.map((o, i) => (
            <Reveal key={o.title} delay={(i % 3) * 110} className="h-full">
              <article className={`${card} ${cardFx}`}>
                <div className={`mb-[18px] grid size-12 place-items-center rounded-[14px] bg-sky-soft text-brand ${iconFx} ${iconPop}`}>
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
    {service.solutions && <Solutions data={service.solutions} />}
    </>
  );
}

/* ---------- inner page: "Our Solutions" (Hosting): 4 cards under What You Get. Content lives in data.js (`solutions`) ---------- */
function Solutions({ data }) {
  return (
    <section className={`${sectionPad} bg-sky-faint`}>
      <div className={container}>
        <SectionHead eyebrow="Our Solutions" title={data.title} accent={data.accent} text={data.text} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((o, i) => (
            <Reveal key={o.title} delay={(i % 4) * 110} className="h-full">
              <article className={`${card} ${cardFx}`}>
                <div className={`mb-[18px] grid size-12 place-items-center rounded-[14px] bg-sky-soft text-brand ${iconFx} ${iconPop}`}>
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

// Branding page: its 3 projects are taken straight from the Portfolio page (Branding & Graphic Design).
// To show other ones, change the three names in BRANDING_PICKS (they must match a `sub` in data.js -> portfolioCategories "design").
const BRANDING_PICKS = ["Iconic Logo", "Typographic Logo", "Mascot Logo"];
function brandingProjects() {
  const design = portfolioCategories.find((c) => c.id === "design")?.items ?? [];
  return BRANDING_PICKS.map((sub) => design.find((it) => it.sub === sub))
    .filter(Boolean)
    .map((it) => ({ ...it, cat: "design", label: "Logo" }));
}

/* ---------- inner page: small portfolio for this service ---------- */
export function ServicePortfolio({ service }) {
   if (service.aiProjects) return <AiProjects service={service} />;
  if (service.caseStudies) return <CaseStudies service={service} />;
  return (
    <section className={`${sectionPad} bg-sky-faint`}>
      <div className={container}>
  <SectionHead
  eyebrow="Our Work"
  title={
    service.slug === "web"
      ? "Websites We've Built for Growing"
      : service.slug === "app"
        ? "Mobile Apps Built Around"
        : `Recent ${service.short}`
  }
  accent={service.slug === "web" ? "Businesses" : service.slug === "app" ? "Real-World Needs" : "Projects"}
/>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {service.slug === "branding"
            ? brandingProjects().map((p, i) => <FeaturedCard key={`${p.sub}-${p.title}`} p={p} i={i} />)
            : service.portfolio.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
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
        <div className="relative h-[190px] overflow-hidden bg-linear-to-br from-[#d6effa] via-[#8fd3ee] to-[#3aa7da]">
          {p.image ? (
            <img src={p.image} alt={p.title} loading="lazy" className="size-full object-cover object-top" />
          ) : (
            <div aria-hidden="true" className="grid size-full place-items-center">
              <img src="/logo.png" alt="" className="w-[70px] opacity-90" />
            </div>
          )}
          <span className="absolute left-3.5 top-3.5 rounded-full bg-white px-3 py-[3px] text-[0.72rem] font-bold text-brand">
            {p.category}
          </span>
        </div>
        <div className="px-[22px] pb-6 pt-5">
          <h3 className="mb-1.5 text-[1.05rem] font-bold text-navy">{p.title}</h3>
          <p className="text-[0.9rem] text-muted">{p.text}</p>
          {p.url && (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-navy"
            >
              Visit Website <Icon name="arrow" size={14} />
            </a>
          )}
        </div>
      </article>
    </Reveal>
  );
}

// Where the "View Full Portfolio" button goes. Change to "/portfolio" once that page exists.
const PORTFOLIO_LINK = "/portfolio";
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
          {featured(1).map((p, i) => (
            <FeaturedCard key={`${p.cat}-${p.title}`} p={p} i={i} />
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
    <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-white/25 bg-white/10 px-5 py-3.5 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/20">
      <Logo className="size-6 text-white" aria-hidden="true" />
      <span className="text-[0.92rem] font-semibold">{name}</span>
    </div>
  );
}

export function TechStack() {
  return (
        <section className={`${gradBg} py-8`}>
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

export function TestimonialCard({ t }) {
  return (
    <figure className={`${card} flex flex-col`}>
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <div className="flex gap-[3px] text-[#f5b301] [&_svg]:fill-current" aria-hidden="true">
          {[...Array(5)].map((_, k) => (
            <Icon key={k} name="star" size={16} />
          ))}
        </div>
        {t.tag && (
          <span className="rounded-full bg-sky-soft px-3 py-1 text-[0.72rem] font-semibold text-navy">{t.tag}</span>
        )}
      </div>
      <blockquote className="mb-[22px] text-[0.98rem] text-ink">{t.quote}</blockquote>
      <figcaption className="mt-auto flex items-center gap-3">
        <span className={`${gradBg} grid size-[42px] shrink-0 place-items-center rounded-full font-bold text-white`}>
          {t.photo ? (
  <img src={t.photo} alt={t.name} loading="lazy" className="size-[42px] shrink-0 rounded-full object-cover" />
) : (
  <span className={`${gradBg} grid size-[42px] shrink-0 place-items-center rounded-full font-bold text-white`}>
    {t.name.charAt(0)}
  </span>
)}
        </span>
        <span>
          <strong className="block text-[0.92rem] text-navy">{t.name}</strong>
          <small className="block text-[0.8rem] text-muted">{t.role}</small>
          {t.meta && <small className="block text-[0.75rem] text-muted/80">{t.meta}</small>}
        </span>
      </figcaption>
    </figure>
  );
}

/* ---------- "What our clients say": a simple grid of cards ---------- */
const SERVICES_SLIDE_MS = 2000; // time each review stays (ms)

export function TestimonialsGrid() {
  const list = servicesTestimonials;
  const count = list.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // runs again after every change, so clicking a dot also restarts the wait
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), SERVICES_SLIDE_MS);
    return () => clearTimeout(id);
  }, [index, paused, count]);

  return (
    <section className={`${sectionPad} bg-sky-faint`}>
      <div className={container}>
        <SectionHead
          eyebrow="Testimonials"
          title="What Our Clients"
          accent="Say"
          text="Hear from the teams who turned their ideas into reality with us."
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
                {list.map((t, i) => (
                  <div key={i} className="w-full shrink-0 px-2" aria-hidden={i !== index}>
                    <TestimonialCard t={t} />
                  </div>
                ))}
              </div>
            </div>

            {count > 1 && (
              <div className="mt-4 flex flex-wrap justify-center gap-2.5" role="group" aria-label="Choose testimonial">
                {list.map((t, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show testimonial ${i + 1}`}
                    aria-current={i === index}
                    className={`h-3 rounded-full transition-all duration-300 ${i === index ? "w-7 bg-brand" : "w-3 bg-line hover:bg-brand/50"}`}
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

/* ---------- inner page: pricing packages (compact cards, all visible; long feature lists scroll inside the card) ---------- */
// Services without fixed packages (Mobile App) show a "Custom Quote" block instead of pricing.
const isQuote = (service) => service.customQuote || service.slug === "app" || !(service.packageGroups?.length || service.packages?.length);
const money = (v) => parseFloat(String(v ?? "").replace(/[^0-9.]/g, "")) || 0;

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M12 3C6.8 3 3 6.4 3 10.6c0 2.3 1.2 4.3 3 5.7V21l4.2-2.4c.6.1 1.2.2 1.8.2 5.2 0 9-3.4 9-7.6S17.2 3 12 3Z" />
    </svg>
  );
}

// All packages are shown at once in a grid (like thecustomlogos.com/pricing).
// Every card is the same size; the feature list scrolls inside the card when it is long.
function PackageCard({ p }) {
  const off = money(p.was) > money(p.price) ? Math.round((1 - money(p.price) / money(p.was)) * 100) : 0;
  return (
        <article className={`${cardFx} flex h-full w-full flex-col rounded-[16px] border border-line bg-white p-5 shadow-[0_10px_30px_rgba(7,48,90,0.09)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(7,48,90,0.15)]`}>
      <h3 className="text-[1.05rem] font-bold text-navy transition-colors duration-300 group-hover:text-brand">{p.name}</h3>

           <div className="mt-2 flex items-center justify-between gap-2 border-b border-line pb-3.5">
        <p className="flex items-baseline gap-1 leading-none">
          {p.priceLabel ? (
            <strong className={`${gradText} text-[1.35rem] font-extrabold`}>{p.priceLabel}</strong>
          ) : (
            <>
              <strong className={`${gradText} text-[2rem] font-extrabold`}>{p.price}</strong>
              {p.period && <span className="text-[0.8rem] font-semibold text-muted">{p.period}</span>}
            </>
          )}
        </p>
        {off > 0 && (
          <div className="shrink-0 rounded-md bg-navy px-2.5 py-1.5 text-center leading-tight text-white">
            <span className="block text-[0.62rem] font-bold tracking-wide">{off}% OFF</span>
            <s className="text-[0.85rem] font-bold text-white/80">{p.was}</s>
          </div>
        )}
      </div>

      <ul
        tabIndex={0}
        aria-label={`${p.name} features`}
        className="my-3 h-[250px] overflow-y-auto pr-2 [scrollbar-color:#07305a_#dff1fa] [scrollbar-width:thin]"
      >
               {p.features.map((f, i) =>
          f.startsWith("#") ? (
            // a feature starting with "#" is a small heading (e.g. "#More Features")
            <li key={`${i}-${f}`} className="pb-1 pt-4 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-brand">
              {f.slice(1)}
            </li>
          ) : (
            <li key={`${i}-${f}`} className="flex items-start gap-2 py-[7px] text-[0.86rem] leading-snug text-ink">
              <span className="mt-[3px] shrink-0 text-brand">
                <Icon name="check" size={13} />
              </span>
              {f}
            </li>
          )
        )}
      </ul>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
        <Link
          to="/contact"
          className="rounded-full border-2 border-brand px-4 py-1.5 text-[0.76rem] font-bold uppercase tracking-wide text-brand transition hover:bg-brand hover:text-white"
        >
          Order Now
        </Link>
        <Link to="/contact" className="text-[0.68rem] leading-tight text-muted">
          Click here to
          <strong className="block text-[0.85rem] text-navy">Live Chat</strong>
        </Link>
      </div>
    </article>
  );
}

/* ---------- inner page: "Custom Quote" block (replaces pricing when a service has no fixed packages) ---------- */
function CustomQuote({ service, bare = false }) {

    // Custom text for services that need their own wording (others use the default)
  const quoteText = {
    ai: {
      title: "Stop Spending Time on Tasks You Could Automate.",
      text: "Let's identify the repetitive processes slowing your business down and turn them into intelligent, connected workflows.",
    },
  }[service.slug];
  const block = (
    <Reveal>
      <div className={`${gradBg} mx-auto max-w-[860px] rounded-[24px] px-6 py-12 text-center text-white shadow-[0_18px_45px_rgba(7,48,90,0.18)] sm:px-12`}>
        <p className="mb-3 text-[0.8rem] font-bold uppercase tracking-[0.14em] text-white/80">Pricing</p>
               <h2 className="text-[length:clamp(1.7rem,3.4vw,2.5rem)] font-extrabold leading-tight">
          {quoteText?.title || `Every ${service.short} Project Is Different`}
        </h2>
                <p className="mx-auto mt-4 max-w-[560px] text-white/85">
          {quoteText?.text || "Tell us what you want to build and we will send a clear, fixed quote made for your idea, scope and timeline. No obligation."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3.5">
          <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-navy transition hover:-translate-y-0.5 hover:shadow-lg">
            Get a Custom Quote <Icon name="arrow" size={16} />
          </Link>
        </div>
      </div>
    </Reveal>
  );
  if (bare) return block;
  return (
    <section id="packages" className={sectionPad}>
      <div className={container}>{block}</div>
    </section>
  );
}

// The package cards only (no heading). Used by the service pages and by the Pricing page.
// Ek list ke cards (pehle wala grid code, ab list bahar se aati hai)
function PackageRows({ list }) {
  const count = list.length;
  const perRow = count === 4 || count % 4 === 0 ? 4 : 3;
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {list.map((p, i) => (
        <Reveal
          key={p.name}
          delay={(i % perRow) * 90}
          className={`w-full sm:w-[calc((100%-1.5rem)/2)] ${perRow === 4 ? "lg:w-[calc((100%-4.5rem)/4)]" : "lg:w-[calc((100%-3rem)/3)]"}`}
        >
          <PackageCard p={p} />
        </Reveal>
      ))}
    </div>
  );
}

// Agar service mein packageGroups hain to Web Design / E-Commerce ke alag tabs dikhte hain.
export function PackageGrid({ service }) {
  const [tab, setTab] = useState(0);
  if (isQuote(service)) return <CustomQuote service={service} bare />;

  const groups = service.packageGroups ?? [{ label: "", packages: service.packages }];
  const group = groups[Math.min(tab, groups.length - 1)];

  return (
    <>
      {groups.length > 1 && (
        <div role="tablist" aria-label="Package type" className="mb-8 flex justify-center gap-2.5">
          {groups.map((g, i) => {
            const on = i === tab;
            return (
              <button
                key={g.label}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setTab(i)}
                className={`rounded-full border px-6 py-2.5 text-[0.9rem] font-bold transition ${
                  on
                    ? `${gradBg} border-transparent text-white shadow-[0_8px_20px_rgba(10,111,174,0.28)]`
                    : "border-line bg-white text-navy hover:border-brand hover:text-brand"
                }`}
              >
                {g.label}
              </button>
            );
          })}
        </div>
      )}
            {group.quote ? (
        // a group with `quote: true` (Web Portal) shows the Custom Quote block instead of prices
        <CustomQuote key={group.label} service={{ ...service, short: group.label }} bare />
      ) : (
        <PackageRows key={group.label} list={group.packages} />
      )}
    </>
  );
}

export function Packages({ service }) {
  if (isQuote(service)) return <CustomQuote service={service} />;
  return (
    <section id="packages" className={sectionPad}>
      <div className={container}>
      <SectionHead
  eyebrow="Pricing"
  title="Affordable Packages For"
  accent="Every Business"
  text="Choose a website package that fits your goals and budget. Transparent pricing, clearly defined features and professional delivery, with no unnecessary surprises."
/>
        <PackageGrid service={service} />
      </div>
    </section>
  );
}