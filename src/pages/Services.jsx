import {
  ServicesHero,
  TrustedBy,
  ServicesOverview,
  ServicesStats,
  TestimonialsMarquee,
  Offices,
  Faq,
} from "../components/ServicesPage";
import { WhyUs, Process } from "../components/Sections";
import { Cta } from "../components/Contact";

export default function Services() {
  return (
    <>
      <ServicesHero />
      <TrustedBy />
      <ServicesOverview />
      <ServicesStats />
      <WhyUs />
      <Process />
      <TestimonialsMarquee />
      <Offices />
      <Faq />
      <Cta />
    </>
  );
}