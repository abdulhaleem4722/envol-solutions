import { AboutHero, Story, Values, Principles } from "../components/AboutSections";
import { Cta } from "../components/Contact";

export default function About() {
  return (
    <>
      <AboutHero />
      <Story />
      <Values />
      <Principles />
      <Cta />
    </>
  );
}