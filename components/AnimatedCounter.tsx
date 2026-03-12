"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  prefix?: string;
  suffix?: string;
  label: string;
}

export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  label,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const target = parseInt(value, 10);
      const controls = animate(motionValue, target, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return unsubscribe;
  }, [rounded]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-heading)]">
        <span className="gradient-text">
          {prefix}
          {displayValue}
          {suffix}
        </span>
      </div>
      <div className="text-muted text-sm mt-1">{label}</div>
    </div>
  );
}
