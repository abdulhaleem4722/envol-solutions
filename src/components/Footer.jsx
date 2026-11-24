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

// Social media links: abhi dummy "#" hain. Asli accounts ke links yahan daal dena.
const socials = [
  {
    label: "LinkedIn",
    href: "#",
    icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/envolsolutions/",
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </g>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />,
  },
  {
    label: "X",
    href: "https://x.com/envolsolutions",
    icon: <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />,
  },
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

          <div className="mt-5 flex flex-wrap gap-2.5">
            {socials.map((x) => (
              <a
                key={x.label}
                href={x.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={x.label}
                className="grid size-9 place-items-center rounded-lg border border-white/20 text-white transition hover:-translate-y-0.5 hover:border-aqua hover:bg-aqua hover:text-navy-deep"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-[17px]" aria-hidden="true">
                  {x.icon}
                </svg>
              </a>
            ))}
          </div>
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