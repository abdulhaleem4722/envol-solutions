import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { pitch } from "../data";
import Icon from "./Icon";

/* How much scrolling the whole story takes (in screen heights). Bigger = slower. */
const SCROLL_VH = 320;

const clamp = (n, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));
const seg = (p, a, b) => clamp((p - a) / (b - a)); // 0..1 between two scroll points
const ease = (t) => 1 - Math.pow(1 - t, 3);

// Splits a sentence into words so each one can fade in on its own.
function Words({ text, refs }) {
  return text.split(" ").map((w, i, all) => (
    <span key={i}>
      <span ref={(el) => (refs.current[i] = el)} className="inline-block will-change-transform">
        {w}
      </span>
      {i < all.length - 1 && " "}
    </span>
  ));
}

/* tiny icons used inside the cards */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
const Svg = ({ children, className = "size-[18px]" }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    {children}
  </svg>
);

function Star() {
  return (
    <svg viewBox="0 0 24 24" className="size-[22px] text-[#e8714f]" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
      {[0, 45, 90, 135].map((r) => (
        <path key={r} d="M12 3v18" transform={`rotate(${r} 12 12)`} />
      ))}
    </svg>
  );
}

/* the "problem" cards: chat bubble, AI chat, slide and a sticky note */
function Cards({ refs }) {
  const r = (i) => (el) => (refs.current[i] = el);
  return (
    <div className="grid w-full max-w-[1180px] gap-5 lg:grid-cols-[0.85fr_1.05fr_1.4fr_0.7fr] lg:items-center lg:gap-6">
      {/* 1. message bubble */}
      <div ref={r(0)} className="will-change-transform lg:mt-16">
        <div className="relative ml-auto w-fit max-w-[290px] rounded-[18px] bg-[#d9fdd3] px-4 pb-2 pt-3 text-[1.02rem] leading-snug text-[#1b2a20] shadow-[0_2px_6px_rgba(0,0,0,0.08)] max-lg:mr-auto max-lg:ml-0">
          {pitch.bubble}
          <span className="mt-0.5 flex items-center justify-end gap-1 text-[0.72rem] text-[#6b7c72]">
            {pitch.bubbleTime}
            <svg viewBox="0 0 18 12" className="w-[16px] text-[#53bdeb]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M1 6.5l3.2 3.2L11 2.5M7 9.7l.6.6L14.5 2.5" />
            </svg>
          </span>
          <span aria-hidden="true" className="absolute -right-[7px] bottom-0 h-[14px] w-[10px] bg-[#d9fdd3] [clip-path:polygon(0_0,0_100%,100%_100%)]" />
        </div>
      </div>

      {/* 2. AI chat window */}
      <div ref={r(1)} className="will-change-transform">
        <div className="rounded-2xl border border-[#e4e4e4] bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
          <p className="ml-auto w-fit max-w-[88%] rounded-2xl bg-[#f3f3f3] px-4 py-3 text-[1rem] leading-snug text-[#1b1b1b]">
            {pitch.userMessage}
          </p>
          <div className="mt-5 px-1">
            <Star />
            <p className="mt-2 text-[1rem] text-[#222]">{pitch.reply}</p>
          </div>
          <div className="mt-5 flex items-center gap-4 border-t border-[#ececec] pt-3 text-[#8a8a8a]">
            <Svg><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V6a2 2 0 012-2h9" /></Svg>
            <Svg><path d="M7 11v9H4v-9zM7 11l4-7c1.6 0 2.6 1.3 2.2 2.8L12.8 9H19a2 2 0 011.9 2.6l-1.7 6.5A2 2 0 0117.3 20H7" /></Svg>
            <Svg className="size-[18px] rotate-180"><path d="M7 11v9H4v-9zM7 11l4-7c1.6 0 2.6 1.3 2.2 2.8L12.8 9H19a2 2 0 011.9 2.6l-1.7 6.5A2 2 0 0117.3 20H7" /></Svg>
            <Svg><path d="M20 11a8 8 0 10-2.3 6.3M20 4v7h-7" /></Svg>
            <span className="text-[0.8rem]">{pitch.replyTime}</span>
          </div>
        </div>
      </div>

      {/* 3. slide */}
      <div ref={r(2)} className="will-change-transform">
        <div className="overflow-hidden rounded-md border border-[#d9dce1] bg-[#f4f6fa] shadow-[0_3px_12px_rgba(0,0,0,0.12)]">
          <div className="flex h-[22px] items-center gap-1.5 px-2.5" aria-hidden="true">
            <span className="mr-1 size-2.5 rounded-sm bg-[#f5c518]" />
            <span className="text-[0.5rem] font-medium text-[#444]">{pitch.slideTitle}</span>
            {[18, 12, 14, 16, 18, 14].map((w, i) => (
              <span key={i} className="h-[3px] rounded-full bg-[#c9cdd4]" style={{ width: w }} />
            ))}
            <span className="ml-auto h-3.5 w-9 rounded-full bg-[#c8dcf7]" />
          </div>
          <div className="mx-[7%] mb-0 mt-1 bg-[#ffdd00] px-[7%] py-[7%]">
            <div className="relative">
              <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute -right-3 top-0 w-[62%] fill-[#f2efe0]">
                <g transform="rotate(-45 50 50)">
                  <rect x="4" y="38" width="66" height="24" />
                  <polygon points="60,6 100,50 60,94" />
                </g>
              </svg>
              <div className="relative space-y-3 text-[0.98rem] leading-snug text-[#1a1a1a]">
                {pitch.slide.map((t, i) => (
                  <p key={i}>{t}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="px-3 pb-1.5 pt-2 text-[0.45rem] text-[#8a8f98]">Click to add speaker notes</div>
        </div>
      </div>

      {/* 4. sticky note */}
      <div ref={r(3)} className="will-change-transform max-lg:hidden">
        <div className="rotate-[3deg] bg-[#fcf2a0] px-5 pb-8 pt-5 font-hand text-[1.3rem] leading-[1.25] text-[#38361f] shadow-[0_10px_20px_rgba(0,0,0,0.12)]">
          {pitch.note.map((t, i) => (
            <p key={i} className={i ? "mt-4" : ""}>
              {t}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

const headingCls =
  "max-w-[940px] text-center text-[length:clamp(1.9rem,4.6vw,4rem)] font-semibold leading-[1.1] tracking-tight text-navy";
const blueHeadingCls =
  "mb-7 text-center text-[length:clamp(2rem,4.4vw,3.6rem)] font-semibold leading-[1.1] tracking-tight text-white";
const blueBg = "bg-[linear-gradient(135deg,#052744_0%,#07305a_45%,#0a6fae_100%)]";

export default function Pitch() {
  const [simple, setSimple] = useState(false); // no pinning: reduced motion or very short screens
  const simpleRef = useRef(false);
  const wrap = useRef(null);
  const whiteLayer = useRef(null);
  const blueLayer = useRef(null);
  const hA = useRef([]);
  const hB = useRef([]);
  const cards = useRef([]);
  const paras = useRef([]);
  const fit = useRef(null);
  const stage = useRef(null);

  useLayoutEffect(() => {
    let width = window.innerWidth;
    const decide = () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const next = reduce || window.innerHeight < 560;
      simpleRef.current = next;
      setSimple(next);
    };
    decide();
    const onResize = () => {
      if (window.innerWidth !== width) {
        width = window.innerWidth;
        decide();
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Shrink the question + cards a little on short screens so they always fit.
  // The room is measured from the pinned stage (100svh = a stable height that does not
  // jump when a phone's browser bar moves), and it never shrinks below 70%.
  useLayoutEffect(() => {
    if (simple) return;
    const apply = () => {
      const el = fit.current;
      const st = stage.current;
      if (!el || !st) return;
      el.style.transform = "";
      const room = st.clientHeight - 120;
      const s = clamp(room / el.offsetHeight, 0.7, 1);
      el.style.transform = s < 1 ? `scale(${s.toFixed(3)})` : "";
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(stage.current);
    ro.observe(fit.current);
    document.fonts?.ready.then(apply);
    return () => ro.disconnect();
  }, [simple]);

  useLayoutEffect(() => {
    if (simple) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!wrap.current) return;
      const r = wrap.current.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? clamp(-r.top / total) : 0;

      // 1) the big question appears word by word
      const nA = hA.current.length;
      hA.current.forEach((el, i) => {
        if (!el) return;
        const a = 0.02 + (i / nA) * 0.16;
        const t = seg(p, a, a + 0.05);
        el.style.opacity = (0.12 + 0.88 * t).toFixed(3);
        el.style.transform = `translate3d(0, ${((1 - t) * 10).toFixed(1)}px, 0)`;
      });

      // 2) bubbles, card and note pop in one by one
      [0.2, 0.29, 0.38, 0.47].forEach((start, i) => {
        const el = cards.current[i];
        if (!el) return;
        const t = ease(seg(p, start, start + 0.07));
        el.style.opacity = t.toFixed(3);
        el.style.transform = `translate3d(0, ${((1 - t) * 30).toFixed(1)}px, 0) scale(${(0.96 + 0.04 * t).toFixed(3)})`;
      });

      // 3) the problem fades away while a blue circle grows up from the bottom
      const f = seg(p, 0.6, 0.76);
      if (whiteLayer.current) {
        whiteLayer.current.style.opacity = (1 - f).toFixed(3);
        whiteLayer.current.style.transform = `translate3d(0, ${(-f * 40).toFixed(1)}px, 0)`;
      }
      const e = ease(seg(p, 0.52, 0.76));
      if (blueLayer.current) {
        const size = (e * 125).toFixed(2);
        blueLayer.current.style.clipPath = `ellipse(${size}% ${size}% at 50% 100%)`;
      }

      // 4) "That's where we come in" and the three paragraphs
      const nB = hB.current.length;
      hB.current.forEach((el, i) => {
        if (!el) return;
        const a = 0.76 + (i / nB) * 0.09;
        const t = seg(p, a, a + 0.04);
        el.style.opacity = (0.1 + 0.9 * t).toFixed(3);
        el.style.transform = `translate3d(0, ${((1 - t) * 10).toFixed(1)}px, 0)`;
      });
      [0.85, 0.9, 0.95].forEach((start, i) => {
        const el = paras.current[i];
        if (!el) return;
        const t = ease(seg(p, start, start + 0.05));
        el.style.opacity = t.toFixed(3);
        el.style.transform = `translate3d(0, ${((1 - t) * 18).toFixed(1)}px, 0)`;
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [simple]);

  const solution = (
    <div className="mx-auto w-full max-w-[900px] px-6">
      <h2 className={blueHeadingCls}>
        <Words text={pitch.solutionHeading} refs={hB} />
      </h2>
      <div className="mx-auto grid max-w-[660px] gap-4 text-[length:clamp(0.98rem,1.5vw,1.2rem)] leading-relaxed text-white/90">
        {pitch.paragraphs.map((t, i) => (
          <p key={i} ref={(el) => (paras.current[i] = el)} className="will-change-transform">
            {t}
          </p>
        ))}
      </div>
    </div>
  );

  const glow = (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/3 size-[520px] -translate-x-1/2 rounded-full bg-aqua/20 blur-3xl"
    />
  );

  /* simple version: two plain sections, nothing pinned */
  if (simple) {
    return (
      <>
        <section className="bg-white px-6 py-20">
          <div className="mx-auto flex flex-col items-center gap-10">
            <h2 className={headingCls}>{pitch.heading}</h2>
            <Cards refs={cards} />
          </div>
        </section>
        <section className={`relative overflow-hidden py-24 ${blueBg}`}>
          {glow}
          <div className="relative">{solution}</div>
        </section>
      </>
    );
  }

  return (
    <section ref={wrap} style={{ height: `calc(100svh + ${SCROLL_VH}svh)` }} className="relative">
      <div ref={stage} className="sticky top-0 h-[100svh] overflow-hidden bg-white">
        {/* problem */}
        <div
          ref={whiteLayer}
          className="absolute inset-0 flex items-center justify-center px-6 pb-6 pt-20 will-change-transform"
        >
          <div ref={fit} className="flex w-full flex-col items-center gap-8 sm:gap-12">
            <h2 className={headingCls}>
              <Words text={pitch.heading} refs={hA} />
            </h2>
            <Cards refs={cards} />
          </div>
        </div>

        {/* solution: revealed by the growing blue circle */}
        <div
          ref={blueLayer}
          className={`absolute inset-0 flex items-center justify-center ${blueBg}`}
          style={{ clipPath: "ellipse(0% 0% at 50% 100%)" }}
        >
          {glow}
          <div className="relative w-full">{solution}</div>
        </div>
      </div>
    </section>
  );
}