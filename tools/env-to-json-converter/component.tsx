"use client";

import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import ToolContainer from "@/components/ui/ToolContainer";

export default function EnvToJsonConverter() {
  const [mode, setMode] = useState<"env2json" | "json2env">("env2json");
  const [inputVal, setInputVal] = useState(`# Server Config\nPORT=3000\nNODE_ENV=production\nENABLE_METRICS=true\nAPI_KEY="sk_live_9812498234"\nDATABASE_URL=postgresql://user:pass@localhost:5432/mydb`);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    if (!inputVal.trim()) return { output: "", error: "" };

    try {
      if (mode === "env2json") {
        const lines = inputVal.split("\n");
        const obj: Record<string, string | number | boolean> = {};

        for (let line of lines) {
          line = line.trim();
          if (!line || line.startsWith("#")) continue;

          const eqIdx = line.indexOf("=");
          if (eqIdx === -1) continue;

          const key = line.slice(0, eqIdx).trim();
          let val: string | number | boolean = line.slice(eqIdx + 1).trim();

          // Unquote
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          } else if (val.toLowerCase() === "true") {
            val = true;
          } else if (val.toLowerCase() === "false") {
            val = false;
          } else if (!isNaN(Number(val)) && val !== "") {
            val = Number(val);
          }

          obj[key] = val;
        }

        return { output: JSON.stringify(obj, null, 2), error: "" };
      } else {
        const parsed = JSON.parse(inputVal);
        const envLines: string[] = [];

        for (const [k, v] of Object.entries(parsed)) {
          const formattedKey = k.replace(/[^a-zA-Z0-9_]/g, "_").toUpperCase();
          if (typeof v === "string" && (v.includes(" ") || v.includes("#"))) {
            envLines.push(`${formattedKey}="${v}"`);
          } else {
            envLines.push(`${formattedKey}=${v}`);
          }
        }

        return { output: envLines.join("\n"), error: "" };
      }
    } catch (err: unknown) {
      return { output: "", error: err instanceof Error ? err.message : "Invalid input" };
    }
  }, [inputVal, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolContainer
      title=".env to JSON & Environment Config Converter"
      description="Convert .env key-value variables to structured JSON and transform JSON objects into formatted .env files."
    >
      <div className="space-y-6">
        <div className="flex gap-2 border-b border-black/10 pb-4 dark:border-white/10">
          <button
            type="button"
            onClick={() => setMode("env2json")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              mode === "env2json" ? "bg-primary-solid text-white dark:text-black" : "border border-black/10 dark:border-white/10"
            }`}
          >
            .env ➔ JSON
          </button>
          <button
            type="button"
            onClick={() => setMode("json2env")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
              mode === "json2env" ? "bg-primary-solid text-white dark:text-black" : "border border-black/10 dark:border-white/10"
            }`}
          >
            JSON ➔ .env
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {mode === "env2json" ? "Input .env File:" : "Input JSON Object:"}
            </label>
            <textarea
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              rows={10}
              className="w-full rounded-xl border border-black/15 bg-white p-3 font-mono text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {mode === "env2json" ? "Converted JSON:" : "Converted .env:"}
              </label>
              <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!result.output}>
                {copied ? "Copied!" : "Copy Output"}
              </Button>
            </div>
            {result.error ? (
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-600 dark:text-rose-400">
                {result.error}
              </div>
            ) : (
              <textarea
                readOnly
                value={result.output}
                rows={10}
                className="w-full rounded-xl border border-black/10 bg-black/[0.03] p-3 font-mono text-xs dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-100"
              />
            )}
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
