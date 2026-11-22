import { useEffect, useRef } from "react";

// Dot-grid jo cursor ke paas roshan hota hai.
const GAP = 32;     // dots ke beech doori (px)
const RADIUS = 130; // roshan hone wala area. Chota = kam area, bara = zyada area
const DOT = 1.6;    // dot ka base size

export default function CursorSpotlight() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, frame = 0;
    const target = { x: -9999, y: -9999 };
    const pos = { x: -9999, y: -9999 };
    let strength = 0;
    let targetStrength = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const move = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      targetStrength = 1;
      if (pos.x < -999) { pos.x = target.x; pos.y = target.y; }
    };
    const leave = () => { targetStrength = 0; };

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.16; // smoothness: chota = zyada smooth
      pos.y += (target.y - pos.y) * 0.16;
      strength += (targetStrength - strength) * 0.08;

      ctx.clearRect(0, 0, w, h);
      if (strength > 0.01) {
        const gx0 = Math.floor((pos.x - RADIUS) / GAP);
        const gx1 = Math.ceil((pos.x + RADIUS) / GAP);
        const gy0 = Math.floor((pos.y - RADIUS) / GAP);
        const gy1 = Math.ceil((pos.y + RADIUS) / GAP);
        for (let gx = gx0; gx <= gx1; gx++) {
          for (let gy = gy0; gy <= gy1; gy++) {
            const x = gx * GAP;
            const y = gy * GAP;
            const d = Math.hypot(x - pos.x, y - pos.y);
            if (d > RADIUS) continue;
            const t = 1 - d / RADIUS;
            const e = t * t;
            const alpha = (0.06 + e * 0.85) * strength;
            ctx.beginPath();
            ctx.arc(x, y, DOT * (0.6 + e * 1.5), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,180,224,${alpha.toFixed(3)})`; // aqua: light aur dark dono par dikhta hai
            ctx.fill();
          }
        }
      }
      frame = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[45] size-full"
    />
  );
}