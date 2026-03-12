import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold font-[family-name:var(--font-heading)] gradient-text mb-4">
          404
        </h1>
        <p className="text-xl text-muted mb-8">
          This page does not exist.
        </p>
        <Link
          href="/"
          className="bg-accent-blue hover:bg-accent-blue-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
