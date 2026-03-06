"use client";

import ScrollReveal from "./ScrollReveal";
import { ABOUT_TEXT } from "@/lib/constants";

export default function About() {
  return (
    <section id="about" className="py-32 lg:py-40">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-center mb-4 tracking-[-0.02em]">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-12 h-0.5 bg-accent-blue mx-auto mb-16 rounded-full opacity-50" />
        </ScrollReveal>

        <div className="space-y-8">
          {ABOUT_TEXT.map((paragraph, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <p className="text-muted text-lg leading-[1.8]">{paragraph}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
