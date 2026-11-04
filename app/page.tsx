import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import AIExpertise from "@/components/AIExpertise";
import Projects from "@/components/Projects";
import Writing from "@/components/Writing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { DEFAULT_OG_IMAGE, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Clayton Cuteri | VP of Engineering & AI | CTO | SaaS Leader",
  socialTitle: "Clayton Cuteri | VP of Engineering & AI | CTO",
  description:
    "Engineering and AI executive with 8+ years building AI-powered platforms. Experienced in leading cross-functional teams of 25+, scaling cloud infrastructure on AWS, and shipping AI products from zero to scale. Open to CTO and VP of Engineering roles.",
  socialDescription:
    "Engineering and AI executive with 8+ years building AI-powered platforms from zero to scale. Open to CTO and VP of Engineering roles.",
  path: "/",
  image: { url: DEFAULT_OG_IMAGE.url, alt: DEFAULT_OG_IMAGE.alt },
});

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
