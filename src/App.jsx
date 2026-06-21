import { motion, useScroll } from "framer-motion";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Capabilities from "./components/Capabilities";
import About from "./components/About";
import Experience from "./components/Experience";
import Dashboard from "./components/Dashboard";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Game from "./components/Game";
import Resume from "./components/Resume";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const { scrollYProgress } = useScroll();
  return (
    <>
      <motion.div className="progress-bar w-full" style={{ scaleX: scrollYProgress }} />
      <Nav />
      <main>
        <Hero />
        <Capabilities />
        <About />
        <Experience />
        <Dashboard />
        <Skills />
        <Services />
        <Game />
        <Resume />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
