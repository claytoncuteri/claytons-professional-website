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
    <section id="ai-expertise" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-blue/[0.02] to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] text-center mb-4">
            AI <span className="gradient-text">Expertise</span>
          </h2>
          <div className="w-16 h-1 bg-accent-blue mx-auto mb-16 rounded-full" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AI_EXPERTISE.map((card, i) => {
            const Icon = iconMap[card.icon] || Brain;
            return (
              <ScrollReveal key={card.title} delay={i * 0.1}>
                <div className="glass-card p-6 h-full hover:border-accent-blue/30 hover:glow-blue transition-all duration-300 group">
                  <div className="p-3 rounded-xl bg-accent-blue/10 w-fit mb-4 group-hover:bg-accent-blue/20 transition-colors">
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
