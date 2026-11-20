import { useState } from "react";
import { brand, serviceOptions, budgetOptions } from "../data";
import { btn } from "../ui";
import Icon from "./Icon";
import Reveal from "./Reveal";

// The framed contact block used on BOTH the Contact page and the Home page:
// a dark bordered panel, "Book a Free Strategy Call" on the left, the message form (white card) on the right.

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const label = "mb-1.5 block text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted";
const field =
  "w-full rounded-xl border border-line bg-[#f6f9fc] px-4 py-3 text-[0.92rem] text-ink outline-none transition placeholder:text-[#9db3c5] focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/15";

function CalendarIcon({ size = 22 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

function SendIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z" />
    </svg>
  );
}

function Field({ id, title, children }) {
  return (
    <div>
      <label htmlFor={id} className={label}>
        {title}
      </label>
      {children}
    </div>
  );
}

function PinIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/* ---------- left side: book a call + contact details ---------- */
function BookCall() {
  return (
    <div className="flex flex-col text-white">
      <h2 className="mb-4 flex items-start gap-3 text-[1.35rem] font-bold leading-snug">
        <span className="mt-1 text-[#7fdcf5]">
          <CalendarIcon />
        </span>
        Short on Time? Schedule Your Call in Seconds.
      </h2>
      <p className="mb-6 max-w-[430px] text-[0.95rem] text-[#cfe6f5]">
        Book your consultation, and let our team take the first step toward understanding your project and its opportunities.
      </p>

      {/* small call box */}
      <div className="flex flex-col items-center rounded-2xl border border-white/20 bg-white/10 px-6 py-6 text-center backdrop-blur-sm">
        <p className="mb-4 max-w-[320px] text-[0.92rem] text-[#e2f6fd]">
          Click below to view our availability and book your call directly.
        </p>
        <a
          href={brand.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#0a6fae] to-[#00b3e0] px-7 py-3.5 font-bold text-white shadow-[0_10px_24px_rgba(0,179,224,0.35)] ring-1 ring-white/30 transition hover:-translate-y-0.5"
        >
          <CalendarIcon size={18} /> Schedule Now
        </a>
      </div>

      {/* contact details under the button */}
      <ul className="mt-6 grid gap-4 border-t border-white/20 pt-6 text-[0.95rem]">
        <li className="flex items-start gap-3">
          <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-white/15 text-[#7fdcf5]">
            <Icon name="phone" size={18} />
          </span>
          <span>
            <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#9fd3ea]">Phone</span>
            <a href={`tel:${brand.phone.replace(/[^+\d]/g, "")}`} className="font-semibold text-white hover:underline">
              {brand.phone}
            </a>
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-white/15 text-[#7fdcf5]">
            <Icon name="mail" size={18} />
          </span>
          <span>
            <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#9fd3ea]">Email</span>
            <a href={`mailto:${brand.email}`} className="font-semibold text-white hover:underline">
              {brand.email}
            </a>
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-white/15 text-[#7fdcf5]">
            <PinIcon size={18} />
          </span>
          <span>
            <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#9fd3ea]">Office</span>
            <span className="font-semibold text-white">{brand.address}</span>
          </span>
        </li>
      </ul>
    </div>
  );
}

/* ---------- right side: the form ---------- */
function MessageForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return; // honeypot: real people never fill this

    if (!ACCESS_KEY) {
      setStatus("error");
      setError("The form is not connected yet. Please email us directly.");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New enquiry from ${data.get("name")} via ${brand.name} website`,
          from_name: `${brand.name} Website`,
          name: data.get("name"),
          email: data.get("email"),
          replyto: data.get("email"), // "Reply" in the inbox goes to the person who filled the form
          phone: data.get("phone"),
          service: data.get("service"),
          budget: data.get("budget"),
          message: data.get("message"),
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Something went wrong.");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof TypeError ? "Network problem. Please check your connection and try again." : err.message);
    }
  };

  return (
    <div className="rounded-[20px] bg-white p-6 shadow-[0_18px_50px_rgba(2,20,45,0.35)] sm:p-8">
      <h3 className="mb-5 flex items-center gap-3 text-[1.2rem] font-bold text-navy">
        <span className="text-brand">
          <SendIcon />
        </span>
        Send Us a Message
      </h3>

      {status === "success" ? (
        <div className="grid place-items-center py-12 text-center">
          <div>
            <div className="mx-auto mb-5 grid size-16 place-items-center rounded-full bg-linear-to-r from-navy to-aqua text-white">
              <Icon name="check" size={30} />
            </div>
            <h4 className="mb-2 text-2xl font-bold text-navy">Message sent!</h4>
            <p className="mx-auto mb-6 max-w-[340px] text-muted">
              Thanks for reaching out. Our team will reply to you within 24 hours.
            </p>
            <button type="button" className={btn("ghost")} onClick={() => setStatus("idle")}>
              Send another message
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} className="grid gap-4">
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="cp-name" title="Full Name">
              <input id="cp-name" name="name" required placeholder="Please Enter Your Name" className={field} />
            </Field>
            <Field id="cp-email" title="Email">
              <input id="cp-email" name="email" type="email" required placeholder="Please Enter Your Email" className={field} />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="cp-phone" title="Phone / WhatsApp">
              <input id="cp-phone" name="phone" type="tel" placeholder="Please Enter Your Contact" className={field} />
            </Field>
            <Field id="cp-service" title="Service of Interest">
              <select id="cp-service" name="service" required defaultValue="" className={field}>
                <option value="" disabled>Please Select Service</option>
                {serviceOptions.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field id="cp-message" title="Project Brief">
            <textarea
              id="cp-message"
              name="message"
              required
              rows={5}
              placeholder="Describe your business, goals, timeline and any reference links."
              className={`${field} resize-y`}
            />
          </Field>

          <Field id="cp-budget" title="Approx. Budget (USD)">
            <select id="cp-budget" name="budget" defaultValue="" className={field}>
              <option value="" disabled>Select Range</option>
              {budgetOptions.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </Field>

          {status === "error" && (
            <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.75rem] text-muted">No spam, no newsletters. We only email you about this project.</p>
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-linear-to-r from-navy to-aqua px-8 py-3.5 text-[0.82rem] font-bold uppercase tracking-[0.1em] text-white shadow-[0_10px_24px_rgba(10,111,174,0.3)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <SendIcon size={16} /> {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ContactPanel() {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-[28px] border border-white/25 bg-linear-to-br from-navy-deep via-navy to-[#0a6fae] p-5 shadow-[0_24px_60px_rgba(7,48,90,0.3)] ring-1 ring-brand/30 sm:p-8 lg:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-aqua/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 right-0 size-96 rounded-full bg-brand/25 blur-3xl" />
        <div className="relative grid items-stretch gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          <BookCall />
          <MessageForm />
        </div>
      </div>
    </Reveal>
  );
}