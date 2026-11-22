import {
  ServicesHero,
  ServicesOverview,
  TechStack,
  PortfolioPreview,
  TestimonialsGrid,
} from "../components/ServicesPage";
import { Cta } from "../components/Contact";

export default function Services() {
  return (
    <>
      <ServicesHero />
      <ServicesOverview />
      <TechStack />
      <PortfolioPreview />
      <TestimonialsGrid />
      <Cta />
    </>
  );
}