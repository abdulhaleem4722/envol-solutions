import { useLayoutEffect, useRef } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiShopify,
  SiWordpress,
  SiLaravel,
  SiPhp,
  SiFigma,
  SiWix,
} from "react-icons/si";
import { brand } from "../data";

// Drawing space (the SVG viewBox). Everything scales from this.
const W = 560;
const H = 440;
const CX = W / 2;
const CY = H / 2;
const TILT = (-24 * Math.PI) / 180;

// rx / ry = ellipse radii, dur = seconds per full turn, dir = 1 or -1
const rings = [
  { rx: 150, ry: 76, dur: 24, dir: 1 },
  { rx: 210, ry: 106, dur: 36, dir: -1 },
  { rx: 262, ry: 132, dur: 50, dir: 1 },
];

// ring = index in rings, phase = starting position (0 to 1) around the ring,
// role = small label shown when the icon is hovered
const items = [
  { name: "Next.js", role: "framework", Icon: SiNextdotjs, ring: 0, phase: 0.0 },
  { name: "Figma", role: "design", Icon: SiFigma, ring: 0, phase: 0.5 },
  { name: "React", role: "frontend", Icon: SiReact, ring: 1, phase: 0.08 },
  { name: "Laravel", role: "backend", Icon: SiLaravel, ring: 1, phase: 0.33 },
  { name: "Node.js", role: "runtime", Icon: SiNodedotjs, ring: 1, phase: 0.58 },
  { name: "Shopify", role: "e-commerce", Icon: SiShopify, ring: 1, phase: 0.83 },
  { name: "WordPress", role: "cms", Icon: SiWordpress, ring: 2, phase: 0.15 },
  { name: "PHP", role: "backend", Icon: SiPhp, ring: 2, phase: 0.5 },
  { name: "Wix", role: "site builder", Icon: SiWix, ring: 2, phase: 0.82 },
];

// Where an item sits at time t (seconds), in drawing units.
// near: 0 = far side of the orbit, 1 = near side.
function place(item, t) {
  const r = rings[item.ring];
  const a = (item.phase + (r.dir * t) / r.dur) * Math.PI * 2;
  const x0 = r.rx * Math.cos(a);
  const y0 = r.ry * Math.sin(a);
  return {
    x: CX + x0 * Math.cos(TILT) - y0 * Math.sin(TILT),
    y: CY + x0 * Math.sin(TILT) + y0 * Math.cos(TILT),
    near: (Math.sin(a) + 1) / 2,
  };
}

export default function Orbit() {
  const box = useRef(null);
  const refs = useRef([]);
  const hover = useRef(-1); // index of the icon under the mouse, or -1

  // Move every icon with transform only (runs on the GPU, no layout work).
  useLayoutEffect(() => {
    const el = box.current;
    const lastZ = [];
    const glow = items.map(() => 0); // 0..1 hover amount per icon, eased
    let scale = el.clientWidth / W;
    let clock = 0; // orbit time in seconds (stops advancing while hovering)
    let speed = 1; // 1 = normal, 0 = paused, eased
    let last = performance.now();
    let frame;

    const draw = (dt) => {
      items.forEach((item, i) => {
        const node = refs.current[i];
        if (!node) return;
        glow[i] += ((hover.current === i ? 1 : 0) - glow[i]) * (1 - Math.exp(-dt * 12));
        const g = glow[i];
        const p = place(item, clock);
        const s = (0.76 + 0.3 * p.near) * (1 + 0.2 * g);
        const o = 0.55 + 0.45 * p.near;
        node.style.transform = `translate3d(${(p.x * scale).toFixed(2)}px, ${(p.y * scale).toFixed(2)}px, 0) translate(-50%, -50%) scale(${s.toFixed(3)})`;
        node.style.opacity = (o + (1 - o) * g).toFixed(3);
        const z = g > 0.05 ? 40 : p.near > 0.5 ? 30 : 5;
        if (lastZ[i] !== z) {
          node.style.zIndex = z;
          lastZ[i] = z;
        }
      });
    };

    const ro = new ResizeObserver(() => {
      scale = el.clientWidth / W;
      draw(0);
    });
    ro.observe(el);
    draw(0);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      const tick = (now) => {
        const dt = Math.min((now - last) / 1000, 0.1);
        last = now;
        const target = hover.current >= 0 ? 0 : 1;
        speed += (target - speed) * (1 - Math.exp(-dt * 7));
        clock += dt * speed;
        draw(dt);
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={box}
      className="relative mx-auto aspect-[560/440] w-full max-w-[860px] lg:ml-auto lg:mr-0"
      role="group"
      aria-label="Technologies we build with: React, Next.js, Node.js, Laravel, PHP, WordPress, Shopify, Wix and Figma"
    >
      {/* orbit lines */}
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden="true">
        {rings.map((r, i) => (
          <ellipse
            key={i}
            cx={CX}
            cy={CY}
            rx={r.rx}
            ry={r.ry}
            transform={`rotate(-24 ${CX} ${CY})`}
            fill="none"
            stroke={i === 1 ? "rgba(10,134,200,0.55)" : "rgba(7,48,90,0.22)"}
            strokeWidth="1.2"
            strokeDasharray={i === 0 ? "3 7" : undefined}
          />
        ))}
      </svg>

      {/* centre: brand logo */}
      <div className="absolute left-1/2 top-1/2 z-20 aspect-square w-[25%] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute -inset-[40%] animate-pulse rounded-full bg-[radial-gradient(circle,rgba(0,180,224,0.38),transparent_65%)]" />
        <div className="relative grid size-full place-items-center rounded-full bg-white shadow-[0_18px_40px_rgba(7,48,90,0.22)] ring-1 ring-line">
          <img src={brand.logo} alt="" className="w-[58%]" />
        </div>
      </div>

      {/* orbiting technologies */}
      {items.map((item, i) => (
        <div
          key={item.name}
          ref={(el) => (refs.current[i] = el)}
          onPointerEnter={() => (hover.current = i)}
          onPointerLeave={() => {
            if (hover.current === i) hover.current = -1;
          }}
          className="group absolute left-0 top-0 grid aspect-square w-[12%] cursor-pointer place-items-center rounded-full bg-white text-navy shadow-[0_10px_24px_rgba(7,48,90,0.18)] transition-[background-color,color,box-shadow] duration-200 will-change-[transform,opacity] hover:bg-brand hover:text-white hover:shadow-[0_14px_30px_rgba(10,134,200,0.45)]"
        >
          <item.Icon className="size-[48%]" aria-hidden="true" />
          <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-navy px-2.5 py-1 text-[0.7rem] font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
            {item.name} <b className="font-medium text-[#9fdcf2]">· {item.role}</b>
          </span>
        </div>
      ))}
    </div>
  );
}