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

export function Cta() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-navy-deep via-navy to-[#0a6fae] py-[84px] text-center text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-0 size-72 animate-drift rounded-full bg-aqua/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 bottom-0 size-80 animate-drift rounded-full bg-brand/30 blur-3xl [animation-delay:-8s]" />
      <Reveal className={`${container} relative`}>
        <h2 className="mb-3.5 text-[length:clamp(1.8rem,3.6vw,2.6rem)] font-bold">
          Ready to Grow Your Business?
        </h2>
        <p className="mx-auto mb-7 max-w-[560px] text-[#cfe6f5]">
          Let us talk about how we can help you build digital products that
          deliver real results. Book a free strategy call today.
        </p>
        <Link to="/#contact" className={btn("white", true)}>
          Book a Free Strategy Call
        </Link>
      </Reveal>
    </section>
  );
}