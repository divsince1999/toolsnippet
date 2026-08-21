"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function UnicodeEscapeConverter() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [inputVal, setInputVal] = useState("Hello World! 🚀 Café €");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!inputVal) return "";

    try {
      if (mode === "encode") {
        let result = "";
        for (let i = 0; i < inputVal.length; i++) {
          const code = inputVal.charCodeAt(i);
          if (code > 127) {
            result += "\\u" + code.toString(16).padStart(4, "0");
          } else {
            result += inputVal[i];
          }
        }
        return result;
      } else {
        // Decode \uXXXX and \u{XXXX}
        return inputVal.replace(/\\u{([0-9a-fA-F]+)}|\\u([0-9a-fA-F]{4})/g, (_, p1, p2) => {
          const hex = p1 || p2;
          return String.fromCodePoint(parseInt(hex, 16));
        });
      }
    } catch {
      return "Invalid Unicode escape sequence";
    }
  }, [inputVal, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="Unicode & UTF-16 Escape Converter"
      description="Encode text to Unicode escape sequences (\u0041, \u{1F600}) and decode escaped strings back to UTF-8."
    >
      <div className="space-y-6">
        <div className="flex gap-2 border-b border-black/10 pb-4 dark:border-white/10">
          <button
            type="button"
            onClick={() => setMode("encode")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              mode === "encode" ? "bg-primary-solid text-white dark:text-black" : "border border-black/10 dark:border-white/10"
            }`}
          >
            Encode to \uXXXX
          </button>
          <button
            type="button"
            onClick={() => setMode("decode")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              mode === "decode" ? "bg-primary-solid text-white dark:text-black" : "border border-black/10 dark:border-white/10"
            }`}
          >
            Decode to Text
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {mode === "encode" ? "Plain Text Input:" : "Escaped Unicode Input:"}
            </label>
            <textarea
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              rows={8}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {mode === "encode" ? "Escaped Output:" : "Decoded Text:"}
              </label>
              <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!output}>
                {copied ? "Copied!" : "Copy Output"}
              </Button>
            </div>
            <textarea
              readOnly
              value={output}
              rows={8}
              className="w-full rounded-xl border border-black/10 bg-black/[0.03] p-3 font-mono text-xs dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-100"
            />
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
