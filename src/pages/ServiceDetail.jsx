import { Fragment } from "react";
import { Navigate, useParams } from "react-router-dom";
import { servicePages } from "../data";
import { ServiceHero, Offerings, ServicePortfolio, Packages } from "../components/ServicesPage";
import { Cta } from "../components/Contact";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = servicePages.find((s) => s.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  const hideCta = ["app", "ai"].includes(slug); // in pages par pricing ke neeche CTA nahi
  const hidePortfolio = slug === "hosting";     // hosting par Our Work nahi

  return (
    <Fragment key={slug}>
      <ServiceHero service={service} />
      <Offerings service={service} />
      {!hidePortfolio && <ServicePortfolio service={service} />}
      <Packages service={service} />
      {!hideCta && <Cta />}
    </Fragment>
  );
}