import type { Metadata } from "next";
import ModguardContent from "./content";

export const metadata: Metadata = {
  title: "mod-guard: AI Content Moderation Pipeline",
  description:
    "Deep dive into mod-guard, a multi-layered AI content moderation pipeline. Explore the layered architecture, ensemble decision engine, and the precision/recall tradeoffs in production content moderation systems.",
  openGraph: {
    title: "mod-guard | Clayton Cuteri",
    description:
      "A multi-layered AI content moderation pipeline with real-time dashboard. Built by Clayton Cuteri.",
  },
};

export default function ModguardPage() {
  return <ModguardContent />;
}
