import {
  ServicesHero,
  ServicesOverview,
  TechStack,
  PortfolioPreview,
  TestimonialsGrid,
} from "../components/ServicesPage";
import { Faq } from "../components/Faq";
import { servicesFaq } from "../faqData";
import { Cta } from "../components/Contact";

export default function Services() {
  return (
    <>
      <ServicesHero />
      <ServicesOverview />
      <TechStack />
      <PortfolioPreview />
      <TestimonialsGrid />
      <Faq {...servicesFaq} tone="white" />
            <Cta
        eyebrow="Your next move starts here"
        title="Found the Right Solutions?"
        text="Let's turn your requirement into reality."
        primary={{ label: "Schedule Your Free Consultation", to: "/contact" }}
      />
    </>
  );
}