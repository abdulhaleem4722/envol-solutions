import { Link } from "react-router-dom";
import { brand, servicePages } from "../data";
import { container } from "../ui";
import Reveal from "./Reveal";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact Us", href: "/contact" },
];

const heading = "mb-3.5 text-[0.95rem] font-bold text-white";
const small = "mb-0.5 block text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#7fb6d4]";

export default function Footer() {
  return (
    <footer className="bg-navy-deep pt-16 text-[#b9d3e6]">
      <div className={`${container} grid gap-9 pb-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.2fr_1.3fr]`}>
        {/* column 1: brand */}
        <Reveal>
          <Link to="/" className="mb-3.5 inline-flex items-center gap-2.5 text-lg font-extrabold text-white">
            <img src={brand.logo} alt="" width="38" height="38" />
            <span>{brand.name}</span>
          </Link>
          <p className="mb-2 text-[0.95rem] font-bold text-white">Elevate. Innovate. Envol With Us.</p>
          <p className="max-w-[330px] text-[0.9rem]">
            We bring creativity, strategy and technology together to build digital experiences that help businesses stand out, connect with customers and move forward.
          </p>
        </Reveal>

        {/* column 2: quick links */}
        <Reveal delay={100}>
          <h4 className={heading}>Quick Links</h4>
          <ul>
            {quickLinks.map((l) => (
              <li key={l.href} className="mb-2 text-[0.9rem]">
                <Link to={l.href} className="hover:text-aqua">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* column 3: our services (each one opens its own service page) */}
        <Reveal delay={200}>
          <h4 className={heading}>Our Services</h4>
          <ul>
            {servicePages.map((s) => (
              <li key={s.slug} className="mb-2 text-[0.9rem]">
                <Link to={`/services/${s.slug}`} className="hover:text-aqua">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* column 4: get in touch */}
        <Reveal delay={300}>
          <h4 className={heading}>Get in Touch</h4>
          <ul className="grid gap-4 text-[0.9rem]">
            <li>
              <span className={small}>Phone</span>
              <a href={`tel:${brand.phone.replace(/[^+\d]/g, "")}`} className="hover:text-aqua">
                {brand.phone}
              </a>
            </li>
            <li>
              <span className={small}>Email</span>
              <a href={`mailto:${brand.email}`} className="break-all hover:text-aqua">
                {brand.email}
              </a>
            </li>
            <li>
              <span className={small}>Visit Us</span>
              <span className="leading-relaxed">{brand.address}</span>
            </li>
          </ul>
        </Reveal>
      </div>

      <div className={`${container} flex flex-wrap justify-between gap-2.5 border-t border-white/10 py-[22px] text-[0.82rem]`}>
        <span>
          © {new Date().getFullYear()} {brand.name}. All Rights Reserved.
        </span>
        <span>
          <Link to="/privacy-policy" className="hover:text-aqua">Privacy Policy</Link>
          <span className="mx-2" aria-hidden="true">|</span>
          <Link to="/terms-and-conditions" className="hover:text-aqua">Terms of Service</Link>
        </span>
      </div>
    </footer>
  );
}
