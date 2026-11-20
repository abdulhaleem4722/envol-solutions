import { useRef, useState, useEffect } from "react";
import { container, gradText, sectionPad } from "../ui";
import ContactPanel from "../components/ContactPanel";
import Reveal from "../components/Reveal";
import { TestimonialCard } from "../components/ServicesPage";
import { servicesTestimonials } from "../data";

// The place shown on the map.
const MAP_QUERY = "6594 South 35th Street Apt 101, Franklin, WI 53132, United States";
const MAP_ADDRESS = "6594 South 35th Street, Apt 101, Franklin, WI 53132, United States";
const MAP_HOURS = "Mon-Fri, 9AM-6PM"; // PLACEHOLDER: confirm the opening hours

function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#bfe8f8] via-[#d3effb] to-white pb-14 pt-[140px] text-center">
      <div className={container}>
        <p className="mb-3 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand">Contact Us</p>
        <h1 className="mx-auto max-w-[760px] text-[length:clamp(2.1rem,5vw,3.6rem)] font-extrabold leading-[1.1] text-navy">
          Got a Project in Mind? <span className={gradText}>Let&apos;s Talk About It</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[560px] text-[1.05rem] text-muted">
          Ready to start your project? Book a free consultation or send us a message.
        </p>
      </div>
    </section>
  );
}


/* ---------- testimonials: 3 at a time, arrow buttons on the sides ---------- */
function TestimonialsSlider() {
  const track = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft > el.scrollWidth - el.clientWidth - 4 });
  };
  useEffect(() => {
    update();
    const el = track.current;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // move by one card
  const go = (dir) => {
    const el = track.current;
    const card = el.firstElementChild;
    el.scrollBy({ left: dir * (card.getBoundingClientRect().width + 24), behavior: "smooth" });
  };

  const arrow =
    "absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-white text-brand shadow-[0_6px_18px_rgba(7,48,90,0.14)] transition hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-35";

  return (
    <section className={`${sectionPad} bg-sky-faint`}>
      <div className={container}>
        <div className="mx-auto mb-10 max-w-[640px] text-center">
          <p className="mb-3 text-[0.8rem] font-bold uppercase tracking-[0.16em] text-brand">Testimonials</p>
          <h2 className="text-[length:clamp(1.8rem,3.6vw,2.6rem)] font-extrabold leading-tight text-navy">
            What Our Clients <span className={gradText}>Say</span>
          </h2>
          <p className="mt-3 text-muted">Hear from the teams who turned their ideas into reality with us.</p>
        </div>

        <div className="relative lg:px-14">
          <button type="button" aria-label="Previous testimonials" onClick={() => go(-1)} disabled={edge.start} className={`${arrow} left-0 max-lg:-left-1`}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
          </button>

          <div
            ref={track}
            onScroll={update}
            className="-my-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {servicesTestimonials.map((t, i) => (
              <div key={i} className="flex w-full shrink-0 snap-start md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] [&>figure]:h-full [&>figure]:w-full">
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>

          <button type="button" aria-label="Next testimonials" onClick={() => go(1)} disabled={edge.end} className={`${arrow} right-0 max-lg:-right-1`}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>
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
          <ContactPanel />
        </div>
      </section>
      <TestimonialsSlider />
      <MapSection />
    </>
  );
}