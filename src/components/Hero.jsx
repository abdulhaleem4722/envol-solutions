import { btn, gradText } from "../ui";
import Orbit from "./Orbit";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[linear-gradient(to_bottom,#bfe8f8_0%,#d3effb_60%,#ffffff_100%)] pb-[60px] pt-[20px] sm:pt-[28px] lg:pt-[20px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-[150px] h-[900px] bg-[radial-gradient(ellipse_at_center,rgba(0,180,224,0.30),transparent_65%)]"
      />
      {/* soft floating blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/3 size-72 animate-drift rounded-full bg-aqua/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 size-80 animate-drift rounded-full bg-brand/20 blur-3xl [animation-delay:-8s]"
      />

      <div className="relative mx-auto grid w-full max-w-[1760px] items-center gap-10 px-6 sm:px-10 lg:grid-cols-2 lg:gap-8 lg:px-16">
        {/* text */}
        <div className="text-center lg:text-left">
          <span className="mb-5 inline-block animate-fade-up rounded-full border border-line bg-white px-4 py-1.5 text-[0.82rem] font-semibold text-brand">
            Global Digital Agency
          </span>
          <h1 className="animate-fade-up text-[length:clamp(2.6rem,5.2vw,5.2rem)] font-extrabold leading-[1.1] tracking-tight text-navy [animation-delay:120ms]">
            We Build Digital Products <span className={gradText}>That Drive Revenue</span>
          </h1>
          <p className="mx-auto mt-[22px] max-w-[620px] animate-fade-up text-[1.12rem] text-muted [animation-delay:240ms] lg:mx-0">
            From websites and mobile apps to data-driven marketing, we help
            businesses grow with digital solutions that turn visitors into
            customers.
          </p>
          <div className="mt-8 flex animate-fade-up flex-wrap justify-center gap-3.5 [animation-delay:360ms] lg:justify-start">
            <a href="#contact" className={btn("primary", true)}>
              Book a Free Strategy Call
            </a>
            <a href="#projects" className={btn("ghost", true)}>
              See Our Work
            </a>
          </div>
        </div>

        {/* animation */}
        <div className="animate-pop-in [animation-delay:300ms]">
          <Orbit />
        </div>
      </div>
    </section>
  );
}