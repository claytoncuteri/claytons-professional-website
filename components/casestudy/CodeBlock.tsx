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
    <div className="rounded-xl overflow-hidden border border-gray-800">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
          <span className="text-xs text-gray-400">{title}</span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500 uppercase">
              {language}
            </span>
            <button
              onClick={handleCopy}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Copy code"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      )}
      <div className="bg-gray-950 p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-gray-400 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
