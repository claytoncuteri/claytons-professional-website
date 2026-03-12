"use client";

import ScrollReveal from "./ScrollReveal";
import { EXPERIENCE } from "@/lib/constants";
import { Briefcase } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-center mb-4">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-16 h-1 bg-accent-blue mx-auto mb-16 rounded-full" />
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-accent-blue/20" />

          {EXPERIENCE.map((exp, i) => (
            <ScrollReveal
              key={exp.company}
              delay={i * 0.15}
              direction={i % 2 === 0 ? "left" : "right"}
            >
              <div
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent-blue glow-blue z-10 mt-6" />

                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-1/2" />

                {/* Card */}
                <div className="ml-12 md:ml-0 md:w-1/2 glass-card p-6 hover:border-accent-blue/30 transition-colors">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-accent-blue/10">
                      <Briefcase size={20} className="text-accent-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-[family-name:var(--font-heading)]">
                        {exp.company}
                      </h3>
                      <p className="text-accent-blue text-sm font-medium">
                        {exp.title}
                      </p>
                      <p className="text-muted text-xs">{exp.dates}</p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {exp.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        className="text-muted text-sm flex items-start gap-2"
                      >
                        <span className="text-accent-amber mt-1 flex-shrink-0">
                          &#x2022;
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded-md bg-accent-blue/10 text-accent-blue"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
