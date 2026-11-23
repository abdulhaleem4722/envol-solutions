import { AboutHero, Story, Values, Principles } from "../components/AboutSections";
import { Cta } from "../components/Contact";

export default function About() {
  return (
    <>
      <AboutHero />
      <Story />
      <Values />
      <Principles />
          <Cta
        eyebrow="Let's build something meaningful"
        title="Like What We Stand For?"
        text="Let's create something great together."
        primary={{ label: "Schedule Your Free Consultation", to: "/contact" }}
      />
    </>
  );
}