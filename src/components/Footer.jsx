import { brand, footerLinks } from "../data";
import { container } from "../ui";
import Reveal from "./Reveal";

export default function Footer() {
  return (
    <footer className="bg-navy-deep pt-16 text-[#b9d3e6]">
      <div className={`${container} grid gap-9 pb-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]`}>
        <Reveal>
          <a href="#home" className="mb-3.5 inline-flex items-center gap-2.5 text-lg font-extrabold text-white">
            <img src={brand.logo} alt="" width="38" height="38" />
            <span>{brand.name}</span>
          </a>
          <p className="max-w-[320px] text-[0.9rem]">
            We build digital products that drive revenue. From websites to apps
            to full-scale marketing, we deliver results for clients around the
            world.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h4 className="mb-3.5 text-[0.95rem] font-bold text-white">Quick Links</h4>
          <ul>
            {footerLinks.quick.map((l) => (
              <li key={l.href} className="mb-2 text-[0.9rem]">
                <a href={l.href} className="hover:text-aqua">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={200}>
          <h4 className="mb-3.5 text-[0.95rem] font-bold text-white">Services</h4>
          <ul>
            {footerLinks.services.map((s) => (
              <li key={s} className="mb-2 text-[0.9rem]">
                <a href="#services" className="hover:text-aqua">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={300}>
          <h4 className="mb-3.5 text-[0.95rem] font-bold text-white">Contact</h4>
          <ul>
            <li className="mb-2 text-[0.9rem]">
              <a href={`mailto:${brand.email}`} className="hover:text-aqua">
                {brand.email}
              </a>
            </li>
          </ul>
        </Reveal>
      </div>

      <div className={`${container} flex flex-wrap justify-between gap-2.5 border-t border-white/10 py-[22px] text-[0.82rem]`}>
        <span>
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </span>
        <span>
          <a href="#home" className="hover:text-aqua">Privacy Policy</a> ·{" "}
          <a href="#home" className="hover:text-aqua">Terms of Service</a>
        </span>
      </div>
    </footer>
  );
}