import { Link } from "react-router-dom";
import { portfolioCategories } from "../data";
import Icon from "./Icon";
import Reveal from "./Reveal";

// Featured projects are taken straight from the Portfolio page data (src/data.js -> portfolioCategories).
// featured(1) -> 1 web + 1 app + 1 logo     featured(2) -> 2 web + 2 app + 2 logo
const LABEL = { web: "Web", app: "App", design: "Logo" };

export function featured(perCategory) {
  return portfolioCategories.flatMap((c) => {
    // prefer different types (Business, E-Commerce ... / Iconic Logo, 3D Animated Logo ...)
    const firstOfEach = c.items.filter((it, i, arr) => arr.findIndex((x) => x.sub === it.sub) === i);
    const rest = c.items.filter((it) => !firstOfEach.includes(it));
    return [...firstOfEach, ...rest].slice(0, perCategory).map((it) => ({ ...it, cat: c.id, label: LABEL[c.id] || c.label }));
  });
}

export default function FeaturedCard({ p, i = 0 }) {
  return (
    <Reveal from="zoom" delay={(i % 3) * 110} className="h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_10px_30px_rgba(7,48,90,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(7,48,90,0.14)]">
        <Link to="/portfolio" aria-label={`${p.title} in our portfolio`} className="relative block aspect-[4/3] w-full overflow-hidden">
          {p.image ? (
            <img src={p.image} alt={p.title} loading="lazy" className="size-full object-cover" />
          ) : (
            <div aria-hidden="true" className="grid size-full place-items-center bg-linear-to-br from-[#d6effa] via-[#8fd3ee] to-[#3aa7da]">
              <img src="/logo.png" alt="" className="w-[70px] opacity-90" />
            </div>
          )}
          <span className="absolute left-3.5 top-3.5 rounded-full bg-white px-3 py-[3px] text-[0.72rem] font-bold text-brand shadow-sm">
            {p.label}
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-between gap-3 px-[22px] py-5">
          <div className="min-w-0">
            <h3 className="truncate text-[1.05rem] font-bold text-navy">{p.title}</h3>
            <p className="text-[0.85rem] text-muted">{p.sub}</p>
          </div>
          {p.url && (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${p.title} (opens in a new tab)`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-linear-to-r from-navy to-aqua px-4 py-2 text-[0.78rem] font-bold text-white shadow-[0_6px_16px_rgba(10,111,174,0.25)] transition hover:-translate-y-0.5"
            >
              Visit Website <Icon name="arrow" size={14} />
            </a>
          )}
        </div>
      </article>
    </Reveal>
  );
}