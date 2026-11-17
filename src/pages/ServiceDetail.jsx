import { Fragment } from "react";
import { Navigate, useParams } from "react-router-dom";
import { servicePages } from "../data";
import { ServiceHero, Offerings, ServicePortfolio, Packages } from "../components/ServicesPage";
import { Cta } from "../components/Contact";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = servicePages.find((s) => s.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  // key = slug, so switching between service pages restarts the scroll animations
  return (
    <Fragment key={slug}>
      <ServiceHero service={service} />
      <Offerings service={service} />
      <ServicePortfolio service={service} />
      <Packages service={service} />
      <Cta />
    </Fragment>
  );
}