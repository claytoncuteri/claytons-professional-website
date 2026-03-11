"use client";

import ScrollReveal from "@/components/ScrollReveal";
import CodeBlock from "@/components/casestudy/CodeBlock";
import DecisionCard from "@/components/casestudy/DecisionCard";
import RAGDemo from "@/components/demos/RAGDemo";
import { RAG_CASE_STUDY } from "@/lib/caseStudyContent";
import { Github, ArrowRight, Scissors, Target, Cpu, Database } from "lucide-react";
import { type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = { Scissors, Target, Cpu, Database };

export default function RAGCoreContent() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <ScrollReveal>
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
            <span className="gradient-text">{RAG_CASE_STUDY.title}</span>
          </h1>
          <p className="text-xl text-muted mb-6">{RAG_CASE_STUDY.subtitle}</p>
          <a
            href={RAG_CASE_STUDY.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent-blue hover:bg-accent-blue-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Github size={18} />
            View on GitHub
          </a>
        </div>
      </ScrollReveal>

      {/* Overview */}
      <ScrollReveal>
        <div className="glass-card p-8 mb-12">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Overview
          </h2>
          <p className="text-muted leading-relaxed">{RAG_CASE_STUDY.overview}</p>
        </div>
      </ScrollReveal>

      {/* Architecture Pipeline */}
      <ScrollReveal>
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-8 text-center">
          Pipeline <span className="gradient-text">Architecture</span>
        </h2>
      </ScrollReveal>

      <div className="space-y-4 mb-16">
        {RAG_CASE_STUDY.architectureStages.map((stage, i) => (
          <ScrollReveal key={stage.label} delay={i * 0.1}>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-blue/20 flex items-center justify-center text-accent-blue text-sm font-bold">
                {i + 1}
              </div>
              <div className="flex-1 glass-card p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm">{stage.label}</h3>
                  <p className="text-muted text-xs">{stage.description}</p>
                </div>
                {i < RAG_CASE_STUDY.architectureStages.length - 1 && (
                  <ArrowRight size={16} className="text-accent-blue/40 flex-shrink-0" />
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Design Decisions */}
      <ScrollReveal>
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-8 text-center">
          Design <span className="gradient-text">Decisions</span>
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {RAG_CASE_STUDY.decisions.map((decision, i) => (
          <DecisionCard
            key={decision.title}
            title={decision.title}
            description={decision.description}
            icon={iconMap[decision.icon] || Target}
            index={i}
          />
        ))}
      </div>

      {/* Code Examples */}
      <ScrollReveal>
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-8 text-center">
          Code <span className="gradient-text">Examples</span>
        </h2>
      </ScrollReveal>

      <div className="space-y-8 mb-16">
        <ScrollReveal>
          <CodeBlock
            code={RAG_CASE_STUDY.pipelineCode}
            language="python"
            title="Basic Pipeline Usage"
          />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <CodeBlock
            code={RAG_CASE_STUDY.chunkerComparisonCode}
            language="python"
            title="Chunking Strategy Comparison"
          />
        </ScrollReveal>
      </div>

      {/* Live Demo */}
      <ScrollReveal>
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-8 text-center">
          Interactive <span className="gradient-text">Demo</span>
        </h2>
      </ScrollReveal>

      <ScrollReveal>
        <div className="glass-card p-6 sm:p-8 mb-16">
          <RAGDemo />
        </div>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <div className="text-center glass-card p-8">
          <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Explore the Full Source Code
          </h3>
          <p className="text-muted mb-6">
            Clone the repo, run the tests, and try it with your own documents.
          </p>
          <a
            href={RAG_CASE_STUDY.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent-blue hover:bg-accent-blue-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Github size={18} />
            View on GitHub
          </a>
        </div>
      </ScrollReveal>
    </div>
  );
}
