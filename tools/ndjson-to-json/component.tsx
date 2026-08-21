"use client";

import { useState, useMemo } from "react";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function NdjsonToJsonTool() {
  const [direction, setDirection] = useState<"ndjson-to-json" | "json-to-ndjson">("ndjson-to-json");
  const [inputText, setInputText] = useState(
    `{"id": 1, "name": "Event Started", "timestamp": "2026-08-19T10:00:00Z"}\n` +
    `{"id": 2, "name": "User Authenticated", "user_id": "usr_99"}\n` +
    `{"id": 3, "name": "Checkout Succeeded", "amount": 49.95}`
  );

  const { convertedOutput, error } = useMemo(() => {
    try {
      if (!inputText.trim()) return { convertedOutput: "", error: "" };

      if (direction === "ndjson-to-json") {
        const lines = inputText.split("\n").filter((l) => l.trim().length > 0);
        const parsedArray = lines.map((line, idx) => {
          try {
            return JSON.parse(line);
          } catch {
            throw new Error(`Line ${idx + 1} is not valid JSON: "${line}"`);
          }
        });
        return { convertedOutput: JSON.stringify(parsedArray, null, 2), error: "" };
      } else {
        const parsed = JSON.parse(inputText);
        if (!Array.isArray(parsed)) {
          throw new Error("Input must be a JSON array (e.g. [ {...}, {...} ])");
        }
        return { convertedOutput: parsed.map((item) => JSON.stringify(item)).join("\n"), error: "" };
      }
    } catch (err: unknown) {
      return { convertedOutput: "", error: err instanceof Error ? err.message : "Conversion error" };
    }
  }, [inputText, direction]);

  return (
    <ToolContainer
      title="NDJSON / JSONL to JSON Array Converter"
      description="Bidirectional converter between Newline Delimited JSON (.ndjson / .jsonl) and formatted JSON arrays."
      maxWidth="5xl"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <TextArea
            label={direction === "ndjson-to-json" ? "NDJSON / JSONL Input" : "JSON Array Input"}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={14}
            error={error}
          />

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Conversion Mode
            </label>
            <select
              value={direction}
              onChange={(e) => setDirection(e.target.value as typeof direction)}
              className="w-full rounded-lg border border-black/15 bg-white p-2.5 text-xs dark:border-white/20 dark:bg-zinc-900 dark:text-white"
            >
              <option value="ndjson-to-json">NDJSON (.jsonl) → JSON Array [ ... ]</option>
              <option value="json-to-ndjson">JSON Array [ ... ] → NDJSON (.jsonl)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <TextArea
            label={direction === "ndjson-to-json" ? "Converted JSON Array" : "Converted NDJSON Stream"}
            readOnly
            copyable
            value={convertedOutput}
            rows={17}
          />
        </div>
      </div>
    </ToolContainer>
  );
}
