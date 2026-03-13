"use client";

import { useState, useEffect } from "react";
import ScrollReveal from "./ScrollReveal";
import { Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishedAt: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  AI: "text-accent-blue bg-accent-blue/[0.08]",
  Engineering: "text-emerald-400 bg-emerald-400/[0.08]",
  Leadership: "text-accent-amber bg-accent-amber/[0.08]",
};

export default function Writing() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const placeholderCount = Math.max(0, 3 - posts.length);

  return (
    <section id="writing" className="py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] text-center mb-4 tracking-[-0.02em]">
            Thoughts on{" "}
            <span className="gradient-text">
              AI, Engineering, and Leadership
            </span>
          </h2>
          <p className="text-muted text-center mb-20 max-w-2xl mx-auto">
            {posts.length > 0
              ? "Perspectives from the intersection of engineering leadership and AI."
              : "Coming soon. In the meantime, connect with me on LinkedIn."}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 0.08}>
              <Link
                href={`/writing/${post.slug}`}
                className="block glass-card p-6 hover:-translate-y-1 transition-all duration-300 group h-full cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full ${
                      CATEGORY_COLORS[post.category] || "text-muted bg-black/[0.04]"
                    }`}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-muted">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-[family-name:var(--font-heading)] mb-3 group-hover:text-accent-blue transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-sm text-muted mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="text-xs text-accent-blue flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                  Read more <ArrowRight size={12} />
                </span>
              </Link>
            </ScrollReveal>
          ))}

          {/* Placeholder skeletons for empty slots */}
          {!loading &&
            Array.from({ length: placeholderCount }).map((_, i) => (
              <ScrollReveal key={`placeholder-${i}`} delay={(posts.length + i) * 0.08}>
                <div className="glass-card p-6 opacity-30">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={16} className="text-muted" />
                    <span className="text-xs text-muted">Coming Soon</span>
                  </div>
                  <div className="skeleton h-4 w-3/4 mb-3" />
                  <div className="skeleton h-3 w-full mb-2" />
                  <div className="skeleton h-3 w-5/6 mb-2" />
                  <div className="skeleton h-3 w-2/3" />
                </div>
              </ScrollReveal>
            ))}
        </div>
      </div>
    </section>
  );
}
