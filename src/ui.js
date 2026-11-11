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
  "rounded-[18px] border border-line bg-white p-7 shadow-[0_10px_30px_rgba(7,48,90,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#b9def0] hover:shadow-[0_18px_45px_rgba(7,48,90,0.14)]";

export const sectionPad = "py-16 sm:py-[90px]";