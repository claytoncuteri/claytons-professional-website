"use client";

import ScrollReveal from "./ScrollReveal";
import RAGDemo from "./demos/RAGDemo";
import ModerationDemo from "./demos/ModerationDemo";
import { PROJECTS } from "@/lib/constants";
import { Github, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Projects() {
  return (
    <section id="projects" className="py-32 lg:py-40 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/[0.015] to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-center mb-4 tracking-[-0.02em]">
            Open Source <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted text-center mb-20 max-w-2xl mx-auto">
            Production-quality AI tools I have built and open-sourced.
          </p>
        </ScrollReveal>

        <div className="space-y-20">
          {/* rag-core */}
          <ScrollReveal>
            <div className="glass-card p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)]">
                    {PROJECTS[0].title}
                  </h3>
                  <p className="text-muted text-sm">{PROJECTS[0].subtitle}</p>
                </div>
                <div className="flex gap-3">
                  <a
                    href={PROJECTS[0].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-black/[0.04] hover:bg-black/[0.08] text-foreground px-4 py-2 rounded-full text-sm transition-all duration-200 cursor-pointer"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                  <Link
                    href={PROJECTS[0].caseStudyUrl}
                    className="flex items-center gap-2 bg-accent-blue/[0.08] hover:bg-accent-blue/[0.15] text-accent-blue px-4 py-2 rounded-full text-sm transition-all duration-200 cursor-pointer"
                  >
                    Deep Dive
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <RAGDemo />

              {/* Code snippet */}
              <div className="mt-6 bg-gray-950 rounded-xl p-4 overflow-x-auto">
                <pre className="text-xs font-mono text-gray-400">
                  <code>{PROJECTS[0].codeSnippet}</code>
                </pre>
              </div>

              {/* Features */}
              <div className="mt-4 flex flex-wrap gap-2">
                {PROJECTS[0].features.map((f) => (
                  <span
                    key={f}
                    className="text-xs px-3 py-1 rounded-full bg-black/[0.04] text-muted"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* modguard */}
          <ScrollReveal>
            <div className="glass-card p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold font-[family-name:var(--font-heading)]">
                    {PROJECTS[1].title}
                  </h3>
                  <p className="text-muted text-sm">{PROJECTS[1].subtitle}</p>
                </div>
                <div className="flex gap-3">
                  <a
                    href={PROJECTS[1].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-black/[0.04] hover:bg-black/[0.08] text-foreground px-4 py-2 rounded-full text-sm transition-all duration-200 cursor-pointer"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                  <Link
                    href={PROJECTS[1].caseStudyUrl}
                    className="flex items-center gap-2 bg-accent-blue/[0.08] hover:bg-accent-blue/[0.15] text-accent-blue px-4 py-2 rounded-full text-sm transition-all duration-200 cursor-pointer"
                  >
                    Deep Dive
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              <ModerationDemo />

              {/* Code snippet */}
              <div className="mt-6 bg-gray-950 rounded-xl p-4 overflow-x-auto">
                <pre className="text-xs font-mono text-gray-400">
                  <code>{PROJECTS[1].codeSnippet}</code>
                </pre>
              </div>

              {/* Features */}
              <div className="mt-4 flex flex-wrap gap-2">
                {PROJECTS[1].features.map((f) => (
                  <span
                    key={f}
                    className="text-xs px-3 py-1 rounded-full bg-black/[0.04] text-muted"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
