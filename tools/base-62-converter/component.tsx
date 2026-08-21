"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

const BASE62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function convertBase62(inputVal: string, mode: "encode" | "decode") {
  const raw = inputVal.trim();
  if (!raw) return { output: "", error: "" };

  try {
    if (mode === "encode") {
      let num = BigInt(raw);
      if (num === BigInt(0)) return { output: "0", error: "" };
      if (num < BigInt(0)) return { output: "", error: "Base62 requires non-negative integers" };

      let str = "";
      while (num > BigInt(0)) {
        const rem = Number(num % BigInt(62));
        str = BASE62[rem] + str;
        num = num / BigInt(62);
      }
      return { output: str, error: "" };
    } else {
      let num = BigInt(0);
      for (let i = 0; i < raw.length; i++) {
        const idx = BASE62.indexOf(raw[i]);
        if (idx === -1) {
          return { output: "", error: `Invalid Base62 character: '${raw[i]}'` };
        }
        num = num * BigInt(62) + BigInt(idx);
      }
      return { output: num.toString(), error: "" };
    }
  } catch (err: unknown) {
    return { output: "", error: err instanceof Error ? err.message : "Invalid input" };
  }
}

export default function Base62Converter() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [inputVal, setInputVal] = useState("102498234");
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => convertBase62(inputVal, mode), [inputVal, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer
      title="Base62 URL Shortener & Number Encoder"
      description="Convert base-10 integers into compact alphanumeric Base62 strings [0-9a-zA-Z] for URL shorteners and compact database IDs."
    >
      <div className="space-y-6">
        <div className="flex gap-2 border-b border-black/10 pb-4 dark:border-white/10">
          <button
            type="button"
            onClick={() => { setMode("encode"); setInputVal("102498234"); }}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              mode === "encode" ? "bg-primary-solid text-white dark:text-black" : "border border-black/10 dark:border-white/10"
            }`}
          >
            Encode Integer ➔ Base62
          </button>
          <button
            type="button"
            onClick={() => { setMode("decode"); setInputVal("6S3u4"); }}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              mode === "decode" ? "bg-primary-solid text-white dark:text-black" : "border border-black/10 dark:border-white/10"
            }`}
          >
            Decode Base62 ➔ Integer
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {mode === "encode" ? "Decimal Integer ID:" : "Alphanumeric Base62 String:"}
          </label>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full rounded-xl border border-black/15 bg-white p-3 text-sm font-mono dark:border-white/20 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        {result.error ? (
          <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-600 dark:text-rose-400">
            {result.error}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {mode === "encode" ? "Shortened Base62 Token:" : "Decoded Integer ID:"}
              </label>
              <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!result.output}>
                {copied ? "✓ Copied" : "Copy Output"}
              </Button>
            </div>
            <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4 font-mono text-xl font-bold text-primary-solid dark:border-white/10 dark:bg-white/[0.02] break-all">
              {result.output || "—"}
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
}
