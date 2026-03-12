import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: {
    template: "%s | Clayton Cuteri Projects",
    default: "Projects | Clayton Cuteri",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* Back nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-900/95 backdrop-blur-md border-b border-card-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted hover:text-foreground transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
          <span className="text-sm font-bold font-[family-name:var(--font-heading)] text-foreground">
            Clayton Cuteri
          </span>
        </div>
      </nav>
      <div className="pt-14">{children}</div>
    </div>
  );
}
