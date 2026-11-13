import { useEffect, useRef, useState } from "react";

// Wrap anything in <Reveal> and it fades up when it scrolls into view.
//   delay = milliseconds to wait (use it to stagger cards)
//   from  = "up" (default) | "zoom" | "none"
//   as    = the tag to render, e.g. as="li"
const hidden = {
  up: "translate-y-8",
  zoom: "scale-95",
  none: "",
};

export default function Reveal({
  as: Tag = "div",
  delay = 0,
  from = "up",
  className = "",
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      {...rest}
      ref={ref}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms", ...style }}
      className={`transition duration-700 ease-out ${
        shown ? "translate-y-0 scale-100 opacity-100" : `opacity-0 ${hidden[from]}`
      } ${className}`}
    >
      {children}
    </Tag>
  );
}