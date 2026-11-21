import Hero from "../components/Hero";
import Pitch from "../components/Pitch";
import { Services, Stats, WhyUs, Process } from "../components/Sections";
import { Projects, Testimonials } from "../components/Work";
import { ContactForm } from "../components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Pitch />
      <Services />
      <Stats />
      <WhyUs />
      <Process />
      <Projects />
      <Testimonials />
      <ContactForm />
    </>
  );
}
