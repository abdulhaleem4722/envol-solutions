import { heroStats } from "../data";
import { container, btn, gradText } from "../ui";
import Orbit from "./Orbit";

export default function Hero() {
  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden bg-[linear-gradient(to_bottom,#bfe8f8_0%,#d3effb_60%,#ffffff_100%)] pb-[70px] pt-[50px] sm:pt-[70px]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-[150px] h-[900px] bg-[radial-gradient(ellipse_at_center,rgba(0,180,224,0.30),transparent_65%)]"
        />
        <div
          className={`${container} relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6`}
        >
          {/* text */}
          <div className="text-center lg:text-left">
            <span className="mb-6 inline-block rounded-full border border-line bg-white px-4 py-1.5 text-[0.82rem] font-semibold text-brand">
              Global Digital Agency
            </span>
            <h1 className="text-[length:clamp(2.2rem,4.8vw,3.7rem)] font-extrabold leading-[1.1] tracking-tight text-navy">
              We Build Digital Products <span className={gradText}>That Drive Revenue</span>
            </h1>
            <p className="mx-auto mt-[22px] max-w-[560px] text-[1.08rem] text-muted lg:mx-0">
              From websites and mobile apps to data-driven marketing, we help
              businesses grow with digital solutions that turn visitors into
              customers.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3.5 lg:justify-start">
              <a href="#contact" className={btn("primary", true)}>
                Book a Free Strategy Call
              </a>
              <a href="#projects" className={btn("ghost", true)}>
                See Our Work
              </a>
            </div>

            <ul className="mx-auto mt-12 grid max-w-[560px] grid-cols-2 gap-5 sm:grid-cols-4 lg:mx-0">
              {heroStats.map((s) => (
                <li key={s.label}>
                  <strong className="block text-[2rem] font-extrabold leading-tight text-navy">
                    {s.value}
                  </strong>
                  <span className="text-[0.85rem] text-muted">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* animation */}
          <Orbit />
        </div>
      </section>

    </>
  );
}