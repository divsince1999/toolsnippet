"use client";

import { useState, useMemo } from "react";
import ToolContainer from "@/components/ui/ToolContainer";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";

// Clean, robust client-side JSONPath evaluator implementation
// Supports: root $, property dot (.key) and bracket (['key']), wildcard (*), recursive descent (..key), array index ([0]), slice ([0:2]), and filter ([?(@.key op val)])
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function evaluateJsonPath(data: any, pathStr: string): any[] {
  const path = pathStr.trim();
  if (!path || path === "$") return [data];

  // Tokenize the JSONPath expression
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let currentNodes: any[] = [data];

  // Strip leading $ or $.
  let remaining = path.startsWith("$") ? path.slice(1) : path;
  if (remaining.startsWith(".")) remaining = remaining.slice(1);

  // Parse path segments
  // Handle recursive descent (..)
  while (remaining.length > 0) {
    if (remaining.startsWith("..")) {
      remaining = remaining.slice(2);
      const nextDot = remaining.indexOf(".");
      const nextBracket = remaining.indexOf("[");
      let key = remaining;
      let nextIndex = remaining.length;

      if (nextDot !== -1 && (nextBracket === -1 || nextDot < nextBracket)) {
        key = remaining.slice(0, nextDot);
        nextIndex = nextDot;
      } else if (nextBracket !== -1) {
        key = remaining.slice(0, nextBracket);
        nextIndex = nextBracket;
      }

      remaining = remaining.slice(nextIndex);
      if (remaining.startsWith(".")) remaining = remaining.slice(1);

      // Collect all descendants with this key
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const descendants: any[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const traverse = (node: any) => {
        if (!node || typeof node !== "object") return;
        if (Array.isArray(node)) {
          for (const item of node) {
            if (key === "*" && item !== undefined) descendants.push(item);
            traverse(item);
          }
        } else {
          for (const [k, val] of Object.entries(node)) {
            if (k === key || key === "*") descendants.push(val);
            traverse(val);
          }
        }
      };

      for (const node of currentNodes) {
        traverse(node);
      }
      currentNodes = descendants;
      continue;
    }

    if (remaining.startsWith("[")) {
      const closeBracket = remaining.indexOf("]");
      if (closeBracket === -1) break;
      const bracketContent = remaining.slice(1, closeBracket).trim();
      remaining = remaining.slice(closeBracket + 1);
      if (remaining.startsWith(".")) remaining = remaining.slice(1);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nextNodes: any[] = [];

      // 1. Wildcard [*]
      if (bracketContent === "*") {
        for (const node of currentNodes) {
          if (Array.isArray(node)) nextNodes.push(...node);
          else if (node && typeof node === "object") nextNodes.push(...Object.values(node));
        }
      }
      // 2. Filter expression [?(@.price < 10)]
      else if (bracketContent.startsWith("?(") && bracketContent.endsWith(")")) {
        const expr = bracketContent.slice(2, -1).trim(); // e.g. @.price < 10
        // Match @.key op val
        const filterMatch = expr.match(/@\.([a-zA-Z0-9_-]+)\s*(==|!=|<=|>=|<|>)\s*(.*)/);
        if (filterMatch) {
          const [, field, op, rawVal] = filterMatch;
          const rawStr = rawVal.trim();
          let compareVal: string | number | boolean = rawStr;
          if (rawStr.startsWith('"') && rawStr.endsWith('"')) compareVal = rawStr.slice(1, -1);
          else if (rawStr.startsWith("'") && rawStr.endsWith("'")) compareVal = rawStr.slice(1, -1);
          else if (!isNaN(Number(rawStr))) compareVal = Number(rawStr);
          else if (rawStr === "true") compareVal = true;
          else if (rawStr === "false") compareVal = false;

          for (const node of currentNodes) {
            const list = Array.isArray(node) ? node : (node && typeof node === "object" ? [node] : []);
            for (const item of list) {
              if (item && typeof item === "object") {
                const itemVal = item[field];
                let matches = false;
                if (op === "==") matches = itemVal == compareVal;
                else if (op === "!=") matches = itemVal != compareVal;
                else if (op === "<") matches = itemVal < compareVal;
                else if (op === ">") matches = itemVal > compareVal;
                else if (op === "<=") matches = itemVal <= compareVal;
                else if (op === ">=") matches = itemVal >= compareVal;
                if (matches) nextNodes.push(item);
              }
            }
          }
        }
      }
      // 3. Array slice [0:2]
      else if (bracketContent.includes(":")) {
        const [startStr, endStr] = bracketContent.split(":");
        const start = startStr.trim() ? parseInt(startStr.trim(), 10) : 0;
        for (const node of currentNodes) {
          if (Array.isArray(node)) {
            const end = endStr.trim() ? parseInt(endStr.trim(), 10) : node.length;
            nextNodes.push(...node.slice(start, end));
          }
        }
      }
      // 4. Quoted property ['prop']
      else if ((bracketContent.startsWith("'") && bracketContent.endsWith("'")) || (bracketContent.startsWith('"') && bracketContent.endsWith('"'))) {
        const prop = bracketContent.slice(1, -1);
        for (const node of currentNodes) {
          if (node && typeof node === "object" && prop in node) {
            nextNodes.push(node[prop]);
          }
        }
      }
      // 5. Array index [0]
      else if (!isNaN(Number(bracketContent))) {
        const idx = Number(bracketContent);
        for (const node of currentNodes) {
          if (Array.isArray(node)) {
            const targetIdx = idx < 0 ? node.length + idx : idx;
            if (node[targetIdx] !== undefined) nextNodes.push(node[targetIdx]);
          }
        }
      }

      currentNodes = nextNodes;
      continue;
    }

    // Property name segment (dot notation)
    const nextDot = remaining.indexOf(".");
    const nextBracket = remaining.indexOf("[");
    let key = remaining;
    let nextIndex = remaining.length;

    if (nextDot !== -1 && (nextBracket === -1 || nextDot < nextBracket)) {
      key = remaining.slice(0, nextDot);
      nextIndex = nextDot + 1;
    } else if (nextBracket !== -1) {
      key = remaining.slice(0, nextBracket);
      nextIndex = nextBracket;
    }

    remaining = remaining.slice(nextIndex);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nextNodes: any[] = [];
    for (const node of currentNodes) {
      if (!node || typeof node !== "object") continue;
      if (key === "*") {
        if (Array.isArray(node)) nextNodes.push(...node);
        else nextNodes.push(...Object.values(node));
      } else if (key in node) {
        nextNodes.push(node[key]);
      }
    }
    currentNodes = nextNodes;
  }

  return currentNodes;
}

const SAMPLE_STORE_JSON = JSON.stringify(
  {
    store: {
      book: [
        { category: "reference", author: "Nigel Rees", title: "Sayings of the Century", price: 8.95 },
        { category: "fiction", author: "Evelyn Waugh", title: "Sword of Honour", price: 12.99 },
        { category: "fiction", author: "Herman Melville", title: "Moby Dick", isbn: "0-553-21311-3", price: 8.99 },
        { category: "fiction", author: "J. R. R. Tolkien", title: "The Lord of the Rings", isbn: "0-395-19395-8", price: 22.99 }
      ],
      bicycle: { color: "red", price: 19.95 }
    }
  },
  null,
  2
);

export default function JsonpathEvaluatorTool() {
  const [jsonInput, setJsonInput] = useState(SAMPLE_STORE_JSON);
  const [query, setQuery] = useState("$.store.book[*].author");
  const [copied, setCopied] = useState(false);

  const { result, error, count } = useMemo(() => {
    try {
      if (!jsonInput.trim()) return { result: "[]", error: null, count: 0 };
      const parsed = JSON.parse(jsonInput);
      const extracted = evaluateJsonPath(parsed, query);
      return {
        result: JSON.stringify(extracted, null, 2),
        error: null,
        count: extracted.length
      };
    } catch (err: unknown) {
      return {
        result: "",
        error: err instanceof Error ? err.message : "Invalid JSON input or JSONPath expression",
        count: 0
      };
    }
  }, [jsonInput, query]);

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <ToolContainer
      title="JSONPath Evaluator & Query Tester"
      description="Evaluate JSONPath expressions in real-time against complex JSON trees with 100% client-side privacy."
    >
      <div className="space-y-6">
        {/* Expression Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              JSONPath Expression:
            </label>
            <span className="text-xs font-mono text-gray-500">
              {error ? "❌ Syntax Error" : `✓ ${count} match${count === 1 ? "" : "es"}`}
            </span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="$.store.book[*].author"
              className="flex-1 rounded-xl border border-black/15 bg-white px-4 py-2.5 font-mono text-sm font-bold text-gray-900 shadow-xs outline-none focus:border-primary-solid dark:border-white/15 dark:bg-zinc-900 dark:text-white"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuery("$.store.book[*].author")}
              className="hidden sm:inline-flex"
            >
              Reset Query
            </Button>
          </div>
        </div>

        {/* Quick Presets Bar */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Quick Query Presets:
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "All Authors", q: "$.store.book[*].author" },
              { label: "All Prices ($..price)", q: "$..price" },
              { label: "First 2 Books", q: "$.store.book[0:2]" },
              { label: "Books Under $10", q: "$.store.book[?(@.price < 10)]" },
              { label: "Bicycle Info", q: "$.store.bicycle" },
              { label: "All Store Items", q: "$.store.*" },
            ].map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setQuery(p.q)}
                className="rounded-lg border border-black/10 bg-black/[0.02] px-3 py-1.5 font-mono text-xs font-medium hover:border-primary-solid dark:border-white/10 dark:bg-white/[0.02]"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column JSON Input & Output Workspace */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column: Input JSON */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                JSON Input:
              </label>
              <button
                type="button"
                onClick={() => setJsonInput(SAMPLE_STORE_JSON)}
                className="text-xs text-primary-solid hover:underline"
              >
                Load Sample Store Data
              </button>
            </div>
            <TextArea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste JSON document here..."
              rows={16}
              className="font-mono text-xs"
            />
          </div>

          {/* Right Column: Extracted Result Output */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Evaluation Result ({count} matches):
              </label>
              {result && (
                <Button variant="outline" size="sm" onClick={handleCopy} className="h-7 text-xs">
                  {copied ? "✓ Copied" : "Copy Result"}
                </Button>
              )}
            </div>
            {error ? (
              <div className="flex h-[360px] items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 p-4 text-center font-mono text-xs text-rose-600 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-400">
                {error}
              </div>
            ) : (
              <TextArea
                value={result}
                readOnly
                placeholder="Matched elements will appear here..."
                rows={16}
                className="bg-black/[0.02] font-mono text-xs dark:bg-white/[0.02]"
              />
            )}
          </div>
        </div>
      </div>
    </ToolContainer>
  );
}
