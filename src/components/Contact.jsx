import { Link } from "react-router-dom";
import { container, btn, sectionPad } from "../ui";
import Reveal from "./Reveal";
import ContactPanel from "./ContactPanel";

// Home page contact block: same framed design as the Contact page (see ContactPanel.jsx).
export function ContactForm() {
  return (
    <section id="contact" className={sectionPad}>
      <div className={container}>
        <ContactPanel />
      </div>
    </section>
  );
}

// Default text is used on most pages. Pass props to change it (see ServiceDetail.jsx for the Web page).
export function Cta({
  eyebrow,
  title = "Ready to Grow Your Business?",
  text = "Let us talk about how we can help you build digital products that deliver real results. Book a free strategy call today.",
  primary = { label: "Book a Free Strategy Call", to: "/#contact" },
  secondary,
}) {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-navy-deep via-navy to-[#0a6fae] py-[84px] text-center text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-0 size-72 animate-drift rounded-full bg-aqua/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 bottom-0 size-80 animate-drift rounded-full bg-brand/30 blur-3xl [animation-delay:-8s]" />
      <Reveal className={`${container} relative`}>
        {eyebrow && (
          <p className="mb-3 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-white/80">{eyebrow}</p>
        )}
        <h2 className="mx-auto mb-3.5 max-w-[820px] text-[length:clamp(1.8rem,3.6vw,2.6rem)] font-bold leading-tight">
          {title}
        </h2>
        <p className="mx-auto mb-7 max-w-[600px] text-[#cfe6f5]">{text}</p>
        <div className="flex flex-wrap justify-center gap-3.5">
          <Link to={primary.to} className={btn("white", true)}>
            {primary.label}
          </Link>
          {secondary && (
            <a
              href={secondary.to}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-7 py-3 font-bold text-white transition hover:bg-white hover:text-navy"
            >
              {secondary.label}
            </a>
          )}
        </div>
      </Reveal>
    </section>
  );
}