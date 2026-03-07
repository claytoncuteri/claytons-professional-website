import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import AIExpertise from "@/components/AIExpertise";
import Projects from "@/components/Projects";
import Writing from "@/components/Writing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <AIExpertise />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Writing />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
