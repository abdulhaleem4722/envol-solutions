import { useEffect, useRef, useState } from "react";

/* =====================================================================
   Loader.jsx: opening animation (plays on every full page load / refresh).
   The big brand name starts dim. A bright wave fills it from the bottom up
   while "loading... 0 to 100" counts. At 100 the name zooms out, fades away
   and the site appears. Change the texts or the speed here:
   ===================================================================== */
const NAME = "Envol Solutions";
const TAGLINE = "Shaping Digital Realities";
const COUNT_MS = 3000; // how long the fill / count takes (ms)
const ZOOM_MS = 750; // zoom + fade of the name at 100% (ms)
const FADE_MS = 650; // fade of the dark screen at the end (ms)

// viewBox is 1000 x 220. The wave is a sine path that slides sideways forever.
const W = 1000;
const H = 220;
const WAVE_LEN = 500;
const AMP = 11;
function wavePath() {
  let d = `M0 ${AMP}`;
  for (let x = 0; x <= WAVE_LEN * 3; x += 10) {
    d += ` L${x} ${(AMP + Math.sin((x / WAVE_LEN) * Math.PI * 2) * AMP).toFixed(2)}`;
  }
  return `${d} L${WAVE_LEN * 3} ${H * 2} L0 ${H * 2} Z`;
}
const WAVE = wavePath();

export default function Loader() {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading -> zoom -> fade -> gone
  const started = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 600 : COUNT_MS;
    const t0 = performance.now();
    let raf;
    const timers = [];

    const tick = (now) => {
      const t = Math.min((now - t0) / total, 1);
      // a little uneven, like a real load: quick, slower in the middle, quick at the end
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const p = Math.round((0.35 * t + 0.65 * eased) * 100);
      setPct(p);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!started.current) {
        started.current = true;
        setPct(100);
        const zoom = reduce ? 0 : ZOOM_MS;
        timers.push(setTimeout(() => setPhase("zoom"), 250));
        timers.push(setTimeout(() => setPhase("fade"), 250 + zoom * 0.55));
        timers.push(setTimeout(() => setPhase("gone"), 250 + zoom * 0.55 + (reduce ? 150 : FADE_MS)));
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);

  // the page behind cannot scroll while the loader is on screen
  useEffect(() => {
    if (phase === "gone") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phase]);

  if (phase === "gone") return null;

  const leaving = phase === "zoom" || phase === "fade";
  const waveY = 245 - (pct / 100) * 275; // wave rises from below the word to above it

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Loading ${pct}%`}
      className="fixed inset-0 z-[300] grid place-items-center overflow-hidden bg-navy-deep"
      style={{ opacity: phase === "fade" ? 0 : 1, transition: `opacity ${FADE_MS}ms ease` }}
    >
      <style>{`
        @keyframes ld-wave { from { transform: translateX(0); } to { transform: translateX(-${WAVE_LEN}px); } }
        @keyframes ld-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { .ld-wave { animation: none !important; } }
      `}</style>

      {/* soft glows */}
      <div aria-hidden="true" className="absolute -left-24 top-1/4 size-[420px] rounded-full bg-aqua/15 blur-[120px]" />
      <div aria-hidden="true" className="absolute -right-24 bottom-0 size-[460px] rounded-full bg-brand/20 blur-[130px]" />

      <div
        className="relative w-[min(92vw,1100px)]"
        style={{
          transform: leaving ? "scale(1.55)" : "scale(1)",
          opacity: leaving ? 0 : 1,
          transition: leaving ? `transform ${ZOOM_MS}ms cubic-bezier(0.7,0,0.84,0), opacity ${ZOOM_MS * 0.75}ms ease ${ZOOM_MS * 0.25}ms` : "none",
        }}
      >
        <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-label={NAME}>
          <defs>
            <clipPath id="ld-word">
              <text
                x={W / 2}
                y="165"
                textAnchor="middle"
                textLength="940"
                lengthAdjust="spacingAndGlyphs"
                fontSize="150"
                fontWeight="800"
                style={{ fontFamily: "inherit", letterSpacing: "-0.02em" }}
              >
                {NAME}
              </text>
            </clipPath>
            <linearGradient id="ld-fill" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#00b4e0" />
              <stop offset="0.55" stopColor="#bfe8f8" />
              <stop offset="1" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <g clipPath="url(#ld-word)">
            {/* dim word */}
            <rect x="0" y="0" width={W} height={H} fill="rgba(255,255,255,0.13)" />
            {/* bright wave that rises with the percentage */}
            <g style={{ transform: `translateY(${waveY}px)` }}>
              <g className="ld-wave" style={{ animation: "ld-wave 1.6s linear infinite" }}>
                <path d={WAVE} fill="url(#ld-fill)" />
              </g>
            </g>
          </g>
        </svg>

        {/* tagline + counter */}
        <div className="mt-1 flex items-start justify-between gap-4 px-[3%]">
          <p
            className="text-[length:clamp(0.8rem,1.7vw,1.1rem)] font-semibold tracking-[0.12em] text-[#bfe8f8]/90 opacity-0"
            style={{ animation: "ld-fade 0.9s ease 0.5s forwards" }}
          >
            {TAGLINE}
          </p>
          <p className="shrink-0 text-[length:clamp(0.8rem,1.6vw,1rem)] font-medium tabular-nums text-white/80">
            loading... <span className="ml-1.5 inline-block min-w-[2.2ch] text-right">{pct}</span>
          </p>
        </div>
      </div>
    </div>
  );
}