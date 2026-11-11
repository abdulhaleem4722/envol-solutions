import { heroStats, techStack } from "../data";
import { container, btn, gradText } from "../ui";

export default function Hero() {
  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden bg-linear-to-b from-sky-soft to-white pb-[70px] pt-[60px] text-center sm:pt-[90px]"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-[200px] h-[520px] bg-[radial-gradient(ellipse_at_center,rgba(0,180,224,0.22),transparent_65%)]"
        />
        <div className={`${container} relative`}>
          <span className="mb-6 inline-block rounded-full border border-line bg-white px-4 py-1.5 text-[0.82rem] font-semibold text-brand">
            Global Digital Agency
          </span>
          <h1 className="text-[length:clamp(2.2rem,5.5vw,4rem)] font-extrabold leading-[1.12] tracking-tight text-navy">
            We Build Digital Products
            <br />
            <span className={gradText}>That Drive Revenue</span>
          </h1>
          <p className="mx-auto mt-[22px] max-w-[620px] text-[1.08rem] text-muted">
            From websites and mobile apps to data-driven marketing, we help
            businesses grow with digital solutions that turn visitors into
            customers.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3.5">
            <a href="#contact" className={btn("primary", true)}>
              Book a Free Strategy Call
            </a>
            <a href="#projects" className={btn("ghost", true)}>
              See Our Work
            </a>
          </div>

          <ul className="mx-auto mt-14 grid max-w-[760px] grid-cols-2 gap-5 sm:grid-cols-4">
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
      </section>

      <section className="pb-2 pt-7 text-center">
        <div className={container}>
          <p className="mb-4 text-xs uppercase tracking-[0.14em] text-muted">
            Tools and platforms we build with
          </p>
          <ul className="flex flex-wrap justify-center gap-x-[34px] gap-y-3 text-[1.05rem] font-bold text-[#8ea9bf]">
            {techStack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}