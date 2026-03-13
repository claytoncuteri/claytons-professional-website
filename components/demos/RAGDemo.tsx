"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  FileText,
  Scissors,
  Binary,
  Search,
  ArrowUpDown,
  MessageSquare,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import {
  RAG_SAMPLE_DOCUMENTS,
  RAG_SAMPLE_QUERY,
  RAG_SIMILARITY_SCORES,
  RAG_SAMPLE_RESPONSE,
} from "@/lib/demoData";

type Stage =
  | "idle"
  | "loading"
  | "chunking"
  | "embedding"
  | "searching"
  | "ranking"
  | "response";

const STAGE_INFO: Record<Stage, { label: string; icon: typeof Play }> = {
  idle: { label: "Ready", icon: Play },
  loading: { label: "Loading Documents", icon: FileText },
  chunking: { label: "Chunking Documents", icon: Scissors },
  embedding: { label: "Generating Embeddings", icon: Binary },
  searching: { label: "Similarity Search", icon: Search },
  ranking: { label: "Retrieval & Ranking", icon: ArrowUpDown },
  response: { label: "Generating Response", icon: MessageSquare },
};

const STAGES: Stage[] = [
  "loading",
  "chunking",
  "embedding",
  "searching",
  "ranking",
  "response",
];

export default function RAGDemo() {
  const [stage, setStage] = useState<Stage>("idle");

  const stageIndex = STAGES.indexOf(stage);
  const isLastStage = stage === "response";

  const advanceStage = useCallback(() => {
    if (stage === "idle") {
      setStage(STAGES[0]);
    } else if (!isLastStage) {
      const nextIndex = stageIndex + 1;
      if (nextIndex < STAGES.length) {
        setStage(STAGES[nextIndex]);
      }
    }
  }, [stage, stageIndex, isLastStage]);

  const reset = () => {
    setStage("idle");
  };

  return (
    <div className="space-y-6">
      {/* Stage progress bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {STAGES.map((s, i) => {
          const info = STAGE_INFO[s];
          const Icon = info.icon;
          const isActive = stage === s;
          const isPast = stageIndex > i;
          return (
            <div
              key={s}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                isActive
                  ? "bg-accent-blue/20 text-accent-blue"
                  : isPast
                  ? "bg-accent-blue/10 text-accent-blue/60"
                  : "bg-black/[0.04] text-muted"
              }`}
            >
              <Icon size={12} />
              {info.label}
            </div>
          );
        })}
      </div>

      {/* Demo viewport - dark terminal style */}
      <div className="bg-gray-950 rounded-xl p-6 min-h-[320px] relative overflow-hidden text-gray-200">
        <AnimatePresence mode="wait">
          {stage === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-[280px] gap-4"
            >
              <p className="text-gray-400 text-sm">
                Click &quot;Run Query&quot; to step through the RAG pipeline
              </p>
              <button
                onClick={advanceStage}
                className="bg-accent-blue hover:bg-accent-blue-dark text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Play size={18} />
                Run Query
              </button>
            </motion.div>
          )}

          {stage === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <p className="text-xs text-gray-400 mb-4">
                Loading source documents...
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RAG_SAMPLE_DOCUMENTS.map((doc, i) => (
                  <motion.div
                    key={doc.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="bg-gray-900 rounded-lg p-3 border border-gray-800"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <FileText size={14} className="text-accent-blue" />
                      <span className="text-sm font-medium text-white">{doc.title}</span>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2">
                      {doc.preview}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {stage === "chunking" && (
            <motion.div
              key="chunking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <p className="text-xs text-gray-400 mb-4">
                Splitting documents into chunks using recursive strategy...
              </p>
              <div className="space-y-4">
                {RAG_SAMPLE_DOCUMENTS.slice(0, 2).map((doc, di) => (
                  <div key={doc.title}>
                    <p className="text-xs text-accent-blue mb-2">
                      {doc.title}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {doc.chunks.map((chunk, ci) => (
                        <motion.div
                          key={ci}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: di * 0.3 + ci * 0.15 }}
                          className="bg-gray-900 rounded px-3 py-2 text-xs text-gray-400 border border-gray-800 max-w-[250px]"
                        >
                          <span className="text-accent-blue text-[10px] mr-1">
                            [{di}.{ci}]
                          </span>
                          {chunk.slice(0, 80)}...
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {stage === "embedding" && (
            <motion.div
              key="embedding"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <p className="text-xs text-gray-400 mb-4">
                Generating vector embeddings for each chunk...
              </p>
              <div className="space-y-2">
                {RAG_SAMPLE_DOCUMENTS[0].chunks.map((chunk, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.3 }}
                    className="flex items-center gap-3 bg-gray-900 rounded-lg p-3 border border-gray-800"
                  >
                    <div className="flex-1 text-xs text-gray-400 truncate">
                      {chunk.slice(0, 60)}...
                    </div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.3 + 0.2 }}
                      className="text-[10px] font-mono text-accent-blue bg-accent-blue/10 px-2 py-1 rounded"
                    >
                      [0.{(37 + i * 13) % 99}, 0.{(62 + i * 7) % 99}, 0.
                      {(18 + i * 23) % 99}, ...]
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {stage === "searching" && (
            <motion.div
              key="searching"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-accent-blue/10 border border-accent-blue/30 rounded-lg p-3 text-center"
              >
                <p className="text-xs text-gray-400 mb-1">Query</p>
                <p className="text-sm font-medium text-accent-blue">
                  &quot;{RAG_SAMPLE_QUERY}&quot;
                </p>
              </motion.div>

              <div className="space-y-2">
                {RAG_SIMILARITY_SCORES.slice(0, 4).map((match, i) => {
                  const doc = RAG_SAMPLE_DOCUMENTS[match.docIndex];
                  const chunk = doc.chunks[match.chunkIndex];
                  const isRelevant = match.score > 0.7;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isRelevant ? 1 : 0.3 }}
                      transition={{ delay: i * 0.2 }}
                      className={`flex items-center gap-3 bg-gray-900 rounded-lg p-3 border ${
                        isRelevant
                          ? "border-accent-blue/30"
                          : "border-gray-800"
                      }`}
                    >
                      <div className="flex-1 text-xs text-gray-400 truncate">
                        {chunk.slice(0, 70)}...
                      </div>
                      <span
                        className={`text-xs font-mono px-2 py-1 rounded ${
                          isRelevant
                            ? "bg-accent-blue/10 text-accent-blue"
                            : "bg-gray-800 text-gray-500"
                        }`}
                      >
                        {match.score.toFixed(2)}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {stage === "ranking" && (
            <motion.div
              key="ranking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <p className="text-xs text-gray-400 mb-2">
                Re-ranking by relevance score...
              </p>
              {RAG_SIMILARITY_SCORES.filter((m) => m.score > 0.7).map(
                (match, i) => {
                  const doc = RAG_SAMPLE_DOCUMENTS[match.docIndex];
                  const chunk = doc.chunks[match.chunkIndex];
                  return (
                    <motion.div
                      key={i}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="flex items-center gap-3 bg-gray-900 rounded-lg p-3 border border-accent-blue/30"
                    >
                      <span className="text-accent-blue font-bold text-sm w-6">
                        #{i + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-xs text-accent-blue mb-1">
                          {doc.title}
                        </p>
                        <p className="text-xs text-gray-400">{chunk}</p>
                      </div>
                      <span className="text-xs font-mono text-accent-blue bg-accent-blue/10 px-2 py-1 rounded">
                        {match.score.toFixed(2)}
                      </span>
                    </motion.div>
                  );
                }
              )}
            </motion.div>
          )}

          {stage === "response" && (
            <motion.div
              key="response"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="bg-accent-blue/5 border border-accent-blue/20 rounded-lg p-4">
                <p className="text-xs text-accent-blue mb-2 font-medium">
                  Generated Response
                </p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="text-sm text-white/90 leading-relaxed"
                >
                  {RAG_SAMPLE_RESPONSE.answer}
                </motion.p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2">Sources:</p>
                <div className="flex flex-wrap gap-2">
                  {RAG_SAMPLE_RESPONSE.sources.map((src, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.15 }}
                      className="text-xs bg-gray-900 text-accent-blue px-2 py-1 rounded border border-accent-blue/20"
                    >
                      [{i + 1}] {src}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation button overlay */}
        {stage !== "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-end mt-4 gap-3"
          >
            {isLastStage ? (
              <button
                onClick={reset}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white text-sm transition-colors border border-gray-800"
              >
                <RotateCcw size={14} />
                Run Again
              </button>
            ) : (
              <button
                onClick={advanceStage}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-blue hover:bg-accent-blue-dark text-white text-sm font-medium transition-colors"
              >
                Next Step
                <ChevronRight size={14} />
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
