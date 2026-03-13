import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug, getPublishedPosts } from "@/lib/db";

export const dynamic = "force-dynamic";

const CATEGORY_COLORS: Record<string, string> = {
  AI: "text-accent-blue bg-accent-blue/10",
  Engineering: "text-emerald-400 bg-emerald-400/10",
  Leadership: "text-accent-amber bg-accent-amber/10",
};

export default async function WritingPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-card-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/#writing"
            className="flex items-center gap-2 text-muted hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`text-xs px-3 py-1 rounded-full ${
                CATEGORY_COLORS[post.category] || "text-muted bg-black/[0.04]"
              }`}
            >
              {post.category}
            </span>
            <span className="text-xs text-muted">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-heading)] leading-tight mb-4">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-lg text-muted">{post.excerpt}</p>
          )}
        </header>

        <div className="prose prose-blue max-w-none">
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="text-2xl font-bold font-[family-name:var(--font-heading)] mt-12 mb-4"
                >
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("### ")) {
              return (
                <h3
                  key={i}
                  className="text-xl font-bold font-[family-name:var(--font-heading)] mt-8 mb-3"
                >
                  {paragraph.replace("### ", "")}
                </h3>
              );
            }
            if (paragraph.startsWith("- ")) {
              return (
                <ul key={i} className="list-disc pl-6 space-y-2 my-4">
                  {paragraph.split("\n").map((item, j) => (
                    <li key={j} className="text-foreground/85 leading-relaxed">
                      {item.replace(/^- /, "")}
                    </li>
                  ))}
                </ul>
              );
            }
            if (paragraph.startsWith("> ")) {
              return (
                <blockquote
                  key={i}
                  className="border-l-4 border-accent-blue pl-4 my-6 italic text-muted"
                >
                  {paragraph.replace(/^> /gm, "")}
                </blockquote>
              );
            }
            return (
              <p key={i} className="text-foreground/85 leading-relaxed mb-4">
                {paragraph}
              </p>
            );
          })}
        </div>

        <footer className="mt-16 pt-8 border-t border-card-border">
          <Link
            href="/#writing"
            className="text-accent-blue hover:underline text-sm flex items-center gap-2"
          >
            <ArrowLeft size={14} />
            Back to all articles
          </Link>
        </footer>
      </article>
    </div>
  );
}
