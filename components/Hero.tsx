"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import Image from "next/image";
import AnimatedCounter from "./AnimatedCounter";
import { HERO_STATS } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 hero-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] leading-tight"
            >
              Engineering Leader.{" "}
              <span className="gradient-text">AI Architect.</span>{" "}
              Startup Builder.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-muted max-w-2xl mx-auto lg:mx-0"
            >
              VP of Engineering & AI with 8+ years building AI-powered platforms
              from zero to scale. I turn ambitious ideas into shipped products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() =>
                  document
                    .querySelector("#experience")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-accent-blue hover:bg-accent-blue-dark text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                View My Work
                <ArrowDown size={18} />
              </button>
              <a
                href="/api/resume"
                download="Clayton_Cuteri_Resume.pdf"
                className="border border-accent-blue/30 hover:border-accent-blue text-foreground px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                Download Resume
                <Download size={18} />
              </a>
            </motion.div>
          </div>

          {/* Headshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-shrink-0"
          >
            <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-accent-blue to-accent-amber p-[3px]">
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/headshot.jpg"
                  alt="Clayton Cuteri, VP of Engineering and AI executive"
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 glass-card p-8"
        >
          {HERO_STATS.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
