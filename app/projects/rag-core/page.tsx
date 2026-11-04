import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import RAGCoreContent from "./content";

export const metadata: Metadata = pageMetadata({
  title: "rag-core: RAG Pipeline Library",
  socialTitle: "rag-core: Modular RAG Pipeline Library for Python",
  description:
    "Deep dive into rag-core, a lightweight modular RAG pipeline library for Python. Explore the architecture, design decisions, and tradeoffs behind document chunking, embedding, similarity search, and retrieval-augmented generation.",
  socialDescription:
    "Case study and interactive demo of rag-core, a lightweight Python RAG library: chunking, embeddings, similarity search, re-ranking and grounded prompts.",
  path: "/projects/rag-core",
  image: {
    url: "/og/rag-core.png",
    alt: "rag-core: a lightweight, modular RAG library for Python. Chunk, embed, retrieve and re-rank, grounded prompt.",
  },
});

export default function RAGCorePage() {
  return <RAGCoreContent />;
}
