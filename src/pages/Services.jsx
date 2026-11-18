import {
  ServicesHero,
  ServicesOverview,
  ServicesStats,
  TechStack,
  PortfolioPreview,
  TestimonialsGrid,
} from "../components/ServicesPage";
import { WhyUs, Process } from "../components/Sections";
import { Cta } from "../components/Contact";

export default function Services() {
  return (
    <>
      <ServicesHero />
      <ServicesOverview />
      <ServicesStats />
      <WhyUs />
      <TechStack />
      <Process />
      <PortfolioPreview />
      <TestimonialsGrid />
      <Cta />
    </>
  );
}