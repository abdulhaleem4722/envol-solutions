// Shared Tailwind class strings used across components.

export const container = "mx-auto w-full max-w-[1160px] px-5";

export const gradBg = "bg-linear-to-r from-navy via-brand to-aqua";

export const gradText = "bg-linear-to-r from-navy via-brand to-aqua bg-clip-text text-transparent";

const variants = {
  primary: `${gradBg} border-transparent text-white shadow-[0_8px_20px_rgba(10,134,200,0.3)]`,
  ghost: "border-line bg-white text-navy hover:border-brand",
  white: "border-transparent bg-white text-navy",
};

export const btn = (variant = "primary", large = false) =>
  `inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] font-semibold transition duration-200 hover:-translate-y-0.5 ${
    large ? "px-7 py-3.5 text-base" : "px-[22px] py-[11px] text-[0.95rem]"
  } ${variants[variant]}`;

export const card =
  "h-full rounded-[18px] border border-line bg-white p-7 shadow-[0_10px_30px_rgba(7,48,90,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#b9def0] hover:shadow-[0_18px_45px_rgba(7,48,90,0.14)]";

export const sectionPad = "py-16 sm:py-[90px]";

/* ---------- hover effect (NEW) ----------
   barFx  = a gradient line that grows along the bottom of the card on hover.
   cardFx = use together with `card`:  className={`${card} ${cardFx}`}
            (also makes the card a "group" so the icon and title inside can react).
   iconFx = put on the small icon box inside the card: it fills with the brand colour on hover.
   iconPop = optional extra: icon box grows and tilts (do NOT use on icons that have animate-float). */
export const barFx =
  "after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:origin-left after:scale-x-0 after:bg-linear-to-r after:from-navy after:via-brand after:to-aqua after:transition-transform after:duration-500 hover:after:scale-x-100";

export const cardFx = `group relative overflow-hidden hover:border-brand ${barFx}`;

export const iconFx = "transition duration-300 group-hover:bg-brand group-hover:text-white";

export const iconPop = "group-hover:scale-110 group-hover:-rotate-6";
