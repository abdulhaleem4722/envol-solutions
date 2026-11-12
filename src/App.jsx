import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Services, Stats, WhyUs, Process } from "./components/Sections";
import { Projects, Testimonials } from "./components/Work";
import { ContactForm, Cta } from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Stats />
        <WhyUs />
        <Process />
        <Projects />
        <Testimonials />
        <ContactForm />
       
        <Cta />
      </main>
      <Footer />
    </>
  );
}