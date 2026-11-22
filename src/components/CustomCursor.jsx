import { useEffect, useRef } from "react";

const COLOR = "#0a86c8"; // site ka brand blue
const RING = 38;         // ring ka size (px)
const DOT = 8;           // dot ka size (px)

export default function CustomCursor() {
  const ring = useRef(null);
  const dot = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return; // phone/tablet par band
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("custom-cursor");

    const mouse = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let hover = false;
    let down = false;
    let started = false;
    let scale = 1;
    let stretch = 0;
    let angle = 0;
    let frame = 0;

    const show = (v) => {
      const o = v ? "1" : "0";
      if (ring.current) ring.current.style.opacity = o;
      if (dot.current) dot.current.style.opacity = o;
    };

    const move = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!started) {
        pos.x = mouse.x;
        pos.y = mouse.y;
        started = true;
        show(true);
      }
      hover = !!e.target.closest?.("a, button, [role='tab'], select, label, summary, input, textarea");
    };
    const leave = () => show(false);
    const enter = () => started && show(true);
    const press = () => (down = true);
    const release = () => (down = false);

    const tick = () => {
      const dx = mouse.x - pos.x;
      const dy = mouse.y - pos.y;
      pos.x += dx * 0.14; // chota number = ring zyada peeche rahegi
      pos.y += dy * 0.14;

      const dist = Math.hypot(dx, dy);
      if (dist > 1) angle = Math.atan2(dy, dx);
      const targetStretch = Math.min(dist / 80, 0.55); // ring kitni lambi ho
      stretch += (targetStretch - stretch) * 0.2;

      const targetScale = down ? 0.8 : hover ? 1.7 : 1;
      scale += (targetScale - scale) * 0.15;

      if (ring.current) {
        ring.current.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0) translate(-50%, -50%) rotate(${angle.toFixed(3)}rad) scale(${(scale * (1 + stretch)).toFixed(3)}, ${(scale * (1 - stretch * 0.45)).toFixed(3)})`;
        ring.current.style.backgroundColor = hover ? "rgba(10,134,200,0.15)" : "transparent";
      }
      if (dot.current) {
        dot.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%) scale(${hover ? 0.5 : 1})`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[200] rounded-full opacity-0 transition-[opacity,background-color] duration-300 will-change-transform"
        style={{ width: RING, height: RING, border: `2px solid ${COLOR}` }}
      />
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[200] rounded-full opacity-0 transition-opacity duration-300 will-change-transform"
        style={{ width: DOT, height: DOT, background: "#07305a" }}
      />
    </>
  );
}