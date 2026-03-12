import type { Metadata } from "next";
import RAGCoreContent from "./content";

export const metadata: Metadata = {
  title: "rag-core: RAG Pipeline Library",
  description:
    "Deep dive into rag-core, a lightweight modular RAG pipeline library for Python. Explore the architecture, design decisions, and tradeoffs behind document chunking, embedding, similarity search, and retrieval-augmented generation.",
  openGraph: {
    title: "rag-core | Clayton Cuteri",
    description:
      "A lightweight, modular RAG pipeline library for Python. Built by Clayton Cuteri.",
  },
};

export default function RAGCorePage() {
  return <RAGCoreContent />;
}
