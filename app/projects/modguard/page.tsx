import type { Metadata } from "next";
import ModguardContent from "./content";

export const metadata: Metadata = {
  title: "modguard: AI Content Moderation Pipeline",
  description:
    "Deep dive into modguard, a multi-layered AI content moderation pipeline. Explore the layered architecture, ensemble decision engine, and the precision/recall tradeoffs in production content moderation systems.",
  openGraph: {
    title: "modguard | Clayton Cuteri",
    description:
      "A multi-layered AI content moderation pipeline with real-time dashboard. Built by Clayton Cuteri.",
  },
};

export default function ModguardPage() {
  return <ModguardContent />;
}
