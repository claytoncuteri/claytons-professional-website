"use client";

import ScrollReveal from "../ScrollReveal";
import { type LucideIcon } from "lucide-react";

interface DecisionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

export default function DecisionCard({
  title,
  description,
  icon: Icon,
  index,
}: DecisionCardProps) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="glass-card p-6 h-full hover:border-accent-blue/30 transition-colors">
        <div className="p-3 rounded-xl bg-accent-amber/10 w-fit mb-4">
          <Icon size={24} className="text-accent-amber" />
        </div>
        <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-3">
          {title}
        </h3>
        <p className="text-muted text-sm leading-relaxed">{description}</p>
      </div>
    </ScrollReveal>
  );
}
