"use client";

import ScrollReveal from "./ScrollReveal";
import { AI_EXPERTISE } from "@/lib/constants";
import {
  Brain,
  Shield,
  TrendingUp,
  Sparkles,
  Scale,
  Cloud,
} from "lucide-react";
import { type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Shield,
  TrendingUp,
  Sparkles,
  Scale,
  Cloud,
};

export default function AIExpertise() {
  return (
    <section id="ai-expertise" className="py-32 lg:py-40 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/[0.015] to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-center mb-4 tracking-[-0.02em]">
            AI <span className="gradient-text">Expertise</span>
          </h2>
          <div className="w-12 h-0.5 bg-accent-blue mx-auto mb-20 rounded-full opacity-50" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AI_EXPERTISE.map((card, i) => {
            const Icon = iconMap[card.icon] || Brain;
            return (
              <ScrollReveal key={card.title} delay={i * 0.08}>
                <div className="glass-card p-6 h-full cursor-pointer hover:-translate-y-1 transition-all duration-300 group">
                  <div className="p-3 rounded-xl bg-accent-blue/[0.07] w-fit mb-5 group-hover:bg-accent-blue/[0.12] transition-colors duration-300">
                    <Icon
                      size={24}
                      className="text-accent-blue"
                    />
                  </div>
                  <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-3">
                    {card.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
