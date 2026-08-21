"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import TextArea from "@/components/ui/TextArea";
import ToolContainer from "@/components/ui/ToolContainer";

export default function QueryStringParserTool() {
  const [mode, setMode] = useState<"query-to-json" | "json-to-query">("query-to-json");
  const [queryInput, setQueryInput] = useState("page=2&limit=25&sort=created_at&order=desc&tags=react&tags=nextjs&active=true");
  const [jsonInput, setJsonInput] = useState('{\n  "page": 2,\n  "limit": 25,\n  "sort": "created_at",\n  "order": "desc",\n  "tags": ["react", "nextjs"],\n  "active": true\n}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    try {
      if (mode === "query-to-json") {
        if (!queryInput.trim()) {
          setOutput("");
          return;
        }

        let q = queryInput.trim();
        if (q.startsWith("?")) q = q.substring(1);
        if (q.includes("?")) q = q.split("?")[1];

        const params = new URLSearchParams(q);
        const result: Record<string, unknown> = {};

        params.forEach((value, key) => {
          const cleanKey = key.replace(/\[\]$/, "");
          // Auto-parse booleans & numbers
          let parsedVal: unknown = value;
          if (value === "true") parsedVal = true;
          else if (value === "false") parsedVal = false;
          else if (!isNaN(Number(value)) && value.trim() !== "") parsedVal = Number(value);

          if (result[cleanKey] !== undefined) {
            if (Array.isArray(result[cleanKey])) {
              (result[cleanKey] as unknown[]).push(parsedVal);
            } else {
              result[cleanKey] = [result[cleanKey], parsedVal];
            }
          } else {
            result[cleanKey] = parsedVal;
          }
        });

        setOutput(JSON.stringify(result, null, 2));
      } else {
        if (!jsonInput.trim()) {
          setOutput("");
          return;
        }

        const obj = JSON.parse(jsonInput);
        const params = new URLSearchParams();

        Object.entries(obj).forEach(([k, v]) => {
          if (Array.isArray(v)) {
            v.forEach((item) => params.append(k, String(item)));
          } else if (v !== null && typeof v === "object") {
            params.append(k, JSON.stringify(v));
          } else if (v !== undefined) {
            params.append(k, String(v));
          }
        });

        setOutput(`?${params.toString()}`);
      }
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Conversion failed. Please check input syntax.");
    }
  };

  const clearAll = () => {
    setQueryInput("");
    setJsonInput("");
    setOutput("");
    setError("");
  };

  return (
    <ToolContainer
      title="Query String to JSON & JSON to Query Converter"
      description="Bidirectional parser converting URL query parameters to formatted JSON and JSON objects to query strings."
      maxWidth="4xl"
    >
      <div className="space-y-6">
        <div className="flex border-b border-black/10 dark:border-white/10">
          <button
            type="button"
            onClick={() => {
              setMode("query-to-json");
              setOutput("");
              setError("");
            }}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition ${
              mode === "query-to-json"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            URL Query String → JSON
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("json-to-query");
              setOutput("");
              setError("");
            }}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition ${
              mode === "json-to-query"
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            JSON → URL Query String
          </button>
        </div>

        {mode === "query-to-json" ? (
          <TextArea
            label="Input URL or Query String"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            placeholder="https://example.com/api?user=alex&role=admin&tags[]=dev"
            rows={5}
            error={error}
          />
        ) : (
          <TextArea
            label="Input JSON Object"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='{\n  "user": "alex",\n  "role": "admin"\n}'
            rows={6}
            error={error}
          />
        )}

        <div className="flex gap-2">
          <Button onClick={handleConvert}>
            {mode === "query-to-json" ? "Convert Query to JSON" : "Convert JSON to Query"}
          </Button>
          <Button variant="ghost" onClick={clearAll} disabled={!queryInput && !jsonInput && !output}>
            Clear
          </Button>
        </div>

        {output && (
          <TextArea
            label={mode === "query-to-json" ? "Parsed JSON Object" : "Generated Query String"}
            readOnly
            copyable
            value={output}
            rows={6}
          />
        )}
      </div>
    </ToolContainer>
  );
}
