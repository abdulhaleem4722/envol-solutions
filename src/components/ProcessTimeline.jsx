import { useEffect, useRef, useState } from "react";
import { steps } from "../data";
import Icon from "./Icon";

// Process steps that animate in a loop:
// circle 1 spins one full turn -> the line travels to circle 2 -> circle 2 spins -> line to circle 3 -> ... -> restart.
const SPIN_MS = 1300; // one full rotation of the active circle
const TRAVEL_MS = 900; // line travelling to the next circle
const RESET_MS = 700; // pause before the loop restarts

export default function ProcessTimeline() {
  const root = useRef(null);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0); // circle that is active / last reached
  const [phase, setPhase] = useState("spin"); // "spin" | "travel" | "reset"
  const [cycle, setCycle] = useState(0);
  const last = steps.length - 1;

  // only animate while the section is on screen
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t;
    if (phase === "spin") {
      t = setTimeout(() => {
        if (step < last) setPhase("travel");
        else setPhase("reset");
      }, SPIN_MS);
    } else if (phase === "travel") {
      t = setTimeout(() => {
        setStep((s) => s + 1);
        setPhase("spin");
      }, TRAVEL_MS);
    } else {
      t = setTimeout(() => {
        setStep(0);
        setCycle((c) => c + 1);
        setPhase("spin");
      }, RESET_MS);
    }
    return () => clearTimeout(t);
  }, [visible, phase, step, last]);

  // how far the bright line has filled, in "gaps" between circles (0 .. last)
  const progress = phase === "reset" ? last : phase === "travel" ? step + 1 : step;
  const gap = 100 / steps.length; // % of the width between two circle centres
  const lineEase = phase === "reset" ? "none" : `width ${TRAVEL_MS}ms linear`;

  return (
    <div ref={root} className="relative">
      <style>{`
        @keyframes proc-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes proc-pop { 0% { transform: scale(1); } 40% { transform: scale(1.12); } 100% { transform: scale(1); } }
        .proc-ring { animation: proc-spin ${SPIN_MS}ms cubic-bezier(0.55, 0.1, 0.3, 1) 1 both; }
        .proc-pop { animation: proc-pop ${SPIN_MS}ms ease-in-out 1; }
        @media (prefers-reduced-motion: reduce) { .proc-ring, .proc-pop { animation: none; } }
      `}</style>

      {/* the line between the circles (desktop) */}
      <div
        aria-hidden="true"
        className="absolute top-9 hidden h-0.5 rounded bg-line lg:block"
        style={{ left: `${gap / 2}%`, right: `${gap / 2}%` }}
      />
      <div
        aria-hidden="true"
        className="absolute top-9 hidden h-0.5 lg:block"
        style={{
          left: `${gap / 2}%`,
          width: `${(progress * gap).toFixed(3)}%`,
          transition: lineEase,
          opacity: phase === "reset" ? 0 : 1,
          // opacity fades out at reset so the line does not just snap back
          ...(phase === "reset" ? { transition: `opacity ${RESET_MS}ms ease` } : {}),
        }}
      >
        <div className="h-full w-full rounded-full bg-linear-to-r from-navy to-aqua" />
        {/* glowing dot at the front of the line */}
        <span className="absolute -right-1.5 -top-[5px] size-3 rounded-full bg-aqua shadow-[0_0_14px_3px_rgba(0,180,224,0.65)]" />
      </div>

      <ol className="relative grid gap-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {steps.map((s, i) => {
          const done = i < step || (i === step && phase !== "spin") || (phase === "reset" && true);
          const active = i === step && phase === "spin" && visible;
          return (
            <li key={s.title} className="text-center">
              <div className="relative mx-auto mb-[18px] size-[72px]">
                {/* spinning ring while this circle is active */}
                {active && (
                  <span
                    key={`${cycle}-${i}`}
                    aria-hidden="true"
                    className="proc-ring absolute -inset-[6px] rounded-full border-[3px] border-transparent border-r-aqua border-t-brand"
                  />
                )}
                <div
                  key={active ? `a-${cycle}-${i}` : `i-${i}`}
                  className={`${active ? "proc-pop" : ""} relative z-10 grid size-[72px] place-items-center rounded-full border-2 shadow-[0_10px_30px_rgba(7,48,90,0.08)] transition-colors duration-500 ${
                    done || active ? "border-aqua bg-linear-to-br from-navy to-aqua text-white" : "border-aqua bg-white text-brand"
                  }`}
                >
                  <Icon name={s.icon} size={26} />
                </div>
              </div>
              <h3 className="mb-1.5 text-[1.15rem] font-bold text-navy">{s.title}</h3>
              <p className="text-[0.92rem] text-muted">{s.text}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}