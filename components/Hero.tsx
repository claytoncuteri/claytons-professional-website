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

      {/* Radial glow - uses radial-gradient instead of blur for GPU performance */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,113,227,0.03) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold font-[family-name:var(--font-heading)] leading-[1.05] tracking-[-0.04em]"
            >
              Engineering Leader.{" "}
              <span className="gradient-text">AI Architect.</span>{" "}
              Startup Builder.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-8 text-lg sm:text-xl text-muted max-w-2xl mx-auto lg:mx-0 lg:max-w-none leading-relaxed"
            >
              VP of Engineering & AI with 8+ years building AI-powered platforms
              from zero to scale. I turn ambitious ideas into shipped products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() =>
                  document
                    .querySelector("#experience")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-accent-blue hover:bg-accent-blue-dark text-white px-8 py-3.5 rounded-full font-medium transition-all duration-200 hover:shadow-lg hover:shadow-accent-blue/20 flex items-center justify-center gap-2"
              >
                View My Work
                <ArrowDown size={18} />
              </button>
              <a
                href="/api/resume"
                download="Clayton_Cuteri_Resume.pdf"
                className="border border-black/10 hover:border-black/20 text-foreground px-8 py-3.5 rounded-full font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                Download Resume
                <Download size={18} />
              </a>
            </motion.div>
          </div>

          {/* Headshot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex-shrink-0"
          >
            <div className="w-52 h-52 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-accent-blue to-accent-amber p-[3px]">
              <div className="w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/headshot.jpg"
                  alt="Clayton Cuteri, VP of Engineering and AI executive"
                  width={288}
                  height={288}
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
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 glass-card p-8"
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
