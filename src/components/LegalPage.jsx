import { container } from "../ui";
import Reveal from "./Reveal";

// Shared layout for the Privacy Policy and Terms & Conditions pages.
// The text itself lives in src/legalData.js.

const heroBg =
  "relative overflow-hidden bg-[linear-gradient(to_bottom,#bfe8f8_0%,#d3effb_60%,#ffffff_100%)] pb-14 pt-[134px] text-center sm:pt-[166px]";

// turns **bold**, https:// links and email addresses inside a text into real elements
function inline(text) {
  return text.split(/(\*\*[^*]+\*\*|https?:\/\/[^\s]+|[\w.+-]+@[\w-]+\.[\w.]+)/g).map((part, i) => {
    if (!part) return null;
    if (part.startsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-navy">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (/^https?:\/\//.test(part)) {
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="break-all font-semibold text-brand underline underline-offset-2 hover:text-navy">
          {part}
        </a>
      );
    }
    if (part.includes("@")) {
      return (
        <a key={i} href={`mailto:${part}`} className="font-semibold text-brand underline underline-offset-2 hover:text-navy">
          {part}
        </a>
      );
    }
    return part;
  });
}

function Block({ b }) {
  if (b.h) return <h3 className="mb-2 mt-6 text-[1.1rem] font-bold text-navy">{b.h}</h3>;
  if (b.p) return <p className="mb-4 text-[0.98rem] leading-relaxed text-muted">{inline(b.p)}</p>;
  if (b.ul)
    return (
      <ul className="mb-4 grid gap-2 pl-1">
        {b.ul.map((li) => (
          <li key={li} className="flex gap-3 text-[0.98rem] leading-relaxed text-muted">
            <span aria-hidden="true" className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-aqua" />
            <span>{inline(li)}</span>
          </li>
        ))}
      </ul>
    );
  if (b.lines)
    return (
      <div className="mb-4 rounded-2xl border border-line bg-sky-faint px-6 py-5">
        {b.lines.map((l) => (
          <p key={l} className="text-[0.98rem] leading-relaxed text-ink">
            {inline(l)}
          </p>
        ))}
      </div>
    );
  return null;
}

export default function LegalPage({ doc }) {
  return (
    <>
      <section className={heroBg}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-[150px] h-[700px] bg-[radial-gradient(ellipse_at_center,rgba(0,180,224,0.30),transparent_65%)]" />
        <div className="relative mx-auto max-w-[880px] px-6">
          <span className="mb-6 inline-block animate-fade-up rounded-full border border-line bg-white px-4 py-1.5 text-[0.82rem] font-semibold text-brand">
            Legal
          </span>
          <h1 className="animate-fade-up text-[length:clamp(2.2rem,5vw,3.8rem)] font-extrabold leading-[1.1] tracking-tight text-navy [animation-delay:120ms]">
            {doc.title}
          </h1>
          <p className="mt-5 animate-fade-up text-[0.95rem] text-muted [animation-delay:240ms]">
            <strong className="text-navy">Effective Date:</strong> {doc.effective}
            <span className="mx-3" aria-hidden="true">·</span>
            <strong className="text-navy">Last Updated:</strong> {doc.updated}
          </p>
        </div>
      </section>

      <section className="pb-20 pt-6 sm:pb-[90px]">
        <div className={container}>
          <article className="mx-auto max-w-[820px]">
            {doc.sections.map((s) => (
              <Reveal key={s.title} className="mb-10">
                <h2 className="mb-4 border-b border-line pb-3 text-[1.4rem] font-bold tracking-tight text-navy">{s.title}</h2>
                {s.blocks.map((b, i) => (
                  <Block key={i} b={b} />
                ))}
              </Reveal>
            ))}
            <p className="border-t border-line pt-6 text-center text-[0.9rem] font-semibold text-navy">{doc.footer}</p>
          </article>
        </div>
      </section>
    </>
  );
}
