"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { MODERATION_EXAMPLES, type ModerationDemoResult } from "@/lib/demoData";

type Stage = "idle" | "rules" | "toxicity" | "sentiment" | "ensemble" | "done";

const STAGES: Stage[] = ["rules", "toxicity", "sentiment", "ensemble", "done"];

function ToxicityBar({
  label,
  value,
  delay,
}: {
  label: string;
  value: number;
  delay: number;
}) {
  const color =
    value > 0.7
      ? "bg-red-500"
      : value > 0.3
      ? "bg-yellow-500"
      : "bg-emerald-500";

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-muted w-20 text-right">{label}</span>
      <div className="flex-1 h-3 bg-navy-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value * 100}%` }}
          transition={{ duration: 0.8, delay }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
      <span className="text-[10px] font-mono text-muted w-8">
        {value.toFixed(2)}
      </span>
    </div>
  );
}

function SentimentGauge({ score, delay }: { score: number; delay: number }) {
  const rotation = (score - 0.5) * 180;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-32 h-16 overflow-hidden">
        <div className="absolute inset-0 rounded-t-full border-4 border-navy-800 bg-gradient-to-r from-red-500/20 via-yellow-500/20 to-emerald-500/20" />
        <motion.div
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{ duration: 1, delay }}
          className="absolute bottom-0 left-1/2 origin-bottom w-0.5 h-14 bg-accent-blue"
          style={{ transformOrigin: "bottom center", marginLeft: "-1px" }}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-blue" />
      </div>
      <div className="flex justify-between w-32 text-[9px] text-muted">
        <span>Negative</span>
        <span>Neutral</span>
        <span>Positive</span>
      </div>
    </div>
  );
}

export default function ModerationDemo() {
  const [stage, setStage] = useState<Stage>("idle");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ModerationDemoResult | null>(null);

  const stageIndex = STAGES.indexOf(stage);
  const isLastStage = stage === "done";

  const startModeration = useCallback(
    (example?: ModerationDemoResult) => {
      const data = example || MODERATION_EXAMPLES.borderline;
      setResult(data);
      if (example) setInput(example.input);
      setStage(STAGES[0]);
    },
    []
  );

  const advanceStage = useCallback(() => {
    if (stage !== "idle" && !isLastStage) {
      const nextIndex = stageIndex + 1;
      if (nextIndex < STAGES.length) {
        setStage(STAGES[nextIndex]);
      }
    }
  }, [stage, stageIndex, isLastStage]);

  const reset = () => {
    setStage("idle");
    setResult(null);
  };

  const decisionColor = {
    APPROVE: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    FLAG_FOR_REVIEW: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
    REJECT: "text-red-400 border-red-400/30 bg-red-400/10",
  };

  const DecisionIcon = {
    APPROVE: CheckCircle,
    FLAG_FOR_REVIEW: AlertTriangle,
    REJECT: XCircle,
  };

  return (
    <div className="space-y-6">
      {/* Input area */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {Object.entries(MODERATION_EXAMPLES).map(([key, example]) => (
            <button
              key={key}
              onClick={() => {
                setInput(example.input);
                startModeration(example);
              }}
              disabled={stage !== "idle"}
              className="text-xs px-3 py-1.5 rounded-full bg-navy-800 text-muted hover:text-foreground hover:bg-navy-800/80 transition-colors disabled:opacity-50"
            >
              {example.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste content to moderate..."
            className="flex-1 px-4 py-2.5 rounded-lg bg-navy-800 border border-card-border text-sm text-foreground placeholder-muted/50 focus:outline-none focus:border-accent-blue transition-colors"
            disabled={stage !== "idle"}
          />
          <button
            onClick={() => startModeration()}
            disabled={stage !== "idle" || !input.trim()}
            className="bg-accent-blue hover:bg-accent-blue-dark text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Shield size={16} />
            Moderate
          </button>
        </div>
      </div>

      {/* Stage progress indicators */}
      {stage !== "idle" && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {STAGES.map((s, i) => {
            const isActive = stage === s;
            const isPast = stageIndex > i;
            const labels: Record<string, string> = {
              rules: "Rules Filter",
              toxicity: "Toxicity",
              sentiment: "Sentiment",
              ensemble: "Ensemble",
              done: "Decision",
            };
            return (
              <div
                key={s}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-accent-blue/20 text-accent-blue"
                    : isPast
                    ? "bg-accent-blue/10 text-accent-blue/60"
                    : "bg-navy-800 text-muted/50"
                }`}
              >
                {labels[s]}
              </div>
            );
          })}
        </div>
      )}

      {/* Demo viewport */}
      <div className="bg-navy-950 rounded-xl p-6 min-h-[280px]">
        <AnimatePresence mode="wait">
          {stage === "idle" && !result && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center h-[240px]"
            >
              <p className="text-muted text-sm">
                Select an example or type text to moderate
              </p>
            </motion.div>
          )}

          {stage === "rules" && result && (
            <motion.div
              key="rules"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <p className="text-xs text-accent-blue font-medium">
                Layer 1: Rule-Based Filter
              </p>
              <div className="space-y-2">
                {result.rules.checks.map((check, i) => (
                  <motion.div
                    key={check.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    {check.passed ? (
                      <CheckCircle size={14} className="text-emerald-400" />
                    ) : (
                      <XCircle size={14} className="text-red-400" />
                    )}
                    <span className="text-muted">{check.name}</span>
                    <span
                      className={`text-xs ml-auto ${
                        check.passed ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {check.passed ? "Passed" : "Flagged"}
                    </span>
                  </motion.div>
                ))}
              </div>
              {result.rules.flagged && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-xs text-red-400 mt-2"
                >
                  Flagged: {result.rules.flagReason}
                </motion.p>
              )}
            </motion.div>
          )}

          {stage === "toxicity" && result && (
            <motion.div
              key="toxicity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              <p className="text-xs text-accent-blue font-medium">
                Layer 2: Toxicity Analysis
              </p>
              <div className="space-y-2">
                {Object.entries(result.toxicity).map(([label, value], i) => (
                  <ToxicityBar
                    key={label}
                    label={label.replace(/_/g, " ")}
                    value={value}
                    delay={i * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {stage === "sentiment" && result && (
            <motion.div
              key="sentiment"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <p className="text-xs text-accent-blue font-medium">
                Layer 3: Sentiment Analysis
              </p>
              <div className="flex flex-col items-center gap-4">
                <SentimentGauge score={result.sentiment.score} delay={0.3} />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center"
                >
                  <p className="text-sm font-medium">
                    {result.sentiment.label}
                  </p>
                  <p className="text-xs text-muted">
                    Score: {result.sentiment.score.toFixed(2)}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {stage === "ensemble" && result && (
            <motion.div
              key="ensemble"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <p className="text-xs text-accent-blue font-medium self-start">
                Ensemble Decision
              </p>
              <div className="flex items-center gap-4">
                {["Rules", "Toxicity", "Sentiment"].map((layer, i) => (
                  <motion.div
                    key={layer}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.2 }}
                    className="text-center"
                  >
                    <div className="bg-navy-800 rounded-lg px-3 py-2 border border-card-border text-xs text-muted">
                      {layer}
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="text-2xl"
              >
                &#x2193;
              </motion.div>
            </motion.div>
          )}

          {stage === "done" && result && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              {(() => {
                const Icon = DecisionIcon[result.decision];
                return (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className={`flex items-center gap-3 px-6 py-3 rounded-xl border ${
                      decisionColor[result.decision]
                    }`}
                  >
                    <Icon size={24} />
                    <div>
                      <p className="font-bold text-lg">
                        {result.decision.replace(/_/g, " ")}
                      </p>
                      <p className="text-xs opacity-80">
                        Confidence: {(result.confidence * 100).toFixed(0)}%
                      </p>
                    </div>
                  </motion.div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation button */}
        {stage !== "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-end mt-4 gap-3"
          >
            {isLastStage ? (
              <button
                onClick={reset}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-navy-800 hover:bg-navy-800/80 text-muted hover:text-foreground text-sm transition-colors border border-card-border"
              >
                <RotateCcw size={14} />
                Try Another
              </button>
            ) : (
              <button
                onClick={advanceStage}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-blue hover:bg-accent-blue-dark text-white text-sm font-medium transition-colors"
              >
                Next Layer
                <ChevronRight size={14} />
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
