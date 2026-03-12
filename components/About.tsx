"use client";

import ScrollReveal from "./ScrollReveal";
import { ABOUT_TEXT } from "@/lib/constants";

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-center mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-16 h-1 bg-accent-blue mx-auto mb-12 rounded-full" />
        </ScrollReveal>

        <div className="space-y-6">
          {ABOUT_TEXT.map((paragraph, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <p className="text-muted text-lg leading-relaxed">{paragraph}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
