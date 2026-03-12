"use client";

import ScrollReveal from "@/components/ScrollReveal";
import CodeBlock from "@/components/casestudy/CodeBlock";
import DecisionCard from "@/components/casestudy/DecisionCard";
import ModerationDemo from "@/components/demos/ModerationDemo";
import { MODGUARD_CASE_STUDY } from "@/lib/caseStudyContent";
import { Github, Layers, Scale, Target, Users } from "lucide-react";
import { type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = { Layers, Scale, Target, Users };

export default function ModguardContent() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <ScrollReveal>
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
            <span className="gradient-text">{MODGUARD_CASE_STUDY.title}</span>
          </h1>
          <p className="text-xl text-muted mb-6">
            {MODGUARD_CASE_STUDY.subtitle}
          </p>
          <a
            href={MODGUARD_CASE_STUDY.github}
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
          <p className="text-muted leading-relaxed">
            {MODGUARD_CASE_STUDY.overview}
          </p>
        </div>
      </ScrollReveal>

      {/* Architecture Layers */}
      <ScrollReveal>
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-8 text-center">
          Layered <span className="gradient-text">Architecture</span>
        </h2>
      </ScrollReveal>

      <div className="space-y-4 mb-16">
        {MODGUARD_CASE_STUDY.architectureLayers.map((layer, i) => (
          <ScrollReveal key={layer.label} delay={i * 0.1}>
            <div className="glass-card p-6 border-l-4 border-l-accent-blue/40">
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center text-sm font-bold ${layer.color}`}
                >
                  L{i + 1}
                </div>
                <div>
                  <h3 className={`font-bold mb-1 ${layer.color}`}>
                    {layer.label}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {layer.description}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}

        {/* Flow arrows */}
        <ScrollReveal delay={0.4}>
          <div className="text-center text-muted text-sm py-4">
            All layer scores combine in the Ensemble Decision Engine
          </div>
        </ScrollReveal>
      </div>

      {/* Design Decisions */}
      <ScrollReveal>
        <h2 className="text-2xl font-bold font-[family-name:var(--font-heading)] mb-8 text-center">
          Design <span className="gradient-text">Decisions</span>
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {MODGUARD_CASE_STUDY.decisions.map((decision, i) => (
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
            code={MODGUARD_CASE_STUDY.pipelineCode}
            language="python"
            title="Basic Moderation Usage"
          />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <CodeBlock
            code={MODGUARD_CASE_STUDY.ensembleCode}
            language="python"
            title="Ensemble Decision Logic"
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
          <ModerationDemo />
        </div>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <div className="text-center glass-card p-8">
          <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] mb-4">
            Explore the Full Source Code
          </h3>
          <p className="text-muted mb-6">
            Clone the repo, run the demo data generator, and see the dashboard
            in action.
          </p>
          <a
            href={MODGUARD_CASE_STUDY.github}
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
