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
      <Cta />
    </>
  );
}