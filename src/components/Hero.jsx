import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { btn, gradText } from "../ui";
import Orbit from "./Orbit";

/* How long the banner stays pinned while the visitor scrolls (in screen heights).
   Bigger number = slower, longer animation. */
const PIN_VH = 10;

const clamp = (n, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));

const lead = ["We", "Build", "Digital", "Products", "That"];
const accent = "Drive Revenue";
// first letter number of each word, so the letters animate one after another across the whole heading
const charOffset = [...lead, accent].map((_, i, all) => all.slice(0, i).reduce((n, w) => n + w.length + 1, 0));

export default function Hero() {
  // pin = the whole banner fits on screen, so it can stay pinned while the animation plays.
  // Phones and short screens skip the pin: the same animation just plays as the page scrolls.
  const [pin, setPin] = useState(false);
  const pinRef = useRef(false);
  const wrap = useRef(null);
  const grid = useRef(null);
  const words = useRef([]); // heading pieces
  const sub = useRef(null); // paragraph + buttons
  const pill = useRef(null); // small label above the heading
  const art = useRef(null); // orbit
  const lines = useRef([]); // which line of the heading each word sits on

  useLayoutEffect(() => {
    let width = window.innerWidth;
    const decide = () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const need = grid.current ? grid.current.offsetHeight + 160 : Infinity;
     const next = false; // no pinning: next section scrolls in right away
      pinRef.current = next;
      setPin(next);
    };
    decide();
    // only re-decide when the width changes (phone address bars change the height while scrolling)
    const onResize = () => {
      if (window.innerWidth !== width) {
        width = window.innerWidth;
        decide();
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    // words on the same line move together, so work out the lines from where they sit
    const measure = () => {
      const tops = words.current.map((el) => (el ? el.offsetTop : 0));
      const uniq = [...new Set(tops)].sort((a, b) => a - b);
      lines.current = tops.map((t) => uniq.indexOf(t));
    };

    const update = () => {
      frame = 0;
      if (!wrap.current) return;
      const pinned = pinRef.current;
      let p = 0;
      if (reduce) p = 0;
      else if (pinned) {
        const r = wrap.current.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        p = total > 0 ? clamp(-r.top / total) : 0;
      } else {
        p = clamp(window.scrollY / (window.innerHeight * 0.2));
      }

      // heading: words shoot up and out of the banner one after another, getting blurry
      const rise = window.innerHeight * (pinned ? 0.6 : 0.3);
      words.current.forEach((el, i) => {
        if (!el) return;
        const line = lines.current[i] ?? 0;
        const t = clamp((p * 1.3 - 0.15 - line * 0.14) / 0.6);
        const e = t * t * (3 - 2 * t); // eased, so it starts gently and speeds up
        const dir = line % 2 === 0 ? -1 : 1; // lines slide away in opposite directions
        const x = dir * e * window.innerWidth * 0.14;
        const y = -e * rise * 0.5;
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${(1 - e * 0.14).toFixed(3)})`;
        el.style.filter = t > 0.02 ? `blur(${(t * 9).toFixed(1)}px)` : "";
        el.style.opacity = (1 - clamp((t - 0.55) / 0.45)).toFixed(3);
      });

      // everything below the heading fades out and slides up first
      if (sub.current) {
        const s = clamp(p / 0.3);
        sub.current.style.transform = `translate3d(0, ${(-s * 40).toFixed(1)}px, 0)`;
        sub.current.style.filter = s > 0.02 ? `blur(${(s * 5).toFixed(1)}px)` : "";
        sub.current.style.opacity = (1 - s).toFixed(3);
        sub.current.style.pointerEvents = s > 0.85 ? "none" : "";
        if (pill.current) {
          pill.current.style.transform = `translate3d(0, ${(-s * 50).toFixed(1)}px, 0)`;
          pill.current.style.opacity = (1 - s).toFixed(3);
        }
      }

      // orbit drifts up, shrinks a little and softens
      if (art.current && pinned) {
        art.current.style.transform = `translate3d(0, ${(-p * 60).toFixed(1)}px, 0) scale(${(1 + 0.22 * p).toFixed(3)}) rotate(${(p * 14).toFixed(1)}deg)`;
        art.current.style.opacity = (1 - 0.6 * p).toFixed(3);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      id="home"
      ref={wrap}
      className={`relative ${pin ? "h-[calc(100vh+var(--pin))]" : ""}`}
      style={{ "--pin": `${PIN_VH}vh` }}
    >
      <div
        className={`relative flex flex-col justify-center overflow-hidden bg-[linear-gradient(to_bottom,#bfe8f8_0%,#d3effb_80%,#ffffff_100%)] pb-[60px] pt-[90px] sm:pt-[98px] ${
          pin ? "sticky top-0 min-h-screen" : ""
        }`}
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

        <div ref={grid} className="relative mx-auto grid w-full max-w-[1760px] items-center gap-10 px-6 sm:px-10 lg:grid-cols-2 lg:gap-8 lg:px-16">
          {/* text */}
          <div className="text-center lg:text-left">
            <div ref={pill} className="will-change-transform">
              <span className="mb-5 inline-block animate-fade-up rounded-full border border-line bg-white px-4 py-1.5 text-[0.82rem] font-semibold text-brand">
                Global Digital Agency
              </span>
            </div>
            <style>{`
              @keyframes hero-char { from { opacity: 0; transform: translateY(0.55em) rotateX(-80deg) scale(0.9); filter: blur(10px); } to { opacity: 1; transform: none; filter: blur(0); } }
              @keyframes hero-wave { 0%, 100% { filter: brightness(1); } 50% { filter: brightness(1.45) saturate(1.2); } }
              .hero-char { display: inline-block; transform-origin: 50% 100%; animation: hero-char 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
              .hero-wave { animation: hero-char 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both, hero-wave 3.6s ease-in-out infinite; }
              @media (prefers-reduced-motion: reduce) { .hero-char, .hero-wave { animation: none; } }
            `}</style>
            <h1 className="text-[length:clamp(2.6rem,5.2vw,5.2rem)] font-extrabold leading-[1.1] tracking-tight text-navy [perspective:700px]">
              {lead.map((w, i) => (
                <span key={w}>
                  {/* outer span = scroll animation; letters inside fly in one by one on page load */}
                  <span ref={(el) => (words.current[i] = el)} className="inline-block will-change-transform">
                    {w.split("").map((ch, j) => (
                      <span key={j} className="hero-char" style={{ animationDelay: `${150 + (charOffset[i] + j) * 38}ms` }}>
                        {ch}
                      </span>
                    ))}
                  </span>{" "}
                </span>
              ))}
              <span
                ref={(el) => (words.current[lead.length] = el)}
                className="inline-block will-change-transform"
                aria-label={accent}
              >
                {accent.split("").map((ch, j) => {
                  const t = j / (accent.length - 1);
                  // colour runs from deep blue to bright cyan across the letters
                  const c = (a, b) => Math.round(a + (b - a) * t);
                  const d = 150 + (charOffset[lead.length] + j) * 38;
                  return (
                    <span
                      key={j}
                      aria-hidden="true"
                      className="hero-char hero-wave"
                      style={{ color: `rgb(${c(10, 0)}, ${c(74, 180)}, ${c(130, 224)})`, animationDelay: `${d}ms, ${2200 + j * 140}ms` }}
                    >
                      {ch === " " ? "\u00A0" : ch}
                    </span>
                  );
                })}
              </span>
            </h1>

            <div ref={sub} className="will-change-transform">
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
          </div>

          {/* animation */}
          <div ref={art} className="will-change-transform">
            <div className="animate-pop-in [animation-delay:300ms]">
              <Orbit />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}