"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export default function CodeBlock({
  code,
  language = "python",
  title,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-card-border">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-navy-800 border-b border-card-border">
          <span className="text-xs text-muted">{title}</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted/60 uppercase">
              {language}
            </span>
            <button
              onClick={handleCopy}
              className="text-muted hover:text-foreground transition-colors"
              aria-label="Copy code"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      )}
      <div className="bg-navy-950 p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-muted leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
