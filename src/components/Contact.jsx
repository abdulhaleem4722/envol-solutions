import { useState } from "react";
import { offices, faqs } from "../data";
import { container, card, btn, gradBg, sectionPad } from "../ui";
import Icon from "./Icon";
import { SectionHead } from "./Sections";

export function Offices() {
  return (
    <section id="contact" className={`${sectionPad} bg-sky-faint`}>
      <div className={container}>
        <SectionHead
          eyebrow="Our Offices"
          title="Our Offices,"
          accent="One Global Team"
          text="We work across time zones so your project keeps moving."
        />
        <div className="mx-auto grid max-w-[820px] gap-6 md:grid-cols-2">
          {offices.map((o, i) => (
            <article key={i} className={`${card} text-center`}>
              <div className="mb-1.5 text-[2rem]">{o.flag}</div>
              <h3 className="mb-2 text-[1.15rem] font-bold text-navy">{o.city}</h3>
              <span className="mb-4 block text-[0.85rem] text-muted">{o.country}</span>
              <ul className="grid gap-2.5 text-[0.9rem] text-muted [&_svg]:shrink-0 [&_svg]:text-brand">
                <li className="flex items-center justify-center gap-2">
                  <Icon name="pin" size={16} /> {o.address}
                </li>
                <li className="flex items-center justify-center gap-2">
                  <Icon name="call" size={16} /> {o.phone}
                </li>
                <li className="flex items-center justify-center gap-2">
                  <Icon name="clock" size={16} /> {o.hours}
                </li>
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Audit() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    // TODO: connect to your backend, Formspree, or email service.
    setSent(true);
  };

  return (
    <section id="contact" className={sectionPad}>
      <div className={container}>
        <div
          className={`${gradBg} mx-auto max-w-[860px] rounded-[28px] px-5 py-10 text-center text-white shadow-[0_18px_45px_rgba(7,48,90,0.14)] sm:px-8 sm:py-14`}
        >
          <span className="mb-2.5 inline-block text-xs font-bold uppercase tracking-[0.16em] text-[#bfe9f8]">
            Free Resource
          </span>
          <h2 className="mb-3.5 text-[length:clamp(1.7rem,3.4vw,2.3rem)] font-bold">
            Get Your Free{" "}
            <span className="text-[#d9f5ff] underline decoration-white/40 underline-offset-[6px]">
              Website Audit
            </span>
          </h2>
          <p className="mx-auto mb-[26px] max-w-[560px] text-[#e2f6fd]">
            Find out what is holding your website back from bringing in more
            leads and revenue. Our team will send a clear report with practical
            recommendations.
          </p>

          {sent ? (
            <p className="mb-3.5 inline-flex items-center gap-2 rounded-full bg-white/20 px-[22px] py-3">
              <Icon name="check" size={18} /> Thanks! We will send your audit to {email}.
            </p>
          ) : (
            <form
              className="mx-auto mb-3.5 flex max-w-[480px] flex-col gap-2.5 sm:flex-row"
              onSubmit={submit}
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
                className="min-w-0 flex-1 rounded-full bg-white px-5 py-[13px] text-ink outline-none focus:ring-[3px] focus:ring-white/45"
              />
              <button className={btn("white")} type="submit">
                Get Free Audit
              </button>
            </form>
          )}
          <small className="block text-[0.78rem] text-[#cdeefa]">
            No spam. Unsubscribe anytime. Results in 48 hours.
          </small>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className={`${sectionPad} bg-sky-faint`}>
      <div className="mx-auto w-full max-w-[820px] px-5">
        <SectionHead eyebrow="FAQ" title="Frequently Asked" accent="Questions" />
        <div className="grid gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`overflow-hidden rounded-[14px] border bg-white ${
                  isOpen
                    ? "border-aqua shadow-[0_10px_30px_rgba(7,48,90,0.08)]"
                    : "border-line"
                }`}
              >
                <button
                  className="flex w-full items-center justify-between gap-4 px-[22px] py-[18px] text-left font-semibold text-navy"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  {f.q}
                  <span
                    className={`shrink-0 text-brand transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <Icon name="plus" size={18} />
                  </span>
                </button>
                {isOpen && (
                  <p className="px-[22px] pb-5 text-[0.95rem] text-muted">{f.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Cta() {
  return (
    <section className="bg-linear-to-br from-navy-deep via-navy to-[#0a6fae] py-[84px] text-center text-white">
      <div className={container}>
        <h2 className="mb-3.5 text-[length:clamp(1.8rem,3.6vw,2.6rem)] font-bold">
          Ready to Grow Your Business?
        </h2>
        <p className="mx-auto mb-7 max-w-[560px] text-[#cfe6f5]">
          Let us talk about how we can help you build digital products that
          deliver real results. Book a free strategy call today.
        </p>
        <a href="#contact" className={btn("white", true)}>
          Book a Free Strategy Call
        </a>
      </div>
    </section>
  );
}