import Hero from "../components/Hero";
import { Services, Stats, WhyUs, Process } from "../components/Sections";
import { Projects, Testimonials } from "../components/Work";
import { ContactForm, Cta } from "../components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Stats />
      <WhyUs />
      <Process />
      <Projects />
      <Testimonials />
      <ContactForm />
      <Cta />
    </>
  );
}