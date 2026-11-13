import { useState } from "react";
import { brand, services } from "../data";
import { container, btn, gradBg, sectionPad } from "../ui";
import Icon from "./Icon";
import Reveal from "./Reveal";

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const budgets = [
  "Under $1,000",
  "$1,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
  "Not sure yet",
];

const perks = [
  "Reply within 24 hours",
  "Free strategy call, no obligation",
  "Clear quote before any work starts",
];

const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition placeholder:text-[#9db3c5] focus:border-brand focus:ring-4 focus:ring-brand/15";

const label = "mb-1.5 block text-[0.82rem] font-semibold text-navy";

function Field({ id, title, required, children }) {
  return (
    <div>
      <label htmlFor={id} className={label}>
        {title} {required && <span className="text-brand">*</span>}
      </label>
      {children}
    </div>
  );
}

export function ContactForm() {
  // status: idle | sending | success | error
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real people never fill this hidden field.
    if (data.get("botcheck")) return;

    if (!ACCESS_KEY) {
      setStatus("error");
      setError("The form is not connected yet. Please email us directly.");
      return;
    }

    setStatus("sending");
    setError("");

    const payload = {
      access_key: ACCESS_KEY,
      subject: `New enquiry from ${data.get("name")} via ${brand.name} website`,
      from_name: `${brand.name} Website`,
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      company: data.get("company"),
      service: data.get("service"),
      budget: data.get("budget"),
      message: data.get("message"),
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        throw new Error(json.message || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof TypeError
          ? "Network problem. Please check your connection and try again."
          : err.message
      );
    }
  };

  return (
    <section id="contact" className={sectionPad}>
      <div className={container}>
        <Reveal className="grid overflow-hidden rounded-[28px] border border-line shadow-[0_18px_45px_rgba(7,48,90,0.14)] lg:grid-cols-[0.9fr_1.1fr]">
          {/* left: pitch */}
          <div className={`${gradBg} p-8 text-white sm:p-12`}>
            <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.16em] text-[#bfe9f8]">
              Get in Touch
            </span>
            <h2 className="mb-4 text-[length:clamp(1.8rem,3.4vw,2.4rem)] font-bold leading-tight">
              Let&apos;s Build Something Great Together
            </h2>
            <p className="mb-8 text-[#e2f6fd]">
              Tell us about your project and we will come back with ideas, a
              timeline and a clear quote. No pressure, no jargon.
            </p>

            <ul className="mb-10 grid gap-3.5">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/20">
                    <Icon name="check" size={14} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <div className="border-t border-white/20 pt-6">
              <p className="mb-1 text-sm text-[#cdeefa]">Prefer email?</p>
              <a
                href={`mailto:${brand.email}`}
                className="inline-flex items-center gap-2 font-semibold underline decoration-white/40 underline-offset-4"
              >
                <Icon name="mail" size={18} /> {brand.email}
              </a>
            </div>
          </div>

          {/* right: form */}
          <div className="bg-white p-6 sm:p-10">
            {status === "success" ? (
              <div className="grid h-full place-items-center py-10 text-center">
                <div>
                  <div className={`${gradBg} mx-auto mb-5 grid size-16 place-items-center rounded-full text-white`}>
                    <Icon name="check" size={30} />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-navy">Message sent!</h3>
                  <p className="mx-auto mb-6 max-w-[340px] text-muted">
                    Thanks for reaching out. Our team will reply to you within 24
                    hours.
                  </p>
                  <button className={btn("ghost")} onClick={() => setStatus("idle")}>
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-5" noValidate={false}>
                {/* honeypot */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="name" title="Full Name" required>
                    <input id="name" name="name" required placeholder="John Smith" className={field} />
                  </Field>
                  <Field id="email" title="Email" required>
                    <input id="email" name="email" type="email" required placeholder="john@company.com" className={field} />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="phone" title="Phone">
                    <input id="phone" name="phone" type="tel" placeholder="+1 234 567 890" className={field} />
                  </Field>
                  <Field id="company" title="Company">
                    <input id="company" name="company" placeholder="Your company" className={field} />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="service" title="Service Needed" required>
                    <select id="service" name="service" required defaultValue="" className={field}>
                      <option value="" disabled>
                        Select a service
                      </option>
                      {services.map((s) => (
                        <option key={s.title}>{s.title}</option>
                      ))}
                      <option>Something else</option>
                    </select>
                  </Field>
                  <Field id="budget" title="Estimated Budget">
                    <select id="budget" name="budget" defaultValue="" className={field}>
                      <option value="" disabled>
                        Select a range
                      </option>
                      {budgets.map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field id="message" title="Project Details" required>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your project, goals and timeline..."
                    className={`${field} resize-y`}
                  />
                </Field>

                {status === "error" && (
                  <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={`${btn("primary", true)} w-full disabled:cursor-not-allowed disabled:opacity-70`}
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                  {status !== "sending" && <Icon name="arrow" size={18} />}
                </button>
                <p className="text-center text-xs text-muted">
                  We respect your privacy and never share your details.
                </p>
              </form>
            )}
          </div>
        </Reveal>
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
        <a href="#contact" className={btn("white", true)}>
          Book a Free Strategy Call
        </a>
      </Reveal>
    </section>
  );
}