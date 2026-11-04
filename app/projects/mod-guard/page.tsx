import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ModguardContent from "./content";

export const metadata: Metadata = pageMetadata({
  title: "mod-guard: AI Content Moderation Pipeline",
  socialTitle: "mod-guard: AI Content Moderation Pipeline",
  description:
    "Deep dive into mod-guard, a multi-layered AI content moderation pipeline. Explore the layered architecture, ensemble decision engine, and the precision/recall tradeoffs in production content moderation systems.",
  socialDescription:
    "Case study and interactive demo of mod-guard: rule filters, ML toxicity and sentiment layers, and an ensemble engine that explains each decision.",
  path: "/projects/mod-guard",
  image: {
    url: "/og/mod-guard.png",
    alt: "mod-guard: a multi-layered AI content moderation pipeline. Rule filters, ML toxicity, sentiment, ensemble decision.",
  },
});

export default function ModguardPage() {
  return <ModguardContent />;
}
