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
             {!hideCta &&
        (slug === "web" ? (
          <Cta
            eyebrow="Ready to build your online presence?"
            title="Your Next Website Could Be Your Best Business Investment."
            text="Let's create a professional website that represents your brand, builds customer trust and turns visitors into enquiries."
            primary={{ label: "Get a Free Website Quote", to: "/contact" }}
            secondary={{ label: "View Website Packages", to: "#packages" }}
          />
        ) : slug === "marketing" ? (
          <Cta
            eyebrow="Let's grow your reach"
            title="Ready to Turn More Clicks Into Customers?"
            text="Reach the right audience, strengthen your online visibility and make every marketing decision count with a strategy built around your goals."
            primary={{ label: "Book a Free Strategy Call", to: "/#contact" }}
          />
        ) : slug === "branding" ? (
          <Cta
            eyebrow="Make your brand unforgettable"
            title="Let's Create a Brand People Recognise and Remember."
            text="Whether you're starting from scratch or refreshing your identity, we'll help bring your brand's personality and vision to life."
            primary={{ label: "Book a Free Strategy Call", to: "/#contact" }}
          />
        ) : (
          <Cta />
        ))}
    </Fragment>
  );
}