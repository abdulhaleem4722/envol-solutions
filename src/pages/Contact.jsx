import { useState } from "react";
import { brand, serviceOptions, budgetOptions } from "../data";
import { container, btn, gradBg, gradText, sectionPad } from "../ui";
import Icon from "../components/Icon";
import Reveal from "../components/Reveal";
import { TestimonialsGrid } from "../components/ServicesPage";

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

// PLACEHOLDER: the place shown on the map. Replace with the client's real office address.
const MAP_QUERY = "Clarksville, TN, USA";
const MAP_ADDRESS = "Office address goes here"; // PLACEHOLDER shown under the map
const MAP_HOURS = "Mon-Fri, 9AM-6PM"; // PLACEHOLDER

const field =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[0.95rem] text-ink outline-none transition placeholder:text-[#9db3c5] focus:border-brand focus:ring-4 focus:ring-brand/15";

const panel =
  "h-full rounded-[22px] border border-line bg-white p-6 shadow-[0_14px_40px_rgba(7,48,90,0.09)] sm:p-8";

function CalendarIcon({ size = 22 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}

function SendIcon({ size = 22 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z" />
    </svg>
  );
}

function PanelTitle({ icon, children }) {
  return (
    <h2 className="mb-5 flex items-center gap-3 text-[1.25rem] font-bold text-navy">
      <span className="text-brand">{icon}</span>
      {children}
    </h2>
  );
}

function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#bfe8f8] via-[#d3effb] to-white pb-14 pt-[140px] text-center">
      <div className={container}>
        <p className="mb-3 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand">Contact Us</p>
        <h1 className="mx-auto max-w-[760px] text-[length:clamp(2.1rem,5vw,3.6rem)] font-extrabold leading-[1.1] text-navy">
          Let&apos;s Build Something <span className={gradText}>Great Together</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[560px] text-[1.05rem] text-muted">
          Ready to start your project? Book a free consultation or send us a message.
        </p>
      </div>
    </section>
  );
}

function BookCall() {
  return (
    <div className={`${panel} flex flex-col`}>
      <PanelTitle icon={<CalendarIcon />}>Book a Free Strategy Call</PanelTitle>
      <p className="mb-6 text-[0.95rem] text-muted">
        Choose a time that works for you. Our team will prepare a preliminary analysis before the call.
      </p>
      <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-line bg-sky-faint px-6 py-10 text-center">
        <span className="mb-4 text-brand">
          <CalendarIcon size={46} />
        </span>
        <p className="mb-6 max-w-[320px] text-[0.95rem] text-muted">
          Click below to view our availability and book your call directly.
        </p>
        {/* PLACEHOLDER: swap this mailto for the booking link (Calendly etc.) when the client has one */}
        <a
          href={`mailto:${brand.email}?subject=${encodeURIComponent("Free strategy call")}`}
          className={btn("primary")}
        >
          <CalendarIcon size={18} /> Schedule Now
        </a>
      </div>
      <p className="mt-5 text-center text-[0.85rem] text-muted">
        Prefer email?{" "}
        <a href={`mailto:${brand.email}`} className="font-semibold text-brand underline underline-offset-4">
          {brand.email}
        </a>
      </p>
    </div>
  );
}

function MessageForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return; // honeypot

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
    <div className={panel}>
      <PanelTitle icon={<SendIcon />}>Send Us a Message</PanelTitle>

      {status === "success" ? (
        <div className="grid place-items-center py-14 text-center">
          <div>
            <div className={`${gradBg} mx-auto mb-5 grid size-16 place-items-center rounded-full text-white`}>
              <Icon name="check" size={30} />
            </div>
            <h3 className="mb-2 text-2xl font-bold text-navy">Message sent!</h3>
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
            <input name="name" required aria-label="Your name" placeholder="Your Name" className={field} />
            <input name="email" type="email" required aria-label="Email address" placeholder="Email Address" className={field} />
          </div>
          <input name="phone" type="tel" aria-label="Phone number" placeholder="Phone Number" className={field} />
          <select name="service" required defaultValue="" aria-label="Service of interest" className={field}>
            <option value="" disabled>Service of Interest</option>
            {serviceOptions.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <select name="budget" defaultValue="" aria-label="Budget range" className={field}>
            <option value="" disabled>Budget Range</option>
            {budgetOptions.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
          <textarea
            name="message"
            required
            rows={5}
            aria-label="Project details"
            placeholder="Tell us about your project..."
            className={`${field} resize-y`}
          />

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
            <SendIcon size={18} /> {status === "sending" ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}

function MapSection() {
  return (
    <section className={`${sectionPad} bg-sky-faint`}>
      <div className={container}>
        <div className="mx-auto mb-10 max-w-[640px] text-center">
          <p className="mb-3 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand">Find Us</p>
          <h2 className="text-[length:clamp(1.8rem,3.6vw,2.6rem)] font-extrabold leading-tight text-navy">
            Visit Our <span className={gradText}>Office</span>
          </h2>
        </div>
        <Reveal>
          <div className="overflow-hidden rounded-[22px] border border-line bg-white shadow-[0_14px_40px_rgba(7,48,90,0.09)]">
            <iframe
              title={`Map showing ${MAP_QUERY}`}
              src={`https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="block h-[320px] w-full border-0 sm:h-[420px]"
            />
            <div className="flex flex-col gap-1 px-6 py-4 text-[0.92rem] text-muted sm:flex-row sm:items-center sm:justify-between">
              <span className="font-semibold text-navy">{MAP_ADDRESS}</span>
              <span>{MAP_HOURS}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function Contact() {
  return (
    <>
      <ContactHero />
      <section className="pb-[72px] pt-2">
        <div className={container}>
          <div className="grid items-stretch gap-6 lg:grid-cols-2">
            <Reveal className="h-full"><BookCall /></Reveal>
            <Reveal delay={120} className="h-full"><MessageForm /></Reveal>
          </div>
        </div>
      </section>
      <TestimonialsGrid />
      <MapSection />
    </>
  );
}