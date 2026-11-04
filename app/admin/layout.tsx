import type { Metadata } from "next";

// The dashboard is behind a password: keep it out of search results and link previews.
export const metadata: Metadata = {
  title: "Admin | Clayton Cuteri",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
