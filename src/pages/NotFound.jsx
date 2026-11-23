import { Link } from "react-router-dom";
import { brand } from "../data";
import { btn, container, gradText } from "../ui";
import Icon from "../components/Icon";

// 404 page. Shown for every address that does not exist (see the "*" route in App.jsx).
export default function NotFound() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-[linear-gradient(to_bottom,#bfe8f8_0%,#d3effb_60%,#ffffff_100%)] pb-16 pt-[130px] text-center">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-[150px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(0,180,224,0.30),transparent_65%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-1/3 size-72 animate-drift rounded-full bg-aqua/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 bottom-0 size-80 animate-drift rounded-full bg-brand/20 blur-3xl [animation-delay:-8s]" />

      <div className={`${container} relative`}>
        <span className="mb-6 inline-block animate-fade-up rounded-full border border-line bg-white px-4 py-1.5 text-[0.82rem] font-bold uppercase tracking-[0.12em] text-brand">
          404 — Page Not Found
        </span>

        <h1 className="mx-auto max-w-[820px] animate-fade-up text-[length:clamp(2.2rem,5vw,4rem)] font-extrabold leading-[1.1] tracking-tight text-navy [animation-delay:120ms]">
          Oops! Looks Like <span className={gradText}>You&apos;ve Taken a Wrong Turn.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-[620px] animate-fade-up text-[1.1rem] text-muted [animation-delay:240ms]">
          The page you&apos;re looking for may have been moved, removed or no longer exists. But don&apos;t worry, there&apos;s plenty more to explore at Envol Solutions.
        </p>

        <div className="mt-8 flex animate-fade-up flex-wrap justify-center gap-3.5 [animation-delay:360ms]">
          <Link to="/" className={btn("primary", true)}>
            Back to Homepage
          </Link>
          <Link to="/services" className={btn("ghost", true)}>
            Explore Our Services
          </Link>
        </div>

        <p className="mt-10 animate-fade-up text-[0.98rem] text-muted [animation-delay:440ms]">
          Need a hand finding something? We&apos;re just a message away.
        </p>
        <Link to="/contact" className="mt-2 inline-flex animate-fade-up items-center gap-1.5 text-[0.95rem] font-bold text-brand hover:text-navy [animation-delay:500ms]">
          Contact Our Team <Icon name="arrow" size={16} />
        </Link>

        <div className="mt-12 animate-fade-up [animation-delay:560ms]">
          <img src={brand.logo} alt="" width="34" height="34" className="mx-auto mb-2" />
          <p className="font-extrabold text-navy">{brand.name}</p>
          <p className="text-[0.85rem] text-muted">Elevate. Innovate. Envol With Us.</p>
        </div>
      </div>
    </section>
  );
}
